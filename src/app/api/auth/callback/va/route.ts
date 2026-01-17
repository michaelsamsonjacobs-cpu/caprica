import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForVAToken } from '@/lib/va-auth';
import { getServiceHistory } from '@/lib/va-api';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
        return NextResponse.redirect(new URL('/verify?error=' + error, request.url));
    }

    if (!code) {
        return NextResponse.redirect(new URL('/verify?error=no_code', request.url));
    }

    try {
        // 1. Exchange Code for Token
        const tokenResponse = await exchangeCodeForVAToken(code);

        // 2. Fetch Service History
        const serviceHistory = await getServiceHistory(tokenResponse.access_token);

        // 3. Verify status (Simple logic for now: if we have history, they are verified)
        const isVerified = serviceHistory.data.attributes.service_history.length > 0;

        // 4. In a real app, we would save this to the DB.
        // For this demo, we'll redirect with a query param to show the success state.
        // We are NOT doing cookie sessions properly here to keep it simple for the demo.

        const successUrl = new URL('/verify', request.url);
        successUrl.searchParams.set('verified', 'true');
        successUrl.searchParams.set('name', serviceHistory.data.attributes.last_name);
        successUrl.searchParams.set('rank', serviceHistory.data.attributes.service_history[0].rank);

        return NextResponse.redirect(successUrl);

    } catch (err) {
        console.error("Verification Error:", err);
        return NextResponse.redirect(new URL('/verify?error=verification_failed', request.url));
    }
}
