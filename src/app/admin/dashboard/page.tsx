'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Link from 'next/link';

export default function AdminDashboardPage() {
    // Mock data for dashboard
    const metrics = [
        { label: 'Total Candidates', value: '1,248', change: '+12%', color: 'bg-blue-500' },
        { label: 'Verified Recruiters', value: '86', change: '+4%', color: 'bg-green-500' },
        { label: 'AI Matches Generated', value: '15.4k', change: '+28%', color: 'bg-amber-500' },
        { label: 'Active Job Alerts', value: '3,102', change: '+8%', color: 'bg-purple-500' },
    ];

    const activities = [
        { id: 1, user: 'User #8821 (11B)', action: 'Completed Skills Assessment', time: '2 mins ago', icon: '📝' },
        { id: 2, user: 'User #9932 (Unknown)', action: 'Registered for account', time: '15 mins ago', icon: '👤' },
        { id: 3, user: 'User #7741 (68W)', action: 'Connected with HCA Healthcare', time: '42 mins ago', icon: '🤝' },
        { id: 4, user: 'System', action: 'Intested 142 new jobs', time: '1 hour ago', icon: '🤖' },
        { id: 5, user: 'User #1123 (17C)', action: 'Updated Resume', time: '2 hours ago', icon: '📄' },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <div className="container mx-auto px-6 py-12">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Admin Command Center</h1>
                        <p className="text-slate-500">Platform overview and operational status.</p>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/admin/jobs" className="px-5 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium transition-colors">
                            Manage Jobs
                        </Link>
                        <Link href="/admin/candidates" className="px-5 py-2 bg-slate-900 border border-slate-900 rounded-lg text-white hover:bg-slate-800 font-medium transition-colors">
                            View Candidates
                        </Link>
                    </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {metrics.map((metric, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                            <div className={`absolute top-0 right-0 w-24 h-24 ${metric.color} opacity-10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`} />
                            <p className="text-slate-500 text-sm font-medium mb-1">{metric.label}</p>
                            <div className="flex items-end gap-3">
                                <h3 className="text-3xl font-bold text-slate-900">{metric.value}</h3>
                                <span className="text-green-600 text-sm font-bold mb-1 bg-green-100 px-1.5 py-0.5 rounded">{metric.change}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Activity Feed */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <span>📡</span> Live Activity Feed
                        </h2>
                        <div className="space-y-6">
                            {activities.map((act) => (
                                <div key={act.id} className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-xl group-hover:bg-slate-200 transition-colors">
                                        {act.icon}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-slate-900 font-medium">{act.user}</p>
                                        <p className="text-slate-500 text-sm">{act.action}</p>
                                    </div>
                                    <span className="text-slate-400 text-xs font-mono">{act.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions / System Status */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                            <h2 className="text-lg font-bold text-slate-900 mb-4">System Health</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-600">Database (Prisma)</span>
                                    <span className="flex items-center gap-1.5 text-green-600 font-bold">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Online
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-600">Job Ingestion (JSearch)</span>
                                    <span className="flex items-center gap-1.5 text-amber-600 font-bold">
                                        <span className="w-2 h-2 bg-amber-500 rounded-full" /> Mock Mode
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-600">Email Service (Resend)</span>
                                    <span className="flex items-center gap-1.5 text-green-600 font-bold">
                                        <span className="w-2 h-2 bg-green-500 rounded-full" /> Ready
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-600">AI Agents (Groq)</span>
                                    <span className="flex items-center gap-1.5 text-green-600 font-bold">
                                        <span className="w-2 h-2 bg-green-500 rounded-full" /> Connected
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-indigo-600 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-lg font-bold mb-2">Employer Portal</h2>
                                <p className="text-indigo-100 text-sm mb-4">Pending approvals: <span className="font-bold text-white">4</span></p>
                                <button className="w-full py-2 bg-white text-indigo-700 font-bold rounded-lg hover:bg-slate-100 transition-colors">
                                    Review Requests
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
