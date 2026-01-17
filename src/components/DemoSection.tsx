import Link from "next/link";

export default function DemoSection() {
    return (
        <section className="py-24 section-alt">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <div className="pill mb-4 inline-flex">
                            <span className="sparkle">✨</span>
                            <span>Live Demo</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-6">
                            See Caprica{" "}
                            <span className="gradient-text">In Action</span>
                        </h2>
                        <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
                            Try our live recruitment chatbot. Ask about career opportunities and see how AI transforms candidate engagement.
                        </p>
                    </div>

                    {/* Demo Card */}
                    <div className="gradient-border p-8 md:p-12 bg-white">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            {/* Left: Description */}
                            <div>
                                <div className="pill mb-4">
                                    <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
                                    <span className="text-[#10B981]">Live Demo</span>
                                </div>
                                <h3 className="text-2xl font-bold text-[#111827] mb-4">
                                    Military Career Advisor ✨
                                </h3>
                                <p className="text-[#6B7280] mb-6 leading-relaxed">
                                    This AI chatbot helps candidates explore career paths based on their skills and interests. It demonstrates how Caprica can:
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-start gap-3">
                                        <span className="text-[#1073E8] mt-1">✓</span>
                                        <span className="text-[#6B7280]">Engage candidates 24/7 with instant responses</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-[#1073E8] mt-1">✓</span>
                                        <span className="text-[#6B7280]">Qualify candidates through conversational assessment</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-[#1073E8] mt-1">✓</span>
                                        <span className="text-[#6B7280]">Personalize recommendations based on skills</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-[#1073E8] mt-1">✓</span>
                                        <span className="text-[#6B7280]">Collect structured data for your ATS</span>
                                    </li>
                                </ul>
                                <Link
                                    href="https://dev.springroll.ai/chat?recruiterId=bb0e9b29-5b16-46bd-88ff-da4b452ecdaa"
                                    target="_blank"
                                    className="btn-primary inline-flex items-center gap-2"
                                >
                                    Try the Demo ✨
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </div>

                            {/* Right: Chat Preview */}
                            <div className="bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-lg">
                                <div className="bg-white px-4 py-3 border-b border-[#E5E7EB] flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                    <div className="w-3 h-3 rounded-full bg-green-400" />
                                    <span className="ml-2 text-sm text-[#6B7280] mono">caprica-recruit</span>
                                </div>
                                <div className="p-4 space-y-4 min-h-[300px]">
                                    {/* AI Message */}
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1073E8] to-[#7C3AED] flex items-center justify-center text-white text-sm shrink-0">
                                            C
                                        </div>
                                        <div className="bg-white rounded-2xl rounded-tl-none p-4 max-w-[80%] shadow-sm border border-[#E5E7EB]">
                                            <p className="text-[#111827] text-sm">
                                                Hi! ✨ I'm your career advisor. What type of role are you interested in?
                                            </p>
                                        </div>
                                    </div>
                                    {/* User Message */}
                                    <div className="flex gap-3 justify-end">
                                        <div className="bg-gradient-to-r from-[#1073E8] to-[#7C3AED] rounded-2xl rounded-tr-none p-4 max-w-[80%]">
                                            <p className="text-white text-sm">
                                                I'm interested in technology and cybersecurity
                                            </p>
                                        </div>
                                    </div>
                                    {/* AI Response */}
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1073E8] to-[#7C3AED] flex items-center justify-center text-white text-sm shrink-0">
                                            C
                                        </div>
                                        <div className="bg-white rounded-2xl rounded-tl-none p-4 max-w-[80%] shadow-sm border border-[#E5E7EB]">
                                            <p className="text-[#111827] text-sm">
                                                Great choice! Based on your interests, I'd recommend exploring Cyber Operations or IT Systems Administrator roles. Want me to tell you more? ✨
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
