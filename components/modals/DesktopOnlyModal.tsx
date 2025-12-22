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
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-slate-950 border-slate-800 text-slate-100 shadow-2xl">
                <DialogHeader className="gap-2 items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                        <Monitor className="h-8 w-8 text-blue-500" />
                    </div>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                        Desktop Experience Required
                    </DialogTitle>
                    <DialogDescription className="text-slate-400 text-base leading-relaxed max-w-[90%] mx-auto">
                        For the best experience, the Visual Builder is optimized for larger screens. Please visit us on a desktop or laptop to build your site.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="sm:justify-center w-full mt-4">
                    <Button
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        className="w-full text-slate-400 hover:text-white hover:bg-white/10"
                    >
                        Got it, thanks
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
