import React from "react";

export const metadata = {
    title: "Cookie Policy - Ledger1CMS",
    description: "Ledger1CMS Cookie Policy.",
};

import MarketingLayout from "@/components/marketing/MarketingLayout";

export default function CookiesPage() {
    return (
        <MarketingLayout variant="blue">
            <main className="py-20 md:py-32">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/20 mb-6">
                            Cookie Policy
                        </h1>
                        <p className="text-slate-400 text-lg">
                            Last updated: December 14, 2025
                        </p>
                    </div>

                    <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
                        <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed">
                            <section className="mb-12">
                                <p className="lead text-xl text-slate-200">
                                    This Cookie Policy explains how Ledger1CMS (&quot;we&quot;, &quot;us&quot;, and &quot;our&quot;) uses cookies and similar technologies to recognize you when you visit our website at https://ledger1crm.com (&quot;Website&quot;). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
                                </p>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <span className="bg-blue-500/10 text-blue-400 p-2 rounded-lg mr-3 text-sm font-mono">01</span>
                                    What are cookies?
                                </h2>
                                <p>
                                    Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
                                </p>
                                <div className="bg-slate-800/50 p-6 rounded-xl border border-white/5 my-6">
                                    <p className="mb-0 text-sm">
                                        Cookies set by the website owner (in this case, Ledger1CMS) are called &quot;first-party cookies&quot;. Cookies set by parties other than the website owner are called &quot;third-party cookies&quot;. Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics).
                                    </p>
                                </div>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <span className="bg-blue-500/10 text-blue-400 p-2 rounded-lg mr-3 text-sm font-mono">02</span>
                                    Why do we use cookies?
                                </h2>
                                <p>We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as &quot;essential&quot; or &quot;strictly necessary&quot; cookies.</p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                                    <div className="bg-slate-800/50 p-6 rounded-xl border border-white/5">
                                        <h3 className="text-lg font-bold text-white mb-3 text-blue-200">Essential Cookies</h3>
                                        <p className="text-sm text-slate-400">Strictly necessary to provide you with services available through our Website and to use some of its features.</p>
                                    </div>

                                    <div className="bg-slate-800/50 p-6 rounded-xl border border-white/5">
                                        <h3 className="text-lg font-bold text-white mb-3 text-emerald-200">Analytics</h3>
                                        <p className="text-sm text-slate-400">Collect information used to help us understand how our Website is being used or how effective our marketing campaigns are.</p>
                                    </div>

                                    <div className="bg-slate-800/50 p-6 rounded-xl border border-white/5">
                                        <h3 className="text-lg font-bold text-white mb-3 text-purple-200">Advertising</h3>
                                        <p className="text-sm text-slate-400">Used to make advertising messages more relevant to you and prevent the same ad from continuously reappearing.</p>
                                    </div>
                                </div>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <span className="bg-blue-500/10 text-blue-400 p-2 rounded-lg mr-3 text-sm font-mono">03</span>
                                    How can I control cookies?
                                </h2>
                                <p>
                                    You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.
                                </p>
                                <p className="mt-4">
                                    You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
                                </p>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <span className="bg-blue-500/10 text-blue-400 p-2 rounded-lg mr-3 text-sm font-mono">04</span>
                                    Updates to this policy
                                </h2>
                                <p>
                                    We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <span className="bg-blue-500/10 text-blue-400 p-2 rounded-lg mr-3 text-sm font-mono">05</span>
                                    Contact Us
                                </h2>
                                <p>
                                    If you have any questions about our use of cookies or other technologies, please email us at <a href="mailto:privacy@ledger1crm.com" className="text-blue-400 hover:underline">privacy@ledger1crm.com</a>.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </MarketingLayout>
    );
}
