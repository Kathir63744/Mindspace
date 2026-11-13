// app/services/[slug]/PinnedServiceHero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import type { IconName } from "@/app/components/consultant/services/ServicesData";
import {
    Eyebrow,
    GradientText,
    Icon,
    RayBurst,
    focusRing,
} from "@/app/components/consultant/services/ServicesUi";

/* ---------------- easing ---------------- */

const clamp = (x: number) => Math.min(1, Math.max(0, x));
const ease = (x: number) => {
    const t = clamp(x);
    return t * t * (3 - 2 * t);
};

/* ---------------- types ---------------- */

export interface PinnedHeroProps {
    serviceTitle: string;
    pillarTag: string;
    heroImage: string;
    overviewLead: string;
    timeframe: string;
    startingFrom: string;
    headline2: { eyebrow: string; line1: string; line2: string; body: string };
    cardBullets: string[];
}

const CARD_ICONS: IconName[] = ["monitor", "code", "layers", "trend"];

/* ---------------- component ---------------- */

export default function PinnedServiceHero({
    serviceTitle,
    pillarTag,
    heroImage,
    overviewLead,
    timeframe,
    startingFrom,
    headline2,
    cardBullets,
}: PinnedHeroProps) {
    const stage = useRef<HTMLElement>(null);
    const [phaseB, setPhaseB] = useState(false);

    useEffect(() => {
        const el = stage.current;
        if (!el) return;

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let last = -1;

        const apply = (p: number) => {
            el.style.setProperty("--p", p.toFixed(4));
            el.style.setProperty("--out", ease((p - 0.06) / 0.2).toFixed(4));
            el.style.setProperty("--in", ease((p - 0.2) / 0.2).toFixed(4));
            [0, 1, 2, 3].forEach((i) =>
                el.style.setProperty(
                    `--c${i}`,
                    ease((p - 0.34 - i * 0.06) / 0.3).toFixed(4)
                )
            );
            const b = p > 0.22;
            if (b !== (last === 1)) setPhaseB(b);
            last = b ? 1 : 0;
        };

        if (reduced) {
            apply(1);
            return;
        }

        let raf = 0;
        const tick = () => {
            raf = 0;
            const r = el.getBoundingClientRect();
            const total = r.height - window.innerHeight;
            apply(total > 0 ? clamp(-r.top / total) : 0);
        };
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(tick);
        };
        tick();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    const first: CSSProperties = {
        opacity: "calc(1 - var(--out, 0))",
        transform: "translateY(calc(var(--out, 0) * -70px))",
        filter: "blur(calc(var(--out, 0) * 8px))",
        pointerEvents: phaseB ? "none" : "auto",
    };
    const second: CSSProperties = {
        opacity: "var(--in, 0)",
        transform: "translateY(calc((1 - var(--in, 0)) * 48px))",
        pointerEvents: phaseB ? "auto" : "none",
    };

    return (
        <section
            ref={stage}
            aria-label={`${serviceTitle} overview`}
            className="relative h-[290vh]"
        >
            <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#050B1E] text-white">
                {/* radial backdrop */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse 80% 60% at 50% 0%, #0A1A4A 0%, #050B1E 70%)",
                    }}
                />

                {/* hero image wash */}
                <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
                    <Image
                        src={heroImage}
                        alt=""
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover opacity-[0.16] mix-blend-luminosity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050B1E]/30 via-[#050B1E]/70 to-[#050B1E]" />
                </div>

                <RayBurst
                    style={{
                        transformOrigin: "50% 100%",
                        transform: "scale(calc(1 + var(--p, 0) * 0.35))",
                        opacity: "calc(1 - var(--p, 0) * 0.45)",
                    }}
                />

                {/* ---------- phase A ---------- */}
                <div
                    className="absolute inset-x-0 top-[30%] z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center"
                    style={first}
                >
                    <Eyebrow>{pillarTag}</Eyebrow>
                    <h1 className="mt-6 font-display text-[clamp(2.4rem,5.6vw,4.8rem)] leading-[1.04] tracking-[-0.05em]">
                        {serviceTitle.split(" ").slice(0, -1).join(" ")}{" "}
                        <GradientText>
                            {serviceTitle.split(" ").slice(-1)}
                        </GradientText>
                    </h1>
                    <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-[1.8] text-[#A9BCD9] sm:text-base">
                        {overviewLead}
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <Link
                            href="/contact"
                            className={`group inline-flex items-center gap-2 rounded-full bg-[#2F7BFF] px-6 py-3 text-[14px] text-white shadow-[0_0_40px_rgba(47,123,255,0.45)] transition-colors hover:bg-[#4a8cff] ${focusRing}`}
                        >
                            Book a discovery call
                            <Icon
                                name="arrow"
                                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                            />
                        </Link>
                        <a
                            href="#overview"
                            className={`rounded-full border border-white/20 bg-white/[0.04] px-6 py-3 text-[14px] text-white/90 backdrop-blur-md transition-colors hover:border-[#7CC4FF]/60 hover:bg-white/[0.08] ${focusRing}`}
                        >
                            Read the detail
                        </a>
                    </div>
                </div>

                {/* scroll hint */}
                <div
                    aria-hidden="true"
                    className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#9CCBFF]/80"
                    style={{ opacity: "calc(1 - var(--p, 0) * 8)" }}
                >
                    Scroll
                    <span className="relative block h-9 w-px overflow-hidden bg-white/15">
                        <span
                            className="ms-anim absolute inset-x-0 top-0 block h-1/2 bg-[#7CC4FF]"
                            style={{ animation: "ms-scroll-hint 1.8s ease-in-out infinite" }}
                        />
                    </span>
                </div>

                {/* ---------- phase B ---------- */}
                <div
                    className="absolute inset-x-0 top-[13%] z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center"
                    style={second}
                >
                    <Eyebrow>{headline2.eyebrow}</Eyebrow>
                    <h2 className="mt-5 font-display text-[clamp(1.9rem,4.2vw,3.6rem)] leading-[1.05] tracking-[-0.05em]">
                        {headline2.line1}
                        <br />
                        <GradientText>{headline2.line2}</GradientText>
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-[14px] leading-[1.75] text-[#A9BCD9] sm:text-[15px]">
                        {headline2.body}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                        <span className="rounded-full border border-white/15 bg-white/[0.05] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] text-[#9CCBFF]">
                            {timeframe}
                        </span>
                        <span className="rounded-full border border-white/15 bg-white/[0.05] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] text-[#9CCBFF]">
                            {startingFrom}
                        </span>
                    </div>
                </div>

                {/* ---------- rising cards ---------- */}
                <div className="absolute inset-x-0 bottom-[4svh] z-20 mx-auto w-full max-w-[1320px]">
                    <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:px-8 lg:px-10 [&::-webkit-scrollbar]:hidden">
                        {cardBullets.map((b, i) => (
                            <li
                                key={b}
                                className="min-w-[78vw] snap-center md:min-w-0"
                                style={{
                                    opacity: `var(--c${i}, 0)`,
                                    transform: `translateY(calc((1 - var(--c${i}, 0)) * 130%))`,
                                    pointerEvents: phaseB ? "auto" : "none",
                                }}
                            >
                                <div
                                    className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.09] to-white/[0.02] p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#7CC4FF]/60 hover:shadow-[0_30px_80px_-20px_rgba(47,123,255,0.6)] md:p-6 ${focusRing}`}
                                >
                                    <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-x-0 -bottom-1/2 h-full bg-[radial-gradient(ellipse_at_50%_100%,rgba(47,123,255,0.45),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                    />
                                    <span className="relative inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] text-[#CFE5FF]">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#7CC4FF]" />
                                        {String(i + 1).padStart(2, "0")} / Included
                                    </span>
                                    <span className="relative mt-5 grid h-11 w-11 place-items-center rounded-xl border border-[#2F7BFF]/40 bg-[#2F7BFF]/10 text-[#7CC4FF]">
                                        <Icon name={CARD_ICONS[i] ?? "check"} className="h-5 w-5" />
                                    </span>
                                    <h3 className="relative mt-4 font-display text-[1.05rem] leading-[1.25] tracking-[-0.03em] text-white">
                                        {b}
                                    </h3>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}