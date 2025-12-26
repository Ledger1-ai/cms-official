
import { NextResponse } from "next/server";
import { WordPressService } from "@/lib/wordpress/service";
import { prismadb } from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        console.log("[DIAGNOSTIC_V2] Starting...");

        // Find ANY active wordpress connection
        const connection = await prismadb.appConnection.findFirst({
            where: { providerId: "wordpress", isActive: true }
        });

        if (!connection) return new NextResponse("No WP Connection Found", { status: 404 });

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id") || "2";

        const wpService = new WordPressService(connection.userId);

        // Use XML-RPC to avoid 401 errors
        console.log(`[DIAGNOSTIC_V2] Fetching Post ${id} via XML-RPC...`);
        const response = await wpService.xmlRpcCall('wp.getPost', [parseInt(id)]);

        return NextResponse.json({
            status: "success",
            method: "xml-rpc-v2",
            raw_xml_snippet: response.raw ? response.raw.substring(0, 5000) : "No RAW XML"
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            status: "error",
            message: error.message,
            stack: error.stack
        }, { status: 200 });
    }
}
