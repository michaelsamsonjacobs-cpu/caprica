import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, name, mos, branch, clearanceLevel, preferredLocations, salaryMin, remoteOnly, frequency } = body;

        // Validate email
        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
        }

        // Upsert subscription (create or update)
        const subscription = await prisma.jobAlertSubscription.upsert({
            where: { email },
            update: {
                name,
                mos: mos?.toUpperCase(),
                branch,
                clearanceLevel,
                preferredLocations: preferredLocations ? JSON.stringify(preferredLocations) : null,
                salaryMin: salaryMin ? parseInt(salaryMin) : null,
                remoteOnly: remoteOnly ?? false,
                frequency: frequency || 'weekly',
                isActive: true,
            },
            create: {
                email,
                name,
                mos: mos?.toUpperCase(),
                branch,
                clearanceLevel,
                preferredLocations: preferredLocations ? JSON.stringify(preferredLocations) : null,
                salaryMin: salaryMin ? parseInt(salaryMin) : null,
                remoteOnly: remoteOnly ?? false,
                frequency: frequency || 'weekly',
            },
        });

        // Log confirmation (dev mode - no email API key needed)
        console.log('\n✅ [DEV] New subscription:', subscription.email);

        return NextResponse.json({
            success: true,
            message: 'Successfully subscribed to job alerts',
            subscription: {
                id: subscription.id,
                email: subscription.email,
                frequency: subscription.frequency,
            },
        });

    } catch (error) {
        console.error('Subscription error:', error);
        return NextResponse.json(
            { error: 'Failed to create subscription', details: String(error) },
            { status: 500 }
        );
    }
}
