import { Button } from "@/components/ui/button";
import { Minus, Plus, Search } from "lucide-react";

interface ZoomControlProps {
    zoom: number;
    setZoom: (zoom: number) => void;
}

export function ZoomControl({ zoom, setZoom }: ZoomControlProps) {
    const handleZoomIn = () => setZoom(Math.min(zoom + 0.1, 1.5));
    const handleZoomOut = () => setZoom(Math.max(zoom - 0.1, 0.5));
    const handleReset = () => setZoom(1);

    return (
        <div className="flex items-center gap-1 bg-white/10 rounded-full p-1 border border-white/10 backdrop-blur-md">
            <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomOut}
                disabled={zoom <= 0.5}
                className="h-6 w-6 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
            >
                <Minus className="h-3 w-3" />
            </Button>

            <span className="text-[10px] font-medium text-slate-300 w-8 text-center tabular-nums">
                {Math.round(zoom * 100)}%
            </span>

            <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomIn}
                disabled={zoom >= 1.5}
                className="h-6 w-6 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
            >
                <Plus className="h-3 w-3" />
            </Button>

            {zoom !== 1 && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleReset}
                    className="h-6 w-6 rounded-full hover:bg-white/10 text-orange-400 hover:text-orange-300 ml-1"
                    title="Reset Zoom"
                >
                    <Search className="h-3 w-3" />
                </Button>
            )}
        </div>
    );
}
