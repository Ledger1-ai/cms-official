"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface MessageSentModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
}

export default function MessageSentModal({
    isOpen,
    onClose,
    title = "Message Sent!",
    message = "We've received your message and will be in touch shortly."
}: MessageSentModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[425px] bg-[#0F1115]/90 backdrop-blur-xl border border-primary/20 text-white shadow-[0_0_50px_rgba(6,182,212,0.15)] rounded-2xl p-0 overflow-hidden">
                <div className="p-8 flex flex-col items-center text-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shadow-[0_0_30px_rgba(6,182,212,0.2)] mb-2 animate-in zoom-in duration-300">
                        <CheckCircle2 className="h-10 w-10 text-primary" />
                    </div>

                    <div>
                        <DialogTitle className="text-2xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-3">
                            {title}
                        </DialogTitle>

                        <DialogDescription className="text-gray-400 text-center text-base leading-relaxed">
                            {message}
                        </DialogDescription>
                    </div>
                </div>

                <div className="bg-white/5 p-6 flex justify-center border-t border-white/5">
                    <Button
                        onClick={onClose}
                        className="w-full bg-gradient-to-r from-primary to-cyan-600 hover:from-primary/90 hover:to-cyan-600/90 text-white shadow-lg shadow-cyan-900/20 transition-all duration-300 py-6 text-lg rounded-xl"
                    >
                        OK
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
