"use client";

import React, { useMemo, useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import { scaleLinear } from "d3-scale";

// Standard TopoJSON for world map (lightweight)
const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface HolographicMapProps {
    countries: any[];
    cities: any[];
    selectedCountry: any | null;
    selectedCity: any | null;
    onCountryClick: (geo: any) => void;
    onCityClick: (city: any) => void;
}

// Helper to generate consistent dark colors from string
const getColor = (str: string) => {
    const colors = [
        "#1e293b", // Slate 800
        "#0f172a", // Slate 900
        "#172554", // Blue 950
        "#1e1b4b", // Indigo 950
        "#312e81", // Indigo 900
        "#111827", // Gray 900
        "#022c22", // Emerald 950 (rare)
        "#4a044e", // Fuchsia 950
        "#450a0a", // Red 950
    ];
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};

export default function HolographicMap({
    countries,
    cities,
    selectedCountry,
    selectedCity,
    onCountryClick,
    onCityClick
}: HolographicMapProps) {
    const [position, setPosition] = useState({ coordinates: [0, 20] as [number, number], zoom: 1 });

    // Handle Zoom/Pan Logic
    useEffect(() => {
        if (selectedCity && selectedCity.lat && selectedCity.lng) {
            setPosition({
                coordinates: [selectedCity.lng, selectedCity.lat],
                zoom: 4,
            });
        } else if (selectedCountry) {
            // Find a city in the country to center on, or use default country centroid logic if available
            // For simplicity, we center on the first city if available, or just zoom in a bit
            const firstCity = cities.find(c => c.countryCode === selectedCountry.code);
            if (firstCity && firstCity.lat && firstCity.lng) {
                setPosition({
                    coordinates: [firstCity.lng, firstCity.lat],
                    zoom: 2.5,
                });
            } else {
                setPosition({ coordinates: [0, 20], zoom: 1 });
            }
        } else {
            setPosition({ coordinates: [0, 20], zoom: 1 });
        }
    }, [selectedCity, selectedCountry, cities]);

    // Prevent hydration mismatch by only rendering on client
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="w-full h-full bg-[#020617] overflow-hidden relative">
            {/* Grid Overlay for Holographic Feel */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

            {/* Radial Gradient for Depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_90%)] pointer-events-none z-0" />

            {/* Loading / Ready State handled by parent usually, but SVG loads fast */}

            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                    scale: 140,
                }}
                className="w-full h-full relative z-10"
            >
                <ZoomableGroup
                    zoom={position.zoom}
                    center={position.coordinates}
                    onMoveEnd={(pos) => setPosition(pos)}
                    filterZoomEvent={(evt) => {
                        // Optional: Disable scroll zoom if it interferes with page scroll
                        return true;
                    }}
                    maxZoom={10}
                >
                    <Geographies geography={GEO_URL}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const isSelected = selectedCountry?.code === geo.properties.ISO_A2;
                                const baseColor = getColor(geo.properties.name || geo.rsmKey);

                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        onClick={() => {
                                            // Pass all potential identifiers to parent for robust matching
                                            onCountryClick({
                                                code: geo.properties.ISO_A2,
                                                iso3: geo.properties.ISO_A3,
                                                name: geo.properties.name || geo.properties.NAME,
                                                id: geo.id // sometimes numeric code
                                            });
                                        }}
                                        style={{
                                            default: {
                                                fill: baseColor, // Unique dark color per country
                                                stroke: isSelected ? "#34D399" : "#1e293b", // Slate outline or Emerald if selected
                                                strokeWidth: isSelected ? 1 : 0.5,
                                                outline: "none",
                                                transition: "all 0.3s ease",
                                            },
                                            hover: {
                                                fill: isSelected ? baseColor : "#334155", // Lighten slightly on hover
                                                stroke: "#34D399",
                                                strokeWidth: 1.5,
                                                outline: "none",
                                                cursor: "pointer",
                                            },
                                            pressed: {
                                                fill: "#1e293b",
                                                stroke: "#10B981",
                                                outline: "none",
                                            },
                                        }}
                                    />
                                );
                            })
                        }
                    </Geographies>

                    {/* City Markers - NO GLOW, JUST PURE DOTS */}
                    {cities.map((city) => (
                        <Marker key={city.id} coordinates={[city.lng, city.lat]}>
                            <g
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent propagation
                                    onCityClick(city);
                                }}
                                className="cursor-pointer group"
                            >
                                {/* Static Dot - No Animation */}
                                <circle
                                    r={4}
                                    fill={selectedCity?.id === city.id ? "#ffffff" : "#10B981"}
                                    stroke="#020617"
                                    strokeWidth={1}
                                    className="transition-transform duration-300 hover:scale-150 drop-shadow-[0_0_5px_rgba(16,185,129,0.8)]"
                                />
                            </g>
                        </Marker>
                    ))}
                </ZoomableGroup>
            </ComposableMap>

            {/* Overlay Text/UI elements can go here if needed */}
        </div>
    );
}
