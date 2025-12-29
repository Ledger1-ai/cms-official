import Link from "next/link";

export const metadata = {
    title: "Terms of Service - BasaltCMS",
    description: "BasaltCMS Terms of Service.",
};

import MarketingLayout from "@/components/marketing/MarketingLayout";

export default function TermsPage() {
    return (
        <MarketingLayout variant="blue">
            <main className="py-20 md:py-32">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/20 mb-6">
                            Terms of Service
                        </h1>
                        <p className="text-slate-400 text-lg">
                            Last updated: December 14, 2025
                        </p>
                    </div>

                    <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
                        <div className="prose prose-invert prose-lg max-w-none text-slate-300">
                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <span className="bg-blue-500/10 text-blue-400 p-2 rounded-lg mr-3 text-sm font-mono">01</span>
                                    Introduction
                                </h2>
                                <p>
                                    Welcome to BasaltCMS. By utilizing our platform, services, or accessing our content, you agree to be bound by these Terms of Service. These terms govern your use of the website and any services provided by BasaltCMS. If you do not agree with any part of these terms, you may not use our services.
                                </p>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <span className="bg-blue-500/10 text-blue-400 p-2 rounded-lg mr-3 text-sm font-mono">02</span>
                                    Usage License
                                </h2>
                                <p>
                                    Permission is granted to access and use BasaltCMS software and materials for your internal business purposes, subject to the plan limits you have subscribed to. This is the grant of a license, not a transfer of title.
                                </p>
                                <div className="bg-slate-800/50 p-6 rounded-xl border border-white/5 my-6">
                                    <h3 className="font-bold text-white mb-2">Under this license, you may not:</h3>
                                    <ul className="space-y-2 mb-0">
                                        <li className="flex items-start"><span className="text-red-400 mr-2">x</span> <span>Modify or copy the source code of the platform.</span></li>
                                        <li className="flex items-start"><span className="text-red-400 mr-2">x</span> <span>Use the materials for any commercial purpose acting as a reseller without explicit agreement.</span></li>
                                        <li className="flex items-start"><span className="text-red-400 mr-2">x</span> <span>Attempt to decompile or reverse engineer any software contained on BasaltCMS&apos;s website.</span></li>
                                        <li className="flex items-start"><span className="text-red-400 mr-2">x</span> <span>Remove any copyright or other proprietary notations from the materials.</span></li>
                                    </ul>
                                </div>
                                <p>
                                    This license shall automatically terminate if you violate any of these restrictions and may be terminated by BasaltCMS at any time.
                                </p>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <span className="bg-blue-500/10 text-blue-400 p-2 rounded-lg mr-3 text-sm font-mono">03</span>
                                    Account Terms
                                </h2>
                                <ul className="space-y-3">
                                    <li className="flex items-start"><span className="text-blue-400 mr-2">•</span> <span>You must provide your legal full name, a valid email address, and any other information requested in order to complete the signup process.</span></li>
                                    <li className="flex items-start"><span className="text-blue-400 mr-2">•</span> <span>You are responsible for maintaining the security of your account and password. BasaltCMS cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.</span></li>
                                    <li className="flex items-start"><span className="text-blue-400 mr-2">•</span> <span>You are responsible for all Content posted and activity that occurs under your account.</span></li>
                                </ul>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <span className="bg-blue-500/10 text-blue-400 p-2 rounded-lg mr-3 text-sm font-mono">04</span>
                                    Disclaimer
                                </h2>
                                <p>
                                    The materials and services on BasaltCMS&apos;s website are provided on an &apos;as is&apos; basis. BasaltCMS makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
                                </p>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <span className="bg-blue-500/10 text-blue-400 p-2 rounded-lg mr-3 text-sm font-mono">05</span>
                                    Limitations
                                </h2>
                                <p>
                                    In no event shall BasaltCMS or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on BasaltCMS&apos;s website.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <span className="bg-blue-500/10 text-blue-400 p-2 rounded-lg mr-3 text-sm font-mono">06</span>
                                    Contact Service
                                </h2>
                                <p>
                                    If you have any questions about these Terms, please contact us at <a href="mailto:support@basalthq.com" className="text-blue-400 hover:underline">support@basalthq.com</a>.
                                </p>
                            </section>
                        </div>

                        <div className="pt-8 border-t border-white/10 flex justify-center mt-8">
                            <Link href="/create-account" className="text-blue-400 font-bold hover:text-blue-300 transition-all flex items-center">
                                Ready to get started? Create an account <span className="ml-2">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </MarketingLayout>
    );
}
