//consultant/app/components/consultant/services/ServicesSections.tsx
"use client";

import Link from "next/link";
import { useState, type PointerEvent } from "react";
import {
    BENEFITS,
    FAQ,
    FLOW,
    PILLARS,
    PROBLEMS,
    SERVICES,
    WHY,
    type IconName,
} from "./ServicesData";
import {
    CornerTicks,
    Eyebrow,
    EASE_OUT,
    FramedImage,
    GradientText,
    Icon,
    RayBurst,
    Reveal,
    StyleTag,
    focusRing,
    useInView,
} from "./ServicesUi";

/* ============================================================
   1. CHAOS -> CONFIDENCE
============================================================ */

const ORBIT: { icon: IconName; pos: string }[] = [
    { icon: "code", pos: "left-1/2 -top-5 -translate-x-1/2" },
    { icon: "globe", pos: "-right-5 top-1/2 -translate-y-1/2" },
    { icon: "cap", pos: "left-1/2 -bottom-5 -translate-x-1/2" },
    { icon: "briefcase", pos: "-left-5 top-1/2 -translate-y-1/2" },
];

function Orbit() {
    const ring =
        "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))";
    return (
        <div className="ms-anim relative mx-auto aspect-square w-[min(300px,72vw)]">
            <div className="absolute inset-0 rounded-full border border-[#1E6BFF]/20" />
            <div className="absolute inset-7 rounded-full border border-dashed border-[#1E6BFF]/30" />
            <div
                className="absolute inset-2 rounded-full"
                style={{
                    background:
                        "conic-gradient(from 0deg, #0B3FA8, #1E6BFF, #7CC4FF, #0B3FA8)",
                    WebkitMaskImage: ring,
                    maskImage: ring,
                    animation: "ms-spin 14s linear infinite",
                }}
            />
            <div
                className="absolute inset-2"
                style={{ animation: "ms-spin 26s linear infinite" }}
            >
                {ORBIT.map((o) => (
                    <span key={o.icon} className={`absolute ${o.pos}`}>
                        <span
                            className="grid h-10 w-10 place-items-center rounded-full border border-[#BBD8FF] bg-white text-[#1E6BFF] shadow-[0_8px_24px_-6px_rgba(30,107,255,0.45)]"
                            style={{ animation: "ms-spin-rev 26s linear infinite" }}
                        >
                            <Icon name={o.icon} className="h-[18px] w-[18px]" />
                        </span>
                    </span>
                ))}
            </div>
            <div className="absolute inset-[26%] grid place-items-center rounded-full border border-[#BBD8FF] bg-white text-center shadow-[0_20px_60px_-20px_rgba(30,107,255,0.5)]">
                <div>
                    <p className="font-display text-3xl leading-none tracking-[-0.05em] text-[#0A1633]">
                        One
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-[#1E6BFF]">
                        platform
                    </p>
                </div>
            </div>
        </div>
    );
}

export function ChaosToConfidence() {
    return (
        <section className="relative overflow-hidden bg-[#F2F8FF] py-24 text-[#0A1633] lg:py-32">
            <StyleTag />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#050B1E] to-transparent"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.5]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 1px 1px, rgba(30,107,255,.16) 1px, transparent 0)",
                    backgroundSize: "28px 28px",
                    maskImage:
                        "radial-gradient(ellipse at 50% 55%, #000 20%, transparent 75%)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse at 50% 55%, #000 20%, transparent 75%)",
                }}
            />

            <div className="relative mx-auto max-w-[1240px] px-6">
                <Reveal className="text-center">
                    <Eyebrow light>One partner</Eyebrow>
                    <h2 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2rem,4.6vw,3.8rem)] leading-[1.05] tracking-[-0.05em]">
                        Stop juggling providers.
                        <br />
                        <GradientText light>Move forward with confidence.</GradientText>
                    </h2>
                    <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.8] text-[#4A5D80]">
                        Technology, education and careers usually mean three different
                        vendors. MindSpace keeps them in one place.
                    </p>
                </Reveal>

                <div className="mt-16 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-12">
                    <ul className="space-y-3">
                        {PROBLEMS.map((t, i) => (
                            <li key={t}>
                                <Reveal x={-36} y={0} delay={i * 90}>
                                    <div className="flex items-start gap-3 rounded-2xl border border-[#D6E4F5] bg-white/60 p-4 text-[14px] leading-snug text-[#7B8CA8]">
                                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#E6EEF8] text-[#9AABC5]">
                                            <Icon name="x" className="h-3 w-3" />
                                        </span>
                                        {t}
                                    </div>
                                </Reveal>
                            </li>
                        ))}
                    </ul>

                    <Reveal y={20}>
                        <Orbit />
                    </Reveal>

                    <ul className="space-y-3">
                        {BENEFITS.map((t, i) => (
                            <li key={t}>
                                <Reveal x={36} y={0} delay={i * 90}>
                                    <div className="group flex items-start gap-3 rounded-2xl border border-[#BFDDFF] bg-white p-4 text-[14px] leading-snug text-[#0A1633] shadow-[0_12px_34px_-16px_rgba(30,107,255,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1E6BFF] hover:shadow-[0_18px_44px_-14px_rgba(30,107,255,0.5)]">
                                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#1E6BFF] text-white">
                                            <Icon name="check" className="h-3 w-3" />
                                        </span>
                                        {t}
                                    </div>
                                </Reveal>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

/* ============================================================
   2. END-TO-END
============================================================ */

const WAVE_W = 1200;

const wave = (
    base: number,
    amp: number,
    phase: number,
    freq: number
): string => {
    let d = "";
    for (let x = 0; x <= WAVE_W; x += 10) {
        const y = base + amp * Math.sin(x * freq + phase);
        d += `${x === 0 ? "M" : "L"}${x},${y.toFixed(1)} `;
    }
    return d;
};

const WAVES = [
    { d: wave(150, 26, 0.0, 0.0095), w: 1.8, o: 1 },
    { d: wave(158, 30, 0.5, 0.0095), w: 1.2, o: 0.85 },
    { d: wave(166, 34, 1.0, 0.0095), w: 1.2, o: 0.7 },
    { d: wave(174, 38, 1.5, 0.0095), w: 1, o: 0.55 },
    { d: wave(184, 42, 2.0, 0.0095), w: 1, o: 0.4 },
    { d: wave(196, 46, 2.5, 0.0095), w: 1, o: 0.28 },
];

export function EndToEnd() {
    const { ref, inView } = useInView<HTMLDivElement>(0.25);
    const steps = ["150px", "100px", "50px", "0px"];

    return (
        <section className="relative overflow-hidden bg-[#EAF4FF] pb-24 pt-8 text-[#0A1633] lg:pb-32">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-44 bg-gradient-to-b from-transparent to-[#050B1E]"
            />
            <div className="mx-auto max-w-[1240px] px-6">
                <Reveal className="text-center">
                    <Eyebrow light>How it works</Eyebrow>
                    <h2 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2rem,4.6vw,3.8rem)] leading-[1.05] tracking-[-0.05em]">
                        One connected journey.
                        <br />
                        <GradientText light>Every step builds on the last.</GradientText>
                    </h2>
                    <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.8] text-[#4A5D80]">
                        Whether it is a product, a course, an admission or a job, the path
                        is the same: understand, plan, deliver, succeed.
                    </p>
                </Reveal>

                <div ref={ref} className="relative mt-16 lg:h-[540px]">
                    <div className="relative z-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-10">
                        {FLOW.map((f, i) => (
                            <div
                                key={f.title}
                                className="lg:mt-[var(--mt)]"
                                style={{
                                    ["--mt" as string]: steps[i],
                                    opacity: inView ? 1 : 0,
                                    transform: inView ? "none" : "translateY(24px)",
                                    transition: `opacity 800ms ease ${i * 140}ms, transform 900ms ${EASE_OUT} ${i * 140}ms`,
                                }}
                            >
                                <div className="flex items-center gap-2.5">
                                    <span className="grid h-6 w-6 place-items-center rounded-full border border-[#1E6BFF]/40 bg-white text-[10px] tabular-nums text-[#1E6BFF]">
                                        {i + 1}
                                    </span>
                                    <h3 className="font-display text-xl tracking-[-0.03em]">
                                        {f.title}
                                    </h3>
                                </div>
                                <ul className="mt-4 space-y-2 border-l border-[#1E6BFF]/25 pl-4">
                                    {f.items.map((it) => (
                                        <li
                                            key={it}
                                            className="relative text-[14px] text-[#3B4F73]"
                                        >
                                            <span className="absolute -left-[21px] top-[9px] h-px w-3 bg-[#1E6BFF]/40" />
                                            {it}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <svg
                        viewBox={`0 0 ${WAVE_W} 260`}
                        preserveAspectRatio="none"
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-[-3%] bottom-0 hidden h-[240px] w-[106%] lg:block"
                    >
                        <defs>
                            <linearGradient id="ms-wave" x1="0" x2="1" y1="0" y2="0">
                                <stop offset="0" stopColor="#0A1A4A" />
                                <stop offset="0.45" stopColor="#1E6BFF" />
                                <stop offset="1" stopColor="#7CC4FF" />
                            </linearGradient>
                        </defs>
                        {WAVES.map((w, i) => (
                            <path
                                key={i}
                                d={w.d}
                                fill="none"
                                stroke="url(#ms-wave)"
                                strokeWidth={w.w}
                                strokeOpacity={w.o}
                                strokeDasharray="2600"
                                strokeDashoffset={inView ? 0 : 2600}
                                style={{
                                    transition: `stroke-dashoffset 2600ms ${EASE_OUT} ${300 + i * 140
                                        }ms`,
                                }}
                            />
                        ))}
                    </svg>
                </div>
            </div>
        </section>
    );
}

/* ============================================================
   3. SHOWCASE
============================================================ */

export function Showcase() {
    return (
        <section className="relative overflow-hidden bg-[#050B1E] text-white">
            <div className="mx-auto max-w-[1240px] px-6 pt-24 lg:pt-32">
                <Reveal className="max-w-3xl">
                    <Eyebrow>Our services</Eyebrow>
                    <h2 className="mt-6 font-display text-[clamp(2rem,4.6vw,3.8rem)] leading-[1.05] tracking-[-0.05em]">
                        Four paths. <GradientText>One platform.</GradientText>
                    </h2>
                    <p className="mt-5 max-w-xl text-[15px] leading-[1.8] text-[#A9BCD9]">
                        Find the path that matches what you need today. Everything is
                        connected, so you can add the next step whenever you are ready.
                    </p>
                </Reveal>
            </div>

            {PILLARS.map((p, i) => {
                const flip = i % 2 === 1;
                return (
                    <div key={p.id} id={p.id} className="scroll-mt-24 py-16 lg:py-24">
                        <div className="mx-auto grid max-w-[1240px] items-center gap-16 px-6 lg:grid-cols-2 lg:gap-24">
                            <Reveal
                                x={flip ? 44 : -44}
                                y={0}
                                className={`pb-8 pr-8 ${flip ? "lg:order-2" : ""}`}
                            >
                                <FramedImage
                                    src={p.image.src}
                                    alt={p.image.alt}
                                    label={p.tag}
                                    index={p.number}
                                    mirror={flip}
                                />
                            </Reveal>

                            <div className={flip ? "lg:order-1" : ""}>
                                <Reveal>
                                    <p className="text-[12px] uppercase tracking-[0.3em] text-[#7CC4FF]">
                                        {p.number}{" "}
                                        <span className="mx-2 text-white/25">/</span> {p.tag}
                                    </p>
                                    <h3 className="mt-4 font-display text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[1.08] tracking-[-0.045em]">
                                        {p.title}
                                    </h3>
                                    <p className="mt-5 text-[15px] leading-[1.85] text-[#A9BCD9]">
                                        {p.lead}
                                    </p>
                                </Reveal>

                                <Reveal delay={100}>
                                    <div className="relative mt-8 rounded-2xl border border-[#2F7BFF]/30 bg-[#0A1A4A]/40 p-5">
                                        <CornerTicks
                                            size={12}
                                            offset={-1}
                                            className="text-[#7CC4FF]"
                                        />
                                        <p className="text-[11px] uppercase tracking-[0.26em] text-[#9CCBFF]">
                                            You need this if
                                        </p>
                                        <ul className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                                            {p.needs.map((n) => (
                                                <li
                                                    key={n}
                                                    className="flex items-start gap-2.5 text-[13.5px] leading-snug text-[#DCE9FF]"
                                                >
                                                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#2F7BFF]/30 text-[#9CD3FF]">
                                                        <Icon name="check" className="h-2.5 w-2.5" />
                                                    </span>
                                                    {n}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </Reveal>

                                <ul className="mt-6 space-y-3">
                                    {p.points.map((pt, k) => (
                                        <li key={pt.title}>
                                            <Reveal delay={160 + k * 90}>
                                                <div className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.05] to-transparent p-4 transition-colors duration-300 hover:border-[#2F7BFF]/60">
                                                    <span
                                                        aria-hidden="true"
                                                        className="absolute inset-y-3 left-0 w-[3px] origin-center scale-y-0 rounded-full bg-[#2F7BFF] transition-transform duration-300 group-hover:scale-y-100"
                                                    />
                                                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#2F7BFF]/40 bg-[#2F7BFF]/10 text-[#7CC4FF] transition-colors duration-300 group-hover:bg-[#2F7BFF] group-hover:text-white">
                                                        <Icon name={pt.icon} className="h-5 w-5" />
                                                    </span>
                                                    <span>
                                                        <span className="block text-[16px] text-white">
                                                            {pt.title}
                                                        </span>
                                                        <span className="mt-1 block text-[13.5px] leading-relaxed text-[#9FB2CF]">
                                                            {pt.text}
                                                        </span>
                                                    </span>
                                                </div>
                                            </Reveal>
                                        </li>
                                    ))}
                                </ul>

                                <Reveal delay={420}>
                                    <Link
                                        href={p.cta.href}
                                        className={`group mt-8 inline-flex items-center gap-2 rounded-full border border-[#2F7BFF]/60 bg-[#2F7BFF]/10 px-6 py-3 text-[14px] text-[#CFE5FF] transition-colors hover:bg-[#2F7BFF] hover:text-white ${focusRing}`}
                                    >
                                        {p.cta.label}
                                        <Icon
                                            name="arrow"
                                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                                        />
                                    </Link>
                                </Reveal>
                            </div>
                        </div>
                        {i < PILLARS.length - 1 && (
                            <div
                                aria-hidden="true"
                                className="mx-auto mt-16 h-px max-w-[1240px] bg-gradient-to-r from-transparent via-[#2F7BFF]/30 to-transparent lg:mt-24"
                            />
                        )}
                    </div>
                );
            })}
        </section>
    );
}

/* ============================================================
   4. CATALOGUE
============================================================ */

const TABS = ["All", ...PILLARS.map((p) => p.tag)];

function ServiceCard({
    s,
    i,
}: {
    s: (typeof SERVICES)[number];
    i: number;
}) {
    const onMove = (e: PointerEvent<HTMLElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
    };

    return (
        <Link
            href={s.href}
            onPointerMove={onMove}
            className={`ms-anim group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0B1B4D]/60 to-[#07102A] p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#2F7BFF]/70 hover:shadow-[0_30px_70px_-24px_rgba(47,123,255,0.55)] ${focusRing}`}
            style={{ animation: `ms-pop 600ms ${EASE_OUT} ${i * 45}ms both` }}
        >
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background:
                        "radial-gradient(260px circle at var(--mx, 50%) var(--my, 0%), rgba(79,155,255,.22), transparent 70%)",
                }}
            />
            <span
                aria-hidden="true"
                className="absolute inset-x-6 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-[#7CC4FF] to-transparent transition-transform duration-500 group-hover:scale-x-100"
            />

            <div className="relative flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-[#2F7BFF]/40 bg-[#2F7BFF]/10 text-[#7CC4FF] transition-colors duration-300 group-hover:bg-[#2F7BFF] group-hover:text-white">
                    <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#9CCBFF]">
                    {s.pillar}
                </span>
            </div>

            <h3 className="relative mt-6 font-display text-[1.3rem] leading-[1.15] tracking-[-0.035em] text-white">
                {s.title}
            </h3>
            <p className="relative mt-2 text-[13.5px] leading-relaxed text-[#9FB2CF]">
                <span className="text-[#7CC4FF]">You need this when</span> {s.need}.
            </p>

            <ul className="relative mt-5 space-y-2 border-t border-white/10 pt-5">
                {s.gets.map((g) => (
                    <li
                        key={g}
                        className="flex items-start gap-2.5 text-[13.5px] leading-snug text-[#DCE9FF]"
                    >
                        <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#2F7BFF]/30 text-[#9CD3FF]">
                            <Icon name="check" className="h-2.5 w-2.5" />
                        </span>
                        {g}
                    </li>
                ))}
            </ul>

            <span className="relative mt-6 inline-flex items-center gap-2 text-[13px] text-[#7CC4FF] transition-colors group-hover:text-white">
                {s.linked ? "View details" : "Ask about this"}
                <Icon
                    name="arrow"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                />
            </span>
        </Link>
    );
}

export function Catalogue() {
    const [tab, setTab] = useState("All");
    const list =
        tab === "All" ? SERVICES : SERVICES.filter((s) => s.pillar === tab);

    return (
        <section
            id="services"
            className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-[#050B1E] via-[#07153A] to-[#050B1E] py-24 text-white lg:py-32"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #7CC4FF 1px, transparent 1px), linear-gradient(to bottom, #7CC4FF 1px, transparent 1px)",
                    backgroundSize: "72px 72px",
                    maskImage:
                        "radial-gradient(ellipse at 50% 30%, #000 10%, transparent 70%)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse at 50% 30%, #000 10%, transparent 70%)",
                }}
            />
            <div className="relative mx-auto max-w-[1240px] px-6">
                <Reveal className="text-center">
                    <Eyebrow>Everything we offer</Eyebrow>
                    <h2 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2rem,4.6vw,3.8rem)] leading-[1.05] tracking-[-0.05em]">
                        Find exactly what you <GradientText>need.</GradientText>
                    </h2>
                    <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.8] text-[#A9BCD9]">
                        Filter by area, then see what each service is for and what you get.
                    </p>
                </Reveal>

                <div
                    role="tablist"
                    aria-label="Service areas"
                    className="mt-12 flex flex-wrap justify-center gap-2"
                >
                    {TABS.map((t) => {
                        const on = t === tab;
                        return (
                            <button
                                key={t}
                                role="tab"
                                aria-selected={on}
                                onClick={() => setTab(t)}
                                className={`rounded-full border px-5 py-2.5 text-[13.5px] transition-all duration-300 ${on
                                    ? "border-[#2F7BFF] bg-[#2F7BFF] text-white shadow-[0_0_30px_rgba(47,123,255,0.45)]"
                                    : "border-white/15 bg-white/[0.03] text-[#B9C9E2] hover:border-[#7CC4FF]/50 hover:text-white"
                                    } ${focusRing}`}
                            >
                                {t}
                            </button>
                        );
                    })}
                </div>

                <div
                    key={tab}
                    className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {list.map((s, i) => (
                        <ServiceCard key={s.title} s={s} i={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ============================================================
   5. WHY MINDSPACE
============================================================ */

export function WhyUs() {
    return (
        <section className="relative bg-[#050B1E] py-24 text-white lg:py-32">
            <div className="mx-auto max-w-[1240px] px-6">
                <Reveal className="max-w-2xl">
                    <Eyebrow>Why MindSpace</Eyebrow>
                    <h2 className="mt-6 font-display text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.06] tracking-[-0.05em]">
                        Built on four simple <GradientText>principles.</GradientText>
                    </h2>
                </Reveal>

                <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {WHY.map((w, i) => (
                        <li key={w.title}>
                            <Reveal delay={i * 100} className="h-full">
                                <div className="group relative h-full rounded-3xl border border-[#2F7BFF]/30 bg-gradient-to-b from-[#0A1A4A]/50 to-transparent p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#7CC4FF]/70 hover:shadow-[0_26px_60px_-24px_rgba(47,123,255,0.6)]">
                                    <CornerTicks
                                        size={14}
                                        offset={-1}
                                        className="text-[#7CC4FF]"
                                    />
                                    <span
                                        className="font-display text-5xl leading-none text-transparent"
                                        style={{ WebkitTextStroke: "1px rgba(124,196,255,.55)" }}
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span className="mt-6 grid h-11 w-11 place-items-center rounded-xl border border-[#2F7BFF]/40 bg-[#2F7BFF]/10 text-[#7CC4FF] transition-colors duration-300 group-hover:bg-[#2F7BFF] group-hover:text-white">
                                        <Icon name={w.icon} className="h-5 w-5" />
                                    </span>
                                    <h3 className="mt-5 font-display text-[1.25rem] leading-[1.15] tracking-[-0.03em]">
                                        {w.title}
                                    </h3>
                                    <p className="mt-2 text-[13.5px] leading-relaxed text-[#9FB2CF]">
                                        {w.text}
                                    </p>
                                </div>
                            </Reveal>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

/* ============================================================
   6. FAQ
============================================================ */

export function Faq() {
    const [open, setOpen] = useState<number | null>(0);
    return (
        <section className="relative bg-[#07102A] py-24 text-white lg:py-28">
            <div className="mx-auto grid max-w-[1100px] gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                <Reveal>
                    <Eyebrow>Questions</Eyebrow>
                    <h2 className="mt-6 font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.08] tracking-[-0.05em]">
                        Good to know <GradientText>before you start.</GradientText>
                    </h2>
                    <p className="mt-4 text-[15px] leading-[1.8] text-[#A9BCD9]">
                        Still unsure? Talk to an expert and we will point you to the right
                        first step.
                    </p>
                    <Link
                        href="/contact"
                        className={`group mt-6 inline-flex items-center gap-2 text-[14px] text-[#7CC4FF] hover:text-white ${focusRing}`}
                    >
                        Contact us{" "}
                        <Icon
                            name="arrow"
                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        />
                    </Link>
                </Reveal>

                <ul className="divide-y divide-white/10 rounded-3xl border border-[#2F7BFF]/30 bg-[#0A1A4A]/30">
                    {FAQ.map((f, i) => {
                        const on = open === i;
                        return (
                            <li key={f.q}>
                                <button
                                    type="button"
                                    aria-expanded={on}
                                    onClick={() => setOpen(on ? null : i)}
                                    className={`flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-[15.5px] text-white ${focusRing}`}
                                >
                                    {f.q}
                                    <span
                                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#2F7BFF]/50 text-[#7CC4FF] transition-transform duration-300 ${on ? "rotate-45 bg-[#2F7BFF] text-white" : ""
                                            }`}
                                    >
                                        <Icon name="plus" className="h-3.5 w-3.5" />
                                    </span>
                                </button>
                                <div
                                    className={`grid transition-[grid-template-rows] duration-300 ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <p className="px-6 pb-6 text-[14.5px] leading-[1.8] text-[#A9BCD9]">
                                            {f.a}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}

/* ============================================================
   7. FINAL CTA
============================================================ */

export function FinalCta() {
    return (
        <section className="relative isolate overflow-hidden bg-[#050B1E] py-28 text-center text-white lg:py-40">
            <StyleTag />
            <RayBurst />
            <div className="relative z-10 mx-auto max-w-3xl px-6">
                <Reveal>
                    <Eyebrow>Let&apos;s talk</Eyebrow>
                    <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.04] tracking-[-0.05em]">
                        Not sure where to start?{" "}
                        <GradientText>We will map it out.</GradientText>
                    </h2>
                    <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.8] text-[#A9BCD9]">
                        Tell us your goal, a new website, a university abroad, a new skill
                        or a new job, and an expert will guide your next step.
                    </p>
                    <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                        <Link
                            href="/contact"
                            className={`group inline-flex items-center gap-2 rounded-full bg-[#2F7BFF] px-7 py-3.5 text-[14.5px] text-white shadow-[0_0_44px_rgba(47,123,255,0.5)] transition-colors hover:bg-[#4a8cff] ${focusRing}`}
                        >
                            Book a free consultation
                            <Icon
                                name="arrow"
                                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                            />
                        </Link>
                        <a
                            href="#services"
                            className={`rounded-full border border-white/20 bg-white/[0.04] px-7 py-3.5 text-[14.5px] text-white/90 backdrop-blur-md transition-colors hover:border-[#7CC4FF]/60 ${focusRing}`}
                        >
                            Browse services
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}