import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/demo/GlassCard";
import competitors from "@/data/competitors.json";
import { ArrowRight, Check, X, Zap, Shield, Globe } from "lucide-react";

export const metadata = {
    title: "Compare BasaltCMS to Competitors | The Future of AI CMS",
    description: "Compare BasaltCMS vs Salesforce, HubSpot, and others. Discover why AI-native, headless architecture wins on performance, cost, and speed.",
};

import MarketingLayout from "@/components/marketing/MarketingLayout";

export default function ComparePage() {
    return (
        <MarketingLayout variant="default">
            <main className="container mx-auto px-6 pt-12 pb-32">
                {/* Hero Section */}
                <div className="text-center mb-20 space-y-6 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] -z-10" />

                    <div className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-300 backdrop-blur-sm">
                        <Zap className="w-4 h-4 mr-2" />
                        Unfair Advantage
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/20 pb-2">
                        Stop Overpaying. <br /> Start Automating.
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12">
                        See why forward-thinking companies are switching from legacy giants to BasaltCMS&apos;s AI-native architecture.
                    </p>

                    <div className="relative w-full max-w-5xl mx-auto aspect-[2/1] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                        <Image
                            src="/images/compare-hero.jpg"
                            alt="Comparison Dashboard"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
                    </div>
                </div>

                {/* Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {competitors.map((competitor) => (
                        <GlassCard key={competitor.slug} className="group hover:-translate-y-1 transition-transform duration-300">
                            <div className="p-8 h-full flex flex-col">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold text-white">vs {competitor.name}</h3>
                                    <div className="p-2 rounded-full bg-slate-800 border border-white/5">
                                        <X className="w-5 h-5 text-red-400" />
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8 flex-grow">
                                    <div className="space-y-2">
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">The Drawback</p>
                                        <p className="text-red-300 font-medium flex items-start gap-2">
                                            <X className="w-4 h-4 mt-1 shrink-0 opacity-70" />
                                            {competitor.weakness}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">The Basalt Advantage</p>
                                        <p className="text-emerald-300 font-medium flex items-start gap-2">
                                            <Check className="w-4 h-4 mt-1 shrink-0 opacity-70" />
                                            {competitor.comparison_text}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <h4 className="text-sm font-bold text-purple-400 mb-2">{competitor.comparison_title}</h4>
                                    <Link href={`/compare/${competitor.slug}`} className="inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors group-hover:underline decoration-purple-500/50 underline-offset-4">
                                        Read In-Depth Comparison <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-32 text-center">
                    <div className="inline-flex flex-col items-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Ready to upgrade your stack?</h2>
                        <div className="flex gap-4">
                            <Link href="/create-account">
                                <Button variant="glow" className="px-8 py-6 text-lg">
                                    Get Started Free
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button variant="outline" className="rounded-full px-8 py-6 text-lg border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 hover:border-white/20">
                                    Talk to Sales
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </MarketingLayout>
    );
}
