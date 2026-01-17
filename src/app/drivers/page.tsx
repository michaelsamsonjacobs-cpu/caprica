'use client';

import { useState } from 'react';
import Link from 'next/link';

const CDL_CLASSES = [
    { value: 'A', label: 'Class A (Tractor-Trailer)' },
    { value: 'B', label: 'Class B (Straight Truck)' },
    { value: 'C', label: 'Class C (Small Vehicles)' },
    { value: 'permit', label: 'CDL Permit / In Training' },
    { value: 'none', label: 'No CDL Yet' },
];

const JOB_TYPES = [
    { value: 'otr', label: 'OTR (Over the Road)' },
    { value: 'regional', label: 'Regional' },
    { value: 'local', label: 'Local / Home Daily' },
    { value: 'dedicated', label: 'Dedicated Routes' },
    { value: 'any', label: 'Open to Any' },
];

export default function DriversPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        cdlClass: '',
        jobType: '',
        location: '',
        isVeteran: false,
        yearsExperience: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);

        // In production, save to database and trigger welcome email
        console.log('Candidate signup:', formData);

        // Simulate API call
        await new Promise(r => setTimeout(r, 1000));

        setIsSubmitting(false);
        setIsComplete(true);
    };

    if (isComplete) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
                <div className="container mx-auto px-6 py-20">
                    <div className="max-w-xl mx-auto text-center">
                        <div className="text-6xl mb-6">🎉</div>
                        <h1 className="text-4xl font-bold mb-4">You're In!</h1>
                        <p className="text-xl text-blue-200 mb-8">
                            Check your email for your first batch of matched CDL jobs.
                            We'll send you the best opportunities every day.
                        </p>
                        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-8">
                            <h3 className="font-semibold mb-4">What's Next?</h3>
                            <ul className="text-left space-y-3">
                                <li className="flex items-center gap-3">
                                    <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-sm">✓</span>
                                    <span>Daily job matches sent to your email</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-sm">2</span>
                                    <span>Complete your profile for better matches</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-sm">3</span>
                                    <span>Take the Driver Aptitude Assessment</span>
                                </li>
                            </ul>
                        </div>
                        <Link
                            href="/jobs"
                            className="inline-block px-8 py-4 bg-white text-blue-900 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                        >
                            Browse Jobs Now →
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
            {/* Navigation */}
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                        <span className="text-2xl">🚛</span>
                    </div>
                    <span className="text-xl font-bold">Caprica</span>
                </Link>
                <div className="flex items-center gap-6">
                    <Link href="/jobs" className="text-white/80 hover:text-white">Browse Jobs</Link>
                    <Link href="/login" className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20">Sign In</Link>
                </div>
            </nav>

            {/* Hero */}
            <main className="container mx-auto px-6 py-16">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Value Prop */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 text-yellow-300 rounded-full text-sm font-medium mb-6">
                            <span>🎖️</span>
                            <span>Veteran-Friendly Employers First</span>
                        </div>

                        <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Find CDL Jobs That
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400"> Actually Match</span>
                        </h1>

                        <p className="text-xl text-blue-200 mb-8">
                            Stop scrolling endless listings. Tell us what you want.
                            We'll send you the top matches daily—free.
                        </p>

                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-yellow-400">50k+</div>
                                <div className="text-sm text-blue-200">CDL Jobs</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-yellow-400">500+</div>
                                <div className="text-sm text-blue-200">Carriers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-yellow-400">Free</div>
                                <div className="text-sm text-blue-200">Always</div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {['Werner', 'Schneider', 'J.B. Hunt', 'Swift', 'CRST', 'Ryder'].map(carrier => (
                                <span key={carrier} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                                    {carrier}
                                </span>
                            ))}
                            <span className="px-3 py-1 bg-white/10 rounded-full text-sm">+500 more</span>
                        </div>
                    </div>

                    {/* Right: Signup Form */}
                    <div className="bg-white rounded-3xl p-8 text-gray-800">
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                {[1, 2].map(s => (
                                    <div
                                        key={s}
                                        className={`h-1.5 flex-1 rounded-full ${s <= step ? 'bg-blue-600' : 'bg-gray-200'}`}
                                    />
                                ))}
                            </div>
                            <p className="text-sm text-gray-500">Step {step} of 2</p>
                        </div>

                        {step === 1 && (
                            <>
                                <h2 className="text-2xl font-bold mb-6">Get Your Job Matches</h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="john@email.com"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">CDL Class</label>
                                        <select
                                            value={formData.cdlClass}
                                            onChange={e => setFormData({ ...formData, cdlClass: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Select your CDL class</option>
                                            {CDL_CLASSES.map(opt => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Preferred Job Type</label>
                                        <select
                                            value={formData.jobType}
                                            onChange={e => setFormData({ ...formData, jobType: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">What type of driving?</option>
                                            {JOB_TYPES.map(opt => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <button
                                        onClick={() => setStep(2)}
                                        disabled={!formData.email || !formData.cdlClass}
                                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                                    >
                                        Continue →
                                    </button>
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <button onClick={() => setStep(1)} className="text-blue-600 text-sm mb-4">
                                    ← Back
                                </button>

                                <h2 className="text-2xl font-bold mb-6">Almost There!</h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Your Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="John Smith"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Home City/State</label>
                                        <input
                                            type="text"
                                            value={formData.location}
                                            onChange={e => setFormData({ ...formData, location: e.target.value })}
                                            placeholder="Dallas, TX"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Years of Driving Experience</label>
                                        <select
                                            value={formData.yearsExperience}
                                            onChange={e => setFormData({ ...formData, yearsExperience: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Select experience</option>
                                            <option value="0">New / In Training</option>
                                            <option value="1">Less than 1 year</option>
                                            <option value="2">1-2 years</option>
                                            <option value="5">3-5 years</option>
                                            <option value="10">5-10 years</option>
                                            <option value="15">10+ years</option>
                                        </select>
                                    </div>

                                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.isVeteran}
                                                onChange={e => setFormData({ ...formData, isVeteran: e.target.checked })}
                                                className="w-5 h-5 rounded border-yellow-400 text-yellow-600 focus:ring-yellow-500"
                                            />
                                            <div>
                                                <span className="font-medium text-yellow-800">🎖️ I'm a Veteran</span>
                                                <p className="text-sm text-yellow-600">We'll prioritize veteran-friendly employers</p>
                                            </div>
                                        </label>
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        disabled={!formData.name || isSubmitting}
                                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                                    >
                                        {isSubmitting ? 'Setting Up...' : 'Get My Job Matches 🚛'}
                                    </button>

                                    <p className="text-xs text-gray-500 text-center">
                                        Free forever. Unsubscribe anytime. No spam.
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>

            {/* Social Proof */}
            <section className="container mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Why Drivers Choose Caprica</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: '🎯',
                            title: 'Jobs That Match',
                            desc: 'No more scrolling. We send jobs based on your CDL class, location, and preferences.'
                        },
                        {
                            icon: '💰',
                            title: 'Real Pay Info',
                            desc: 'See actual salary ranges, signing bonuses, and benefits before you apply.'
                        },
                        {
                            icon: '🎖️',
                            title: 'Veteran First',
                            desc: 'Military-friendly carriers highlighted. Your service matters here.'
                        },
                    ].map((item, i) => (
                        <div key={i} className="bg-white/10 backdrop-blur rounded-2xl p-6">
                            <div className="text-4xl mb-4">{item.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-blue-200">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="container mx-auto px-6 py-8 border-t border-white/10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-blue-200">© 2024 Caprica. Careers for America's drivers.</p>
                    <div className="flex gap-6 text-blue-200">
                        <Link href="/privacy" className="hover:text-white">Privacy</Link>
                        <Link href="/terms" className="hover:text-white">Terms</Link>
                        <Link href="/contact" className="hover:text-white">Contact</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
