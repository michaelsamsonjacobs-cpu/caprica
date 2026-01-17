'use client';

import { MatchScore } from '@/lib/matching';

interface MatchResultsProps {
    matches: (MatchScore & {
        position?: {
            company?: string;
            location?: string;
            department?: string;
            careerField?: string;
            signingBonus?: number;
        };
    })[];
    candidateName?: string;
    onSelectMatch?: (match: MatchScore) => void;
}

export default function MatchResults({ matches, candidateName, onSelectMatch }: MatchResultsProps) {
    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-600 bg-green-50';
        if (score >= 60) return 'text-blue-600 bg-blue-50';
        if (score >= 40) return 'text-yellow-600 bg-yellow-50';
        return 'text-red-600 bg-red-50';
    };

    const getRecommendationBadge = (rec: string) => {
        const styles = {
            excellent: 'bg-green-100 text-green-700 border-green-200',
            good: 'bg-blue-100 text-blue-700 border-blue-200',
            fair: 'bg-yellow-100 text-yellow-700 border-yellow-200',
            poor: 'bg-red-100 text-red-700 border-red-200',
        };
        return styles[rec as keyof typeof styles] || styles.fair;
    };

    if (matches.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No matches found</h3>
                <p className="text-gray-500">Try adjusting your preferences or adding more skills to your profile.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {candidateName && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Top Matches for <span className="text-[#1073E8]">{candidateName}</span>
                    </h2>
                    <p className="text-gray-600">Based on your skills, experience, and preferences</p>
                </div>
            )}

            {matches.map((match, idx) => (
                <div
                    key={match.positionId}
                    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border border-gray-100"
                    onClick={() => onSelectMatch?.(match)}
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${getScoreColor(match.overallScore)}`}>
                                {match.overallScore}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">{match.positionTitle}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    {match.position?.company && <span>{match.position.company}</span>}
                                    {match.position?.location && (
                                        <>
                                            <span>•</span>
                                            <span>📍 {match.position.location}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRecommendationBadge(match.recommendation)}`}>
                            {match.recommendation.charAt(0).toUpperCase() + match.recommendation.slice(1)} Match
                        </span>
                    </div>

                    {/* Score Breakdown */}
                    <div className="grid grid-cols-5 gap-3 mb-4">
                        {Object.entries(match.breakdown).map(([key, score]) => (
                            <div key={key} className="text-center">
                                <div className={`text-lg font-bold ${score >= 70 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-gray-400'}`}>
                                    {score}%
                                </div>
                                <div className="text-xs text-gray-500 capitalize">
                                    {key.replace('Score', '')}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Skills */}
                    {match.matchedSkills.length > 0 && (
                        <div className="mb-3">
                            <div className="text-xs font-medium text-gray-500 mb-2">Matching Skills</div>
                            <div className="flex flex-wrap gap-1.5">
                                {match.matchedSkills.slice(0, 6).map((skill, i) => (
                                    <span key={i} className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-xs">
                                        ✓ {skill}
                                    </span>
                                ))}
                                {match.matchedSkills.length > 6 && (
                                    <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs">
                                        +{match.matchedSkills.length - 6} more
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Missing Skills */}
                    {match.missingSkills.length > 0 && (
                        <div className="mb-3">
                            <div className="text-xs font-medium text-gray-500 mb-2">Skills to Develop</div>
                            <div className="flex flex-wrap gap-1.5">
                                {match.missingSkills.slice(0, 4).map((skill, i) => (
                                    <span key={i} className="px-2 py-0.5 bg-orange-50 text-orange-600 rounded-full text-xs">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Insights */}
                    {match.insights.length > 0 && (
                        <div className="pt-3 border-t border-gray-100">
                            <div className="flex items-start gap-2 text-sm text-gray-600">
                                <span>💡</span>
                                <span>{match.insights[0]}</span>
                            </div>
                        </div>
                    )}

                    {/* Bonus badge for MOS positions */}
                    {match.position?.signingBonus && (
                        <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-medium">
                            💰 ${match.position.signingBonus.toLocaleString()} Enlistment Bonus
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
