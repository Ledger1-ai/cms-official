
import { NextResponse } from "next/server";
import { WordPressService } from "@/lib/wordpress/service";
import { prismadb } from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        // BYPASS AUTH FOR LOCAL DEBUG
        // const session = await getServerSession(authOptions as any) as any;

        // Find ANY active wordpress connection
        const connection = await prismadb.appConnection.findFirst({
            where: { providerId: "wordpress", isActive: true }
        });

        if (!connection) return new NextResponse("No WP Connection Found", { status: 404 });

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id") || "2";

        const wpService = new WordPressService(connection.userId);

        // Use XML-RPC to avoid 401 errors
        console.log(`[DIAGNOSTIC] Fetching Post ${id} via XML-RPC...`);
        const response = await wpService.xmlRpcCall('wp.getPost', [parseInt(id)]);

        // XML-RPC response.raw contains the full XML.
        // We need to extract the structure to see if "post_content" is what we want.
        // It's usually inside <member><name>post_content</name><value><string>...</string></value></member>

        return NextResponse.json({
            status: "success",
            method: "xml-rpc",
            raw_xml_snippet: response.raw ? response.raw.substring(0, 5000) : "No RAW XML"
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            status: "error",
            message: error.message,
            stack: error.stack
        }, { status: 200 }); // Return 200 so we can read the body
    }
}
