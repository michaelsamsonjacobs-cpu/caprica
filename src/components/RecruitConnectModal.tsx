'use client';

import { useState, useEffect } from 'react';
import { getRecruitersForMOS, RecruiterContact } from '@/lib/recruiter-database';

interface RecruitConnectModalProps {
    isOpen: boolean;
    onClose: () => void;
    storyContext?: {
        user: string;
        role: string;
        mosCode?: string;
    };
}

export default function RecruitConnectModal({ isOpen, onClose, storyContext }: RecruitConnectModalProps) {
    const [step, setStep] = useState<'MATCH' | 'FORM' | 'SUCCESS'>('MATCH');
    const [matches, setMatches] = useState<RecruiterContact[]>([]);
    const [loading, setLoading] = useState(true);

    // Reset when opening
    useEffect(() => {
        if (isOpen && storyContext) {
            setStep('MATCH');
            setLoading(true);

            // Extract MOS code from role string (e.g. "17C - Cyber Operations")
            const mosMatch = storyContext.role.match(/^(\d+[A-Z]+)/);
            const mosCode = storyContext.mosCode || (mosMatch ? mosMatch[1] : 'Any');

            // Simulate "AI Matching" delay
            setTimeout(() => {
                const results = getRecruitersForMOS(mosCode);
                setMatches(results);
                setLoading(false);
            }, 1200);
        }
    }, [isOpen, storyContext]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-slate-900 w-full max-w-lg rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
                    <div>
                        <h2 className="text-white font-bold text-lg">Connect with Recruiters</h2>
                        {storyContext && (
                            <p className="text-slate-400 text-xs">Based on interest in: <span className="text-amber-400">{storyContext.role}</span></p>
                        )}
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        ✕
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    {step === 'MATCH' && (
                        <div className="space-y-6">
                            {loading ? (
                                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                                    <p className="text-slate-400 animate-pulse">Analyzing MOS compatibility...</p>
                                </div>
                            ) : (
                                <>
                                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                                        <h3 className="text-amber-400 font-bold mb-1">Targeted Recruiter Matches</h3>
                                        <p className="text-amber-200/70 text-sm">
                                            We found {matches.length} companies specifically looking for veterans with this skillset.
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        {matches.map((recruiter, idx) => (
                                            <div key={idx} className="bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-slate-500 transition-all group">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h4 className="text-white font-bold text-lg group-hover:text-amber-400 transition-colors">
                                                            {recruiter.companyName}
                                                        </h4>
                                                        <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">
                                                            {recruiter.programName}
                                                        </p>
                                                    </div>
                                                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded font-bold border border-green-500/20">
                                                        Active Hiring
                                                    </span>
                                                </div>

                                                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                                                    {recruiter.description}
                                                </p>

                                                <a
                                                    href={recruiter.portalUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block w-full text-center py-2 bg-slate-700 hover:bg-amber-500 hover:text-slate-900 text-white font-semibold rounded-lg transition-all"
                                                >
                                                    Visit Veteran Carrier Portal ↗
                                                </a>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-4 border-t border-slate-800">
                                        <button
                                            onClick={() => setStep('FORM')}
                                            className="w-full py-3 bg-transparent border border-slate-600 text-slate-300 hover:border-white hover:text-white rounded-xl transition-all font-semibold"
                                        >
                                            Request General Recruiter Call
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {step === 'FORM' && (
                        <div className="space-y-4">
                            <p className="text-slate-300 text-sm text-center mb-4">
                                Share your contact info and we will broadcast your meaningful interest to our partner network.
                            </p>

                            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setStep('SUCCESS'); }}>
                                <div>
                                    <label className="block text-slate-400 text-xs mb-1">Full Name</label>
                                    <input type="text" className="w-full bg-slate-800 border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Sgt. John Doe" required />
                                </div>
                                <div>
                                    <label className="block text-slate-400 text-xs mb-1">Email</label>
                                    <input type="email" className="w-full bg-slate-800 border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-amber-500 outline-none" placeholder="john@example.com" required />
                                </div>
                                <div>
                                    <label className="block text-slate-400 text-xs mb-1">Phone</label>
                                    <input type="tel" className="w-full bg-slate-800 border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-amber-500 outline-none" placeholder="(555) 123-4567" />
                                </div>
                                <div className="flex items-center gap-3 pt-2">
                                    <input type="checkbox" id="consent" className="w-5 h-5 rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-amber-500" required />
                                    <label htmlFor="consent" className="text-slate-400 text-xs">
                                        I agree to share my profile with verified veteran recruiters.
                                    </label>
                                </div>

                                <button type="submit" className="w-full py-3 bg-amber-500 text-slate-900 font-bold rounded-xl mt-4 hover:bg-amber-400 transition-colors">
                                    Send Request
                                </button>
                            </form>
                        </div>
                    )}

                    {step === 'SUCCESS' && (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl border-2 border-green-500">
                                <span>✓</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Request Sent!</h3>
                            <p className="text-slate-400 mb-8 max-w-xs mx-auto">
                                Your profile has been flagged for priority review. Expect an email confirmation shortly.
                            </p>
                            <button
                                onClick={onClose}
                                className="px-8 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition-colors font-semibold"
                            >
                                Return to Stories
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
