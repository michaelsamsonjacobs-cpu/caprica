'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { MOS_TRANSLATIONS, getTranslation, getAllMOSCodes, MOSTranslation } from '@/lib/mos-translations';

// Quick select MOS for display
const QUICK_SELECT_MOS = [
    { code: '11B', title: 'Infantryman', field: 'Combat' },
    { code: '17C', title: 'Cyber Operations', field: 'Cyber' },
    { code: '25B', title: 'IT Specialist', field: 'IT' },
    { code: '35F', title: 'Intel Analyst', field: 'Intelligence' },
    { code: '68W', title: 'Combat Medic', field: 'Medical' },
    { code: '88M', title: 'Motor Transport', field: 'Transportation' },
    { code: '31B', title: 'Military Police', field: 'Law Enforcement' },
    { code: '15W', title: 'UAV Operator', field: 'Aviation' },
];

export default function VeteransPage() {
    const [searchMOS, setSearchMOS] = useState('');
    const [translation, setTranslation] = useState<MOSTranslation | null>(null);
    const [step, setStep] = useState<'search' | 'results'>('search');
    const [notFound, setNotFound] = useState(false);

    const handleSearch = () => {
        const result = getTranslation(searchMOS);
        if (result) {
            setTranslation(result);
            setStep('results');
            setNotFound(false);
        } else {
            setNotFound(true);
        }
    };

    const handleQuickSelect = (code: string) => {
        const result = getTranslation(code);
        if (result) {
            setSearchMOS(code);
            setTranslation(result);
            setStep('results');
            setNotFound(false);
        }
    };

    const formatSalary = (min: number, max: number) =>
        `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <Header />

            <main className="container mx-auto px-6 py-12">
                {step === 'search' && (
                    <div className="max-w-3xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Translate Your Military Experience
                            </h1>
                            <p className="text-xl text-gray-600">
                                Enter your MOS, Rate, or AFSC to see matching civilian careers
                            </p>
                        </div>

                        {/* Search */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8 shadow-sm">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Your MOS / Rate / AFSC
                            </label>
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    value={searchMOS}
                                    onChange={(e) => { setSearchMOS(e.target.value.toUpperCase()); setNotFound(false); }}
                                    placeholder="e.g., 11B, 17C, 68W, 35F"
                                    className="flex-1 px-4 py-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 text-lg placeholder-gray-400 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold"
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                />
                                <button
                                    onClick={handleSearch}
                                    className="px-8 py-4 bg-brand-gold text-gray-900 rounded-xl font-semibold hover:bg-brand-gold-light transition-colors"
                                >
                                    Translate
                                </button>
                            </div>
                            {notFound && (
                                <p className="text-red-600 text-sm mt-3">
                                    MOS not found. Try one of the quick select options below or contact us to add your MOS.
                                </p>
                            )}
                        </div>

                        <div>
                            <p className="text-sm text-gray-500 mb-4 text-center">Or select a common MOS:</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {QUICK_SELECT_MOS.map((mos) => (
                                    <button
                                        key={mos.code}
                                        onClick={() => handleQuickSelect(mos.code)}
                                        className="p-4 bg-white border border-gray-200 rounded-xl text-left hover:border-brand-gold shadow-sm transition-colors"
                                    >
                                        <div className="font-bold text-gray-900">{mos.code}</div>
                                        <div className="text-sm text-gray-500 truncate">{mos.title}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="text-center mt-12 pt-8 border-t border-gray-200">
                            <p className="text-gray-500 mb-4">Covering {Object.keys(MOS_TRANSLATIONS).length}+ military occupations</p>
                            <div className="flex justify-center gap-8 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-brand-navy">{Object.keys(MOS_TRANSLATIONS).length}+</div>
                                    <div className="text-xs text-gray-500">MOS Codes</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-brand-navy">200+</div>
                                    <div className="text-xs text-gray-500">Civilian Careers</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-brand-navy">2024</div>
                                    <div className="text-xs text-gray-500">Salary Data</div>
                                </div>
                            </div>
                        </div>

                        {/* Skills Assessment CTA */}
                        <div className="mt-12 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/20 rounded-2xl p-8">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="text-4xl">📋</div>
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-xl font-semibold text-white mb-2">Want personalized resume bullets?</h3>
                                    <p className="text-slate-300">Take our 2-minute skills assessment to get tailored job matches and resume content.</p>
                                </div>
                                <Link href="/veteran-skills" className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-400">
                                    Take Assessment
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {step === 'results' && translation && (
                    <div className="max-w-4xl mx-auto">
                        {/* Back Button */}
                        <button
                            onClick={() => { setStep('search'); setTranslation(null); }}
                            className="text-amber-400 mb-6 hover:text-amber-300"
                        >
                            ← Search another MOS
                        </button>

                        {/* Header */}
                        <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-500/20 rounded-2xl p-8 mb-8">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 bg-amber-500 rounded-xl flex items-center justify-center">
                                    <span className="text-2xl font-bold text-slate-900">{translation.code}</span>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-white">{translation.title}</h1>
                                    <p className="text-amber-300">{translation.branch} • {translation.careerField}</p>
                                </div>
                            </div>
                            <p className="text-slate-300">{translation.description}</p>
                        </div>

                        {/* Skills */}
                        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-6">
                            <h2 className="text-lg font-semibold text-white mb-4">Transferable Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {translation.transferableSkills.map((skill, i) => (
                                    <span key={i} className="px-3 py-1 bg-slate-700 text-slate-200 rounded-full text-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Certifications */}
                        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-6">
                            <h2 className="text-lg font-semibold text-white mb-4">Certifications & Credentials</h2>
                            <div className="flex flex-wrap gap-2">
                                {translation.certifications.map((cert, i) => (
                                    <span key={i} className="px-3 py-1 bg-green-900/50 text-green-300 border border-green-700 rounded-full text-sm">
                                        ✓ {cert}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Upskilling Recommendations */}
                        {translation.recommendedCerts && translation.recommendedCerts.length > 0 && (
                            <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/20 rounded-2xl p-6 mb-6">
                                <h2 className="text-lg font-semibold text-white mb-4">🚀 Upskilling Recommendations</h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {translation.recommendedCerts.map((rec, i) => (
                                        <div key={i} className="bg-slate-800/80 p-4 rounded-lg border border-slate-700">
                                            <div className="font-bold text-amber-400 mb-1">{rec.name}</div>
                                            <div className="text-sm text-slate-300">{rec.why}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Civilian Careers */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-white mb-4">Matching Civilian Careers</h2>
                            <div className="space-y-4">
                                {translation.civilianCareers.map((career, i) => (
                                    <div
                                        key={i}
                                        className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-amber-500/30 transition-colors"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-semibold text-white">{career.title}</h3>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${career.match >= 90 ? 'bg-green-900/50 text-green-300' :
                                                career.match >= 80 ? 'bg-amber-900/50 text-amber-300' :
                                                    'bg-slate-700 text-slate-300'
                                                }`}>
                                                {career.match}% Match
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-3 mb-4">
                                            <span className="text-green-400 font-medium">
                                                {formatSalary(career.salaryMin, career.salaryMax)}
                                            </span>
                                            {career.clearanceBonus && (
                                                <span className="text-blue-400 text-sm">🔒 Clearance valued</span>
                                            )}
                                            {career.certRequired && (
                                                <span className="text-amber-400 text-sm">📜 {career.certRequired}</span>
                                            )}
                                        </div>
                                        <div className="flex gap-3">
                                            <Link
                                                href={`/jobs?q=${encodeURIComponent(career.title)}`}
                                                className="px-4 py-2 bg-amber-500 text-slate-900 rounded-lg font-medium hover:bg-amber-400"
                                            >
                                                View Open Jobs
                                            </Link>
                                            <button className="px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700">
                                                Learn More
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTAs */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                                <h3 className="text-lg font-semibold text-white mb-2">📋 Skills Assessment</h3>
                                <p className="text-slate-400 text-sm mb-4">
                                    Get personalized resume bullets based on what you actually did in your role.
                                </p>
                                <Link href="/veteran-skills" className="text-amber-400 hover:text-amber-300">
                                    Take 2-min assessment →
                                </Link>
                            </div>
                            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                                <h3 className="text-lg font-semibold text-white mb-2">💬 Talk to Caprica</h3>
                                <p className="text-slate-400 text-sm mb-4">
                                    Chat with our AI advisor for personalized career guidance.
                                </p>
                                <Link href="/chat" className="text-amber-400 hover:text-amber-300">
                                    Start conversation →
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
