import Link from 'next/link';
import Header from '@/components/Header';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <main className="container mx-auto px-6 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
                <div className="prose prose-slate max-w-none">
                    <p className="text-lg text-slate-600 mb-8">
                        Last updated: January 12, 2026
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
                        <p className="text-slate-700 mb-4">
                            Caprica ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Caprica.
                        </p>
                        <p className="text-slate-700">
                            This Privacy Policy applies to our website, and its associated subdomains (collectively, our "Service"). By accessing or using our Service, you signify that you have read, understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Information We Collect</h2>
                        <ul className="list-disc pl-6 text-slate-700 space-y-2">
                            <li><strong>Personal Identification Information:</strong> Name, email address, phone number, and military service details (MOS, Rank, Branch) when you register or use our translation tools.</li>
                            <li><strong>Usage Data:</strong> Information on how you interact with our website, such as pages visited, time spent, and click-through rates.</li>
                            <li><strong>Cookies and Tracking Technologies:</strong> We use cookies to enhance your experience and analyze site traffic.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Information</h2>
                        <ul className="list-disc pl-6 text-slate-700 space-y-2">
                            <li>To provide, operate, and maintain our website.</li>
                            <li>To improve, personalize, and expand our website.</li>
                            <li>To understand and analyze how you use our website.</li>
                            <li>To develop new products, services, features, and functionality.</li>
                            <li>To communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.</li>
                            <li>To find and prevent fraud.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Data Security</h2>
                        <p className="text-slate-700 mb-4">
                            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                        </p>
                        <p className="text-slate-700">
                            For users providing military-specific data, we adhere to strict data handling protocols compatible with standard commercial best practices, though this site is not currently accredited for classified information.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Third-Party Links</h2>
                        <p className="text-slate-700">
                            Our Service may contain links to other websites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Contact Us</h2>
                        <p className="text-slate-700">
                            If you have specific questions about this Privacy Policy, please contact us at privacy@caprica.com.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}
