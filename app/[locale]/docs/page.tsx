import Link from "next/link";
import DocsSidebar from "../components/DocsSidebar";
import { ArrowRight, Book, Code, Terminal, FileText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prismadb } from "@/lib/prisma";

const prisma = prismadb;

async function getDocArticles() {
    try {
        return await prisma.docArticle.findMany({
            where: { type: "docs" },
            orderBy: {
                updatedAt: "desc",
            },
        });
    } catch (error) {
        console.error("Failed to fetch docs:", error);
        return [];
    }
}

export const revalidate = 60;

import MarketingLayout from "@/components/marketing/MarketingLayout";

export default async function DocsPage() {
    const docs = await getDocArticles();

    return (
        <MarketingLayout variant="default">
            <div className="container mx-auto px-6 flex flex-1 pt-8 pb-32 gap-10">
                <DocsSidebar />

                <main className="flex-1 max-w-4xl min-w-0">
                    <div className="text-center mb-16 space-y-6">
                        <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-300 backdrop-blur-sm">
                            <Book className="w-4 h-4 mr-2" />
                            Documentation
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/20 pb-2">
                            Build Faster.
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            Everything you need to integrate, customize, and extend BasaltCMS.
                        </p>

                        <div className="max-w-md mx-auto relative group">
                            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative flex items-center">
                                <Search className="absolute left-4 w-5 h-5 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Search documentation..."
                                    className="w-full bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-full py-4 pl-12 pr-6 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        {/* Quick Start Cards - Linked to actual slugs */}
                        <Link href="/docs/introduction" className="p-8 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md hover:bg-slate-800/50 transition-all duration-300 cursor-pointer group block">
                            <Terminal className="w-10 h-10 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold text-white mb-2">Introduction</h3>
                            <p className="text-slate-400 mb-4">What is BasaltCMS and why it's built for speed.</p>
                            <span className="text-sm font-bold text-emerald-400 flex items-center group-hover:translate-x-1 transition-transform">Read Intro <ArrowRight className="w-4 h-4 ml-2" /></span>
                        </Link>
                        <Link href="/docs/authentication" className="p-8 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md hover:bg-slate-800/50 transition-all duration-300 cursor-pointer group block">
                            <Code className="w-10 h-10 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold text-white mb-2">Authentication</h3>
                            <p className="text-slate-400 mb-4">Secure your app with NextAuth and RBAC.</p>
                            <span className="text-sm font-bold text-blue-400 flex items-center group-hover:translate-x-1 transition-transform">View Security <ArrowRight className="w-4 h-4 ml-2" /></span>
                        </Link>
                        <Link href="/docs/api-reference" className="p-8 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md hover:bg-slate-800/50 transition-all duration-300 cursor-pointer group block">
                            <FileText className="w-10 h-10 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold text-white mb-2">API Reference</h3>
                            <p className="text-slate-400 mb-4">Explore the internal API endpoints and usage.</p>
                            <span className="text-sm font-bold text-purple-400 flex items-center group-hover:translate-x-1 transition-transform">Browse API <ArrowRight className="w-4 h-4 ml-2" /></span>
                        </Link>
                        <Link href="/docs/apps-integrations" className="p-8 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md hover:bg-slate-800/50 transition-all duration-300 cursor-pointer group block">
                            <Terminal className="w-10 h-10 text-orange-400 mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold text-white mb-2">Apps & Integrations</h3>
                            <p className="text-slate-400 mb-4">Learn how to connect, configure, and manage third-party tools.</p>
                            <span className="text-sm font-bold text-orange-400 flex items-center group-hover:translate-x-1 transition-transform">Manage Apps <ArrowRight className="w-4 h-4 ml-2" /></span>
                        </Link>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">Browse All Articles</h2>

                    {docs.length === 0 ? (
                        <div className="text-center py-12 border border-white/5 rounded-2xl bg-slate-900/30">
                            <p className="text-slate-500">No documentation articles published yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {docs.map((doc) => (
                                <Link
                                    href={`/docs/${doc.slug || '#'}`}
                                    key={doc.id}
                                    className="flex items-start p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-blue-500/30 transition-all group"
                                >
                                    <div className="mr-4 mt-1 bg-slate-800 p-2 rounded-lg text-slate-400 group-hover:text-blue-400 transition-colors">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-200 group-hover:text-blue-300 transition-colors mb-1">
                                            {doc.title}
                                        </h3>
                                        {doc.category && (
                                            <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-white/5">
                                                {doc.category}
                                            </span>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </MarketingLayout>
    );
}
