// RECRUITER EMAIL CONFIGURATION
// Add the email addresses of the recruiters you want to receive leads.
export const RECRUITER_EMAILS = [
    "sgt.doe@army.mil",
    "recruiting.station.dc@army.mil",
    // "your.recruiter@email.com", <--- Add more here
];

export interface LeadData {
    name: string;
    email: string;
    phone: string;
    zipCode: string;
    interest: string; // e.g., "Cyber", "Aviation"
    message?: string;
}

export async function sendLeadToRecruiters(lead: LeadData): Promise<boolean> {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
        console.log(`📧 [DEV] PREPARING LEAD FOR: ${RECRUITER_EMAILS.join(', ')}`);
        console.log(`📋 LEAD DATA:`, lead);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(`✅ [DEV] LEAD SENT SUCCESSFULLY`);
        return true;
    }

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'Caprica Leads <leads@caprica.com>',
                to: RECRUITER_EMAILS,
                subject: `New Lead: ${lead.name} - ${lead.interest} | Caprica`,
                html: `
                    <div style="font-family: sans-serif; padding: 20px; background: #f8fafc; color: #1e293b;">
                        <h1 style="color: #f59e0b;">New Recruiter Lead</h1>
                        <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
                            <p><strong>Name:</strong> ${lead.name}</p>
                            <p><strong>Email:</strong> ${lead.email}</p>
                            <p><strong>Phone:</strong> ${lead.phone}</p>
                            <p><strong>Zip Code:</strong> ${lead.zipCode}</p>
                            <p><strong>Interest Area:</strong> ${lead.interest}</p>
                            <p><strong>Message:</strong> ${lead.message || 'No message provided'}</p>
                        </div>
                        <p style="font-size: 12px; color: #64748b; margin-top: 20px;">Sent via Caprica Platform Lead System</p>
                    </div>
                `
            }),
        });

        if (response.ok) {
            console.log(`✅ LEAD SENT SUCCESSFULLY`);
            return true;
        } else {
            const error = await response.text();
            console.error('Resend API error:', error);
            return false;
        }
    } catch (error) {
        console.error('Failed to send lead to recruiters:', error);
        return false;
    }
}
