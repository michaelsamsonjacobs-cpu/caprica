"use client";

import { useState } from "react";

export default function FAQSection() {
    const faqs = [
        {
            question: "How quickly can I get started?",
            answer: "You can create your first AI chatbot in under 5 minutes. Our intuitive builder requires no coding. Just describe your ideal candidate profile, upload job requirements, and your chatbot is ready to engage candidates. ✨"
        },
        {
            question: "Will this integrate with my existing ATS?",
            answer: "Yes! Caprica integrates with 20+ popular ATS platforms including Workday, BambooHR, Greenhouse, Lever, and more. We also offer API access for custom integrations."
        },
        {
            question: "How accurate is the AI resume screening?",
            answer: "Our AI achieves 95%+ parsing accuracy and continuously learns from your hiring decisions. It scores candidates based on skills match, experience relevance, and job-specific criteria you define."
        },
        {
            question: "Is my candidate data secure?",
            answer: "Absolutely. We're SOC 2 compliant, GDPR-ready, and use enterprise-grade encryption (TLS 1.3 in transit, AES-256 at rest). Your data is isolated and never shared between customers."
        },
        {
            question: "Can I try before I buy?",
            answer: "Yes! Our Free tier gives you 1 chatbot and 100 conversations per month forever. You can also try a live demo right now on our website. No credit card required. ✨"
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 section-alt">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <div className="pill mb-4 inline-flex">
                            <span>❓</span>
                            <span>FAQ</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-6">
                            Frequently Asked{" "}
                            <span className="gradient-text">Questions</span>
                        </h2>
                    </div>

                    {/* FAQ Accordion */}
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm"
                            >
                                <button
                                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#F9FAFB] transition-colors"
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                >
                                    <span className="text-lg font-medium text-[#111827] pr-4">{faq.question}</span>
                                    <svg
                                        className={`w-5 h-5 text-[#6B7280] transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {openIndex === index && (
                                    <div className="px-6 pb-5">
                                        <p className="text-[#6B7280] leading-relaxed">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
