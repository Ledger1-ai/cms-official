"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2 } from "lucide-react";

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading?: boolean;
    title?: string;
    description?: string;
}

export default function DeleteConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    loading = false,
    title = "Delete Configuration?",
    description = "This action is irreversible. This will permanently delete the API key and configuration settings for this provider."
}: DeleteConfirmationModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[425px] bg-[#0F1115]/95 backdrop-blur-xl border border-red-500/20 text-white shadow-[0_0_50px_rgba(239,68,68,0.15)] rounded-2xl p-0 overflow-hidden">
                <div className="p-8 flex flex-col items-center text-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)] mb-2 animate-in zoom-in duration-300">
                        <AlertTriangle className="h-10 w-10 text-red-500" />
                    </div>

                    <div>
                        <DialogTitle className="text-2xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-3">
                            {title}
                        </DialogTitle>

                        <DialogDescription className="text-gray-400 text-center text-base leading-relaxed">
                            {description}
                        </DialogDescription>
                    </div>
                </div>

                <div className="bg-white/5 p-6 flex justify-center gap-4 border-t border-white/5">
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
                        className="flex-1 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white shadow-lg shadow-red-900/20 transition-all duration-300"
                    >
                        {loading ? "Deleting..." : "Delete Forever"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
