'use client';

import { useState } from 'react';
import Link from 'next/link';

// GI Bill rates (2024 estimates)
const GI_BILL_RATES = {
    // Monthly housing allowance varies by location - using national average
    mha_national_avg: 1976,
    // Tuition caps
    private_school_cap: 28937.94,
    public_school_in_state: 'Full tuition covered',
    // Book stipend
    books_annual: 1000,
};

// State veteran benefits (simplified)
const STATE_BENEFITS: Record<string, { tuition: string; property: string; other: string[] }> = {
    'TX': {
        tuition: 'Hazlewood Act: Free tuition at state schools for Texas veterans',
        property: 'Up to $12,000 homestead exemption',
        other: ['State veteran loan program', 'Veteran employment preference'],
    },
    'CA': {
        tuition: 'CalVet fee waiver for children of disabled veterans',
        property: 'Up to $4,000 exemption for disabled veterans',
        other: ['CalVet home loans', 'State parks pass'],
    },
    'FL': {
        tuition: 'Purple Heart recipients: Free tuition at state schools',
        property: 'Homestead exemption for disabled veterans',
        other: ['Veteran employment preference', 'Vehicle registration discount'],
    },
    'VA': {
        tuition: 'Virginia Military Survivors Program',
        property: 'Real estate tax exemption for disabled veterans',
        other: ['Virginia Values Veterans (V3)', 'State hiring preference'],
    },
    'NC': {
        tuition: 'Scholarships for children of war veterans',
        property: 'Disabled veteran homestead exclusion',
        other: ['NC4VETS employment program', 'State parks discount'],
    },
    'GA': {
        tuition: 'HOPE scholarship eligible',
        property: 'Homestead exemption',
        other: ['Georgia Military Friendly program', 'Vehicle tag discount'],
    },
    'WA': {
        tuition: 'Veteran waiver at community colleges',
        property: 'Property tax exemption for disabled vets',
        other: ['Veterans in Piping program', 'State parks pass'],
    },
    'CO': {
        tuition: 'Tuition assistance for Guard/Reserve',
        property: 'Property tax exemption',
        other: ['Colorado Veterans Service Officer', 'Hunting/fishing license discount'],
    },
};

interface CalculatorInputs {
    giPercentage: number;
    serviceYears: number;
    state: string;
    schoolType: 'public' | 'private' | 'vocational';
    enrollmentStatus: 'full' | 'half' | 'quarter';
    dependents: number;
}

export default function BenefitsPage() {
    const [inputs, setInputs] = useState<CalculatorInputs>({
        giPercentage: 100,
        serviceYears: 4,
        state: 'TX',
        schoolType: 'public',
        enrollmentStatus: 'full',
        dependents: 0,
    });

    const [activeTab, setActiveTab] = useState<'gi-bill' | 'va-loan' | 'state'>('gi-bill');

    // Calculate GI Bill benefits
    const calculateGIBill = () => {
        const monthlyRate = (inputs.giPercentage / 100);
        const mha = Math.round(GI_BILL_RATES.mha_national_avg * monthlyRate *
            (inputs.enrollmentStatus === 'full' ? 1 : inputs.enrollmentStatus === 'half' ? 0.5 : 0.25));

        const annualMHA = mha * 9; // 9 months of school
        const books = Math.round(GI_BILL_RATES.books_annual * monthlyRate);

        let tuition = '';
        let tuitionValue = 0;
        if (inputs.schoolType === 'public') {
            tuition = 'Full In-State Tuition';
            tuitionValue = 15000; // Average estimate
        } else if (inputs.schoolType === 'private') {
            tuitionValue = Math.round(GI_BILL_RATES.private_school_cap * monthlyRate);
            tuition = `Up to $${tuitionValue.toLocaleString()}/year`;
        } else {
            tuitionValue = Math.round(GI_BILL_RATES.private_school_cap * monthlyRate);
            tuition = `Up to $${tuitionValue.toLocaleString()}/year for vocational`;
        }

        const totalAnnual = annualMHA + books + tuitionValue;
        const totalDegree = totalAnnual * 4; // 4 year degree

        return { mha, annualMHA, books, tuition, tuitionValue, totalAnnual, totalDegree };
    };

    // Calculate VA Loan benefits
    const calculateVALoan = () => {
        const baseEntitlement = 726200; // 2024 conforming loan limit
        const fundingFee = inputs.serviceYears >= 1 ? 2.15 : 2.4; // First use, down payment < 5%

        return {
            maxLoan: baseEntitlement,
            fundingFee: `${fundingFee}%`,
            fundingFeeExempt: 'Service-connected disability: EXEMPT',
            downPayment: '$0 down payment required',
            pmi: 'No PMI required',
            currentRates: '~6.5-7.5% (varies by lender)',
        };
    };

    const giBill = calculateGIBill();
    const vaLoan = calculateVALoan();
    const stateBenefits = STATE_BENEFITS[inputs.state];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">🎖️</div>
                    <span className="text-xl font-bold text-white">Caprica</span>
                </Link>
                <Link href="/veterans" className="text-slate-300 hover:text-white">← Back</Link>
            </nav>

            <main className="container mx-auto px-6 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Veterans Benefits Calculator</h1>
                        <p className="text-slate-400">Estimate your GI Bill, VA Loan, and state benefits</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-8 bg-slate-800 p-1 rounded-lg">
                        {[
                            { id: 'gi-bill', label: '📚 GI Bill' },
                            { id: 'va-loan', label: '🏠 VA Loan' },
                            { id: 'state', label: '🗺️ State Benefits' },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex-1 py-3 rounded-md font-medium transition ${activeTab === tab.id
                                        ? 'bg-amber-500 text-slate-900'
                                        : 'text-slate-300 hover:text-white'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* GI Bill Calculator */}
                    {activeTab === 'gi-bill' && (
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Inputs */}
                            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                                <h2 className="text-lg font-semibold text-white mb-4">Your Information</h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-slate-300 mb-1">GI Bill Eligibility %</label>
                                        <select
                                            value={inputs.giPercentage}
                                            onChange={e => setInputs({ ...inputs, giPercentage: Number(e.target.value) })}
                                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                                        >
                                            {[100, 90, 80, 70, 60, 50, 40].map(p => (
                                                <option key={p} value={p}>{p}%</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-slate-300 mb-1">School Type</label>
                                        <select
                                            value={inputs.schoolType}
                                            onChange={e => setInputs({ ...inputs, schoolType: e.target.value as any })}
                                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                                        >
                                            <option value="public">Public (In-State)</option>
                                            <option value="private">Private</option>
                                            <option value="vocational">Vocational/Technical</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-slate-300 mb-1">Enrollment Status</label>
                                        <select
                                            value={inputs.enrollmentStatus}
                                            onChange={e => setInputs({ ...inputs, enrollmentStatus: e.target.value as any })}
                                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                                        >
                                            <option value="full">Full-time (12+ credits)</option>
                                            <option value="half">Half-time (6-11 credits)</option>
                                            <option value="quarter">Quarter-time (&lt;6 credits)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-slate-300 mb-1">State (for MHA calculation)</label>
                                        <select
                                            value={inputs.state}
                                            onChange={e => setInputs({ ...inputs, state: e.target.value })}
                                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                                        >
                                            {Object.keys(STATE_BENEFITS).map(s => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Results */}
                            <div className="space-y-4">
                                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-xl p-6">
                                    <div className="text-sm text-green-300 mb-1">Estimated Total (4-year degree)</div>
                                    <div className="text-4xl font-bold text-white">${giBill.totalDegree.toLocaleString()}</div>
                                    <div className="text-green-400 text-sm">in education benefits</div>
                                </div>

                                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                                    <h3 className="font-semibold text-white mb-4">Monthly Breakdown</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Housing Allowance (MHA)</span>
                                            <span className="text-white font-medium">${giBill.mha}/mo</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Tuition & Fees</span>
                                            <span className="text-white font-medium">{giBill.tuition}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Books & Supplies</span>
                                            <span className="text-white font-medium">${giBill.books}/year</span>
                                        </div>
                                        <div className="border-t border-slate-700 pt-3 flex justify-between">
                                            <span className="text-slate-300 font-medium">Annual Total</span>
                                            <span className="text-amber-400 font-bold">${giBill.totalAnnual.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4 text-sm">
                                    <p className="text-blue-300">
                                        💡 <strong>Pro tip:</strong> Yellow Ribbon schools may cover additional costs for private institutions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* VA Loan Calculator */}
                    {activeTab === 'va-loan' && (
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                                <h2 className="text-lg font-semibold text-white mb-4">VA Loan Benefits</h2>

                                <div className="space-y-4">
                                    <div className="p-4 bg-slate-700/50 rounded-lg">
                                        <div className="text-sm text-slate-400">Maximum Loan Amount</div>
                                        <div className="text-2xl font-bold text-white">${vaLoan.maxLoan.toLocaleString()}</div>
                                        <div className="text-xs text-slate-400">2024 conforming loan limit</div>
                                    </div>

                                    <div className="p-4 bg-slate-700/50 rounded-lg">
                                        <div className="text-sm text-slate-400">Down Payment</div>
                                        <div className="text-xl font-bold text-green-400">{vaLoan.downPayment}</div>
                                    </div>

                                    <div className="p-4 bg-slate-700/50 rounded-lg">
                                        <div className="text-sm text-slate-400">PMI Required</div>
                                        <div className="text-xl font-bold text-green-400">{vaLoan.pmi}</div>
                                    </div>

                                    <div className="p-4 bg-slate-700/50 rounded-lg">
                                        <div className="text-sm text-slate-400">VA Funding Fee</div>
                                        <div className="text-xl font-bold text-white">{vaLoan.fundingFee}</div>
                                        <div className="text-xs text-green-400">{vaLoan.fundingFeeExempt}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                                <h2 className="text-lg font-semibold text-white mb-4">VA Loan Advantages</h2>

                                <ul className="space-y-3">
                                    {[
                                        'No down payment required (most cases)',
                                        'No private mortgage insurance (PMI)',
                                        'Competitive interest rates',
                                        'Limited closing costs',
                                        'No prepayment penalties',
                                        'Lifetime benefit (reusable)',
                                        'Lenient credit requirements',
                                        'Assumable loans',
                                    ].map((benefit, i) => (
                                        <li key={i} className="flex items-center gap-2 text-slate-300">
                                            <span className="text-green-400">✓</span>
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-6 p-4 bg-amber-900/20 border border-amber-500/30 rounded-lg">
                                    <p className="text-amber-300 text-sm">
                                        🏠 <strong>Ready to buy?</strong> Get your Certificate of Eligibility (COE) from VA.gov
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* State Benefits */}
                    {activeTab === 'state' && stateBenefits && (
                        <div className="space-y-6">
                            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                                <div className="flex items-center gap-4 mb-6">
                                    <select
                                        value={inputs.state}
                                        onChange={e => setInputs({ ...inputs, state: e.target.value })}
                                        className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                                    >
                                        {Object.keys(STATE_BENEFITS).map(s => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                    <span className="text-slate-300">Select your state</span>
                                </div>

                                <h2 className="text-xl font-semibold text-white mb-4">{inputs.state} Veteran Benefits</h2>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-700/50 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-2xl">📚</span>
                                            <span className="font-medium text-white">Education</span>
                                        </div>
                                        <p className="text-slate-300 text-sm">{stateBenefits.tuition}</p>
                                    </div>

                                    <div className="p-4 bg-slate-700/50 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-2xl">🏠</span>
                                            <span className="font-medium text-white">Property Tax</span>
                                        </div>
                                        <p className="text-slate-300 text-sm">{stateBenefits.property}</p>
                                    </div>
                                </div>

                                <div className="mt-4 p-4 bg-slate-700/50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-2xl">⭐</span>
                                        <span className="font-medium text-white">Other Benefits</span>
                                    </div>
                                    <ul className="space-y-1">
                                        {stateBenefits.other.map((b, i) => (
                                            <li key={i} className="text-slate-300 text-sm flex items-center gap-2">
                                                <span className="text-amber-400">•</span>
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4">
                                <p className="text-blue-300 text-sm">
                                    ℹ️ State benefits vary significantly. Contact your state's Department of Veterans Affairs for complete information.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Resources */}
                    <div className="mt-8 bg-slate-800 border border-slate-700 rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">Official Resources</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            <a href="https://www.va.gov/education/" target="_blank" rel="noopener noreferrer"
                                className="p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition">
                                <div className="font-medium text-white">VA Education</div>
                                <div className="text-sm text-slate-400">GI Bill benefits</div>
                            </a>
                            <a href="https://www.va.gov/housing-assistance/" target="_blank" rel="noopener noreferrer"
                                className="p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition">
                                <div className="font-medium text-white">VA Home Loans</div>
                                <div className="text-sm text-slate-400">Loan information</div>
                            </a>
                            <a href="https://www.va.gov/statedva.htm" target="_blank" rel="noopener noreferrer"
                                className="p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition">
                                <div className="font-medium text-white">State VA Offices</div>
                                <div className="text-sm text-slate-400">Find your local office</div>
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
