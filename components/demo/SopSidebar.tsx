"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { BookOpen, ChevronRight, Layers } from "lucide-react";

interface Doc {
    id: string;
    title: string;
    slug: string;
    category: string;
}

interface SopSidebarProps {
    docs: Doc[];
    currentSlug?: string;
}

export function SopSidebar({ docs, currentSlug }: SopSidebarProps) {
    // Group docs by category
    const categories = Array.from(new Set(docs.map(d => d.category)));

    return (
        <div className="w-full lg:w-64 shrink-0 space-y-8 lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto pr-4 thin-scrollbar">
            <div className="mb-6">
                <Link href="/sop" className="flex items-center gap-2 font-bold text-xl text-white hover:text-blue-400 transition-colors">
                    <Layers className="h-6 w-6 text-blue-500" />
                    <span>University</span>
                </Link>
                <p className="text-sm text-slate-500 mt-1">SOPs & Training Resources</p>
            </div>

            {categories.map((category) => (
                <div key={category} className="space-y-3">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                        {category}
                    </h4>
                    <ul className="space-y-1 border-l border-white/10 ml-1">
                        {docs
                            .filter(doc => doc.category === category)
                            .map(doc => {
                                const isActive = currentSlug === doc.slug;
                                return (
                                    <li key={doc.id}>
                                        <Link
                                            href={`/sop/${doc.slug}`}
                                            className={cn(
                                                "block py-1.5 px-4 text-sm transition-all border-l -ml-px",
                                                isActive
                                                    ? "border-blue-500 text-blue-400 font-medium bg-blue-500/5"
                                                    : "border-transparent text-slate-400 hover:text-white hover:border-slate-500"
                                            )}
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
    );
}
