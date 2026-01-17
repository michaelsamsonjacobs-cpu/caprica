import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { sendJobAlertEmail, type JobMatch, type JobAlertSubscription } from '@/lib/email';
import { loadVeteranJobs } from '@/lib/jobs';

// Vercel Cron configuration
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// This route can be called by Vercel Cron or manually
// Configure in vercel.json: { "crons": [{ "path": "/api/cron/send-alerts", "schedule": "0 9 * * *" }] }
export async function GET() {
    try {
        const now = new Date();
        const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, etc.

        // Determine which subscriptions to process
        // Daily subscriptions: every day
        // Weekly subscriptions: only on Mondays (day 1)
        const frequencyFilter = dayOfWeek === 1
            ? {} // Monday: send to all (daily + weekly)
            : { frequency: 'daily' }; // Other days: only daily

        const subscriptions = await prisma.jobAlertSubscription.findMany({
            where: {
                isActive: true,
                ...frequencyFilter,
            },
        });

        if (subscriptions.length === 0) {
            return NextResponse.json({
                success: true,
                message: 'No subscriptions to process',
                processed: 0
            });
        }

        // Load real jobs
        const veteranJobs = await loadVeteranJobs();
        const allJobs: JobMatch[] = veteranJobs.slice(0, 20).map(job => ({
            id: job.id,
            title: job.title,
            company: job.company,
            location: job.location,
            salary: job.salary,
            clearance: job.clearance,
            mosMatch: job.mosMatch,
            url: job.url || 'https://caprica.com/jobs',
        }));

        const results = {
            sent: 0,
            failed: 0,
            errors: [] as string[],
        };

        // Process each subscription
        for (const sub of subscriptions) {
            // Filter jobs based on preferences
            let matchedJobs = allJobs;

            if (sub.preferredLocations) {
                try {
                    const locations = JSON.parse(sub.preferredLocations) as string[];
                    if (locations.length > 0) {
                        matchedJobs = matchedJobs.filter(job =>
                            locations.some(loc =>
                                job.location.toLowerCase().includes(loc.toLowerCase())
                            )
                        );
                    }
                } catch { }
            }

            // Send at least 5 jobs even if no matches
            const jobsToSend = matchedJobs.length >= 3 ? matchedJobs : allJobs.slice(0, 5);

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
                await prisma.jobAlertSubscription.update({
                    where: { id: sub.id },
                    data: { lastSentAt: new Date() },
                });
            } else {
                results.failed++;
                results.errors.push(`${sub.email}: ${result.error}`);
            }
        }

        return NextResponse.json({
            success: true,
            message: `Processed ${subscriptions.length} subscriptions`,
            results,
            timestamp: now.toISOString(),
        });

    } catch (error) {
        console.error('Cron send-alerts error:', error);
        return NextResponse.json(
            { error: 'Failed to send alerts', details: String(error) },
            { status: 500 }
        );
    }
}
