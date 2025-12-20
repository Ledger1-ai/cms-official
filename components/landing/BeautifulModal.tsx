"use client";

import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface BeautifulModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    className?: string;
}

export function BeautifulModal({ isOpen, onClose, children, title, className }: BeautifulModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className={cn(
                "bg-slate-950/90 border border-white/10 text-white backdrop-blur-xl shadow-2xl p-0 overflow-hidden sm:rounded-3xl max-w-lg w-full z-[100] [&>button.absolute]:hidden",
                className
            )}>
                <div className="absolute top-4 right-4 z-50">
                    <button
                        type="button"
                        className="rounded-full p-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors outline-none focus:ring-2 focus:ring-purple-500"
                        onClick={onClose}
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {title && <DialogTitle className="sr-only">{title}</DialogTitle>}

                <div className="relative">
                    {/* Background Effects */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-purple-500/20 blur-[60px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 blur-[40px] rounded-full pointer-events-none" />

                    <div className="relative z-10 p-8 sm:p-10">
                        {children}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
