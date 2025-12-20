"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogHeader,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, Globe, Image as ImageIcon, Video, Loader2 } from "lucide-react";

interface AddMediaLinkModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (url: string) => Promise<void>;
}

export function AddMediaLinkModal({
    isOpen,
    onClose,
    onConfirm,
}: AddMediaLinkModalProps) {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleConfirm = async () => {
        if (!url) {
            setError("Please enter a valid URL");
            return;
        }

        try {
            new URL(url); // Basic URL validation
        } catch (e) {
            setError("Please enter a valid URL (e.g., https://example.com/image.jpg)");
            return;
        }

        setError("");
        setLoading(true);
        try {
            await onConfirm(url);
            setUrl("");
            onClose();
        } catch (e) {
            // Error handling is likely done in the parent, but we can set specific errors here if needed
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleConfirm();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[500px] bg-[#0F1115]/95 backdrop-blur-xl border border-white/10 text-white shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-2xl p-0 overflow-hidden">
                {/* Header Visual */}
                <div className="bg-gradient-to-b from-blue-500/10 to-transparent p-6 flex flex-col items-center gap-4 border-b border-white/5">
                    <div className="h-16 w-16 rounded-2xl bg-[#0F1115] border border-blue-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                        <Globe className="h-8 w-8 text-blue-500" />
                    </div>
                    <div className="text-center">
                        <DialogTitle className="text-xl font-bold text-white">
                            Add External Link
                        </DialogTitle>
                        <DialogDescription className="text-slate-400 mt-1">
                            Import media from an external URL like YouTube, Vimeo, or a direct image link.
                        </DialogDescription>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                <Link className="h-4 w-4 text-blue-400" /> Media URL
                            </label>
                            <Input
                                value={url}
                                onChange={(e) => {
                                    setUrl(e.target.value);
                                    if (error) setError("");
                                }}
                                onKeyDown={handleKeyDown}
                                placeholder="https://..."
                                className="bg-slate-900/50 border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50"
                                autoFocus
                            />
                            {error && <p className="text-xs text-red-400">{error}</p>}
                        </div>

                        {/* Helper hints */}
                        <div className="flex gap-2">
                            <div className="flex-1 bg-slate-900/30 border border-white/5 rounded-lg p-3 flex items-start gap-3">
                                <div className="mt-0.5 p-1.5 bg-indigo-500/10 rounded-md text-indigo-400">
                                    <ImageIcon className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-300">Images</p>
                                    <p className="text-[10px] text-slate-500 leading-tight mt-0.5">Direct links to JPG, PNG, WEBP files.</p>
                                </div>
                            </div>
                            <div className="flex-1 bg-slate-900/30 border border-white/5 rounded-lg p-3 flex items-start gap-3">
                                <div className="mt-0.5 p-1.5 bg-rose-500/10 rounded-md text-rose-400">
                                    <Video className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-300">Videos</p>
                                    <p className="text-[10px] text-slate-500 leading-tight mt-0.5">YouTube, Vimeo, or MP4/WEBM files.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button
                            variant="ghost"
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 hover:bg-white/5 hover:text-white text-slate-400"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleConfirm}
                            disabled={loading}
                            variant="gradient"
                            className="flex-1 shadow-lg shadow-blue-900/20"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Adding...
                                </>
                            ) : (
                                "Add to Library"
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
