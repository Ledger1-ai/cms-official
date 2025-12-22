"use server";

import { prismadb } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { revalidatePath } from "next/cache";
import sendEmail from "@/lib/sendmail";
import { logActivityInternal } from "@/actions/audit";

export async function enrollUser(formData: FormData) {
    try {
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const companyName = formData.get("companyName") as string;
        const planSlug = formData.get("planId") as string; // STARTER, GROWTH, SCALE
        const newsletter = formData.get("newsletter") === "true";

        if (!email || !password || !firstName || !lastName || !companyName) {
            return { success: false, error: "Missing required fields" };
        }

        // 1. Check if user already exists
        const existingUser = await prismadb.users.findUnique({
            where: { email }
        });

        if (existingUser) {
            return { success: false, error: "User with this email already exists." };
        }

        // 2. Hash Password
        const hashedPassword = await hash(password, 12);

        // 3. Find Plan
        let plan = await prismadb.plan.findUnique({
            where: { slug: planSlug }
        });

        if (!plan) {
            plan = await prismadb.plan.findUnique({ where: { slug: "FREE" } });
        }

        // 4. Create Team (Client Account)
        const slug = companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-') + "-" + Math.random().toString(36).substring(2, 7);

        const newTeam = await prismadb.team.create({
            data: {
                name: companyName,
                slug: slug,
                plan_id: plan?.id,
                subscription_plan: 'TEAM',
                status: "ACTIVE"
            }
        });

        // 5. Create User
        const newUser = await prismadb.users.create({
            data: {
                email,
                password: hashedPassword,
                name: `${firstName} ${lastName}`,
                userStatus: "ACTIVE",
                is_admin: false,
                team_id: newTeam.id,
            }
        });

        // Update Team Owner
        await prismadb.team.update({
            where: { id: newTeam.id },
            data: { owner_id: newUser.id }
        });

        // 6. Handle Newsletter
        if (newsletter) {
            const existingSub = await prismadb.newsletterSubscriber.findFirst({
                where: { email }
            });

            if (!existingSub) {
                await prismadb.newsletterSubscriber.create({
                    data: {
                        email,
                        firstName,
                        lastName, // Add names if schema supports it, assuming it does based on addSubscriber usage
                        status: "SUBSCRIBED",
                        source: "Enrollment Form"
                    }
                });
            }
        }

        // 7. Log Activity
        await logActivityInternal(newUser.id, "Account Created", "Enrollment", `User enrolled with plan ${planSlug}`);

        // 8. Notification Email
        await sendEmail({
            to: "support@ledger1.ai", // Or configured support email
            from: process.env.EMAIL_USERNAME,
            subject: `New Enrollment: ${companyName} (${planSlug})`,
            text: `A new user has enrolled!\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nCompany: ${companyName}\nPlan: ${planSlug}\n\nPlease verify their account setup.`,
            html: `
                <h2>New User Enrollment</h2>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Company:</strong> ${companyName}</p>
                <p><strong>Plan:</strong> ${planSlug}</p>
                <p>Please log in to the CMS to review.</p>
            `,
        });

        return { success: true };
    } catch (error: any) {
        console.error("Enrollment error:", error);
        return { success: false, error: "Something went wrong during enrollment." };
    }
}
