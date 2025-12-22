import { prismadb } from "@/lib/prisma";
import MarketingLayout from "@/components/marketing/MarketingLayout";
import LocationView from "./_components/LocationView";

// Fetch location data server-side
async function getLocations() {
    const countries = await prismadb.country.findMany({
        select: {
            id: true,
            name: true,
            code: true,
            regions: {
                select: {
                    id: true,
                    name: true,
                    cities: {
                        select: {
                            id: true,
                            name: true,
                            lat: true,
                            lng: true,
                        },
                    },
                },
            },
        },
        orderBy: { name: "asc" },
    });
    return countries;
}

export default async function LocationPage() {
    const countries = await getLocations();

    return (
        <MarketingLayout>
            <LocationView countries={countries} />
        </MarketingLayout>
    );
}
