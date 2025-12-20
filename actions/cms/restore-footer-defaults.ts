"use server";

import { prismadb } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function restoreFooterDefaults() {
    try {
        // 1. Check if "Company" section exists
        const companySection = await prismadb.footerSection.findFirst({
            where: { title: "Company" }
        });

        if (!companySection) {
            console.log("Restoring Company section in footer...");
            const newSection = await prismadb.footerSection.create({
                data: {
                    title: "Company",
                    order: 0,
                    isBase: false,
                    links: {
                        create: [
                            { text: "About Us", url: "/about", order: 0 },
                            { text: "Careers", url: "/careers", order: 1 },
                            { text: "Blog", url: "/blog", order: 2 },
                            { text: "Contact", url: "/contact", order: 3 },
                        ]
                    }
                }
            });
        }

        // 2. Check if "Product" section exists (optional check)
        const productSection = await prismadb.footerSection.findFirst({
            where: { title: "Product" }
        });

        if (!productSection) {
            console.log("Restoring Product section in footer...");
            await prismadb.footerSection.create({
                data: {
                    title: "Product",
                    order: 1,
                    isBase: false,
                    links: {
                        create: [
                            { text: "Features", url: "/#features", order: 0 },
                            { text: "Pricing", url: "/pricing", order: 1 },
                            { text: "Docs", url: "/docs", order: 2 },
                        ]
                    }
                }
            });
        }

        revalidatePath("/cms/footer");
        return { success: true, message: "Defaults restored successfully" };
    } catch (error) {
        console.error("Failed to restore footer defaults:", error);
        return { success: false, message: "Failed to restore defaults" };
    }
}
