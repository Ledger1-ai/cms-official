"use client";

import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Camera, RefreshCw, Check, ScanLine, RotateCw, Upload, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Image from "next/image";

interface ScanCardModalProps {
    isOpen: boolean;
    onClose: () => void;
    onScanComplete: (frontFile: File, backFile: File | null) => void;
    initialFile?: File | null;
}

export function ScanCardModal({ isOpen, onClose, onScanComplete, initialFile }: ScanCardModalProps) {
    const [step, setStep] = useState<"front" | "back">("front");
    const [mode, setMode] = useState<"camera" | "upload" | "crop" | "review">("camera");

    // Media State
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [frontFile, setFrontFile] = useState<File | null>(null);
    const [backFile, setBackFile] = useState<File | null>(null);

    // Refs
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- CROP LOGIC (Enhanced Pan & Zoom) ---
    const [cropScale, setCropScale] = useState(1);
    const [cropPos, setCropPos] = useState({ x: 0, y: 0 });
    const dragRef = useRef({ isDragging: false, startX: 0, startY: 0, initialX: 0, initialY: 0 });
    const imageRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handlePointerDown = (e: React.PointerEvent) => {
        dragRef.current.isDragging = true;
        dragRef.current.startX = e.clientX;
        dragRef.current.startY = e.clientY;
        dragRef.current.initialX = cropPos.x;
        dragRef.current.initialY = cropPos.y;
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!dragRef.current.isDragging) return;
        const dx = e.clientX - dragRef.current.startX;
        const dy = e.clientY - dragRef.current.startY;
        setCropPos({
            x: dragRef.current.initialX + dx,
            y: dragRef.current.initialY + dy
        });
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        dragRef.current.isDragging = false;
        e.currentTarget.releasePointerCapture(e.pointerId);
    };

    // --- UPLOAD LOGIC ---
    useEffect(() => {
        if (isOpen && initialFile && step === "front") {
            const reader = new FileReader();
            reader.onload = (ev) => {
                if (ev.target?.result) {
                    setImageSrc(ev.target.result as string);
                    setMode("crop");
                }
            };
            reader.readAsDataURL(initialFile);
        }
    }, [isOpen, initialFile, step]);

    // --- CAMERA LOGIC ---
    useEffect(() => {
        if (isOpen && mode === "camera") {
            startCamera();
        } else {
            stopCamera();
        }
        return () => stopCamera();
    }, [isOpen, mode]);

    const [cameraError, setCameraError] = useState(false);

    const startCamera = async () => {
        // Reset check
        setCameraError(false);

        // Security Check: getUserMedia requires HTTPS or localhost
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            // Do NOT change mode to 'upload' (it hides the UI). Stay in 'camera' mode so user sees the fallback.
            // toast.error("Camera access requires HTTPS. Please upload a specific file."); // Optional, UI already explains it
            setCameraError(true);
            return;
        }

        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment", width: { ideal: 1920 }, height: { ideal: 1080 } },
                audio: false
            });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (err) {
            console.error("Camera Error:", err);
            // toast.error("Could not access camera. Please upload a file instead.");
            setCameraError(true);
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };

    const captureImage = () => {
        if (!videoRef.current) return;
        const video = videoRef.current;
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            setImageSrc(canvas.toDataURL("image/jpeg"));
            setMode("crop");
        }
    };

    // --- UPLOAD LOGIC ---
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (ev) => {
                if (ev.target?.result) {
                    setImageSrc(ev.target.result as string);
                    setMode("crop");
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const performCrop = () => {
        if (!imageRef.current || !containerRef.current) return;

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = imageRef.current; // The hidden source image or the visible one? Using logic below.

        // We need to map the "Visible Area" (The green box) relative to the Scaled/Translated Image.
        // The Overlay is centered in the container.
        // Let's assume the Output should be 1000x600 (Business Card Ratio approx 1.66)
        const OUTPUT_WIDTH = 1000;
        const OUTPUT_HEIGHT = 600; // Aspect ratio 1.666... (1000/600)

        canvas.width = OUTPUT_WIDTH;
        canvas.height = OUTPUT_HEIGHT;

        if (ctx) {
            // Fill white background just in case
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, OUTPUT_WIDTH, OUTPUT_HEIGHT);

            // Logic: 
            // The container is the "Window". The Image is moving behind it.
            // The "Green Box" is fixed at the center of the container.
            // We need to find which part of the Image is under the Green Box.

            const containerRect = containerRef.current.getBoundingClientRect();

            // Define the visual Crop Box dimensions (matches the CSS overlay)
            // In the JSX, we'll make the Crop Box say 85% width of container, aspect 1.586
            const CROP_BOX_PERCENT_WIDTH = 0.85;
            const CROP_BOX_ASPECT_RATIO = 1.586; // Standard business card aspect ratio

            const boxWidth = containerRect.width * CROP_BOX_PERCENT_WIDTH;
            const boxHeight = boxWidth / CROP_BOX_ASPECT_RATIO;

            const boxX = (containerRect.width - boxWidth) / 2;
            const boxY = (containerRect.height - boxHeight) / 2;

            // Calculate the base rendered size of the image (at scale 1, no pan)
            // This accounts for `object-contain` behavior
            const imgNaturalAspect = img.naturalWidth / img.naturalHeight;
            const containerAspect = containerRect.width / containerRect.height;

            let baseRenderWidth, baseRenderHeight;
            if (imgNaturalAspect > containerAspect) {
                // Image is wider relative to container -> constrained by container width
                baseRenderWidth = containerRect.width;
                baseRenderHeight = containerRect.width / imgNaturalAspect;
            } else {
                // Image is taller relative to container -> constrained by container height
                baseRenderHeight = containerRect.height;
                baseRenderWidth = containerRect.height * imgNaturalAspect;
            }

            // Current rendered dimensions of the image, considering zoom
            const currentRenderWidth = baseRenderWidth * cropScale;
            const currentRenderHeight = baseRenderHeight * cropScale;

            // Top-Left of Image relative to Container Top-Left, considering pan and initial centering
            const imgLeft = (containerRect.width - currentRenderWidth) / 2 + cropPos.x;
            const imgTop = (containerRect.height - currentRenderHeight) / 2 + cropPos.y;

            // Calculate the source rectangle (sx, sy, sWidth, sHeight) from the original image
            // This is the portion of the original image that is visible within the crop box.

            // 1. Find the top-left point of the crop box relative to the *rendered* image's top-left
            const cropBoxLeftOnRendered = boxX - imgLeft;
            const cropBoxTopOnRendered = boxY - imgTop;

            // 2. Calculate the scaling factor from rendered pixels to natural image pixels
            const scaleRenderedToNatural = img.naturalWidth / currentRenderWidth;

            // 3. Apply this scale to get the source rectangle coordinates
            const sx = cropBoxLeftOnRendered * scaleRenderedToNatural;
            const sy = cropBoxTopOnRendered * scaleRenderedToNatural;
            const sWidth = boxWidth * scaleRenderedToNatural;
            const sHeight = boxHeight * scaleRenderedToNatural;

            // Ensure source coordinates are within the natural image bounds
            const finalSx = Math.max(0, sx);
            const finalSy = Math.max(0, sy);
            const finalSWidth = Math.min(img.naturalWidth - finalSx, sWidth);
            const finalSHeight = Math.min(img.naturalHeight - finalSy, sHeight);

            ctx.drawImage(img, finalSx, finalSy, finalSWidth, finalSHeight, 0, 0, OUTPUT_WIDTH, OUTPUT_HEIGHT);

            canvas.toBlob((blob) => {
                if (blob) {
                    const file = new File([blob], `${step}_scan_${Date.now()}.jpg`, { type: "image/jpeg" });
                    if (step === "front") {
                        setFrontFile(file);
                        setMode("review");
                    } else {
                        setBackFile(file);
                        setMode("review");
                    }
                }
            }, "image/jpeg", 0.95);
        }
    };

    // --- FLOW CONTROL ---
    const reset = () => {
        setImageSrc(null);
        setCropPos({ x: 0, y: 0 }); // Reset Pan
        setCropScale(1);            // Reset Zoom
        setMode("camera");
    };

    const finish = () => {
        if (frontFile) {
            onScanComplete(frontFile, backFile);
            handleClose();
        }
    };

    const handleClose = () => {
        stopCamera();
        setStep("front");
        setFrontFile(null);
        setBackFile(null);
        setImageSrc(null);
        setMode("camera");
        setCropPos({ x: 0, y: 0 });
        setCropScale(1);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="sm:max-w-[500px] bg-[#0F1115] border border-white/10 text-white p-0 gap-0 overflow-hidden w-full h-[90vh] sm:h-auto flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/20">
                    <DialogTitle className="text-lg font-semibold flex items-center gap-2">
                        <ScanLine className="h-5 w-5 text-emerald-400" />
                        {step === "front" ? "Scan Business Card (Front)" : "Scan Business Card (Back)"}
                    </DialogTitle>
                    {/* Native Close is handled by DialogContent */}
                </div>

                {/* Main Content Area */}
                <div className="flex-1 relative bg-black flex flex-col items-center justify-center overflow-hidden">

                    {/* MODE: CAMERA */}
                    {mode === "camera" && (
                        <>
                            <div className="relative w-full h-full flex items-center justify-center">
                                {stream ? (
                                    <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-slate-500 flex flex-col items-center p-6 text-center">
                                        <Camera className="h-12 w-12 mb-4 opacity-50" />
                                        <p className="mb-4 font-medium text-white">
                                            {cameraError ? "Camera Access Unavailable" : "Camera starting..."}
                                        </p>
                                        <p className="text-xs text-slate-400 max-w-[240px]">
                                            {cameraError
                                                ? "Browser prevented camera access (common on HTTP). Use the Upload button below to take a photo."
                                                : "Requesting permissions..."
                                            }
                                        </p>
                                    </div>
                                )}

                                {/* Overlay Guide */}
                                <div className="absolute inset-0 border-[40px] border-black/50 pointer-events-none">
                                    <div className="w-full h-full border-2 border-emerald-500/50 relative">
                                        <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-emerald-500"></div>
                                        <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-emerald-500"></div>
                                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-emerald-500"></div>
                                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-emerald-500"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-8 flex gap-6 items-center z-10">
                                <Button size="icon" variant="secondary" className="rounded-full h-12 w-12 bg-white/10 hover:bg-white/20 backdrop-blur" onClick={() => fileInputRef.current?.click()}>
                                    <Upload className="h-5 w-5" />
                                </Button>

                                {/* Smart Shutter: Captures stream OR triggers native camera input if stream fails */}
                                <Button
                                    size="icon"
                                    className="rounded-full h-16 w-16 bg-white border-4 border-slate-300 shadow-xl hover:scale-105 transition-transform"
                                    onClick={() => {
                                        if (stream) {
                                            captureImage();
                                        } else {
                                            // Fallback for HTTP: Open native camera/file picker
                                            fileInputRef.current?.click();
                                        }
                                    }}
                                >
                                    <div className="h-14 w-14 rounded-full border-2 border-black"></div>
                                </Button>

                                <Button size="icon" variant="secondary" className="rounded-full h-12 w-12 bg-white/10 hover:bg-white/20 backdrop-blur" onClick={startCamera}>
                                    <RefreshCw className="h-5 w-5" />
                                </Button>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                capture="environment" // Forces camera on mobile
                                onChange={handleFileUpload}
                            />
                        </>
                    )}

                    {/* MODE: CROP - UPDATED INTERACTIVE */}
                    {mode === "crop" && imageSrc && (
                        <div className="relative w-full h-full bg-slate-900 flex flex-col">

                            {/* Editor Area */}
                            <div
                                className="flex-1 relative overflow-hidden bg-black touch-none cursor-move"
                                ref={containerRef}
                                onPointerDown={handlePointerDown}
                                onPointerMove={handlePointerMove}
                                onPointerUp={handlePointerUp}
                                onPointerLeave={handlePointerUp}
                            >
                                {/* The Movable Image */}
                                <div className="w-full h-full flex items-center justify-center pointer-events-none">
                                    <img
                                        ref={imageRef}
                                        src={imageSrc}
                                        alt="Crop Target"
                                        className="max-w-full max-h-full object-contain pointer-events-none select-none"
                                        style={{
                                            transform: `translate(${cropPos.x}px, ${cropPos.y}px) scale(${cropScale})`,
                                            transition: dragRef.current.isDragging ? 'none' : 'transform 0.1s ease-out'
                                        }}
                                        draggable={false}
                                    />
                                </div>

                                {/* Fixed Overlay (The Crop Port) */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                                    {/* The Hole */}
                                    <div className="w-[85%] aspect-[1.586] border-2 border-emerald-400 shadow-[0_0_0_9999px_rgba(0,0,0,0.85)] relative">
                                        <p className="absolute -top-10 left-1/2 -translate-x-1/2 text-white text-xs font-bold bg-black/50 px-3 py-1.5 rounded-full border border-white/10">
                                            Fit card inside box
                                        </p>

                                        {/* Grid lines for precision */}
                                        <div className="absolute top-1/3 left-0 w-full h-[1px] bg-emerald-400/30"></div>
                                        <div className="absolute top-2/3 left-0 w-full h-[1px] bg-emerald-400/30"></div>
                                        <div className="absolute left-1/3 top-0 h-full w-[1px] bg-emerald-400/30"></div>
                                        <div className="absolute left-2/3 top-0 h-full w-[1px] bg-emerald-400/30"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="p-4 bg-[#0F1115] border-t border-white/10 flex flex-col gap-4 z-30">
                                {/* Zoom Slider */}
                                <div className="flex items-center gap-4 px-2">
                                    <span className="text-xs text-slate-400">Zoom</span>
                                    <input
                                        type="range"
                                        min="0.5"
                                        max="3"
                                        step="0.05"
                                        value={cropScale}
                                        onChange={(e) => setCropScale(parseFloat(e.target.value))}
                                        className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                    />
                                    <span className="text-xs text-white min-w-[3ch]">{Math.round(cropScale * 100)}%</span>
                                </div>

                                <div className="flex justify-between gap-4">
                                    <Button variant="ghost" onClick={reset}>Retake</Button>
                                    <Button onClick={performCrop} className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1">
                                        <Check className="h-4 w-4 mr-2" /> Confirm Crop
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* MODE: REVIEW / NEXT STEP */}
                    {mode === "review" && (
                        <div className="w-full h-full flex flex-col items-center justify-center p-8 space-y-6 text-center">
                            <div className="w-full max-w-sm aspect-video relative bg-slate-900 rounded-lg overflow-hidden border border-white/10 shadow-lg group">
                                {step === "front" && frontFile && (
                                    <Image src={URL.createObjectURL(frontFile)} alt="Front" fill className="object-contain" />
                                )}
                                {step === "back" && backFile && (
                                    <Image src={URL.createObjectURL(backFile)} alt="Back" fill className="object-contain" />
                                )}
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-white">Scan captured!</h3>
                                <p className="text-slate-400 text-sm">
                                    {step === "front"
                                        ? "Would you like to scan the back side of the card?"
                                        : "Both sides captured. Ready to process?"}
                                </p>
                            </div>

                            <div className="flex flex-col w-full max-w-xs gap-3">
                                {step === "front" ? (
                                    <>
                                        <Button onClick={() => { setStep("back"); reset(); }} variant="outline" className="w-full border-white/20 hover:bg-white/5">
                                            <RotateCw className="h-4 w-4 mr-2" /> Scan Back Side
                                        </Button>
                                        <Button onClick={finish} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                                            <Sparkles className="h-4 w-4 mr-2" /> Process Card
                                        </Button>
                                    </>
                                ) : (
                                    <Button onClick={finish} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                                        <Check className="h-4 w-4 mr-2" /> Save Vendor
                                    </Button>
                                )}
                                <Button variant="ghost" className="text-slate-500 hover:text-white" onClick={reset}>Retake</Button>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
