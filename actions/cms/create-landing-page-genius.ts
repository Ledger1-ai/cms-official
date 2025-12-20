"use server";
import { prismadb } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import { logActivity } from "@/actions/audit";

export async function createLandingPageGenius(locale: string, prompt: string) {
    const slug = `page-${uuidv4().slice(0, 8)}`;

    const page = await prismadb.landingPage.create({
        data: {
            title: "Genius Draft",
            slug: slug,
            content: {
                content: [],
                root: { props: { title: "Genius Draft" } }
            },
        },
    });

    await logActivity("Create Genius Page", "Landing Page", `Created page: ${page.title}`);

    // Redirect with prompt
    redirect(`/${locale}/cms/landing/${page.id}?mode=advanced&aiPrompt=${encodeURIComponent(prompt)}`);
}
