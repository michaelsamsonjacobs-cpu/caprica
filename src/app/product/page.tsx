import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Product - Caprica AI",
    description: "AI-powered recruiting platform with resume screening, candidate chatbots, and hiring analytics.",
};

export default function ProductPage() {
    const capabilities = [
        {
            title: "AI Resume Screening ✨",
            description: "Our AI parses, scores, and ranks resumes against your job requirements with 95% accuracy. Screen thousands of applications in minutes.",
            features: ["Skill extraction", "Experience matching", "Custom scoring criteria", "Batch processing"],
            icon: "📄"
        },
        {
            title: "Conversational AI Chatbots",
            description: "Build custom recruitment chatbots that engage candidates 24/7. Qualify leads, answer questions, and schedule interviews automatically.",
            features: ["No-code builder", "Multi-language support", "Personality customization", "Lead qualification"],
            icon: "🤖"
        },
        {
            title: "Hiring Analytics",
            description: "Real-time dashboards show pipeline health, conversion rates, and bottlenecks. Make data-driven decisions to optimize your hiring funnel.",
            features: ["Funnel analytics", "Source tracking", "Time-to-hire metrics", "Team performance"],
            icon: "📊"
        },
        {
            title: "Workflow Automation ✨",
            description: "Automate repetitive recruiting tasks like follow-ups, interview scheduling, and candidate updates. Focus on high-value activities.",
            features: ["Email sequences", "Calendar integration", "Status updates", "Task triggers"],
            icon: "⚡"
        }
    ];

    const integrations = [
        { name: "Workday", category: "HRIS" },
        { name: "BambooHR", category: "HRIS" },
        { name: "Greenhouse", category: "ATS" },
        { name: "Lever", category: "ATS" },
        { name: "Salesforce", category: "CRM" },
        { name: "Slack", category: "Communication" },
        { name: "Microsoft Teams", category: "Communication" },
        { name: "Google Calendar", category: "Calendar" },
        { name: "Outlook", category: "Calendar" },
        { name: "Zapier", category: "Automation" },
        { name: "LinkedIn", category: "Sourcing" },
        { name: "Indeed", category: "Job Boards" },
    ];

    return (
        <div className="pt-24 pb-16 min-h-screen bg-white">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="pill mb-4 inline-flex">
                        <span className="sparkle">✨</span>
                        <span>Product</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-[#111827] mb-6">
                        The Complete{" "}
                        <span className="gradient-text">AI Recruiting</span>
                        {" "}Platform
                    </h1>
                    <p className="text-xl text-[#6B7280] mb-8">
                        From first resume to final offer, Caprica automates recruiting so you can focus on finding great people. ✨
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/pricing" className="btn-primary px-8 py-4">
                            Start Free ✨
                        </Link>
                        <Link
                            href="https://dev.springroll.ai/chat?recruiterId=bb0e9b29-5b16-46bd-88ff-da4b452ecdaa"
                            target="_blank"
                            className="btn-secondary px-8 py-4"
                        >
                            Try Live Demo
                        </Link>
                    </div>
                </div>

                {/* Capabilities */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <div className="pill mb-4 inline-flex">
                            <span>🚀</span>
                            <span>Capabilities</span>
                        </div>
                        <h2 className="text-3xl font-bold text-[#111827]">
                            Core Capabilities
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {capabilities.map((cap, index) => (
                            <div key={index} className="card bg-white">
                                <div className="flex items-start gap-4">
                                    <div className="feature-icon text-2xl shrink-0">
                                        {cap.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#111827] mb-3">{cap.title}</h3>
                                        <p className="text-[#6B7280] mb-4 leading-relaxed">{cap.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {cap.features.map((feature, featureIndex) => (
                                                <span
                                                    key={featureIndex}
                                                    className="bg-[#F9FAFB] border border-[#E5E7EB] px-3 py-1 rounded-full text-sm text-[#6B7280]"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Integrations */}
                <div className="mb-20" id="integrations">
                    <div className="text-center mb-12">
                        <div className="pill mb-4 inline-flex">
                            <span>🔗</span>
                            <span>Integrations</span>
                        </div>
                        <h2 className="text-3xl font-bold text-[#111827] mb-4">
                            Works With Your Stack
                        </h2>
                        <p className="text-[#6B7280] max-w-2xl mx-auto">
                            Connect Caprica with the tools you already use. No disruption to your existing workflow. ✨
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
                        {integrations.map((integration, index) => (
                            <div
                                key={index}
                                className="bg-white border border-[#E5E7EB] rounded-2xl p-4 text-center hover:border-[#1073E8] hover:shadow-lg transition-all"
                            >
                                <div className="text-[#111827] font-medium text-sm">{integration.name}</div>
                                <div className="text-[#9CA3AF] text-xs mt-1 mono">{integration.category}</div>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-[#9CA3AF] text-sm mt-8 mono">
                        + API access for custom integrations on Professional and Enterprise plans
                    </p>
                </div>

                {/* Security */}
                <div className="gradient-border p-8 md:p-12 max-w-4xl mx-auto bg-white">
                    <div className="pill mb-4 inline-flex">
                        <span>🔒</span>
                        <span>Security</span>
                    </div>
                    <h2 className="text-2xl font-bold text-[#111827] mb-6">
                        Enterprise-Grade Security ✨
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex items-start gap-3">
                            <span className="text-[#1073E8]">✓</span>
                            <div>
                                <div className="text-[#111827] font-medium">SOC 2 Type II Compliant</div>
                                <div className="text-[#6B7280] text-sm">Annual audits by independent third parties</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-[#1073E8]">✓</span>
                            <div>
                                <div className="text-[#111827] font-medium">GDPR Ready</div>
                                <div className="text-[#6B7280] text-sm">Full compliance with EU data protection</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-[#1073E8]">✓</span>
                            <div>
                                <div className="text-[#111827] font-medium">AES-256 Encryption</div>
                                <div className="text-[#6B7280] text-sm">Data encrypted at rest and in transit</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-[#1073E8]">✓</span>
                            <div>
                                <div className="text-[#111827] font-medium">SSO/SAML Support</div>
                                <div className="text-[#6B7280] text-sm">Enterprise single sign-on available</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
