import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExternalLink, Star, Trash2, Phone, Mail, Globe, MapPin, Building2, Save, X, Copy, Share, MessageSquare } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { updateVendor } from "@/actions/vcms/update-vendor";
import { deleteVendor } from "@/actions/vcms/delete-vendor";
import { toast } from "sonner";
import Image from "next/image";

interface VendorDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    vendor: any; // Using any for flexibility with serialized dates
    onUpdate?: () => void;
}

export default function VendorDetailsModal({ isOpen, onClose, vendor, onUpdate }: VendorDetailsModalProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        if (vendor) {
            setFormData({
                name: vendor.name || "",
                title: vendor.title || "",
                email: vendor.email || "",
                phone: vendor.phone || "",
                website: vendor.website || "",
                address: vendor.address || "",
                primary_industry: vendor.primary_industry || "",
                angies_list_url: vendor.angies_list_url || "",
                google_reviews_url: vendor.google_reviews_url || "",
                google_rating: vendor.google_rating || "",
                review_count: vendor.review_count || "",
            });
            setIsEditing(false); // Reset edit mode when vendor changes
        }
    }, [vendor, isOpen]);

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const res = await updateVendor(vendor.id, formData);
            if (res.success) {
                toast.success("Vendor updated successfully");
                setIsEditing(false);
                if (onUpdate) onUpdate();
                onClose();
            } else {
                toast.error("Failed to update vendor");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteConfirm = async () => {
        setIsLoading(true);
        try {
            const res = await deleteVendor(vendor.id);
            if (res.success) {
                toast.success("Vendor deleted");
                if (onUpdate) onUpdate();
                onClose();
            } else {
                toast.error("Failed to delete vendor");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const getFormattedDetails = () => {
        const details = [
            `Name: ${vendor.name}`,
            vendor.title ? `Title: ${vendor.title}` : null,
            vendor.email ? `Email: ${vendor.email}` : null,
            vendor.phone ? `Phone: ${vendor.phone}` : null,
            vendor.website ? `Website: ${vendor.website}` : null,
            vendor.primary_industry ? `Industry: ${vendor.primary_industry}` : null,
        ].filter(Boolean).join("\n");
        return details;
    }

    const handleCopy = () => {
        const text = getFormattedDetails();
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    };

    const handleShareEmail = () => {
        const subject = encodeURIComponent(`Contact Info: ${vendor.name}`);
        const body = encodeURIComponent(getFormattedDetails());
        window.open(`mailto:?subject=${subject}&body=${body}`);
    };

    const handleShareMessage = () => {
        const body = encodeURIComponent(getFormattedDetails());
        window.open(`sms:&body=${body}`);
    };

    if (!vendor) return null;

    // Parse custom fields if available
    const customFields = vendor.custom_fields || {};
    const allPhones = customFields.all_phones || [];
    const allEmails = customFields.all_emails || [];
    const fullAddress = customFields.full_address || vendor.address;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-[#0A0A0B] border border-white/10 text-slate-200">
                <DialogHeader className="flex flex-row items-center justify-between">
                    <DialogTitle className="text-xl font-bold flex items-center gap-2">
                        {isEditing ? "Edit Contact" : "Contact Details"}
                    </DialogTitle>
                    {/* Actions Toolbar */}
                    {!isEditing && (
                        <div className="flex items-center gap-2 mr-6">
                            <Button variant="ghost" size="icon" onClick={handleCopy} className="text-slate-400 hover:text-white hover:bg-white/10" title="Copy to Clipboard">
                                <Copy className="h-4 w-4" />
                            </Button>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-white/10" title="Share">
                                        <Share className="h-4 w-4" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-64 p-0 bg-[#0A0A0B] border border-white/10 shadow-2xl rounded-xl overflow-hidden" align="end" sideOffset={5}>
                                    {/* Modal Header */}
                                    <div className="flex items-center justify-between px-3 py-2 bg-white/5 border-b border-white/5">
                                        <span className="text-xs font-semibold text-white uppercase tracking-wider">Share Contact</span>
                                        <div className="h-4 w-4" />
                                    </div>

                                    <div className="p-2 flex flex-col gap-1">
                                        <div className="px-2 py-1.5 text-xs text-slate-400 text-center mb-1">
                                            Choose how to share <strong>{vendor.name}</strong>
                                        </div>
                                        <button onClick={handleShareEmail} className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-300 hover:bg-white/10 hover:text-white rounded-lg text-left w-full transition-colors group">
                                            <div className="h-8 w-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                                <Mail className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <span className="block font-medium">Email</span>
                                                <span className="text-[10px] text-slate-500 group-hover:text-slate-400">Send via mail client</span>
                                            </div>
                                        </button>
                                        <button onClick={handleShareMessage} className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-300 hover:bg-white/10 hover:text-white rounded-lg text-left w-full transition-colors group">
                                            <div className="h-8 w-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                                <MessageSquare className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <span className="block font-medium">Message</span>
                                                <span className="text-[10px] text-slate-500 group-hover:text-slate-400">Send via SMS</span>
                                            </div>
                                        </button>
                                    </div>
                                </PopoverContent>
                            </Popover>

                            <div className="w-px h-4 bg-white/10 mx-2" />
                            <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10">
                                Edit
                            </Button>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="rounded-2xl bg-[#0A0A0B] border border-white/10 text-slate-200 shadow-2xl">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="text-white text-lg font-bold">Delete Contact?</AlertDialogTitle>
                                        <AlertDialogDescription className="text-slate-400">
                                            Are you sure you want to delete <span className="text-white font-medium">{vendor.name}</span>? This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="bg-transparent border-white/10 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl">Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-500 hover:bg-red-600 text-white border-none rounded-xl">Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    )}
                </DialogHeader>

                {isEditing ? (
                    <div className="grid gap-6 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2"><Label>Name</Label><Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-slate-900/50 border-white/10" /></div>
                            <div className="space-y-2"><Label>Title</Label><Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="bg-slate-900/50 border-white/10" /></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2"><Label>Email</Label><Input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-slate-900/50 border-white/10" /></div>
                            <div className="space-y-2"><Label>Phone</Label><Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="bg-slate-900/50 border-white/10" /></div>
                        </div>
                        <div className="space-y-2"><Label>Website</Label><Input value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className="bg-slate-900/50 border-white/10" /></div>
                        <div className="space-y-2"><Label>Address</Label><Input value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="bg-slate-900/50 border-white/10" /></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2"><Label>Industry</Label><Input value={formData.primary_industry} onChange={(e) => setFormData({ ...formData, primary_industry: e.target.value })} className="bg-slate-900/50 border-white/10" /></div>
                        </div>

                        <div className="p-4 bg-slate-900/50 rounded-lg border border-white/5 space-y-4">
                            <h3 className="text-sm font-semibold text-slate-400">External Links</h3>
                            <div className="space-y-2"><Label className="text-xs">Angie's List URL</Label><Input value={formData.angies_list_url} onChange={(e) => setFormData({ ...formData, angies_list_url: e.target.value })} className="bg-black/20 border-white/10 h-8 text-xs" /></div>
                            <div className="space-y-2"><Label className="text-xs">Google Reviews URL</Label><Input value={formData.google_reviews_url} onChange={(e) => setFormData({ ...formData, google_reviews_url: e.target.value })} className="bg-black/20 border-white/10 h-8 text-xs" /></div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Button variant="ghost" onClick={() => setIsEditing(false)} disabled={isLoading}>Cancel</Button>
                            <Button onClick={handleSave} disabled={isLoading} className="bg-emerald-500 hover:bg-emerald-600">
                                {isLoading ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
                        {/* Left Column: Basic Info */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Name</h3>
                                <p className="text-lg font-medium text-white">{vendor.name}</p>
                            </div>
                            <div>
                                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Title</h3>
                                <p className="text-base text-slate-300">{vendor.title || "-"}</p>
                            </div>
                            <div>
                                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Industry</h3>
                                {vendor.primary_industry ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                        {vendor.primary_industry}
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-400 border border-white/5">
                                        Unclassified
                                    </span>
                                )}
                            </div>
                            {/* Address Display */}
                            <div>
                                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Address</h3>
                                <p className="text-sm text-slate-300 whitespace-pre-line">{fullAddress || vendor.address || "-"}</p>
                            </div>
                        </div>

                        {/* Right Column: Contact Details */}
                        <div className="space-y-6 bg-slate-900/30 p-6 rounded-xl border border-white/5">
                            <div>
                                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Phone className="h-3.5 w-3.5" /> Phone
                                </h3>
                                {/* List all phones */}
                                {allPhones.length > 0 ? (
                                    <div className="space-y-1">
                                        {allPhones.map((p: any, idx: number) => (
                                            <div key={idx} className="flex flex-col">
                                                <span className="text-sm text-slate-200">{p.number}</span>
                                                <span className="text-[10px] text-slate-500 uppercase">{p.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-slate-300">{vendor.phone || "-"}</p>
                                )}
                            </div>

                            <div>
                                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Mail className="h-3.5 w-3.5" /> Email
                                </h3>
                                {/* List all emails */}
                                {allEmails.length > 0 ? (
                                    <div className="space-y-1">
                                        {allEmails.map((email: string, idx: number) => (
                                            <a key={idx} href={`mailto:${email}`} className="block text-sm text-blue-400 hover:text-blue-300 hover:underline">{email}</a>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-slate-300">{vendor.email ? <a href={`mailto:${vendor.email}`} className="hover:text-white transition-colors">{vendor.email}</a> : "-"}</p>
                                )}
                            </div>

                            <div>
                                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Globe className="h-3.5 w-3.5" /> Website
                                </h3>
                                <p className="text-sm text-slate-300">
                                    {vendor.website ? (
                                        <a href={vendor.website.startsWith('http') ? vendor.website : `https://${vendor.website}`} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1">
                                            {vendor.website.replace(/^https?:\/\//, '')} <ExternalLink className="h-3 w-3" />
                                        </a>
                                    ) : "-"}
                                </p>
                            </div>
                        </div>
                    </div>
                )} {/* Full Width: Reviews & Ratings */}
                <div className="mt-8 pt-6 border-t border-white/10">
                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-400" /> Reviews & Ratings
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <Label className="text-xs text-slate-500">Google Rating (0-5)</Label>
                            {isEditing ? (
                                <div className="flex gap-2">
                                    <Input type="number" step="0.1" min="0" max="5" value={formData.google_rating} onChange={e => setFormData({ ...formData, google_rating: e.target.value })} className="bg-white/5 border-white/10 w-24" placeholder="4.8" />
                                    <Input type="number" min="0" value={formData.review_count} onChange={e => setFormData({ ...formData, review_count: e.target.value })} className="bg-white/5 border-white/10 w-24" placeholder="Count" />
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-white">{vendor.google_rating || "N/A"}</span>
                                    {vendor.google_rating && (
                                        <div className="flex text-yellow-500">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`h-3 w-3 ${i < Math.round(vendor.google_rating) ? "fill-current" : "opacity-30"}`} />
                                            ))}
                                        </div>
                                    )}
                                    <span className="text-xs text-slate-500">({vendor.review_count || 0} reviews)</span>
                                </div>
                            )}
                        </div>

                        <div className="space-y-3">
                            <Label className="text-xs text-slate-500">Review Links</Label>
                            {isEditing ? (
                                <div className="space-y-2">
                                    <Input value={formData.google_reviews_url} onChange={e => setFormData({ ...formData, google_reviews_url: e.target.value })} className="bg-white/5 border-white/10" placeholder="Google Reviews URL" />
                                    <Input value={formData.angies_list_url} onChange={e => setFormData({ ...formData, angies_list_url: e.target.value })} className="bg-white/5 border-white/10" placeholder="Angie's List URL" />
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    {vendor.google_reviews_url && (
                                        <a href={vendor.google_reviews_url} target="_blank" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-2">
                                            <ExternalLink className="h-3 w-3" /> View on Google
                                        </a>
                                    )}
                                    {vendor.angies_list_url && (
                                        <a href={vendor.angies_list_url} target="_blank" className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-2">
                                            <ExternalLink className="h-3 w-3" /> View on Angie's List
                                        </a>
                                    )}
                                    {!vendor.google_reviews_url && !vendor.angies_list_url && (
                                        <span className="text-xs text-slate-600 italic">No review links added</span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {isEditing && (
                    <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-white/10">
                        <Button variant="ghost" onClick={() => setIsEditing(false)} disabled={isLoading}>Cancel</Button>
                        <Button onClick={handleSave} disabled={isLoading} className="bg-emerald-500 hover:bg-emerald-600">
                            {isLoading ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}


