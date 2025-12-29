/**
 * Initialize the internal "basalt" team for super admin access
 * 
 * Run with: npx ts-node scripts/create-basalt-team.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🚀 Creating Basalt internal team...\n");

    // Check if team already exists
    const existing = await prisma.team.findFirst({
        where: { slug: "basalt" }
    });

    if (existing) {
        console.log("✅ Team 'basalt' already exists!");
        console.log(`   ID: ${existing.id}`);
        console.log(`   Name: ${existing.name}`);
        return;
    }

    // Create the team
    const team = await prisma.team.create({
        data: {
            name: "Basalt",
            slug: "basalt"
        }
    });

    console.log("✅ Team created successfully!");
    console.log(`   ID: ${team.id}`);
    console.log(`   Name: ${team.name}`);
    console.log(`   Slug: ${team.slug}`);
    console.log(`\n🎉 Super admin checks will now work correctly.`);
    console.log(`\nNext step: Assign users to this team in the admin panel or run:`);
    console.log(`   npx ts-node scripts/assign-super-admin.ts <user-email>`);
}

main()
    .catch((e) => {
        console.error("Error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
