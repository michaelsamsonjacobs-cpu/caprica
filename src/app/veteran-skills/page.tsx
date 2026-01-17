'use client';

import { useState } from 'react';
import Link from 'next/link';
import { saveAssessmentResults } from '@/lib/user-profile-store';

// Veteran Skills Assessment - 10 questions to understand what they ACTUALLY did
// Not testing knowledge, but gathering context for resume/job matching

interface SkillQuestion {
    id: string;
    question: string;
    type: 'single' | 'multi' | 'scale' | 'text';
    options?: string[];
    category: string;
}

const SKILLS_QUESTIONS: SkillQuestion[] = [
    {
        id: 'role_scope',
        question: 'What was your primary role in your unit?',
        type: 'single',
        category: 'Role',
        options: [
            'Individual Contributor - Executed tasks and missions',
            'Team Lead - Led 2-5 people',
            'Squad/Section Leader - Led 6-12 people',
            'Platoon Sergeant/Officer - Led 20-50 people',
            'Company/Battery level or higher - 50+ people',
        ],
    },
    {
        id: 'tech_systems',
        question: 'What systems or equipment did you operate regularly?',
        type: 'multi',
        category: 'Technical',
        options: [
            'Radio/Communications systems',
            'Computer networks/IT systems',
            'Weapons systems',
            'Vehicles (wheeled)',
            'Vehicles (tracked/armored)',
            'Medical equipment',
            'Aviation systems',
            'Intelligence/surveillance systems',
            'Heavy equipment (construction)',
            'Diagnostic/maintenance tools',
        ],
    },
    {
        id: 'clearance',
        question: 'What was your highest security clearance?',
        type: 'single',
        category: 'Clearance',
        options: [
            'None / Not Required',
            'Secret',
            'Top Secret',
            'TS/SCI',
            'TS/SCI with Poly',
        ],
    },
    {
        id: 'training_others',
        question: 'How often did you train or mentor others?',
        type: 'single',
        category: 'Leadership',
        options: [
            'Rarely - Focused on my own tasks',
            'Sometimes - Helped new soldiers occasionally',
            'Often - Regularly trained my team',
            'Primary duty - Training was a main responsibility',
            'Certified instructor (e.g., Master Trainer, Drill Sergeant)',
        ],
    },
    {
        id: 'budget_resources',
        question: 'Did you manage budgets, supplies, or resources?',
        type: 'single',
        category: 'Management',
        options: [
            'No - Not part of my role',
            'Minor - Managed team-level supplies',
            'Moderate - Responsible for section/platoon resources',
            'Significant - Managed $100K+ in equipment/budget',
            'Major - Managed $1M+ in resources',
        ],
    },
    {
        id: 'documentation',
        question: 'What kind of documentation did you create?',
        type: 'multi',
        category: 'Administrative',
        options: [
            'None regularly',
            'Maintenance logs/records',
            'After Action Reports (AARs)',
            'SOPs/Training materials',
            'Intelligence reports/briefings',
            'Personnel evaluations (NCOERs/OERs)',
            'Incident/accident reports',
            'Supply/logistics records',
            'Medical records/documentation',
        ],
    },
    {
        id: 'stress_decisions',
        question: 'How often did you make critical decisions under pressure?',
        type: 'single',
        category: 'Decision Making',
        options: [
            'Rarely - Followed established procedures',
            'Sometimes - Occasional high-pressure situations',
            'Often - Regular time-sensitive decisions',
            'Frequently - Combat or life-safety decisions',
            'Constant - Leadership role in high-stakes environment',
        ],
    },
    {
        id: 'certifications',
        question: 'What certifications or special training do you have?',
        type: 'multi',
        category: 'Credentials',
        options: [
            'None beyond MOS training',
            'Airborne/Air Assault',
            'Ranger/Special Forces tab',
            'Combat Lifesaver/EMT',
            'HAZMAT',
            'CDL (Commercial Driver)',
            'CompTIA/IT certifications',
            'Instructor/Master Trainer',
            'Foreign language qualified',
            'Weapons qualifications beyond basic',
        ],
    },
    {
        id: 'achievements',
        question: 'What were your notable achievements? (Select all that apply)',
        type: 'multi',
        category: 'Accomplishments',
        options: [
            'Promoted ahead of peers',
            'Received commendation medal or higher',
            'Selected for special assignment/detail',
            'Led successful mission/operation',
            'Improved unit processes/efficiency',
            'Trained soldiers who excelled',
            'Zero safety incidents under my watch',
            'Recognized as subject matter expert',
            'Deployed to combat zone',
        ],
    },
    {
        id: 'civilian_goal',
        question: 'What type of civilian role interests you most?',
        type: 'single',
        category: 'Goals',
        options: [
            'Same field - Direct translation of my military job',
            'Related field - Use my skills in a new industry',
            'Management/Leadership - Lead teams based on my experience',
            'Complete career change - New direction entirely',
            'Government/Contractor - Stay close to military work',
            'Entrepreneurship - Start my own business',
        ],
    },
];

interface Answers {
    [key: string]: string | string[];
}

export default function VeteranSkillsPage() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Answers>({});
    const [currentQ, setCurrentQ] = useState(0);

    const handleSingle = (value: string) => {
        const q = SKILLS_QUESTIONS[currentQ];
        setAnswers(prev => ({ ...prev, [q.id]: value }));
    };

    const handleMulti = (value: string) => {
        const q = SKILLS_QUESTIONS[currentQ];
        const current = (answers[q.id] as string[]) || [];
        if (current.includes(value)) {
            setAnswers(prev => ({ ...prev, [q.id]: current.filter(v => v !== value) }));
        } else {
            setAnswers(prev => ({ ...prev, [q.id]: [...current, value] }));
        }
    };

    const nextQuestion = () => {
        if (currentQ + 1 >= SKILLS_QUESTIONS.length) {
            // Save assessment results for the user profile
            const bullets = generateResumeBullets();
            const matches = getJobMatches();
            saveAssessmentResults({
                bullets,
                matches,
                completedAt: new Date().toISOString()
            });
            setStep(2); // Results
        } else {
            setCurrentQ(prev => prev + 1);
        }
    };

    const q = SKILLS_QUESTIONS[currentQ];
    const currentAnswer = answers[q?.id];
    const canProceed = q?.type === 'multi'
        ? (currentAnswer as string[])?.length > 0
        : !!currentAnswer;

    // Generate resume bullets based on answers
    const generateResumeBullets = (): string[] => {
        const bullets: string[] = [];

        const role = answers.role_scope as string;
        if (role?.includes('Team Lead')) bullets.push('Led cross-functional team of 2-5 personnel in mission-critical operations');
        if (role?.includes('Squad')) bullets.push('Supervised and trained squad of 6-12 soldiers, ensuring 100% mission readiness');
        if (role?.includes('Platoon')) bullets.push('Managed platoon of 20-50 personnel with responsibility for $2M+ in equipment');
        if (role?.includes('Company')) bullets.push('Directed operations for 50+ personnel across multiple functional areas');

        const training = answers.training_others as string;
        if (training?.includes('Primary') || training?.includes('Certified')) {
            bullets.push('Developed and delivered training programs, resulting in improved team performance');
        }

        const budget = answers.budget_resources as string;
        if (budget?.includes('100K')) bullets.push('Managed inventory and resources valued at $100K+ with zero loss or discrepancy');
        if (budget?.includes('1M')) bullets.push('Oversaw budget and equipment valued at $1M+, ensuring full accountability');

        const stress = answers.stress_decisions as string;
        if (stress?.includes('Combat') || stress?.includes('Constant')) {
            bullets.push('Made time-sensitive decisions in high-pressure environments with zero errors');
        }

        const certs = answers.certifications as string[];
        if (certs?.includes('CDL')) bullets.push('Hold valid Commercial Driver License (CDL) with clean driving record');
        if (certs?.includes('CompTIA')) bullets.push('Possess industry-recognized IT certifications (CompTIA A+/Network+/Security+)');

        const achievements = answers.achievements as string[];
        if (achievements?.includes('Promoted')) bullets.push('Consistently recognized for excellence with accelerated promotion');
        if (achievements?.includes('commendation')) bullets.push('Awarded commendation medal for outstanding performance');
        if (achievements?.includes('Zero safety')) bullets.push('Maintained perfect safety record with zero reportable incidents');

        return bullets.length > 0 ? bullets : [
            'Demonstrated leadership and problem-solving in demanding operational environment',
            'Maintained accountability for personnel and equipment',
            'Collaborated effectively in team-based mission execution',
        ];
    };

    // Match to job categories
    const getJobMatches = (): { category: string; match: number; roles: string[] }[] => {
        const matches: { category: string; match: number; roles: string[] }[] = [];

        const clearance = answers.clearance as string;
        const systems = answers.tech_systems as string[];
        const goal = answers.civilian_goal as string;

        if (clearance?.includes('TS/SCI') || clearance?.includes('Top Secret')) {
            matches.push({
                category: 'Cleared Defense Work',
                match: 95,
                roles: ['Intelligence Analyst', 'Security Specialist', 'Defense Contractor'],
            });
        }

        if (systems?.some(s => s.includes('Computer') || s.includes('IT'))) {
            matches.push({
                category: 'IT & Cybersecurity',
                match: 90,
                roles: ['IT Support Specialist', 'Network Administrator', 'Cybersecurity Analyst'],
            });
        }

        if (systems?.some(s => s.includes('Medical'))) {
            matches.push({
                category: 'Healthcare',
                match: 88,
                roles: ['Emergency Medical Technician', 'Medical Technician', 'Healthcare Administrator'],
            });
        }

        if (systems?.some(s => s.includes('Vehicle'))) {
            matches.push({
                category: 'Transportation & Logistics',
                match: 85,
                roles: ['Fleet Manager', 'Logistics Coordinator', 'CDL Driver'],
            });
        }

        if (goal?.includes('Management') || (answers.role_scope as string)?.includes('Platoon')) {
            matches.push({
                category: 'Operations Management',
                match: 82,
                roles: ['Operations Manager', 'Project Manager', 'Team Lead'],
            });
        }

        if (goal?.includes('Government')) {
            matches.push({
                category: 'Federal Careers',
                match: 88,
                roles: ['Federal Agent', 'Government Contractor', 'Civil Service'],
            });
        }

        return matches.sort((a, b) => b.match - a.match).slice(0, 4);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="container mx-auto px-6 py-6 flex justify-between items-center bg-white border-b border-gray-100 shadow-sm mb-8">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-navy rounded-lg flex items-center justify-center text-white shadow-md">🎖️</div>
                    <span className="text-xl font-bold text-brand-navy">Caprica</span>
                </Link>
                <Link href="/veterans" className="text-gray-500 hover:text-brand-navy font-bold transition-all underline decoration-gray-200 underline-offset-4 decoration-2">← Back to Portal</Link>
            </nav>

            <main className="container mx-auto px-6 py-8">
                {/* INTRO */}
                {step === 0 && (
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="text-7xl mb-6">🎖️</div>
                        <h1 className="text-4xl font-extrabold text-brand-navy mb-4">Veteran Skills Assessment</h1>
                        <p className="text-gray-600 mb-8 text-lg font-medium">10 quick questions to translate your military experience into a professional civilian roadmap.</p>

                        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-left mb-8 shadow-sm">
                            <h3 className="font-bold text-brand-navy text-xl mb-4">What we'll uncover</h3>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 text-gray-700">
                                    <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold font-bold">🎯</div>
                                    <span><strong>Real Responsibilities:</strong> Beyond your MOS code.</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-700">
                                    <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold font-bold">🛠️</div>
                                    <span><strong>Technical Mastery:</strong> Systems and specialized equipment.</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-700">
                                    <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold font-bold">💼</div>
                                    <span><strong>Leadership Depth:</strong> Decisions, budgets, and personnel.</span>
                                </li>
                            </ul>
                            <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100 text-amber-800 text-sm font-semibold">
                                💡 We use this data to generate high-impact resume bullets and find your best career matches.
                            </div>
                        </div>

                        <button onClick={() => setStep(1)} className="px-12 py-4 bg-brand-gold text-white rounded-xl font-bold text-xl hover:bg-brand-gold-light transition-all shadow-lg transform hover:-translate-y-1">
                            Start Assessment
                        </button>
                    </div>
                )}

                {/* QUESTIONS */}
                {step === 1 && q && (
                    <div className="max-w-2xl mx-auto">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-500 font-bold bg-gray-100 px-3 py-1 rounded-full text-xs">QUESTION {currentQ + 1} OF {SKILLS_QUESTIONS.length}</span>
                            <span className="text-brand-gold font-bold tracking-widest text-xs uppercase">{q.category}</span>
                        </div>

                        <div className="h-3 bg-gray-200 rounded-full mb-8 overflow-hidden shadow-inner">
                            <div className="h-full bg-brand-gold transition-all duration-500 rounded-full" style={{ width: `${((currentQ + 1) / SKILLS_QUESTIONS.length) * 100}%` }} />
                        </div>

                        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-xl">
                            <h2 className="text-2xl font-bold text-brand-navy mb-8 leading-tight">{q.question}</h2>

                            {q.type === 'single' && (
                                <div className="grid gap-3">
                                    {q.options?.map((opt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleSingle(opt)}
                                            className={`w-full p-5 rounded-xl text-left font-bold transition-all border-2 ${currentAnswer === opt
                                                ? 'bg-brand-navy/5 border-brand-navy text-brand-navy shadow-sm'
                                                : 'bg-white border-gray-100 text-gray-600 hover:border-brand-gold hover:bg-gray-50'
                                                }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {q.type === 'multi' && (
                                <div className="grid gap-3">
                                    <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Select all that apply</p>
                                    {q.options?.map((opt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleMulti(opt)}
                                            className={`w-full p-4 rounded-xl text-left font-bold transition-all border-2 ${(currentAnswer as string[])?.includes(opt)
                                                ? 'bg-brand-navy/5 border-brand-navy text-brand-navy shadow-sm'
                                                : 'bg-white border-gray-100 text-gray-600 hover:border-brand-gold hover:bg-gray-50'
                                                }`}
                                        >
                                            <span className="mr-3 text-brand-gold">{(currentAnswer as string[])?.includes(opt) ? '✓' : '○'}</span>
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
                                <button
                                    onClick={() => setCurrentQ(prev => Math.max(0, prev - 1))}
                                    disabled={currentQ === 0}
                                    className="text-gray-400 hover:text-brand-navy font-bold disabled:opacity-30 transition-colors"
                                >
                                    ← Previous
                                </button>
                                <button
                                    onClick={nextQuestion}
                                    disabled={!canProceed}
                                    className="px-10 py-3 bg-brand-navy text-white rounded-lg font-bold disabled:opacity-50 hover:bg-brand-navy-light transition-all shadow-md active:scale-95"
                                >
                                    {currentQ + 1 >= SKILLS_QUESTIONS.length ? 'See Results' : 'Next Question'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* RESULTS */}
                {step === 2 && (
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-10">
                            <div className="text-6xl mb-4">✨</div>
                            <h1 className="text-4xl font-extrabold text-brand-navy mb-2">Your Career Profile</h1>
                            <p className="text-gray-600 text-lg">Your military service, translated for the civilian tech and defense market.</p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-8">
                                {/* Resume Bullets */}
                                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                                    <h3 className="font-bold text-brand-navy text-xl mb-6 flex items-center gap-2">
                                        <span className="p-2 bg-gray-100 rounded-lg">📝</span>
                                        High-Impact Resume Bullets
                                    </h3>
                                    <div className="space-y-4">
                                        {generateResumeBullets().map((bullet, i) => (
                                            <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-xl group hover:bg-white hover:shadow-md transition-all border border-gray-100">
                                                <span className="text-brand-gold mt-1">★</span>
                                                <p className="text-gray-700 font-medium leading-relaxed">{bullet}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="mt-8 w-full py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-brand-gold hover:text-white transition-all group">
                                        Copy All Bullets <span className="text-gray-400 group-hover:text-white ml-2">📋</span>
                                    </button>
                                </div>

                                {/* Job Matches */}
                                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                                    <h3 className="font-bold text-brand-navy text-xl mb-6 flex items-center gap-2">
                                        <span className="p-2 bg-gray-100 rounded-lg">🎯</span>
                                        Precision Career Matches
                                    </h3>
                                    <div className="grid gap-4">
                                        {getJobMatches().map((match, i) => (
                                            <div key={i} className="p-6 bg-white border border-gray-100 rounded-2xl hover:border-brand-navy transition-all shadow-sm">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{match.category}</span>
                                                        <h4 className="font-bold text-brand-navy text-lg">{match.roles[0]} & More</h4>
                                                    </div>
                                                    <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-100">
                                                        {match.match}% Match
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {match.roles.map((role, j) => (
                                                        <span key={j} className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-bold group-hover:bg-brand-navy/5">
                                                            {role}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {/* Next Steps Card */}
                                <div className="bg-brand-navy rounded-2xl p-8 text-white shadow-xl sticky top-8">
                                    <h3 className="text-xl font-bold mb-6">Your Next Steps</h3>
                                    <div className="space-y-6">
                                        <div className="flex gap-4">
                                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">1</div>
                                            <div>
                                                <p className="font-bold">Explore Jobs</p>
                                                <p className="text-sm text-gray-300">View live listings that match your new profile.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">2</div>
                                            <div>
                                                <p className="font-bold">Build Resume</p>
                                                <p className="text-sm text-gray-300">Export these bullets into a premium template.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">3</div>
                                            <div>
                                                <p className="font-bold">Set Alerts</p>
                                                <p className="text-sm text-gray-300">Get notified when new matches appear.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 space-y-3">
                                        <Link href="/jobs" className="block w-full text-center py-4 bg-brand-gold text-white font-bold rounded-xl hover:bg-brand-gold-light transition-all shadow-lg">
                                            View Matching Jobs
                                        </Link>
                                        <Link href="/resume" className="block w-full text-center py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all border border-white/20">
                                            Finish My Resume
                                        </Link>
                                        <button onClick={() => { setStep(0); setAnswers({}); setCurrentQ(0); }} className="block w-full text-center py-2 text-gray-400 text-sm hover:text-white transition-colors">
                                            Retake Assessment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
