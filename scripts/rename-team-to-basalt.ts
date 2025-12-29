/**
 * One-time migration script to rename the internal team slug from "ledger1" to "basalt"
 * 
 * Run with: npx ts-node scripts/rename-team-to-basalt.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🔄 Renaming team slug from 'ledger1' to 'basalt'...\n");

    // Find the team
    const team = await prisma.team.findFirst({
        where: { slug: "ledger1" }
    });

    if (!team) {
        console.log("❌ Team with slug 'ledger1' not found.");
        console.log("   → Either it was already renamed, or doesn't exist.");
        return;
    }

    console.log(`Found team: ${team.name} (ID: ${team.id})`);

    // Update the slug
    const updated = await prisma.team.update({
        where: { id: team.id },
        data: { slug: "basalt" }
    });

    console.log(`\n✅ Team slug updated successfully!`);
    console.log(`   Old slug: ledger1`);
    console.log(`   New slug: ${updated.slug}`);
    console.log(`\n🎉 Super admin checks will now work correctly.`);
}

main()
    .catch((e) => {
        console.error("Error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
