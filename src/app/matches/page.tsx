'use client';

import { useState, useEffect } from 'react';
import MatchResults from '@/components/MatchResults';
import Link from 'next/link';

// Sample candidate data for demo
const sampleCandidate = {
    name: 'Alex Thompson',
    skills: ['JavaScript', 'Python', 'Problem Solving', 'Leadership', 'Communication', 'Project Management'],
    experience: [
        { title: 'Software Developer', company: 'Tech Corp', duration: '2021-2024' },
        { title: 'Junior Developer', company: 'StartupXYZ', duration: '2019-2021' },
    ],
    totalYearsExperience: 5,
    education: [{ degree: 'Bachelor of Computer Science', institution: 'State University' }],
};

export default function MatchesPage() {
    const [matches, setMatches] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [positionCount, setPositionCount] = useState(0);

    useEffect(() => {
        loadMatches();
    }, []);

    const loadMatches = async () => {
        try {
            // First check position count
            const countRes = await fetch('/api/match');
            const countData = await countRes.json();
            setPositionCount(countData.totalPositions || 0);

            // Get matches
            const res = await fetch('/api/match', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    candidateResume: {
                        name: sampleCandidate.name,
                        email: 'alex.t@email.com',
                        phone: '',
                        location: 'San Francisco, CA',
                        summary: 'Experienced software developer with 5 years in web development',
                        skills: sampleCandidate.skills,
                        experience: sampleCandidate.experience.map(e => ({
                            ...e,
                            description: 'Built web applications and led development projects',
                        })),
                        education: sampleCandidate.education,
                        totalYearsExperience: sampleCandidate.totalYearsExperience,
                        certifications: [],
                        languages: ['English'],
                    },
                    preferences: {
                        workMode: 'hybrid',
                        location: 'California',
                    },
                    limit: 15,
                    minScore: 20,
                }),
            });

            const data = await res.json();
            if (data.matches) {
                setMatches(data.matches);
            }
        } catch (error) {
            console.error('Error loading matches:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white border-b">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#1073E8] to-[#7C3AED] rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">C</span>
                        </div>
                        <span className="text-xl font-bold text-gray-800">Caprica</span>
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link href="/apply" className="text-gray-600 hover:text-gray-800">Profile</Link>
                        <Link href="/assessment" className="text-gray-600 hover:text-gray-800">Assessments</Link>
                        <span className="text-[#1073E8] font-medium">Job Matches</span>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">
                {/* Stats Bar */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 mb-1">Your Job Matches</h1>
                            <p className="text-gray-600">
                                Based on your skills, experience, and preferences
                            </p>
                        </div>
                        <div className="flex gap-8 text-center">
                            <div>
                                <div className="text-3xl font-bold text-[#1073E8]">{positionCount}</div>
                                <div className="text-sm text-gray-500">Total Positions</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-[#7C3AED]">{matches.length}</div>
                                <div className="text-sm text-gray-500">Matches Found</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-green-600">
                                    {matches.filter(m => m.recommendation === 'excellent' || m.recommendation === 'good').length}
                                </div>
                                <div className="text-sm text-gray-500">Strong Matches</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Candidate Summary */}
                <div className="bg-gradient-to-r from-[#1073E8] to-[#7C3AED] text-white rounded-2xl p-6 mb-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Matching Profile: {sampleCandidate.name}</h2>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {sampleCandidate.skills.slice(0, 6).map((skill, i) => (
                                    <span key={i} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm opacity-80">Experience</div>
                            <div className="text-2xl font-bold">{sampleCandidate.totalYearsExperience} years</div>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#1073E8] border-t-transparent mb-4"></div>
                        <p className="text-gray-600">Finding your best matches...</p>
                    </div>
                )}

                {/* Results */}
                {!loading && (
                    <MatchResults
                        matches={matches}
                        candidateName={sampleCandidate.name}
                        onSelectMatch={(match) => {
                            console.log('Selected match:', match);
                            // In production, navigate to detailed view
                        }}
                    />
                )}

                {/* Empty State */}
                {!loading && matches.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-2xl">
                        <div className="text-5xl mb-4">📋</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No positions available yet</h3>
                        <p className="text-gray-600 mb-6">Run the job scrapers to import positions</p>
                        <code className="bg-gray-100 px-4 py-2 rounded-lg text-sm">
                            node scripts/scrape-jacobs.js 100
                        </code>
                    </div>
                )}
            </main>
        </div>
    );
}
