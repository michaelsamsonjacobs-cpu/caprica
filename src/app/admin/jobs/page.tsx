'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { AggregatedJob } from '@/lib/job-aggregator';

export default function AdminJobsPage() {
    const [status, setStatus] = useState<'IDLE' | 'RUNNING' | 'COMPLETE' | 'ERROR'>('IDLE');
    const [logs, setLogs] = useState<string[]>([]);
    const [results, setResults] = useState<AggregatedJob[]>([]);

    const handleRunIngestion = async () => {
        setStatus('RUNNING');
        setLogs(prev => [...prev, "🚀 Starting Job Ingestion..."]);
        setResults([]);

        try {
            // Using the API route we established earlier
            const res = await fetch('/api/admin/ingest-jobs', { method: 'POST' });
            const data = await res.json();

            if (data.success) {
                setResults(data.jobs);
                setLogs(prev => [...prev, `✅ Successfully ingested ${data.jobs.length} jobs.`]);
                setStatus('COMPLETE');
            } else {
                throw new Error(data.error);
            }
        } catch (err) {
            console.error(err);
            setLogs(prev => [...prev, `❌ Error: ${err instanceof Error ? err.message : 'Unknown error'}`]);
            setStatus('ERROR');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <div className="container mx-auto px-6 py-12">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Job Management</h1>
                        <p className="text-slate-500">Control scraping, ingestion, and MOS tagging.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Control Panel */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Ingestion Controls</h2>

                        <div className="mb-6">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-500">Last Run</span>
                                <span className="font-mono text-slate-700">2 hours ago</span>
                            </div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-500">Total Jobs</span>
                                <span className="font-mono text-slate-700">1,240</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Sources</span>
                                <span className="font-mono text-slate-700">JSearch, Partners</span>
                            </div>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800 mb-6">
                            <strong>Note:</strong> Process will auto-tag MOS codes based on job descriptions.
                        </div>

                        <button
                            onClick={handleRunIngestion}
                            disabled={status === 'RUNNING'}
                            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {status === 'RUNNING' ? (
                                <>
                                    <span className="animate-spin">🔄</span> Running...
                                </>
                            ) : (
                                <>
                                    <span>⚡</span> Run Ingestion Now
                                </>
                            )}
                        </button>
                    </div>

                    {/* Results / Logs */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Status Log */}
                        <div className="bg-slate-900 text-green-400 font-mono text-sm p-4 rounded-xl shadow-inner min-h-[150px] max-h-[200px] overflow-y-auto custom-scrollbar">
                            {logs.length === 0 && <span className="text-slate-600">// Ready to start ingestion sequence...</span>}
                            {logs.map((log, i) => (
                                <div key={i} className="border-l-2 border-slate-800 pl-2 mb-1">{log}</div>
                            ))}
                        </div>

                        {/* Recent Jobs Table */}
                        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="font-bold text-slate-700">Job Pipeline</h3>
                                {results.length > 0 && <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">New Data</span>}
                            </div>
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-3 font-semibold text-slate-600">Role</th>
                                        <th className="px-6 py-3 font-semibold text-slate-600">Employer</th>
                                        <th className="px-6 py-3 font-semibold text-slate-600">Tags</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {(results.length > 0 ? results : MOCK_PREVIEW).map((job, idx) => (
                                        <tr key={job.id || idx} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-3 font-medium text-slate-900">{job.title}</td>
                                            <td className="px-6 py-3 text-slate-600">{job.company}</td>
                                            <td className="px-6 py-3">
                                                <div className="flex gap-1 flex-wrap">
                                                    {job.recommendedMOS.map(mos => (
                                                        <span key={mos} className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold border border-slate-200">
                                                            {mos}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const MOCK_PREVIEW: Partial<AggregatedJob>[] = [
    { title: 'Waiting for data...', company: '-', recommendedMOS: [] }
];
