# Caprica Environment Variables

This file documents the required environment variables for Caprica.

## Database
```
DATABASE_URL="file:./dev.db"
```

## NextAuth
```
NEXTAUTH_URL="http://localhost:3001"
NEXTAUTH_SECRET="your-nextauth-secret-here"  # Generate with: openssl rand -base64 32
```

## Google OAuth
Get credentials from https://console.developers.google.com
```
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## LinkedIn OAuth
Get credentials from https://developer.linkedin.com
```
LINKEDIN_CLIENT_ID="your-linkedin-client-id"
LINKEDIN_CLIENT_SECRET="your-linkedin-client-secret"
```

## Email (Resend)
Get API key from https://resend.com
```
RESEND_API_KEY="your-resend-api-key"
```

## Job Alerts API
For securing the `/api/alerts/send` endpoint
```
ALERTS_API_KEY="your-alerts-api-key"
```
