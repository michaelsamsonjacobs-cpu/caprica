"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#E5E7EB]">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#1073E8] to-[#7C3AED] rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">C</span>
                        </div>
                        <span className="text-xl font-bold text-[#111827]">Caprica</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/product" className="text-[#6B7280] hover:text-[#111827] transition-colors">
                            Product
                        </Link>
                        <Link href="/pricing" className="text-[#6B7280] hover:text-[#111827] transition-colors">
                            Pricing
                        </Link>
                        <Link href="/about" className="text-[#6B7280] hover:text-[#111827] transition-colors">
                            About
                        </Link>
                        <Link href="https://dev.springroll.ai/chat?recruiterId=bb0e9b29-5b16-46bd-88ff-da4b452ecdaa"
                            target="_blank"
                            className="text-[#6B7280] hover:text-[#111827] transition-colors">
                            Live Demo
                        </Link>
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/pricing" className="text-[#6B7280] hover:text-[#111827] font-medium transition-colors">
                            Log In
                        </Link>
                        <Link href="/pricing" className="btn-primary text-sm py-2.5 px-5">
                            Start Free ✨
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-[#111827]"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-[#E5E7EB]">
                        <div className="flex flex-col gap-4">
                            <Link href="/product" className="text-[#6B7280] hover:text-[#111827] transition-colors">
                                Product
                            </Link>
                            <Link href="/pricing" className="text-[#6B7280] hover:text-[#111827] transition-colors">
                                Pricing
                            </Link>
                            <Link href="/about" className="text-[#6B7280] hover:text-[#111827] transition-colors">
                                About
                            </Link>
                            <Link href="https://dev.springroll.ai/chat?recruiterId=bb0e9b29-5b16-46bd-88ff-da4b452ecdaa"
                                target="_blank"
                                className="text-[#6B7280] hover:text-[#111827] transition-colors">
                                Live Demo
                            </Link>
                            <div className="flex gap-4 pt-4">
                                <Link href="/pricing" className="btn-primary text-sm py-2.5 px-5">
                                    Start Free ✨
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
