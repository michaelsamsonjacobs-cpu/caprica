import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { sendJobAlertEmail, type JobMatch, type JobAlertSubscription } from '@/lib/email';
import { loadVeteranJobs } from '@/lib/jobs';

// Secured endpoint to send job alerts (call via cron or admin)
// In production, add proper authentication
export async function POST(request: NextRequest) {
    try {
        // Simple API key check (set ALERTS_API_KEY in .env)
        const authHeader = request.headers.get('authorization');
        const apiKey = process.env.ALERTS_API_KEY;

        if (apiKey && authHeader !== `Bearer ${apiKey}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { frequency = 'all' } = body; // 'daily', 'weekly', or 'all'

        // Get active subscriptions
        const subscriptions = await prisma.jobAlertSubscription.findMany({
            where: {
                isActive: true,
                ...(frequency !== 'all' && { frequency }),
            },
        });

        // Load real scraped jobs
        const veteranJobs = await loadVeteranJobs();
        const allJobs: JobMatch[] = veteranJobs.slice(0, 20).map(job => ({
            id: job.id,
            title: job.title,
            company: job.company,
            location: job.location,
            salary: job.salary,
            clearance: job.clearance,
            mosMatch: job.mosMatch,
            url: job.url || `https://caprica.com/jobs`,
        }));

        const results = {
            sent: 0,
            failed: 0,
            errors: [] as string[],
        };

        // Process each subscription
        for (const sub of subscriptions) {
            // Match jobs to subscription preferences
            const matchedJobs = allJobs.filter(job => {
                // Location match
                if (sub.preferredLocations) {
                    try {
                        const locations = JSON.parse(sub.preferredLocations) as string[];
                        if (locations.length > 0) {
                            const hasLocationMatch = locations.some(loc =>
                                job.location.toLowerCase().includes(loc.toLowerCase())
                            );
                            if (!hasLocationMatch) return false;
                        }
                    } catch { }
                }

                return true;
            });

            // Only send if there are matching jobs (or send all if no filters)
            const jobsToSend = matchedJobs.length > 0 ? matchedJobs : allJobs.slice(0, 5);

            if (jobsToSend.length > 0) {
                const subForEmail: JobAlertSubscription = {
                    id: sub.id,
                    email: sub.email,
                    name: sub.name ?? undefined,
                    mos: sub.mos ?? undefined,
                    branch: sub.branch ?? undefined,
                    clearanceLevel: sub.clearanceLevel ?? undefined,
                    preferredLocations: sub.preferredLocations ?? undefined,
                    salaryMin: sub.salaryMin ?? undefined,
                    remoteOnly: sub.remoteOnly,
                    frequency: sub.frequency,
                };

                const result = await sendJobAlertEmail(subForEmail, jobsToSend);

                if (result.success) {
                    results.sent++;
                    // Update lastSentAt
                    await prisma.jobAlertSubscription.update({
                        where: { id: sub.id },
                        data: { lastSentAt: new Date() },
                    });
                } else {
                    results.failed++;
                    results.errors.push(`${sub.email}: ${result.error}`);
                }
            }
        }

        return NextResponse.json({
            success: true,
            message: `Processed ${subscriptions.length} subscriptions`,
            results,
        });

    } catch (error) {
        console.error('Send alerts error:', error);
        return NextResponse.json(
            { error: 'Failed to send alerts' },
            { status: 500 }
        );
    }
}
