
"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import {
    Eyebrow,
    GradientText,
    Icon,
    focusRing,
} from "./ServicesUi";
import { PILLARS } from "./ServicesData";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

const ease = (value: number) => {
    const t = clamp(value);
    return t * t * (3 - 2 * t);
};

export default function ServicesHero() {
    const stage = useRef<HTMLElement>(null);
    const [phaseB, setPhaseB] = useState(false);

    useEffect(() => {
        const element = stage.current;
        if (!element) return;

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        let previousPhase = false;
        let raf = 0;

        const applyProgress = (progress: number) => {
            element.style.setProperty("--p", progress.toFixed(4));

            element.style.setProperty(
                "--out",
                ease((progress - 0.06) / 0.2).toFixed(4)
            );

            element.style.setProperty(
                "--in",
                ease((progress - 0.2) / 0.2).toFixed(4)
            );

            PILLARS.forEach((_: any, index: number) => {
                element.style.setProperty(
                    `--c${index}`,
                    ease((progress - 0.34 - index * 0.06) / 0.3).toFixed(4)
                );
            });

            const nextPhase = progress > 0.22;

            if (nextPhase !== previousPhase) {
                previousPhase = nextPhase;
                setPhaseB(nextPhase);
            }
        };

        if (reducedMotion) {
            applyProgress(1);
            return;
        }

        const update = () => {
            raf = 0;

            const rect = element.getBoundingClientRect();
            const scrollDistance = rect.height - window.innerHeight;

            const progress =
                scrollDistance > 0
                    ? clamp(-rect.top / scrollDistance)
                    : 0;

            applyProgress(progress);
        };

        const onScroll = () => {
            if (!raf) {
                raf = requestAnimationFrame(update);
            }
        };

        update();

        window.addEventListener("scroll", onScroll, {
            passive: true,
        });

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
            aria-label="MindSpace services"
            className="relative h-[290vh]"
        >
            <div className="sticky top-0 isolate h-[100svh] overflow-hidden bg-[#080B14] text-white">

                {/* =================================================
                    MINIMAL BACKGROUND
                ================================================== */}

                <div
                    aria-hidden="true"
                    className="absolute inset-0 z-0"
                    style={{
                        background: `
                            radial-gradient(
                                ellipse 85% 65% at 50% 0%,
                                rgba(47, 123, 255, 0.09) 0%,
                                rgba(47, 123, 255, 0.025) 42%,
                                transparent 75%
                            ),
                            #080B14
                        `,
                    }}
                />

                {/* Subtle bottom depth */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[35%] bg-gradient-to-t from-black/20 to-transparent"
                />

                {/* =================================================
                    FIRST HERO CONTENT
                ================================================== */}

                <div
                    className="absolute inset-x-0 top-[23%] z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center"
                    style={first}
                >
                    <Eyebrow>MindSpace · What we do</Eyebrow>

                    <h1 className="mt-6 font-display text-[clamp(2.2rem,5.2vw,4.5rem)] leading-[1.06] tracking-[-0.05em]">
                        Build what’s next.
                        <br />
                        <GradientText>
                            Become what’s possible.
                        </GradientText>
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-[14px] leading-[1.8] text-[#B0B8CC] sm:text-base">
                        Technology, practical learning, global education
                        and career opportunities—connected through one
                        forward-moving ecosystem.
                    </p>

                    <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                        <a
                            href="#service-paths"
                            className={`group inline-flex items-center gap-2 rounded-full bg-[#2F7BFF] px-6 py-3 text-sm text-white shadow-[0_0_40px_rgba(47,123,255,.25)] transition hover:bg-[#4B8BFF] ${focusRing}`}
                        >
                            Explore our services

                            <Icon
                                name="arrow"
                                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                            />
                        </a>

                        <Link
                            href="/contact"
                            className={`rounded-full border border-white/15 bg-white/[0.035] px-6 py-3 text-sm text-white transition hover:border-[#2F7BFF]/60 hover:bg-white/[0.07] ${focusRing}`}
                        >
                            Talk to our team
                        </Link>
                    </div>
                </div>

                {/* =================================================
                    SCROLL INDICATOR
                ================================================== */}

                <div
                    aria-hidden="true"
                    className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/45"
                    style={{
                        opacity: "calc(1 - var(--p, 0) * 8)",
                    }}
                >
                    Scroll to explore

                    <span className="relative h-8 w-px overflow-hidden bg-white/15">
                        <span className="absolute inset-x-0 top-0 h-1/2 animate-pulse bg-[#2F7BFF]" />
                    </span>
                </div>

                {/* =================================================
                    SECOND HERO CONTENT
                ================================================== */}

                <div
                    className="absolute inset-x-0 top-[9%] z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center"
                    style={second}
                >
                    <Eyebrow>Four connected paths</Eyebrow>

                    <h2 className="mt-4 font-display text-[clamp(1.8rem,3.8vw,3.35rem)] leading-[1.08] tracking-[-0.045em]">
                        One place to move
                        <br />
                        <GradientText>
                            your next chapter forward.
                        </GradientText>
                    </h2>

                    <p className="mx-auto mt-3 max-w-xl text-sm leading-[1.7] text-[#A9B5CD]">
                        Choose a service to explore its dedicated
                        solutions, process and outcomes.
                    </p>
                </div>

                {/* =================================================
                    SERVICE CARDS
                ================================================== */}

                <div
                    id="service-paths"
                    className="absolute inset-x-0 bottom-[4svh] z-20 mx-auto w-full max-w-[1320px]"
                >
                    <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 [scrollbar-width:none] md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:px-8 lg:px-10 [&::-webkit-scrollbar]:hidden">
                        {PILLARS.map((pillar, index) => (
                            <li
                                key={pillar.id}
                                className="min-w-[78vw] snap-center md:min-w-0"
                                style={{
                                    opacity: `var(--c${index}, 0)`,
                                    transform: `translateY(calc((1 - var(--c${index}, 0)) * 130%))`,
                                    pointerEvents: phaseB ? "auto" : "none",
                                }}
                            >
                                <Link
                                    href={`/services/${pillar.id}`}
                                    className={`group relative flex min-h-[230px] h-full flex-col overflow-hidden rounded-3xl border border-white/[0.12] bg-gradient-to-b from-white/[0.075] to-white/[0.02] p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#2F7BFF]/60 hover:shadow-[0_25px_70px_-25px_rgba(47,123,255,.3)] md:p-6 ${focusRing}`}
                                >
                                    {/* Subtle hover highlight */}
                                    <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-x-0 -bottom-1/2 h-full bg-[radial-gradient(ellipse_at_50%_100%,rgba(47,123,255,.22),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                    />

                                    {/* Service category */}
                                    <span className="relative inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[11px] text-[#C9D9F6]">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#2F7BFF]" />
                                        {pillar.tag}
                                    </span>

                                    {/* Service title */}
                                    <h3 className="relative mt-5 font-display text-xl leading-tight tracking-[-0.03em] md:text-[1.4rem]">
                                        {pillar.cardTitle}
                                    </h3>

                                    {/* Card navigation */}
                                    <span className="relative mt-auto flex items-center justify-between pt-7 text-sm text-[#AFC9FF]">
                                        Explore this service

                                        <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 transition group-hover:border-[#2F7BFF] group-hover:bg-[#2F7BFF] group-hover:text-white">
                                            <Icon
                                                name="arrow"
                                                className="h-4 w-4"
                                            />
                                        </span>
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
