'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface ChatAgentProps {
    primaryColor?: string;
    onComplete?: (candidateData: Record<string, unknown>) => void;
}

export default function ChatAgent({
    primaryColor = '#F59E0B', // Amber for military theme
    onComplete
}: ChatAgentProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    const [phase, setPhase] = useState<string>('GREETING');
    const [userType, setUserType] = useState<string>('unknown');
    const [candidateData, setCandidateData] = useState<Record<string, unknown>>({});
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Start conversation on mount
    useEffect(() => {
        startConversation();
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const startConversation = async () => {
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId, action: 'start' }),
            });
            const data = await res.json();
            if (data.message) {
                setMessages([{ role: 'assistant', content: data.message }]);
                setPhase(data.phase);
            }
        } catch (error) {
            console.error('Failed to start conversation:', error);
            setMessages([{
                role: 'assistant',
                content: "Hi there! 👋 I'm Caprica, your military career advisor.\n\nWhether you're a **veteran** looking for your next mission in the civilian world, or you're **exploring** whether military service is right for you—I'm here to help.\n\nWhich best describes you?"
            }]);
        }
    };

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId, action: 'message', message: userMessage }),
            });
            const data = await res.json();

            if (data.message) {
                setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
                setPhase(data.phase);
                setUserType(data.userType || 'unknown');
                if (data.candidateData) {
                    setCandidateData(data.candidateData);
                }

                // Check if ready for next step
                if ((data.phase === 'VETERAN_MATCH' || data.phase === 'RECRUIT_PREP') && onComplete) {
                    onComplete(data.candidateData);
                }
            }
        } catch (error) {
            console.error('Failed to send message:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "I'm sorry, I had trouble processing that. Could you try again?"
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // Get phase indicator for the current user type
    const getPhaseSteps = () => {
        if (userType === 'veteran') {
            return ['GREETING', 'VETERAN_DISCOVERY', 'VETERAN_GOALS', 'VETERAN_MATCH'];
        } else if (userType === 'recruit') {
            return ['GREETING', 'RECRUIT_INTERESTS', 'RECRUIT_MOS', 'RECRUIT_PREP'];
        }
        return ['GREETING'];
    };

    const phaseLabels: Record<string, string> = {
        'GREETING': 'Welcome',
        'VETERAN_DISCOVERY': 'Your Service',
        'VETERAN_GOALS': 'Career Goals',
        'VETERAN_MATCH': 'Matches Ready',
        'RECRUIT_INTERESTS': 'Your Interests',
        'RECRUIT_MOS': 'Finding Your MOS',
        'RECRUIT_PREP': 'Next Steps',
    };

    const phases = getPhaseSteps();
    const currentPhaseIndex = phases.indexOf(phase);

    return (
        <div className="flex flex-col h-[600px] max-w-2xl mx-auto bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-700">
            {/* Header */}
            <div
                className="px-6 py-4 text-white flex items-center gap-3 bg-gradient-to-r from-amber-600 to-amber-500"
            >
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-xl">🎖️</span>
                </div>
                <div>
                    <h3 className="font-semibold">Caprica Career Advisor</h3>
                    <p className="text-sm text-amber-100">
                        {userType === 'veteran' ? '🎖️ Veteran Transition' :
                            userType === 'recruit' ? '📋 Military Explorer' :
                                '💬 Online'}
                    </p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-800">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] px-4 py-3 rounded-2xl ${msg.role === 'user'
                                ? 'bg-amber-500 text-slate-900 rounded-br-md'
                                : 'bg-slate-700 text-white rounded-bl-md'
                                }`}
                        >
                            <p className="whitespace-pre-wrap">{msg.content}</p>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-slate-700 px-4 py-3 rounded-2xl rounded-bl-md">
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Progress indicator */}
            {phases.length > 1 && (
                <div className="px-4 py-3 bg-slate-800 border-t border-slate-700">
                    <div className="flex items-center justify-between gap-2">
                        {phases.map((p, idx) => (
                            <div key={p} className="flex items-center gap-2 flex-1">
                                <div
                                    className={`w-3 h-3 rounded-full transition-all flex-shrink-0 ${idx <= currentPhaseIndex
                                        ? 'bg-amber-500'
                                        : 'bg-slate-600'
                                        }`}
                                />
                                {idx < phases.length - 1 && (
                                    <div className={`h-0.5 flex-1 ${idx < currentPhaseIndex ? 'bg-amber-500' : 'bg-slate-600'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-slate-400 text-center mt-2">
                        {phaseLabels[phase] || phase}
                    </p>
                </div>
            )}

            {/* Quick Actions */}
            <div className="px-4 py-2 bg-slate-850 border-t border-slate-700 flex gap-2 flex-wrap">
                <button
                    onClick={() => { setInput("Help me build my resume"); sendMessage(); }}
                    className="px-3 py-1.5 text-sm bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition-colors"
                >
                    📄 Resume Help
                </button>
                <button
                    onClick={() => { setInput("Find jobs matching my MOS"); sendMessage(); }}
                    className="px-3 py-1.5 text-sm bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition-colors"
                >
                    💼 Find Jobs
                </button>
                <button
                    onClick={() => { setInput("Compare military branches"); sendMessage(); }}
                    className="px-3 py-1.5 text-sm bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition-colors"
                >
                    🎖️ Compare Branches
                </button>
                <button
                    onClick={() => { setInput("Take ASVAB practice test"); sendMessage(); }}
                    className="px-3 py-1.5 text-sm bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition-colors"
                >
                    📋 ASVAB Prep
                </button>
            </div>

            {/* Input */}
            <div className="p-4 bg-slate-900 border-t border-slate-700">
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        disabled={isLoading}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={isLoading || !input.trim()}
                        className="px-6 py-3 rounded-xl text-slate-900 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-amber-500 hover:bg-amber-400"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
