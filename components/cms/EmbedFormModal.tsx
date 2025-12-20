"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface EmbedFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    formId: string;
    formTitle: string;
}

export function EmbedFormModal({ isOpen, onClose, formId, formTitle }: EmbedFormModalProps) {
    const [tab, setTab] = useState<"iframe" | "js">("iframe");
    const [copied, setCopied] = useState(false);

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://crm.ledger1.ai';
    const embedUrl = `${baseUrl}/forms/embed/${formId}`;

    // Snippets
    const iframeCode = `<!-- Ledger1CMS ${formTitle} Form Embed -->
<iframe 
  src="${embedUrl}" 
  width="100%" 
  height="600" 
  frameborder="0" 
  style="border: none; max-width: 100%; border-radius: 8px;"
></iframe>`;

    const jsCode = `<script>
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "${baseUrl}/scripts/embed.js?id=${formId}";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'ledger1-forms-js'));
</script>
<div id="ledger1-form-${formId}"></div>`;

    const handleCopy = () => {
        const text = tab === "iframe" ? iframeCode : jsCode;
        navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success("Code copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent hideClose className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[calc(100%-2rem)] max-w-3xl max-h-[85vh] flex flex-col bg-[#09090b] border border-white/10 text-white p-0 shadow-2xl rounded-2xl outline-none">
                <DialogTitle className="sr-only">Embed Form</DialogTitle>

                {/* Header - Fixed at top */}
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5 flex-shrink-0">
                    <div>
                        <h2 className="text-xl font-bold text-white">Embed Form: {formTitle}</h2>
                        <p className="text-sm text-slate-400">Copy the code below to add this form to your website</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="p-6 space-y-6 overflow-y-auto">
                    {/* Tabs */}
                    <div className="flex bg-slate-950 p-1 rounded-lg border border-white/10 w-fit">
                        <button
                            onClick={() => setTab("iframe")}
                            className={cn(
                                "px-4 py-2 rounded-md text-sm font-medium transition-all",
                                tab === "iframe" ? "bg-slate-800 text-white shadow" : "text-slate-400 hover:text-white"
                            )}
                        >
                            iFrame Embed
                        </button>
                        <button
                            onClick={() => setTab("js")}
                            className={cn(
                                "px-4 py-2 rounded-md text-sm font-medium transition-all",
                                tab === "js" ? "bg-slate-800 text-white shadow" : "text-slate-400 hover:text-white"
                            )}
                        >
                            JavaScript Snippet
                        </button>
                    </div>

                    <p className="text-sm text-slate-400">
                        {tab === "iframe"
                            ? "Simple embed - paste this into your HTML where you want the form to appear."
                            : "Advanced embed - allows the form to inherit styles and resize automatically."}
                    </p>

                    {/* Code Block */}
                    <div className="relative group">
                        <div className="absolute top-2 right-2 z-10">
                            <Button
                                size="sm"
                                variant="secondary"
                                onClick={handleCopy}
                                className="bg-white/10 hover:bg-white/20 text-white border border-white/10 gap-2 backdrop-blur-md"
                            >
                                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                                {copied ? "Copied" : "Copy"}
                            </Button>
                        </div>
                        <pre className="bg-[#0F1115] border border-white/10 rounded-xl p-6 overflow-x-auto text-sm font-mono text-slate-300 min-h-[200px] leading-relaxed whitespace-pre-wrap break-all">
                            {tab === "iframe" ? iframeCode : jsCode}
                        </pre>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
