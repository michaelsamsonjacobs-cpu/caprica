import Link from "next/link";

export default function PricingPreview() {
    const tiers = [
        {
            name: "Free",
            price: "$0",
            period: "forever",
            description: "Try Caprica with no commitment",
            features: [
                "1 recruitment chatbot",
                "100 conversations/month",
                "Basic analytics",
                "Email support"
            ],
            cta: "Start Free",
            highlighted: false
        },
        {
            name: "Growth",
            price: "$149",
            period: "per month",
            description: "For growing teams",
            features: [
                "3 recruitment chatbots",
                "1,000 conversations/month",
                "ATS integrations",
                "Resume screening AI",
                "Priority support"
            ],
            cta: "Start Free Trial",
            highlighted: true
        },
        {
            name: "Professional",
            price: "$499",
            period: "per month",
            description: "For scaling organizations",
            features: [
                "Unlimited chatbots",
                "5,000 conversations/month",
                "Advanced analytics",
                "Custom workflows",
                "API access",
                "Dedicated CSM"
            ],
            cta: "Start Free Trial",
            highlighted: false
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="pill mb-4 inline-flex">
                        <span>💰</span>
                        <span>Pricing</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-6">
                        Simple, Transparent{" "}
                        <span className="gradient-text">Pricing</span>
                    </h2>
                    <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
                        Start free. Upgrade when you're ready. No credit card required. ✨
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {tiers.map((tier, index) => (
                        <div
                            key={index}
                            className={`rounded-2xl p-8 transition-all ${tier.highlighted
                                    ? 'bg-gradient-to-b from-[#1073E8]/5 to-[#7C3AED]/5 border-2 border-[#1073E8] relative shadow-xl'
                                    : 'bg-white border border-[#E5E7EB] shadow-sm hover:shadow-lg'
                                }`}
                        >
                            {tier.highlighted && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#1073E8] to-[#7C3AED] text-white text-sm font-medium px-4 py-1 rounded-full">
                                    Most Popular ✨
                                </div>
                            )}
                            <h3 className="text-xl font-semibold text-[#111827] mb-2">{tier.name}</h3>
                            <p className="text-[#6B7280] text-sm mb-4">{tier.description}</p>
                            <div className="mb-6">
                                <span className="text-4xl font-bold text-[#111827]">{tier.price}</span>
                                <span className="text-[#6B7280] ml-2 mono text-sm">/{tier.period}</span>
                            </div>
                            <ul className="space-y-3 mb-8">
                                {tier.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center gap-3">
                                        <span className="text-[#1073E8]">✓</span>
                                        <span className="text-[#6B7280]">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="/pricing"
                                className={`block text-center py-3 px-6 rounded-xl font-medium transition-all ${tier.highlighted || tier.name === "Free"
                                        ? 'btn-primary w-full'
                                        : 'btn-secondary w-full'
                                    }`}
                            >
                                {tier.cta}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Enterprise CTA */}
                <div className="text-center mt-12">
                    <p className="text-[#6B7280] mb-4">
                        Need more? Enterprise plans include unlimited everything, SSO, SLA, and dedicated support.
                    </p>
                    <Link href="https://calendly.com/mike-springroll/30min" target="_blank" className="text-[#1073E8] hover:text-[#7C3AED] font-medium">
                        Contact Sales →
                    </Link>
                </div>
            </div>
        </section>
    );
}
