
import { prismadb } from "@/lib/prisma";
import MarketingLayout from "@/components/marketing/MarketingLayout";
import BlogList from "../_components/BlogList";
import BlogPostModal from "../_components/BlogPostModal";
import { notFound } from "next/navigation";

// Fetch all posts for the background list
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

// Fetch single post by slug
async function getBlogPost(slug: string) {
    try {
        return await prismadb.blogPost.findUnique({
            where: {
                slug: slug
            }
        });
    } catch (error) {
        console.error("Failed to fetch blog post:", error);
        return null;
    }
}

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>
}

export const revalidate = 60;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;

    // Parallel data fetching
    const [allPosts, post] = await Promise.all([
        getBlogPosts(),
        getBlogPost(slug)
    ]);

    if (!post) {
        notFound();
    }

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

                {/* Render the list in the background */}
                <BlogList posts={allPosts} />

                {/* Render the modal for the specific post */}
                <BlogPostModal post={post} />
            </main>
        </MarketingLayout>
    );
}
