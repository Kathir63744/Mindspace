"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { SectionBadge } from "./Services";
import Link from "next/link";
import WorldMap, { DataItem } from "react-svg-worldmap";

// ==========================================
// FIX: Bypass SSR for the map to prevent hydration mismatch
// ==========================================
const MapComponent = dynamic(
    () => Promise.resolve(({ mapData }: { mapData: DataItem<number>[] }) => (
        <WorldMap
            color="#2dd4bf"
            valueSuffix=""
            size="responsive"
            data={mapData}
            backgroundColor="#2c3a5aff"
            borderColor="#042F2E"
            strokeOpacity={1}
            styleFunction={(context) => {
                const baseActiveCountries = ["ca", "us", "mx", "br", "ar", "gb", "fr", "de", "es", "pl", "ua", "za", "in", "au", "nz"];
                const isBaseActive = baseActiveCountries.includes(context.countryCode);
                return {
                    fill: isBaseActive ? "#2dd4bf" : "#acacb8ff",
                    stroke: isBaseActive ? "#042F2E" : "#0F766E",
                    strokeWidth: isBaseActive ? 1.5 : 0.5,
                    strokeLinejoin: "round",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                };
            }}
        />
    )),
    {
        ssr: false,
        loading: () => (
            <div className="flex h-[400px] w-full items-center justify-center text-white/50">
                Loading map...
            </div>
        )
    }
);

// Grouping countries by Continent for the Hover Effect
const continentMap: Record<string, string[]> = {
    "North America": ["ca", "us", "mx", "gl", "cu", "do", "ht", "jm", "pr", "tt", "bs", "bz", "cr", "sv", "gt", "hn", "ni", "pa"],
    "South America": ["br", "ar", "cl", "co", "pe", "ve", "ec", "bo", "py", "uy", "gy", "sr", "gf"],
    "Europe": ["gb", "fr", "de", "es", "it", "pl", "ua", "ro", "nl", "be", "cz", "gr", "pt", "se", "hu", "at", "ch", "bg", "rs", "dk", "fi", "sk", "no", "ie", "hr", "ba", "al", "lt", "si", "lv", "ee", "cy", "lu", "mt", "is"],
    "Asia": ["cn", "in", "id", "pk", "bd", "jp", "ph", "vn", "tr", "ir", "th", "mm", "kr", "iq", "af", "my", "sa", "uz", "ye", "np", "kp", "tw", "lk", "kz", "sy", "kh", "jo", "az", "ae", "tj", "il", "la", "kg", "tm", "sg", "om", "ps", "lb", "qa", "kw", "ge", "mn", "am", "bh", "bt", "bn", "mv"],
    "Africa": ["ng", "et", "eg", "cd", "za", "tz", "ke", "sd", "dz", "ug", "ma", "ao", "mz", "gh", "mg", "cm", "ci", "ne", "bf", "ml", "mw", "zm", "sn", "td", "so", "zw", "gn", "rw", "bj", "bi", "tn", "ss", "tg", "sl", "ly", "lr", "mr", "er", "gm", "bw", "ga", "ls", "gw", "gq", "mu", "sz", "dj", "re", "km", "cv", "st", "sc", "yt"],
    "Oceania": ["au", "pg", "nz", "fj", "sb", "vu", "ws", "ki", "to", "fm", "mh", "pw", "nc", "pf"]
};

const baseActiveCountries = ["ca", "us", "mx", "br", "ar", "gb", "fr", "de", "es", "pl", "ua", "za", "in", "au", "nz"];
const mapData: DataItem<number>[] = baseActiveCountries.map(c => ({ country: c as any, value: 1 }));

export default function GlobalMap() {
    const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = mapRef.current;
        if (!container) return;

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as SVGPathElement;
            if (target.tagName === "path") {
                const name = target.getAttribute("data-country-name") || target.querySelector("title")?.textContent;
                if (name) setHoveredCountry(name);
            }
        };

        const handleMouseOut = () => setHoveredCountry(null);

        container.addEventListener("mouseover", handleMouseOver);
        container.addEventListener("mouseout", handleMouseOut);

        return () => {
            container.removeEventListener("mouseover", handleMouseOver);
            container.removeEventListener("mouseout", handleMouseOut);
        };
    }, []);

    return (
        <section className="relative overflow-hidden bg-[#0B0B0C] py-24 sm:py-32">
            <div aria-hidden="true" className="absolute right-0 top-0 -z-10 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/3 rounded-full bg-[#2dd4bf]/5 blur-[120px]" />

            <div className="mx-auto max-w-[90rem] px-8 lg:px-24">
                <div className="grid gap-16 lg:grid-cols-12 lg:items-center">

                    {/* LEFT: Text Content */}
                    <div className="lg:col-span-5">
                        <SectionBadge text="Global Reach" />
                        <h2 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
                            Global <span className="text-[#2dd4bf] italic">delivery.</span>
                        </h2>
                        <p className="mt-4 text-lg leading-relaxed text-white/50">
                            We have extensive experience guiding students to top institutions across the globe. Hover over the map to explore our presence.
                        </p>

                        <div className="mt-10 rounded-2xl border border-white/5 bg-[#151517] p-6 shadow-xl">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-[#2dd4bf]">Our Clients Come From:</h3>
                            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-white/70">
                                {["North America", "South America", "Europe", "United Kingdom", "Asia", "India", "Australia", "Africa"].map(c => (
                                    <li key={c} className="flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#2dd4bf]" /> {c}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-10">
                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-3 rounded-full bg-[#2dd4bf] px-8 py-4 font-bold text-[#0B0B0C] transition-all hover:scale-105 hover:bg-[#5eead4]"
                            >
                                Check your eligibility
                                <svg viewBox="0 0 20 20" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT: Interactive Map */}
                    <div className="relative lg:col-span-7 flex justify-center items-center">
                        <div className="relative w-full overflow-hidden rounded-3xl border border-white/5 bg-[#151517]/50 p-6 shadow-2xl backdrop-blur-sm">

                            {/* Custom Teal Pop-Up Tooltip */}
                            <div className={`absolute top-6 right-6 z-50 rounded-xl border-2 border-[#0F766E] bg-[#0B0B0C]/95 px-5 py-3 shadow-[0_0_30px_rgba(15,118,110,0.4)] backdrop-blur-md transition-all duration-300 ${hoveredCountry ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
                                }`}>
                                <div className="flex items-center gap-3">
                                    <span className="flex h-3 w-3 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2dd4bf] opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#2dd4bf]"></span>
                                    </span>
                                    <div>
                                        <p className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">Destination</p>
                                        <p className="text-sm font-bold text-white whitespace-nowrap">
                                            {hoveredCountry || "Hover over a country"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* The Map Wrapper with Ref */}
                            <div ref={mapRef} className="flex w-full items-center justify-center">
                                <MapComponent mapData={mapData} />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}