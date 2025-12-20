import Link from "next/link";
import DemoHeader from "@/components/demo/DemoHeader";
import InteractiveBackground from "@/components/demo/InteractiveBackground";
import { ArrowRight, Briefcase, MapPin, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prismadb } from "@/lib/prisma";

const prisma = prismadb;

async function getJobPostings() {
    try {
        return await prisma.jobPosting.findMany({
            where: {
                active: true
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    } catch (error) {
        console.error("Failed to fetch jobs:", error);
        return [];
    }
}

export const revalidate = 60;

import MarketingFooter from "../components/MarketingFooter";

export default async function CareersPage() {
    const jobs = await getJobPostings();

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-pink-500/30 font-sans overflow-x-hidden">
            <InteractiveBackground />

            <div className="relative z-10">
                <DemoHeader />

                <main className="container mx-auto px-6 pt-12 pb-32">
                    <div className="text-center mb-20 space-y-6">
                        <div className="inline-flex items-center rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-sm font-medium text-pink-300 backdrop-blur-sm">
                            <Briefcase className="w-4 h-4 mr-2" />
                            We are Hiring!
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/20 pb-2">
                            Join the Revolution.
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            Help us build the next generation of AI-powered content management systems.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">Open Positions</h2>

                        {jobs.length === 0 ? (
                            <div className="text-center py-20 border border-white/5 rounded-3xl bg-slate-900/40 backdrop-blur-md">
                                <h3 className="text-2xl font-bold text-slate-300">No open roles currently</h3>
                                <p className="text-slate-500 mt-2">We&apos;re always looking for talent though! Send us your resume.</p>
                                <Button className="mt-6 bg-white text-black hover:bg-slate-200" asChild>
                                    <Link href="/contact">Contact Us</Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {jobs.map((job) => (
                                    <div
                                        key={job.id}
                                        className="group p-6 md:p-8 rounded-3xl bg-slate-900/40 border border-white/10 backdrop-blur-md hover:bg-slate-800/60 hover:border-pink-500/30 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
                                    >
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-bold text-slate-200 group-hover:text-white transition-colors">
                                                {job.title}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                                                <span className="flex items-center gap-1">
                                                    <Briefcase className="w-4 h-4 text-pink-400" /> {job.department || "Engineering"}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4 text-blue-400" /> {job.location || "Remote"}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4 text-green-400" /> {job.type || "Full-time"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 shrink-0">
                                            <div className="hidden md:block text-right">
                                                <span className="block text-sm font-bold text-slate-300">Apply Now</span>
                                                <span className="text-xs text-slate-500">2 days ago</span>
                                            </div>
                                            <Link href={`/careers/${job.id}`}>
                                                <Button size="icon" className="h-12 w-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors">
                                                    <ArrowRight className="w-5 h-5" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>
                <MarketingFooter />
            </div>
        </div>
    );
}
