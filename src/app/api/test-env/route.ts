import { NextResponse } from 'next/server';

export async function GET() {
    const dbUrl = process.env.DATABASE_URL;

    return NextResponse.json({
        success: true,
        message: 'Environment check',
        databaseUrl: dbUrl ? 'Set' : 'NOT SET',
        nodeEnv: process.env.NODE_ENV
    });
}
