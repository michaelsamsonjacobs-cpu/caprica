'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Question, QuestionType } from '@/lib/assessment-types';

const QUESTION_TYPES: { id: QuestionType; label: string; icon: string }[] = [
    { id: 'multiple_choice', label: 'Multiple Choice', icon: '🔘' },
    { id: 'multi_select', label: 'Multi-Select', icon: '☑️' },
    { id: 'text', label: 'Open Text', icon: '📝' },
    { id: 'rating', label: 'Rating Scale', icon: '⭐' },
    { id: 'scenario', label: 'Scenario Based', icon: '🎭' },
];

const CATEGORIES = [
    'General', 'Technical', 'Behavioral', 'Cognitive',
    'AR', 'WK', 'PC', 'MK', 'GS', 'MC', 'EI', 'AI', 'SI', 'AO'
];

interface QuestionDraft {
    type: QuestionType;
    category: string;
    question: string;
    options: { id: string; text: string; isCorrect: boolean }[];
    points: number;
    timeLimit?: number;
}

export default function AssessmentBuilder() {
    const [assessmentName, setAssessmentName] = useState('');
    const [assessmentDesc, setAssessmentDesc] = useState('');
    const [timeLimit, setTimeLimit] = useState(30);
    const [passingScore, setPassingScore] = useState(70);
    const [questions, setQuestions] = useState<QuestionDraft[]>([]);
    const [showAddQuestion, setShowAddQuestion] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState<QuestionDraft>({
        type: 'multiple_choice',
        category: 'General',
        question: '',
        options: [
            { id: 'a', text: '', isCorrect: true },
            { id: 'b', text: '', isCorrect: false },
            { id: 'c', text: '', isCorrect: false },
            { id: 'd', text: '', isCorrect: false },
        ],
        points: 10,
    });

    const addQuestion = () => {
        if (!currentQuestion.question.trim()) return;
        setQuestions([...questions, currentQuestion]);
        setCurrentQuestion({
            type: 'multiple_choice',
            category: 'General',
            question: '',
            options: [
                { id: 'a', text: '', isCorrect: true },
                { id: 'b', text: '', isCorrect: false },
                { id: 'c', text: '', isCorrect: false },
                { id: 'd', text: '', isCorrect: false },
            ],
            points: 10,
        });
        setShowAddQuestion(false);
    };

    const removeQuestion = (index: number) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const saveAssessment = () => {
        const assessment = {
            id: `custom_${Date.now()}`,
            name: assessmentName,
            description: assessmentDesc,
            category: 'custom',
            timeLimit,
            passingScore,
            questions: questions.map((q, i) => ({
                ...q,
                id: `q_${i}`,
                required: true,
            })),
            shuffleQuestions: true,
            showResults: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isActive: true,
            isTemplate: false,
        };

        // In production, save to database
        console.log('Saving assessment:', assessment);
        alert('Assessment saved! (Check console for data)');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="text-gray-600 hover:text-gray-800">
                            ← Back to Admin
                        </Link>
                        <span className="text-gray-300">|</span>
                        <h1 className="text-xl font-bold text-gray-800">Assessment Builder</h1>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                            Preview
                        </button>
                        <button
                            onClick={saveAssessment}
                            disabled={!assessmentName || questions.length === 0}
                            className="px-6 py-2 bg-gradient-to-r from-[#1073E8] to-[#7C3AED] text-white rounded-lg disabled:opacity-50"
                        >
                            Save Assessment
                        </button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-3 gap-8">
                    {/* Left Column - Assessment Settings */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h2 className="font-semibold text-gray-800 mb-4">Assessment Details</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={assessmentName}
                                        onChange={e => setAssessmentName(e.target.value)}
                                        placeholder="e.g., Technical Skills Assessment"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1073E8] focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        value={assessmentDesc}
                                        onChange={e => setAssessmentDesc(e.target.value)}
                                        placeholder="Brief description of this assessment..."
                                        rows={3}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1073E8] focus:border-transparent"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Time Limit (min)</label>
                                        <input
                                            type="number"
                                            value={timeLimit}
                                            onChange={e => setTimeLimit(parseInt(e.target.value))}
                                            min={5}
                                            max={180}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1073E8] focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Passing Score (%)</label>
                                        <input
                                            type="number"
                                            value={passingScore}
                                            onChange={e => setPassingScore(parseInt(e.target.value))}
                                            min={0}
                                            max={100}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1073E8] focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h2 className="font-semibold text-gray-800 mb-4">Summary</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Questions</span>
                                    <span className="font-medium">{questions.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total Points</span>
                                    <span className="font-medium">{questions.reduce((sum, q) => sum + q.points, 0)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Est. Duration</span>
                                    <span className="font-medium">{questions.length * 1.5} min</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Questions */}
                    <div className="col-span-2 space-y-4">
                        {/* Question List */}
                        {questions.map((q, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-sm p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <span className="w-8 h-8 bg-[#1073E8]/10 text-[#1073E8] rounded-lg flex items-center justify-center font-medium">
                                            {index + 1}
                                        </span>
                                        <span className="text-xs px-2 py-1 bg-gray-100 rounded-full uppercase">{q.category}</span>
                                    </div>
                                    <button
                                        onClick={() => removeQuestion(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                                <p className="font-medium text-gray-800 mb-3">{q.question}</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {q.options.map(opt => (
                                        <div
                                            key={opt.id}
                                            className={`px-3 py-2 rounded-lg text-sm ${opt.isCorrect
                                                    ? 'bg-green-50 text-green-700 border border-green-200'
                                                    : 'bg-gray-50 text-gray-600'
                                                }`}
                                        >
                                            {opt.isCorrect && '✓ '}{opt.text || '(empty)'}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Add Question Form */}
                        {showAddQuestion ? (
                            <div className="bg-white rounded-2xl shadow-sm p-6 border-2 border-[#1073E8]">
                                <h3 className="font-semibold text-gray-800 mb-4">Add Question</h3>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                            <select
                                                value={currentQuestion.type}
                                                onChange={e => setCurrentQuestion({ ...currentQuestion, type: e.target.value as QuestionType })}
                                                className="w-full px-4 py-2 border rounded-lg"
                                            >
                                                {QUESTION_TYPES.map(t => (
                                                    <option key={t.id} value={t.id}>{t.icon} {t.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                            <select
                                                value={currentQuestion.category}
                                                onChange={e => setCurrentQuestion({ ...currentQuestion, category: e.target.value })}
                                                className="w-full px-4 py-2 border rounded-lg"
                                            >
                                                {CATEGORIES.map(c => (
                                                    <option key={c} value={c}>{c}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Points</label>
                                            <input
                                                type="number"
                                                value={currentQuestion.points}
                                                onChange={e => setCurrentQuestion({ ...currentQuestion, points: parseInt(e.target.value) })}
                                                min={1}
                                                max={100}
                                                className="w-full px-4 py-2 border rounded-lg"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                                        <textarea
                                            value={currentQuestion.question}
                                            onChange={e => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
                                            placeholder="Enter your question..."
                                            rows={2}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    {(currentQuestion.type === 'multiple_choice' || currentQuestion.type === 'multi_select') && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Options (mark correct answer)</label>
                                            <div className="space-y-2">
                                                {currentQuestion.options.map((opt, i) => (
                                                    <div key={opt.id} className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => {
                                                                const newOptions = currentQuestion.options.map((o, j) => ({
                                                                    ...o,
                                                                    isCorrect: currentQuestion.type === 'multi_select'
                                                                        ? i === j ? !o.isCorrect : o.isCorrect
                                                                        : i === j
                                                                }));
                                                                setCurrentQuestion({ ...currentQuestion, options: newOptions });
                                                            }}
                                                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${opt.isCorrect
                                                                    ? 'border-green-500 bg-green-500 text-white'
                                                                    : 'border-gray-300'
                                                                }`}
                                                        >
                                                            {opt.isCorrect && '✓'}
                                                        </button>
                                                        <input
                                                            type="text"
                                                            value={opt.text}
                                                            onChange={e => {
                                                                const newOptions = [...currentQuestion.options];
                                                                newOptions[i].text = e.target.value;
                                                                setCurrentQuestion({ ...currentQuestion, options: newOptions });
                                                            }}
                                                            placeholder={`Option ${String.fromCharCode(65 + i)}`}
                                                            className="flex-1 px-3 py-2 border rounded-lg"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex gap-3 pt-4">
                                        <button
                                            onClick={() => setShowAddQuestion(false)}
                                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={addQuestion}
                                            disabled={!currentQuestion.question.trim()}
                                            className="px-6 py-2 bg-[#1073E8] text-white rounded-lg disabled:opacity-50"
                                        >
                                            Add Question
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowAddQuestion(true)}
                                className="w-full py-6 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 hover:border-[#1073E8] hover:text-[#1073E8] transition-colors"
                            >
                                + Add Question
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
