
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Clock, DollarSign, Briefcase } from "lucide-react";
import { prismadb } from "@/lib/prisma";
import Image from "next/image";

type Props = {
    params: Promise<{ id: string; locale: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const job = await prismadb.jobPosting.findUnique({
        where: { id: params.id },
    });

    if (!job) return {};

    return {
        title: `${job.title} | Careers at Ledger1CMS`,
        description: job.summary || `Join our team as a ${job.title}.`,
    };
}

import MarketingLayout from "@/components/marketing/MarketingLayout";

export default async function JobPage(props: Props) {
    const params = await props.params;
    setRequestLocale(params.locale);

    const job = await prismadb.jobPosting.findUnique({
        where: { id: params.id },
    });

    if (!job) {
        notFound();
    }

    return (
        <MarketingLayout variant="default">

            <main className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
                <Link
                    href="/careers"
                    className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors group"
                >
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Openings
                </Link>

                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                    {job.coverImage && (
                        <div className="relative w-full h-64 md:h-80">
                            <Image
                                src={job.coverImage}
                                alt={job.title}
                                fill
                                className="object-cover"
                                priority
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1A] via-transparent to-transparent" />
                        </div>
                    )}

                    <div className="p-8 md:p-12">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                            <div>
                                <h1 className="text-3xl md:text-5xl font-bold mb-4">{job.title}</h1>
                                <div className="flex flex-wrap gap-4 text-slate-400 text-sm">
                                    <div className="flex items-center gap-1.5">
                                        <Briefcase className="w-4 h-4 text-cyan-500" />
                                        {job.department}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="w-4 h-4 text-cyan-500" />
                                        {job.location}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-4 h-4 text-cyan-500" />
                                        {job.type}
                                    </div>

                                </div>
                            </div>
                            <Button
                                size="lg"
                                className="rounded-full bg-white text-slate-950 font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-purple-600 hover:to-green-500 hover:text-white hover:shadow-[0_0_50px_rgba(168,85,247,0.6)] whitespace-nowrap"
                                asChild
                            >
                                <Link href={`/careers/apply/${job.id}`}>
                                    Apply Now
                                </Link>
                            </Button>
                        </div>

                        {/* Description - Rendering HTML safely */}
                        <div
                            className="prose prose-invert prose-lg max-w-none text-slate-300 prose-headings:text-white prose-a:text-cyan-400 hover:prose-a:text-cyan-300 prose-strong:text-white"
                            dangerouslySetInnerHTML={{ __html: job.description || "" }}
                        />

                        <div className="mt-12 pt-8 border-t border-white/10 flex justify-center">
                            <Button
                                size="lg"
                                className="rounded-full bg-white text-slate-950 font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-purple-600 hover:to-green-500 hover:text-white hover:shadow-[0_0_50px_rgba(168,85,247,0.6)] px-12"
                                asChild
                            >
                                <Link href={`/careers/apply/${job.id}`}>
                                    Apply for this Role
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </MarketingLayout>
    );
}
