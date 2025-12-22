"use client";

import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Sparkles, X, Settings, LayoutTemplate, Plus, Trash2, GripVertical, Calendar, Upload, ListChecks, CheckSquare, AlignLeft, Type, Code, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { generateFormFields } from "@/actions/cms/ai-form-generator";

interface CreateFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: any;
}

// Enterprise Field Types
type FieldType = "text" | "email" | "tel" | "url" | "textarea" | "select" | "radio" | "checkbox" | "date" | "file";

interface FormField {
    id: string;
    type: FieldType;
    label: string;
    placeholder?: string;
    required?: boolean;
    options?: string[]; // For select/radio/checkbox
    width?: "full" | "half";
    helpText?: string;
}

const FIELD_ICONS: Record<FieldType, any> = {
    text: Type,
    email: Type,
    tel: Type,
    url: Type,
    textarea: AlignLeft,
    select: ListChecks,
    radio: ListChecks,
    checkbox: CheckSquare,
    date: Calendar,
    file: Upload
};

export function CreateFormModal({ isOpen, onClose, initialData }: CreateFormModalProps) {
    const [loading, setLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [aiPrompt, setAiPrompt] = useState("");
    const [tab, setTab] = useState<"basic" | "builder" | "preview">("basic");
    const [aiLogs, setAiLogs] = useState<string[]>([]);

    // Animation refs
    const scrollEndRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        project: "",
        isPublic: false,
        content: {
            fields: [] as FormField[]
        }
    });

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    title: initialData.title || "",
                    description: initialData.description || "",
                    project: initialData.project || "",
                    isPublic: initialData.isPublic || false,
                    content: initialData.content || { fields: [] }
                });
            } else {
                // Reset for new form
                setFormData({
                    title: "",
                    description: "",
                    project: "",
                    isPublic: false,
                    content: { fields: [] }
                });
                setTab("basic");
            }
            setAiPrompt("");
            setAiLogs([]);
        }
    }, [isOpen, initialData]);

    const handleSave = async (status: "DRAFT" | "ACTIVE" = "ACTIVE") => {
        if (!formData.title) {
            toast.error("Form name is required");
            return;
        }

        setLoading(true);
        try {
            const method = initialData ? "PUT" : "POST";
            // Ensure status comes from argument, or default to DRAFT if creating
            const finalStatus = status;

            const body = initialData
                ? { ...formData, id: initialData.id, status: finalStatus }
                : { ...formData, status: finalStatus };

            const res = await fetch("/api/forms", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (!res.ok) throw new Error("Failed to save");

            toast.success(initialData ? "Form updated" : `Form created as ${finalStatus}`);
            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // Helper to simulate "typing" or "building" effect
    const addFieldWithDelay = async (field: FormField, delay = 600) => {
        await new Promise(r => setTimeout(r, delay));
        setFormData(prev => ({
            ...prev,
            content: {
                fields: [...prev.content.fields, field]
            }
        }));
        // Scroll to bottom
        setTimeout(() => scrollEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    };

    const handleAiEnhance = async () => {
        if (!aiPrompt.trim()) return;
        setIsGenerating(true);
        setAiLogs([]);
        setTab("builder"); // Move to builder to watch "creation"

        try {
            // 1. Initial Analyzing Log
            const log = (msg: string) => setAiLogs(prev => [...prev, msg]);
            log(`Analyzing request: "${aiPrompt}"...`);

            // 2. Call Server Action
            const result = await generateFormFields(aiPrompt);

            if (!result.success || !result.data) {
                toast.error(result.error || "Failed to generate form");
                setIsGenerating(false);
                return;
            }

            const { title, description, fields } = result.data;

            // 3. Update basic info
            setFormData(prev => ({
                ...prev,
                title: prev.title || title,
                description: prev.description || description
            }));

            log(`Plan created: ${fields.length} fields detected.`);
            await new Promise(r => setTimeout(r, 800));

            // 4. "Execute" the tool calls loop
            for (const field of fields) {
                // Ensure unique ID
                const uniqueId = field.id || `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

                log(`Tool Call: createField({ label: "${field.label}", type: "${field.type}" })`);

                // Add field with animation delay
                await addFieldWithDelay({
                    ...field,
                    id: uniqueId,
                    type: field.type as FieldType, // Trusting Schema
                    width: field.width as "full" | "half"
                }, 800);
            }

            log("Form generation complete.");
            toast.success("Form generated successfully!");

        } catch (err) {
            console.error(err);
            toast.error("AI generation failed");
        } finally {
            setIsGenerating(false);
        }
    };

    const addFieldManually = () => {
        setFormData(prev => ({
            ...prev,
            content: {
                fields: [...prev.content.fields, { id: `field_${Date.now()}`, type: "text", label: "New Field", width: "full" }]
            }
        }));
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent hideClose className="max-w-6xl bg-[#0A0A0B] border border-white/10 text-white p-0 overflow-hidden shadow-2xl rounded-2xl h-[90vh] flex flex-col">
                <DialogTitle className="sr-only">Create Form</DialogTitle>

                {/* Header */}
                <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/40 flex-shrink-0">
                    <div>
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <LayoutTemplate className="h-5 w-5 text-teal-400" />
                            {initialData ? "Edit Form" : "AI Form Builder"}
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar Tabs */}
                    <div className="w-64 border-r border-white/5 bg-white/[0.02] p-2 flex-shrink-0 flex flex-col gap-1">
                        <Button variant="ghost" onClick={() => setTab("basic")} className={cn("justify-start", tab === "basic" && "bg-teal-500/10 text-teal-400")}>
                            <Settings className="mr-2 h-4 w-4" /> Basic Settings
                        </Button>
                        <Button variant="ghost" onClick={() => setTab("builder")} className={cn("justify-start", tab === "builder" && "bg-teal-500/10 text-teal-400")}>
                            <LayoutTemplate className="mr-2 h-4 w-4" /> Builder
                        </Button>
                        <Button variant="ghost" onClick={() => setTab("preview")} className={cn("justify-start", tab === "preview" && "bg-teal-500/10 text-teal-400")}>
                            <Sparkles className="mr-2 h-4 w-4" /> Live Preview
                        </Button>

                        <div className="mt-auto p-4 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 rounded-xl border border-white/10 shadow-lg">
                            <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                                <Wand2 className="h-4 w-4 text-amber-400" />
                                AI Assistant
                            </h4>
                            <p className="text-xs text-slate-400 mb-3">
                                Describe the form you want (e.g., "Vendor onboarding form with upload").
                            </p>
                            <Textarea
                                value={aiPrompt}
                                onChange={e => setAiPrompt(e.target.value)}
                                placeholder="I need a standardized intake form for..."
                                className="min-h-[100px] mb-3 text-xs bg-black/50 border-white/10 focus-visible:ring-amber-500/50 resize-none rounded-lg"
                            />
                            <Button
                                size="sm"
                                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-medium border-0 shadow-lg shadow-amber-900/20 transition-all active:scale-95"
                                onClick={handleAiEnhance}
                                disabled={isGenerating || !aiPrompt}
                            >
                                {isGenerating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
                                {isGenerating ? "Building..." : "Generate Form"}
                            </Button>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 overflow-y-auto bg-[#0A0A0B] relative scroll-smooth">
                        {/* AI Overlay Logs */}
                        {isGenerating && (
                            <div className="absolute top-4 right-4 z-50 w-80 pointer-events-none">
                                <div className="bg-black/80 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl p-4 space-y-3">
                                    <div className="flex items-center gap-3 text-amber-400">
                                        <div className="p-2 bg-amber-500/10 rounded-lg">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        </div>
                                        <span className="text-sm font-medium">AI Agent Working...</span>
                                    </div>
                                    <div className="space-y-1 font-mono text-[10px] text-green-400 max-h-40 overflow-hidden">
                                        {aiLogs.slice(-5).map((log, i) => ( // Show last 5 logs
                                            <div key={i} className="opacity-90 pl-2 py-1 border-l border-green-500/30 animate-in fade-in slide-in-from-right-2">
                                                {`> ${log}`}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {tab === "basic" && (
                            <div className="p-12 max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold text-white tracking-tight">Form Settings</h1>
                                    <p className="text-slate-400">Configure the basic details and visibility of your form.</p>
                                </div>

                                <div className="space-y-6 bg-white/[0.02] p-6 rounded-2xl border border-white/5">
                                    <div className="space-y-3">
                                        <Label className="text-slate-300">Form Title</Label>
                                        <Input
                                            value={formData.title}
                                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                                            className="bg-black/20 border-white/10 h-10 text-lg"
                                            placeholder="e.g. Vendor Intake Form"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-slate-300">Description</Label>
                                        <Textarea
                                            value={formData.description}
                                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                                            className="bg-black/20 border-white/10 min-h-[100px]"
                                            placeholder="Enter a brief description for the form header..."
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-teal-900/10 to-transparent rounded-2xl border border-teal-900/20">
                                    <div>
                                        <h4 className="font-semibold text-teal-100 mb-1">Public Access</h4>
                                        <p className="text-sm text-teal-400/60">Allow users outside your organization to submit this form.</p>
                                    </div>
                                    <Switch
                                        checked={formData.isPublic}
                                        onCheckedChange={c => setFormData({ ...formData, isPublic: c })}
                                        className="data-[state=checked]:bg-teal-500"
                                    />
                                </div>
                            </div>
                        )}

                        {tab === "builder" && (
                            <div className="p-8 max-w-4xl mx-auto">
                                <div className="flex justify-between items-center mb-8 sticky top-0 z-10 bg-[#0A0A0B]/95 backdrop-blur py-4 border-b border-white/5">
                                    <div>
                                        <h3 className="text-xl font-bold text-white">Form Canvas</h3>
                                        <p className="text-sm text-slate-400">{formData.content.fields.length} fields configured</p>
                                    </div>
                                    <Button size="sm" variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-0" onClick={addFieldManually}>
                                        <Plus className="h-4 w-4 mr-2" /> Add Manually
                                    </Button>
                                </div>

                                <div className="space-y-4 pb-20">
                                    {formData.content.fields.length === 0 && (
                                        <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-2xl bg-white/[0.01]">
                                            <div className="p-4 bg-black/50 rounded-full w-fit mx-auto mb-4">
                                                <LayoutTemplate className="h-8 w-8 text-slate-500" />
                                            </div>
                                            <h3 className="text-lg font-medium text-slate-300 mb-1">Your canvas is empty</h3>
                                            <p className="text-slate-500 max-w-sm mx-auto">
                                                Use the <span className="text-amber-400 font-medium">AI Assistant</span> in the sidebar to generate a form in seconds, or add fields manually.
                                            </p>
                                        </div>
                                    )}

                                    {formData.content.fields.map((field, idx) => {
                                        const RemoveField = () => {
                                            const newFields = [...formData.content.fields];
                                            newFields.splice(idx, 1);
                                            setFormData({ ...formData, content: { fields: newFields } });
                                        };

                                        const UpdateField = (updates: Partial<FormField>) => {
                                            const newFields = [...formData.content.fields];
                                            newFields[idx] = { ...newFields[idx], ...updates };
                                            setFormData({ ...formData, content: { fields: newFields } });
                                        };

                                        const Icon = FIELD_ICONS[field.type] || Type;

                                        return (
                                            <div key={idx} className="group relative bg-[#13151A] border border-white/5 rounded-xl p-5 hover:border-teal-500/30 transition-all hover:shadow-lg animate-in slide-in-from-bottom-2 duration-500">
                                                {/* Card Header & Controls */}
                                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => {/* Move Up */ }} className="h-8 w-8 text-slate-500 hover:text-white hover:bg-white/10">
                                                        {/* Implement drag/drop later, use icons for now */}
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={RemoveField} className="h-8 w-8 text-slate-500 hover:text-red-400 hover:bg-red-950/30">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>

                                                <div className="flex gap-5">
                                                    <div className="mt-4 text-slate-700 cursor-move group-hover:text-slate-400 transition-colors">
                                                        <GripVertical className="h-5 w-5" />
                                                    </div>

                                                    <div className="flex-1 space-y-5">
                                                        {/* Top Row: Label & Type */}
                                                        <div className="grid grid-cols-12 gap-5">
                                                            <div className="col-span-8">
                                                                <Label className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2 block">Field Label</Label>
                                                                <Input
                                                                    value={field.label}
                                                                    onChange={e => UpdateField({ label: e.target.value })}
                                                                    className="bg-black/30 border-white/10 text-white focus:border-teal-500/50 transition-colors"
                                                                    placeholder="e.g. Email Address"
                                                                />
                                                            </div>
                                                            <div className="col-span-4">
                                                                <Label className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2 block">Input Type</Label>
                                                                <Select value={field.type} onValueChange={(v: any) => UpdateField({ type: v })}>
                                                                    <SelectTrigger className="bg-black/30 border-white/10 text-slate-300">
                                                                        <div className="flex items-center gap-2">
                                                                            <Icon className="h-4 w-4 text-teal-500" />
                                                                            <SelectValue />
                                                                        </div>
                                                                    </SelectTrigger>
                                                                    <SelectContent className="bg-[#18181b] border-white/10 text-white max-h-60">
                                                                        {Object.keys(FIELD_ICONS).map(t => (
                                                                            <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        </div>

                                                        {/* Settings Row */}
                                                        <div className="flex items-center gap-6 p-3 bg-white/[0.02] rounded-lg border border-white/5">
                                                            <div className="flex items-center gap-3">
                                                                <Switch
                                                                    checked={field.required}
                                                                    onCheckedChange={c => UpdateField({ required: c })}
                                                                    className="data-[state=checked]:bg-teal-500 scale-90"
                                                                    id={`req_${idx}`}
                                                                />
                                                                <Label htmlFor={`req_${idx}`} className="text-sm text-slate-300 cursor-pointer">Required</Label>
                                                            </div>
                                                            <div className="w-px h-4 bg-white/10" />
                                                            <div className="flex items-center gap-3">
                                                                <Switch
                                                                    checked={field.width === "half"}
                                                                    onCheckedChange={c => UpdateField({ width: c ? "half" : "full" })}
                                                                    className="data-[state=checked]:bg-teal-500 scale-90"
                                                                    id={`width_${idx}`}
                                                                />
                                                                <Label htmlFor={`width_${idx}`} className="text-sm text-slate-300 cursor-pointer">Half Width</Label>
                                                            </div>
                                                        </div>

                                                        {/* Conditional Options */}
                                                        {(field.type === "select" || field.type === "radio" || field.type === "checkbox") && (
                                                            <div className="animate-in fade-in slide-in-from-top-1">
                                                                <Label className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2 block">Options</Label>
                                                                <Input
                                                                    value={field.options?.join(", ") || ""}
                                                                    onChange={e => UpdateField({ options: e.target.value.split(",").map(s => s.trim()) })}
                                                                    placeholder="Option 1, Option 2, Option 3 (comma separated)"
                                                                    className="bg-black/30 border-white/10 text-white"
                                                                />
                                                            </div>
                                                        )}

                                                        {(field.type === "file" || field.type === "textarea" || field.type === "text") && (
                                                            <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-1">
                                                                <div>
                                                                    <Label className="text-xs text-slate-500 mb-1 block">Placeholder</Label>
                                                                    <Input
                                                                        value={field.placeholder || ""}
                                                                        onChange={e => UpdateField({ placeholder: e.target.value })}
                                                                        className="h-8 bg-black/20 border-white/10 text-slate-400 text-xs"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Label className="text-xs text-slate-500 mb-1 block">Help Text</Label>
                                                                    <Input
                                                                        value={field.helpText || ""}
                                                                        onChange={e => UpdateField({ helpText: e.target.value })}
                                                                        className="h-8 bg-black/20 border-white/10 text-slate-400 text-xs"
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div ref={scrollEndRef} />
                                </div>
                            </div>
                        )}

                        {tab === "preview" && (
                            <div className="p-8 max-w-3xl mx-auto my-8">
                                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                                    {/* Mock Browser Header */}
                                    <div className="bg-slate-50 border-b border-slate-200 p-3 flex items-center gap-2">
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-red-400" />
                                            <div className="w-3 h-3 rounded-full bg-amber-400" />
                                            <div className="w-3 h-3 rounded-full bg-green-400" />
                                        </div>
                                        <div className="mx-auto text-xs font-medium text-slate-400 bg-white px-3 py-1 rounded-md border border-slate-200 shadow-sm">
                                            form.ledger.ai/view/{formData.project || "draft"}
                                        </div>
                                    </div>

                                    <div className="p-8 md:p-12">
                                        <div className="mb-8 border-b border-slate-100 pb-6">
                                            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{formData.title || "Untitled Form"}</h1>
                                            {formData.description && (
                                                <p className="text-slate-500 mt-3 text-lg leading-relaxed">{formData.description}</p>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                            {formData.content.fields.map((field, idx) => (
                                                <div key={idx} className={cn("space-y-2", field.width === "full" ? "col-span-2" : "col-span-1")}>
                                                    <Label className="text-slate-700 font-semibold block text-sm">
                                                        {field.label} {field.required && <span className="text-red-500">*</span>}
                                                    </Label>

                                                    {field.type === "textarea" ? (
                                                        <Textarea placeholder={field.placeholder} className="bg-slate-50 border-slate-200 resize-none focus:border-teal-500 focus:ring-teal-500/20" rows={4} disabled readOnly />
                                                    ) : (field.type === "select") ? (
                                                        <Select disabled>
                                                            <SelectTrigger className="bg-slate-50 border-slate-200 focus:ring-teal-500/20"><SelectValue placeholder="Select an option..." /></SelectTrigger>
                                                        </Select>
                                                    ) : (field.type === "radio") ? (
                                                        <div className="space-y-2.5">
                                                            {field.options?.map(opt => (
                                                                <div key={opt} className="flex items-center gap-2.5">
                                                                    <div className="h-4 w-4 rounded-full border border-slate-300 bg-white" />
                                                                    <span className="text-sm text-slate-600">{opt}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (field.type === "checkbox") ? (
                                                        <div className="space-y-2.5">
                                                            {field.options && field.options.length > 0 ? (
                                                                field.options.map(opt => (
                                                                    <div key={opt} className="flex items-center gap-2.5">
                                                                        <div className="h-4 w-4 rounded border border-slate-300 bg-white" />
                                                                        <span className="text-sm text-slate-600">{opt}</span>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div className="flex items-center gap-2.5">
                                                                    <div className="h-4 w-4 rounded border border-slate-300 bg-white" />
                                                                    <span className="text-sm text-slate-500">{field.label}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ) : (field.type === "file") ? (
                                                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-not-allowed">
                                                            <div className="w-10 h-10 bg-white rounded-full shadow-sm border border-slate-200 flex items-center justify-center mx-auto mb-3">
                                                                <Upload className="h-5 w-5 text-slate-400" />
                                                            </div>
                                                            <p className="text-sm font-medium text-slate-900">Upload a file</p>
                                                            <p className="text-xs text-slate-500 mt-1">{field.helpText || "Drag and drop or click to upload"}</p>
                                                        </div>
                                                    ) : (
                                                        <Input
                                                            type={field.type}
                                                            placeholder={field.placeholder}
                                                            className="bg-slate-50 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20 shadow-sm"
                                                            disabled readOnly
                                                        />
                                                    )}

                                                    {!["file"].includes(field.type) && field.helpText && (
                                                        <p className="text-[11px] text-slate-400">{field.helpText}</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-10 pt-8 border-t border-slate-100">
                                            <Button className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg shadow-lg shadow-slate-900/10 transition-all" disabled>
                                                Submit Form
                                            </Button>
                                            <p className="text-center text-xs text-slate-400 mt-4">
                                                Powered by Ledger CMS
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 border-t border-white/5 bg-[#0A0A0B] flex justify-end gap-3 flex-shrink-0 z-20">
                    <Button variant="ghost" onClick={onClose} className="text-slate-400 hover:text-white hover:bg-white/5">Cancel</Button>
                    <Button variant="ghost" onClick={() => handleSave("DRAFT")} className="text-amber-400 hover:text-amber-300 hover:bg-amber-900/10 border border-transparent hover:border-amber-900/30">
                        Save as Draft
                    </Button>
                    <Button onClick={() => handleSave("ACTIVE")} className="bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-900/20">
                        Create & Activate
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
