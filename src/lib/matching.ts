// Job-Candidate Matching Algorithm
// Scores candidates against positions based on skills, experience, and assessment results

import { ParsedResume, calculateSkillMatch } from './resume-parser';
import { AssessmentResult, ASVAB_COMPOSITES } from './assessment-types';

interface Position {
    id: string;
    title: string;
    requiredSkills: string[];
    preferredSkills?: string[];
    minExperienceYears?: number;
    maxExperienceYears?: number;
    requiredEducation?: string[];
    location?: string;
    workMode?: 'remote' | 'hybrid' | 'onsite';
    asvabRequirements?: Record<string, number>;  // Composite -> minimum score
    clearanceRequired?: string;
}

interface CandidateProfile {
    resume: ParsedResume;
    assessmentResults?: AssessmentResult[];
    preferences?: {
        workMode?: 'remote' | 'hybrid' | 'onsite';
        location?: string;
        minSalary?: number;
    };
}

export interface MatchScore {
    positionId: string;
    positionTitle: string;
    overallScore: number;  // 0-100
    breakdown: {
        skillsScore: number;
        experienceScore: number;
        educationScore: number;
        assessmentScore: number;
        preferenceScore: number;
    };
    matchedSkills: string[];
    missingSkills: string[];
    recommendation: 'excellent' | 'good' | 'fair' | 'poor';
    insights: string[];
}

// Weight configuration for scoring
const WEIGHTS = {
    skills: 0.35,
    experience: 0.2,
    education: 0.15,
    assessment: 0.2,
    preferences: 0.1,
};

function calculateExperienceScore(
    candidateYears: number,
    minRequired?: number,
    maxRequired?: number
): number {
    if (!minRequired && !maxRequired) return 100;

    if (minRequired && candidateYears < minRequired) {
        // Under-qualified
        const deficit = minRequired - candidateYears;
        return Math.max(0, 100 - deficit * 20);
    }

    if (maxRequired && candidateYears > maxRequired) {
        // Over-qualified (slight penalty)
        const excess = candidateYears - maxRequired;
        return Math.max(70, 100 - excess * 5);
    }

    return 100;
}

function calculateEducationScore(
    candidateEducation: string[],
    requiredEducation?: string[]
): number {
    if (!requiredEducation || requiredEducation.length === 0) return 100;

    const educationLevels: Record<string, number> = {
        'high school': 1,
        'ged': 1,
        'associate': 2,
        'bachelor': 3,
        'master': 4,
        'phd': 5,
        'doctorate': 5,
    };

    // Get candidate's highest education level
    let candidateLevel = 0;
    for (const edu of candidateEducation) {
        const eduLower = edu.toLowerCase();
        for (const [key, level] of Object.entries(educationLevels)) {
            if (eduLower.includes(key) && level > candidateLevel) {
                candidateLevel = level;
            }
        }
    }

    // Get required education level
    let requiredLevel = 0;
    for (const req of requiredEducation) {
        const reqLower = req.toLowerCase();
        for (const [key, level] of Object.entries(educationLevels)) {
            if (reqLower.includes(key) && level > requiredLevel) {
                requiredLevel = level;
            }
        }
    }

    if (candidateLevel >= requiredLevel) return 100;
    if (candidateLevel === requiredLevel - 1) return 70;
    return 40;
}

function calculateASVABScore(
    assessmentResults: AssessmentResult[] | undefined,
    requirements: Record<string, number> | undefined
): number {
    if (!requirements || Object.keys(requirements).length === 0) return 100;
    if (!assessmentResults || assessmentResults.length === 0) return 50; // Neutral if no assessment

    // Find ASVAB-type assessment results
    const scores: Record<string, number> = {};
    for (const result of assessmentResults) {
        Object.assign(scores, result.categoryScores);
    }

    let totalMet = 0;
    let totalRequired = 0;

    for (const [composite, minScore] of Object.entries(requirements)) {
        totalRequired++;
        const compositeInfo = ASVAB_COMPOSITES[composite as keyof typeof ASVAB_COMPOSITES];

        if (compositeInfo) {
            // Calculate composite score from category scores
            const categoryScores = compositeInfo.categories.map(cat => scores[cat] || 0);
            const compositeScore = categoryScores.reduce((a, b) => a + b, 0) / categoryScores.length;

            if (compositeScore >= minScore) {
                totalMet++;
            }
        } else if (scores[composite] && scores[composite] >= minScore) {
            totalMet++;
        }
    }

    return totalRequired > 0 ? Math.round((totalMet / totalRequired) * 100) : 100;
}

function calculatePreferenceScore(
    candidate: CandidateProfile,
    position: Position
): number {
    let score = 100;

    // Work mode preference
    if (candidate.preferences?.workMode && position.workMode) {
        if (candidate.preferences.workMode !== position.workMode) {
            // Hybrid is compatible with both remote and onsite
            if (position.workMode === 'hybrid' || candidate.preferences.workMode === 'hybrid') {
                score -= 10;
            } else {
                score -= 30;
            }
        }
    }

    // Location preference
    if (candidate.preferences?.location && position.location) {
        const prefLower = candidate.preferences.location.toLowerCase();
        const posLower = position.location.toLowerCase();

        if (!posLower.includes(prefLower) && !prefLower.includes(posLower)) {
            score -= 20;
        }
    }

    return Math.max(0, score);
}

function generateInsights(
    breakdown: MatchScore['breakdown'],
    matchedSkills: string[],
    missingSkills: string[]
): string[] {
    const insights: string[] = [];

    if (breakdown.skillsScore >= 80) {
        insights.push(`Strong skill match with ${matchedSkills.length} key skills aligned`);
    } else if (missingSkills.length > 0) {
        insights.push(`Consider training in: ${missingSkills.slice(0, 3).join(', ')}`);
    }

    if (breakdown.experienceScore >= 90) {
        insights.push('Experience level is an excellent fit');
    } else if (breakdown.experienceScore < 60) {
        insights.push('May need additional experience for this role');
    }

    if (breakdown.assessmentScore >= 80) {
        insights.push('Assessment scores meet or exceed requirements');
    } else if (breakdown.assessmentScore < 50) {
        insights.push('Additional preparation may improve assessment scores');
    }

    return insights;
}

export function matchCandidateToPosition(
    candidate: CandidateProfile,
    position: Position
): MatchScore {
    // Calculate individual scores
    const { score: skillsScore, matchedSkills, missingSkills } = calculateSkillMatch(
        candidate.resume.skills,
        [...position.requiredSkills, ...(position.preferredSkills || [])]
    );

    const experienceScore = calculateExperienceScore(
        candidate.resume.totalYearsExperience,
        position.minExperienceYears,
        position.maxExperienceYears
    );

    const educationScore = calculateEducationScore(
        candidate.resume.education.map(e => e.degree),
        position.requiredEducation
    );

    const assessmentScore = calculateASVABScore(
        candidate.assessmentResults,
        position.asvabRequirements
    );

    const preferenceScore = calculatePreferenceScore(candidate, position);

    // Calculate weighted overall score
    const overallScore = Math.round(
        skillsScore * WEIGHTS.skills +
        experienceScore * WEIGHTS.experience +
        educationScore * WEIGHTS.education +
        assessmentScore * WEIGHTS.assessment +
        preferenceScore * WEIGHTS.preferences
    );

    // Determine recommendation
    let recommendation: MatchScore['recommendation'];
    if (overallScore >= 80) recommendation = 'excellent';
    else if (overallScore >= 60) recommendation = 'good';
    else if (overallScore >= 40) recommendation = 'fair';
    else recommendation = 'poor';

    const breakdown = {
        skillsScore,
        experienceScore,
        educationScore,
        assessmentScore,
        preferenceScore,
    };

    return {
        positionId: position.id,
        positionTitle: position.title,
        overallScore,
        breakdown,
        matchedSkills,
        missingSkills,
        recommendation,
        insights: generateInsights(breakdown, matchedSkills, missingSkills),
    };
}

export function matchCandidateToMultiplePositions(
    candidate: CandidateProfile,
    positions: Position[]
): MatchScore[] {
    return positions
        .map(position => matchCandidateToPosition(candidate, position))
        .sort((a, b) => b.overallScore - a.overallScore);
}

export default { matchCandidateToPosition, matchCandidateToMultiplePositions };
