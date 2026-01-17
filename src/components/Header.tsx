'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface HeaderProps {
    variant?: 'default' | 'minimal';
    backLink?: { href: string; label: string };
}

export default function Header({ variant = 'default', backLink }: HeaderProps) {
    const pathname = usePathname();

    const navLinks = [
        { href: '/veterans', label: 'For Veterans' },
        { href: '/veteran-skills', label: 'Skills Assessment' },
        { href: '/explore', label: 'Explore Military' },
        { href: '/jobs', label: 'Jobs' },
    ];

    const isActive = (href: string) => pathname === href;

    return (
        <header className="bg-header-metallic shadow-md border-b border-gray-300">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/caprica-logo.png"
                        alt="Caprica"
                        width={44}
                        height={44}
                        className="object-contain"
                        priority
                    />
                    <div>
                        <span className="text-xl font-bold text-brand-navy">Caprica</span>
                        <p className="text-xs text-gray-600 hidden sm:block">Military Career Platform</p>
                    </div>
                </Link>

                {/* Navigation */}
                {variant === 'default' && (
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`transition-colors ${isActive(link.href)
                                    ? 'text-brand-gold font-semibold'
                                    : 'text-brand-navy hover:text-brand-navy/80'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/signup"
                            className="px-5 py-2.5 bg-brand-navy text-white rounded-lg font-semibold hover:bg-brand-navy-dark transition-colors shadow-sm"
                        >
                            Get Started
                        </Link>
                    </div>
                )}

                {/* Minimal variant - just back link */}
                {variant === 'minimal' && backLink && (
                    <Link href={backLink.href} className="text-brand-navy hover:text-brand-navy/80 transition-colors">
                        ← {backLink.label}
                    </Link>
                )}
            </nav>
        </header>
    );
}
