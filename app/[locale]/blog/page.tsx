import Link from "next/link";
import Image from "next/image";
import DemoHeader from "@/components/demo/DemoHeader";
import InteractiveBackground from "@/components/demo/InteractiveBackground";
import { ArrowRight, Calendar, User } from "lucide-react";
import { prismadb } from "@/lib/prisma";

async function getBlogPosts() {
    try {
        return await prismadb.blogPost.findMany({
            where: {
                publishedAt: {
                    lte: new Date()
                }
            },
            orderBy: {
                publishedAt: "desc",
            },
        });
    } catch (error) {
        console.error("Failed to fetch blog posts:", error);
        return [];
    }
}

export const revalidate = 60; // Revalidate every minute

import MarketingFooter from "../components/MarketingFooter";

export default async function BlogPage() {
    const posts = await getBlogPosts();

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-purple-500/30 font-sans overflow-x-hidden">
            <InteractiveBackground />

            <div className="relative z-10">
                <DemoHeader />

                <main className="container mx-auto px-6 pt-12 pb-32">
                    <div className="text-center mb-16 space-y-4">
                        <div className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-300 backdrop-blur-sm">
                            <span className="flex h-2 w-2 rounded-full bg-purple-400 mr-2 animate-pulse"></span>
                            Latest Updates
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/20 pb-2">
                            Blog & Insights
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            Discover the latest news, tutorials, and success stories from the Ledger1CMS team.
                        </p>
                    </div>

                    {posts.length === 0 ? (
                        <div className="text-center py-20 border border-white/5 rounded-3xl bg-slate-900/50 backdrop-blur-md">
                            <h3 className="text-2xl font-bold text-slate-300">No posts found</h3>
                            <p className="text-slate-500 mt-2">Check back soon for updates!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <Link
                                    href={`/blog/${post.slug || '#'}`}
                                    key={post.id}
                                    className="group relative flex flex-col bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:shadow-[0_0_50px_rgba(168,85,247,0.15)] hover:-translate-y-2"
                                >
                                    {/* Cover Image */}
                                    <div className="aspect-video relative overflow-hidden bg-slate-900">
                                        {post.coverImage ? (
                                            <Image
                                                src={post.coverImage}
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                                                <span className="text-slate-600 font-bold text-xl">Standard Post</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

                                        <div className="absolute top-4 left-4">
                                            <span className="bg-purple-500/20 backdrop-blur-md border border-purple-500/30 text-purple-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                                {post.category || "News"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 p-8 flex flex-col">
                                        <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 font-mono">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3 text-purple-400" />
                                                {new Date(post.publishedAt).toLocaleDateString()}
                                            </span>
                                            {post.author && (
                                                <span className="flex items-center gap-1">
                                                    <User className="w-3 h-3 text-blue-400" />
                                                    {post.author}
                                                </span>
                                            )}
                                        </div>

                                        <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
                                            {post.title}
                                        </h2>

                                        <p className="text-slate-400 line-clamp-3 mb-6 flex-1">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center text-sm font-bold text-purple-400 group-hover:text-purple-300 transition-colors">
                                            Read Article <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </main>
                <MarketingFooter />
            </div>
        </div>
    );
}
