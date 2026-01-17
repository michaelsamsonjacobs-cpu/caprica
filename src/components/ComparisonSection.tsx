export default function ComparisonSection() {
    const comparison = [
        {
            without: "Manual resume screening takes 23 hours/week",
            with: "AI screens 500 resumes in 12 minutes"
        },
        {
            without: "Inconsistent candidate experience",
            with: "24/7 instant engagement via chatbot"
        },
        {
            without: "12+ days average time-to-hire",
            with: "7 days with automated workflows"
        },
        {
            without: "$4,700 average cost-per-hire",
            with: "$2,300 with Caprica automation"
        },
        {
            without: "Top candidates ghost due to slow response",
            with: "3x higher response rate with instant AI replies"
        },
        {
            without: "Bias risk in manual screening",
            with: "Consistent, fair evaluation for every candidate"
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <div className="pill mb-4 inline-flex">
                        <span>📊</span>
                        <span>Compare Results</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-6">
                        Before & After{" "}
                        <span className="gradient-text">Caprica</span>
                    </h2>
                    <p className="text-xl text-[#6B7280]">
                        See how AI transforms your recruiting workflow ✨
                    </p>
                </div>

                {/* Comparison Grid */}
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-lg">
                        {/* Headers */}
                        <div className="bg-[#F9FAFB] p-6 border-b border-r border-[#E5E7EB]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                    <span className="text-red-500">✕</span>
                                </div>
                                <span className="text-lg font-semibold text-[#6B7280]">Without AI</span>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-[#1073E8]/5 to-[#7C3AED]/5 p-6 border-b border-[#E5E7EB]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1073E8] to-[#7C3AED] flex items-center justify-center">
                                    <span className="text-white">✓</span>
                                </div>
                                <span className="text-lg font-semibold text-[#111827]">With Caprica AI ✨</span>
                            </div>
                        </div>

                        {/* Rows */}
                        {comparison.map((item, index) => (
                            <>
                                <div
                                    key={`without-${index}`}
                                    className={`p-6 border-r border-[#E5E7EB] bg-white ${index < comparison.length - 1 ? 'border-b' : ''}`}
                                >
                                    <p className="text-[#6B7280]">{item.without}</p>
                                </div>
                                <div
                                    key={`with-${index}`}
                                    className={`p-6 bg-gradient-to-r from-[#1073E8]/5 to-[#7C3AED]/5 ${index < comparison.length - 1 ? 'border-b border-[#E5E7EB]' : ''}`}
                                >
                                    <p className="text-[#111827] font-medium">{item.with}</p>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
