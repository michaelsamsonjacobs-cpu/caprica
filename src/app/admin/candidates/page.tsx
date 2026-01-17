'use client';

import Header from '@/components/Header';
import { useState } from 'react';

// Mock Candidate Data
const CANDIDATES = [
    { id: 1, name: 'Sgt. Michael Ross', mos: '11B - Infantry', location: 'Austin, TX', skills: ['Leadership', 'Ops'], status: 'Active', match: 94 },
    { id: 2, name: 'Spc. Sarah Connor', mos: '68W - Medic', location: 'Seattle, WA', skills: ['Trauma Care', 'Triage'], status: 'Hired', match: 100 },
    { id: 3, name: 'Lt. James Holden', mos: '15A - Pilot', location: 'Reston, VA', skills: ['Aviation', 'Management'], status: 'Interviewing', match: 88 },
    { id: 4, name: 'Cpl. Dwayne Hicks', mos: '12B - Engineer', location: 'Phoenix, AZ', skills: ['Construction', 'Safety'], status: 'Active', match: 76 },
    { id: 5, name: 'Sgt. Ellen Ripley', mos: '92Y - Supply', location: 'Chicago, IL', skills: ['Logistics', 'Inventory'], status: 'Active', match: 91 },
    { id: 6, name: 'Pfc. Jenette Vasquez', mos: '19D - Scout', location: 'San Diego, CA', skills: ['Surveillance', 'Comms'], status: 'Inactive', match: 45 },
];

export default function AdminCandidatesPage() {
    const [search, setSearch] = useState('');

    const filtered = CANDIDATES.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.mos.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <div className="container mx-auto px-6 py-12">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Candidate Pipeline</h1>
                        <p className="text-slate-500">View and manage veteran profiles being matched to roles.</p>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Search by name or MOS..."
                            className="bg-white border border-slate-300 rounded-lg px-4 py-2 w-64 focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-700">Candidate</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">MOS / Background</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Location</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Top Match</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filtered.map((c) => (
                                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-900">{c.name}</div>
                                        <div className="text-xs text-slate-500 mt-0.5">{c.skills.join(', ')}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded font-mono text-xs font-bold border border-slate-200">
                                            {c.mos}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{c.location}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold border ${statusColor(c.status)}`}>
                                            {c.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-green-500 rounded-full" style={{ width: `${c.match}%` }} />
                                            </div>
                                            <span className="text-xs font-bold text-slate-700">{c.match}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-indigo-600 hover:text-indigo-800 font-medium text-xs">View Profile</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function statusColor(status: string) {
    switch (status) {
        case 'Active': return 'bg-green-100 text-green-700 border-green-200';
        case 'Hired': return 'bg-blue-100 text-blue-700 border-blue-200';
        case 'Interviewing': return 'bg-purple-100 text-purple-700 border-purple-200';
        default: return 'bg-slate-100 text-slate-500 border-slate-200';
    }
}
