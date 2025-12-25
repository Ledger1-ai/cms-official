import { PrismaClient } from "@prisma/client";
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
    console.log("Start seeding App Integrations content...");

    // 1. Load Data
    const appDocsPath = path.join(process.cwd(), 'scripts', 'app-docs.json');
    const appSopsPath = path.join(process.cwd(), 'scripts', 'app-sops.json');

    if (!fs.existsSync(appDocsPath) || !fs.existsSync(appSopsPath)) {
        console.error("Error: Data files not found. Ensure scripts/app-docs.json and scripts/app-sops.json exist.");
        process.exit(1);
    }

    const appDocs = JSON.parse(fs.readFileSync(appDocsPath, 'utf-8'));
    const appSops = JSON.parse(fs.readFileSync(appSopsPath, 'utf-8'));

    // Combine arrays
    const allContent = [...appDocs, ...appSops];

    // 2. Upsert Data
    for (const doc of allContent) {
        try {
            const exists = await prisma.docArticle.findUnique({
                where: { slug: doc.slug }
            });

            if (exists) {
                console.log(`Updating existing article: ${doc.title}`);
                await prisma.docArticle.update({
                    where: { id: exists.id },
                    data: {
                        title: doc.title,
                        category: doc.category,
                        type: doc.type,
                        order: doc.order,
                        content: doc.content,
                        updatedAt: new Date()
                    }
                });
            } else {
                console.log(`Creating new article: ${doc.title}`);
                await prisma.docArticle.create({
                    data: {
                        title: doc.title,
                        slug: doc.slug,
                        category: doc.category,
                        type: doc.type, // 'docs' or 'university'
                        order: doc.order,
                        content: doc.content
                    }
                });
            }
        } catch (error) {
            console.error(`Failed to process ${doc.slug}:`, error);
        }
    }

    console.log("Seeding App Integrations finished.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
