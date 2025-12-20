"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ContactForm from "@/components/forms/ContactForm";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#0F0F1A] border-white/10 text-white sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        Get in Touch
                    </DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Our team is ready to help you optimize your industry workflows.
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    <ContactForm onSuccess={onClose} source="MODAL" />
                </div>
            </DialogContent>
        </Dialog>
    );
}
