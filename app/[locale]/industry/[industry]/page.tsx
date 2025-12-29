import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Users, BarChart3, CheckCircle, Shield, LineChart, PlugZap, Bot, Target, Zap, Clock, TrendingUp, Globe, Lock, HeartHandshake, Workflow, Mail, MessageSquare, FileText, Database } from "lucide-react";
import CmsWorkflowVisual from "@/components/visuals/CmsWorkflowVisual";
import { AiCapabilitiesVisual } from "@/components/visuals/AiCapabilitiesVisual";
import { AnalyticsDashboard } from "@/components/visuals/AnalyticsDashboard";
import { ContentLifecycleVisual } from "@/components/visuals/ContentLifecycleVisual";
import industries from "@/data/industries.json";
import LeadGenDashboard from "@/app/[locale]/components/LeadGenDashboard";
import AgentInterface from "@/app/[locale]/components/AgentInterface";
import fs from "fs";
import path from "path";
import Image from "next/image";

// ... (inside the component)

<div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(6,182,212,0.15)] border border-white/10 bg-black/50 backdrop-blur-xl flex items-center justify-center p-2">
    <ContentLifecycleVisual />
</div>

type Props = {
    params: Promise<{ industry: string; locale: string }>;
};

function getBaseUrl(): string {
    const envUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!envUrl) {
        return "https://crm.basalthq.com";
    }
    // Ensure URL has protocol
    if (!envUrl.startsWith("http://") && !envUrl.startsWith("https://")) {
        return `https://${envUrl}`;
    }
    return envUrl;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;

    const industry = industries.find((i) => i.slug === params.industry);

    if (!industry) return {};

    const title = `Best AI CMS for ${industry.name} | BasaltCMS`;
    const description = `BasaltCMS is the top-rated AI CMS for the ${industry.name} industry. ${industry.use_case}. Start for free.`;
    const baseUrl = getBaseUrl();

    let ogImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(`AI CMS for ${industry.name}`)}&description=${encodeURIComponent(`The #1 Choice for ${industry.name} Professionals`)}&type=industry&badge=${encodeURIComponent("Industry Leader")}`;

    return {
        title,
        description,
        keywords: [`${industry.name} CMS`, "AI CMS", industry.use_case, industry.name],
        openGraph: {
            title,
            description,
            type: "website",
            url: `${baseUrl}/industry/${params.industry}`,
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: `AI CMS for ${industry.name}`,
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
    return industries.map((i) => ({
        industry: i.slug,
    }));
}

const STATIC = {
    faqs: [
        { q: "Can we self-host?", a: "BasaltCMS is a cloud-native SaaS platform designed for maximum reliability and automatic updates. For organizations with specific compliance requirements, we offer dedicated region hosting options that provide the security benefits of cloud infrastructure with data residency controls." },
        { q: "Is there an API?", a: "Absolutely. Our REST API and Webhooks let you connect BasaltCMS to virtually any system in your stack. Every integration uses scoped tokens with configurable rate limits, giving you enterprise-grade security without sacrificing flexibility." },
        { q: "Do you offer templates?", a: "Yes—and they're built specifically for your industry. You'll get pre-configured email templates, pipeline stages, dashboard layouts, and automation workflows that reflect best practices. Of course, everything is fully customizable to match your exact needs." },
        { q: "How does AI train on our data?", a: "Your data stays yours. Our AI learns from your organization's patterns and signals, but we never mix data across tenants. Each AI agent adapts specifically to your business, improving over time based on your unique workflows and customer interactions." }
    ]
};

import MarketingLayout from "@/components/marketing/MarketingLayout";

function getHeroImage(slug: string): string {
    // Try the CMS-specific generated image first
    const cmsImage = `industry-${slug}-cms.png`;
    if (fs.existsSync(path.join(process.cwd(), "public", "images", cmsImage))) {
        return `/images/${cmsImage}`;
    }

    const specificImage = `industry-${slug}.jpg`;
    if (fs.existsSync(path.join(process.cwd(), "public", "images", specificImage))) {
        return `/images/${specificImage}`;
    }
    return "/images/industry-hero.jpg";
}

export default async function IndustryPage(props: Props) {
    const params = await props.params;

    // Enable static rendering
    setRequestLocale(params.locale);

    const industry = industries.find((i) => i.slug === params.industry);

    if (!industry) {
        notFound();
    }

    const heroImage = getHeroImage(industry.slug);
    const primaryCta = { label: `Schedule ${industry.name} Demo`, url: "https://calendar.google.com/appointments/schedules/AcZssZ2Vduqr0QBnEAM50SeixE8a7kXuKt62zEFjQCQ8_xvoO6iF3hluVQHpaM6RYWMGB110_zM3MUF0" };

    return (
        <MarketingLayout variant="default">

            {/* Hero */}
            <section className="relative w-full py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 pointer-events-none" />

                {/* Hero Background Image */}
                {/* Hero Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={heroImage}
                        alt={`${industry.name} content management background`}
                        fill
                        className="object-cover opacity-70"
                        priority
                    />
                    {/* Drastically reduced gradient opacity to let image show through */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/80" />
                </div>

                <div className="container px-4 md:px-6 relative z-10 text-center">
                    <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm mb-6 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                        <span>CMS for {industry.name}</span>
                    </div>
                    {/* Refactored H1: Gradient on span to prevent block-level clipping. Increased padding for descenders. */}
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6 drop-shadow-sm py-4 leading-relaxed text-white">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 pb-4">
                            {industry.hero_title}
                        </span>
                    </h1>
                    <p className="mx-auto max-w-[800px] text-gray-300 md:text-xl leading-relaxed mb-8 drop-shadow-md">
                        {industry.description}
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href={primaryCta.url} target="_blank">
                            {/* EXPLICIT BUTTON STYLING */}
                            <Button size="lg" className="rounded-full font-bold bg-[#06b6d4] text-white hover:bg-[#0891b2] shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] border-none">
                                {primaryCta.label} <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>


                </div>
            </section>

            {/* Dashboard Preview -> CMS Workflow */}
            <section className="py-20 bg-black/20 border-y border-white/5">
                <div className="container px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                Built for How {industry.name} Creates Content
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Generic CMSs force you to adapt your content to their limitations. BasaltCMS is different—it&apos;s designed from the ground up to handle the unique content lifecycles of {industry.name.toLowerCase()}, from {industry.use_case.toLowerCase()} to delivering personalized digital experiences.
                            </p>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-xl shrink-0">
                                        <Building2 className="text-primary w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Industry-Specific Content Models</h3>
                                        <p className="text-gray-400 text-sm">Pre-built fields and relationships that match how your industry operates—no custom development required.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-xl shrink-0">
                                        <Users className="text-primary w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Scale Content Velocity</h3>
                                        <p className="text-gray-400 text-sm">Publish thousands of pages programmatically without hitting performance limits.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-xl shrink-0">
                                        <BarChart3 className="text-primary w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Predictive Analytics for {industry.name}</h3>
                                        <p className="text-gray-400 text-sm">Forecasting models trained on industry patterns help you spot content opportunities before competitors do.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(6,182,212,0.15)] border border-white/10 bg-black/50 backdrop-blur-xl flex items-center justify-center p-2">
                            <ContentLifecycleVisual />
                        </div>
                    </div>
                </div>
            </section>

            {/* AI-First Approach */}
            <section className="py-20">
                <div className="container px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">AI That Understands {industry.name}</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Our AI agents aren&apos;t generic chatbots. They&apos;re specialized content engines trained to understand the nuances
                            of {industry.name.toLowerCase()} terminology, audience expectations, and compliance needs.
                        </p>
                    </div>

                    <div className="max-w-6xl mx-auto">
                        <AiCapabilitiesVisual />
                    </div>
                </div>
            </section>

            {/* Analytics Section */}
            <section className="py-20 bg-black/20 border-y border-white/5">
                <div className="container px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <LineChart className="w-6 h-6 text-primary" />
                                <span className="text-primary font-medium">Analytics & Insights</span>
                            </div>
                            <h2 className="text-3xl font-bold mb-6">
                                Know Where You Stand, See Where You&apos;re Going
                            </h2>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                Dashboards that actually tell you something useful. Track the metrics that matter for {industry.name.toLowerCase()}—not
                                vanity numbers, but actionable insights that drive better decisions.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-medium mb-1">Content Performance</h4>
                                        <p className="text-sm text-gray-400">See engagement, time on page, and conversion influence across every content asset.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-medium mb-1">Traffic Forecasting</h4>
                                        <p className="text-sm text-gray-400">Predict traffic spikes with confidence using models trained on your historical data and market patterns.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-medium mb-1">Attribution That Works</h4>
                                        <p className="text-sm text-gray-400">Finally understand which content and channels actually drive conversions—not just clicks.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-medium mb-1">SEO Health Indicators</h4>
                                        <p className="text-sm text-gray-400">Identify decaying content before it loses rank with engagement-based health scoring.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-[450px] w-full rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(16,185,129,0.15)] border border-white/10 bg-black/50 backdrop-blur-xl flex items-center justify-center p-2">
                            <AnalyticsDashboard />
                        </div>
                    </div>
                </div>
            </section>

            {/* Workflow Automation */}
            <section className="py-20">
                <div className="container px-4 md:px-6">
                    <div className="text-center mb-12">
                        <div className="flex items-center gap-2 justify-center mb-4">
                            <Workflow className="w-6 h-6 text-primary" />
                            <span className="text-primary font-medium">Automation</span>
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Workflows That Run Themselves</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Stop manually moving deals through stages and chasing follow-ups. BasaltCMS automates the
                            repetitive work so your team can focus on what humans do best—building relationships.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-8">
                            <h3 className="text-xl font-semibold mb-4">Content Lifecycle Journey</h3>
                            <p className="text-gray-400 mb-6">
                                From draft to deprecated, every step can be automated while ensuring quality.
                            </p>
                            <div className="space-y-4">
                                {[
                                    { step: "Content Created", action: "Auto-tag → generate meta data → check compliance" },
                                    { step: "Review Requested", action: "Notify editors → run automated tests → generate preview" },
                                    { step: "Published", action: "Push to Edge → index in Search → syndicate to channels" },
                                    { step: "Update Needed", action: "Monitor decay → alert owner → draft refresh" }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-4 items-start">
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold shrink-0">
                                            {idx + 1}
                                        </span>
                                        <div>
                                            <div className="font-medium text-sm">{item.step}</div>
                                            <div className="text-xs text-gray-500">{item.action}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-8">
                            <h3 className="text-xl font-semibold mb-4">Visitor Engagement Playbooks</h3>
                            <p className="text-gray-400 mb-6">
                                Keep customers engaged and growing with automated touchpoints and health monitoring.
                            </p>
                            <div className="space-y-4">
                                {[
                                    { step: "Visitor lands", action: "Identify segment → personalize hero → recommend content" },
                                    { step: "Sign-up event", action: "Trigger welcome series → unlock gated assets → sync to CDP" },
                                    { step: "Engagement drops", action: "Re-engage email → offer relevant case study → personalized alert" },
                                    { step: "Conversion goal", action: "Record conversion → attribution update → sales alert" }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-4 items-start">
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold shrink-0">
                                            {idx + 1}
                                        </span>
                                        <div>
                                            <div className="font-medium text-sm">{item.step}</div>
                                            <div className="text-xs text-gray-500">{item.action}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Integrations */}
            <section className="py-20 bg-white/5">
                <div className="container px-4 md:px-6">
                    <div className="text-center mb-12">
                        <div className="flex items-center gap-2 justify-center mb-4">
                            <PlugZap className="w-6 h-6 text-primary" />
                            <span className="text-primary font-medium">Integrations</span>
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Connects to Everything You Use</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Your CMS should be the hub, not a silo. BasaltCMS integrates seamlessly with the tools
                            your {industry.name.toLowerCase()} team relies on every day.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
                        {[
                            { title: "Deployment", items: ["Vercel", "Netlify", "AWS Amplify", "Docker"], icon: <Globe className="h-6 w-6" /> },
                            { title: "Commerce", items: ["Shopify", "BigCommerce", "Stripe", "Medusa"], icon: <Zap className="h-6 w-6" /> },
                            { title: "Search", items: ["Algolia", "Elasticsearch", "Typesense", "Meilisearch"], icon: <Database className="h-6 w-6" /> },
                            { title: "Analytics", items: ["Google Analytics 4", "PostHog", "Segment", "Mixpanel"], icon: <BarChart3 className="h-6 w-6" /> },
                            { title: "DAM & Media", items: ["Cloudinary", "Mux", "Unsplash", "Shutterstock"], icon: <FileText className="h-6 w-6" /> },
                        ].map((category) => (
                            <div key={category.title} className="rounded-2xl border border-white/10 bg-[#0F0F1A] p-6 hover:border-primary/30 transition-colors">
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
            <section className="py-20">
                <div className="container px-4 md:px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">Enterprise-Grade Security</h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">
                                Your customer data is your most valuable asset. We protect it with the same rigor
                                as the world&apos;s largest enterprises, with compliance built in from day one.
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
                                    Whether you&apos;re serving customers in Europe, North America, or Asia-Pacific, BasaltCMS
                                    helps you stay compliant with local data protection regulations.
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
                                    From SSO to field-level permissions, we give you granular control over who can
                                    access what—without making security a bottleneck.
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

            {/* Onboarding */}
            <section className="py-20 bg-white/5">
                <div className="container px-4 md:px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Zap className="w-6 h-6 text-primary" />
                                    <span className="text-primary font-medium">Quick Setup</span>
                                </div>
                                <h2 className="text-3xl font-bold mb-6">
                                    Up and Running in Days, Not Months
                                </h2>
                                <p className="text-gray-400 leading-relaxed mb-6">
                                    We&apos;ve streamlined the onboarding process to get your team productive fast.
                                    Most {industry.name.toLowerCase()} teams complete setup in under a week—including
                                    data migration, integration setup, and team training.
                                </p>
                                <p className="text-gray-400 leading-relaxed">
                                    Our implementation specialists have deep experience with {industry.name.toLowerCase()}
                                    workflows and will help you configure BasaltCMS to match exactly how your team works.
                                </p>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { step: 1, title: "Discovery & Planning", desc: "We map your current processes and design the ideal setup." },
                                    { step: 2, title: "Data Migration", desc: "Import your contacts, deals, and history with field-level mapping." },
                                    { step: 3, title: "Configuration", desc: "Set up pipelines, automations, and AI agents for your workflows." },
                                    { step: 4, title: "Integration Setup", desc: "Connect your email, calendar, and other essential tools." },
                                    { step: 5, title: "Team Training", desc: "Get your team comfortable and productive with hands-on sessions." },
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

            {/* Support */}
            <section className="py-20">
                <div className="container px-4 md:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Support That Has Your Back</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Every customer gets real support from real humans who understand {industry.name.toLowerCase()}.
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
            <section className="py-20 bg-white/5">
                <div className="container px-4 md:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Common Questions</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Got questions about using BasaltCMS for {industry.name.toLowerCase()}? Here are answers to what we hear most often.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {STATIC.faqs.map((faq, idx) => (
                            <div key={idx} className="rounded-2xl border border-white/10 bg-[#0F0F1A] p-6">
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
                    <h2 className="text-3xl font-bold mb-6">Ready to Transform Your {industry.name} Operations?</h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Join the {industry.name.toLowerCase()} teams who&apos;ve already made the switch to AI-native CMS.
                        See exactly how BasaltCMS can help you launch faster and scale further.
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
        </MarketingLayout>
    );
}
