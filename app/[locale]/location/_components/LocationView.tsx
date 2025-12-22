"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Search, MapPin, ArrowLeft, X, Globe, Map as MapIcon, Server, Shield, Globe2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import HolographicMap from "./HolographicMap";
import CityModal from "./CityModal";
import Link from "next/link";

// Types
interface City {
    id: string;
    name: string;
    lat: number | null;
    lng: number | null;
    countryCode?: string;
    countryName?: string;
    regionName?: string;
}

interface Region {
    id: string;
    name: string;
    cities: City[];
}

interface Country {
    id: string;
    name: string;
    code: string;
    regions: Region[];
}

interface LocationViewProps {
    countries: Country[];
}

export default function LocationView({ countries }: LocationViewProps) {
    // State
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const [cityModalOpen, setCityModalOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Flatten all cities for search
    const allCities = useMemo(() => {
        return countries.flatMap((country) =>
            country.regions.flatMap((region) =>
                region.cities
                    .filter((city) => city.lat !== null && city.lng !== null)
                    .map((city) => ({
                        ...city,
                        countryName: country.name,
                        countryCode: country.code,
                        regionName: region.name,
                    }))
            )
        );
    }, [countries]);

    // Filtered cities for search
    const filteredCities = useMemo(() => {
        if (!searchQuery.trim()) return allCities.slice(0, 12);
        const q = searchQuery.toLowerCase();
        return allCities
            .filter((c) => c.name.toLowerCase().includes(q) || c.countryName?.toLowerCase().includes(q))
            .slice(0, 12);
    }, [allCities, searchQuery]);

    // Filter cities for the MAP (Progressive Disclosure)
    const mapCities = useMemo(() => {
        // 1. If searching, show matches on map
        if (searchQuery.trim()) {
            return filteredCities;
        }
        // 2. If country selected, show ONLY that country's cities
        if (selectedCountry) {
            return allCities.filter(c => c.countryCode === selectedCountry.code);
        }
        // 3. Global view: CLEAN MAP (No dots) as requested
        return [];
    }, [searchQuery, filteredCities, selectedCountry, allCities]);

    // Handlers
    const handleCountryClick = useCallback((item: any) => {
        // The HolographicMap passes { code, name } or the raw geo object
        // We normalize everything to find the best match
        const inputCode = (item.code || item.properties?.ISO_A2 || item.id || "").toUpperCase();
        const inputName = (item.name || item.properties?.name || "").toLowerCase();

        // 1. Try Exact Code Match (Case Insensitive)
        let country = countries.find(c =>
            c.code.toUpperCase() === inputCode ||
            c.code.toUpperCase() === (item.properties?.ISO_A3 || "").toUpperCase()
        );

        // 2. Fallback: Name Match (Exact & Fuzzy)
        if (!country && inputName) {
            country = countries.find(c => {
                const dbName = c.name.toLowerCase();
                return dbName === inputName || dbName.includes(inputName) || inputName.includes(dbName);
            });
        }

        if (country) {
            console.log("Matched Country:", country.name);
            setSelectedCountry(country);
            setSelectedCity(null);
            setCityModalOpen(false); // Close modal if switching countries
        } else {
            console.warn("Could not find match for:", item);
        }
    }, [countries]);

    const handleCityClick = useCallback((city: City) => {
        // 1. Set Country (Enables zoom & context) if not already set
        // Use find to ensure we get the full country object
        const country = countries.find((c) => c.code === city.countryCode);
        if (country) setSelectedCountry(country);

        // 2. Set City & Open Modal
        setSelectedCity(city);
        setCityModalOpen(true);

        // 3. Clear Search
        setSearchOpen(false);
        setSearchQuery("");
    }, [countries]);

    const handleReset = useCallback(() => {
        setSelectedCountry(null);
        setSelectedCity(null);
        setCityModalOpen(false);
    }, []);

    // Keyboard shortcut for search
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setSearchOpen((prev) => !prev);
            }
            if (e.key === "Escape") {
                setSearchOpen(false);
            }
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, []);

    return (
        <div className="min-h-screen bg-[#020617] py-24 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[128px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        Global <span className="text-emerald-400">Network</span>
                    </h1>
                    <p className="text-emerald-500/60 max-w-2xl mx-auto font-mono text-sm uppercase tracking-widest">
                        Live Operational Infrastructure
                    </p>
                </div>

                {/* Navigation Bar */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-2 text-sm bg-white/5 p-2 rounded-lg border border-white/5 self-start">
                        <button
                            onClick={handleReset}
                            className={cn(
                                "uppercase tracking-widest text-xs px-3 py-1.5 rounded-md transition-all flex items-center gap-2",
                                !selectedCountry ? "bg-emerald-500 text-[#020617] font-bold shadow-lg shadow-emerald-500/20" : "text-emerald-500/50 hover:text-emerald-400 hover:bg-white/5"
                            )}
                        >
                            <Globe className="w-3 h-3" /> Global
                        </button>
                        {selectedCountry && (
                            <>
                                <span className="text-white/20">/</span>
                                <span className="text-emerald-400 font-bold uppercase tracking-widest text-xs px-2 animate-in fade-in slide-in-from-left-2">
                                    {selectedCountry.name}
                                </span>
                            </>
                        )}
                    </div>

                    {/* Search & Back */}
                    <div className="flex items-center gap-3">
                        {selectedCountry && (
                            <button
                                onClick={handleReset}
                                className="flex items-center gap-2 px-4 py-2.5 bg-black/40 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/10 transition-all text-emerald-400 text-xs uppercase tracking-widest"
                            >
                                <ArrowLeft className="w-3 h-3" /> Back to Map
                            </button>
                        )}
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="flex-1 md:flex-none flex items-center gap-3 px-5 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all group min-w-[200px]"
                        >
                            <Search className="w-4 h-4 text-emerald-500 group-hover:text-emerald-400" />
                            <span className="text-emerald-500/80 text-xs uppercase tracking-widest font-bold group-hover:text-emerald-400">
                                Search Nodes...
                            </span>
                        </button>
                    </div>
                </div>

                {/* Main Grid: Stack on Mobile, split on Desktop */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:h-[700px] mb-24">
                    {/* Holographic Map Container */}
                    <div className="h-[500px] lg:h-auto lg:col-span-3 relative overflow-hidden rounded-3xl border border-emerald-500/10 bg-[#020617] shadow-2xl shadow-black/50 group">
                        <div className="absolute inset-0 z-0">
                            <HolographicMap
                                countries={countries}
                                cities={mapCities} // Use filtered cities
                                selectedCountry={selectedCountry}
                                selectedCity={selectedCity}
                                onCountryClick={handleCountryClick}
                                onCityClick={handleCityClick}
                            />
                        </div>

                        {/* HUD Info */}
                        <div className="absolute bottom-6 left-6 right-6 md:right-auto p-4 bg-black/80 border border-emerald-500/20 backdrop-blur-xl rounded-2xl md:max-w-xs z-10 pointer-events-none">
                            <div className="flex items-center gap-2 mb-2">
                                <div className={cn("w-2 h-2 rounded-full animate-pulse", selectedCountry ? "bg-emerald-400" : "bg-blue-400")} />
                                <span className="text-white font-bold text-sm uppercase tracking-wider">
                                    {selectedCountry ? selectedCountry.name : "System Idle"}
                                </span>
                            </div>
                            <p className="text-emerald-500/60 text-[10px] font-mono leading-relaxed">
                                {selectedCountry
                                    ? ` Active Sector. ${selectedCountry.regions.reduce((acc, r) => acc + r.cities.length, 0)} Nodes Online.`
                                    : "Select a region on the map to initialize connection."}
                            </p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="bg-black/30 border border-white/5 backdrop-blur-2xl rounded-3xl overflow-hidden flex flex-col">
                        <div className="p-5 border-b border-white/5">
                            <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
                                {selectedCountry ? "Regional Nodes" : "Network Status"}
                            </h2>
                        </div>
                        <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
                            {!selectedCountry ? (
                                <div className="space-y-1">
                                    {countries.map((country) => (
                                        <button
                                            key={country.id}
                                            onClick={() => handleCountryClick(country)}
                                            className="w-full text-left p-3 rounded-xl hover:bg-white/5 transition-all group flex items-center justify-between"
                                        >
                                            <span className="font-medium text-white/70 group-hover:text-emerald-400 text-sm">
                                                {country.name}
                                            </span>
                                            <span className="text-[10px] text-emerald-500/40 font-mono uppercase">
                                                {country.code}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {selectedCountry.regions.map((region) => (
                                        <div key={region.id}>
                                            <h3 className="text-[10px] uppercase tracking-widest text-emerald-500/50 font-bold px-2 mb-2 flex items-center gap-2">
                                                <div className="w-1 h-1 bg-emerald-500/50 rounded-full" />
                                                {region.name}
                                            </h3>
                                            <div className="space-y-1">
                                                {region.cities.map((city) => (
                                                    <button
                                                        key={city.id}
                                                        onClick={() =>
                                                            handleCityClick({
                                                                ...city,
                                                                countryCode: selectedCountry.code,
                                                                countryName: selectedCountry.name,
                                                                regionName: region.name,
                                                            })
                                                        }
                                                        className={cn(
                                                            "w-full text-left p-2 rounded-lg hover:bg-white/5 flex items-center gap-2 group transition-all",
                                                            selectedCity?.id === city.id && "bg-emerald-500/10 border border-emerald-500/10"
                                                        )}
                                                    >
                                                        <MapPin className="w-3 h-3 text-emerald-500/40 group-hover:text-emerald-400" />
                                                        <span className="text-sm text-white/60 group-hover:text-emerald-100">
                                                            {city.name}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Additional Content Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 border-t border-white/5 pt-12">
                    <div className="md:col-span-1">
                        <h3 className="text-2xl font-black text-white mb-4">Enterprise Grade Infrastructure</h3>
                        <p className="text-emerald-500/60 leading-relaxed text-sm">
                            Our global mesh network provides industry-leading latency and reliability.
                            Deployed across 35+ countries with redundancy at every layer.
                        </p>
                    </div>
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                            <Server className="w-8 h-8 text-emerald-400 mb-4" />
                            <h4 className="font-bold text-white mb-2">Edge Computing</h4>
                            <p className="text-xs text-white/50">Processing power distributed to the network edge.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                            <Shield className="w-8 h-8 text-emerald-400 mb-4" />
                            <h4 className="font-bold text-white mb-2">DDoS Protection</h4>
                            <p className="text-xs text-white/50">Automated threat mitigation across all nodes.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                            <Globe2 className="w-8 h-8 text-emerald-400 mb-4" />
                            <h4 className="font-bold text-white mb-2">Anycast Routing</h4>
                            <p className="text-xs text-white/50">Intelligent path optimization for lowest latency.</p>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center py-20 relative overflow-hidden rounded-3xl bg-emerald-950/20 border border-emerald-500/10 mb-12">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:30px_30px] opacity-30" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Ready to Deploy?</h2>
                        <p className="text-emerald-500/70 mb-8 max-w-lg mx-auto">
                            Join thousands of enterprises running on our global high-performance network.
                        </p>
                        <Link
                            href="/pricing"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-[#020617] font-bold rounded-full hover:bg-emerald-400 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                        >
                            Start Free Trial <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <CityModal
                open={cityModalOpen}
                onClose={() => setCityModalOpen(false)}
                city={selectedCity}
            />

            {/* Search Modal */}
            {searchOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSearchOpen(false)} />
                    <div className="relative w-full max-w-2xl mx-4 bg-[#020617] border border-emerald-500/20 rounded-2xl shadow-2xl overflow-hidden">
                        {/* Search Input */}
                        <div className="flex items-center gap-3 p-4 border-b border-emerald-500/10">
                            <Search className="w-5 h-5 text-emerald-500/50" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search cities or countries..."
                                className="flex-1 bg-transparent text-white placeholder:text-emerald-500/30 outline-none text-lg"
                                autoFocus
                            />
                            <button
                                onClick={() => setSearchOpen(false)}
                                className="p-1 hover:bg-white/5 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-emerald-500/50" />
                            </button>
                        </div>

                        {/* Results */}
                        <div className="max-h-[50vh] overflow-y-auto p-2">
                            {filteredCities.length === 0 ? (
                                <div className="py-12 text-center text-emerald-500/40 font-mono uppercase tracking-widest text-sm">
                                    No nodes found
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    {filteredCities.map((city) => (
                                        <button
                                            key={city.id}
                                            onClick={() => handleCityClick(city)}
                                            className="w-full text-left p-3 rounded-xl hover:bg-emerald-500/10 transition-all group flex items-center gap-4"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-emerald-950/50 border border-emerald-500/10 flex items-center justify-center">
                                                <MapPin className="w-4 h-4 text-emerald-500/50 group-hover:text-emerald-400" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-emerald-100 group-hover:text-white">
                                                    {city.name}
                                                </div>
                                                <div className="text-xs text-emerald-500/50 uppercase tracking-wider font-mono">
                                                    {city.countryName}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
