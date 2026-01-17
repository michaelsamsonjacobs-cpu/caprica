import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pricing - Caprica AI",
    description: "Simple, transparent pricing. Start free, upgrade when ready. No credit card required.",
};

export default function PricingPage() {
    const tiers = [
        {
            name: "Free",
            price: "$0",
            period: "forever",
            description: "Try Caprica with no commitment",
            features: [
                "1 recruitment chatbot",
                "100 conversations/month",
                "Basic candidate analytics",
                "Email support",
                "Community access"
            ],
            notIncluded: [
                "Resume screening AI",
                "ATS integrations",
                "Custom branding"
            ],
            cta: "Get Started Free ✨",
            highlighted: false
        },
        {
            name: "Growth",
            price: "$149",
            period: "per month",
            description: "For growing recruiting teams",
            features: [
                "3 recruitment chatbots",
                "1,000 conversations/month",
                "Resume screening AI",
                "ATS integrations (5+)",
                "Advanced analytics",
                "Priority email support",
                "Custom branding"
            ],
            notIncluded: [
                "API access",
                "SSO/SAML"
            ],
            cta: "Start 14-Day Free Trial",
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
                "Everything in Growth",
                "API access",
                "Workflow automation",
                "Team collaboration",
                "Phone support",
                "Dedicated CSM"
            ],
            notIncluded: [],
            cta: "Start 14-Day Free Trial",
            highlighted: false
        },
        {
            name: "Enterprise",
            price: "Custom",
            period: "contact us",
            description: "For large organizations",
            features: [
                "Unlimited everything",
                "SSO/SAML authentication",
                "Custom SLA (99.9%+)",
                "Dedicated infrastructure",
                "Custom integrations",
                "On-premise option",
                "24/7 priority support",
                "Executive sponsor"
            ],
            notIncluded: [],
            cta: "Contact Sales",
            highlighted: false,
            isEnterprise: true
        }
    ];

    return (
        <div className="pt-24 pb-16 min-h-screen bg-white">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="pill mb-4 inline-flex">
                        <span>💰</span>
                        <span>Pricing</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-[#111827] mb-6">
                        Simple, Transparent{" "}
                        <span className="gradient-text">Pricing</span>
                    </h1>
                    <p className="text-xl text-[#6B7280]">
                        Start free. Upgrade when you're ready. All plans include a 14-day free trial. ✨
                    </p>
                </div>

                {/* Pricing Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20">
                    {tiers.map((tier, index) => (
                        <div
                            key={index}
                            className={`rounded-2xl p-6 flex flex-col transition-all ${tier.highlighted
                                    ? 'bg-gradient-to-b from-[#1073E8]/5 to-[#7C3AED]/5 border-2 border-[#1073E8] relative shadow-xl'
                                    : 'bg-white border border-[#E5E7EB] shadow-sm hover:shadow-lg'
                                }`}
                        >
                            {tier.highlighted && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#1073E8] to-[#7C3AED] text-white text-xs font-medium px-3 py-1 rounded-full">
                                    Most Popular ✨
                                </div>
                            )}
                            <h3 className="text-xl font-semibold text-[#111827] mb-1">{tier.name}</h3>
                            <p className="text-[#6B7280] text-sm mb-4">{tier.description}</p>
                            <div className="mb-6">
                                <span className="text-3xl font-bold text-[#111827]">{tier.price}</span>
                                <span className="text-[#6B7280] ml-1 text-sm mono">/{tier.period}</span>
                            </div>
                            <ul className="space-y-2 mb-6 flex-grow">
                                {tier.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-start gap-2">
                                        <span className="text-[#1073E8] text-sm mt-0.5">✓</span>
                                        <span className="text-[#6B7280] text-sm">{feature}</span>
                                    </li>
                                ))}
                                {tier.notIncluded.map((feature, featureIndex) => (
                                    <li key={`not-${featureIndex}`} className="flex items-start gap-2 opacity-50">
                                        <span className="text-[#9CA3AF] text-sm mt-0.5">–</span>
                                        <span className="text-[#9CA3AF] text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href={tier.isEnterprise ? "https://calendly.com/mike-springroll/30min" : "#"}
                                target={tier.isEnterprise ? "_blank" : undefined}
                                className={`block text-center py-3 px-4 rounded-xl font-medium text-sm transition-all ${tier.highlighted || tier.name === "Free"
                                        ? 'btn-primary'
                                        : 'btn-secondary'
                                    }`}
                            >
                                {tier.cta}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* ROI Calculator */}
                <div className="max-w-4xl mx-auto gradient-border p-8 md:p-12 mb-20 bg-white">
                    <div className="pill mb-4 inline-flex">
                        <span>📊</span>
                        <span>ROI Calculator</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-8">
                        Calculate Your Savings ✨
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="p-6 bg-[#F9FAFB] rounded-2xl">
                            <div className="text-4xl font-bold gradient-text mb-2">$2,400</div>
                            <div className="text-[#6B7280] mono text-sm">Average savings per hire</div>
                        </div>
                        <div className="p-6 bg-[#F9FAFB] rounded-2xl">
                            <div className="text-4xl font-bold gradient-text mb-2">40%</div>
                            <div className="text-[#6B7280] mono text-sm">Faster time-to-hire</div>
                        </div>
                        <div className="p-6 bg-[#F9FAFB] rounded-2xl">
                            <div className="text-4xl font-bold gradient-text mb-2">23 hrs/wk</div>
                            <div className="text-[#6B7280] mono text-sm">Time saved on screening</div>
                        </div>
                    </div>
                    <p className="text-center text-[#9CA3AF] text-sm mt-8 mono">
                        Based on average enterprise customer results. Individual results may vary.
                    </p>
                </div>

                {/* FAQ */}
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-[#111827] mb-8 text-center">Pricing FAQ</h2>
                    <div className="space-y-4">
                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-6">
                            <h3 className="text-[#111827] font-medium mb-2">Can I switch plans anytime?</h3>
                            <p className="text-[#6B7280] text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.</p>
                        </div>
                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-6">
                            <h3 className="text-[#111827] font-medium mb-2">What counts as a "conversation"?</h3>
                            <p className="text-[#6B7280] text-sm">A conversation is a complete chat session with a candidate, from first message to session end. Follow-up messages in the same session are included.</p>
                        </div>
                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-6">
                            <h3 className="text-[#111827] font-medium mb-2">Do you offer discounts for annual billing?</h3>
                            <p className="text-[#6B7280] text-sm">Yes! Annual billing saves you 20% compared to monthly. Contact us for details. ✨</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
