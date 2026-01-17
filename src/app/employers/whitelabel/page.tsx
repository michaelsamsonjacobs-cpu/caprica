'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

// Mock job data generator based on filters
function generateMockJobs(clearance: string, location: string, count: number) {
    const jobTitles = [
        'Cybersecurity Analyst', 'Project Manager', 'Systems Administrator',
        'Intelligence Analyst', 'Logistics Coordinator', 'Operations Manager',
        'Network Engineer', 'Data Analyst', 'Security Specialist'
    ];

    const jobs = [];
    for (let i = 0; i < count; i++) {
        jobs.push({
            id: `job-${i}`,
            title: jobTitles[i % jobTitles.length],
            company: 'Your Company',
            location: location === 'Any' ? 'Multiple Locations' : location,
            clearance: clearance === 'Any' ? 'Various' : clearance,
            salary: `$${80 + (i * 5)}k - $${100 + (i * 5)}k`,
        });
    }
    return jobs;
}

export default function WhiteLabelPage() {
    const [companyName, setCompanyName] = useState('');
    const [emailList, setEmailList] = useState('');
    const [clearanceFilter, setClearanceFilter] = useState('Any');
    const [locationFilter, setLocationFilter] = useState('Any');
    const [previewJobs, setPreviewJobs] = useState<ReturnType<typeof generateMockJobs>>([]);
    const [showPreview, setShowPreview] = useState(false);
    const [generatedTemplate, setGeneratedTemplate] = useState('');

    const emailCount = emailList.split(/[\n,]/).filter(e => e.trim() && e.includes('@')).length;

    const handlePreview = () => {
        const jobs = generateMockJobs(clearanceFilter, locationFilter, 5);
        setPreviewJobs(jobs);
        setShowPreview(true);
    };

    const handleGenerate = () => {
        const template = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; padding: 40px; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #1e3a5f, #2d4a6f); color: white; padding: 32px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .header p { margin: 8px 0 0; opacity: 0.8; }
        .jobs { padding: 24px; }
        .job { border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 16px; }
        .job:hover { border-color: #f7c02b; }
        .job-title { font-weight: bold; color: #1e3a5f; font-size: 18px; margin-bottom: 8px; }
        .job-meta { color: #64748b; font-size: 14px; }
        .job-meta span { margin-right: 16px; }
        .cta { text-align: center; padding: 24px; background: #f8fafc; }
        .cta a { display: inline-block; background: #f7c02b; color: #1e3a5f; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; }
        .footer { text-align: center; padding: 16px; color: #94a3b8; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${companyName || 'Your Company'}</h1>
            <p>Career Opportunities for Veterans</p>
        </div>
        <div class="jobs">
            ${previewJobs.map(job => `
            <div class="job">
                <div class="job-title">${job.title}</div>
                <div class="job-meta">
                    <span>📍 ${job.location}</span>
                    <span>🔒 ${job.clearance}</span>
                    <span>💰 ${job.salary}</span>
                </div>
            </div>
            `).join('')}
        </div>
        <div class="cta">
            <a href="#">View All Opportunities →</a>
        </div>
        <div class="footer">
            Powered by Caprica • Veteran Career Platform
        </div>
    </div>
</body>
</html>`;
        setGeneratedTemplate(template);
    };

    return (
        <div className="min-h-screen bg-slate-900">
            <Header />

            <main className="container mx-auto px-6 py-12 max-w-6xl">
                {/* Breadcrumb */}
                <div className="mb-8">
                    <Link href="/employers" className="text-amber-400 hover:text-amber-300 text-sm font-medium">
                        ← Back to Employers
                    </Link>
                </div>

                {/* Header */}
                <div className="mb-12">
                    <div className="inline-block px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 font-semibold mb-4">
                        Enterprise Feature
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">
                        White-Label Recruitment
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl">
                        Send curated veteran job opportunities to your email list, branded as your company.
                        Leverage Caprica&apos;s matching engine without your candidates ever leaving your brand.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Configuration Panel */}
                    <div className="space-y-6">
                        {/* Company Branding */}
                        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                            <h2 className="text-xl font-semibold text-white mb-6">1. Your Brand</h2>
                            <div>
                                <label className="block text-sm text-slate-300 mb-2">Company Name</label>
                                <input
                                    type="text"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    placeholder="e.g., Northrop Grumman"
                                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Email List */}
                        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                            <h2 className="text-xl font-semibold text-white mb-6">2. Your Email List</h2>
                            <div>
                                <label className="block text-sm text-slate-300 mb-2">
                                    Paste emails (one per line or comma-separated)
                                </label>
                                <textarea
                                    value={emailList}
                                    onChange={(e) => setEmailList(e.target.value)}
                                    placeholder="john@example.com&#10;jane@example.com&#10;..."
                                    rows={6}
                                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none font-mono text-sm"
                                />
                                <p className="text-xs text-slate-500 mt-2">
                                    {emailCount} valid email{emailCount !== 1 ? 's' : ''} detected
                                </p>
                            </div>
                        </div>

                        {/* Job Filters */}
                        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                            <h2 className="text-xl font-semibold text-white mb-6">3. Job Filters</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-slate-300 mb-2">Security Clearance</label>
                                    <select
                                        value={clearanceFilter}
                                        onChange={(e) => setClearanceFilter(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-amber-500"
                                    >
                                        <option value="Any">Any</option>
                                        <option value="Secret">Secret</option>
                                        <option value="TS/SCI">TS/SCI</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-300 mb-2">Location</label>
                                    <select
                                        value={locationFilter}
                                        onChange={(e) => setLocationFilter(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-amber-500"
                                    >
                                        <option value="Any">Any</option>
                                        <option value="Remote">Remote</option>
                                        <option value="DC Metro">DC Metro</option>
                                        <option value="Texas">Texas</option>
                                        <option value="California">California</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                            <button
                                onClick={handlePreview}
                                className="flex-1 px-6 py-4 bg-slate-700 border border-slate-600 text-white rounded-xl font-bold hover:bg-slate-600 transition-all"
                            >
                                Preview Jobs
                            </button>
                            <button
                                onClick={handleGenerate}
                                disabled={previewJobs.length === 0}
                                className="flex-1 px-6 py-4 bg-amber-500 text-slate-900 rounded-xl font-bold hover:bg-amber-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Generate Template
                            </button>
                        </div>
                    </div>

                    {/* Preview Panel */}
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                        <h2 className="text-xl font-semibold text-white mb-6">Preview</h2>

                        {!showPreview && !generatedTemplate && (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="text-6xl mb-4">📧</div>
                                <h3 className="text-lg font-semibold text-white mb-2">No Preview Yet</h3>
                                <p className="text-slate-400">Configure your settings and click &quot;Preview Jobs&quot;</p>
                            </div>
                        )}

                        {showPreview && !generatedTemplate && (
                            <div className="space-y-3">
                                <p className="text-sm text-slate-400 mb-4">
                                    {previewJobs.length} jobs match your filters
                                </p>
                                {previewJobs.map(job => (
                                    <div key={job.id} className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                                        <div className="font-semibold text-white">{job.title}</div>
                                        <div className="text-sm text-slate-400 mt-1">
                                            📍 {job.location} • 🔒 {job.clearance} • 💰 {job.salary}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {generatedTemplate && (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-green-400 font-medium">✓ Template Generated</p>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(generatedTemplate);
                                        }}
                                        className="text-sm text-amber-400 hover:text-amber-300"
                                    >
                                        Copy HTML
                                    </button>
                                </div>
                                <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
                                    <iframe
                                        srcDoc={generatedTemplate}
                                        className="w-full h-96 bg-white"
                                        title="Email Preview"
                                    />
                                </div>
                                <p className="text-xs text-slate-500">
                                    This HTML can be used in your email marketing platform (Mailchimp, SendGrid, etc.)
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Info Banner */}
                <div className="mt-12 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-8 text-center">
                    <h3 className="text-xl font-bold text-white mb-2">Want Full Email Integration?</h3>
                    <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
                        Our Enterprise tier includes direct API integration with your email platform,
                        automated weekly digests, and real-time analytics on candidate engagement.
                    </p>
                    <Link
                        href="/employers"
                        className="inline-block px-8 py-3 bg-amber-500 text-slate-900 rounded-xl font-bold hover:bg-amber-400 transition-all"
                    >
                        Contact Sales
                    </Link>
                </div>
            </main>
        </div>
    );
}
