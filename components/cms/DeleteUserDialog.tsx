"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2 } from "lucide-react";

interface DeleteUserDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
    userName?: string;
}

export function DeleteUserDialog({ isOpen, onClose, onConfirm, loading, userName }: DeleteUserDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md bg-zinc-950/95 backdrop-blur-xl border border-white/10 text-white shadow-2xl z-[99999]">
                <DialogHeader className="flex flex-col items-center gap-4 text-center sm:text-left">
                    <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center mb-2 mx-auto sm:mx-0">
                        <AlertTriangle className="h-6 w-6 text-red-500" />
                    </div>
                    <div className="w-full text-center sm:text-left">
                        <DialogTitle className="text-xl font-bold text-white mb-2">Delete User Account</DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            Are you sure you want to delete <span className="font-semibold text-white">{userName || "this user"}</span>?
                            This action cannot be undone and will permanently remove their access and data.
                        </DialogDescription>
                    </div>
                </DialogHeader>
                <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row gap-2 sm:justify-end w-full">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onClose}
                        disabled={loading}
                        className="w-full sm:w-auto hover:bg-white/5 text-zinc-400 hover:text-white border border-transparent hover:border-white/10"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white border-0 shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all hover:shadow-[0_0_25px_rgba(220,38,38,0.7)]"
                    >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Delete User
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
