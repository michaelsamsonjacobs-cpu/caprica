'use client';

import { useState } from 'react';
import Link from 'next/link';

// Sample data for the dashboard
const sampleStats = {
    totalCandidates: 247,
    completedAssessments: 189,
    pendingMatches: 58,
    activePositions: 250,
};

const recentCandidates = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@email.com', score: 87, status: 'matched' },
    { id: 2, name: 'Michael Chen', email: 'm.chen@email.com', score: 72, status: 'assessment' },
    { id: 3, name: 'Emily Davis', email: 'emily.d@email.com', score: 91, status: 'matched' },
    { id: 4, name: 'James Wilson', email: 'j.wilson@email.com', score: 0, status: 'new' },
    { id: 5, name: 'Maria Garcia', email: 'm.garcia@email.com', score: 68, status: 'review' },
];

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<'overview' | 'candidates' | 'assessments' | 'positions'>('overview');

    const getStatusBadge = (status: string) => {
        const styles = {
            matched: 'bg-green-100 text-green-700',
            assessment: 'bg-blue-100 text-blue-700',
            new: 'bg-gray-100 text-gray-700',
            review: 'bg-yellow-100 text-yellow-700',
        };
        return styles[status as keyof typeof styles] || styles.new;
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
                <div className="p-6">
                    <Link href="/" className="flex items-center gap-2 mb-8">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#1073E8] to-[#7C3AED] rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-xl">C</span>
                        </div>
                        <div>
                            <span className="text-xl font-bold text-gray-800">Caprica</span>
                            <span className="text-xs text-gray-500 block">Admin Portal</span>
                        </div>
                    </Link>

                    <nav className="space-y-2">
                        {[
                            { id: 'overview', label: 'Overview', icon: '📊' },
                            { id: 'candidates', label: 'Candidates', icon: '👥' },
                            { id: 'assessments', label: 'Assessments', icon: '📝' },
                            { id: 'positions', label: 'Positions', icon: '💼' },
                        ].map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id as typeof activeTab)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${activeTab === item.id
                                        ? 'bg-[#1073E8]/10 text-[#1073E8]'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <span>{item.icon}</span>
                                <span className="font-medium">{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 border-t">
                    <Link href="/admin/settings" className="flex items-center gap-3 text-gray-600 hover:text-gray-800">
                        <span>⚙️</span>
                        <span>Settings</span>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="ml-64 p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            {activeTab === 'overview' && 'Dashboard Overview'}
                            {activeTab === 'candidates' && 'Candidate Management'}
                            {activeTab === 'assessments' && 'Assessment Builder'}
                            {activeTab === 'positions' && 'Position Catalog'}
                        </h1>
                        <p className="text-gray-500">Welcome back! Here's what's happening.</p>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href="/admin/assessments/new"
                            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                            + New Assessment
                        </Link>
                        <button className="px-4 py-2 bg-gradient-to-r from-[#1073E8] to-[#7C3AED] text-white rounded-lg">
                            Import Positions
                        </button>
                    </div>
                </div>

                {activeTab === 'overview' && (
                    <>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-4 gap-6 mb-8">
                            {[
                                { label: 'Total Candidates', value: sampleStats.totalCandidates, icon: '👥', color: 'blue' },
                                { label: 'Assessments Complete', value: sampleStats.completedAssessments, icon: '✅', color: 'green' },
                                { label: 'Pending Matches', value: sampleStats.pendingMatches, icon: '⏳', color: 'yellow' },
                                { label: 'Active Positions', value: sampleStats.activePositions, icon: '💼', color: 'purple' },
                            ].map(stat => (
                                <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-2xl">{stat.icon}</span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${stat.color}-100 text-${stat.color}-600`}>
                                            +12%
                                        </span>
                                    </div>
                                    <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                                    <div className="text-sm text-gray-500">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Recent Candidates Table */}
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b flex justify-between items-center">
                                <h2 className="font-semibold text-gray-800">Recent Candidates</h2>
                                <Link href="/admin/candidates" className="text-[#1073E8] text-sm hover:underline">
                                    View All →
                                </Link>
                            </div>
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Candidate</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {recentCandidates.map(candidate => (
                                        <tr key={candidate.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-gradient-to-br from-[#1073E8] to-[#7C3AED] rounded-full flex items-center justify-center text-white text-sm font-medium">
                                                        {candidate.name.charAt(0)}
                                                    </div>
                                                    <span className="font-medium text-gray-800">{candidate.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{candidate.email}</td>
                                            <td className="px-6 py-4">
                                                {candidate.score > 0 ? (
                                                    <span className={`font-medium ${candidate.score >= 80 ? 'text-green-600' :
                                                            candidate.score >= 60 ? 'text-blue-600' :
                                                                'text-yellow-600'
                                                        }`}>
                                                        {candidate.score}%
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400">—</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadge(candidate.status)}`}>
                                                    {candidate.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button className="text-[#1073E8] hover:underline text-sm">View</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {activeTab === 'assessments' && (
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="text-center py-12">
                            <div className="text-5xl mb-4">📝</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Assessment Builder</h3>
                            <p className="text-gray-600 mb-6">Create custom assessments for your candidates</p>
                            <Link
                                href="/admin/assessments/new"
                                className="inline-block px-6 py-3 bg-gradient-to-r from-[#1073E8] to-[#7C3AED] text-white rounded-xl font-medium"
                            >
                                Create New Assessment
                            </Link>
                        </div>
                    </div>
                )}

                {activeTab === 'candidates' && (
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <p className="text-gray-600">Full candidate management coming soon...</p>
                    </div>
                )}

                {activeTab === 'positions' && (
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <p className="text-gray-600">Position catalog management coming soon...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
