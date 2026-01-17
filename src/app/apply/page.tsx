'use client';

import { useState } from 'react';
import ChatAgent from '@/components/ChatAgent';
import Link from 'next/link';

export default function ApplyPage() {
    const [candidateData, setCandidateData] = useState<Record<string, unknown> | null>(null);
    const [showUpload, setShowUpload] = useState(false);

    const handleComplete = (data: Record<string, unknown>) => {
        setCandidateData(data);
        setShowUpload(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#1073E8] to-[#7C3AED] rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">C</span>
                        </div>
                        <span className="text-xl font-bold text-[#111827]">Caprica</span>
                    </Link>
                    <div className="text-sm text-gray-500">
                        🔒 Your information is secure
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Hero */}
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-[#111827] mb-4">
                            Find Your <span className="bg-gradient-to-r from-[#1073E8] to-[#7C3AED] bg-clip-text text-transparent">Perfect Career</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Our AI career advisor will learn about your skills and goals to match you with opportunities that fit.
                        </p>
                    </div>

                    {/* Application Form or Upload */}
                    {!showUpload ? (
                        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
                            <h2 className="text-2xl font-bold text-brand-navy mb-8">Personal Details</h2>
                            <form className="space-y-6" onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                handleComplete(Object.fromEntries(formData));
                            }}>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                                        <input
                                            required
                                            name="name"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-gold transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                                        <input
                                            required
                                            name="email"
                                            type="email"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-gold transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">MOS/Rate</label>
                                        <input
                                            name="mos"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-gold transition-all"
                                            placeholder="e.g. 11B"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Years of Service</label>
                                        <input
                                            name="experienceYears"
                                            type="number"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-gold transition-all"
                                            placeholder="4"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Top Skills</label>
                                    <input
                                        name="skills"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-gold transition-all"
                                        placeholder="Leadership, Logistics, Security..."
                                    />
                                    <p className="text-[10px] text-gray-400 mt-2">Separate with commas</p>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-brand-navy text-white rounded-xl font-black text-lg shadow-lg hover:bg-brand-navy-light transition-all transform hover:-translate-y-1 active:scale-95"
                                >
                                    Continue to Resume Upload →
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
                            <div className="text-center mb-10">
                                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                                    <span className="text-3xl">✓</span>
                                </div>
                                <h2 className="text-2xl font-bold text-brand-navy mb-2 tracking-tight">Great progress, {candidateData?.name as string || 'there'}!</h2>
                                <p className="text-gray-500 font-medium font-bold">Now let's upload your resume to find the best high-value matches.</p>
                            </div>

                            {/* Resume Upload */}
                            <div className="border-4 border-dashed border-gray-100 rounded-3xl p-12 text-center hover:border-brand-gold/50 transition-all cursor-pointer bg-gray-50/50 group">
                                <input
                                    type="file"
                                    id="resume"
                                    accept=".pdf,.doc,.docx"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            console.log('Resume uploaded:', file.name);
                                        }
                                    }}
                                />
                                <label htmlFor="resume" className="cursor-pointer">
                                    <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">📄</div>
                                    <p className="text-xl font-black text-brand-navy mb-2">
                                        Drop your resume here
                                    </p>
                                    <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">
                                        Click to browse (PDF, DOC, DOCX)
                                    </p>
                                </label>
                            </div>

                            {/* Actions */}
                            <div className="mt-10 flex gap-4">
                                <button
                                    onClick={() => setShowUpload(false)}
                                    className="flex-1 px-8 py-4 rounded-xl border-2 border-gray-100 text-brand-navy font-black hover:bg-gray-50 transition-all"
                                >
                                    ← Edit Profile
                                </button>
                                <button
                                    className="flex-1 px-8 py-4 rounded-xl text-white font-black bg-brand-navy hover:bg-brand-navy-light transition-all shadow-lg active:scale-95"
                                >
                                    Finish Application →
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
