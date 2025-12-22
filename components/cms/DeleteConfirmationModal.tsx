"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2, AlertTriangle } from "lucide-react";

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading?: boolean;
    title?: string;
    description?: string;
}

export function DeleteConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    loading = false,
    title = "Are you absolutely sure?",
    description = "This action cannot be undone. This will permanently delete the item.",
}: DeleteConfirmationModalProps) {
    return (
        <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <AlertDialogContent className="bg-[#0A0A0B] backdrop-blur-xl border border-white/10 text-white shadow-2xl max-w-md w-full p-6 rounded-2xl">
                <AlertDialogHeader className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                        </div>
                        <AlertDialogTitle className="text-xl font-bold text-white">{title}</AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className="text-slate-400 pl-1">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-6 flex-row gap-3 sm:justify-end">
                    <AlertDialogCancel
                        disabled={loading}
                        onClick={onClose}
                        className="bg-transparent border border-white/10 text-slate-300 hover:bg-white/5 hover:text-white mt-0 border-0"
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={loading}
                        onClick={(e) => {
                            e.preventDefault();
                            onConfirm();
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white border-0 shadow-lg shadow-red-900/20"
                    >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
