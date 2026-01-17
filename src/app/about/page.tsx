import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us - Caprica AI",
    description: "We're building the future of AI-powered recruiting. Meet the team behind Caprica.",
};

export default function AboutPage() {
    return (
        <div className="pt-24 pb-16 min-h-screen bg-white">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="pill mb-4 inline-flex">
                        <span className="sparkle">✨</span>
                        <span>About Us</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-[#111827] mb-6">
                        Building the Future of{" "}
                        <span className="gradient-text">Recruiting</span>
                    </h1>
                    <p className="text-xl text-[#6B7280]">
                        We believe hiring should be about people, not paperwork. That's why we're building AI that handles the busywork so recruiters can focus on what matters. ✨
                    </p>
                </div>

                {/* Mission */}
                <div className="max-w-4xl mx-auto mb-20">
                    <div className="gradient-border p-8 md:p-12 bg-white">
                        <div className="pill mb-4 inline-flex">
                            <span>🎯</span>
                            <span>Our Mission</span>
                        </div>
                        <p className="text-[#6B7280] text-lg leading-relaxed">
                            To democratize AI-powered operations, enabling any company—regardless of size or technical expertise—to become an AI-driven organization. We started with recruiting because it's where we saw the biggest opportunity to give time back to people. ✨
                        </p>
                    </div>
                </div>

                {/* Story */}
                <div className="max-w-4xl mx-auto mb-20">
                    <div className="pill mb-4 inline-flex">
                        <span>📖</span>
                        <span>Our Story</span>
                    </div>
                    <h2 className="text-3xl font-bold text-[#111827] mb-8">How We Got Here</h2>
                    <div className="space-y-6 text-[#6B7280] leading-relaxed">
                        <p>
                            Caprica was born from frustration. Our founders spent years watching talented recruiters drown in resume piles, manually copy-pasting candidate data, and losing great hires to slow response times.
                        </p>
                        <p>
                            We asked ourselves: in a world where AI can write poetry and code, why are recruiters still doing data entry? The answer was clear—nobody had built the right tool yet.
                        </p>
                        <p>
                            So we built Caprica. An AI platform that handles the repetitive parts of recruiting—screening resumes, engaging candidates, scheduling interviews—so humans can focus on the human parts: building relationships, making judgment calls, and finding the perfect fit. ✨
                        </p>
                        <p>
                            Today, Caprica is used by recruiting teams across industries, from fast-growing startups to government agencies. We're just getting started.
                        </p>
                    </div>
                </div>

                {/* Values */}
                <div className="max-w-4xl mx-auto mb-20">
                    <div className="text-center mb-12">
                        <div className="pill mb-4 inline-flex">
                            <span>💡</span>
                            <span>Values</span>
                        </div>
                        <h2 className="text-3xl font-bold text-[#111827]">What We Believe</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="card text-center bg-white">
                            <div className="text-4xl mb-4">🎯</div>
                            <h3 className="text-xl font-semibold text-[#111827] mb-2">AI Should Assist, Not Replace</h3>
                            <p className="text-[#6B7280] text-sm">Humans make the decisions. AI handles the busywork. That's the right balance.</p>
                        </div>
                        <div className="card text-center bg-white">
                            <div className="text-4xl mb-4">⚖️</div>
                            <h3 className="text-xl font-semibold text-[#111827] mb-2">Fair & Unbiased</h3>
                            <p className="text-[#6B7280] text-sm">We build AI that reduces bias, not amplifies it. Regular audits, diverse training data.</p>
                        </div>
                        <div className="card text-center bg-white">
                            <div className="text-4xl mb-4">🔒</div>
                            <h3 className="text-xl font-semibold text-[#111827] mb-2">Privacy First</h3>
                            <p className="text-[#6B7280] text-sm">Candidate data is sacred. We never sell data, and we exceed compliance standards.</p>
                        </div>
                    </div>
                </div>

                {/* Team */}
                <div className="max-w-4xl mx-auto mb-20">
                    <div className="text-center mb-12">
                        <div className="pill mb-4 inline-flex">
                            <span>👥</span>
                            <span>Team</span>
                        </div>
                        <h2 className="text-3xl font-bold text-[#111827]">Leadership</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-6 text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-[#1073E8] to-[#7C3AED] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                                M
                            </div>
                            <h3 className="text-xl font-semibold text-[#111827]">Mike</h3>
                            <p className="text-[#1073E8] text-sm mb-3">Founder & CEO ✨</p>
                            <p className="text-[#6B7280] text-sm">
                                Building AI that gives time back to people. Previously founded multiple tech companies.
                            </p>
                            <div className="mt-4">
                                <Link
                                    href="https://calendly.com/mike-springroll/30min"
                                    target="_blank"
                                    className="text-[#1073E8] hover:text-[#7C3AED] text-sm font-medium"
                                >
                                    Schedule a call →
                                </Link>
                            </div>
                        </div>
                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-6 text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                                +
                            </div>
                            <h3 className="text-xl font-semibold text-[#111827]">Join Us</h3>
                            <p className="text-[#10B981] text-sm mb-3">We're Hiring ✨</p>
                            <p className="text-[#6B7280] text-sm">
                                Passionate about AI and recruiting? We're always looking for talented people to join our team.
                            </p>
                            <div className="mt-4">
                                <Link
                                    href="https://springroll.ai/contact-us/"
                                    target="_blank"
                                    className="text-[#10B981] hover:text-[#059669] text-sm font-medium"
                                >
                                    View openings →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-[#111827] mb-4">Ready to Transform Your Recruiting?</h2>
                    <p className="text-[#6B7280] mb-8">
                        Start free today. No credit card required. ✨
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/pricing" className="btn-primary px-8 py-4">
                            Get Started Free ✨
                        </Link>
                        <Link
                            href="https://calendly.com/mike-springroll/30min"
                            target="_blank"
                            className="btn-secondary px-8 py-4"
                        >
                            Talk to Us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
