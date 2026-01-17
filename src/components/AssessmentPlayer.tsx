'use client';

import { useState, useEffect, useCallback } from 'react';
import { Assessment, Question, calculateAssessmentResult } from '@/lib/assessment-types';

interface AssessmentPlayerProps {
    assessment: Assessment;
    onComplete: (result: {
        answers: Record<string, string | string[]>;
        totalScore: number;
        categoryScores: Record<string, number>;
        timeSpent: number;
        passed: boolean;
    }) => void;
    clientName?: string;
    primaryColor?: string;
}

export default function AssessmentPlayer({
    assessment,
    onComplete,
    clientName = 'Caprica',
    primaryColor = '#1073E8',
}: AssessmentPlayerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
    const [startTime] = useState(Date.now());
    const [timeLeft, setTimeLeft] = useState<number | null>(
        assessment.timeLimit ? assessment.timeLimit * 60 : null
    );
    const [isComplete, setIsComplete] = useState(false);

    const questions = assessment.shuffleQuestions
        ? [...assessment.questions].sort(() => Math.random() - 0.5)
        : assessment.questions;

    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;

    // Timer
    useEffect(() => {
        if (timeLeft === null || timeLeft <= 0 || isComplete) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev === null || prev <= 1) {
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, isComplete]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswer = useCallback((answer: string | string[]) => {
        setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: answer,
        }));
    }, [currentQuestion?.id]);

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const handleSubmit = useCallback(() => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        const { totalScore, categoryScores, passed } = calculateAssessmentResult(assessment, answers);

        setIsComplete(true);
        onComplete({
            answers,
            totalScore,
            categoryScores,
            timeSpent,
            passed,
        });
    }, [answers, assessment, startTime, onComplete]);

    const renderQuestion = (question: Question) => {
        const currentAnswer = answers[question.id];

        switch (question.type) {
            case 'multiple_choice':
                return (
                    <div className="space-y-3">
                        {question.options?.map(option => (
                            <button
                                key={option.id}
                                onClick={() => handleAnswer(option.id)}
                                className={`w-full p-4 text-left rounded-xl border-2 transition-all ${currentAnswer === option.id
                                        ? 'border-[#1073E8] bg-[#1073E8]/10'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <span className="font-medium">{option.text}</span>
                            </button>
                        ))}
                    </div>
                );

            case 'multi_select':
                return (
                    <div className="space-y-3">
                        <p className="text-sm text-gray-500 mb-2">Select all that apply</p>
                        {question.options?.map(option => {
                            const selected = Array.isArray(currentAnswer) && currentAnswer.includes(option.id);
                            return (
                                <button
                                    key={option.id}
                                    onClick={() => {
                                        const current = Array.isArray(currentAnswer) ? currentAnswer : [];
                                        if (selected) {
                                            handleAnswer(current.filter(a => a !== option.id));
                                        } else {
                                            handleAnswer([...current, option.id]);
                                        }
                                    }}
                                    className={`w-full p-4 text-left rounded-xl border-2 transition-all flex items-center gap-3 ${selected
                                            ? 'border-[#1073E8] bg-[#1073E8]/10'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${selected ? 'border-[#1073E8] bg-[#1073E8]' : 'border-gray-300'
                                        }`}>
                                        {selected && <span className="text-white text-xs">✓</span>}
                                    </div>
                                    <span>{option.text}</span>
                                </button>
                            );
                        })}
                    </div>
                );

            case 'text':
                return (
                    <textarea
                        value={(currentAnswer as string) || ''}
                        onChange={e => handleAnswer(e.target.value)}
                        placeholder="Type your answer here..."
                        className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-[#1073E8] focus:outline-none min-h-[150px]"
                    />
                );

            case 'rating':
                return (
                    <div className="flex gap-2 justify-center">
                        {[1, 2, 3, 4, 5].map(rating => (
                            <button
                                key={rating}
                                onClick={() => handleAnswer(rating.toString())}
                                className={`w-12 h-12 rounded-full text-lg font-bold transition-all ${currentAnswer === rating.toString()
                                        ? 'bg-[#1073E8] text-white'
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                                    }`}
                            >
                                {rating}
                            </button>
                        ))}
                    </div>
                );

            case 'scenario':
                return (
                    <div className="space-y-3">
                        {question.options?.map(option => (
                            <button
                                key={option.id}
                                onClick={() => handleAnswer(option.id)}
                                className={`w-full p-4 text-left rounded-xl border-2 transition-all ${currentAnswer === option.id
                                        ? 'border-[#7C3AED] bg-[#7C3AED]/10'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <span>{option.text}</span>
                            </button>
                        ))}
                    </div>
                );

            default:
                return null;
        }
    };

    if (isComplete) {
        return (
            <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">✅</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Assessment Complete!</h2>
                <p className="text-gray-600">Your results are being processed...</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-t-2xl shadow-lg p-6 border-b">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">{assessment.name}</h2>
                    {timeLeft !== null && (
                        <div className={`px-4 py-2 rounded-full font-mono font-bold ${timeLeft < 60 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-700'
                            }`}>
                            ⏱️ {formatTime(timeLeft)}
                        </div>
                    )}
                </div>

                {/* Progress bar */}
                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="absolute h-full rounded-full transition-all duration-300"
                        style={{
                            width: `${progress}%`,
                            background: `linear-gradient(90deg, ${primaryColor}, #7C3AED)`
                        }}
                    />
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>Question {currentIndex + 1} of {questions.length}</span>
                    <span>{Math.round(progress)}% complete</span>
                </div>
            </div>

            {/* Question */}
            <div className="bg-white shadow-lg p-8">
                <div className="mb-2">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#1073E8]/10 text-[#1073E8]">
                        {currentQuestion.category.toUpperCase()}
                    </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                    {currentQuestion.question}
                </h3>
                {renderQuestion(currentQuestion)}
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-b-2xl shadow-lg p-6 flex justify-between">
                <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="px-6 py-3 rounded-xl border border-gray-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                    ← Previous
                </button>

                {currentIndex < questions.length - 1 ? (
                    <button
                        onClick={handleNext}
                        className="px-6 py-3 rounded-xl text-white font-medium transition-all"
                        style={{ background: `linear-gradient(135deg, ${primaryColor}, #7C3AED)` }}
                    >
                        Next →
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        className="px-8 py-3 rounded-xl text-white font-medium bg-green-500 hover:bg-green-600 transition-colors"
                    >
                        Submit Assessment ✓
                    </button>
                )}
            </div>

            {/* Question navigator */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
                {questions.map((q, idx) => (
                    <button
                        key={q.id}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${idx === currentIndex
                                ? 'bg-[#1073E8] text-white'
                                : answers[q.id]
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {idx + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}
