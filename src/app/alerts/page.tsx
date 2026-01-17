'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

const MOS_OPTIONS = [
    { code: '11B', title: 'Infantryman' },
    { code: '17C', title: 'Cyber Operations Specialist' },
    { code: '25B', title: 'IT Specialist' },
    { code: '25D', title: 'Cyber Network Defender' },
    { code: '31B', title: 'Military Police' },
    { code: '35F', title: 'Intelligence Analyst' },
    { code: '35N', title: 'Signals Intelligence Analyst' },
    { code: '35P', title: 'Cryptologic Linguist' },
    { code: '68W', title: 'Combat Medic' },
    { code: '88M', title: 'Motor Transport Operator' },
    { code: '92A', title: 'Automated Logistical Specialist' },
    { code: '92Y', title: 'Unit Supply Specialist' },
];

const BRANCH_OPTIONS = ['Army', 'Navy', 'Air Force', 'Marines', 'Coast Guard', 'Space Force'];
const CLEARANCE_OPTIONS = ['None', 'Secret', 'TS/SCI'];
const LOCATION_OPTIONS = ['DC Metro', 'Texas', 'California', 'Florida', 'Remote'];

export default function AlertsPage() {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        mos: '',
        branch: '',
        clearanceLevel: 'None',
        preferredLocations: [] as string[],
        remoteOnly: false,
        frequency: 'weekly',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLocationToggle = (location: string) => {
        setFormData(prev => ({
            ...prev,
            preferredLocations: prev.preferredLocations.includes(location)
                ? prev.preferredLocations.filter(l => l !== location)
                : [...prev.preferredLocations, location],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('/api/alerts/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to subscribe');
            }

            setStatus('success');
        } catch (error) {
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
        }
    };

    if (status === 'success') {
        return (
            <div className="min-h-screen bg-brand-gradient flex items-center justify-center">
                <div className="max-w-md mx-auto text-center p-8">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">✅</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-4">You&apos;re Subscribed!</h1>
                    <p className="text-slate-300 mb-8">
                        We&apos;ll send {formData.frequency} job alerts to {formData.email}
                        {formData.mos && ` matching ${formData.mos}`}.
                    </p>
                    <Link
                        href="/jobs"
                        className="inline-block px-8 py-4 bg-brand-gold text-slate-900 rounded-xl font-semibold hover:bg-brand-gold-light transition-colors"
                    >
                        Browse Jobs Now
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <Header />

            <main className="container mx-auto px-6 py-12">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-900/30 border border-amber-500/30 rounded-full text-amber-300 text-sm mb-6">
                            <span>📧</span>
                            <span>Free Job Alerts</span>
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-4">
                            Get Jobs Matched to Your MOS
                        </h1>
                        <p className="text-xl text-slate-300">
                            Veteran-friendly opportunities delivered to your inbox
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
                            {/* Email */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                    placeholder="your@email.com"
                                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                />
                            </div>

                            {/* Name */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Name (optional)
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="Your name"
                                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500"
                                />
                            </div>

                            {/* MOS */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Your MOS (optional)
                                </label>
                                <select
                                    value={formData.mos}
                                    onChange={e => setFormData(prev => ({ ...prev, mos: e.target.value }))}
                                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-amber-500"
                                >
                                    <option value="">Select MOS...</option>
                                    {MOS_OPTIONS.map(mos => (
                                        <option key={mos.code} value={mos.code}>
                                            {mos.code} - {mos.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Branch */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Branch of Service (optional)
                                </label>
                                <select
                                    value={formData.branch}
                                    onChange={e => setFormData(prev => ({ ...prev, branch: e.target.value }))}
                                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-amber-500"
                                >
                                    <option value="">Select branch...</option>
                                    {BRANCH_OPTIONS.map(branch => (
                                        <option key={branch} value={branch}>{branch}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Clearance */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Security Clearance
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {CLEARANCE_OPTIONS.map(level => (
                                        <button
                                            key={level}
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, clearanceLevel: level }))}
                                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${formData.clearanceLevel === level
                                                ? 'bg-amber-500 text-slate-900'
                                                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                                }`}
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Locations */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Preferred Locations
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {LOCATION_OPTIONS.map(location => (
                                        <button
                                            key={location}
                                            type="button"
                                            onClick={() => handleLocationToggle(location)}
                                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${formData.preferredLocations.includes(location)
                                                ? 'bg-amber-500 text-slate-900'
                                                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                                }`}
                                        >
                                            {location}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Remote Only */}
                            <div className="mb-6">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.remoteOnly}
                                        onChange={e => setFormData(prev => ({ ...prev, remoteOnly: e.target.checked }))}
                                        className="w-5 h-5 rounded border-slate-600 text-amber-500 focus:ring-amber-500"
                                    />
                                    <span className="text-slate-300">Remote opportunities only</span>
                                </label>
                            </div>

                            {/* Frequency */}
                            <div className="mb-8">
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    How often should we send alerts?
                                </label>
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, frequency: 'daily' }))}
                                        className={`flex-1 py-3 rounded-xl font-medium transition-colors ${formData.frequency === 'daily'
                                            ? 'bg-amber-500 text-slate-900'
                                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                            }`}
                                    >
                                        Daily
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, frequency: 'weekly' }))}
                                        className={`flex-1 py-3 rounded-xl font-medium transition-colors ${formData.frequency === 'weekly'
                                            ? 'bg-amber-500 text-slate-900'
                                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                            }`}
                                    >
                                        Weekly
                                    </button>
                                </div>
                            </div>

                            {/* Error */}
                            {status === 'error' && (
                                <div className="mb-6 p-4 bg-red-900/30 border border-red-500/30 rounded-xl text-red-300">
                                    {errorMessage}
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 rounded-xl font-bold text-lg hover:from-amber-400 hover:to-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {status === 'loading' ? 'Subscribing...' : 'Subscribe to Job Alerts'}
                            </button>

                            <p className="mt-4 text-center text-slate-400 text-sm">
                                Free forever. Unsubscribe anytime.
                            </p>
                        </div>
                    </form>

                    {/* Benefits */}
                    <div className="mt-12 grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-3xl mb-3">🎯</div>
                            <h3 className="font-semibold text-white mb-2">MOS-Matched</h3>
                            <p className="text-slate-400 text-sm">Jobs that value your military experience</p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-3">🔒</div>
                            <h3 className="font-semibold text-white mb-2">Clearance-Ready</h3>
                            <p className="text-slate-400 text-sm">Positions requiring security clearance</p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-3">🎖️</div>
                            <h3 className="font-semibold text-white mb-2">Veteran-Friendly</h3>
                            <p className="text-slate-400 text-sm">Employers committed to hiring vets</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
