import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Subscription ID is required' },
                { status: 400 }
            );
        }

        // Find and deactivate subscription
        const subscription = await prisma.jobAlertSubscription.update({
            where: { id },
            data: { isActive: false },
        });

        // Redirect to unsubscribe confirmation page
        return new NextResponse(
            `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Unsubscribed | Caprica</title>
                <style>
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        background: #0f172a;
                        color: #f8fafc;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        min-height: 100vh;
                        margin: 0;
                    }
                    .container {
                        text-align: center;
                        padding: 40px;
                        background: #1e293b;
                        border-radius: 16px;
                        max-width: 400px;
                    }
                    h1 { color: #f59e0b; }
                    p { color: #94a3b8; margin: 16px 0; }
                    a {
                        display: inline-block;
                        padding: 12px 24px;
                        background: #f59e0b;
                        color: #0f172a;
                        text-decoration: none;
                        border-radius: 8px;
                        font-weight: 600;
                        margin-top: 16px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>🎖️ Unsubscribed</h1>
                    <p>You've been removed from Caprica job alerts.</p>
                    <p>Changed your mind? You can always re-subscribe.</p>
                    <a href="/alerts">Manage Preferences</a>
                </div>
            </body>
            </html>
            `,
            {
                headers: { 'Content-Type': 'text/html' },
            }
        );

    } catch (error) {
        console.error('Unsubscribe error:', error);
        return NextResponse.json(
            { error: 'Failed to unsubscribe' },
            { status: 500 }
        );
    }
}
