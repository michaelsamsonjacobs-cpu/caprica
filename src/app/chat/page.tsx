'use client';

import Link from 'next/link';
import ChatAgent from '@/components/ChatAgent';

export default function ChatPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Navigation */}
            <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">🎖️</span>
                    </div>
                    <span className="text-2xl font-bold text-white">Caprica</span>
                </Link>
                <div className="flex items-center gap-6">
                    <Link href="/veterans" className="text-slate-300 hover:text-white">For Veterans</Link>
                    <Link href="/explore" className="text-slate-300 hover:text-white">Explore Military</Link>
                    <Link href="/jobs" className="text-slate-300 hover:text-white">Jobs</Link>
                </div>
            </nav>

            <main className="container mx-auto px-6 py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-4">
                            Talk to Caprica
                        </h1>
                        <p className="text-slate-300">
                            Your AI military career advisor. Get personalized guidance on enlistment paths or post-service placement.
                        </p>
                    </div>

                    {/* Chat Component */}
                    <ChatAgent
                        onComplete={(data) => {
                            console.log('Candidate data collected:', data);
                        }}
                    />

                    {/* Info Cards */}
                    <div className="grid md:grid-cols-2 gap-6 mt-12">
                        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                            <h3 className="font-semibold text-white mb-2">🎖️ For Veterans</h3>
                            <p className="text-slate-400 text-sm">
                                Tell me about your MOS and service, and I'll help translate your skills
                                to civilian careers with real salary data.
                            </p>
                        </div>
                        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                            <h3 className="font-semibold text-white mb-2">🔍 Exploring Military?</h3>
                            <p className="text-slate-400 text-sm">
                                Share your interests and goals, and I'll recommend MOS options
                                across all branches and help you prep for the ASVAB.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
