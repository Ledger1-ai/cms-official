"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Sparkles, MessageSquare, Search, Loader2, Check } from "lucide-react";
import { generateMediaSEO } from "@/actions/cms/generate-media-seo";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface MediaItem {
    id: string;
    url: string;
    filename: string;
    description?: string;
    title?: string;
    altText?: string;
    caption?: string;
}

interface MediaAiModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: MediaItem | null;
    onUpdate: (updates: Partial<MediaItem>) => Promise<void>;
}

export function MediaAiModal({ isOpen, onClose, item, onUpdate }: MediaAiModalProps) {
    const [activeTab, setActiveTab] = useState("seo");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedSeo, setGeneratedSeo] = useState<any>(null);

    // Reset state when item changes or modal opens
    useEffect(() => {
        if (isOpen) {
            setGeneratedSeo(null);
        }
    }, [item?.id, isOpen]);

    const handleGenerateSEO = async () => {
        if (!item) return;
        setIsGenerating(true);
        try {
            const result = await generateMediaSEO(item.filename, item.description, item.url);
            setGeneratedSeo(result);
            toast.success("SEO Suggestions Generated");
        } catch (error) {
            toast.error("Failed to generate SEO");
        } finally {
            setIsGenerating(false);
        }
    };

    const applySeo = async () => {
        if (!generatedSeo) return;
        await onUpdate({
            title: generatedSeo.title,
            altText: generatedSeo.altText,
            caption: generatedSeo.caption,
            description: generatedSeo.description,
        });
        toast.success("SEO Applied!");
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] border-white/10 bg-[#0F1115] text-white p-0 gap-0 overflow-hidden">
                <div className="p-6 bg-gradient-to-b from-indigo-500/10 to-transparent border-b border-white/5">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-xl">
                            <Sparkles className="h-5 w-5 text-indigo-400" />
                            AI Media Assistant
                        </DialogTitle>
                        <DialogDescription className="text-slate-400">
                            Enhance your media assets with intelligent tools.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="px-6 border-b border-white/5 bg-black/20">
                        <TabsList className="bg-transparent h-auto p-0 gap-6">
                            <TabsTrigger
                                value="seo"
                                className="data-[state=active]:bg-transparent data-[state=active]:text-indigo-400 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 rounded-none px-0 py-4 text-slate-400 hover:text-white transition-colors"
                            >
                                <Search className="h-4 w-4 mr-2" />
                                SEO Optimizer
                            </TabsTrigger>
                            <TabsTrigger
                                value="assistant"
                                className="data-[state=active]:bg-transparent data-[state=active]:text-indigo-400 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 rounded-none px-0 py-4 text-slate-400 hover:text-white transition-colors"
                            >
                                <MessageSquare className="h-4 w-4 mr-2" />
                                AI Chat
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="p-6 min-h-[300px]">
                        <TabsContent value="seo" className="mt-0 space-y-6">
                            <div className="bg-slate-900/50 rounded-xl p-4 border border-white/5">
                                <h4 className="text-sm font-medium text-slate-300 mb-2">Current Context</h4>
                                <div className="text-xs text-slate-500 space-y-1">
                                    <p><span className="text-slate-400">Filename:</span> {item?.filename}</p>
                                    <p><span className="text-slate-400">Current Title:</span> {item?.title || "None"}</p>
                                </div>
                            </div>

                            {!generatedSeo ? (
                                <div className="text-center py-8">
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/10">
                                        <Search className="h-6 w-6 text-indigo-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-white mb-2">Generate SEO Metadata</h3>
                                    <p className="text-sm text-slate-400 max-w-xs mx-auto mb-6">
                                        Automatically generate optimized titles, alt text, and captions based on your image filename and context.
                                    </p>
                                    <Button
                                        onClick={handleGenerateSEO}
                                        disabled={isGenerating}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[200px]"
                                    >
                                        {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                                        Generate Metadata
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="space-y-3">
                                        <div className="space-y-1">
                                            <label className="text-xs font-medium text-slate-500">Suggested Title</label>
                                            <div className="p-3 bg-slate-900 border border-white/10 rounded-lg text-sm text-white">
                                                {generatedSeo.title}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-medium text-slate-500">Suggested Alt Text</label>
                                            <div className="p-3 bg-slate-900 border border-white/10 rounded-lg text-sm text-white">
                                                {generatedSeo.altText}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-medium text-slate-500">Suggested Caption</label>
                                            <div className="p-3 bg-slate-900 border border-white/10 rounded-lg text-sm text-white">
                                                {generatedSeo.caption}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <Button variant="ghost" onClick={() => setGeneratedSeo(null)} className="flex-1 text-slate-400 hover:text-white">
                                            Discard
                                        </Button>
                                        <Button onClick={applySeo} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                                            <Check className="mr-2 h-4 w-4" />
                                            Apply Changes
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="assistant" className="mt-0">
                            <div className="flex flex-col h-[300px] items-center justify-center text-center p-4">
                                <MessageSquare className="h-10 w-10 text-slate-600 mb-4" />
                                <h3 className="text-lg font-medium text-slate-300">AI Chat Coming Soon</h3>
                                <p className="text-sm text-slate-500 max-w-xs mt-2">
                                    Chat with your media assets to ask questions or request specific edits.
                                </p>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
