// app/components/consultant/services/ServicesHero.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Eyebrow, GradientText, Icon } from "./ServicesUi";
import ServiceBackgrounVideo from "./ServiceBackgrounVideo";

const TECH_TILES = [
    {
        id: "services/website-development",
        tag: "Websites",
        index: "01",
        headline: "Websites that convert.",
        summary:
            "Fast, responsive, SEO-ready websites — from marketing sites to content platforms — built on modern frameworks and tuned for performance.",
        stats: [
            { value: "Next.js", label: "Framework" },
            { value: "<1s", label: "LCP target" },
            { value: "100", label: "Lighthouse goal" },
        ],
        icon: "globe" as const,
    },
    {
        id: "services/app-development",
        tag: "Mobile apps",
        index: "02",
        headline: "Apps people keep.",
        summary:
            "Native-quality iOS and Android apps with React Native or Flutter — one codebase, two stores, predictable releases.",
        stats: [
            { value: "iOS + Android", label: "Platforms" },
            { value: "1 codebase", label: "RN / Flutter" },
            { value: "OTA", label: "Updates" },
        ],
        icon: "mobile" as const,
    },
    {
        id: "services/web-application",
        tag: "Web apps",
        index: "03",
        headline: "Platforms that scale.",
        summary:
            "Cloud-based web applications — dashboards, portals, SaaS products — with auth, roles, payments and APIs designed to grow.",
        stats: [
            { value: "Multi-tenant", label: "Architecture" },
            { value: "SSO / RBAC", label: "Security" },
            { value: "99.9%", label: "Uptime" },
        ],
        icon: "layers" as const,
    },
    {
        id: "services/software-development",
        tag: "Custom software",
        index: "04",
        headline: "Software that fits.",
        summary:
            "When off-the-shelf tools no longer fit, we build custom internal systems, integrations and automations around how your business actually works.",
        stats: [
            { value: "Bespoke", label: "Scope" },
            { value: "API-first", label: "Integrations" },
            { value: "Owned", label: "IP & source" },
        ],
        icon: "code" as const,
    },
];

export default function ServicesHero() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(t);
    }, []);

    return (
        <section
            aria-label="MindSpace technology services"
            className="relative w-full overflow-hidden bg-[var(--ms-background)] text-[var(--ms-text)]"
        >
            {/* Video background */}
            <ServiceBackgrounVideo src="/service-bg.mp4" rate={0.85} />

            {/* Themed tint over the video */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-[1]"
                style={{
                    background:
                        "color-mix(in srgb, var(--ms-background) 55%, transparent)",
                }}
            />

            {/* Bottom blend */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[35%]"
                style={{
                    background:
                        "linear-gradient(to top, var(--ms-background) 0%, color-mix(in srgb, var(--ms-background) 60%, transparent) 45%, transparent 100%)",
                }}
            />

            {/* Top blend into navbar */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[30%]"
                style={{
                    background:
                        "linear-gradient(to bottom, color-mix(in srgb, var(--ms-background) 90%, transparent) 0%, color-mix(in srgb, var(--ms-background) 25%, transparent) 55%, transparent 100%)",
                }}
            />

            <div className="relative z-10 mx-auto max-w-[1320px] px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:px-10 lg:pt-36">
                <div
                    className="mx-auto max-w-3xl text-center"
                    style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "none" : "translateY(24px)",
                        transition:
                            "opacity 900ms ease, transform 900ms cubic-bezier(0.22,1,0.36,1)",
                    }}
                >
                    <Eyebrow>Technology solutions · MindSpace</Eyebrow>

                    <h1 className="mt-6 font-display text-[clamp(2.2rem,5.2vw,4.6rem)] leading-[1.05] tracking-[-0.05em] text-[var(--ms-text)]">
                        Software built
                        <br />
                        <GradientText>around your business.</GradientText>
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-[14px] leading-[1.8] text-[var(--ms-muted)] sm:text-[15px]">
                        Websites, mobile apps, web applications and custom
                        software — designed, built and maintained by one
                        engineering team. Pick the track that matches what you
                        need to ship.
                    </p>
                </div>

                <div id="service-paths" className="mt-12 w-full sm:mt-14">
                    <ul className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {TECH_TILES.map((tile, idx) => (
                            <li key={tile.id}>
                                <Link
                                    href={`/${tile.id}`}
                                    className="group relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-3xl border border-[color-mix(in_srgb,var(--ms-accent)_25%,transparent)] p-6 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-[var(--ms-accent)] hover:shadow-[0_30px_80px_-30px_var(--ms-accent)] sm:p-7"
                                    style={{
                                        background:
                                            "linear-gradient(to bottom, color-mix(in srgb, var(--ms-accent) 8%, transparent), color-mix(in srgb, var(--ms-background) 70%, transparent))",
                                        animation: mounted
                                            ? `tile-in 900ms cubic-bezier(0.22,1,0.36,1) ${idx * 120}ms both`
                                            : undefined,
                                        opacity: mounted ? undefined : 0,
                                    }}
                                >
                                    <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-0 z-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-transform duration-[1400ms] ease-out group-hover:translate-x-[150%]"
                                    />

                                    <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-x-0 -bottom-1/2 z-0 h-full opacity-40 transition-opacity duration-500 group-hover:opacity-100"
                                        style={{
                                            background:
                                                "radial-gradient(ellipse at 50% 100%, color-mix(in srgb, var(--ms-accent) 30%, transparent), transparent 65%)",
                                            animation: `glow-pulse 5s ease-in-out ${idx * 0.8}s infinite`,
                                        }}
                                    />

                                    <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute -right-12 -top-12 z-0 h-40 w-40 rounded-full blur-3xl transition-colors duration-700"
                                        style={{
                                            background:
                                                "color-mix(in srgb, var(--ms-accent) 0%, transparent)",
                                        }}
                                    />

                                    <div className="relative z-10 flex items-center justify-between">
                                        <span className="font-mono text-[11px] tracking-[0.15em] text-[var(--ms-accent)]">
                                            {tile.index} / 04
                                        </span>

                                        <span className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--ms-accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--ms-accent)_10%,transparent)] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--ms-text)]">
                                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--ms-accent)]" />
                                            {tile.tag}
                                        </span>
                                    </div>

                                    <span
                                        className="relative z-10 mt-6 grid h-12 w-12 place-items-center rounded-2xl border border-[color-mix(in_srgb,var(--ms-accent)_40%,transparent)] bg-[color-mix(in_srgb,var(--ms-accent)_12%,transparent)] text-[var(--ms-accent)] transition-all duration-500 group-hover:bg-[var(--ms-accent)] group-hover:text-[var(--ms-background)]"
                                        style={{
                                            animation: `icon-float 6s ease-in-out ${idx * 0.6}s infinite`,
                                        }}
                                    >
                                        <Icon name={tile.icon} className="h-6 w-6" />
                                    </span>

                                    <h2 className="relative z-10 mt-5 font-display text-[clamp(1.4rem,2.4vw,1.65rem)] leading-[1.15] tracking-[-0.03em] text-[var(--ms-text)]">
                                        {tile.headline}
                                    </h2>

                                    <p className="relative z-10 mt-3 text-[13.5px] leading-[1.7] text-[var(--ms-muted)]">
                                        {tile.summary}
                                    </p>

                                    <ul className="relative z-10 mt-6 grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
                                        {tile.stats.map((s) => (
                                            <li key={s.label}>
                                                <div className="font-display text-[1.1rem] leading-none tracking-[-0.03em] text-[var(--ms-text)]">
                                                    {s.value}
                                                </div>
                                                <div className="mt-1 text-[9px] uppercase tracking-[0.14em] text-[var(--ms-muted)]">
                                                    {s.label}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="relative z-10 mt-auto flex items-center justify-between pt-6 text-[12px] uppercase tracking-[0.15em] text-[var(--ms-accent)]">
                                        <span>Explore {tile.tag}</span>
                                        <span className="grid h-8 w-8 place-items-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-[var(--ms-accent)] group-hover:bg-[var(--ms-accent)] group-hover:text-[var(--ms-background)]">
                                            <Icon name="arrow" className="h-3.5 w-3.5" />
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <style jsx>{`
                @keyframes tile-in {
                    from { opacity: 0; transform: translateY(40px) scale(0.96); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes glow-pulse {
                    0%, 100% { opacity: 0.35; }
                    50% { opacity: 0.65; }
                }
                @keyframes icon-float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-4px); }
                }
                @media (prefers-reduced-motion: reduce) {
                    * {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            `}</style>
        </section>
    );
}