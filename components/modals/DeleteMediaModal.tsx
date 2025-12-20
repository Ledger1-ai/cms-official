"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2, FileVideo, Image as ImageIcon, FileText } from "lucide-react";
import Image from "next/image";

interface MediaItem {
    id: string;
    url: string;
    filename: string;
    mimeType: string;
}

interface DeleteMediaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading?: boolean;
    item: MediaItem | null;
}

export function DeleteMediaModal({
    isOpen,
    onClose,
    onConfirm,
    loading = false,
    item
}: DeleteMediaModalProps) {
    if (!item) return null;

    const isImage = item.mimeType.startsWith("image/");
    const isVideo = item.mimeType.startsWith("video/");

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[400px] bg-[#0F1115]/95 backdrop-blur-xl border border-red-500/20 text-white shadow-[0_0_50px_rgba(239,68,68,0.15)] rounded-2xl p-0 overflow-hidden">
                {/* Header Visual */}
                <div className="bg-gradient-to-b from-red-500/10 to-transparent p-6 flex flex-col items-center gap-4 border-b border-red-500/10">
                    <div className="h-16 w-16 rounded-2xl bg-[#0F1115] border border-red-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                        <Trash2 className="h-8 w-8 text-red-500" />
                    </div>
                    <DialogTitle className="text-xl font-bold text-white">
                        Delete Asset?
                    </DialogTitle>
                </div>

                <div className="p-6 space-y-6">
                    {/* Content Preview */}
                    <div className="bg-black/40 rounded-xl border border-white/5 p-3 flex items-center gap-4">
                        <div className="h-14 w-14 rounded-lg bg-slate-900 border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center relative">
                            {isImage ? (
                                <Image
                                    src={item.url}
                                    alt={item.filename}
                                    fill
                                    className="object-cover"
                                    sizes="56px"
                                />
                            ) : isVideo ? (
                                <FileVideo className="h-6 w-6 text-slate-400" />
                            ) : (
                                <FileText className="h-6 w-6 text-slate-400" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{item.filename}</p>
                            <p className="text-xs text-slate-500 uppercase">{item.mimeType.split("/")[1]}</p>
                        </div>
                    </div>

                    <DialogDescription className="text-center text-slate-400 text-sm">
                        Are you sure you want to delete this file? This action cannot be undone and will remove it from all connected pages.
                    </DialogDescription>

                    <div className="flex gap-3">
                        <Button
                            variant="ghost"
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 hover:bg-white/5 hover:text-white"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={onConfirm}
                            disabled={loading}
                            className="flex-1 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white shadow-lg shadow-red-900/20"
                        >
                            {loading ? "Deleting..." : "Delete Forever"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
