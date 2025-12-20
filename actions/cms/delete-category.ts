"use server";

import { prismadb } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteCategory(categoryName: string, type: string = "docs") {
    if (!categoryName) throw new Error("Category name is required");

    try {
        const result = await prismadb.docArticle.deleteMany({
            where: {
                category: categoryName,
                type: type
            }
        });

        revalidatePath("/cms/docs");
        revalidatePath("/docs");
        revalidatePath("/cms/university");

        return { success: true, count: result.count };
    } catch (error) {
        console.error("[DELETE_CATEGORY_ERROR]", error);
        throw new Error("Failed to delete category");
    }
}
