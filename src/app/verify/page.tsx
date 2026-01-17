'use client';

import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import { getVAAuthorizationUrl } from '@/lib/va-auth';
import { Suspense, useState, useEffect } from 'react';

// Wrapper component to handle client-side env vars securely
function ConnectButton() {
    const [authUrl, setAuthUrl] = useState('');

    useEffect(() => {
        // Generating URL on client side to ensure env vars are loaded
        setAuthUrl(getVAAuthorizationUrl());
    }, []);

    return (
        <a
            href={authUrl}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-all shadow-lg hover:shadow-blue-500/30"
        >
            <img src="https://design.va.gov/images/va-logo-white.png" alt="VA Logo" className="h-8 w-auto" />
            Verify with ID.me / VA.gov
        </a>
    );
}

function VerifyContent() {
    const searchParams = useSearchParams();
    const isVerified = searchParams.get('verified') === 'true';
    const error = searchParams.get('error');
    const name = searchParams.get('name') || 'Adama';
    const rank = searchParams.get('rank') || 'Commander';

    return (
        <div className="container mx-auto px-6 py-12 max-w-4xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Verify Your Service</h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    Get the "Verified Veteran" badge to stand out to employers. We use the official VA Lighthouse API to securely confirm your service history.
                </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl max-w-2xl mx-auto relative overflow-hidden">
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                        Verification Failed. Please try again.
                    </div>
                )}

                {!isVerified ? (
                    <div className="text-center py-8">
                        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-4xl grayscale">🛡️</span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-3">Connect Your Government Account</h2>
                        <p className="text-slate-500 mb-8">
                            Sign in securely via ID.me or DS Logon. We verified discharge status and dates of service only.
                        </p>

                        <ConnectButton />

                        <p className="mt-4 text-xs text-slate-400">
                            Secure connection via VA Lighthouse API v1
                        </p>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                            <span className="text-4xl">✅</span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Verification Successful</h2>
                        <div className="inline-block px-4 py-1 bg-green-100 text-green-700 font-bold rounded-full text-sm mb-6 border border-green-200">
                            VERIFIED VETERAN
                        </div>

                        <div className="bg-slate-50 rounded-xl p-6 mb-8 text-left border border-slate-200">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-xs text-slate-500 uppercase font-semibold">Name</div>
                                    <div className="font-medium text-slate-900">{name}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 uppercase font-semibold">Rank</div>
                                    <div className="font-medium text-slate-900">{rank}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 uppercase font-semibold">Status</div>
                                    <div className="font-medium text-slate-900">Honorable Discharge</div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 uppercase font-semibold">Clearance Eligibility</div>
                                    <div className="font-medium text-blue-600">Verified</div>
                                </div>
                            </div>
                        </div>

                        <a href="/profile" className="text-blue-600 font-semibold hover:text-blue-500">
                            Continue to Profile →
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function VerifyPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading...</div>}>
                <VerifyContent />
            </Suspense>
        </div>
    );
}
