// Assessment types for modular, flexible assessments

export type QuestionType =
    | 'multiple_choice'
    | 'multi_select'
    | 'text'
    | 'rating'
    | 'ranking'
    | 'scenario';

export interface QuestionOption {
    id: string;
    text: string;
    points?: number;  // For scoring
    isCorrect?: boolean;  // For objective questions
}

export interface Question {
    id: string;
    type: QuestionType;
    category: string;  // e.g., "verbal", "math", "technical", "situational"
    question: string;
    options?: QuestionOption[];
    correctAnswer?: string | string[];  // For objective questions
    points: number;
    timeLimit?: number;  // Seconds per question
    required: boolean;
    explanation?: string;  // Shown after answering
}

export interface Assessment {
    id: string;
    name: string;
    description: string;
    category: string;  // e.g., "asvab", "technical", "personality"
    organizationId?: string;

    // Configuration
    timeLimit?: number;  // Total minutes
    shuffleQuestions: boolean;
    showResults: boolean;
    passingScore?: number;  // 0-100

    // Content
    questions: Question[];

    // Metadata
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isTemplate: boolean;
}

export interface AssessmentResult {
    assessmentId: string;
    candidateId: string;

    // Answers
    answers: Record<string, string | string[]>;  // questionId -> answer

    // Scores
    totalScore: number;  // 0-100
    categoryScores: Record<string, number>;  // category -> score

    // Timing
    timeSpent: number;  // Seconds
    startedAt: string;
    completedAt?: string;
    status: 'in_progress' | 'completed' | 'timed_out';
}

// ASVAB-style category definitions
export const ASVAB_CATEGORIES = {
    GS: { name: 'General Science', description: 'Knowledge of life, earth, and physical sciences' },
    AR: { name: 'Arithmetic Reasoning', description: 'Word problems requiring arithmetic' },
    WK: { name: 'Word Knowledge', description: 'Vocabulary and word meanings' },
    PC: { name: 'Paragraph Comprehension', description: 'Reading comprehension' },
    MK: { name: 'Mathematics Knowledge', description: 'Mathematical concepts and applications' },
    EI: { name: 'Electronics Information', description: 'Electrical principles and electronic systems' },
    AI: { name: 'Auto Information', description: 'Automotive maintenance and repair' },
    SI: { name: 'Shop Information', description: 'Tool knowledge and shop practices' },
    MC: { name: 'Mechanical Comprehension', description: 'Mechanical and physical principles' },
    AO: { name: 'Assembling Objects', description: 'Spatial relationships and assembly' },
};

// Composite scores for military job qualification
export const ASVAB_COMPOSITES = {
    AFQT: { categories: ['AR', 'MK', 'WK', 'PC'], description: 'Armed Forces Qualification Test' },
    CL: { categories: ['WK', 'PC', 'AR', 'MK'], description: 'Clerical' },
    CO: { categories: ['AR', 'MK', 'MC'], description: 'Combat' },
    EL: { categories: ['GS', 'AR', 'MK', 'EI'], description: 'Electronics' },
    FA: { categories: ['AR', 'MK', 'MC'], description: 'Field Artillery' },
    GM: { categories: ['MC', 'GS', 'EI'], description: 'General Maintenance' },
    GT: { categories: ['AR', 'WK', 'PC'], description: 'General Technical' },
    MM: { categories: ['AR', 'MC', 'EI'], description: 'Mechanical Maintenance' },
    OF: { categories: ['WK', 'PC', 'AR', 'MC'], description: 'Operators and Food' },
    SC: { categories: ['AR', 'WK', 'PC', 'MC'], description: 'Surveillance and Communications' },
    ST: { categories: ['GS', 'WK', 'PC', 'MK'], description: 'Skilled Technical' },
};

// Score calculation utilities
export function calculateQuestionScore(question: Question, answer: string | string[]): number {
    if (question.type === 'multiple_choice') {
        if (question.correctAnswer === answer) {
            return question.points;
        }
        // Check if answer matches a correct option
        const correctOption = question.options?.find(o => o.isCorrect);
        if (correctOption && correctOption.id === answer) {
            return question.points;
        }
        return 0;
    }

    if (question.type === 'multi_select') {
        const correct = question.correctAnswer as string[] || [];
        const selected = answer as string[];
        if (!Array.isArray(selected)) return 0;

        const correctCount = selected.filter(a => correct.includes(a)).length;
        const wrongCount = selected.filter(a => !correct.includes(a)).length;
        const score = Math.max(0, (correctCount - wrongCount) / correct.length);
        return Math.round(score * question.points);
    }

    if (question.type === 'rating' || question.type === 'scenario') {
        // For rated options, use the points from the selected option
        const selectedOption = question.options?.find(o => o.id === answer);
        return selectedOption?.points || 0;
    }

    // Text questions need manual scoring
    return 0;
}

export function calculateAssessmentResult(
    assessment: Assessment,
    answers: Record<string, string | string[]>
): { totalScore: number; categoryScores: Record<string, number>; passed: boolean } {
    const categoryPoints: Record<string, { earned: number; possible: number }> = {};

    for (const question of assessment.questions) {
        const category = question.category;
        if (!categoryPoints[category]) {
            categoryPoints[category] = { earned: 0, possible: 0 };
        }

        const answer = answers[question.id];
        const earned = answer ? calculateQuestionScore(question, answer) : 0;

        categoryPoints[category].earned += earned;
        categoryPoints[category].possible += question.points;
    }

    // Calculate percentage scores
    const categoryScores: Record<string, number> = {};
    let totalEarned = 0;
    let totalPossible = 0;

    for (const [category, points] of Object.entries(categoryPoints)) {
        categoryScores[category] = points.possible > 0
            ? Math.round((points.earned / points.possible) * 100)
            : 0;
        totalEarned += points.earned;
        totalPossible += points.possible;
    }

    const totalScore = totalPossible > 0
        ? Math.round((totalEarned / totalPossible) * 100)
        : 0;

    const passed = assessment.passingScore
        ? totalScore >= assessment.passingScore
        : true;

    return { totalScore, categoryScores, passed };
}
