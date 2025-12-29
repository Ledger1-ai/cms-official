import React from "react";

export const metadata = {
    title: "Privacy Policy - BasaltCMS",
    description: "BasaltCMS Privacy Policy.",
};

import MarketingLayout from "@/components/marketing/MarketingLayout";

export default function PrivacyPage() {
    return (
        <MarketingLayout variant="blue">
            <main className="py-20 md:py-32">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/20 mb-6">
                            Privacy Policy
                        </h1>
                        <p className="text-slate-400 text-lg">
                            Last updated: December 14, 2025
                        </p>
                    </div>

                    <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
                        <div className="prose prose-invert prose-lg max-w-none text-slate-300">
                            <p className="lead text-xl text-slate-200 mb-8">
                                At BasaltCMS (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our software, or engage with our services.
                            </p>

                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <span className="bg-blue-500/10 text-blue-400 p-2 rounded-lg mr-3 text-sm font-mono">01</span>
                                    Information We Collect
                                </h2>
                                <p>We collect information that you provide directly to us, as well as information collected automatically when you use our services.</p>

                                <h3 className="text-xl font-semibold text-white mt-6 mb-4">Information You Provide</h3>
                                <ul className="space-y-3 my-4">
                                    <li className="flex items-start"><span className="text-blue-400 mr-2">•</span> <span><strong>Account Information:</strong> Name, email address, password, company name, and phone number when you register.</span></li>
                                    <li className="flex items-start"><span className="text-blue-400 mr-2">•</span> <span><strong>Payment Information:</strong> Credit card details and billing address (processed by our secure payment provider, Stripe).</span></li>
                                    <li className="flex items-start"><span className="text-blue-400 mr-2">•</span> <span><strong>Customer Data:</strong> Data you input into the CRM, including lead details, contacts, and sales data. You retain full ownership of this data.</span></li>
                                    <li className="flex items-start"><span className="text-blue-400 mr-2">•</span> <span><strong>Support Communications:</strong> Information you provide when contacting our support team.</span></li>
                                </ul>

                                <h3 className="text-xl font-semibold text-white mt-6 mb-4">Information Collected Automatically</h3>
                                <ul className="space-y-3 my-4">
                                    <li className="flex items-start"><span className="text-blue-400 mr-2">•</span> <span><strong>Usage Data:</strong> Pages visited, features used, time spent, and clickstream data.</span></li>
                                    <li className="flex items-start"><span className="text-blue-400 mr-2">•</span> <span><strong>Device Data:</strong> IP address, browser type, operating system, and device identifiers.</span></li>
                                    <li className="flex items-start"><span className="text-blue-400 mr-2">•</span> <span><strong>Cookies:</strong> We use cookies to maintain your session and analyze usage patterns.</span></li>
                                </ul>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <span className="bg-blue-500/10 text-blue-400 p-2 rounded-lg mr-3 text-sm font-mono">02</span>
                                    How We Use Your Information
                                </h2>
                                <p>We use the collected information for the following purposes:</p>
                                <ul className="space-y-3 my-4">
                                    <li className="flex items-start"><span className="text-blue-400 mr-2">•</span> <span>To provide, operate, and maintain our services.</span></li>
                                    <li className="flex items-start"><span className="text-blue-400 mr-2">•</span> <span>To process transactions and manage your account.</span></li>
                                    <li className="flex items-start"><span className="text-blue-400 mr-2">•</span> <span>To improve, personalize, and expand our services.</span></li>
                                    <li className="flex items-start"><span className="text-blue-400 mr-2">•</span> <span>To communicate with you, including for customer service, updates, and marketing (you can opt-out of marketing).</span></li>
                                    <li className="flex items-start"><span className="text-blue-400 mr-2">•</span> <span>To detect and prevent fraud and abuse.</span></li>
                                    <li className="flex items-start"><span className="text-blue-400 mr-2">•</span> <span>To comply with legal obligations.</span></li>
                                </ul>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <span className="bg-blue-500/10 text-blue-400 p-2 rounded-lg mr-3 text-sm font-mono">03</span>
                                    Data Sharing and Disclosure
                                </h2>
                                <p>We do not sell your personal data. We may share your information in the following circumstances:</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                    <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                                        <strong className="text-white block mb-2">Service Providers</strong>
                                        <p className="text-sm">With third-party vendors who perform services on our behalf (e.g., hosting, payment processing).</p>
                                    </div>
                                    <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                                        <strong className="text-white block mb-2">Legal Requirements</strong>
                                        <p className="text-sm">If required to do so by law or in response to valid requests by public authorities.</p>
                                    </div>
                                    <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                                        <strong className="text-white block mb-2">Business Transfers</strong>
                                        <p className="text-sm">In connection with a merger, sale of assets, or acquisition.</p>
                                    </div>
                                    <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                                        <strong className="text-white block mb-2">With Your Consent</strong>
                                        <p className="text-sm">We may share information with your consent or at your direction.</p>
                                    </div>
                                </div>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <span className="bg-blue-500/10 text-blue-400 p-2 rounded-lg mr-3 text-sm font-mono">04</span>
                                    Data Security
                                </h2>
                                <p>
                                    We implement robust security measures to protect your data, including AES-256 encryption at rest and TLS 1.3 in transit.
                                    However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                                </p>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <span className="bg-blue-500/10 text-blue-400 p-2 rounded-lg mr-3 text-sm font-mono">05</span>
                                    Your Data Rights
                                </h2>
                                <p>Depending on your location, you may have the following rights:</p>
                                <ul className="space-y-3 my-4">
                                    <li className="flex items-start"><span className="text-blue-400 mr-2">•</span> <span><strong>Access:</strong> Request a copy of the personal data we hold about you.</span></li>
                                    <li className="flex items-start"><span className="text-blue-400 mr-2">•</span> <span><strong>Correction:</strong> Request correction of inaccurate data.</span></li>
                                    <li className="flex items-start"><span className="text-blue-400 mr-2">•</span> <span><strong>Deletion:</strong> Request deletion of your personal data (&quot;Right to be Forgotten&quot;).</span></li>
                                    <li className="flex items-start"><span className="text-blue-400 mr-2">•</span> <span><strong>Portability:</strong> Request transfer of your data to another service.</span></li>
                                </ul>
                                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                                    <p className="text-blue-200">To exercise these rights, please contact us at <a href="mailto:privacy@basalthq.com" className="text-white font-semibold hover:underline">privacy@basalthq.com</a>.</p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <span className="bg-blue-500/10 text-blue-400 p-2 rounded-lg mr-3 text-sm font-mono">06</span>
                                    Contact Us
                                </h2>
                                <p>
                                    If you have any questions about this Privacy Policy, please contact us at:
                                </p>
                                <div className="mt-4 p-6 bg-slate-800/50 rounded-2xl border border-white/5">
                                    <p className="mb-2">
                                        <strong>Email:</strong> <a href="mailto:privacy@basalthq.com" className="text-blue-400 hover:underline">privacy@basalthq.com</a>
                                    </p>
                                    <p>
                                        <strong>Address:</strong> 123 AI Boulevard, San Francisco, CA 94105, USA
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </MarketingLayout>
    );
}
