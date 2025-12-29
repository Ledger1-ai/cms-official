/**
 * Update admin user's display name from old email to "Basalt Admin"
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🔄 Updating user display name...\n");

    const user = await prisma.users.findUnique({
        where: { email: "info@basalthq.com" }
    });

    if (!user) {
        console.log("❌ User 'info@basalthq.com' not found");
        return;
    }

    console.log(`Current name: ${user.name}`);

    const updated = await prisma.users.update({
        where: { id: user.id },
        data: { name: "Basalt Admin" }
    });

    console.log(`\n✅ Name updated to: ${updated.name}`);
    console.log("🔄 Please log out and log back in to see the change.");
}

main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
