import Link from "next/link";

export default function CTASection() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden dot-grid opacity-30">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#1073E8]/10 to-[#7C3AED]/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="pill mb-6 inline-flex">
                        <span className="sparkle">✨</span>
                        <span>Get Started Today</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-bold text-[#111827] mb-6">
                        Ready to Hire{" "}
                        <span className="gradient-text">10x Faster?</span>
                    </h2>
                    <p className="text-xl text-[#6B7280] mb-10 max-w-2xl mx-auto">
                        Join 50+ recruiting teams who've transformed their hiring with AI. Start free today—no credit card required.
                    </p>

                    {/* CTA Form */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your work email"
                            className="w-full px-5 py-4 bg-white border-2 border-[#E5E7EB] rounded-xl text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1073E8] transition-colors"
                        />
                        <Link href="/pricing" className="btn-primary whitespace-nowrap w-full sm:w-auto py-4 px-8">
                            Start Free ✨
                        </Link>
                    </div>

                    <p className="text-[#9CA3AF] text-sm mt-4 mono">
                        Free forever plan available. No credit card required.
                    </p>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-12 border-t border-[#E5E7EB]">
                        <div className="flex items-center gap-2 text-[#6B7280]">
                            <svg className="w-5 h-5 text-[#10B981]" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm">SOC 2 Compliant</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#6B7280]">
                            <svg className="w-5 h-5 text-[#10B981]" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm">GDPR Ready</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#6B7280]">
                            <svg className="w-5 h-5 text-[#10B981]" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm">99.9% Uptime</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#6B7280]">
                            <svg className="w-5 h-5 text-[#10B981]" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm">Enterprise Ready</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
