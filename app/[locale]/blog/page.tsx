import { prismadb } from "@/lib/prisma";
import BlogList from "./_components/BlogList";

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


import MarketingLayout from "@/components/marketing/MarketingLayout";

export default async function BlogPage() {
    const posts = await getBlogPosts();

    return (
        <MarketingLayout>
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
                    <BlogList posts={posts} />
                )}
            </main>
        </MarketingLayout>
    );
}
