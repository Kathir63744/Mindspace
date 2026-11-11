
"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { DataItem } from "react-svg-worldmap";

const WorldMap = dynamic(
    () => import("react-svg-worldmap").then((mod) => mod.default),
    {
        ssr: false,
        loading: () => (
            <div className="flex aspect-[2/1] w-full items-center justify-center rounded-2xl bg-[#101A2B] text-sm text-[#A0A9BA]">
                Loading world map...
            </div>
        ),
    }
);

type Destination = {
    code: DataItem<number>["country"];
    name: string;
    region: string;
    description: string;
    image: string;
};

const destinations: Destination[] = [
    {
        code: "ca",
        name: "Canada",
        region: "North America",
        description:
            "Explore internationally recognised universities, flexible study options and opportunities to build your future.",
        image:
            "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1200&q=85",
    },
    {
        code: "gb",
        name: "United Kingdom",
        region: "Europe",
        description:
            "Discover globally respected institutions, diverse courses and a rich academic environment.",
        image:
            "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=85",
    },
    {
        code: "au",
        name: "Australia",
        region: "Oceania",
        description:
            "Find a balance of quality education, vibrant student cities and international experiences.",
        image:
            "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=85",
    },
    {
        code: "us",
        name: "United States",
        region: "North America",
        description:
            "Explore a wide range of academic pathways, institutions and campus experiences.",
        image:
            "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?auto=format&fit=crop&w=1200&q=85",
    },
    {
        code: "nz",
        name: "New Zealand",
        region: "Oceania",
        description:
            "Discover welcoming study environments and opportunities across a range of disciplines.",
        image:
            "https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&w=1200&q=85",
    },
];

export default function GoogleMap() {
    const [activeDestination, setActiveDestination] = useState(
        destinations[0]
    );

    const mapData = useMemo<DataItem<number>[]>(
        () =>
            destinations.map((destination) => ({
                country: destination.code,
                value: 1,
            })),
        []
    );

    return (
        <section

            className="relative overflow-hidden bg-[#07090F] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
        >
            <div className="mx-autmb-10 mb-4  flex max-w-7xl items-center gap-3 px-6">
                <span className="h-px w-9 bg-[#2F7BFF]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A9C7FF]">
                    Study destinations
                </span>
                <span className="h-px max-w-24 flex-1 bg-white/10" />
            </div>
            {/* Background accents */}
            <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#2F7BFF]/10 blur-[120px]" />
            <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-[#2F7BFF]/10 blur-[120px]" />

            <div className="relative mx-auto max-w-7xl">
                {/* Section heading */}
                <div className="mb-12 max-w-2xl">


                    <h2 className="text-3xl font-semibold leading-tight tracking-tight text-[#F3F5FA] sm:text-4xl lg:text-5xl">
                        Your next chapter,
                        <span className="block text-[#2F7BFF]">
                            somewhere in the world.
                        </span>
                    </h2>

                    <p className="mt-5 max-w-xl text-sm leading-7 text-[#A0A9BA] sm:text-base">
                        Explore international study destinations and find the place
                        that feels right for your next academic journey.
                    </p>
                </div>

                {/* Main content */}
                <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                    {/* World map */}
                    <div className="relative flex min-h-[350px] items-center overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0B1220] p-5 sm:p-8">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(47,123,255,0.12),transparent_65%)]" />

                        <div className="relative w-full">
                            <div className="mb-5 flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-sm font-semibold text-white">
                                        Explore the world
                                    </p>
                                    <p className="mt-1 text-xs text-[#7F8DA3]">
                                        Highlighted countries are study destinations
                                    </p>
                                </div>

                                <div className="flex shrink-0 items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-[#2F7BFF]" />
                                    <span className="text-[11px] text-[#A0A9BA]">
                                        Destinations
                                    </span>
                                </div>
                            </div>

                            <div className="w-full">
                                <WorldMap
                                    color="#2F7BFF"
                                    backgroundColor="transparent"
                                    borderColor="#26364F"
                                    size="responsive"
                                    data={mapData}
                                    frame={false}
                                    richInteraction={false}
                                    styleFunction={(context) => ({
                                        fill: context.countryValue
                                            ? "#2F7BFF"
                                            : "#1A2A40",
                                        stroke: "#26364F",
                                        strokeWidth: 0.7,
                                    })}
                                />
                            </div>

                            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/[0.07] pt-5">
                                <span className="text-xs text-[#A0A9BA]">
                                    <span className="mr-2 inline-block h-2 w-2 rounded-sm bg-[#2F7BFF]" />
                                    Study destinations
                                </span>
                                <span className="text-xs text-[#A0A9BA]">
                                    <span className="mr-2 inline-block h-2 w-2 rounded-sm bg-[#1A2A40]" />
                                    Other countries
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Selected destination */}
                    <div className="group relative min-h-[350px] overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0B1220]">
                        <div className="absolute inset-0">
                            <img
                                key={activeDestination.name}
                                src={activeDestination.image}
                                alt={activeDestination.name}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#07090F] via-[#07090F]/55 to-[#07090F]/10" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#07090F]/30 to-transparent" />
                        </div>

                        <div className="relative flex min-h-[350px] flex-col justify-end p-7 sm:p-9">
                            <span className="mb-4 w-fit rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-[#D8E5FF] backdrop-blur-md">
                                {activeDestination.region}
                            </span>

                            <h3 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                                {activeDestination.name}
                            </h3>

                            <p className="mt-3 max-w-md text-sm leading-7 text-white/75">
                                {activeDestination.description}
                            </p>

                            <div className="mt-7 flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#2F7BFF]" />
                                <span className="text-xs font-medium text-white/70">
                                    Explore your possibilities
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Destination selector */}
                <div className="mt-8">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-white">
                            Choose your destination
                        </h3>
                        <span className="text-xs text-[#7F8DA3]">
                            {destinations.length} destinations
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                        {destinations.map((destination) => {
                            const isActive =
                                activeDestination.code === destination.code;

                            return (
                                <button
                                    key={destination.code}
                                    type="button"
                                    onClick={() => setActiveDestination(destination)}
                                    aria-pressed={isActive}
                                    className={`group flex items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-300 sm:p-4 ${isActive
                                        ? "border-[#2F7BFF]/60 bg-[#2F7BFF]/10"
                                        : "border-white/[0.08] bg-[#0B1220] hover:border-[#2F7BFF]/40 hover:bg-[#101A2B]"
                                        }`}
                                >
                                    <span
                                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold transition-colors ${isActive
                                            ? "bg-[#2F7BFF] text-white"
                                            : "bg-white/[0.06] text-[#A0A9BA] group-hover:bg-[#2F7BFF]/15 group-hover:text-[#A9C7FF]"
                                            }`}
                                    >
                                        {destination.code.toUpperCase()}
                                    </span>

                                    <span className="min-w-0">
                                        <span
                                            className={`block truncate text-xs font-semibold sm:text-sm ${isActive ? "text-white" : "text-[#A0A9BA]"
                                                }`}
                                        >
                                            {destination.name}
                                        </span>
                                        <span className="mt-1 block text-[10px] text-[#718096]">
                                            {destination.region}
                                        </span>
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
