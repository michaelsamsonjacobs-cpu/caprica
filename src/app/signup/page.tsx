'use client';

import { useState } from 'react';
import Link from 'next/link';

// User types
type UserType = 'veteran' | 'recruit' | null;

interface SignupData {
    userType: UserType;
    email: string;
    name: string;
    // Veteran fields
    mos?: string;
    branch?: string;
    yearsServed?: string;
    separationDate?: string;
    clearance?: string;
    // Recruit fields
    age?: string;
    interests?: string[];
    asvabTaken?: boolean;
    targetBranch?: string;
}

export default function SignupPage() {
    const [step, setStep] = useState(1);
    const [data, setData] = useState<SignupData>({
        userType: null,
        email: '',
        name: '',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        // In production, this would call an API
        console.log('Signup data:', data);
        await new Promise(r => setTimeout(r, 1000));
        setLoading(false);
        setStep(4); // Success
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">🎖️</div>
                    <span className="text-xl font-bold text-white">Caprica</span>
                </Link>
                <Link href="/" className="text-slate-300 hover:text-white">← Home</Link>
            </nav>

            <main className="container mx-auto px-6 py-12">
                <div className="max-w-lg mx-auto">
                    {/* Progress */}
                    {step < 4 && (
                        <div className="flex gap-2 mb-8">
                            {[1, 2, 3].map(s => (
                                <div key={s} className={`flex-1 h-1 rounded-full ${s <= step ? 'bg-amber-500' : 'bg-slate-700'}`} />
                            ))}
                        </div>
                    )}

                    {/* Step 1: User Type */}
                    {step === 1 && (
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">Create Your Account</h1>
                            <p className="text-slate-400 mb-8">Which best describes you?</p>

                            <div className="space-y-4">
                                <button
                                    onClick={() => { setData({ ...data, userType: 'veteran' }); setStep(2); }}
                                    className="w-full p-6 bg-slate-800 border border-slate-700 rounded-xl text-left hover:border-amber-500/50 transition"
                                >
                                    <div className="text-3xl mb-2">🎖️</div>
                                    <h3 className="text-xl font-semibold text-white mb-1">I'm a Veteran</h3>
                                    <p className="text-slate-400 text-sm">Recently separated or leaving the service, looking for civilian careers</p>
                                </button>

                                <button
                                    onClick={() => { setData({ ...data, userType: 'recruit' }); setStep(2); }}
                                    className="w-full p-6 bg-slate-800 border border-slate-700 rounded-xl text-left hover:border-amber-500/50 transition"
                                >
                                    <div className="text-3xl mb-2">🔍</div>
                                    <h3 className="text-xl font-semibold text-white mb-1">Exploring Military</h3>
                                    <p className="text-slate-400 text-sm">Considering joining and want to find the right MOS</p>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Basic Info */}
                    {step === 2 && (
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">Basic Information</h1>
                            <p className="text-slate-400 mb-8">Let's get you set up</p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData({ ...data, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData({ ...data, email: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between mt-8">
                                <button onClick={() => setStep(1)} className="text-slate-400 hover:text-white">← Back</button>
                                <button
                                    onClick={() => setStep(3)}
                                    disabled={!data.name || !data.email}
                                    className="px-6 py-2 bg-amber-500 text-slate-900 rounded-lg font-medium disabled:opacity-50"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Profile Details */}
                    {step === 3 && data.userType === 'veteran' && (
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">Your Service</h1>
                            <p className="text-slate-400 mb-8">Help us match you to the right opportunities</p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Branch</label>
                                    <select
                                        value={data.branch || ''}
                                        onChange={e => setData({ ...data, branch: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                                    >
                                        <option value="">Select branch</option>
                                        <option value="army">Army</option>
                                        <option value="navy">Navy</option>
                                        <option value="airforce">Air Force</option>
                                        <option value="marines">Marines</option>
                                        <option value="coastguard">Coast Guard</option>
                                        <option value="spaceforce">Space Force</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Primary MOS/Rate/AFSC</label>
                                    <input
                                        type="text"
                                        value={data.mos || ''}
                                        onChange={e => setData({ ...data, mos: e.target.value.toUpperCase() })}
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                                        placeholder="e.g., 11B, 17C, OS"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Years of Service</label>
                                    <select
                                        value={data.yearsServed || ''}
                                        onChange={e => setData({ ...data, yearsServed: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                                    >
                                        <option value="">Select</option>
                                        <option value="1-4">1-4 years</option>
                                        <option value="5-10">5-10 years</option>
                                        <option value="11-20">11-20 years</option>
                                        <option value="20+">20+ years</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Security Clearance</label>
                                    <select
                                        value={data.clearance || ''}
                                        onChange={e => setData({ ...data, clearance: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                                    >
                                        <option value="">Select</option>
                                        <option value="none">None</option>
                                        <option value="secret">Secret</option>
                                        <option value="topsecret">Top Secret</option>
                                        <option value="tssci">TS/SCI</option>
                                        <option value="poly">TS/SCI with Poly</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-between mt-8">
                                <button onClick={() => setStep(2)} className="text-slate-400 hover:text-white">← Back</button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="px-6 py-2 bg-amber-500 text-slate-900 rounded-lg font-medium disabled:opacity-50"
                                >
                                    {loading ? 'Creating...' : 'Create Account'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Recruit Profile */}
                    {step === 3 && data.userType === 'recruit' && (
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">About You</h1>
                            <p className="text-slate-400 mb-8">Help us find the right MOS for you</p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Age</label>
                                    <select
                                        value={data.age || ''}
                                        onChange={e => setData({ ...data, age: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                                    >
                                        <option value="">Select</option>
                                        <option value="17">17</option>
                                        <option value="18-20">18-20</option>
                                        <option value="21-25">21-25</option>
                                        <option value="26-30">26-30</option>
                                        <option value="31+">31+</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Interested Branch</label>
                                    <select
                                        value={data.targetBranch || ''}
                                        onChange={e => setData({ ...data, targetBranch: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                                    >
                                        <option value="">Not sure yet</option>
                                        <option value="army">Army</option>
                                        <option value="navy">Navy</option>
                                        <option value="airforce">Air Force</option>
                                        <option value="marines">Marines</option>
                                        <option value="coastguard">Coast Guard</option>
                                        <option value="spaceforce">Space Force</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Have you taken the ASVAB?</label>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setData({ ...data, asvabTaken: true })}
                                            className={`flex-1 p-3 rounded-lg border ${data.asvabTaken ? 'border-amber-500 bg-amber-500/20 text-white' : 'border-slate-600 text-slate-400'}`}
                                        >
                                            Yes
                                        </button>
                                        <button
                                            onClick={() => setData({ ...data, asvabTaken: false })}
                                            className={`flex-1 p-3 rounded-lg border ${data.asvabTaken === false ? 'border-amber-500 bg-amber-500/20 text-white' : 'border-slate-600 text-slate-400'}`}
                                        >
                                            Not yet
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between mt-8">
                                <button onClick={() => setStep(2)} className="text-slate-400 hover:text-white">← Back</button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="px-6 py-2 bg-amber-500 text-slate-900 rounded-lg font-medium disabled:opacity-50"
                                >
                                    {loading ? 'Creating...' : 'Create Account'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Success */}
                    {step === 4 && (
                        <div className="text-center">
                            <div className="text-6xl mb-4">✅</div>
                            <h1 className="text-3xl font-bold text-white mb-2">Welcome to Caprica!</h1>
                            <p className="text-slate-400 mb-8">Your account has been created. Here's what's next:</p>

                            <div className="space-y-4">
                                {data.userType === 'veteran' ? (
                                    <>
                                        <Link href="/veterans" className="block p-4 bg-slate-800 border border-slate-700 rounded-xl hover:border-amber-500/50">
                                            <h3 className="font-medium text-white">🎯 Translate Your MOS</h3>
                                            <p className="text-sm text-slate-400">See your civilian career matches</p>
                                        </Link>
                                        <Link href="/veteran-skills" className="block p-4 bg-slate-800 border border-slate-700 rounded-xl hover:border-amber-500/50">
                                            <h3 className="font-medium text-white">📋 Skills Assessment</h3>
                                            <p className="text-sm text-slate-400">Get personalized resume bullets</p>
                                        </Link>
                                        <Link href="/jobs" className="block p-4 bg-slate-800 border border-slate-700 rounded-xl hover:border-amber-500/50">
                                            <h3 className="font-medium text-white">💼 Browse Jobs</h3>
                                            <p className="text-sm text-slate-400">Find veteran-friendly employers</p>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/asvab" className="block p-4 bg-slate-800 border border-slate-700 rounded-xl hover:border-amber-500/50">
                                            <h3 className="font-medium text-white">📝 ASVAB Predictor</h3>
                                            <p className="text-sm text-slate-400">Estimate your score</p>
                                        </Link>
                                        <Link href="/explore" className="block p-4 bg-slate-800 border border-slate-700 rounded-xl hover:border-amber-500/50">
                                            <h3 className="font-medium text-white">🔍 Find Your MOS</h3>
                                            <p className="text-sm text-slate-400">Discover the right career</p>
                                        </Link>
                                        <Link href="/chat" className="block p-4 bg-slate-800 border border-slate-700 rounded-xl hover:border-amber-500/50">
                                            <h3 className="font-medium text-white">💬 Talk to Caprica</h3>
                                            <p className="text-sm text-slate-400">Get personalized guidance</p>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
