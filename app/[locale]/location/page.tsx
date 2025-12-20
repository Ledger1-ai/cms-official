import { Metadata } from "next";
import { prismadb as prisma } from "@/lib/prisma";
import { LocationMap } from "@/components/locations/LocationMap";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { MapPin, Sparkles, Navigation, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Country, Region, City } from "@prisma/client";

export const metadata: Metadata = {
    title: "Global Locations | Ledger AI",
    description: "Explore our offices and presence across the globe.",
};

async function getLocations() {
    return await prisma.country.findMany({
        include: {
            regions: {
                include: {
                    cities: true,
                },
            },
            cities: true,
        },
    });
}

export default async function LocationPage() {
    const countries = await getLocations();

    // Calculate stats
    const allCities = countries.flatMap((c: Country & { regions: (Region & { cities: City[] })[] }) => c.regions.flatMap((r: Region & { cities: City[] }) => r.cities));
    const topCities = allCities.sort((a: City, b: City) => ((b.population || 0) - (a.population || 0))).slice(0, 8);

    // Flatten all cities with hierarchy for the listing
    // We filter for countries that have regions or direct cities
    const locationList = countries.filter((c: Country & { regions: Region[], cities: City[] }) => c.regions.length > 0 || c.cities.length > 0)
        .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-purple-500/30">

            {/* Background Ambience */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 py-20 space-y-24">

                {/* Hero Section */}
                <section className="text-center max-w-4xl mx-auto space-y-6 relative">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
                        <Globe className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-medium text-emerald-200">Global Infrastructure</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-400">
                            Our Global
                        </span>
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-purple-500">
                            Presence
                        </span>
                    </h1>

                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
                        Spanning over {allCities.length} cities worldwide. Explore our local hubs, regional offices, and data centers powering the next generation of AI content.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 pt-4">
                        {topCities.map((city: City) => (
                            <Link
                                key={city.id}
                                href={`/location/${city.slug}`}
                                className="group flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-transparent text-slate-200 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-emerald-500 hover:text-white hover:border-transparent hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-105"
                            >
                                <MapPin className="w-4 h-4 text-emerald-400 group-hover:text-white transition-colors" />
                                <span className="text-sm font-bold">{city.name}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Map Section */}
                <section className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-emerald-500/20 rounded-3xl blur-2xl -z-10 opacity-50" />
                    <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-1 backdrop-blur-sm shadow-2xl">
                        <LocationMap countries={countries} />
                    </div>
                </section>

                {/* Major Cities Column Section */}
                <section className="space-y-12">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-4">
                            Explore Locations by Region
                        </h2>
                        <p className="text-slate-400">
                            Drill down into our specific operating regions to find local support and services.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {locationList.map((country: Country & { regions: (Region & { cities: City[] })[], cities: City[] }) => (
                            <div key={country.id} className="space-y-6">
                                {/* Country Header */}
                                <div className="flex items-center gap-3 pb-2 border-b border-white/10">
                                    <h3 className="text-2xl font-bold text-white">{country.name}</h3>
                                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs font-mono text-slate-400">{country.code}</span>
                                </div>

                                {/* Regions List */}
                                <div className="space-y-8">
                                    {country.regions.sort((a: Region, b: Region) => a.name.localeCompare(b.name)).map((region: Region & { cities: City[] }) => (
                                        <div key={region.id} className="group">
                                            <h4 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                                                <Navigation className="w-4 h-4" />
                                                {region.name}
                                            </h4>

                                            <div className="grid grid-cols-1 gap-3 pl-4 border-l-2 border-white/5 group-hover:border-emerald-500/30 transition-colors">
                                                {region.cities.sort((a: City, b: City) => a.name.localeCompare(b.name)).map((city: City) => (
                                                    <Link
                                                        key={city.id}
                                                        href={`/location/${city.slug}`}
                                                        className="flex items-center gap-4 p-3 rounded-xl bg-slate-900/40 border border-white/5 transition-all duration-300 hover:bg-slate-800 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:scale-[1.02] group/city"
                                                    >
                                                        <div className="w-10 h-10 rounded-lg bg-slate-800 border border-white/5 flex items-center justify-center group-hover/city:border-purple-500/50 group-hover/city:bg-purple-500/10 transition-all">
                                                            <Sparkles className="w-5 h-5 text-slate-500 group-hover/city:text-purple-400 transition-colors" />
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-slate-200 group-hover/city:text-white transition-colors">
                                                                {city.name}
                                                            </div>
                                                            {city.native_name && city.native_name !== city.name && (
                                                                <div className="text-xs text-slate-600 font-mono group-hover/city:text-purple-400/70 transition-colors">
                                                                    {city.native_name}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}
