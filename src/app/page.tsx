'use client';

import Link from 'next/link';
import Header from '@/components/Header';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <main className="bg-white">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-navy/10 border border-brand-navy/20 rounded-full text-sm text-brand-navy mb-8">
              <span className="w-2 h-2 bg-brand-gold rounded-full"></span>
              <span>The career platform for America's military community</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Your Service.
              <span className="block text-gold-gradient">
                Your Next Mission.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Whether you're looking for your next civilian role or identifying your optimal military path—
              we help you take the next step.
            </p>

            {/* Two Path CTAs */}
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
              {/* Veterans Path */}
              <Link
                href="/veterans"
                className="group bg-white border-2 border-gray-200 rounded-2xl p-8 text-left hover:border-brand-navy hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-4">🎖️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">I'm a Veteran</h3>
                <p className="text-gray-600 mb-4">
                  Translate your MOS to civilian careers. Find jobs that value your experience.
                </p>
                <div className="flex items-center gap-2 text-brand-gold font-semibold group-hover:gap-3 transition-all">
                  <span>Find Civilian Careers</span>
                  <span>→</span>
                </div>
              </Link>

              {/* Exploring Military Path */}
              <Link
                href="/explore"
                className="group bg-white border-2 border-gray-200 rounded-2xl p-8 text-left hover:border-brand-navy hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Explore Military</h3>
                <p className="text-gray-600 mb-4">
                  Find the right MOS for you. Prep for the ASVAB. Make an informed decision.
                </p>
                <div className="flex items-center gap-2 text-brand-gold font-semibold group-hover:gap-3 transition-all">
                  <span>Explore Careers</span>
                  <span>→</span>
                </div>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { value: '500+', label: 'Military Jobs' },
                { value: '150+', label: 'MOS Translations' },
                { value: 'Free', label: 'ASVAB Prep' },
                { value: '24/7', label: 'AI Assistant' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-brand-navy mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-gray-100 py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Built for the Military Community</h2>
            <p className="text-xl text-gray-600">Not just another job board. A career platform that understands your service.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: '🔄',
                title: 'MOS Translator',
                desc: 'Convert military experience to civilian job requirements. See what careers match your skills.',
                link: '/veterans',
              },
              {
                icon: '📝',
                title: 'ASVAB Prep',
                desc: 'Practice tests, score predictions, and study guides. Maximize your line scores.',
                link: '/assessment',
              },
              {
                icon: '🎯',
                title: 'Career Matching',
                desc: 'AI-powered matching to jobs that value military experience. Real opportunities.',
                link: '/jobs',
              },
              {
                icon: '📋',
                title: 'Resume Builder',
                desc: 'Translate military jargon to civilian language. AI-tailored for each application.',
                link: '/resume',
              },
              {
                icon: '🏛️',
                title: 'Benefits Navigator',
                desc: "GI Bill, VA loans, SkillBridge—understand what you've earned.",
                link: '/benefits',
              },
              {
                icon: '🤝',
                title: 'Veteran Employers',
                desc: 'Companies with real veteran hiring programs, not just marketing.',
                link: '/employers',
              },
            ].map((feature, i) => (
              <Link
                key={i}
                href={feature.link}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-brand-gold hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* For Employers Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-brand-navy rounded-3xl p-12 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Hiring Veterans?</h2>
            <p className="text-lg text-gray-300 mb-8">
              Access pre-screened candidates who bring leadership, discipline, and real-world experience.
              Most have security clearances. All have proven track records.
            </p>
            <Link
              href="/employers"
              className="inline-block px-8 py-4 bg-brand-gold text-gray-900 rounded-xl font-semibold hover:bg-brand-gold-light transition-colors"
            >
              Post Jobs for Veterans
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <blockquote className="text-3xl md:text-4xl font-light text-gray-900 max-w-4xl mx-auto leading-relaxed">
            "From your first mission to your next high-value career,
            <span className="text-brand-gold font-medium"> we're with you.</span>"
          </blockquote>
          <p className="mt-8 text-gray-600">
            Serving those who serve. That's our mission.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-navy py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-brand-gold rounded-lg flex items-center justify-center">
                <span className="text-brand-navy font-bold text-xl">C</span>
              </div>
              <div>
                <span className="text-xl font-bold text-white">Caprica</span>
                <p className="text-xs text-gray-400">Military Career Platform</p>
              </div>
            </div>

            <div className="flex gap-8 text-gray-300">
              <Link href="/veterans" className="hover:text-white">Veterans</Link>
              <Link href="/explore" className="hover:text-white">Explore</Link>
              <Link href="/employers" className="hover:text-white">Employers</Link>
              <Link href="/about" className="hover:text-white">About</Link>
              <Link href="/privacy" className="hover:text-white">Privacy</Link>
            </div>
          </div>

          <div className="text-center mt-8 text-gray-500 text-sm">
            © 2024 Caprica. Built for America's military community.
          </div>
        </div>
      </footer>
    </div>
  );
}
