'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface MOSInfo {
    code: string;
    title: string;
    branch: string;
    careerField: string;
    description: string;
    dailyDuties: string[];
    idealTraits: string[];
    asvabRequirements: Record<string, number>;
    asvabExplained: string;
    clearanceRequired: string;
    physicalDemand: string;
    signingBonus: number;
    basePay: string;
    additionalPay: string[];
    trainingWeeks: number;
    trainingLocation: string;
    careerProgression: string[];
    civilianPath: string;
    certifications: string[];
    lifestyle: string;
    benefits: string[];
}

function PositionContent() {
    const searchParams = useSearchParams();
    const code = searchParams.get('code');
    const [mosInfo, setMosInfo] = useState<MOSInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (code) {
            loadMOSInfo(code);
        } else {
            setLoading(false);
        }
    }, [code]);

    const loadMOSInfo = async (mosCode: string) => {
        try {
            const res = await fetch(`/api/positions/mos?code=${mosCode}`);
            if (!res.ok) {
                throw new Error('Position not found');
            }
            const data = await res.json();
            setMosInfo(data);
        } catch (err) {
            setError('Could not load position information');
        } finally {
            setLoading(false);
        }
    };

    if (!code) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p>No position code specified</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#1073E8] border-t-transparent"></div>
            </div>
        );
    }

    if (error || !mosInfo) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-gradient-to-r from-[#1073E8] to-[#7C3AED] text-white">
                <div className="container mx-auto px-6 py-4">
                    <Link href="/matches" className="text-white/80 hover:text-white text-sm">
                        ← Back to Matches
                    </Link>
                </div>
                <div className="container mx-auto px-6 pb-8">
                    <div className="flex items-start gap-6">
                        <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                            <span className="text-3xl font-bold">{mosInfo.code}</span>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{mosInfo.title}</h1>
                            <div className="flex items-center gap-4 text-white/80">
                                <span>{mosInfo.branch}</span>
                                <span>•</span>
                                <span>{mosInfo.careerField}</span>
                                {mosInfo.signingBonus > 0 && (
                                    <>
                                        <span>•</span>
                                        <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-sm font-medium">
                                            ${mosInfo.signingBonus.toLocaleString()} Bonus
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        {/* About */}
                        <section className="bg-white rounded-2xl p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">About This Role</h2>
                            <p className="text-gray-600 leading-relaxed">{mosInfo.description}</p>
                        </section>

                        {/* Daily Duties */}
                        <section className="bg-white rounded-2xl p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">What You'll Do</h2>
                            <ul className="space-y-3">
                                {mosInfo.dailyDuties.map((duty, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="w-6 h-6 bg-[#1073E8]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-[#1073E8] text-sm">✓</span>
                                        </span>
                                        <span className="text-gray-600">{duty}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Training */}
                        <section className="bg-white rounded-2xl p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Training</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <div className="text-sm text-gray-500 mb-1">Duration</div>
                                    <div className="text-lg font-semibold">{mosInfo.trainingWeeks} weeks</div>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <div className="text-sm text-gray-500 mb-1">Location</div>
                                    <div className="text-lg font-semibold">{mosInfo.trainingLocation}</div>
                                </div>
                            </div>
                            {mosInfo.certifications.length > 0 && (
                                <div className="mt-4">
                                    <div className="text-sm text-gray-500 mb-2">Certifications Earned</div>
                                    <div className="flex flex-wrap gap-2">
                                        {mosInfo.certifications.map((cert, i) => (
                                            <span key={i} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                                                🎖️ {cert}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* Career Path */}
                        <section className="bg-white rounded-2xl p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Career Progression</h2>
                            <div className="space-y-2">
                                {mosInfo.careerProgression.map((step, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-[#7C3AED]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-[#7C3AED] text-xs font-bold">{i + 1}</span>
                                        </div>
                                        <span className="text-gray-600">{step}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                                <div className="text-sm font-medium text-blue-800 mb-1">Civilian Career Path</div>
                                <div className="text-blue-700">{mosInfo.civilianPath}</div>
                            </div>
                        </section>

                        {/* Lifestyle */}
                        <section className="bg-white rounded-2xl p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">What to Expect</h2>
                            <p className="text-gray-600 leading-relaxed">{mosInfo.lifestyle}</p>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Requirements */}
                        <section className="bg-white rounded-2xl p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">Requirements</h2>

                            <div className="space-y-4">
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">ASVAB Score</div>
                                    <div className="font-semibold text-gray-800">
                                        {Object.entries(mosInfo.asvabRequirements).map(([k, v]) => `${k}: ${v}`).join(', ')}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">{mosInfo.asvabExplained}</div>
                                </div>

                                <div>
                                    <div className="text-sm text-gray-500 mb-1">Security Clearance</div>
                                    <div className="font-semibold text-gray-800">
                                        {mosInfo.clearanceRequired || 'None required'}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-sm text-gray-500 mb-1">Physical Demand</div>
                                    <div className={`font-semibold ${mosInfo.physicalDemand === 'Very High' || mosInfo.physicalDemand === 'Extreme'
                                        ? 'text-red-600'
                                        : mosInfo.physicalDemand === 'High'
                                            ? 'text-orange-600'
                                            : 'text-green-600'
                                        }`}>
                                        {mosInfo.physicalDemand}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Compensation */}
                        <section className="bg-white rounded-2xl p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">Compensation</h2>

                            {mosInfo.signingBonus > 0 && (
                                <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl mb-4">
                                    <div className="text-sm opacity-90">Signing Bonus</div>
                                    <div className="text-2xl font-bold">${mosInfo.signingBonus.toLocaleString()}</div>
                                </div>
                            )}

                            <div className="space-y-3">
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">Base Pay</div>
                                    <div className="font-semibold text-gray-800">{mosInfo.basePay}</div>
                                </div>

                                {mosInfo.additionalPay.length > 0 && (
                                    <div>
                                        <div className="text-sm text-gray-500 mb-2">Additional Benefits</div>
                                        <ul className="space-y-1">
                                            {mosInfo.additionalPay.map((pay, i) => (
                                                <li key={i} className="text-sm text-gray-600">• {pay}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Ideal Traits */}
                        <section className="bg-white rounded-2xl p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">Ideal Candidate</h2>
                            <div className="flex flex-wrap gap-2">
                                {mosInfo.idealTraits.map((trait, i) => (
                                    <span key={i} className="px-3 py-1 bg-[#1073E8]/10 text-[#1073E8] rounded-full text-sm">
                                        {trait}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Benefits */}
                        <section className="bg-white rounded-2xl p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">Benefits</h2>
                            <ul className="space-y-2">
                                {mosInfo.benefits.map((benefit, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                        <span className="text-green-500">✓</span>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* CTA */}
                        <Link
                            href="/apply"
                            className="block w-full py-4 bg-gradient-to-r from-[#1073E8] to-[#7C3AED] text-white text-center rounded-xl font-semibold hover:opacity-90 transition-opacity"
                        >
                            Apply for This Position
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function PositionDetailPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#1073E8] border-t-transparent"></div>
            </div>
        }>
            <PositionContent />
        </Suspense>
    );
}
