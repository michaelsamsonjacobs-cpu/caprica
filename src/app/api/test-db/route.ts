import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
    try {
        const count = await prisma.jobAlertSubscription.count();
        return NextResponse.json({
            success: true,
            message: 'Prisma works!',
            count
        });
    } catch (error) {
        console.error('Test DB error:', error);
        return NextResponse.json({
            success: false,
            error: String(error)
        }, { status: 500 });
    }
}
