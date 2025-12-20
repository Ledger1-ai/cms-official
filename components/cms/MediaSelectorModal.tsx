"use client";

import { useEffect, useState, useCallback } from "react";
import NextImage from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Loader2, Upload, Search, X, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { MediaPreview } from "./MediaPreview"; // Ensure this import path is correct or adjust if generic

interface MediaItem {
    id: string;
    url: string;
    filename: string;
    mimeType: string;
    title?: string;
}

interface MediaSelectorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (url: string) => void;
}

export function MediaSelectorModal({ isOpen, onClose, onSelect }: MediaSelectorModalProps) {
    const [activeTab, setActiveTab] = useState<"library" | "upload">("library");
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [uploading, setUploading] = useState(false);

    const fetchMedia = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/media?search=${search}&scope=mine`); // Default to mine for now
            const data = await res.json();
            setMedia(data.items || []);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load media");
        } finally {
            setLoading(false);
        }
    }, [search]);

    useEffect(() => {
        if (isOpen && activeTab === "library") {
            fetchMedia();
        }
    }, [isOpen, activeTab, search, fetchMedia]);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        setUploading(true);
        for (const file of acceptedFiles) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error(`File ${file.name} is too large (max 5MB)`);
                continue;
            }

            // Client-side preview / base64 for MVP (matching media page logic)
            // Ideally this should use a proper upload endpoint returning a URL
            try {
                const reader = new FileReader();
                const base64Url = await new Promise<string>((resolve) => {
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.readAsDataURL(file);
                });

                // Save to DB
                await fetch("/api/media", {
                    method: "POST",
                    body: JSON.stringify({
                        url: base64Url,
                        filename: file.name,
                        mimeType: file.type,
                        size: file.size,
                        title: file.name,
                        isPublic: true,
                    }),
                });

                toast.success("Uploaded " + file.name);
            } catch (e) {
                console.error(e);
                toast.error("Failed to upload " + file.name);
            }
        }
        setUploading(false);
        setActiveTab("library"); // Switch to library to show new files
        fetchMedia();
    }, [fetchMedia]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': [],
            'video/*': []
        }
    });

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-4xl w-full p-0 bg-[#0A0A0B] border border-white/10 text-white h-[80vh] flex flex-col overflow-hidden">
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-slate-900/50">
                    <DialogTitle>Select Media</DialogTitle>
                    <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full"><X className="h-5 w-5" /></button>
                </div>

                <div className="flex border-b border-white/5 bg-slate-900/30">
                    <button
                        onClick={() => setActiveTab("library")}
                        className={cn(
                            "px-6 py-3 text-sm font-medium border-b-2 transition-colors",
                            activeTab === "library" ? "border-blue-500 text-blue-400 bg-blue-500/5" : "border-transparent text-slate-400 hover:text-slate-200"
                        )}
                    >
                        Media Library
                    </button>
                    <button
                        onClick={() => setActiveTab("upload")}
                        className={cn(
                            "px-6 py-3 text-sm font-medium border-b-2 transition-colors",
                            activeTab === "upload" ? "border-blue-500 text-blue-400 bg-blue-500/5" : "border-transparent text-slate-400 hover:text-slate-200"
                        )}
                    >
                        Upload New
                    </button>
                </div>

                {activeTab === "library" && (
                    <div className="flex-1 flex flex-col p-4 overflow-hidden">
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search..."
                                className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 focus:border-blue-500/50 outline-none"
                            />
                        </div>

                        {loading ? (
                            <div className="flex-1 flex items-center justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                            </div>
                        ) : (
                            <div className="flex-1 overflow-y-auto grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-1">
                                {media.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => {
                                            onSelect(item.url);
                                            onClose();
                                        }}
                                        className="group relative aspect-square bg-slate-900 rounded-lg overflow-hidden cursor-pointer border border-white/5 hover:border-blue-500 transition-all hover:scale-[1.02]"
                                    >
                                        <div className="w-full h-full p-2 flex items-center justify-center relative">
                                            {item.mimeType.startsWith("image") ? (
                                                <NextImage src={item.url} alt={item.title || "Image"} fill className="object-contain" unoptimized />
                                            ) : (
                                                <div className="flex flex-col items-center gap-2 text-slate-500">
                                                    <ImageIcon className="h-8 w-8" />
                                                    <span className="text-[10px] uppercase">{item.mimeType.split('/')[1]}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md font-medium">Select</span>
                                        </div>
                                    </div>
                                ))}
                                {media.length === 0 && (
                                    <div className="col-span-full flex flex-col items-center justify-center text-slate-500 py-10">
                                        <p>No media found.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "upload" && (
                    <div className="flex-1 flex flex-col items-center justify-center p-8">
                        <div
                            {...getRootProps()}
                            className={cn(
                                "border-2 border-dashed border-white/10 rounded-2xl p-12 text-center transition-all cursor-pointer group max-w-xl w-full bg-slate-900/20",
                                isDragActive ? "border-blue-500/50 bg-blue-500/5 text-blue-400" : "hover:border-white/20 hover:bg-white/5",
                                uploading && "pointer-events-none opacity-50"
                            )}
                        >
                            <input {...getInputProps()} />
                            {uploading ? (
                                <div className="flex flex-col items-center gap-4">
                                    <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
                                    <p className="text-lg font-medium">Uploading...</p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-4">
                                    <div className="h-16 w-16 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Upload className="h-8 w-8 text-slate-400 group-hover:text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-lg font-medium text-slate-300">
                                            {isDragActive ? "Drop files here" : "Drag & drop or Click to Upload"}
                                        </p>
                                        <p className="text-sm text-slate-500">Supports JPG, PNG, WEBP, MP4</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
