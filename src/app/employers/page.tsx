'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

export default function EmployersPage() {
    // Mock candidate data for the "Live Candidate Preview"
    const candidates = [
        { id: '1', mos: '17C', title: 'Cyber Operations Specialist', clearance: 'TS/SCI', loc: 'Reston, VA', status: 'Separates in 60d' },
        { id: '2', mos: '35F', title: 'Intel Analyst', clearance: 'TS/SCI', loc: 'San Antonio, TX', status: 'Available Now' },
        { id: '3', mos: '11B', title: 'Infantryman (PMP Certified)', clearance: 'Secret', loc: 'Remote', status: 'Separates in 90d' },
        { id: '4', mos: '25B', title: 'IT Specialist', clearance: 'Secret', loc: 'San Diego, CA', status: 'Available Now' },
    ];

    const [activeClearanceFilter, setActiveClearanceFilter] = useState('All');

    const filteredCandidates = activeClearanceFilter === 'All'
        ? candidates
        : candidates.filter(c => c.clearance === activeClearanceFilter);

    return (
        <div className="min-h-screen bg-slate-900">
            <Header />

            <main>
                {/* Hero Section */}
                <section className="relative py-20 px-6 overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none" />

                    <div className="container mx-auto max-w-6xl relative z-10">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="inline-block px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 font-semibold mb-6">
                                    Trusted by 50+ Defense Contractors
                                </div>
                                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                    Hire Cleared Talent <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                                        Before They Exit.
                                    </span>
                                </h1>
                                <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                                    Stop posting on generic job boards. Access the hidden pipeline of TS/SCI veterans entering the workforce *right now*.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button className="px-8 py-4 bg-amber-500 text-slate-900 rounded-xl font-bold text-lg hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20">
                                        Start Hiring Free
                                    </button>
                                    <button className="px-8 py-4 bg-slate-800 border border-slate-700 text-white rounded-xl font-bold text-lg hover:bg-slate-700 transition-all">
                                        View Demo
                                    </button>
                                </div>
                            </div>

                            {/* "Dashboard Preview" UI */}
                            <div className="relative">
                                {/* Glass UI Card */}
                                <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 shadow-2xl">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-white font-semibold">Active Pipeline</h3>
                                        <div className="flex gap-2">
                                            {['All', 'TS/SCI', 'Secret'].map(filter => (
                                                <button
                                                    key={filter}
                                                    onClick={() => setActiveClearanceFilter(filter)}
                                                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${activeClearanceFilter === filter
                                                        ? 'bg-amber-500 text-slate-900'
                                                        : 'bg-slate-700 text-slate-400 hover:text-white'
                                                        }`}
                                                >
                                                    {filter}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {filteredCandidates.map(c => (
                                            <div key={c.id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700/50 hover:border-amber-500/30 transition-colors cursor-pointer group">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-lg shadow-inner">
                                                        🪖
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-white font-medium group-hover:text-amber-400 transition-colors">{c.mos} - {c.title}</span>
                                                            {c.clearance === 'TS/SCI' && (
                                                                <span className="px-1.5 py-0.5 bg-red-900/50 text-red-300 text-[10px] rounded border border-red-500/20">TS/SCI</span>
                                                            )}
                                                        </div>
                                                        <div className="text-xs text-slate-500">{c.loc} • {c.status}</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <button className="text-amber-500 text-sm font-medium hover:text-amber-400">View →</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-slate-700 text-center">
                                        <p className="text-xs text-slate-500">
                                            Showing {filteredCandidates.length} pipeline matches
                                        </p>
                                    </div>
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute -z-10 top-10 -right-10 w-20 h-20 bg-amber-500/20 rounded-full blur-2xl" />
                                <div className="absolute -z-10 -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="py-20 bg-slate-900 border-t border-slate-800">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-white mb-4">Built for Defense Recruiting</h2>
                            <p className="text-slate-400">We speak the language of government contracts.</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                {
                                    icon: "🔐",
                                    title: "Clearance Verification",
                                    desc: "Don't waste time. Filter candidates by active Secret, TS, and TS/SCI clearance status.",
                                    link: null
                                },
                                {
                                    icon: "🧠",
                                    title: "MOS Decoder",
                                    desc: "Our AI translates military codes (17C, 35F) into civilian job titles you actually understand.",
                                    link: null
                                },
                                {
                                    icon: "⚡",
                                    title: "SkillBridge Direct",
                                    desc: "Tap into the DoD SkillBridge program to interview and train candidates while they are still active duty.",
                                    link: null
                                },
                                {
                                    icon: "📧",
                                    title: "White-Label Recruitment",
                                    desc: "Send curated veteran opportunities to your email list, branded as your company. No Caprica visible.",
                                    link: "/employers/whitelabel"
                                }
                            ].map((feature, i) => (
                                feature.link ? (
                                    <Link key={i} href={feature.link} className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-amber-500/30 transition-all group">
                                        <div className="text-4xl mb-4">{feature.icon}</div>
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">{feature.title}</h3>
                                        <p className="text-slate-400 leading-relaxed">
                                            {feature.desc}
                                        </p>
                                        <span className="inline-block mt-4 text-amber-400 text-sm font-medium">Try it →</span>
                                    </Link>
                                ) : (
                                    <div key={i} className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-amber-500/30 transition-all">
                                        <div className="text-4xl mb-4">{feature.icon}</div>
                                        <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                        <p className="text-slate-400 leading-relaxed">
                                            {feature.desc}
                                        </p>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-gradient-to-br from-amber-600 to-amber-700">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to hit your hiring targets?</h2>
                        <p className="text-amber-100 text-lg mb-8 max-w-2xl mx-auto">
                            Join the platform used by forward-thinking defense contractors to secure elite military talent.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button className="px-8 py-3 bg-white text-amber-700 rounded-lg font-bold hover:bg-slate-50 transition-colors shadow-lg">
                                Create Employer Account
                            </button>
                            <button className="px-8 py-3 bg-amber-800/30 text-white border border-white/30 rounded-lg font-semibold hover:bg-amber-800/50 transition-colors">
                                Talk to Sales
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
