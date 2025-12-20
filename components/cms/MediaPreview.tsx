
import Image from "next/image";
import { FileIcon, FileVideo, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaPreviewProps {
    url: string;
    alt: string;
    mimeType?: string;
    className?: string;
}

export function MediaPreview({ url, alt, mimeType, className }: MediaPreviewProps) {
    // Helper to determine type if mimeType is missing (fallback)
    const isVideo = mimeType?.startsWith("video/") || url.match(/\.(mp4|webm|mov)$/i);
    const isPdf = mimeType === "application/pdf" || url.endsWith(".pdf");
    const isImage = mimeType?.startsWith("image/") || (!isVideo && !isPdf);

    return (
        <div className={cn("relative w-full h-full bg-slate-900 flex items-center justify-center overflow-hidden", className)}>
            {isImage && (
                <Image
                    src={url}
                    alt={alt || "Media asset"}
                    fill
                    className="object-contain transition-transform hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                />
            )}

            {isVideo && (
                <div className="flex flex-col items-center justify-center text-slate-500 w-full h-full bg-slate-900 group-hover:bg-slate-800 transition-colors">
                    <video
                        src={url}
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                        muted
                        playsInline
                        loop
                        onMouseOver={(e) => e.currentTarget.play()}
                        onMouseOut={(e) => {
                            e.currentTarget.pause();
                            e.currentTarget.currentTime = 0;
                        }}
                    />
                    <FileVideo className="h-8 w-8 relative z-10 text-white/50" />
                </div>
            )}

            {isPdf && (
                <div className="flex flex-col items-center justify-center text-slate-500 w-full h-full bg-slate-900 group-hover:bg-slate-800 transition-colors">
                    <FileText className="h-8 w-8 mb-2" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider">PDF Document</span>
                </div>
            )}

            {!isImage && !isVideo && !isPdf && (
                <div className="flex flex-col items-center justify-center text-slate-500">
                    <FileIcon className="h-8 w-8" />
                </div>
            )}
        </div>
    );
}
