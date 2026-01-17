import { NextRequest, NextResponse } from 'next/server';
import { sendLeadToRecruiters, LeadData } from '@/lib/recruiter-service';

export async function POST(request: NextRequest) {
    try {
        const data: LeadData = await request.json();

        // Basic Validation
        if (!data.name || !data.email || !data.phone) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Send the lead
        await sendLeadToRecruiters(data);

        return NextResponse.json({ success: true, message: 'Lead sent successfully' });

    } catch (error) {
        console.error('Recruiter API Error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
