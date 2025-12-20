import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Shield, LineChart, Zap, Clock, Target, TrendingUp, Globe, Lock, Workflow, BarChart3, Database, Wrench, PlugZap, DollarSign, Bot, CheckCircle2, FileText } from "lucide-react";
import CmsWorkflowVisual from "@/components/visuals/CmsWorkflowVisual";
import AiCapabilitiesVisual from "@/components/visuals/AiCapabilitiesVisual";
import competitors from "@/data/competitors.json";
import MarketingHeader from "@/app/[locale]/components/MarketingHeader";
import MarketingFooter from "@/app/[locale]/components/MarketingFooter";
import AgentInterface from "@/app/[locale]/components/AgentInterface";
import AnalyticsGraph from "@/app/[locale]/components/AnalyticsGraph";

type Props = {
    params: Promise<{ competitor: string; locale: string }>;
};

function getBaseUrl(): string {
    const envUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!envUrl) {
        return "https://crm.ledger1.ai";
    }
    // Ensure URL has protocol
    if (!envUrl.startsWith("http://") && !envUrl.startsWith("https://")) {
        return `https://${envUrl}`;
    }
    return envUrl;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const competitor = competitors.find((c) => c.slug === params.competitor);
    if (!competitor) return {};

    const title = `Ledger1CMS vs ${competitor.name} | The Best Alternative`;
    const description = `Compare Ledger1CMS vs ${competitor.name}. See why businesses are switching for better AI features, lower costs, and superior support.`;
    const baseUrl = getBaseUrl();

    let ogImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(`Ledger1CMS vs ${competitor.name}`)}&description=${encodeURIComponent("The Smarter, AI-Native Alternative")}&type=competitor&badge=${encodeURIComponent("Better Alternative")}`;

    return {
        title,
        description,
        keywords: [`${competitor.name} alternative`, "AI CMS", "CMS comparison", competitor.name],
        openGraph: {
            title,
            description,
            type: "website",
            url: `${baseUrl}/compare/${params.competitor}`,
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: `Ledger1CMS vs ${competitor.name}`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImageUrl],
        },
    };
}

export async function generateStaticParams() {
    return competitors.map((c) => ({
        competitor: c.slug,
    }));
}

const STATIC = {
    parityMatrix: [
        { feature: "Predictive Content AI", ours: "Included", theirs: "Often add-on / limited" },
        { feature: "Autonomous Layout Agents", ours: "Included", theirs: "Manual only" },
        { feature: "Open API & Webhooks", ours: "Open & documented", theirs: "Limited / proprietary" },
        { feature: "Edge-Native Delivery", ours: "Global Edge Network", theirs: "Origin server / slow" },
        { feature: "Pricing Model", ours: "Flat rate per org", theirs: "Per-seat / bandwidth tiers" },
        { feature: "Headless Freedom", ours: "React/Next.js Native", theirs: "Template locked" }
    ],
    faqs: [
        { q: "How long does migration take?", a: "Most teams complete their migration in 1-2 weeks. Our migration specialists handle the heavy lifting—exporting your data, mapping fields, and ensuring nothing gets lost in translation. You'll run both systems in parallel until you're confident everything works perfectly." },
        { q: "Do you offer self-hosting?", a: "Ledger1CMS is a cloud-native SaaS platform. This means you get automatic updates, enterprise-grade security, and 99.9% uptime without managing infrastructure. For organizations with specific compliance requirements, we offer dedicated region hosting." },
        { q: "Is there an API?", a: "Absolutely. Our REST API and Webhooks let you connect Ledger1CMS to virtually any system in your stack. Every integration uses scoped tokens with configurable rate limits, giving you security without sacrificing flexibility." },
        { q: "How does AI train on our data?", a: "Your data stays yours. Our AI learns from your organization's patterns and signals, but we never mix data across tenants. Each AI agent adapts specifically to your business, improving over time based on your unique workflows and customer interactions." }
    ]
};

export default async function CompetitorPage(props: Props) {
    const params = await props.params;

    // Enable static rendering
    setRequestLocale(params.locale);

    const competitor = competitors.find((c) => c.slug === params.competitor);

    if (!competitor) {
        notFound();
    }

    const primaryCta = { label: "Switch Now", url: "https://calendar.google.com/appointments/schedules/AcZssZ2Vduqr0QBnEAM50SeixE8a7kXuKt62zEFjQCQ8_xvoO6iF3hluVQHpaM6RYWMGB110_zM3MUF0" };

    return (
        <div className="min-h-screen bg-[#0F0F1A] text-white font-sans selection:bg-primary/30">
            <MarketingHeader />

            {/* Hero */}
            <section className="relative w-full py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                <div className="container px-4 md:px-6 relative z-10 text-center">
                    <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm mb-6">
                        <span>Better than {competitor.name}</span>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-6">
                        {competitor.comparison_title}
                    </h1>
                    <p className="mx-auto max-w-[800px] text-gray-400 md:text-xl leading-relaxed mb-8">
                        {competitor.comparison_text}
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href={primaryCta.url} target="_blank">
                            <Button size="lg" className="rounded-full bg-white text-slate-950 font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-purple-600 hover:to-green-500 hover:text-white hover:shadow-[0_0_50px_rgba(168,85,247,0.6)]">
                                {primaryCta.label} <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Dashboard Visual - AI Agents & CMS Workflow */}
            <section className="py-10 pb-20">
                <div className="container px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        <div className="relative h-[450px] w-full rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(6,182,212,0.15)] border border-white/10 bg-black/50 backdrop-blur-xl">
                            <AiCapabilitiesVisual />
                        </div>
                        <div className="relative h-[450px] w-full rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(16,185,129,0.15)] border border-white/10 bg-black/50 backdrop-blur-xl">
                            <CmsWorkflowVisual />
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Parity Matrix */}
            <section className="py-20 bg-black/20 border-y border-white/5">
                <div className="container px-4 md:px-6 max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">How We Stack Up</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            We&apos;ve done the research so you don&apos;t have to. Here&apos;s an honest look at where Ledger1CMS excels compared to {competitor.name}.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#0A0A12]">
                        <div className="grid grid-cols-3 p-6 border-b border-white/10 bg-white/5">
                            <div className="font-bold text-lg text-white">Feature</div>
                            <div className="font-bold text-lg text-center text-primary">Ledger1CMS</div>
                            <div className="font-bold text-lg text-center text-gray-400">{competitor.name}</div>
                        </div>
                        {STATIC.parityMatrix.map((row, idx) => (
                            <div key={idx} className={"grid grid-cols-3 p-6 border-b border-white/10 items-center hover:bg-white/5 transition-colors"}>
                                <div className="text-gray-300">{row.feature}</div>
                                <div className="text-center flex justify-center items-center gap-2">
                                    <CheckCircle2 className="text-green-500" />
                                    <span className="text-green-400 font-medium">{row.ours}</span>
                                </div>
                                <div className="text-center text-gray-500">{row.theirs}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Teams Switch */}
            <section className="py-20">
                <div className="container px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Why Teams Make the Switch</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Every week, we help teams migrate from {competitor.name}. Here are the three reasons they tell us most often.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Headless Freedom */}
                        <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                                <Bot className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">True Visual Headless</h3>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                Marketing teams often hate headless CMSs because they lose visual control. Ledger1CMS gives them a full visual page builder while developers keep 100% code control.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                                    <span className="text-gray-300">Visual builder for Next.js & React</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                                    <span className="text-gray-300">Clean JSON output, no HTML overlap</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                                    <span className="text-gray-300">Real-time collaboration</span>
                                </div>
                            </div>
                        </div>

                        {/* Flat Pricing */}
                        <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                                <DollarSign className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">No Bandwidth Penalties</h3>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                Tired of being punished for traffic spikes? We don&apos;t charge for API calls or bandwidth on our Standard plan. Scale to millions of views without fear.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                                    <span className="text-gray-300">Unlimited API requests</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                                    <span className="text-gray-300">Unlimited user seats</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                                    <span className="text-gray-300">Transparent flat-rate billing</span>
                                </div>
                            </div>
                        </div>

                        {/* Modern Tech Stack */}
                        <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                                <Zap className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Built for Next.js</h3>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                Legacy CMSs struggle with modern frameworks. Ledger1CMS is native to the React ecosystem, offering Server Layouts, ISR, and localized routing out of the box.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                                    <span className="text-gray-300">Next.js App Router support</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                                    <span className="text-gray-300">TypeScript typed content SDK</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                                    <span className="text-gray-300">Zero-config Vercel deployment</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Migration Experience */}
            <section className="py-20 bg-white/5">
                <div className="container px-4 md:px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Wrench className="w-6 h-6 text-primary" />
                                    <span className="text-primary font-medium">Migration Made Simple</span>
                                </div>
                                <h2 className="text-3xl font-bold mb-6">
                                    Switch Without the Stress
                                </h2>
                                <p className="text-gray-400 leading-relaxed mb-6">
                                    We know migration is the biggest barrier to switching CMS platforms. That&apos;s why we&apos;ve invested heavily in making it painless. Our team handles the technical heavy lifting while you keep running your business.
                                </p>
                                <p className="text-gray-400 leading-relaxed">
                                    Most teams complete their migration in under two weeks, including data transfer, component mapping, and team training. You&apos;ll run both systems in parallel until you&apos;re 100% confident in the switch.
                                </p>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { step: 1, title: "Discovery Call", desc: "We map your current setup—pipelines, automations, and integrations—so nothing gets missed." },
                                    { step: 2, title: "Data Migration", desc: "Export from your current CMS, normalize the content model, and import with field-level mapping." },
                                    { step: 3, title: "Workflow Setup", desc: "Recreate your pipelines and automation triggers, often improving them in the process." },
                                    { step: 4, title: "Integration & Training", desc: "Connect your email, calendar, and tools. Train your team on the new system." },
                                    { step: 5, title: "Parallel Run", desc: "Use both systems side-by-side until you're confident everything works." },
                                    { step: 6, title: "Go Live", desc: "Cut over to Ledger1CMS and decommission your old system." },
                                ].map((item) => (
                                    <div key={item.step} className="flex gap-4 p-4 rounded-xl border border-white/10 bg-[#0F0F1A] hover:border-primary/30 transition-colors">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                                            {item.step}
                                        </span>
                                        <div>
                                            <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                                            <p className="text-sm text-gray-400">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Integrations */}
            <section className="py-20">
                <div className="container px-4 md:px-6">
                    <div className="text-center mb-12">
                        <div className="flex items-center gap-2 justify-center mb-4">
                            <PlugZap className="w-6 h-6 text-primary" />
                            <span className="text-primary font-medium">Integrations</span>
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Works With Your Stack</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Your CMS should connect to the tools you already use—not force you to change everything.
                            Ledger1CMS integrates with the platforms your team relies on every day.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
                        {[
                            { title: "Deployment", items: ["Vercel", "Netlify", "AWS Amplify", "Docker"], icon: <Globe className="h-6 w-6" /> },
                            { title: "Commerce", items: ["Shopify", "BigCommerce", "Stripe", "Medusa"], icon: <DollarSign className="h-6 w-6" /> },
                            { title: "Search", items: ["Algolia", "Elasticsearch", "Typesense", "Meilisearch"], icon: <Database className="h-6 w-6" /> },
                            { title: "Analytics", items: ["Google Analytics 4", "PostHog", "Segment", "Mixpanel"], icon: <BarChart3 className="h-6 w-6" /> },
                            { title: "DAM & Media", items: ["Cloudinary", "Mux", "Unsplash", "Shutterstock"], icon: <FileText className="h-6 w-6" /> },
                        ].map((category) => (
                            <div key={category.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-primary/30 transition-colors">
                                <div className="mb-3 text-primary">{category.icon}</div>
                                <h3 className="font-semibold mb-4 text-primary">{category.title}</h3>
                                <ul className="space-y-2">
                                    {category.items.map((item) => (
                                        <li key={item} className="text-sm text-gray-400">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Security & Compliance */}
            <section className="py-20 bg-white/5">
                <div className="container px-4 md:px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">Enterprise-Grade Security</h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">
                                Your customer data is your most valuable asset. We protect it with the same rigor as the world&apos;s largest enterprises.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="rounded-2xl border border-white/10 bg-[#0F0F1A] p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Globe className="w-5 h-5 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold">Global Compliance</h3>
                                </div>
                                <p className="text-gray-400 mb-6">
                                    Whether you&apos;re serving customers in Europe, North America, or Asia-Pacific, Ledger1CMS helps you stay compliant with local data protection regulations.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {["GDPR", "CCPA", "PIPEDA", "LGPD", "PDPA", "POPIA"].map((cert) => (
                                        <span key={cert} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
                                            {cert}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-[#0F0F1A] p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Lock className="w-5 h-5 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold">Security Controls</h3>
                                </div>
                                <p className="text-gray-400 mb-6">
                                    From SSO to field-level permissions, we give you granular control over who can access what—without making security a bottleneck.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-2 text-sm text-gray-300">
                                        <CheckCircle className="w-4 h-4 text-primary" />
                                        SSO with SAML and OIDC support
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-gray-300">
                                        <CheckCircle className="w-4 h-4 text-primary" />
                                        Role-based access control (RBAC)
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-gray-300">
                                        <CheckCircle className="w-4 h-4 text-primary" />
                                        Encryption at rest and in transit
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-gray-300">
                                        <CheckCircle className="w-4 h-4 text-primary" />
                                        API keys with scoped tokens
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="py-20">
                <div className="container px-4 md:px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex items-center gap-2 justify-center mb-4">
                            <FileText className="w-6 h-6 text-primary" />
                            <span className="text-primary font-medium">Simple Pricing</span>
                        </div>
                        <h2 className="text-3xl font-bold mb-4">One Price. Everything Included.</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto mb-12">
                            No per-seat fees. No surprise charges for AI features. No nickel-and-diming on integrations.
                            You get the full platform for one predictable price.
                        </p>

                        <div className="rounded-2xl border border-primary/30 bg-gradient-to-b from-primary/10 to-transparent p-8">
                            <div className="text-4xl font-bold mb-2">Flat Rate Per Organization</div>
                            <p className="text-gray-400 mb-8">Unlimited users • Unlimited contacts • All AI features</p>
                            <div className="grid sm:grid-cols-2 gap-6 text-left max-w-xl mx-auto">
                                <div>
                                    <h4 className="font-semibold mb-3 text-primary">Included</h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2 text-sm text-gray-300">
                                            <CheckCircle className="w-4 h-4 text-primary" />
                                            All Content Modules
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-gray-300">
                                            <CheckCircle className="w-4 h-4 text-primary" />
                                            AI Agents (Writer, SEO, Translator)
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-gray-300">
                                            <CheckCircle className="w-4 h-4 text-primary" />
                                            Global CDN & Image Optimization
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-gray-300">
                                            <CheckCircle className="w-4 h-4 text-primary" />
                                            Unlimited API Requests
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-3 text-gray-300">Optional Add-ons</h4>
                                    <ul className="space-y-2">
                                        <li className="text-sm text-gray-400">Premium support SLA</li>
                                        <li className="text-sm text-gray-400">Dedicated region hosting</li>
                                        <li className="text-sm text-gray-400">Professional services</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Support */}
            <section className="py-20 bg-white/5">
                <div className="container px-4 md:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Support That Has Your Back</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Every customer gets real support from real humans—not chatbots that make you repeat yourself.
                            Choose the level that fits your needs.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="rounded-2xl border border-white/10 bg-[#0F0F1A] p-8">
                            <h3 className="text-xl font-semibold mb-2 text-primary">Standard Support</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Business hours coverage with 24-48 hour response times. Full access to our knowledge base,
                                video tutorials, and community forums. Perfect for teams who are comfortable self-serving
                                most questions.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-primary/30 bg-gradient-to-b from-primary/5 to-transparent p-8">
                            <h3 className="text-xl font-semibold mb-2 text-primary">Premium Support</h3>
                            <p className="text-gray-400 leading-relaxed">
                                24/7 coverage with 1-4 hour response times. Your dedicated Customer Success Manager
                                conducts quarterly business reviews and proactive optimization sessions. Ideal for
                                teams where CMS uptime is business-critical.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-20">
                <div className="container px-4 md:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Common Questions</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Switching content platforms is a big decision. Here are the answers to questions we hear most often from teams considering the move.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {STATIC.faqs.map((faq, idx) => (
                            <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                                <h3 className="font-semibold mb-3 text-white">{faq.q}</h3>
                                <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 bg-black/20 border-t border-white/5">
                <div className="container px-4 md:px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Make the Switch?</h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Join the hundreds of teams who&apos;ve moved from {competitor.name} to Ledger1CMS.
                        We&apos;ll make the migration seamless and have you up and running in days, not months.
                    </p>
                    <div className="flex justify-center">
                        <Link href={primaryCta.url} target="_blank">
                            <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]">
                                {primaryCta.label} <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
            <MarketingFooter />
        </div>
    );
}
