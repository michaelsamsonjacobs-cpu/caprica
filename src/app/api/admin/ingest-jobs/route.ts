import { NextResponse } from 'next/server';
import { runJobIngestion } from '@/lib/job-aggregator';

export async function POST() {
    try {
        // In a real scenario, we might iterate through many keywords
        const queries = [
            'Defense Contractor',
            'Cyber Security TS/SCI',
            'Military Veteran Operations'
        ];

        const jobs = await runJobIngestion(queries);

        return NextResponse.json({ success: true, jobs });
    } catch (error) {
        console.error("Ingestion API Error:", error);
        return NextResponse.json({ success: false, error: 'Ingestion Failed' }, { status: 500 });
    }
}
