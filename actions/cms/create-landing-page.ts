"use server";
import { prismadb } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from 'uuid';
import { logActivity } from "@/actions/audit";

export async function createLandingPage(locale: string) {
    const slug = `page-${uuidv4().slice(0, 8)}`;

    const page = await prismadb.landingPage.create({
        data: {
            title: "Untitled Page",
            slug: slug,
            content: {
                content: [],
                root: { props: { title: "Untitled Page" } }
            },
        },
    });

    await logActivity("Create Landing Page", "Landing Page", `Created page: ${page.title}`);

    // Revalidate to ensure sidebar picks up the new page
    revalidatePath(`/${locale}/cms/landing`);

    redirect(`/${locale}/cms/landing/${page.id}`);
}
