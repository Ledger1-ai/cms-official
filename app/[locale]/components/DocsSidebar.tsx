import Link from "next/link";
import { prismadb } from "@/lib/prisma";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Book, FileText } from "lucide-react";

async function getDocArticles() {
    try {
        return await prismadb.docArticle.findMany({
            where: { type: "docs" },
            orderBy: {
                order: "asc", // or updatedAt
            },
            select: {
                id: true,
                title: true,
                slug: true,
                category: true,
            }
        });
    } catch (error) {
        return [];
    }
}

export default async function DocsSidebar({ currentSlug }: { currentSlug?: string }) {
    const docs = await getDocArticles();

    // Group by category
    const grouped = docs.reduce((acc, doc) => {
        const cat = doc.category || "General";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(doc);
        return acc;
    }, {} as Record<string, typeof docs>);

    const categories = Object.keys(grouped).sort();

    return (
        <aside className="hidden lg:block w-64 shrink-0 border-r border-white/10 bg-slate-900/30 backdrop-blur-md h-[calc(100vh-80px)] sticky top-20 overflow-hidden">
            <div className="p-6">
                <h3 className="font-bold text-white mb-4 flex items-center">
                    <Book className="w-5 h-5 mr-2 text-blue-400" />
                    Documentation
                </h3>
                <ScrollArea className="h-full pr-4">
                    <div className="space-y-8">
                        {categories.map(category => (
                            <div key={category}>
                                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                                    {category}
                                </h4>
                                <ul className="space-y-2">
                                    {grouped[category].map(doc => {
                                        const isActive = currentSlug === doc.slug;
                                        return (
                                            <li key={doc.id}>
                                                <Link
                                                    href={`/docs/${doc.slug}`}
                                                    className={`block text-sm py-1.5 px-3 rounded-lg transition-colors ${isActive
                                                            ? "bg-blue-500/10 text-blue-400 font-medium"
                                                            : "text-slate-400 hover:text-white hover:bg-white/5"
                                                        }`}
                                                >
                                                    {doc.title}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </aside>
    );
}
