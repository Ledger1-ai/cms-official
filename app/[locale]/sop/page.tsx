import Link from "next/link";
import { ArrowRight, GraduationCap, Search, BookOpen, Layers } from "lucide-react";
import { prismadb } from "@/lib/prisma";
import { SopSidebar } from "@/components/demo/SopSidebar";

const prisma = prismadb;

async function getUniversityDocs() {
    try {
        return await prisma.docArticle.findMany({
            where: { type: "university" },
            orderBy: {
                order: "asc",
            },
        });
    } catch (error) {
        console.error("Failed to fetch university docs:", error);
        return [];
    }
}

export const revalidate = 60;

import MarketingLayout from "@/components/marketing/MarketingLayout";

export default async function UniversityPage() {
    const docs = await getUniversityDocs();
    const categories = Array.from(new Set(docs.map(d => d.category)));

    return (
        <MarketingLayout variant="default">
            <main className="container mx-auto px-6 pt-12 pb-32">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Sidebar */}
                    <SopSidebar docs={docs} />

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        <div className="text-left mb-16 space-y-6">
                            <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-300 backdrop-blur-sm">
                                <GraduationCap className="w-4 h-4 mr-2" />
                                Ledger University
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/20 pb-2">
                                Master Your Workflow.
                            </h1>
                            <p className="text-xl text-slate-400 max-w-2xl">
                                Comprehensive SOPs, training modules, and best practices for the Ledger1CMS ecosystem.
                            </p>

                            <div className="max-w-md relative group">
                                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative flex items-center">
                                    <Search className="absolute left-4 w-5 h-5 text-slate-500" />
                                    <input
                                        type="text"
                                        placeholder="Search SOPs..."
                                        className="w-full bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-full py-4 pl-12 pr-6 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Featured Sections (Clickable Navigation) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
                            {['Sales', 'Technical', 'CMS Editing', 'General'].map((cat) => (
                                <Link
                                    key={cat}
                                    href={`#${cat.replace(/\s+/g, '-').toLowerCase()}`}
                                    className="p-6 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-md hover:bg-slate-800/50 hover:border-blue-500/30 transition-all cursor-pointer group"
                                >
                                    <Layers className="w-8 h-8 text-blue-400 mb-3 group-hover:text-blue-300 transition-colors" />
                                    <h3 className="text-lg font-bold text-white mb-1">{cat}</h3>
                                    <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Jump to section <ArrowRight className="inline w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></p>
                                </Link>
                            ))}
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">All Modules</h2>

                        {docs.length === 0 ? (
                            <div className="text-center py-12 border border-white/5 rounded-2xl bg-slate-900/30">
                                <p className="text-slate-500">No university content published yet.</p>
                            </div>
                        ) : (
                            <div className="space-y-16">
                                {categories.map(category => (
                                    <div key={category} id={category.replace(/\s+/g, '-').toLowerCase()} className="scroll-mt-24">
                                        <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center">
                                            <BookOpen className="w-5 h-5 mr-2" />
                                            {category}
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                                            {docs.filter(d => d.category === category).map((doc) => (
                                                <Link
                                                    href={`/sop/${doc.slug || '#'}`}
                                                    key={doc.id}
                                                    className="flex flex-col p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-blue-500/30 transition-all group h-full"
                                                >
                                                    <h3 className="text-lg font-bold text-slate-200 group-hover:text-blue-300 transition-colors mb-2">
                                                        {doc.title}
                                                    </h3>
                                                    <div className="mt-auto pt-4 flex items-center text-sm text-slate-500 group-hover:text-slate-400">
                                                        Read Module <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </MarketingLayout>
    );
}
