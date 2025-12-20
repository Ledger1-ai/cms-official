import { NextResponse } from "next/server";
import { prismadb } from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const type = searchParams.get("type"); // 'view' or 'click' (future proofing)

        if (!id) {
            return new NextResponse("ID required", { status: 400 });
        }

        if (type === "view") {
            await prismadb.form.update({
                where: { id },
                data: {
                    views: { increment: 1 }
                }
            });
        }

        // Return a 1x1 pixel transparent gif
        const pixel = Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64");

        return new NextResponse(pixel, {
            headers: {
                "Content-Type": "image/gif",
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                "Pragma": "no-cache",
                "Expires": "0",
            }
        });

    } catch (error) {
        console.error("[FORM_TRACK]", error);
        // Still return transparent pixel even on error to not break UI
        const pixel = Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64");
        return new NextResponse(pixel, { headers: { "Content-Type": "image/gif" } });
    }
}
