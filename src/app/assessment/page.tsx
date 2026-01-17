'use client';

import { useState } from 'react';
import AssessmentPlayer from '@/components/AssessmentPlayer';
import { SAMPLE_ASVAB_ASSESSMENT } from '@/lib/sample-assessment';
import Link from 'next/link';

export default function AssessmentPage() {
    const [isComplete, setIsComplete] = useState(false);
    const [results, setResults] = useState<{
        totalScore: number;
        categoryScores: Record<string, number>;
        timeSpent: number;
        passed: boolean;
    } | null>(null);

    const handleComplete = (result: typeof results & { answers: Record<string, string | string[]> }) => {
        const { answers, ...rest } = result;
        setResults(rest);
        setIsComplete(true);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    if (isComplete && results) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
                <div className="container mx-auto px-6">
                    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${results.passed ? 'bg-green-100' : 'bg-yellow-100'
                                }`}>
                                <span className="text-5xl">{results.passed ? '🎉' : '📚'}</span>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                                {results.passed ? 'Great Job!' : 'Keep Practicing!'}
                            </h1>
                            <p className="text-gray-600">
                                You completed the {SAMPLE_ASVAB_ASSESSMENT.name}
                            </p>
                        </div>

                        {/* Overall Score */}
                        <div className="text-center mb-8">
                            <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${results.totalScore >= 70 ? 'bg-green-50 text-green-600' :
                                    results.totalScore >= 50 ? 'bg-blue-50 text-blue-600' :
                                        'bg-yellow-50 text-yellow-600'
                                }`}>
                                <span className="text-5xl font-bold">{results.totalScore}</span>
                            </div>
                            <p className="mt-2 text-gray-500">Overall Score</p>
                            <p className="text-sm text-gray-400">Time: {formatTime(results.timeSpent)}</p>
                        </div>

                        {/* Category Breakdown */}
                        <div className="mb-8">
                            <h3 className="font-semibold text-gray-700 mb-4">Score by Category</h3>
                            <div className="space-y-3">
                                {Object.entries(results.categoryScores).map(([category, score]) => (
                                    <div key={category}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-600">{category}</span>
                                            <span className="font-medium">{score}%</span>
                                        </div>
                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-500 ${score >= 70 ? 'bg-green-500' :
                                                        score >= 50 ? 'bg-blue-500' :
                                                            'bg-yellow-500'
                                                    }`}
                                                style={{ width: `${score}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                            <Link
                                href="/apply"
                                className="flex-1 py-3 text-center rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                            >
                                ← Back to Profile
                            </Link>
                            <button
                                onClick={() => {
                                    setIsComplete(false);
                                    setResults(null);
                                }}
                                className="flex-1 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-[#1073E8] to-[#7C3AED] hover:opacity-90 transition-opacity"
                            >
                                Retake Assessment
                            </button>
                        </div>

                        {/* Continue to Matching */}
                        <div className="mt-6 p-4 bg-blue-50 rounded-xl text-center">
                            <p className="text-blue-700 mb-2">Ready to see your job matches?</p>
                            <Link
                                href="/matches"
                                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                                View Job Matches →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
            <div className="container mx-auto px-6">
                {/* Header */}
                <header className="mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4">
                        ← Back to Home
                    </Link>
                </header>

                <AssessmentPlayer
                    assessment={SAMPLE_ASVAB_ASSESSMENT}
                    onComplete={handleComplete}
                />
            </div>
        </div>
    );
}
