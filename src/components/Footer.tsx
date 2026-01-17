import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#F9FAFB] border-t border-[#E5E7EB] py-16">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#1073E8] to-[#7C3AED] rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">C</span>
                            </div>
                            <span className="text-xl font-bold text-[#111827]">Caprica</span>
                        </Link>
                        <p className="text-[#6B7280] text-sm leading-relaxed">
                            The AI coworker who never calls in sick. ✨ Transforming recruiting with intelligent automation.
                        </p>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="text-[#111827] font-semibold mb-4">Product</h4>
                        <ul className="space-y-3">
                            <li><Link href="/product" className="text-[#6B7280] hover:text-[#1073E8] text-sm transition-colors">Features</Link></li>
                            <li><Link href="/pricing" className="text-[#6B7280] hover:text-[#1073E8] text-sm transition-colors">Pricing</Link></li>
                            <li><Link href="https://dev.springroll.ai/chat?recruiterId=bb0e9b29-5b16-46bd-88ff-da4b452ecdaa" target="_blank" className="text-[#6B7280] hover:text-[#1073E8] text-sm transition-colors">Live Demo</Link></li>
                            <li><Link href="/product#integrations" className="text-[#6B7280] hover:text-[#1073E8] text-sm transition-colors">Integrations</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-[#111827] font-semibold mb-4">Company</h4>
                        <ul className="space-y-3">
                            <li><Link href="/about" className="text-[#6B7280] hover:text-[#1073E8] text-sm transition-colors">About Us</Link></li>
                            <li><Link href="https://calendly.com/mike-springroll/30min" target="_blank" className="text-[#6B7280] hover:text-[#1073E8] text-sm transition-colors">Contact</Link></li>
                            <li><Link href="#" className="text-[#6B7280] hover:text-[#1073E8] text-sm transition-colors">Careers</Link></li>
                            <li><Link href="#" className="text-[#6B7280] hover:text-[#1073E8] text-sm transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-[#111827] font-semibold mb-4">Legal</h4>
                        <ul className="space-y-3">
                            <li><Link href="https://springroll.ai/privacy-policy/" target="_blank" className="text-[#6B7280] hover:text-[#1073E8] text-sm transition-colors">Privacy Policy</Link></li>
                            <li><Link href="https://springroll.ai/terms-of-use/" target="_blank" className="text-[#6B7280] hover:text-[#1073E8] text-sm transition-colors">Terms of Use</Link></li>
                            <li><Link href="#" className="text-[#6B7280] hover:text-[#1073E8] text-sm transition-colors">Security</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-[#E5E7EB] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[#9CA3AF] text-sm">
                        © 2025 Springroll AI. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <span className="text-[#9CA3AF] text-sm">SOC 2 Compliant</span>
                        <span className="text-[#9CA3AF]">•</span>
                        <span className="text-[#9CA3AF] text-sm">GDPR Ready</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
