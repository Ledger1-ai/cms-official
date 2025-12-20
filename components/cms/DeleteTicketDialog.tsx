"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle } from "lucide-react";

interface DeleteTicketDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    ticketId: string | null;
    isDeleting?: boolean;
}

export function DeleteTicketDialog({
    isOpen,
    onClose,
    onConfirm,
    isDeleting = false
}: DeleteTicketDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[425px] bg-[#0F1115]/90 backdrop-blur-xl border border-red-500/20 text-white shadow-[0_0_50px_rgba(239,68,68,0.15)] rounded-2xl p-0 overflow-hidden">
                <div className="p-6 flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)] mb-2">
                        <Trash2 className="h-8 w-8 text-red-500" />
                    </div>

                    <DialogTitle className="text-xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
                        Delete Ticket?
                    </DialogTitle>

                    <DialogDescription className="text-gray-400 text-center text-sm max-w-[280px]">
                        This action cannot be undone. This will permanently delete the support ticket and remove it from our servers.
                    </DialogDescription>
                </div>

                <div className="bg-white/5 p-4 flex gap-3 justify-center border-t border-white/5">
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        disabled={isDeleting}
                        className="text-gray-400 hover:text-white hover:bg-white/10"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="bg-red-500/80 hover:bg-red-500 text-white shadow-lg shadow-red-900/20 border border-red-400/20 transition-all duration-300"
                    >
                        {isDeleting ? "Deleting..." : "Delete Ticket"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
