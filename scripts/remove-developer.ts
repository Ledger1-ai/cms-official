import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Removing 'Developer' user (info@basalthq.com)...");

    try {
        const user = await prisma.users.findUnique({
            where: { email: "info@basalthq.com" },
        });

        if (user) {
            await prisma.users.delete({
                where: { id: user.id },
            });
            console.log("Successfully deleted user: info@basalthq.com");
        } else {
            console.log("User 'info@basalthq.com' not found.");
        }
    } catch (error) {
        console.error("Error deleting user:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
