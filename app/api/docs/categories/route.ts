import { NextResponse } from "next/server";
import { prismadb } from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type") || "docs";

        const docs = await prismadb.docArticle.findMany({
            where: {
                type: type
            },
            select: {
                category: true,
            },
            distinct: ['category'],
            orderBy: {
                category: 'asc',
            },
        });

        const categories = docs.map(doc => doc.category);

        return NextResponse.json(categories);
    } catch (error) {
        console.log("[DOCS_CATEGORIES_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
