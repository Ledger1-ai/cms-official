import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prismadb as prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

interface CityPageProps {
    params: Promise<{
        city: string;
        locale: string;
    }>;
}

export async function generateMetadata(props: CityPageProps): Promise<Metadata> {
    const params = await props.params;
    const city = await prisma.city.findUnique({
        where: { slug: params.city },
        include: { country: true, region: true },
    });

    if (!city) {
        return { title: "Location Not Found" };
    }

    const locationName = city.native_name && city.native_name !== city.name
        ? `${city.name} (${city.native_name})`
        : city.name;

    return {
        title: `${locationName} - Ledger AI Locations`,
        description: `Explore Ledger AI services and presence in ${city.name}, ${city.country.name}. Localized support and solutions available.`,
        openGraph: {
            title: `${locationName} | Ledger AI`,
            description: `Join us in ${city.name}. We are transforming industries with AI.`,
        }
    };
}

export default async function CityPage(props: CityPageProps) {
    const params = await props.params;
    const city = await prisma.city.findUnique({
        where: { slug: params.city },
        include: { country: true, region: true },
    });

    if (!city) {
        notFound();
    }

    // Placeholder content for SEO text
    const features = [
        "24/7 AI Local Support",
        "Enterprise Integration Services",
        "Custom AI Model Training",
        "On-premise Deployment Options"
    ];

    return (
        <div className="container py-10 max-w-4xl space-y-10">
            {/* Navigation */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Link href="/location" className="hover:text-primary flex items-center gap-1">
                    <ArrowLeft className="w-4 h-4" /> All Locations
                </Link>
                <span>/</span>
                <span>{city.country.name}</span>
                {city.region && (
                    <>
                        <span>/</span>
                        <span>{city.region.name}</span>
                    </>
                )}
                <span>/</span>
                <span className="text-foreground font-semibold">{city.name}</span>
            </div>

            {/* Hero Header */}
            <div className="space-y-6">
                <h1 className="text-5xl font-bold tracking-tight">
                    {city.name}
                </h1>
                {city.native_name && city.native_name !== city.name && (
                    <h2 className="text-3xl font-light text-primary font-mono">
                        {city.native_name}
                    </h2>
                )}
                <div className="flex items-center gap-4 text-muted-foreground">
                    {city.region && <span>{city.region.name}, {city.country.code}</span>}
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>Population: {city.population ? city.population.toLocaleString() : "N/A"}</span>
                </div>
            </div>

            {/* Localized Content Block */}
            <Card className="p-8 bg-gradient-to-br from-background to-secondary/20 border-border/60">
                <div className="space-y-6">
                    <h3 className="text-2xl font-semibold">
                        Building the future of AI in {city.native_name || city.name}
                    </h3>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                        Ledger AI is proud to serve the innovative community of {city.name}.
                        Our team provides tailored AI solutions designed to meet the unique needs of businesses in the {city.region ? city.region.name : city.country.name} region.
                        Whether you are looking for automated customer support, predictive analytics, or autonomous agents, we have the infrastructure to scale with you locally.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 pt-4">
                        {features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                <span className="font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6">
                        <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shdaow-emerald-900/20">
                            Contact {city.name} Team
                        </Button>
                    </div>
                </div>
            </Card>

            {/* City Statistics / Metadata (SEO fodder) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-4 text-center">
                    <div className="text-xs uppercase text-muted-foreground mb-1">Country</div>
                    <div className="font-semibold">{city.country.name}</div>
                </Card>
                <Card className="p-4 text-center">
                    <div className="text-xs uppercase text-muted-foreground mb-1">Region Code</div>
                    <div className="font-semibold">{city.region?.slug || "N/A"}</div>
                </Card>
                <Card className="p-4 text-center">
                    <div className="text-xs uppercase text-muted-foreground mb-1">Timezone</div>
                    <div className="font-semibold">Local</div>
                </Card>
                <Card className="p-4 text-center">
                    <div className="text-xs uppercase text-muted-foreground mb-1">Status</div>
                    <div className="font-semibold text-emerald-500">Active Hub</div>
                </Card>
            </div>
        </div>
    );
}
