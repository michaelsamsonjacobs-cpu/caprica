'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function SignInPage() {
    const [loading, setLoading] = useState<string | null>(null);

    const handleSignIn = async (provider: string) => {
        setLoading(provider);
        await signIn(provider, { callbackUrl: '/profile' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
            <div className="w-full max-w-md p-8">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-3">
                        <div className="w-14 h-14 bg-amber-500 rounded-xl flex items-center justify-center">
                            <span className="text-3xl">🎖️</span>
                        </div>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mt-4">Welcome Back</h1>
                    <p className="text-slate-400 mt-2">Sign in to access your veteran profile</p>
                </div>

                {/* Sign In Options */}
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-4">
                    <button
                        onClick={() => handleSignIn('google')}
                        disabled={loading === 'google'}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        {loading === 'google' ? 'Signing in...' : 'Continue with Google'}
                    </button>

                    <button
                        onClick={() => handleSignIn('linkedin')}
                        disabled={loading === 'linkedin'}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#0A66C2] text-white rounded-xl font-medium hover:bg-[#004182] transition-colors disabled:opacity-50"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        {loading === 'linkedin' ? 'Signing in...' : 'Continue with LinkedIn'}
                    </button>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-slate-800 text-slate-400">or</span>
                        </div>
                    </div>

                    <Link
                        href="/profile"
                        className="block w-full text-center px-4 py-3 border border-slate-600 text-slate-300 rounded-xl font-medium hover:bg-slate-700 transition-colors"
                    >
                        Continue as Guest
                    </Link>
                </div>

                {/* Terms */}
                <p className="text-center text-sm text-slate-500 mt-6">
                    By signing in, you agree to our{' '}
                    <Link href="/terms" className="text-amber-400 hover:text-amber-300">Terms of Service</Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-amber-400 hover:text-amber-300">Privacy Policy</Link>
                </p>

                {/* Back to Home */}
                <div className="text-center mt-8">
                    <Link href="/" className="text-slate-400 hover:text-white">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
