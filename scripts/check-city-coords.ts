
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkCity() {
    const city = await prisma.city.findFirst({
        where: {
            name: { contains: "Mexico City", mode: "insensitive" }
        },
        include: {
            country: true
        }
    });

    console.log("Checking Mexico City:");
    if (city) {
        console.log(`Name: ${city.name}`);
        console.log(`Slug: ${city.slug}`);
        console.log(`Lat: ${city.lat}`);
        console.log(`Lng: ${city.lng}`);
        console.log(`Country: ${city.country?.name}`);
    } else {
        console.log("Mexico City not found in DB");
    }

    // Also check Seoul
    const seoul = await prisma.city.findFirst({
        where: { name: { contains: "Seoul", mode: "insensitive" } }
    });
    console.log("\nChecking Seoul:");
    if (seoul) {
        console.log(`Name: ${seoul.name}`);
        console.log(`Lat: ${seoul.lat}`);
        console.log(`Lng: ${seoul.lng}`);
    } else {
        console.log("Seoul not found in DB");
    }
}

checkCity()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
