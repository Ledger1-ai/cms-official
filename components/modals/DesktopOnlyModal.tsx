"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Monitor, X } from "lucide-react";

interface DesktopOnlyModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function DesktopOnlyModal({ open, onOpenChange }: DesktopOnlyModalProps) {
    return (
        <Dialog open={open} onOpenChange={(val) => {
            // Prevent closing by clicking outside or pressing escape if it's meant to be blocking
            // We only allow onOpenChange to run if it's strictly controlled by parent logic if needed,
            // but for a strict "Desktop Only" enforcement, we essentially ignore false values from UI interactions.
            if (!val) return;
            onOpenChange(val);
        }}>
            <DialogContent
                className="sm:max-w-md bg-slate-950 border-slate-800 text-slate-100 shadow-2xl [&>button]:hidden pointer-events-auto"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader className="gap-2 items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                        <Monitor className="h-8 w-8 text-blue-500" />
                    </div>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                        Desktop Experience Required
                    </DialogTitle>
                    <DialogDescription className="text-slate-400 text-base leading-relaxed max-w-[90%] mx-auto">
                        This feature is optimized for larger screens to provide the best website building experience. <br /><br />
                        Please switch to a desktop or laptop to access the Demo Visual Builder.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="sm:justify-center w-full mt-4">
                    <Button
                        variant="ghost"
                        asChild
                        className="w-full text-slate-400 hover:text-white hover:bg-white/10"
                    >
                        <a href="/">Return Home</a>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
