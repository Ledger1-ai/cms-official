"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BlogPost } from "@prisma/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { Calendar, User, Share2, X, Twitter, Linkedin, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import { CustomMarkdownRenderer } from "@/components/ui/custom-markdown-renderer";

interface BlogPostModalProps {
    post: BlogPost;
}

export default function BlogPostModal({ post }: BlogPostModalProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);

    // Handle closing: navigate back to blog list
    const handleClose = () => {
        setIsOpen(false);
        // Small timeout to allow animation to finish
        setTimeout(() => {
            router.push('/blog');
        }, 300);
    };

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    const handleShare = (platform: string) => {
        let url = '';
        const text = `Check out this article: ${post.title}`;

        switch (platform) {
            case 'twitter':
                url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
                break;
            case 'linkedin':
                url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
                break;
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
                break;
        }

        if (url) window.open(url, '_blank', 'width=600,height=400');
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="max-w-4xl w-[95vw] h-[90vh] bg-[#0A0A0B] backdrop-blur-xl border border-white/10 text-white p-0 overflow-hidden shadow-2xl flex flex-col">

                {/* Header Actions */}
                <div className="absolute right-4 top-4 z-50 flex gap-2">
                    <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm"
                        onClick={handleClose}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <ScrollArea className="flex-1 h-full">
                    <div className="relative w-full h-[40vh] min-h-[300px]">
                        {post.coverImage ? (
                            <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
                                <span className="text-slate-600 font-bold text-xl">Cover Image</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/60 to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                            <div className="flex items-center gap-4 text-sm text-purple-300 mb-4 font-mono">
                                <span className="bg-purple-500/20 border border-purple-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-purple-200">
                                    {post.category || "News"}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                {post.title}
                            </h1>

                            {post.author && (
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
                                        <User className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">{post.author}</p>
                                        <p className="text-xs text-slate-500">Author</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="px-8 md:px-12 py-8 max-w-4xl mx-auto">
                        <div className="prose prose-invert prose-lg max-w-none text-slate-300 prose-headings:text-white prose-a:text-purple-400 prose-img:rounded-xl">
                            {/* Ideally use a Markdown renderer here if content is MD, or dangerouslySetInnerHTML if HTML */}
                            {/* For safety and simplicity, identifying content type or just rendering as text if unsure */}
                            <CustomMarkdownRenderer content={post.content} />
                        </div>
                    </div>

                    <div className="px-8 md:px-12 pb-12 pt-8 border-t border-white/5 mt-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Share this article</h3>
                                <p className="text-slate-400 text-sm">Spread the knowledge with your network</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button variant="outline" size="sm" className="gap-2 border-white/10 hover:bg-white/5" onClick={() => handleShare('twitter')}>
                                    <Twitter className="h-4 w-4 text-[#1DA1F2]" />
                                    Twitter
                                </Button>
                                <Button variant="outline" size="sm" className="gap-2 border-white/10 hover:bg-white/5" onClick={() => handleShare('linkedin')}>
                                    <Linkedin className="h-4 w-4 text-[#0A66C2]" />
                                    LinkedIn
                                </Button>
                                <Button variant="outline" size="sm" className="gap-2 border-white/10 hover:bg-white/5" onClick={() => handleShare('facebook')}>
                                    <Facebook className="h-4 w-4 text-[#1877F2]" />
                                    Facebook
                                </Button>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
