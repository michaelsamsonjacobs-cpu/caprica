// Email utility for Job Alerts
// Uses Resend for transactional emails (free tier: 3,000/month)

interface JobMatch {
    id: string;
    title: string;
    company: string;
    location: string;
    salary?: string;
    clearance?: string;
    mosMatch?: string[];
    url?: string;
}

interface JobAlertSubscription {
    id: string;
    email: string;
    name?: string;
    mos?: string;
    branch?: string;
    clearanceLevel?: string;
    preferredLocations?: string;
    salaryMin?: number;
    remoteOnly: boolean;
    frequency: string;
}

// Email templates
function generateJobAlertHTML(subscription: JobAlertSubscription, jobs: JobMatch[]): string {
    const greeting = subscription.name ? `Hi ${subscription.name}` : 'Hi there';
    const mosText = subscription.mos ? ` matching your MOS (${subscription.mos})` : '';

    const jobCards = jobs.map(job => `
        <tr>
            <td style="padding: 16px; border-bottom: 1px solid #334155;">
                <h3 style="margin: 0 0 8px 0; color: #f8fafc; font-size: 18px;">${job.title}</h3>
                <p style="margin: 0 0 8px 0; color: #94a3b8;">
                    ${job.company} • ${job.location}
                    ${job.clearance ? ` • 🔒 ${job.clearance}` : ''}
                </p>
                ${job.salary ? `<p style="margin: 0 0 12px 0; color: #4ade80;">💰 ${job.salary}</p>` : ''}
                ${job.mosMatch && job.mosMatch.length > 0 ?
            `<p style="margin: 0 0 12px 0; color: #fbbf24; font-size: 14px;">MOS Match: ${job.mosMatch.join(', ')}</p>` : ''}
                <a href="${job.url || '#'}" style="display: inline-block; padding: 8px 16px; background: #f59e0b; color: #0f172a; text-decoration: none; border-radius: 6px; font-weight: 600;">
                    View Job →
                </a>
            </td>
        </tr>
    `).join('');

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #1e293b;">
        <!-- Header -->
        <tr>
            <td style="padding: 24px; text-align: center; border-bottom: 1px solid #334155;">
                <h1 style="margin: 0; color: #f59e0b; font-size: 28px;">🎖️ Caprica</h1>
                <p style="margin: 8px 0 0 0; color: #94a3b8;">Your ${subscription.frequency} job digest</p>
            </td>
        </tr>
        
        <!-- Greeting -->
        <tr>
            <td style="padding: 24px 24px 16px 24px;">
                <p style="margin: 0; color: #f8fafc; font-size: 16px;">
                    ${greeting}! Here are ${jobs.length} new veteran-friendly jobs${mosText}:
                </p>
            </td>
        </tr>
        
        <!-- Job Cards -->
        <tr>
            <td style="padding: 0 24px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; border-radius: 8px;">
                    ${jobCards}
                </table>
            </td>
        </tr>
        
        <!-- CTA -->
        <tr>
            <td style="padding: 24px; text-align: center;">
                <a href="https://caprica.com/jobs" style="display: inline-block; padding: 12px 24px; background: #f59e0b; color: #0f172a; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                    View All Jobs
                </a>
            </td>
        </tr>
        
        <!-- Footer -->
        <tr>
            <td style="padding: 24px; text-align: center; border-top: 1px solid #334155; color: #64748b; font-size: 12px;">
                <p style="margin: 0 0 8px 0;">You're receiving this because you subscribed to job alerts.</p>
                <a href="https://caprica.com/api/alerts/unsubscribe?id=${subscription.id}" style="color: #94a3b8;">
                    Unsubscribe
                </a>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
}

function generateConfirmationHTML(email: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #1e293b;">
        <tr>
            <td style="padding: 32px; text-align: center;">
                <h1 style="margin: 0 0 16px 0; color: #f59e0b; font-size: 32px;">🎖️ You're Subscribed!</h1>
                <p style="margin: 0 0 24px 0; color: #f8fafc; font-size: 18px;">
                    Welcome to Caprica Job Alerts
                </p>
                <p style="margin: 0 0 24px 0; color: #94a3b8; font-size: 16px;">
                    We'll send veteran-friendly job opportunities to ${email} based on your preferences.
                </p>
                <a href="https://caprica.com/jobs" style="display: inline-block; padding: 12px 24px; background: #f59e0b; color: #0f172a; text-decoration: none; border-radius: 8px; font-weight: 600;">
                    Browse Jobs Now
                </a>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
}

// Email sending functions
export async function sendJobAlertEmail(
    subscription: JobAlertSubscription,
    jobs: JobMatch[]
): Promise<{ success: boolean; error?: string }> {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
        // Dev mode: log email instead of sending
        console.log('\n📧 [DEV] Job Alert Email:');
        console.log(`   To: ${subscription.email}`);
        console.log(`   Jobs: ${jobs.length}`);
        return { success: true };  // Return success in dev mode
    }

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'Caprica Jobs <jobs@caprica.com>',
                to: subscription.email,
                subject: `${jobs.length} New Veteran Jobs ${subscription.mos ? `for ${subscription.mos}` : ''} | Caprica`,
                html: generateJobAlertHTML(subscription, jobs),
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            return { success: false, error };
        }

        return { success: true };
    } catch (error) {
        return { success: false, error: String(error) };
    }
}

export async function sendConfirmationEmail(
    email: string
): Promise<{ success: boolean; error?: string }> {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
        // Dev mode: log confirmation instead of sending
        console.log('\n✅ [DEV] Confirmation Email:');
        console.log(`   To: ${email}`);
        return { success: true };  // Return success in dev mode
    }

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'Caprica <welcome@caprica.com>',
                to: email,
                subject: '✅ You\'re Subscribed to Caprica Job Alerts',
                html: generateConfirmationHTML(email),
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            return { success: false, error };
        }

        return { success: true };
    } catch (error) {
        return { success: false, error: String(error) };
    }
}

export { generateJobAlertHTML, generateConfirmationHTML };
export type { JobMatch, JobAlertSubscription };
