"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/demo/GlassCard";
import industries from "@/data/industries.json";
import { ArrowRight, Factory, Briefcase, ShoppingBag, Stethoscope, Landmark, Layers } from "lucide-react";
import { useState } from "react";
import ContactModal from "@/components/modals/ContactModal";

// Helper to map industry slugs to icons
const getIcon = (slug: string) => {
    switch (slug) {
        case 'manufacturing': return <Factory className="w-6 h-6 text-amber-400" />;
        case 'finance': return <Landmark className="w-6 h-6 text-emerald-400" />;
        case 'healthcare': return <Stethoscope className="w-6 h-6 text-red-400" />;
        case 'retail': return <ShoppingBag className="w-6 h-6 text-pink-400" />;
        case 'professional-services': return <Briefcase className="w-6 h-6 text-blue-400" />;
        default: return <Layers className="w-6 h-6 text-purple-400" />;
    }
};


export default function IndustryPageContent() {
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <>
            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

            <main className="container mx-auto px-6 pt-12 pb-32">
                {/* Hero Section */}
                <div className="text-center mb-20 space-y-6 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] -z-10" />

                    <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-300 backdrop-blur-sm">
                        <Briefcase className="w-4 h-4 mr-2" />
                        Tailored Solutions
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/20 pb-2">
                        Built for Your Business.
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12">
                        Don&apos;t settle for generic software. BasaltCMS comes pre-configured with the workflows, compliance, and language of your industry.
                    </p>

                    <div className="relative w-full max-w-5xl mx-auto aspect-[2/1] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                        <Image
                            src="/images/industry-hero.jpg"
                            alt="Industry Solutions"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
                    </div>
                </div>

                {/* Industries Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {industries.map((industry) => (
                        <GlassCard key={industry.slug} className="group hover:-translate-y-2 transition-transform duration-500">
                            <div className="p-8 h-full flex flex-col relative overflow-hidden">
                                {/* Background Glow */}
                                <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-[50px] group-hover:bg-blue-500/20 transition-all duration-500" />

                                <div className="mb-6 inline-flex p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md w-fit">
                                    {getIcon(industry.slug)}
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-2">{industry.name}</h3>
                                <p className="text-sm font-mono text-blue-400 mb-4">{industry.use_case}</p>

                                <p className="text-slate-400 mb-8 leading-relaxed flex-grow">
                                    {industry.description}
                                </p>

                                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{industry.hero_title}</span>
                                    <Link href={`/industry/${industry.slug}`}>
                                        <Button size="icon" variant="ghost" className="rounded-full hover:bg-blue-500/20 hover:text-blue-300 text-slate-400">
                                            <ArrowRight className="w-5 h-5" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-32 relative rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-md border border-white/10" />
                    <div className="relative p-12 md:p-24 text-center">
                        <h2 className="text-4xl font-bold text-white mb-6">Don&apos;t see your industry?</h2>
                        <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                            Our open API and flexible data model mean BasaltCMS can be adapted to any vertical in days, not months.
                        </p>
                        <Button
                            onClick={() => setIsContactOpen(true)}
                            className="rounded-full bg-white text-black hover:bg-slate-200 px-8 py-6 text-lg font-bold"
                        >
                            Contact Solutions Engineering
                        </Button>
                    </div>
                </div>
            </main>
        </>
    );
}
