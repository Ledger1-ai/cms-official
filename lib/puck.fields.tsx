"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { askEditorAi } from "@/actions/cms/ask-editor-ai"; // Ensure this is a server action
import { toast } from "sonner";
import { Sparkles, Loader2, ArrowRight, Search, ChevronDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ICON_MAP } from "./puck.icons";
import { cn } from "@/lib/utils";
import { useEditor } from "@/components/landing/EditorContext";

export const AI_FIELD_RENDER = ({ name, onChange, value, field }: any) => {
    // Hooks must be inside the component function
    const [isLoading, setIsLoading] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const { isDemoMode, onDemoUpsell } = useEditor();

    const handleAiGenerate = async () => {
        if (!prompt.trim()) return;
        setIsLoading(true);

        const currentVal = value || "";
        const context = `Field: ${name}. Current Value: "${currentVal}".`;

        let instructions = `Rewrite or generate content for this field based on: "${prompt}". Return ONLY the text content, no quotes or explanations.`;
        if (name === "svgCode") {
            instructions += " Generate a highly detailed, professional, and visually stunning SVG. Use gradients, opacity, and complex paths where appropriate. Ensure it is responsive (viewBox) and uses currentColor for main strokes/fills if applicable. Return ONLY the SVG code.";
        }

        const result = await askEditorAi(instructions, context);

        if (result.success && result.text) {
            onChange(result.text);
            setIsOpen(false);
            setPrompt("");
            toast.success("Content generated!");
        } else {
            toast.error("AI generation failed.");
        }
        setIsLoading(false);
    };

    return (
        <div className="relative group/ai-field">
            {field?.type === 'textarea' ? (
                <textarea
                    className="w-full p-2 text-base border rounded-md bg-white border-slate-300 min-h-[100px] pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-sans"
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Enter text..."
                />
            ) : (
                <input
                    className="w-full p-2 text-base border rounded-md bg-white border-slate-300 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-sans"
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Enter text..."
                />
            )}

            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                        className={cn(
                            "absolute top-1 right-1 h-7 w-7 transition-colors",
                            isDemoMode
                                ? "text-slate-600 opacity-20 hover:opacity-40 cursor-pointer"
                                : "text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 opacity-70 group-hover/ai-field:opacity-100"
                        )}
                        title={isDemoMode ? "AI Generator (Demo)" : "Enhance with AI"}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (isDemoMode) {
                                e.preventDefault(); // Prevent popover
                                onDemoUpsell?.();
                            }
                        }}
                    >
                        <Sparkles className="h-3.5 w-3.5" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-3" side="left" align="start">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-semibold text-indigo-400">
                            <Sparkles className="h-4 w-4" /> AI Assistant
                        </div>
                        <div className="flex gap-2">
                            <Input
                                placeholder="E.g. 'Make it punchier' or 'Translate to Spanish'"
                                className="h-8 text-xs"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAiGenerate()}
                            />
                            <Button
                                size="sm"
                                className="h-8 w-8 p-0 bg-indigo-600 hover:bg-indigo-500"
                                onClick={handleAiGenerate}
                                disabled={isLoading || !prompt.trim()}
                            >
                                {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <ArrowRight className="h-3 w-3" />}
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {["Fix grammar", "Make shorter", "Professional tone", "Fun tone"].map(p => (
                                <button
                                    key={p}
                                    className="text-[10px] px-2 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition-colors border border-slate-200"
                                    onClick={() => {
                                        setPrompt(p);
                                    }}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export const IconPickerField = ({ name, onChange, value }: any) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const filteredIcons = Object.keys(ICON_MAP).filter(key =>
        key.toLowerCase().includes(search.toLowerCase())
    );

    const SelectedIcon = value && ICON_MAP[value] ? ICON_MAP[value] : null;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-white border-slate-300 hover:bg-slate-50 relative pr-8 text-slate-800"
                >
                    {SelectedIcon ? (
                        <>
                            <SelectedIcon className="mr-2 h-4 w-4 text-indigo-500" />
                            {value}
                        </>
                    ) : (
                        <span className="text-slate-500">Select icon...</span>
                    )}
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0 bg-white shadow-xl border-slate-200" align="start">
                <div className="flex items-center border-b px-3">
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50 text-slate-500" />
                    <Input
                        placeholder="Search icons..."
                        className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50 border-none focus:ring-0 text-slate-800"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <ScrollArea className="h-64 p-2">
                    <div className="grid grid-cols-4 gap-2">
                        {filteredIcons.map((iconName) => {
                            const Icon = ICON_MAP[iconName];
                            return (
                                <button
                                    key={iconName}
                                    onClick={() => {
                                        onChange(iconName);
                                        setOpen(false);
                                    }}
                                    className={cn(
                                        "flex flex-col items-center justify-center p-2 rounded-md hover:bg-slate-100 transition-colors gap-1 h-12 w-12",
                                        value === iconName ? "bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200" : "text-slate-600"
                                    )}
                                    title={iconName}
                                >
                                    <Icon className="h-5 w-5" />
                                </button>
                            );
                        })}
                    </div>
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );
};
