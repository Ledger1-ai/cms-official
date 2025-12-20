"use client";

import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { geoCentroid } from "d3-geo";
import { Tooltip } from "react-tooltip";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MapPin, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface LocationMapProps {
    countries: any[];
}

export function LocationMap({ countries }: LocationMapProps) {
    const [selectedCountry, setSelectedCountry] = useState<any | null>(null);
    const [selectedRegion, setSelectedRegion] = useState<any | null>(null);
    const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

    // Handle drilldown
    // Handle drilldown
    const handleCountryClick = (geo: any) => {
        const properties = geo.properties;

        // Try multiple matching strategies
        // 1. ISO Code (standard)
        // 2. Exact Name
        // 3. Case-insensitive Name
        // 4. Known Aliases
        let country = countries.find((c) =>
            (c.code === properties.ISO_A2) ||
            (c.code === properties.iso_a2) ||
            (c.name === properties.name) ||
            (c.name.toLowerCase() === properties.name?.toLowerCase())
        );

        // Fallback: Check for common name discrepancies
        if (!country && properties.name) {
            const name = properties.name;
            country = countries.find(c =>
                (name === "United States of America" && c.name === "United States") ||
                (name === "South Korea" && c.name === "South Korea") ||
                (name === "Dem. Rep. Korea" && c.name === "South Korea") ||
                (name === "Korea" && c.name === "South Korea") ||
                (name === "England" && c.name === "United Kingdom") || // Rare but possible in some maps
                (c.name.includes(name) && name.length > 4) || // Risky but catches "Rep. of..."
                (name.includes(c.name) && c.name.length > 4)
            );
        }

        if (country) {
            setSelectedCountry(country);
            setSelectedRegion(null);

            // Calculate centroid for accurate zooming
            const centroid = geoCentroid(geo);
            setPosition({ coordinates: centroid, zoom: 4 });
        } else {
            console.warn("LocationMap: No matching country found for", properties);
        }
    };

    const handleReset = () => {
        if (selectedRegion) {
            setSelectedRegion(null);
        } else {
            setSelectedCountry(null);
            setPosition({ coordinates: [0, 0], zoom: 1 });
        }
    };

    const handleZoomIn = () => {
        if (position.zoom >= 8) return;
        setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.5 }));
    }

    const handleZoomOut = () => {
        if (position.zoom <= 1) return;
        setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.5 }));
    }

    const getBreadcrumbs = () => {
        const crumbs = [{ label: "World", onClick: () => { setSelectedCountry(null); setSelectedRegion(null); setPosition({ coordinates: [0, 0], zoom: 1 }); } }];
        if (selectedCountry) {
            crumbs.push({ label: selectedCountry.name, onClick: () => setSelectedRegion(null) });
        }
        if (selectedRegion) {
            crumbs.push({ label: selectedRegion.name, onClick: () => { } });
        }
        return crumbs;
    };

    return (
        <div className="w-full space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    {/* Breadcrumbs */}
                    {getBreadcrumbs().map((crumb, i) => (
                        <React.Fragment key={i}>
                            {i > 0 && <span>/</span>}
                            <button
                                onClick={crumb.onClick}
                                className={cn("hover:text-primary transition-colors", i === getBreadcrumbs().length - 1 && "text-foreground font-semibold")}
                                disabled={i === getBreadcrumbs().length - 1}
                            >
                                {crumb.label}
                            </button>
                        </React.Fragment>
                    ))}
                </div>
                {(selectedCountry || selectedRegion) && (
                    <Button variant="outline" size="sm" onClick={handleReset} className="gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Map Visualization */}
                <Card className="lg:col-span-2 overflow-hidden border-border/50 bg-black/20 backdrop-blur-sm relative flex flex-col h-[500px]">
                    {/* Map Controls */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                        <Button variant="secondary" size="icon" onClick={handleZoomIn} className="h-8 w-8 rounded-full bg-background/80 backdrop-blur border border-border/50">
                            <ZoomIn className="h-4 w-4" />
                        </Button>
                        <Button variant="secondary" size="icon" onClick={handleZoomOut} className="h-8 w-8 rounded-full bg-background/80 backdrop-blur border border-border/50">
                            <ZoomOut className="h-4 w-4" />
                        </Button>
                        <Button variant="secondary" size="icon" onClick={() => setPosition({ coordinates: [0, 0], zoom: 1 })} className="h-8 w-8 rounded-full bg-background/80 backdrop-blur border border-border/50">
                            <RotateCcw className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="w-full h-full">
                        <ComposableMap
                            projectionConfig={{ scale: 200 }}
                            className="w-full h-full"
                        >
                            <ZoomableGroup
                                zoom={position.zoom}
                                center={position.coordinates as [number, number]}
                                onMoveEnd={(pos) => setPosition(pos)}
                            >
                                <Geographies geography={geoUrl}>
                                    {({ geographies }) =>
                                        geographies.map((geo) => {
                                            const isSelected = selectedCountry?.code === geo.properties.ISO_A2 || selectedCountry?.name === geo.properties.name;
                                            return (
                                                <Geography
                                                    key={geo.rsmKey}
                                                    geography={geo}
                                                    onClick={() => handleCountryClick(geo)}
                                                    style={{
                                                        default: {
                                                            fill: isSelected ? "#10b981" : "#3f3f46",
                                                            outline: "none",
                                                            stroke: "#18181b",
                                                            strokeWidth: 0.5,
                                                        },
                                                        hover: {
                                                            fill: "#34d399",
                                                            outline: "none",
                                                            cursor: "pointer",
                                                        },
                                                        pressed: {
                                                            fill: "#059669",
                                                            outline: "none",
                                                        },
                                                    }}
                                                />
                                            );
                                        })
                                    }
                                </Geographies>
                            </ZoomableGroup>
                        </ComposableMap>
                    </div>

                    {!selectedCountry && (
                        <div className="absolute bottom-4 left-4 text-xs text-muted-foreground p-2 bg-black/40 rounded backdrop-blur-sm pointer-events-none">
                            Click a country to view regions & cities
                        </div>
                    )}
                </Card>

                {/* Drilldown List */}
                <div className="space-y-4 flex flex-col h-[500px]">
                    <h2 className="text-xl font-semibold tracking-tight shrink-0">
                        {selectedRegion ? `Cities in ${selectedRegion.name}` : selectedCountry ? `Regions in ${selectedCountry.name}` : "Select a Country"}
                    </h2>

                    <Card className="flex-1 p-4 bg-background/50 backdrop-blur border-border/50 overflow-y-auto">
                        {!selectedCountry ? (
                            <div className="text-muted-foreground text-sm flex flex-col items-center justify-center h-full opacity-60">
                                <MapPin className="w-10 h-10 mb-4" />
                                <p className="font-medium">Explore our global hubs</p>
                                <p>Select a country on the map to begin</p>
                            </div>
                        ) : !selectedRegion ? (
                            // Show Regions
                            <div className="space-y-2">
                                {selectedCountry.regions?.length > 0 ? (
                                    selectedCountry.regions.sort((a: any, b: any) => a.name.localeCompare(b.name)).map((region: any) => (
                                        <div
                                            key={region.id}
                                            onClick={() => setSelectedRegion(region)}
                                            className="p-3 rounded-lg border border-border/40 hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-all flex justify-between items-center group"
                                        >
                                            <span className="font-medium group-hover:text-primary">{region.name}</span>
                                            <span className="text-xs text-muted-foreground">{region.cities?.length || 0} cities</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-sm text-yellow-500">No regions found for this country.</div>
                                )}
                            </div>
                        ) : (
                            // Show Cities
                            <div className="space-y-2">
                                {selectedRegion.cities?.length > 0 ? (
                                    selectedRegion.cities.sort((a: any, b: any) => a.name.localeCompare(b.name)).map((city: any) => (
                                        <Link
                                            key={city.id}
                                            href={`/location/${city.slug}`}
                                            className="p-3 rounded-lg border border-border/40 hover:border-emerald-500/50 hover:bg-emerald-500/5 cursor-pointer transition-all flex flex-col group"
                                        >
                                            <span className="font-medium group-hover:text-emerald-400">{city.name}</span>
                                            {city.native_name && city.native_name !== city.name && (
                                                <span className="text-xs text-muted-foreground font-mono">{city.native_name}</span>
                                            )}
                                        </Link>
                                    ))
                                ) : (
                                    <div className="text-sm text-yellow-500">No cities found in this region.</div>
                                )}
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}
