"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock, Loader2 } from "lucide-react";

interface ResetPasswordDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
    userName?: string;
}

export function ResetPasswordDialog({ isOpen, onClose, onConfirm, loading, userName }: ResetPasswordDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md bg-[#0A0A0B] border border-white/10 text-white shadow-2xl z-[99999]">
                <DialogHeader className="flex flex-col items-center gap-4 text-center sm:text-left">
                    <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-2 mx-auto sm:mx-0">
                        <Lock className="h-6 w-6 text-amber-500" />
                    </div>
                    <div className="w-full text-center sm:text-left">
                        <DialogTitle className="text-xl font-bold text-white mb-2">Reset Password</DialogTitle>
                        <DialogDescription className="text-slate-400">
                            Are you sure you want to reset the password for <span className="font-semibold text-white">{userName || "this user"}</span>?
                            This will generate a new random password and email it to them immediately.
                        </DialogDescription>
                    </div>
                </DialogHeader>
                <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row gap-2 sm:justify-end w-full">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onClose}
                        disabled={loading}
                        className="w-full sm:w-auto hover:bg-white/5 text-slate-400 hover:text-white border border-transparent hover:border-white/10"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all hover:shadow-[0_0_25px_rgba(245,158,11,0.5)]"
                    >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Reset Password
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
