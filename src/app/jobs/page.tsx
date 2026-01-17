'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

import { runJobIngestion, AggregatedJob } from '@/lib/job-aggregator';
import { getUserProfile, UserProfile } from '@/lib/user-profile-store';

// Using AggregatedJob from our service
type Job = AggregatedJob;

// Sample veteran-friendly jobs - will connect to API


const FILTERS = {
    clearance: ['Any', 'None Required', 'Secret', 'TS/SCI'],
    location: ['Any', 'Remote Only', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming', 'DC Metro'],
    salary: ['Any', '$50k+', '$75k+', '$100k+', '$150k+'],
};

export default function JobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [clearanceFilter, setClearanceFilter] = useState('Any');
    const [veteranOnly, setVeteranOnly] = useState(true); // Default to true for "Veteran Job Board"
    const [mosFilter, setMosFilter] = useState('');
    const [locationFilter, setLocationFilter] = useState('Any');
    const [profile, setProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        const storedProfile = getUserProfile();
        if (storedProfile) {
            setProfile(storedProfile);
            if (storedProfile.military?.mos && !mosFilter) setMosFilter(storedProfile.military.mos);
            if (storedProfile.military?.clearance && clearanceFilter === 'Any') {
                const c = storedProfile.military.clearance;
                if (c.includes('TS') || c.includes('Top')) setClearanceFilter('TS/SCI');
                else if (c.includes('Secret')) setClearanceFilter('Secret');
            }
            // Auto-fill location from profile preferred locations
            if (storedProfile.resume?.state && locationFilter === 'Any') {
                const state = storedProfile.resume.state;
                if (FILTERS.location.includes(state)) {
                    setLocationFilter(state);
                }
            }
        }
    }, []);

    useEffect(() => {
        async function fetchJobs() {
            setLoading(true);
            try {
                // Fetch broad range of jobs initially or use a default query
                const query = profile?.military?.mos ? `${profile.military.mos} veteran friendly` : 'veteran friendly';
                const results = await runJobIngestion([query]);
                setJobs(results);
            } catch (err) {
                console.error("Failed to fetch jobs:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchJobs();
    }, [profile?.military?.mos]);

    // Filter logic on the client side for the demo (simplifies the search bar interaction)
    // In production, this would trigger new API calls for pagination/deep search
    const filteredJobs = jobs.filter(job => {
        // Search filter
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            const titleMatch = job.title.toLowerCase().includes(q);
            const companyMatch = job.company.toLowerCase().includes(q);
            const locationMatch = job.location.toLowerCase().includes(q);
            const mosMatch = job.mosMatch?.some(m => m.toLowerCase().includes(q));

            if (!titleMatch && !companyMatch && !locationMatch && !mosMatch) {
                return false;
            }
        }

        // Clearance filter
        if (clearanceFilter !== 'Any') {
            const jobClearance = job.clearance?.toLowerCase() || '';
            if (clearanceFilter === 'None Required' && jobClearance && jobClearance !== 'none') return false;
            if (clearanceFilter === 'Secret' && !jobClearance.includes('secret')) return false;
            if (clearanceFilter === 'TS/SCI' && !jobClearance.includes('ts') && !jobClearance.includes('top secret')) return false;
        }

        // Veteran preference filter (Note: JSearch doesn't always strictly flag this, so we rely on our 'veteranPreference' flag from the aggregator)
        if (veteranOnly && !job.veteranPreference) return false;

        // MOS filter (Specific input)
        if (mosFilter && job.mosMatch) {
            const filterUpper = mosFilter.toUpperCase();
            if (!job.mosMatch.includes(filterUpper) && !job.mosMatch.includes('Any')) return false;
        }

        // Location filter
        if (locationFilter !== 'Any') {
            const jobLoc = job.location.toLowerCase();
            if (locationFilter === 'Remote Only') {
                if (!job.remote && !jobLoc.includes('remote')) return false;
            } else if (locationFilter === 'DC Metro') {
                const dcKeywords = ['washington', 'dc', 'd.c.', 'arlington', 'alexandria', 'reston', 'fairfax', 'bethesda', 'mclean'];
                if (!dcKeywords.some(kw => jobLoc.includes(kw))) return false;
            } else {
                // State filter - check for state name or abbreviation
                const stateAbbr = getStateAbbreviation(locationFilter);
                if (!jobLoc.includes(locationFilter.toLowerCase()) && (!stateAbbr || !jobLoc.includes(stateAbbr.toLowerCase()))) return false;
            }
        }

        return true;
    });

    // Helper function to get state abbreviation
    function getStateAbbreviation(stateName: string): string | null {
        const stateMap: Record<string, string> = {
            'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
            'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
            'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
            'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
            'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO',
            'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
            'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH',
            'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
            'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT',
            'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY'
        };
        return stateMap[stateName] || null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <Header />

            <main className="container mx-auto px-6 py-12">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold text-brand-navy mb-3 tracking-tight">Veteran Career Board</h1>
                    <p className="text-gray-600 text-lg font-medium">
                        Curated opportunities from employers who prioritize military talent.
                    </p>
                </div>

                {profile?.assessmentResults && (
                    <div className="mb-12 p-8 bg-white border border-brand-gold/20 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm border-l-4 border-l-brand-gold">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-3xl shadow-inner">✨</div>
                            <div>
                                <h4 className="text-brand-navy font-bold text-xl mb-1">Personalized for You</h4>
                                <p className="text-gray-500 font-medium">
                                    Matches found for: <span className="text-brand-navy font-bold">{profile.assessmentResults.matches.map(m => m.category).join(', ')}</span>
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                const topMatch = profile.assessmentResults?.matches[0];
                                if (topMatch) setSearchQuery(topMatch.category);
                            }}
                            className="w-full md:w-auto px-8 py-3 bg-brand-navy text-white rounded-xl font-bold hover:bg-brand-navy-light transition-all shadow-md active:scale-95"
                        >
                            Sync Matches
                        </button>
                    </div>
                )}

                {/* Filters */}
                <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-10 shadow-sm">
                    <div className="grid lg:grid-cols-4 gap-6">
                        {/* Search */}
                        <div className="lg:col-span-2">
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">Search Keywords</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">🔍</span>
                                <input
                                    type="text"
                                    placeholder="Job title, company, or skills..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl text-brand-navy placeholder-gray-400 focus:ring-2 focus:ring-brand-gold focus:bg-white transition-all font-bold"
                                />
                            </div>
                        </div>

                        {/* MOS Filter */}
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">MOS Translation</label>
                            <input
                                type="text"
                                placeholder="e.g., 11B, 35F"
                                value={mosFilter}
                                onChange={(e) => setMosFilter(e.target.value.toUpperCase())}
                                className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-xl text-brand-navy placeholder-gray-400 focus:ring-2 focus:ring-brand-gold focus:bg-white transition-all font-bold"
                            />
                        </div>

                        {/* Clearance Filter */}
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">Security Clearance</label>
                            <select
                                value={clearanceFilter}
                                onChange={(e) => setClearanceFilter(e.target.value)}
                                className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-xl text-brand-navy focus:ring-2 focus:ring-brand-gold focus:bg-white transition-all font-bold appearance-none cursor-pointer"
                            >
                                {FILTERS.clearance.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Location Filter Row */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <div className="grid lg:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">📍 Desired Location</label>
                                <select
                                    value={locationFilter}
                                    onChange={(e) => setLocationFilter(e.target.value)}
                                    className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-xl text-brand-navy focus:ring-2 focus:ring-brand-gold focus:bg-white transition-all font-bold appearance-none cursor-pointer"
                                >
                                    {FILTERS.location.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                                <p className="text-xs text-gray-400 mt-1">Find jobs where you want to live, not where you&apos;re stationed</p>
                            </div>
                        </div>
                    </div>

                    {/* Veteran Preference Toggle */}
                    <div className="mt-6 flex items-center gap-3 pt-6 border-t border-gray-50">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={veteranOnly}
                                    onChange={(e) => setVeteranOnly(e.target.checked)}
                                    className="peer sr-only"
                                />
                                <div className="w-10 h-6 bg-gray-200 rounded-full peer-checked:bg-brand-gold transition-colors"></div>
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
                            </div>
                            <span className="text-gray-600 font-bold group-hover:text-brand-navy transition-colors">Show only veteran-preferred employers</span>
                        </label>
                    </div>
                </div>

                {/* Results Count */}
                <div className="flex justify-between items-center mb-6">
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
                        {filteredJobs.length} Opportunity{filteredJobs.length !== 1 ? 'ies' : ''} found
                        {mosFilter && <span className="text-brand-gold ml-2">• Matching {mosFilter}</span>}
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-24 bg-white border border-gray-100 rounded-2xl shadow-sm">
                        <div className="w-16 h-16 border-4 border-gray-100 border-t-brand-gold rounded-full animate-spin mb-6"></div>
                        <h3 className="text-brand-navy text-xl font-bold">Scanning Global Job Markets...</h3>
                        <p className="text-gray-400 mt-2 font-medium">Filtering for military-friendly verified roles</p>
                    </div>
                )}

                {/* Job Cards */}
                {!loading && (
                    <div className="grid gap-4">
                        {filteredJobs.map((job) => (
                            <div
                                key={job.id}
                                className="bg-white border border-gray-100 rounded-2xl p-8 hover:border-brand-gold transition-all shadow-sm hover:shadow-md group"
                            >
                                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-2xl font-bold text-brand-navy leading-tight">{job.title}</h3>
                                            {job.veteranPreference && (
                                                <span className="hidden sm:inline-block px-3 py-1 bg-amber-50 text-brand-gold rounded-full text-[10px] font-black uppercase tracking-widest border border-brand-gold/20">
                                                    Verified Veteran Pref
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-500 font-bold text-sm">
                                            <span className="flex items-center gap-1.5 text-brand-navy">🏢 {job.company}</span>
                                            <span className="flex items-center gap-1.5">📍 {job.location}</span>
                                            {job.remote && (
                                                <span className="text-green-600 px-2 py-0.5 bg-green-50 rounded-lg">🏠 Remote</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <a
                                            href={job.applyUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-8 py-3 bg-brand-navy text-white rounded-xl font-bold hover:bg-brand-navy-light transition-all shadow-md active:scale-95 inline-block"
                                        >
                                            Apply Now
                                        </a>
                                        <button className="p-3 border border-gray-200 text-gray-400 rounded-xl hover:text-brand-gold hover:border-brand-gold transition-all">
                                            🔖
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-50">
                                    {job.salary && (
                                        <div className="px-3 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs font-bold border border-gray-100">
                                            💰 {job.salary}
                                        </div>
                                    )}
                                    {job.clearance && (
                                        <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100">
                                            🔒 {job.clearance}
                                        </div>
                                    )}
                                    {job.mosMatch && job.mosMatch[0] !== 'Any' && (
                                        <div className="px-3 py-1 bg-gray-50 text-gray-500 rounded-lg text-xs font-bold border border-gray-100">
                                            MOS: {job.mosMatch.slice(0, 3).join(', ')}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {filteredJobs.length === 0 && !loading && (
                    <div className="text-center py-24 bg-white border border-gray-100 rounded-2xl shadow-sm">
                        <div className="text-7xl mb-6">🔍</div>
                        <h3 className="text-2xl font-bold text-brand-navy mb-2">No results for this combination</h3>
                        <p className="text-gray-500 mb-8 font-medium">Try broadening your search or clearing MOS filters</p>
                        <button
                            onClick={() => { setSearchQuery(''); setClearanceFilter('Any'); setMosFilter(''); }}
                            className="px-10 py-3 border-2 border-brand-navy text-brand-navy rounded-xl font-bold hover:bg-brand-navy hover:text-white transition-all shadow-sm"
                        >
                            Reset Explore View
                        </button>
                    </div>
                )}

                {/* CTA */}
                <div className="mt-16 bg-brand-navy rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(247,192,43,0.1),transparent)] pointer-events-none"></div>
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h3 className="text-3xl font-extrabold mb-4">Never Miss an Opportunity</h3>
                        <p className="text-gray-300 mb-8 text-lg">
                            We monitor verified veteran-friendly employers 24/7. Set up custom alerts to be first in line when a role matches your MOS.
                        </p>
                        <Link
                            href="/alerts"
                            className="inline-block px-12 py-5 bg-brand-gold text-white rounded-2xl font-black text-lg hover:bg-brand-gold-light transition-all shadow-xl transform hover:-translate-y-1 active:scale-95"
                        >
                            Activate Job Alerts
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
