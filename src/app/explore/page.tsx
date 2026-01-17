'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { saveSurveyData, saveRecommendedMOS } from '@/lib/user-profile-store';

// Question interface for mock ASVAB
interface Question {
    id: string;
    category: 'AR' | 'WK' | 'PC' | 'MK' | 'GS' | 'EI' | 'AS' | 'MC';
    categoryName: string;
    difficulty: 'easy' | 'medium' | 'hard';
    question: string;
    options: string[];
    correct: number;
    points: number;
}

// Mini question bank for inline assessment (subset of full ASVAB)
// Expanded to ensure enough questions at each difficulty level
const QUESTION_BANK: Question[] = [
    // ARITHMETIC REASONING (AR) - Easy
    {
        id: 'ar_e1', category: 'AR', categoryName: 'Arithmetic', difficulty: 'easy', points: 1,
        question: 'If you have 24 apples and give away 8, how many do you have left?',
        options: ['14', '16', '18', '32'], correct: 1
    },
    {
        id: 'ar_e2', category: 'AR', categoryName: 'Arithmetic', difficulty: 'easy', points: 1,
        question: 'A soldier runs 3 miles each day. How many miles does he run in a week?',
        options: ['18', '21', '24', '28'], correct: 1
    },
    {
        id: 'ar_e3', category: 'AR', categoryName: 'Arithmetic', difficulty: 'easy', points: 1,
        question: 'If a meal costs $12 and you pay with $20, how much change do you get?',
        options: ['$6', '$8', '$10', '$12'], correct: 1
    },
    // ARITHMETIC REASONING (AR) - Medium
    {
        id: 'ar_m1', category: 'AR', categoryName: 'Arithmetic', difficulty: 'medium', points: 2,
        question: 'A team of 12 soldiers needs to be split into groups of 4. How many groups?',
        options: ['2', '3', '4', '8'], correct: 1
    },
    {
        id: 'ar_m2', category: 'AR', categoryName: 'Arithmetic', difficulty: 'medium', points: 2,
        question: 'If a tank uses 15 gallons of fuel per hour and runs for 6 hours, how much fuel?',
        options: ['75 gal', '90 gal', '105 gal', '120 gal'], correct: 1
    },
    {
        id: 'ar_m3', category: 'AR', categoryName: 'Arithmetic', difficulty: 'medium', points: 2,
        question: 'A uniform costs $45 with a 20% military discount. What do you pay?',
        options: ['$32', '$36', '$40', '$42'], correct: 1
    },
    // ARITHMETIC REASONING (AR) - Hard
    {
        id: 'ar_h1', category: 'AR', categoryName: 'Arithmetic', difficulty: 'hard', points: 4,
        question: 'A convoy travels 240 miles at 60 mph, then 180 miles at 45 mph. Total travel time?',
        options: ['6 hours', '7 hours', '8 hours', '9 hours'], correct: 2
    },
    {
        id: 'ar_h2', category: 'AR', categoryName: 'Arithmetic', difficulty: 'hard', points: 4,
        question: 'If 40% pass test 1 and 75% of those pass test 2, what percent pass both?',
        options: ['25%', '30%', '35%', '40%'], correct: 1
    },
    // WORD KNOWLEDGE (WK) - Easy
    {
        id: 'wk_e1', category: 'WK', categoryName: 'Word Knowledge', difficulty: 'easy', points: 1,
        question: 'SMALL most nearly means:',
        options: ['Large', 'Little', 'Fast', 'Slow'], correct: 1
    },
    {
        id: 'wk_e2', category: 'WK', categoryName: 'Word Knowledge', difficulty: 'easy', points: 1,
        question: 'HAZARD most nearly means:',
        options: ['Safety', 'Danger', 'Speed', 'Luck'], correct: 1
    },
    {
        id: 'wk_e3', category: 'WK', categoryName: 'Word Knowledge', difficulty: 'easy', points: 1,
        question: 'HALT most nearly means:',
        options: ['Start', 'Stop', 'Move', 'Jump'], correct: 1
    },
    // WORD KNOWLEDGE (WK) - Medium
    {
        id: 'wk_m1', category: 'WK', categoryName: 'Word Knowledge', difficulty: 'medium', points: 2,
        question: 'FORTIFY most nearly means:',
        options: ['Weaken', 'Abandon', 'Strengthen', 'Ignore'], correct: 2
    },
    {
        id: 'wk_m2', category: 'WK', categoryName: 'Word Knowledge', difficulty: 'medium', points: 2,
        question: 'METICULOUS most nearly means:',
        options: ['Careless', 'Careful', 'Quick', 'Loud'], correct: 1
    },
    {
        id: 'wk_m3', category: 'WK', categoryName: 'Word Knowledge', difficulty: 'medium', points: 2,
        question: 'VIGILANT most nearly means:',
        options: ['Watchful', 'Sleepy', 'Careless', 'Relaxed'], correct: 0
    },
    // WORD KNOWLEDGE (WK) - Hard
    {
        id: 'wk_h1', category: 'WK', categoryName: 'Word Knowledge', difficulty: 'hard', points: 4,
        question: 'EXACERBATE most nearly means:',
        options: ['Improve', 'Worsen', 'Examine', 'Remove'], correct: 1
    },
    {
        id: 'wk_h2', category: 'WK', categoryName: 'Word Knowledge', difficulty: 'hard', points: 4,
        question: 'UBIQUITOUS most nearly means:',
        options: ['Rare', 'Everywhere', 'Ancient', 'Hidden'], correct: 1
    },
    // MATH KNOWLEDGE (MK) - Easy
    {
        id: 'mk_e1', category: 'MK', categoryName: 'Math Knowledge', difficulty: 'easy', points: 1,
        question: 'What is 5 × 7?',
        options: ['30', '35', '40', '45'], correct: 1
    },
    {
        id: 'mk_e2', category: 'MK', categoryName: 'Math Knowledge', difficulty: 'easy', points: 1,
        question: 'What is 144 ÷ 12?',
        options: ['10', '11', '12', '13'], correct: 2
    },
    // MATH KNOWLEDGE (MK) - Medium
    {
        id: 'mk_m1', category: 'MK', categoryName: 'Math Knowledge', difficulty: 'medium', points: 2,
        question: 'Solve for x: 2x + 6 = 14',
        options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'], correct: 1
    },
    {
        id: 'mk_m2', category: 'MK', categoryName: 'Math Knowledge', difficulty: 'medium', points: 2,
        question: 'What is 15% of 80?',
        options: ['10', '12', '15', '18'], correct: 1
    },
    // MATH KNOWLEDGE (MK) - Hard
    {
        id: 'mk_h1', category: 'MK', categoryName: 'Math Knowledge', difficulty: 'hard', points: 4,
        question: 'If x² - 9 = 0, what are the values of x?',
        options: ['3 only', '-3 only', '3 and -3', '9 and -9'], correct: 2
    },
    {
        id: 'mk_h2', category: 'MK', categoryName: 'Math Knowledge', difficulty: 'hard', points: 4,
        question: 'What is the area of a triangle with base 10 and height 6?',
        options: ['25', '30', '35', '60'], correct: 1
    },
    // GENERAL SCIENCE (GS) - Easy
    {
        id: 'gs_e1', category: 'GS', categoryName: 'General Science', difficulty: 'easy', points: 1,
        question: 'What gas do humans breathe in?',
        options: ['Carbon dioxide', 'Nitrogen', 'Oxygen', 'Hydrogen'], correct: 2
    },
    {
        id: 'gs_e2', category: 'GS', categoryName: 'General Science', difficulty: 'easy', points: 1,
        question: 'How many planets are in our solar system?',
        options: ['7', '8', '9', '10'], correct: 1
    },
    // GENERAL SCIENCE (GS) - Medium
    {
        id: 'gs_m1', category: 'GS', categoryName: 'General Science', difficulty: 'medium', points: 2,
        question: 'What is the chemical symbol for water?',
        options: ['O2', 'H2O', 'CO2', 'NaCl'], correct: 1
    },
    {
        id: 'gs_m2', category: 'GS', categoryName: 'General Science', difficulty: 'medium', points: 2,
        question: 'What type of blood cells fight infection?',
        options: ['Red blood cells', 'White blood cells', 'Platelets', 'Plasma'], correct: 1
    },
    // GENERAL SCIENCE (GS) - Hard
    {
        id: 'gs_h1', category: 'GS', categoryName: 'General Science', difficulty: 'hard', points: 4,
        question: 'Which particle has a negative charge?',
        options: ['Proton', 'Neutron', 'Electron', 'Nucleus'], correct: 2
    },
    {
        id: 'gs_h2', category: 'GS', categoryName: 'General Science', difficulty: 'hard', points: 4,
        question: 'What is the powerhouse of the cell?',
        options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi body'], correct: 1
    },
];

// Estimate GT score based on performance
function estimateGTScore(points: number, maxPoints: number): number {
    const ratio = points / Math.max(maxPoints, 1);
    // Scale: 0% = ~70, 50% = ~95, 100% = ~130
    return Math.round(70 + (ratio * 60));
}

// MOS recommendations based on ASVAB and interests
const MOS_RECOMMENDATIONS = {
    'cyber_tech': [
        { code: '17C', title: 'Cyber Operations Specialist', gtScore: 112, bonus: 50000, match: 95 },
        { code: '25D', title: 'Cyber Network Defender', gtScore: 110, bonus: 40000, match: 92 },
        { code: '25B', title: 'IT Specialist', gtScore: 100, bonus: 20000, match: 88 },
        { code: '35T', title: 'Military Intelligence Systems Maintainer', gtScore: 105, bonus: 25000, match: 85 },
    ],
    'intelligence': [
        { code: '35F', title: 'Intelligence Analyst', gtScore: 101, bonus: 20000, match: 95 },
        { code: '35P', title: 'Cryptologic Linguist', gtScore: 100, bonus: 40000, match: 90 },
        { code: '35N', title: 'Signals Intelligence Analyst', gtScore: 101, bonus: 30000, match: 88 },
        { code: '35M', title: 'Human Intelligence Collector', gtScore: 101, bonus: 25000, match: 85 },
    ],
    'medical': [
        { code: '68W', title: 'Combat Medic', gtScore: 101, stScore: 101, bonus: 15000, match: 95 },
        { code: '68C', title: 'Practical Nursing Specialist', gtScore: 101, stScore: 106, bonus: 20000, match: 90 },
        { code: '68D', title: 'Operating Room Specialist', gtScore: 101, stScore: 106, bonus: 20000, match: 88 },
        { code: '68K', title: 'Medical Laboratory Specialist', gtScore: 101, stScore: 106, bonus: 20000, match: 85 },
    ],
    'combat_physical': [
        { code: '11B', title: 'Infantryman', coScore: 87, bonus: 15000, match: 95 },
        { code: '11C', title: 'Indirect Fire Infantryman', coScore: 87, bonus: 15000, match: 92 },
        { code: '19K', title: 'M1 Armor Crewman', coScore: 87, bonus: 20000, match: 88 },
        { code: '13B', title: 'Cannon Crewmember', coScore: 87, bonus: 15000, match: 85 },
    ],
    'aviation': [
        { code: '15W', title: 'UAV Operator', gtScore: 100, bonus: 15000, match: 95 },
        { code: '15Q', title: 'Air Traffic Control Operator', gtScore: 101, bonus: 15000, match: 92 },
        { code: '15T', title: 'UH-60 Helicopter Repairer', mmScore: 99, bonus: 15000, match: 88 },
        { code: '15U', title: 'CH-47 Helicopter Repairer', mmScore: 99, bonus: 15000, match: 85 },
    ],
    'engineering': [
        { code: '12B', title: 'Combat Engineer', coScore: 87, bonus: 15000, match: 95 },
        { code: '12N', title: 'Horizontal Construction Engineer', gmScore: 88, bonus: 15000, match: 90 },
        { code: '12W', title: 'Carpentry and Masonry Specialist', gmScore: 88, bonus: 10000, match: 88 },
        { code: '12T', title: 'Technical Engineer', stScore: 100, bonus: 15000, match: 85 },
    ],
};

export default function ExplorePage() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        // Basic info
        name: '',
        email: '',
        age: '',
        // Interests
        interests: [] as string[],
        // ASVAB
        hasASVAB: false,
        asvabScores: {} as Record<string, number>,
        estimatedGT: 0,
        // Preferences
        physicalFitness: '',
        riskTolerance: '',
        techComfort: '',
    });
    const [recommendations, setRecommendations] = useState<any[]>([]);

    // Quiz state
    const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
    const [quizIndex, setQuizIndex] = useState(0);
    const [quizDifficulty, setQuizDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
    const [quizScore, setQuizScore] = useState(0);
    const [quizMaxScore, setQuizMaxScore] = useState(0);
    const [consecRight, setConsecRight] = useState(0);
    const [consecWrong, setConsecWrong] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [quizTimer, setQuizTimer] = useState(30);

    const QUIZ_TOTAL = 8; // 8 questions for quick inline assessment

    const interestCategories = [
        { id: 'cyber_tech', label: 'Computers & Cybersecurity', icon: '💻' },
        { id: 'intelligence', label: 'Intelligence & Analysis', icon: '🔍' },
        { id: 'medical', label: 'Medical & Healthcare', icon: '🏥' },
        { id: 'combat_physical', label: 'Combat & Physical Roles', icon: '⚔️' },
        { id: 'aviation', label: 'Aviation & Drones', icon: '🚁' },
        { id: 'engineering', label: 'Engineering & Construction', icon: '🔧' },
    ];

    const toggleInterest = (id: string) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(id)
                ? prev.interests.filter(i => i !== id)
                : [...prev.interests, id],
        }));
    };

    // Select next question based on difficulty
    const selectQuestion = (diff: 'easy' | 'medium' | 'hard', usedIds: string[]): Question | null => {
        const available = QUESTION_BANK.filter(q => q.difficulty === diff && !usedIds.includes(q.id));
        if (available.length === 0) {
            // Fallback to any available question
            const fallback = QUESTION_BANK.filter(q => !usedIds.includes(q.id));
            if (fallback.length === 0) return null;
            return fallback[Math.floor(Math.random() * fallback.length)];
        }
        return available[Math.floor(Math.random() * available.length)];
    };

    // Start the inline quiz
    const startQuiz = () => {
        const first = selectQuestion('medium', []);
        if (first) {
            setQuizQuestions([first]);
            setQuizIndex(0);
            setQuizDifficulty('medium');
            setQuizScore(0);
            setQuizMaxScore(0);
            setConsecRight(0);
            setConsecWrong(0);
            setSelectedAnswer(null);
            setShowAnswer(false);
            setQuizTimer(30);
            setStep(3.5); // Go to quiz step
        }
    };

    // Ref to hold the current handleQuizAnswer function to avoid stale closures in timer
    const handleQuizAnswerRef = useRef<(idx: number) => void>(() => { });
    const timerIdRef = useRef<NodeJS.Timeout | null>(null);

    // Timer effect for quiz - uses ref to avoid stale closure
    useEffect(() => {
        if (step !== 3.5 || showAnswer) {
            if (timerIdRef.current) {
                clearInterval(timerIdRef.current);
                timerIdRef.current = null;
            }
            return;
        }

        timerIdRef.current = setInterval(() => {
            setQuizTimer(prev => {
                if (prev <= 1) {
                    // Use ref to call the current version of handleQuizAnswer
                    handleQuizAnswerRef.current(-1); // Time's up
                    return 30;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerIdRef.current) {
                clearInterval(timerIdRef.current);
                timerIdRef.current = null;
            }
        };
    }, [step, quizIndex, showAnswer]);

    // Handle quiz answer
    const handleQuizAnswer = useCallback((idx: number) => {
        const q = quizQuestions[quizIndex];
        if (!q) return;

        const correct = idx === q.correct;
        setSelectedAnswer(idx);
        setShowAnswer(true);
        setQuizScore(prev => prev + (correct ? q.points : 0));
        setQuizMaxScore(prev => prev + q.points);

        // Adjust difficulty - require 3 consecutive right/wrong before changing
        let newDiff = quizDifficulty;
        let newCW = correct ? 0 : consecWrong + 1;
        let newCR = correct ? consecRight + 1 : 0;

        if (newCW >= 3 && quizDifficulty !== 'easy') {
            newDiff = quizDifficulty === 'hard' ? 'medium' : 'easy';
            newCW = 0;
        } else if (newCR >= 3 && quizDifficulty !== 'hard') {
            newDiff = quizDifficulty === 'easy' ? 'medium' : 'hard';
            newCR = 0;
        }

        setConsecWrong(newCW);
        setConsecRight(newCR);
        setQuizDifficulty(newDiff);

        setTimeout(() => {
            if (quizIndex + 1 >= QUIZ_TOTAL) {
                // Quiz complete - calculate score and proceed
                const finalScore = quizScore + (correct ? q.points : 0);
                const finalMax = quizMaxScore + q.points;
                const gt = estimateGTScore(finalScore, finalMax);
                setFormData(prev => ({ ...prev, estimatedGT: gt }));
                setStep(3.6); // Show quiz results before MOS recommendations
            } else {
                const usedIds = quizQuestions.map(q => q.id);
                const next = selectQuestion(newDiff, usedIds);
                if (next) {
                    setQuizQuestions(prev => [...prev, next]);
                    setQuizIndex(prev => prev + 1);
                    setSelectedAnswer(null);
                    setShowAnswer(false);
                    setQuizTimer(30);
                }
            }
        }, 1000);
    }, [quizQuestions, quizIndex, quizDifficulty, quizScore, quizMaxScore, consecRight, consecWrong]);

    // Keep the ref updated with the latest handleQuizAnswer
    useEffect(() => {
        handleQuizAnswerRef.current = handleQuizAnswer;
    }, [handleQuizAnswer]);

    const calculateRecommendations = () => {
        const allRecs: any[] = [];
        formData.interests.forEach(interest => {
            const mos = MOS_RECOMMENDATIONS[interest as keyof typeof MOS_RECOMMENDATIONS] || [];
            allRecs.push(...mos);
        });

        // Filter by estimated GT score if user doesn't have actual ASVAB
        const userGT = formData.estimatedGT;
        const filtered = allRecs.filter(mos => {
            // Get the primary score requirement (GT is most common)
            const requiredGT = mos.gtScore || 0;
            const requiredST = mos.stScore || 0;
            const requiredCO = mos.coScore || 0;
            const requiredMM = mos.mmScore || 0;

            // For GT-based jobs, check against estimated score
            if (requiredGT > 0) {
                return userGT >= requiredGT;
            }
            // For CO/MM/ST jobs, use a scaled estimate (GT correlates roughly)
            if (requiredCO > 0 || requiredMM > 0 || requiredST > 0) {
                // If user has decent GT, they likely qualify for these
                return userGT >= 85;
            }
            return true;
        });

        // Sort by match percentage and deduplicate
        const seen = new Set();
        const unique = filtered.filter(mos => {
            if (seen.has(mos.code)) return false;
            seen.add(mos.code);
            return true;
        }).sort((a, b) => b.match - a.match);

        setRecommendations(unique.slice(0, 8));
    };

    // Calculate "almost qualified" jobs for motivation
    const getAlmostQualifiedJobs = () => {
        const allRecs: any[] = [];
        formData.interests.forEach(interest => {
            const mos = MOS_RECOMMENDATIONS[interest as keyof typeof MOS_RECOMMENDATIONS] || [];
            allRecs.push(...mos);
        });

        const userGT = formData.estimatedGT;
        return allRecs.filter(mos => {
            const requiredGT = mos.gtScore || 0;
            if (requiredGT > 0 && requiredGT > userGT && requiredGT <= userGT + 15) {
                return true;
            }
            return false;
        }).slice(0, 3);
    };

    const handleCreateAccount = async () => {
        console.log('Creating account:', formData);
        alert('Account creation would happen here! Data: ' + JSON.stringify(formData, null, 2));
    };

    // Calculate progress based on current step
    const getProgress = () => {
        if (!formData.hasASVAB && step >= 3) {
            // 5 total steps when quiz is needed
            if (step === 3) return { current: 3, total: 5, percent: 50 };
            if (step === 3.5) return { current: 3.5, total: 5, percent: 60 };
            if (step === 3.6) return { current: 4, total: 5, percent: 75 };
            if (step === 4) return { current: 5, total: 5, percent: 100 };
        }
        // 4 total steps normal flow
        return { current: step, total: 4, percent: (step / 4) * 100 };
    };

    const progress = getProgress();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <Header />

            <main className="container mx-auto px-6 py-12">
                {/* Step 0: Landing */}
                {step === 0 && (
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-block px-4 py-1 bg-brand-gold/10 text-brand-gold rounded-full text-xs font-black uppercase tracking-widest mb-6">
                            Career Discovery Engine
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-brand-navy mb-6 tracking-tight">
                            Your Path to the <span className="text-brand-gold">Next Rank</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-12 font-medium max-w-2xl mx-auto">
                            Whether you're identifying your optimal military path or securing your next civilian role, we match your potential to the right specialization.
                        </p>

                        {/* Start Options */}
                        <div className="grid md:grid-cols-2 gap-8 mb-16">
                            <button
                                onClick={() => setStep(1)}
                                className="bg-white border-2 border-brand-gold/30 rounded-3xl p-10 text-left hover:border-brand-gold hover:shadow-xl transition-all group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-full -mr-8 -mt-8 group-hover:bg-brand-gold/10 transition-colors"></div>
                                <div className="text-5xl mb-6 relative z-10">🎯</div>
                                <h3 className="text-2xl font-black text-brand-navy mb-3 relative z-10">MOS Matchmaker</h3>
                                <p className="text-gray-500 font-bold relative z-10 leading-relaxed">
                                    Take the interest assessment to find your ideal military job based on your skills and personality.
                                </p>
                            </button>

                            <Link
                                href="/asvab"
                                className="bg-white border border-gray-100 rounded-3xl p-10 text-left hover:border-brand-navy hover:shadow-xl transition-all group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-navy/5 rounded-bl-full -mr-8 -mt-8 group-hover:bg-brand-navy/10 transition-colors"></div>
                                <div className="text-5xl mb-6 relative z-10">📊</div>
                                <h3 className="text-2xl font-black text-brand-navy mb-3 relative z-10">Score Predictor</h3>
                                <p className="text-gray-500 font-bold relative z-10 leading-relaxed">
                                    Our adaptive engine estimates your ASVAB scores and unlocks career paths you didn't know were possible.
                                </p>
                            </Link>
                        </div>

                        {/* ASVAB Importance Callout */}
                        <div className="bg-brand-navy rounded-3xl p-10 mb-16 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(247,192,43,0.1),transparent)] pointer-events-none"></div>
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center gap-3">
                                <span>⚡</span> Why the ASVAB is Your Secret Weapon
                            </h3>
                            <p className="text-gray-300 mb-8 max-w-3xl mx-auto font-medium">
                                High scores don't just get you in—they get you **options**. More points mean higher bonuses, specialized training, and elite assignments in Cyber, Intel, and Medical.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                                    <div className="text-3xl font-black text-brand-gold mb-1">17C</div>
                                    <div className="text-xs font-bold text-white uppercase tracking-widest mb-2">Cyber Operations</div>
                                    <div className="text-sm font-bold text-gray-400">GT 112+ REQUIRED</div>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                                    <div className="text-3xl font-black text-brand-gold mb-1">35F</div>
                                    <div className="text-xs font-bold text-white uppercase tracking-widest mb-2">Intel Analyst</div>
                                    <div className="text-sm font-bold text-gray-400">GT 101+ REQUIRED</div>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                                    <div className="text-3xl font-black text-brand-gold mb-1">68W</div>
                                    <div className="text-xs font-bold text-white uppercase tracking-widest mb-2">Combat Medic</div>
                                    <div className="text-sm font-bold text-gray-400">ST 101+ REQUIRED</div>
                                </div>
                            </div>
                        </div>

                        {/* Browse by Field */}
                        <h2 className="text-2xl font-black text-brand-navy mb-8 uppercase tracking-widest">Browse Career Fields</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {interestCategories.map((cat) => (
                                <Link
                                    key={cat.id}
                                    href={`/mos?field=${cat.id}`}
                                    className="bg-white border border-gray-100 rounded-2xl p-6 text-center hover:border-brand-gold hover:shadow-md transition-all group"
                                >
                                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</div>
                                    <div className="font-bold text-brand-navy text-sm">{cat.label}</div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 1: Basic Info */}
                {step === 1 && (
                    <div className="max-w-2xl mx-auto">
                        <div className="mb-8">
                            <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                                <span>Phase 1: Background</span>
                                <span className="text-brand-gold">25% Complete</span>
                            </div>
                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                                <div className="h-full bg-brand-gold rounded-full transition-all duration-500 w-1/4" />
                            </div>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-3xl p-10 shadow-xl">
                            <h2 className="text-3xl font-black text-brand-navy mb-2">Let's Build Your Profile</h2>
                            <p className="text-gray-500 font-bold mb-8 italic">Tell us who we're working with.</p>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">Full Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Enter your name"
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl text-brand-navy placeholder-gray-400 focus:ring-2 focus:ring-brand-gold focus:bg-white transition-all font-bold"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">Email Address</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="you@email.com"
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl text-brand-navy placeholder-gray-400 focus:ring-2 focus:ring-brand-gold focus:bg-white transition-all font-bold"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">Current Age</label>
                                    <select
                                        value={formData.age}
                                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl text-brand-navy focus:ring-2 focus:ring-brand-gold focus:bg-white transition-all font-bold appearance-none cursor-pointer"
                                    >
                                        <option value="">Select Age Group</option>
                                        <option value="17">17</option>
                                        <option value="18-20">18-20</option>
                                        <option value="21-24">21-24</option>
                                        <option value="25-29">25-29</option>
                                        <option value="30-34">30-34</option>
                                        <option value="35+">35+</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-between mt-12 pt-6 border-t border-gray-50">
                                <button
                                    onClick={() => setStep(0)}
                                    className="text-gray-400 hover:text-brand-navy font-bold transition-colors"
                                >
                                    ← Back
                                </button>
                                <button
                                    onClick={() => setStep(2)}
                                    disabled={!formData.name || !formData.email}
                                    className="px-10 py-4 bg-brand-navy text-white rounded-xl font-bold shadow-lg hover:bg-brand-navy-light transition-all disabled:opacity-30 active:scale-95"
                                >
                                    Continue to Interests
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Interests */}
                {step === 2 && (
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-8">
                            <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                                <span>Phase 2: Interests</span>
                                <span className="text-brand-gold">50% Complete</span>
                            </div>
                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                                <div className="h-full bg-brand-gold rounded-full transition-all duration-500 w-1/2" />
                            </div>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-3xl p-10 shadow-xl">
                            <h2 className="text-3xl font-black text-brand-navy mb-2">What Fuels You?</h2>
                            <p className="text-gray-500 font-bold mb-8">Select 1 or more areas of interest. We'll match jobs accordingly.</p>

                            <div className="grid sm:grid-cols-2 gap-4 mb-10">
                                {interestCategories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => toggleInterest(cat.id)}
                                        className={`p-6 rounded-2xl border-2 text-left transition-all ${formData.interests.includes(cat.id)
                                            ? 'bg-brand-navy/5 border-brand-navy text-brand-navy shadow-inner'
                                            : 'bg-white border-gray-100 text-gray-500 hover:border-brand-gold hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="text-4xl mb-4">{cat.icon}</div>
                                        <div className="font-black uppercase tracking-tight text-lg">{cat.label}</div>
                                    </button>
                                ))}
                            </div>

                            <div className="flex justify-between pt-6 border-t border-gray-50">
                                <button
                                    onClick={() => setStep(1)}
                                    className="text-gray-400 hover:text-brand-navy font-bold transition-colors"
                                >
                                    ← Back
                                </button>
                                <button
                                    onClick={() => setStep(3)}
                                    disabled={formData.interests.length === 0}
                                    className="px-10 py-4 bg-brand-navy text-white rounded-xl font-bold shadow-lg hover:bg-brand-navy-light transition-all disabled:opacity-30 active:scale-95"
                                >
                                    Next: Score Analysis
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: ASVAB Check */}
                {step === 3 && (
                    <div className="max-w-2xl mx-auto">
                        <div className="mb-8">
                            <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                                <span>Phase 3: Readiness</span>
                                <span className="text-brand-gold">{formData.hasASVAB ? '75%' : '50%'} Complete</span>
                            </div>
                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                                <div className="h-full bg-brand-gold rounded-full transition-all duration-500" style={{ width: formData.hasASVAB ? '75%' : '50%' }} />
                            </div>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-3xl p-10 shadow-xl">
                            <h2 className="text-3xl font-black text-brand-navy mb-2">ASVAB Status</h2>
                            <p className="text-gray-500 font-bold mb-8">Do you have existing scores to work with?</p>

                            <div className="space-y-8">
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setFormData({ ...formData, hasASVAB: true })}
                                        className={`p-6 rounded-2xl border-2 font-black uppercase text-sm tracking-widest transition-all ${formData.hasASVAB
                                            ? 'bg-brand-navy/5 border-brand-navy text-brand-navy'
                                            : 'bg-white border-gray-100 text-gray-400 hover:border-brand-gold'
                                            }`}
                                    >
                                        I have my scores
                                    </button>
                                    <button
                                        onClick={() => setFormData({ ...formData, hasASVAB: false })}
                                        className={`p-6 rounded-2xl border-2 font-black uppercase text-sm tracking-widest transition-all ${!formData.hasASVAB
                                            ? 'bg-brand-navy/5 border-brand-navy text-brand-navy'
                                            : 'bg-white border-gray-100 text-gray-400 hover:border-brand-gold'
                                            }`}
                                    >
                                        Not yet taken
                                    </button>
                                </div>

                                {formData.hasASVAB && (
                                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                        <label className="block text-xs font-black text-gray-400 uppercase mb-3 tracking-widest">
                                            GT (General Technical) Score
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="150"
                                            value={formData.estimatedGT || ''}
                                            onChange={(e) => setFormData({ ...formData, estimatedGT: parseInt(e.target.value) || 0 })}
                                            placeholder="Enter GT Score"
                                            className="w-full px-6 py-4 bg-white border border-gray-100 rounded-xl text-brand-navy placeholder-gray-300 focus:ring-2 focus:ring-brand-gold transition-all font-bold text-2xl text-center"
                                        />
                                        <p className="text-xs font-bold text-brand-navy/60 mt-4 text-center">
                                            💡 The GT score is the primary metric for most elite MOS qualification.
                                        </p>
                                    </div>
                                )}

                                {!formData.hasASVAB && (
                                    <div className="bg-brand-gold/5 border border-brand-gold/20 rounded-2xl p-8">
                                        <p className="text-brand-gold font-black uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                                            <span>⚡</span> Prediction Engine Required
                                        </p>
                                        <p className="text-gray-600 font-bold leading-relaxed">
                                            Since you don't have scores, we'll run a <span className="text-brand-navy">short 8-question cognitive assessment</span> to estimate your GT range and provide realistic career matches.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between mt-12 pt-6 border-t border-gray-50">
                                <button
                                    onClick={() => setStep(2)}
                                    className="text-gray-400 hover:text-brand-navy font-bold transition-colors"
                                >
                                    ← Back
                                </button>
                                {formData.hasASVAB ? (
                                    <button
                                        onClick={() => { calculateRecommendations(); setStep(4); }}
                                        disabled={!formData.estimatedGT}
                                        className="px-10 py-4 bg-brand-navy text-white rounded-xl font-bold shadow-lg hover:bg-brand-navy-light transition-all disabled:opacity-30 active:scale-95"
                                    >
                                        Reveal Matches
                                    </button>
                                ) : (
                                    <button
                                        onClick={startQuiz}
                                        className="px-10 py-4 bg-brand-gold text-white rounded-xl font-bold shadow-lg hover:bg-brand-gold-light transition-all active:scale-95"
                                    >
                                        Start Assessment →
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3.5: Inline Quiz */}
                {step === 3.5 && quizQuestions[quizIndex] && (
                    <div className="max-w-2xl mx-auto">
                        <div className="mb-8">
                            <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                                <span>Cognitive Analysis</span>
                                <span className="text-brand-gold">Question {quizIndex + 1} of {QUIZ_TOTAL}</span>
                            </div>
                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                                <div
                                    className="h-full bg-brand-gold rounded-full transition-all duration-500"
                                    style={{ width: `${((quizIndex + 1) / QUIZ_TOTAL) * 100}%` }}
                                />
                            </div>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-3xl p-10 shadow-xl">
                            <div className="flex justify-between items-center mb-8">
                                <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${quizDifficulty === 'easy' ? 'bg-green-50 text-green-600 border border-green-100' :
                                    quizDifficulty === 'medium' ? 'bg-amber-50 text-brand-gold border border-brand-gold/20' :
                                        'bg-red-50 text-red-600 border border-red-100'
                                    }`}>
                                    {quizDifficulty} Mode
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Time Remaining</span>
                                    <span className={`font-mono text-xl font-black ${quizTimer <= 10 ? 'text-red-500 animate-pulse' : 'text-brand-navy'}`}>
                                        {quizTimer}s
                                    </span>
                                </div>
                            </div>

                            <div className="text-xs font-black text-brand-gold uppercase tracking-widest mb-2">
                                {quizQuestions[quizIndex].categoryName}
                            </div>
                            <h2 className="text-2xl font-bold text-brand-navy mb-8 leading-tight">
                                {quizQuestions[quizIndex].question}
                            </h2>

                            <div className="space-y-4">
                                {quizQuestions[quizIndex].options.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => !showAnswer && handleQuizAnswer(i)}
                                        disabled={showAnswer}
                                        className={`w-full p-6 rounded-2xl text-left transition-all relative overflow-hidden group ${showAnswer
                                            ? i === quizQuestions[quizIndex].correct
                                                ? 'bg-green-50 border-2 border-green-500 text-green-700'
                                                : i === selectedAnswer
                                                    ? 'bg-red-50 border-2 border-red-500 text-red-700'
                                                    : 'bg-gray-50 border border-gray-100 text-gray-400'
                                            : 'bg-white border-2 border-gray-100 text-brand-navy hover:border-brand-gold hover:shadow-md'
                                            }`}
                                    >
                                        <div className="flex items-center relative z-10">
                                            <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-black text-gray-500 mr-4 group-hover:bg-brand-gold group-hover:text-white transition-colors">
                                                {String.fromCharCode(65 + i)}
                                            </span>
                                            <span className="font-bold">{opt}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-10 pt-6 border-t border-gray-50 flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                                <span>Current Score: <span className="text-brand-gold">{quizScore}</span> PTS</span>
                                <span>Question {quizIndex + 1}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3.6: Quiz Results Summary */}
                {step === 3.6 && (
                    <div className="max-w-2xl mx-auto">
                        <div className="mb-8">
                            <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                                <span>Assessment Complete</span>
                                <span className="text-brand-gold">90% Progress</span>
                            </div>
                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                                <div className="h-full bg-brand-gold rounded-full transition-all duration-1000 w-[90%]" />
                            </div>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-3xl p-10 text-center shadow-xl">
                            <div className="w-20 h-20 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-5xl mx-auto mb-6 shadow-inner">
                                🎯
                            </div>
                            <h2 className="text-3xl font-black text-brand-navy mb-2">Assessment Results</h2>
                            <p className="text-gray-500 font-bold mb-8 italic">Here's your estimated ASVAB performance.</p>

                            <div className="bg-brand-navy rounded-3xl p-8 mb-8 relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-bl-full"></div>
                                <div className="text-xs font-black text-brand-gold uppercase tracking-widest mb-2 relative z-10">Estimated GT Score</div>
                                <div className="text-7xl font-black text-white mb-4 relative z-10 tracking-tighter">{formData.estimatedGT}</div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-brand-gold font-bold text-sm relative z-10 border border-white/10">
                                    {formData.estimatedGT >= 110 ? '⚡ Elite Range: You qualify for high-demand technical roles.' :
                                        formData.estimatedGT >= 100 ? '⭐ Strong Score: Dozens of MOS options are available to you.' :
                                            formData.estimatedGT >= 90 ? '🛡️ Solid Base: You qualify for most standard assignments.' :
                                                '🌱 Starting Point: Focused study will unlock specialized career paths.'}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-10">
                                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Accuracy</div>
                                    <div className="text-2xl font-black text-brand-navy">{Math.round((quizScore / quizMaxScore) * 100)}%</div>
                                </div>
                                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Raw Pts</div>
                                    <div className="text-2xl font-black text-brand-navy">{quizScore} / {quizMaxScore}</div>
                                </div>
                            </div>

                            <p className="text-gray-500 font-medium mb-10 leading-relaxed px-4">
                                This estimate is based on your cognitive performance in our adaptive assessment.
                                Final job qualification is determined by official ASVAB testing.
                            </p>

                            <button
                                onClick={() => { calculateRecommendations(); setStep(4); }}
                                className="w-full py-5 bg-brand-gold text-white rounded-2xl font-black text-xl shadow-lg hover:bg-brand-gold-light transition-all transform hover:-translate-y-1 active:scale-95"
                            >
                                Reveal Career Matches →
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 4: Results + Account Creation */}
                {step === 4 && (
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="inline-block px-4 py-1 bg-brand-gold/10 text-brand-gold rounded-full text-xs font-black uppercase tracking-widest mb-6">
                                Analysis Complete
                            </div>
                            <h1 className="text-5xl font-black text-brand-navy mb-4 tracking-tight">
                                Your <span className="text-brand-gold">Rank Ready</span> Path
                            </h1>
                            <p className="text-xl text-gray-500 font-bold max-w-2xl mx-auto">
                                {formData.name}, we've identified the careers where you'll make the biggest impact based on your interests and potential.
                            </p>
                            {formData.estimatedGT > 0 && (
                                <div className="mt-6 inline-flex items-center gap-2 px-6 py-2 bg-brand-navy/5 text-brand-navy rounded-full font-bold text-sm border border-brand-navy/10">
                                    🎯 <span className="text-brand-gold">Estimated GT: {formData.estimatedGT}</span>
                                </div>
                            )}
                        </div>

                        {/* Results Column */}
                        <div className="mb-16">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-black text-brand-navy uppercase tracking-widest">Top MOS Matches</h2>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{recommendations.length} Potential Careers</span>
                            </div>

                            {recommendations.length > 0 ? (
                                <div className="grid md:grid-cols-2 gap-6">
                                    {recommendations.map((mos, i) => (
                                        <Link
                                            key={mos.code}
                                            href={`/position?code=${mos.code}`}
                                            className="bg-white border border-gray-100 rounded-3xl p-8 hover:border-brand-gold hover:shadow-xl transition-all group relative overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-navy/5 rounded-bl-full -mr-6 -mt-6 group-hover:bg-brand-gold/5 transition-colors"></div>

                                            <div className="flex justify-between items-start mb-6">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner ${i === 0 ? 'bg-brand-gold text-white' : 'bg-brand-navy/10 text-brand-navy'}`}>
                                                        {i + 1}
                                                    </div>
                                                    <div>
                                                        <div className="text-2xl font-black text-brand-navy leading-none mb-1 group-hover:text-brand-gold transition-colors">{mos.code}</div>
                                                        <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">{mos.title}</div>
                                                    </div>
                                                </div>
                                                <div className={`px-4 py-1 rounded-full text-[10px] font-black tracking-widest border ${mos.match >= 90 ? 'bg-green-50 text-green-600 border-green-100' :
                                                    mos.match >= 80 ? 'bg-brand-gold/10 text-brand-gold border-brand-gold/20' :
                                                        'bg-gray-50 text-gray-500 border-gray-100'
                                                    }`}>
                                                    {mos.match}% MATCH
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {mos.gtScore && (
                                                    <span className="px-3 py-1 bg-gray-50 text-brand-navy rounded-lg text-xs font-black uppercase border border-gray-100 italic">
                                                        GT {mos.gtScore}+
                                                    </span>
                                                )}
                                                {mos.bonus > 0 && (
                                                    <span className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-xs font-black uppercase border border-green-100">
                                                        💰 Up to ${(mos.bonus / 1000)}k Bonus
                                                    </span>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center shadow-sm">
                                    <div className="text-6xl mb-6">📚</div>
                                    <h3 className="text-2xl font-black text-brand-navy mb-4">Maximize Your Options</h3>
                                    <p className="text-gray-500 font-bold mb-10 max-w-lg mx-auto leading-relaxed">
                                        Your estimated GT score is the foundation. With strategic ASVAB prep, you can unlock elite MOS paths in Intel, Medical, and Cyber.
                                    </p>
                                    <Link
                                        href="/asvab"
                                        className="inline-block px-12 py-4 bg-brand-navy text-white rounded-xl font-black text-lg hover:bg-brand-navy-light transition-all shadow-xl active:scale-95"
                                    >
                                        Start ASVAB Practice →
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Motivational Upsell */}
                        {getAlmostQualifiedJobs().length > 0 && (
                            <div className="bg-brand-navy rounded-3xl p-10 mb-12 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(247,192,43,0.1),transparent)] pointer-events-none"></div>
                                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                    <span className="text-brand-gold">⚡</span> Reach Higher: Lock in Elite Careers
                                </h3>
                                <div className="grid md:grid-cols-3 gap-6 mb-10">
                                    {getAlmostQualifiedJobs().map(mos => (
                                        <div key={mos.code} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm group hover:bg-white/10 transition-all">
                                            <div className="font-black text-white text-xl mb-1">{mos.code}</div>
                                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 leading-tight">{mos.title}</div>
                                            <div className="text-xs font-black text-brand-gold bg-brand-gold/10 inline-block px-3 py-1 rounded-full border border-brand-gold/20">
                                                GT {mos.gtScore}+ REQ
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Link
                                    href="/asvab"
                                    className="text-brand-gold font-black uppercase tracking-widest text-sm hover:text-white transition-colors flex items-center gap-2 group"
                                >
                                    Boost your score to qualify for these roles <span className="group-hover:translate-x-2 transition-transform">→</span>
                                </Link>
                            </div>
                        )}

                        {/* Action Grid */}
                        <div className="grid md:grid-cols-2 gap-8 mb-16">
                            {/* Resume Card */}
                            <div className="bg-white border-2 border-green-500/20 rounded-3xl p-10 shadow-sm relative overflow-hidden">
                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-50 rounded-full blur-2xl"></div>
                                <div className="text-5xl mb-6 relative z-10">📝</div>
                                <h3 className="text-2xl font-black text-brand-navy mb-4 relative z-10">Deploy Your Resume</h3>
                                <p className="text-gray-500 font-bold mb-8 relative z-10 leading-relaxed">
                                    Translate these military career matches into a high-impact profile for recruiters.
                                </p>
                                <Link
                                    href="/resume"
                                    onClick={() => {
                                        saveSurveyData({
                                            name: formData.name,
                                            email: formData.email,
                                            interests: formData.interests,
                                            hasASVAB: formData.hasASVAB,
                                            estimatedGT: formData.estimatedGT,
                                        });
                                        saveRecommendedMOS(recommendations.map(r => ({
                                            code: r.code,
                                            title: r.title,
                                            match: r.match,
                                        })));
                                    }}
                                    className="inline-block px-8 py-4 bg-green-600 text-white rounded-xl font-black text-lg hover:bg-green-500 transition-all shadow-lg shadow-green-600/20 active:scale-95 relative z-10"
                                >
                                    Build Resume →
                                </Link>
                            </div>

                            {/* Account Card */}
                            <div className="bg-white border-2 border-brand-gold/20 rounded-3xl p-10 shadow-sm relative overflow-hidden">
                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-gold/5 rounded-full blur-2xl"></div>
                                <div className="text-5xl mb-6 relative z-10">🛡️</div>
                                <h3 className="text-2xl font-black text-brand-navy mb-4 relative z-10">Save Your Progress</h3>
                                <p className="text-gray-500 font-bold mb-8 relative z-10 leading-relaxed">
                                    Lock in your results and start your personalized ASVAB prep journey.
                                </p>
                                <div className="flex flex-col gap-4 relative z-10">
                                    <button
                                        onClick={handleCreateAccount}
                                        className="w-full py-4 bg-brand-navy text-white rounded-xl font-black text-lg shadow-lg hover:bg-brand-navy-light transition-all active:scale-95"
                                    >
                                        Create Free Account
                                    </button>
                                    <Link
                                        href="/asvab"
                                        className="w-full py-4 border-2 border-gray-100 text-brand-navy text-center rounded-xl font-black hover:bg-gray-50 transition-all"
                                    >
                                        Take Practice ASVAB
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Reset */}
                        <div className="text-center">
                            <button
                                onClick={() => { setStep(0); setFormData({ ...formData, interests: [], estimatedGT: 0, hasASVAB: false }); setRecommendations([]); }}
                                className="text-gray-400 hover:text-brand-navy font-bold transition-colors uppercase tracking-widest text-xs"
                            >
                                ← Restart Discovery Survey
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
