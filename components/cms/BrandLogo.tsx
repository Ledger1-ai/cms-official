import { cn } from "@/lib/utils";

export function BrandLogo({ className, textSize = "text-3xl" }: { className?: string; textSize?: string }) {
    return (
        <div className={cn("font-bold tracking-tighter flex items-center gap-1", className)}>
            <span className={cn("text-white", textSize)}>Ledger1</span>
            <span className={cn("bg-gradient-to-r from-[#4DBFD9] to-[#2AA9C7] bg-clip-text text-transparent", textSize)}>CMS</span>
        </div>
    );
}
