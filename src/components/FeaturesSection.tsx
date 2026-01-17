export default function FeaturesSection() {
    const features = [
        {
            icon: "📄",
            title: "AI Resume Screening",
            description: "Screen 500+ resumes overnight with 95% parsing accuracy. AI scores and ranks candidates against your job requirements.",
            metric: "500 resumes in 12 min"
        },
        {
            icon: "🤖",
            title: "24/7 Candidate Chatbot",
            description: "Intelligent conversational AI engages candidates instantly. Answer questions, schedule interviews, and qualify leads.",
            metric: "3x response rate"
        },
        {
            icon: "📊",
            title: "Hiring Analytics",
            description: "Real-time dashboards show pipeline health, time-to-hire, and source effectiveness. Make data-driven decisions.",
            metric: "Instant insights"
        },
        {
            icon: "🔗",
            title: "ATS Integration",
            description: "Seamlessly connects with Workday, BambooHR, Greenhouse, and 20+ other systems. No workflow disruption.",
            metric: "20+ integrations"
        },
        {
            icon: "✨",
            title: "Smart Matching",
            description: "AI learns your hiring preferences over time. Get better candidate recommendations with every hire you make.",
            metric: "Learns over time"
        },
        {
            icon: "⚖️",
            title: "Bias Reduction",
            description: "Built-in fairness algorithms ensure consistent, unbiased screening. Regular audits and diverse training data.",
            metric: "Fair & consistent"
        }
    ];

    return (
        <section className="section-alt py-24">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <div className="pill mb-4 inline-flex">
                        <span className="sparkle">✨</span>
                        <span>AI-Powered Features</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-6">
                        Everything You Need to{" "}
                        <span className="gradient-text">Hire Smarter</span>
                    </h2>
                    <p className="text-xl text-[#6B7280]">
                        From first resume to final offer, Caprica automates the busywork so you can focus on finding great people.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="card group bg-white">
                            <div className="feature-icon text-2xl group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-[#111827] mb-3">{feature.title}</h3>
                            <p className="text-[#6B7280] mb-4 leading-relaxed">{feature.description}</p>
                            <div className="inline-flex items-center gap-2 text-sm">
                                <span className="w-2 h-2 bg-[#10B981] rounded-full" />
                                <span className="text-[#10B981] font-medium mono">{feature.metric}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
