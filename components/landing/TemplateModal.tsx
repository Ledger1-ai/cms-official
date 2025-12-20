"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { templates, Template, CATEGORY_LABELS, getTemplatesByCategory, getAllCategories } from "@/lib/puck.templates";
import { LayoutTemplate, Search, Check, Sparkles, AlertCircle, Rocket, ShoppingCart, Briefcase, Calendar, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Render } from "@measured/puck";
import { puckConfig } from "@/lib/puck.config";

interface TemplateModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelectTemplate: (template: Template) => void;
}

const CATEGORY_ICONS: Record<string, any> = {
    saas: Rocket,
    agency: Sparkles,
    portfolio: Users,
    ecommerce: ShoppingCart,
    business: Briefcase,
    event: Calendar,
};

export function TemplateModal({ open, onOpenChange, onSelectTemplate }: TemplateModalProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

    const categories = getAllCategories();

    const filteredTemplates = (selectedCategory === "all"
        ? templates
        : getTemplatesByCategory(selectedCategory as any)
    ).filter(t => {
        const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    // Debug duplicate IDs
    const ids = filteredTemplates.map(t => t.id);
    const duplicates = ids.filter((item, index) => ids.indexOf(item) !== index);
    if (duplicates.length > 0) console.error("DUPLICATE TEMPLATE IDS FOUND:", duplicates);

    const handleApply = () => {
        if (selectedTemplate) {
            onSelectTemplate(selectedTemplate);
            onOpenChange(false);
            setSelectedTemplate(null);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {/* Added [&>button]:hidden to hide the default Radix close button that overlaps */}
            <DialogContent className="max-w-[90vw] w-[1400px] h-[90vh] p-0 bg-slate-950 border-slate-800 text-slate-100 flex flex-col overflow-hidden shadow-2xl [&>button]:hidden">
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-900/50 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 rounded-lg">
                            <LayoutTemplate className="h-5 w-5 text-indigo-400" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                                Choose a Template
                            </DialogTitle>
                            <p className="text-sm text-slate-500">
                                Start with a professionally designed layout
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                            <Input
                                placeholder="Search templates..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-slate-600 focus:ring-indigo-500/50 rounded-full"
                            />
                        </div>
                        <Button
                            disabled={!selectedTemplate}
                            onClick={handleApply}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white min-w-[120px] rounded-full"
                        >
                            <Check className="mr-2 h-4 w-4" />
                            Apply Template
                        </Button>
                        <Button
                            onClick={() => onOpenChange(false)}
                            variant="ghost"
                            size="icon"
                            className="text-slate-500 hover:text-white rounded-full bg-white/5 hover:bg-white/10 ml-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x h-4 w-4"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </Button>
                    </div>
                </div>

                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar Categories */}
                    <div className="w-64 border-r border-white/5 bg-slate-900/30 p-4 flex flex-col gap-1 overflow-y-auto">
                        <Button
                            variant="ghost"
                            className={cn(
                                "justify-start w-full",
                                selectedCategory === "all" ? "bg-indigo-500/10 text-indigo-400" : "text-slate-400 hover:text-white hover:bg-white/5"
                            )}
                            onClick={() => setSelectedCategory("all")}
                        >
                            <LayoutTemplate className="mr-2 h-4 w-4" />
                            All Templates
                        </Button>
                        <div className="h-px bg-white/10 my-2 mx-1" />
                        {categories.map(cat => {
                            const Icon = CATEGORY_ICONS[cat] || LayoutTemplate;
                            return (
                                <Button
                                    key={cat}
                                    variant="ghost"
                                    className={cn(
                                        "justify-start w-full capitalize",
                                        selectedCategory === cat ? "bg-indigo-500/10 text-indigo-400" : "text-slate-400 hover:text-white hover:bg-white/5"
                                    )}
                                    onClick={() => setSelectedCategory(cat)}
                                >
                                    <Icon className="mr-2 h-4 w-4" />
                                    {CATEGORY_LABELS[cat] || cat}
                                </Button>
                            );
                        })}
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 flex overflow-hidden bg-slate-950">
                        {/* Template Grid */}
                        <ScrollArea className="flex-1 border-r border-white/5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredTemplates.map(template => (
                                    <div
                                        key={template.id}
                                        onClick={() => setSelectedTemplate(template)}
                                        className={cn(
                                            "group relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer",
                                            selectedTemplate?.id === template.id
                                                ? "border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)] bg-indigo-950/20"
                                                : "border-white/5 hover:border-white/20 hover:bg-white/5"
                                        )}
                                    >
                                        {/* Thumbnail / Mini Render */}
                                        <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                                            <div className="absolute inset-0 scale-[0.2] origin-top-left w-[500%] h-[500%] pointer-events-none select-none">
                                                <div className="w-full h-full bg-slate-950">
                                                    <Render config={puckConfig} data={template.data} />
                                                </div>
                                            </div>
                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                                            {/* Selected Indicator */}
                                            {selectedTemplate?.id === template.id && (
                                                <div className="absolute top-2 right-2 bg-indigo-600 text-white p-1.5 rounded-full shadow-lg animate-in zoom-in spin-in-12 duration-300">
                                                    <Check className="h-4 w-4" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-4 relative">
                                            <h3 className="font-semibold text-white mb-1">{template.name}</h3>
                                            <p className="text-xs text-slate-500 line-clamp-2">{template.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>

                        {/* Live Preview Panel (Right Side) */}
                        {selectedTemplate && (
                            <div className="w-[480px] flex flex-col border-l border-white/10 bg-slate-900/50 backdrop-blur-xl animate-in slide-in-from-right duration-500">
                                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-900">
                                    <h3 className="font-semibold text-white">Preview</h3>
                                    <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-400 capitalize border border-indigo-500/20">
                                        {CATEGORY_LABELS[selectedTemplate.category]}
                                    </span>
                                </div>
                                <div className="flex-1 overflow-y-auto bg-slate-950 custom-scrollbar relative">
                                    <div className="flex flex-col">
                                        {/* Scaled Render */}
                                        <div
                                            className="w-full origin-top-left"
                                            style={{ zoom: 0.65 }}
                                        >
                                            <div className="pointer-events-none select-none">
                                                <Render config={puckConfig} data={selectedTemplate.data} />
                                            </div>
                                        </div>

                                        {/* Massive Spacer to FORCE scroll functionality */}
                                        <div className="h-[400px] w-full shrink-0" />
                                    </div>
                                </div>
                                <div className="p-4 border-t border-white/10 bg-slate-900 z-10 relative shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.5)]">
                                    <Button
                                        onClick={handleApply}
                                        className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 hover:from-emerald-600 hover:via-teal-600 hover:to-indigo-600 text-white font-medium shadow-lg hover:shadow-emerald-500/20 rounded-full h-11"
                                    >
                                        Use This Template
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
