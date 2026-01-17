'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getTranslation } from '@/lib/mos-translations';

interface ProfileData {
    name: string;
    email: string;
    mos: string;
    branch: string;
    rank: string;
    yearsServed: string;
    clearanceLevel: string;
    separationDate: string;
    preferredLocations: string;
    remotePreference: string;
    salaryExpectation: string;
    asvabResults: {
        gt?: number;
        ar?: number;
        wk?: number;
        pc?: number;
        mk?: number;
    };
}

const BRANCHES = ['Army', 'Navy', 'Air Force', 'Marines', 'Coast Guard', 'Space Force'];
const CLEARANCE_LEVELS = ['None', 'Public Trust', 'Secret', 'Top Secret', 'TS/SCI', 'TS/SCI with Poly'];
const REMOTE_PREFERENCES = ['Any', 'Remote Only', 'Hybrid', 'On-site'];

export default function ProfilePage() {
    const [profile, setProfile] = useState<ProfileData>({
        name: '',
        email: '',
        mos: '',
        branch: '',
        rank: '',
        yearsServed: '',
        clearanceLevel: '',
        separationDate: '',
        preferredLocations: '',
        remotePreference: 'Any',
        salaryExpectation: '',
        asvabResults: {},
    });
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [mosTranslation, setMosTranslation] = useState<ReturnType<typeof getTranslation>>(null);

    // Update MOS translation when MOS changes
    useEffect(() => {
        if (profile.mos) {
            const translation = getTranslation(profile.mos);
            setMosTranslation(translation);
        } else {
            setMosTranslation(null);
        }
    }, [profile.mos]);

    const handleSave = async () => {
        setSaving(true);
        try {
            // For now, save to localStorage (will connect to API with auth)
            localStorage.setItem('caprica-profile', JSON.stringify(profile));
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } finally {
            setSaving(false);
        }
    };

    // Load profile from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('caprica-profile');
        if (saved) {
            setProfile(JSON.parse(saved));
        }
    }, []);

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
                    <Link href="/veterans" className="text-slate-300 hover:text-white">MOS Translator</Link>
                    <Link href="/jobs" className="text-slate-300 hover:text-white">Jobs</Link>
                    <Link href="/alerts" className="text-slate-300 hover:text-white">Job Alerts</Link>
                </div>
            </nav>

            <main className="container mx-auto px-6 py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-4">
                            Your Veteran Profile
                        </h1>
                        <p className="text-slate-300">
                            Save your military background to get personalized job matches and career recommendations.
                        </p>
                    </div>

                    {/* Profile Form */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Personal Info */}
                        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                            <h2 className="text-xl font-semibold text-white mb-6">Personal Information</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-slate-300 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={profile.name}
                                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-slate-300 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={profile.email}
                                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Military Background */}
                        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                            <h2 className="text-xl font-semibold text-white mb-6">Military Background</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-slate-300 mb-1">Branch</label>
                                    <select
                                        value={profile.branch}
                                        onChange={(e) => setProfile({ ...profile, branch: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                                    >
                                        <option value="">Select Branch</option>
                                        {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-slate-300 mb-1">MOS / Rate / AFSC</label>
                                    <input
                                        type="text"
                                        value={profile.mos}
                                        onChange={(e) => setProfile({ ...profile, mos: e.target.value.toUpperCase() })}
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400"
                                        placeholder="e.g., 11B, 17C, 68W"
                                    />
                                    {mosTranslation && (
                                        <p className="text-amber-400 text-sm mt-2">
                                            ✓ {mosTranslation.title} - {mosTranslation.careerField}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-slate-300 mb-1">Rank</label>
                                        <input
                                            type="text"
                                            value={profile.rank}
                                            onChange={(e) => setProfile({ ...profile, rank: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400"
                                            placeholder="e.g., SSG, CPT"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-300 mb-1">Years Served</label>
                                        <input
                                            type="number"
                                            value={profile.yearsServed}
                                            onChange={(e) => setProfile({ ...profile, yearsServed: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400"
                                            placeholder="e.g., 4"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-slate-300 mb-1">Security Clearance</label>
                                    <select
                                        value={profile.clearanceLevel}
                                        onChange={(e) => setProfile({ ...profile, clearanceLevel: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                                    >
                                        <option value="">Select Clearance</option>
                                        {CLEARANCE_LEVELS.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Job Preferences */}
                        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                            <h2 className="text-xl font-semibold text-white mb-6">Job Preferences</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-slate-300 mb-1">Preferred Locations</label>
                                    <input
                                        type="text"
                                        value={profile.preferredLocations}
                                        onChange={(e) => setProfile({ ...profile, preferredLocations: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400"
                                        placeholder="e.g., San Diego, Denver, Remote"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-slate-300 mb-1">Work Preference</label>
                                    <select
                                        value={profile.remotePreference}
                                        onChange={(e) => setProfile({ ...profile, remotePreference: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                                    >
                                        {REMOTE_PREFERENCES.map(r => <option key={r} value={r}>{r}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-slate-300 mb-1">Minimum Salary</label>
                                    <input
                                        type="number"
                                        value={profile.salaryExpectation}
                                        onChange={(e) => setProfile({ ...profile, salaryExpectation: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400"
                                        placeholder="e.g., 75000"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Assessment Results */}
                        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                            <h2 className="text-xl font-semibold text-white mb-6">Assessment Results</h2>

                            {profile.asvabResults.gt ? (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-300">General Technical (GT)</span>
                                        <span className="text-amber-400 font-semibold">{profile.asvabResults.gt}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-300">Arithmetic Reasoning</span>
                                        <span className="text-amber-400 font-semibold">{profile.asvabResults.ar}</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-slate-400 mb-4">No assessment results yet</p>
                                    <Link href="/asvab" className="text-amber-400 hover:text-amber-300">
                                        Take ASVAB Practice Test →
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="mt-8 text-center">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-8 py-4 bg-amber-500 text-slate-900 rounded-xl font-semibold hover:bg-amber-400 transition-all disabled:opacity-50"
                        >
                            {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Profile'}
                        </button>
                    </div>

                    {/* Quick Links */}
                    <div className="grid md:grid-cols-3 gap-6 mt-12">
                        <Link href="/resume" className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-amber-500/50 transition-colors">
                            <h3 className="font-semibold text-white mb-2">📄 Resume Builder</h3>
                            <p className="text-slate-400 text-sm">Create a civilian-ready resume from your military experience.</p>
                        </Link>
                        <Link href="/jobs" className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-amber-500/50 transition-colors">
                            <h3 className="font-semibold text-white mb-2">💼 Browse Jobs</h3>
                            <p className="text-slate-400 text-sm">Find veteran-friendly employers hiring now.</p>
                        </Link>
                        <Link href="/chat" className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-amber-500/50 transition-colors">
                            <h3 className="font-semibold text-white mb-2">💬 Career Advisor</h3>
                            <p className="text-slate-400 text-sm">Chat with Caprica AI for personalized guidance.</p>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
