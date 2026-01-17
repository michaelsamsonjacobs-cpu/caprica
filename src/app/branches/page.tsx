'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { BRANCHES, type BranchInfo } from '@/lib/branches';

type CompareCategory = 'overview' | 'benefits' | 'careers' | 'requirements' | 'lifestyle';

export default function BranchesPage() {
    const [selectedBranches, setSelectedBranches] = useState<string[]>(['army', 'marines']);
    const [activeCategory, setActiveCategory] = useState<CompareCategory>('overview');
    const [expandedBranch, setExpandedBranch] = useState<string | null>(null);

    const toggleBranch = (id: string) => {
        setSelectedBranches(prev => {
            if (prev.includes(id)) {
                return prev.filter(b => b !== id);
            }
            if (prev.length >= 3) {
                return [...prev.slice(1), id];
            }
            return [...prev, id];
        });
    };

    const comparedBranches = BRANCHES.filter(b => selectedBranches.includes(b.id));

    const categories: { id: CompareCategory; label: string; icon: string }[] = [
        { id: 'overview', label: 'Overview', icon: '📋' },
        { id: 'benefits', label: 'Benefits', icon: '🎁' },
        { id: 'careers', label: 'Careers', icon: '💼' },
        { id: 'requirements', label: 'Requirements', icon: '📝' },
        { id: 'lifestyle', label: 'Lifestyle', icon: '🏠' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <Header />

            <main className="container mx-auto px-6 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-900/30 border border-amber-500/30 rounded-full text-amber-300 text-sm mb-6">
                        <span>⚔️</span>
                        <span>Find Your Branch</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Compare Military Branches
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Each branch has unique culture, benefits, and career paths. Find the one that fits you.
                    </p>
                </div>

                {/* Branch Selector */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {BRANCHES.map(branch => (
                        <button
                            key={branch.id}
                            onClick={() => toggleBranch(branch.id)}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${selectedBranches.includes(branch.id)
                                ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/25'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                                }`}
                        >
                            <span className="text-xl">{branch.icon}</span>
                            <span>{branch.shortName}</span>
                        </button>
                    ))}
                </div>
                <p className="text-center text-slate-400 text-sm mb-8">
                    Select up to 3 branches to compare
                </p>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeCategory === cat.id
                                ? 'bg-slate-700 text-white'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                }`}
                        >
                            <span>{cat.icon}</span>
                            <span>{cat.label}</span>
                        </button>
                    ))}
                </div>

                {/* Comparison Cards */}
                <div className={`grid gap-6 ${comparedBranches.length === 1 ? 'max-w-lg mx-auto' :
                    comparedBranches.length === 2 ? 'md:grid-cols-2' :
                        'md:grid-cols-3'
                    }`}>
                    {comparedBranches.map(branch => (
                        <BranchCard
                            key={branch.id}
                            branch={branch}
                            category={activeCategory}
                            isExpanded={expandedBranch === branch.id}
                            onToggleExpand={() => setExpandedBranch(
                                expandedBranch === branch.id ? null : branch.id
                            )}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {comparedBranches.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-5xl mb-4">⬆️</div>
                        <h3 className="text-xl font-semibold text-white mb-2">Select branches to compare</h3>
                        <p className="text-slate-400">Click on the buttons above to start comparing</p>
                    </div>
                )}

                {/* CTA */}
                <div className="mt-16 bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-500/20 rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">Not Sure Which Branch is Right?</h3>
                    <p className="text-slate-300 mb-6 max-w-xl mx-auto">
                        Take our career quiz to discover which military branch aligns with your interests and goals.
                    </p>
                    <Link
                        href="/explore"
                        className="inline-block px-8 py-4 bg-amber-500 text-slate-900 rounded-xl font-semibold hover:bg-amber-400 transition-colors"
                    >
                        Take the Career Quiz
                    </Link>
                </div>
            </main>
        </div>
    );
}

interface BranchCardProps {
    branch: BranchInfo;
    category: CompareCategory;
    isExpanded: boolean;
    onToggleExpand: () => void;
}

function BranchCard({ branch, category, isExpanded, onToggleExpand }: BranchCardProps) {
    return (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-colors">
            {/* Header */}
            <div
                className="p-6 border-b border-slate-700"
                style={{ borderTopWidth: 4, borderTopColor: branch.color }}
            >
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{branch.icon}</span>
                    <div>
                        <h3 className="text-xl font-bold text-white">{branch.shortName}</h3>
                        <p className="text-sm text-slate-400 italic">{branch.motto}</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {category === 'overview' && (
                    <div>
                        <p className="text-slate-300 mb-4">{branch.overview}</p>
                        <div className="flex flex-wrap gap-2">
                            {branch.culture.keywords.map(kw => (
                                <span key={kw} className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs">
                                    {kw}
                                </span>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-700">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-slate-400">Active Personnel</p>
                                    <p className="text-white font-medium">{branch.statistics.activePersonnel}</p>
                                </div>
                                <div>
                                    <p className="text-slate-400">Avg Salary</p>
                                    <p className="text-green-400 font-medium">{branch.statistics.averageSalary}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {category === 'benefits' && (
                    <div>
                        <div className="bg-amber-900/30 border border-amber-500/20 rounded-lg p-3 mb-4">
                            <p className="text-amber-300 font-medium text-sm">✨ {branch.benefits.highlight}</p>
                        </div>
                        <ul className="space-y-2">
                            {branch.benefits.details.map((benefit, i) => (
                                <li key={i} className="flex items-start gap-2 text-slate-300">
                                    <span className="text-green-400 mt-0.5">✓</span>
                                    <span className="text-sm">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 pt-4 border-t border-slate-700">
                            <p className="text-slate-400 text-sm">Enlistment Bonus</p>
                            <p className="text-green-400 font-bold text-lg">{branch.statistics.enlistmentBonus}</p>
                        </div>
                    </div>
                )}

                {category === 'careers' && (
                    <div>
                        <div className="mb-4">
                            <p className="text-slate-400 text-sm mb-1">Total Career Fields</p>
                            <p className="text-2xl font-bold text-white">{branch.careers.totalMOS}+</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-slate-400 text-sm mb-2">Popular Roles</p>
                            <div className="flex flex-wrap gap-2">
                                {branch.careers.popular.map(role => (
                                    <span key={role} className="px-2 py-1 bg-blue-900/30 text-blue-300 rounded text-xs">
                                        {role}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm mb-2">Unique Opportunities</p>
                            <div className="flex flex-wrap gap-2">
                                {branch.careers.uniqueOpportunities.map(opp => (
                                    <span key={opp} className="px-2 py-1 bg-amber-900/30 text-amber-300 rounded text-xs">
                                        {opp}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {category === 'requirements' && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-slate-400 text-sm">Age Range</p>
                                <p className="text-white font-medium">{branch.requirements.ageRange}</p>
                            </div>
                            <div>
                                <p className="text-slate-400 text-sm">Min ASVAB</p>
                                <p className="text-white font-medium">{branch.requirements.asvabMinimum}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Physical Test</p>
                            <p className="text-white font-medium">{branch.requirements.physicalTest}</p>
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Contract Length</p>
                            <p className="text-white font-medium">{branch.requirements.contractLength}</p>
                        </div>
                    </div>
                )}

                {category === 'lifestyle' && (
                    <div className="space-y-4">
                        <div>
                            <p className="text-slate-400 text-sm">Deployment Frequency</p>
                            <p className="text-white text-sm">{branch.lifestyle.deploymentFrequency}</p>
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm mb-2">Major Base Locations</p>
                            <div className="flex flex-wrap gap-1">
                                {branch.lifestyle.baseLocations.slice(0, 4).map(loc => (
                                    <span key={loc} className="px-2 py-0.5 bg-slate-700 text-slate-300 rounded text-xs">
                                        📍 {loc}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Family Support</p>
                            <p className="text-white text-sm">{branch.lifestyle.familySupport}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Expand Button */}
            <button
                onClick={onToggleExpand}
                className="w-full py-3 text-center text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors text-sm"
            >
                {isExpanded ? 'Show Less ▲' : 'Show More ▼'}
            </button>

            {/* Expanded Details */}
            {isExpanded && (
                <div className="p-6 bg-slate-900/50 border-t border-slate-700">
                    <h4 className="font-semibold text-white mb-3">Culture & Environment</h4>
                    <p className="text-slate-300 text-sm">{branch.culture.description}</p>
                </div>
            )}
        </div>
    );
}
