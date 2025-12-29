
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Fixing OG Image in Database...");

    const config = await prisma.systemSeoConfig.findFirst();

    if (config) {
        if (config.ogImage === "/social-preview.jpg?v=2" || config.ogImage === "/ledger-og.png" || config.ogImage.includes("social-preview")) {
            console.log(`Found old OG Image: ${config.ogImage}. Updating to /images/opengraph-image.png`);

            await prisma.systemSeoConfig.update({
                where: { id: config.id },
                data: {
                    ogImage: "/images/opengraph-image.png"
                }
            });
            console.log("Database updated successfully.");
        } else {
            console.log(`Current OG Image is: ${config.ogImage}. No update needed if it is not the old one.`);
            // Force update anyway just to be safe if user wants it gone
            await prisma.systemSeoConfig.update({
                where: { id: config.id },
                data: {
                    ogImage: "/images/opengraph-image.png"
                }
            });
            console.log("Forced update to /images/opengraph-image.png to ensure CRM image is gone.");
        }
    } else {
        console.log("No SystemSeoConfig found. Creating one with correct defaults.");
        await prisma.systemSeoConfig.create({
            data: {
                globalTitle: "Basalt CMS | The Intelligent Visual Builder",
                globalDescription: "Build, scale, and manage your digital presence with the world's most powerful AI-assisted visual CMS.",
                ogImage: "/images/opengraph-image.png",
                ogTitle: "Basalt CMS | The Intelligent Visual Builder",
                ogDescription: "Build, scale, and manage your digital presence with the world's most powerful AI-assisted visual CMS."
            }
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
