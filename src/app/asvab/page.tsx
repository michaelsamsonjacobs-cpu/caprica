'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Adaptive ASVAB Predictor - 10 questions, difficulty scaling
// Scoring: Easy=1pt, Medium=2pt, Hard=4pt
// Difficulty adjustment: 2 wrong in a row = drop level, 2 right in a row = increase level

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

// Question bank organized by category and difficulty
const QUESTION_BANK: Question[] = [
    // ARITHMETIC REASONING (AR)
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
        id: 'ar_h1', category: 'AR', categoryName: 'Arithmetic', difficulty: 'hard', points: 4,
        question: 'A convoy travels 240 miles at 60 mph, then 180 miles at 45 mph. Total travel time?',
        options: ['6 hours', '7 hours', '8 hours', '9 hours'], correct: 2
    },
    {
        id: 'ar_h2', category: 'AR', categoryName: 'Arithmetic', difficulty: 'hard', points: 4,
        question: 'If 40% of recruits pass test 1 and 75% of those pass test 2, what percent pass both?',
        options: ['25%', '30%', '35%', '40%'], correct: 1
    },

    // WORD KNOWLEDGE (WK)
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
        id: 'wk_h1', category: 'WK', categoryName: 'Word Knowledge', difficulty: 'hard', points: 4,
        question: 'EXACERBATE most nearly means:',
        options: ['Improve', 'Worsen', 'Examine', 'Remove'], correct: 1
    },
    {
        id: 'wk_h2', category: 'WK', categoryName: 'Word Knowledge', difficulty: 'hard', points: 4,
        question: 'UBIQUITOUS most nearly means:',
        options: ['Rare', 'Everywhere', 'Ancient', 'Hidden'], correct: 1
    },

    // MATH KNOWLEDGE (MK)
    {
        id: 'mk_e1', category: 'MK', categoryName: 'Math Knowledge', difficulty: 'easy', points: 1,
        question: 'What is 5 × 7?',
        options: ['30', '35', '40', '45'], correct: 1
    },
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
    {
        id: 'mk_h1', category: 'MK', categoryName: 'Math Knowledge', difficulty: 'hard', points: 4,
        question: 'If x² - 9 = 0, what are the values of x?',
        options: ['3 only', '-3 only', '3 and -3', '9 and -9'], correct: 2
    },

    // GENERAL SCIENCE (GS)
    {
        id: 'gs_e1', category: 'GS', categoryName: 'General Science', difficulty: 'easy', points: 1,
        question: 'What gas do humans breathe in?',
        options: ['Carbon dioxide', 'Nitrogen', 'Oxygen', 'Hydrogen'], correct: 2
    },
    {
        id: 'gs_m1', category: 'GS', categoryName: 'General Science', difficulty: 'medium', points: 2,
        question: 'What is the chemical symbol for water?',
        options: ['O2', 'H2O', 'CO2', 'NaCl'], correct: 1
    },
    {
        id: 'gs_h1', category: 'GS', categoryName: 'General Science', difficulty: 'hard', points: 4,
        question: 'Which particle has a negative charge?',
        options: ['Proton', 'Neutron', 'Electron', 'Nucleus'], correct: 2
    },

    // ELECTRONICS (EI)
    {
        id: 'ei_e1', category: 'EI', categoryName: 'Electronics', difficulty: 'easy', points: 1,
        question: 'What unit measures electrical current?',
        options: ['Volts', 'Watts', 'Amps', 'Ohms'], correct: 2
    },
    {
        id: 'ei_m1', category: 'EI', categoryName: 'Electronics', difficulty: 'medium', points: 2,
        question: 'In a series circuit, if one component fails:',
        options: ['Others work harder', 'Circuit continues', 'Circuit stops', 'Voltage doubles'], correct: 2
    },
    {
        id: 'ei_h1', category: 'EI', categoryName: 'Electronics', difficulty: 'hard', points: 4,
        question: "Using Ohm's Law (V=IR), if V=12 and R=4, what is I?",
        options: ['2 amps', '3 amps', '4 amps', '48 amps'], correct: 1
    },

    // AUTO & SHOP (AS)
    {
        id: 'as_e1', category: 'AS', categoryName: 'Auto & Shop', difficulty: 'easy', points: 1,
        question: 'What tool is used to tighten nuts and bolts?',
        options: ['Hammer', 'Wrench', 'Saw', 'Drill'], correct: 1
    },
    {
        id: 'as_m1', category: 'AS', categoryName: 'Auto & Shop', difficulty: 'medium', points: 2,
        question: 'What does a vehicle alternator do?',
        options: ['Stores fuel', 'Charges battery', 'Cools engine', 'Filters air'], correct: 1
    },
    {
        id: 'as_h1', category: 'AS', categoryName: 'Auto & Shop', difficulty: 'hard', points: 4,
        question: 'In a 4-stroke engine, the intake stroke:',
        options: ['Compresses fuel', 'Ignites fuel', 'Draws in fuel/air', 'Expels exhaust'], correct: 2
    },

    // MECHANICAL COMPREHENSION (MC)
    {
        id: 'mc_e1', category: 'MC', categoryName: 'Mechanical', difficulty: 'easy', points: 1,
        question: 'Which simple machine is a ramp?',
        options: ['Lever', 'Pulley', 'Inclined plane', 'Wheel'], correct: 2
    },
    {
        id: 'mc_m1', category: 'MC', categoryName: 'Mechanical', difficulty: 'medium', points: 2,
        question: 'A pulley system with 4 ropes reduces effort by:',
        options: ['2x', '4x', '8x', '16x'], correct: 1
    },
    {
        id: 'mc_h1', category: 'MC', categoryName: 'Mechanical', difficulty: 'hard', points: 4,
        question: 'If a gear with 20 teeth drives a gear with 40 teeth, the output speed is:',
        options: ['2x faster', 'Same', 'Half', 'Quarter'], correct: 2
    },
];

// Estimate GT score based on performance
function estimateGTScore(points: number, maxPoints: number): number {
    const ratio = points / Math.max(maxPoints, 1);
    return Math.round(80 + (ratio * 50));
}

// Get AFQT prediction range
function predictAFQTRange(ratio: number): { min: number; max: number; label: string } {
    if (ratio >= 0.85) return { min: 85, max: 99, label: 'Top 15%' };
    if (ratio >= 0.70) return { min: 70, max: 84, label: 'Above Average' };
    if (ratio >= 0.50) return { min: 50, max: 69, label: 'Average' };
    if (ratio >= 0.30) return { min: 35, max: 49, label: 'Below Average' };
    return { min: 21, max: 34, label: 'Needs Study' };
}

export default function ASVABPredictorPage() {
    const [stage, setStage] = useState<'intro' | 'quiz' | 'results'>('intro');
    const [questionIndex, setQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
    const [consecWrong, setConsecWrong] = useState(0);
    const [consecRight, setConsecRight] = useState(0);
    const [score, setScore] = useState(0);
    const [maxScore, setMaxScore] = useState(0);
    const [answers, setAnswers] = useState<{ correct: boolean; diff: string }[]>([]);
    const [selected, setSelected] = useState<number | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [timer, setTimer] = useState(30);

    const TOTAL_QUESTIONS = 10;

    const selectQuestion = (diff: 'easy' | 'medium' | 'hard', usedIds: string[]): Question | null => {
        const available = QUESTION_BANK.filter(q => q.difficulty === diff && !usedIds.includes(q.id));
        if (available.length === 0) return null;
        return available[Math.floor(Math.random() * available.length)];
    };

    const startQuiz = () => {
        const first = selectQuestion('medium', []);
        if (first) {
            setQuestions([first]);
            setStage('quiz');
            setQuestionIndex(0);
            setDifficulty('medium');
            setScore(0);
            setMaxScore(0);
            setAnswers([]);
            setTimer(30);
        }
    };

    // Timer effect
    useEffect(() => {
        if (stage !== 'quiz' || showAnswer) return;
        const t = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) { handleAnswer(-1); return 30; }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(t);
    }, [stage, questionIndex, showAnswer]);

    const handleAnswer = (idx: number) => {
        const q = questions[questionIndex];
        const correct = idx === q.correct;

        setSelected(idx);
        setShowAnswer(true);
        setScore(prev => prev + (correct ? q.points : 0));
        setMaxScore(prev => prev + q.points);
        setAnswers(prev => [...prev, { correct, diff: q.difficulty }]);

        // Adjust difficulty
        let newDiff = difficulty;
        let newCW = correct ? 0 : consecWrong + 1;
        let newCR = correct ? consecRight + 1 : 0;

        if (newCW >= 2 && difficulty !== 'easy') {
            newDiff = difficulty === 'hard' ? 'medium' : 'easy';
            newCW = 0;
        } else if (newCR >= 2 && difficulty !== 'hard') {
            newDiff = difficulty === 'easy' ? 'medium' : 'hard';
            newCR = 0;
        }

        setConsecWrong(newCW);
        setConsecRight(newCR);
        setDifficulty(newDiff);

        setTimeout(() => {
            if (questionIndex + 1 >= TOTAL_QUESTIONS) {
                setStage('results');
            } else {
                const usedIds = questions.map(q => q.id);
                const next = selectQuestion(newDiff, usedIds) || selectQuestion('medium', usedIds) || selectQuestion('easy', usedIds);
                if (next) {
                    setQuestions(prev => [...prev, next]);
                    setQuestionIndex(prev => prev + 1);
                    setSelected(null);
                    setShowAnswer(false);
                    setTimer(30);
                } else {
                    setStage('results');
                }
            }
        }, 1200);
    };

    const ratio = score / Math.max(maxScore, 1);
    const gt = estimateGTScore(score, maxScore);
    const afqt = predictAFQTRange(ratio);
    const correctCount = answers.filter(a => a.correct).length;

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="container mx-auto px-6 py-6 flex justify-between items-center border-b border-gray-100 bg-white shadow-sm mb-8">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-navy rounded-lg flex items-center justify-center text-white shadow-md">🎖️</div>
                    <span className="text-xl font-bold text-brand-navy">Caprica</span>
                </Link>
                <Link href="/explore" className="text-gray-500 hover:text-brand-navy font-bold transition-colors">← Back</Link>
            </nav>

            <main className="container mx-auto px-6 py-8">
                {/* INTRO */}
                {stage === 'intro' && (
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="text-7xl mb-6">📝</div>
                        <h1 className="text-4xl font-extrabold text-brand-navy mb-4">ASVAB Score Predictor</h1>
                        <p className="text-gray-600 mb-8 text-lg font-medium">10 adaptive questions to estimate your military eligibility and career path.</p>

                        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-left mb-8 shadow-sm">
                            <h3 className="font-bold text-brand-navy text-xl mb-4">How it works</h3>
                            <ul className="space-y-4 text-gray-700">
                                <li className="flex items-start gap-3">
                                    <span className="text-brand-gold font-bold">⚡</span>
                                    <span><strong>Adaptive Difficulty:</strong> The quiz adjusts based on your performance. Get questions right to unlock harder versions for higher scores.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-brand-gold font-bold">⏱️</span>
                                    <span><strong>Speed Matters:</strong> You have 30 seconds per question. Think fast and stay sharp.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-brand-gold font-bold">🎯</span>
                                    <span><strong>Scoring:</strong> We estimate your <strong>GT</strong> and <strong>AFQT</strong> scores, showing you which MOS you qualify for today.</span>
                                </li>
                            </ul>
                        </div>

                        <button onClick={startQuiz} className="px-12 py-4 bg-brand-gold text-white rounded-xl font-bold text-xl hover:bg-brand-gold-light transition-all shadow-lg transform hover:-translate-y-1">
                            Start Assessment
                        </button>
                    </div>
                )}

                {/* QUIZ */}
                {stage === 'quiz' && questions[questionIndex] && (
                    <div className="max-w-2xl mx-auto">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-500 font-bold bg-gray-100 px-3 py-1 rounded-full text-xs">QUESTION {questionIndex + 1}/{TOTAL_QUESTIONS}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                                difficulty === 'medium' ? 'bg-amber-100 text-amber-700' :
                                    'bg-red-100 text-red-700'
                                }`}>{difficulty.toUpperCase()}</span>
                            <span className={`font-mono font-bold ${timer <= 10 ? 'text-red-600 animate-pulse' : 'text-brand-navy'}`}>{timer}s</span>
                        </div>

                        <div className="h-3 bg-gray-200 rounded-full mb-8 overflow-hidden shadow-inner">
                            <div className="h-full bg-brand-gold transition-all duration-500 rounded-full" style={{ width: `${((questionIndex + 1) / TOTAL_QUESTIONS) * 100}%` }} />
                        </div>

                        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-xl mb-6">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{questions[questionIndex].categoryName}</div>
                            <h2 className="text-2xl font-bold text-brand-navy mb-8 leading-tight">{questions[questionIndex].question}</h2>

                            <div className="grid gap-3">
                                {questions[questionIndex].options.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => !showAnswer && handleAnswer(i)}
                                        disabled={showAnswer}
                                        className={`w-full p-5 rounded-xl text-left font-bold transition-all border-2 ${showAnswer
                                            ? i === questions[questionIndex].correct
                                                ? 'bg-green-50 border-green-500 text-green-700 shadow-sm'
                                                : i === selected
                                                    ? 'bg-red-50 border-red-500 text-red-700'
                                                    : 'bg-gray-50 border-gray-100 text-gray-400'
                                            : 'bg-white border-gray-100 text-brand-navy hover:border-brand-gold hover:bg-gray-50 hover:shadow-md'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${showAnswer && i === questions[questionIndex].correct ? 'bg-green-500 text-white' :
                                                    showAnswer && i === selected ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-500'
                                                }`}>
                                                {String.fromCharCode(65 + i)}
                                            </span>
                                            {opt}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* RESULTS */}
                {stage === 'results' && (
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="text-6xl mb-6">🎯</div>
                        <h1 className="text-4xl font-extrabold text-brand-navy mb-2">Your Predicted Scores</h1>
                        <p className="text-gray-600 mb-8 text-lg">Based on your performance in the adaptive assessment.</p>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg transform transition-hover hover:scale-[1.02]">
                                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Estimated GT Score</div>
                                <div className="text-5xl font-extrabold text-brand-navy mb-2">{gt}</div>
                                <div className={`text-sm font-bold px-3 py-1 rounded-full inline-block ${gt >= 110 ? 'bg-green-100 text-green-700' : gt >= 100 ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                                    {gt >= 110 ? 'High-demand MOS' : gt >= 100 ? 'Good range' : 'Study more'}
                                </div>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg transform transition-hover hover:scale-[1.02]">
                                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">AFQT Projection</div>
                                <div className="text-5xl font-extrabold text-brand-gold mb-2">{afqt.min}-{afqt.max}</div>
                                <div className="text-gray-600 font-bold">{afqt.label}</div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm mb-8">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="border-r border-gray-100">
                                    <div className="text-2xl font-bold text-brand-navy">{correctCount}/{TOTAL_QUESTIONS}</div>
                                    <div className="text-xs font-bold text-gray-400 uppercase">Correct</div>
                                </div>
                                <div className="border-r border-gray-100">
                                    <div className="text-2xl font-bold text-brand-navy">{score}</div>
                                    <div className="text-xs font-bold text-gray-400 uppercase">Points</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-brand-navy">{Math.round(ratio * 100)}%</div>
                                    <div className="text-xs font-bold text-gray-400 uppercase">Accuracy</div>
                                </div>
                            </div>
                        </div>

                        {/* MOS Qualifications */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8 text-left shadow-md">
                            <h3 className="font-bold text-brand-navy text-xl mb-4 flex items-center gap-2">
                                <span>🚀</span> Recommended Careers
                            </h3>
                            <div className="grid gap-3">
                                {gt >= 112 && (
                                    <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl hover:border-brand-navy transition-colors">
                                        <div>
                                            <div className="text-brand-navy font-bold">17C - Cyber Operations</div>
                                            <div className="text-xs text-gray-500 font-medium">Requires GT 112+</div>
                                        </div>
                                        <span className="text-green-500 font-bold">✓ Qualified</span>
                                    </div>
                                )}
                                {gt >= 105 && (
                                    <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl hover:border-brand-navy transition-colors">
                                        <div>
                                            <div className="text-brand-navy font-bold">35F - Intelligence Analyst</div>
                                            <div className="text-xs text-gray-500 font-medium">Requires GT 105+</div>
                                        </div>
                                        <span className="text-green-500 font-bold">✓ Qualified</span>
                                    </div>
                                )}
                                {gt >= 101 && (
                                    <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl hover:border-brand-navy transition-colors">
                                        <div>
                                            <div className="text-brand-navy font-bold">68W - Combat Medic</div>
                                            <div className="text-xs text-gray-500 font-medium">Requires GT 101+</div>
                                        </div>
                                        <span className="text-green-500 font-bold">✓ Qualified</span>
                                    </div>
                                )}
                                {gt >= 100 && (
                                    <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl hover:border-brand-navy transition-colors">
                                        <div>
                                            <div className="text-brand-navy font-bold">25B - IT Specialist</div>
                                            <div className="text-xs text-gray-500 font-medium">Requires GT 100+</div>
                                        </div>
                                        <span className="text-green-500 font-bold">✓ Qualified</span>
                                    </div>
                                )}
                                {gt < 100 && <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl text-amber-800 font-semibold">Study with Caprica to unlock high-GT MOS options like Cyber and Intelligence!</div>}
                            </div>
                        </div>

                        <div className="flex gap-4 justify-center">
                            <button onClick={() => { setStage('intro'); setQuestions([]); }} className="px-8 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-all">
                                Retake Test
                            </button>
                            <Link href="/explore" className="px-8 py-3 bg-brand-navy text-white rounded-xl font-bold hover:bg-brand-navy-light transition-all shadow-lg transform hover:-translate-y-0.5">
                                Find My MOS
                            </Link>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
