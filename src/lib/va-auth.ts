export interface VATokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    id_token: string;
}

const VA_AUTHORIZE_URL = 'https://sandbox-api.va.gov/oauth2/veteran-verification/v1/authorization';
const VA_TOKEN_URL = 'https://sandbox-api.va.gov/oauth2/veteran-verification/v1/token';

export function getVAAuthorizationUrl(): string {
    const isMock = process.env.NEXT_PUBLIC_USE_MOCK_VA !== 'false'; // Default to true for demo
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/auth/callback/va`;

    if (isMock) {
        // In mock mode, we redirect directly to our own callback with a fake code
        return `${redirectUri}?code=MOCK_AUTH_CODE&state=mock_state`;
    }

    const clientId = process.env.VA_CLIENT_ID;
    const scope = 'openid profile offline_access service_history.read veteran_status.read';
    const state = Math.random().toString(36).substring(7); // Simple state for now

    const params = new URLSearchParams({
        client_id: clientId || '',
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: scope,
        state: state
    });

    return `${VA_AUTHORIZE_URL}?${params.toString()}`;
}

export async function exchangeCodeForVAToken(code: string): Promise<VATokenResponse> {
    const isMock = process.env.NEXT_PUBLIC_USE_MOCK_VA !== 'false'; // Default to true for demo

    if (isMock && code === 'MOCK_AUTH_CODE') {
        return {
            access_token: 'mock_access_token_12345',
            token_type: 'Bearer',
            expires_in: 3600,
            scope: 'openid profile',
            id_token: 'mock_id_token'
        };
    }

    const clientId = process.env.VA_CLIENT_ID;
    const clientSecret = process.env.VA_CLIENT_SECRET;
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/auth/callback/va`;

    const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        client_id: clientId || '',
        client_secret: clientSecret || '',
        redirect_uri: redirectUri
    });

    const response = await fetch(VA_TOKEN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body.toString()
    });

    if (!response.ok) {
        throw new Error(`Token Exchange Failed: ${response.statusText}`);
    }

    return response.json();
}
