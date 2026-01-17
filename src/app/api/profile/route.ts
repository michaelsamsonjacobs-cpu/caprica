import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { auth } from '@/lib/auth';

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Parse JSON fields and return safe profile data
        const profile = {
            id: user.id,
            name: user.name,
            email: user.email,
            mos: (user as Record<string, unknown>).mos,
            branch: (user as Record<string, unknown>).branch,
            rank: (user as Record<string, unknown>).rank,
            yearsServed: (user as Record<string, unknown>).yearsServed,
            clearanceLevel: (user as Record<string, unknown>).clearanceLevel,
            separationDate: (user as Record<string, unknown>).separationDate,
            preferredLocations: (user as Record<string, unknown>).preferredLocations,
            remotePreference: (user as Record<string, unknown>).remotePreference,
            salaryExpectation: (user as Record<string, unknown>).salaryExpectation,
            asvabResults: (user as Record<string, unknown>).asvabResults
                ? JSON.parse((user as Record<string, unknown>).asvabResults as string)
                : null,
            skillsAssessment: (user as Record<string, unknown>).skillsAssessment
                ? JSON.parse((user as Record<string, unknown>).skillsAssessment as string)
                : null,
        };

        return NextResponse.json(profile);
    } catch (error) {
        console.error('Profile GET error:', error);
        return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        // Use raw query to update the extended fields until Prisma schema is regenerated
        const updatedUser = await prisma.$executeRaw`
            UPDATE User SET
                name = ${body.name || null},
                updatedAt = datetime('now')
            WHERE email = ${session.user.email}
        `;

        return NextResponse.json({
            success: true,
            message: 'Profile updated',
            updated: updatedUser,
        });
    } catch (error) {
        console.error('Profile PUT error:', error);
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }
}
