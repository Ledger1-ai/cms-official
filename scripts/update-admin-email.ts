/**
 * Update super admin email from admin@ledger1.ai to info@basalthq.com
 * Preserves the existing password hash
 * 
 * Run with: npx ts-node scripts/update-admin-email.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const OLD_EMAIL = "admin@ledger1.ai";
const NEW_EMAIL = "info@basalthq.com";

async function main() {
    console.log(`🔄 Updating super admin email...`);
    console.log(`   From: ${OLD_EMAIL}`);
    console.log(`   To: ${NEW_EMAIL}\n`);

    // Find the user
    const user = await prisma.users.findUnique({
        where: { email: OLD_EMAIL }
    });

    if (!user) {
        console.log(`❌ User with email '${OLD_EMAIL}' not found.`);
        return;
    }

    console.log(`Found user: ${user.name || user.email} (ID: ${user.id})`);

    // Check if new email already exists
    const existing = await prisma.users.findUnique({
        where: { email: NEW_EMAIL }
    });

    if (existing) {
        console.log(`❌ A user with email '${NEW_EMAIL}' already exists.`);
        console.log(`   Cannot update - would create duplicate.`);
        return;
    }

    // Update the email (password hash remains unchanged)
    const updated = await prisma.users.update({
        where: { id: user.id },
        data: { email: NEW_EMAIL }
    });

    console.log(`\n✅ Email updated successfully!`);
    console.log(`   User: ${updated.name}`);
    console.log(`   New email: ${updated.email}`);
    console.log(`   Password: (unchanged)`);
    console.log(`\n🔐 You can now log in with: ${NEW_EMAIL}`);
}

main()
    .catch((e) => {
        console.error("Error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
