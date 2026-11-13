"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DM_Sans, Manrope } from "next/font/google";

import Navbar from "../components/consultant/Navbar";
import Footer from "../components/consultant/Footer";

const headingFont = Manrope({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    display: "swap",
    variable: "--about-heading",
});

const bodyFont = DM_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
    variable: "--about-body",
});

/* ============================================================
   PALETTE (BLACK THEME)
   ============================================================ */

const C = {
    bg: "#050505",
    bgAlt: "#0B0F17",
    bgSoft: "#0F131C",
    line: "rgba(255,255,255,0.08)",
    lineSoft: "rgba(255,255,255,0.05)",
    text: "#F3F5FA",
    muted: "#8A96A8",
    dim: "#6B7686",
    blue: "#2F7BFF",
    blueSoft: "#7EA9FF",
} as const;

/* ============================================================
   REDUCED MOTION
   ============================================================ */

function useReducedMotion() {
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const on = () => setReduced(mq.matches);
        on();
        mq.addEventListener("change", on);
        return () => mq.removeEventListener("change", on);
    }, []);
    return reduced;
}

/* ============================================================
   REVEAL (light IntersectionObserver)
   ============================================================ */

function Reveal({
    children,
    delay = 0,
    className = "",
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (reduced) {
            setVisible(true);
            return;
        }
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    io.disconnect();
                }
            },
            { rootMargin: "-60px 0px" }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [reduced]);

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translate3d(0, 22px, 0)",
                transition: reduced
                    ? "none"
                    : `opacity 900ms ease ${delay}ms, transform 950ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
                willChange: "opacity, transform",
            }}
        >
            {children}
        </div>
    );
}

/* ============================================================
   CHECKERBOARD
   ============================================================ */

function CheckerPattern({ className = "" }: { className?: string }) {
    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none ${className}`}
            style={{
                backgroundImage: `
                    linear-gradient(45deg, rgba(47,123,255,.20) 25%, transparent 25%, transparent 75%, rgba(47,123,255,.20) 75%),
                    linear-gradient(45deg, rgba(47,123,255,.20) 25%, transparent 25%, transparent 75%, rgba(47,123,255,.20) 75%)
                `,
                backgroundPosition: "0 0, 18px 18px",
                backgroundSize: "36px 36px",
                maskImage: "linear-gradient(135deg, black, transparent 85%)",
                WebkitMaskImage: "linear-gradient(135deg, black, transparent 85%)",
            }}
        />
    );
}

function BlueCheckerBand() {
    return (
        <div className="relative h-[26px] overflow-hidden bg-[#2F7BFF] sm:h-[36px]">
            <div
                aria-hidden="true"
                className="absolute inset-y-0 right-0 w-[48%] opacity-40"
                style={{
                    backgroundImage:
                        "linear-gradient(45deg, rgba(0,0,0,.25) 25%, transparent 25%, transparent 75%, rgba(0,0,0,.25) 75%), linear-gradient(45deg, rgba(0,0,0,.25) 25%, transparent 25%, transparent 75%, rgba(0,0,0,.25) 75%)",
                    backgroundPosition: "0 0, 18px 18px",
                    backgroundSize: "36px 36px",
                }}
            />
            <div className="absolute inset-y-0 left-0 w-[20%] bg-white/[0.06]" />
        </div>
    );
}

/* ============================================================
   EDITORIAL IMAGE (with skeleton + aspect lock)
   ============================================================ */

function EditorialImage({
    src,
    alt,
    className = "",
    grayscale = false,
    priority = false,
    sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    objectPosition = "center",
}: {
    src: string;
    alt: string;
    className?: string;
    grayscale?: boolean;
    priority?: boolean;
    sizes?: string;
    objectPosition?: string;
}) {
    const [failed, setFailed] = useState(false);
    const [loaded, setLoaded] = useState(false);

    return (
        <div
            className={`relative overflow-hidden bg-[#0F131C] ${className}`}
        >
            {/* Skeleton shimmer */}
            {!failed && !loaded && (
                <div
                    aria-hidden="true"
                    className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#111721] via-[#0B0F17] to-[#0A0D14]"
                />
            )}

            {!failed ? (
                <img
                    src={src}
                    alt={alt}
                    loading={priority ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={priority ? "high" : "auto"}
                    sizes={sizes}
                    draggable={false}
                    onLoad={() => setLoaded(true)}
                    onError={() => setFailed(true)}
                    className={`h-full w-full object-cover transition-all duration-700 ease-out ${grayscale
                        ? "grayscale-[35%] md:group-hover:scale-[1.035] md:group-hover:grayscale-0"
                        : "md:group-hover:scale-[1.035]"
                        }`}
                    style={{
                        objectPosition,
                        opacity: loaded ? 1 : 0,
                        transition: "opacity 600ms ease, filter 700ms ease, transform 700ms ease",
                    }}
                />
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#16233F] via-[#0B0F17] to-[#080B12]" />
            )}

            {/* Theme-consistent inner border */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.06]"
            />
        </div>
    );
}

/* ============================================================
   BUSINESS DIVISIONS
   ============================================================ */

const divisions = [
    {
        title: "Technology",
        subtitle: "We create digital products.",
        description:
            "Website development, mobile applications, web applications, custom software and digital solutions for businesses.",
        words: "Websites · Applications · Software",
        link: "#portfolio",
    },
    {
        title: "Training",
        subtitle: "We develop practical ability.",
        description:
            "Technical programmes, programming, hands-on projects and professional learning designed around useful skills.",
        words: "Technical skills · Projects · Certificates",
        link: "#portfolio",
    },
    {
        title: "Study abroad",
        subtitle: "We guide international education.",
        description:
            "Country and course exploration, university selection, admission guidance, documentation and student visa assistance.",
        words: "Destinations · Admissions · Visa support",
        link: "#portfolio",
    },
    {
        title: "Careers",
        subtitle: "We help people prepare for work.",
        description:
            "Career preparation, resume and interview support, internship opportunities and placement assistance.",
        words: "Career guidance · Internships · Placements",
        link: "#portfolio",
    },
];

/* ============================================================
   WORK MOSAIC
   ============================================================ */

const workItems = [
    {
        title: "Web experiences",
        category: "Website development",
        description:
            "Business websites, landing pages and digital platforms built around an organisation's needs.",
        image: "/website-development-poster.jpg",
        alt: "Website development visual",
        size: "md:col-span-7 md:row-span-2",
        aspect: "aspect-[16/11] md:aspect-auto",
        grayscale: false,
        pos: "center",
    },
    {
        title: "Applications",
        category: "Mobile & web",
        description:
            "Applications designed around people and the way they use digital services.",
        image: "/app-development-poster.jpg",
        alt: "Application development visual",
        size: "md:col-span-5",
        aspect: "aspect-[16/11]",
        grayscale: false,
        pos: "center",
    },
    {
        title: "Custom systems",
        category: "Software development",
        description: "Purpose-built software and business systems.",
        image: "/software-development-poster.jpg",
        alt: "Software development visual",
        size: "md:col-span-5",
        aspect: "aspect-[16/11]",
        grayscale: false,
        pos: "center",
    },
    {
        title: "Practical learning",
        category: "Training & certification",
        description:
            "Training experiences that connect knowledge with practical work.",
        image:
            "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1100&q=85",
        alt: "Students learning together",
        size: "md:col-span-4",
        aspect: "aspect-[4/3]",
        grayscale: true,
        pos: "center",
    },
    {
        title: "Global education",
        category: "Study abroad",
        description:
            "Education pathways, university guidance and student support.",
        image:
            "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1100&q=85",
        alt: "University graduation",
        size: "md:col-span-4",
        aspect: "aspect-[4/3]",
        grayscale: true,
        pos: "center",
    },
    {
        title: "Career development",
        category: "Careers & placements",
        description:
            "Preparation, guidance and connections to relevant opportunities.",
        image:
            "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1100&q=85",
        alt: "Professionals working together",
        size: "md:col-span-4",
        aspect: "aspect-[4/3]",
        grayscale: true,
        pos: "center",
    },
] as const;

/* ============================================================
   PRINCIPLES
   ============================================================ */

const principles = [
    {
        title: "Understand the actual requirement.",
        description:
            "A business needs a solution that fits its operations. A learner needs a suitable training path. A student needs informed education guidance. The starting point is always the real requirement.",
    },
    {
        title: "Make complex choices easier to navigate.",
        description:
            "Digital projects, learning programmes and international applications involve different decisions. We aim to make the information, requirements and next steps clear.",
    },
    {
        title: "Keep the outcome in focus.",
        description:
            "Our work is measured by its usefulness: a functioning digital product, practical skills, a properly prepared application or stronger career readiness.",
    },
];

/* ============================================================
   PAGE
   ============================================================ */

export default function AboutPage() {
    return (
        <main
            className={`${headingFont.variable} ${bodyFont.variable} overflow-hidden bg-[#050505] text-[#F3F5FA] [font-family:var(--about-body)] selection:bg-[#2F7BFF] selection:text-white`}
        >
            <Navbar />

            {/* =================================================
                01 — MANIFESTO
            ================================================= */}

            <section className="relative isolate overflow-hidden bg-[#050505] text-white">
                <CheckerPattern className="absolute -right-10 top-0 h-[420px] w-[420px] opacity-50 sm:right-0 sm:h-[470px] sm:w-[470px]" />

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-40 bottom-0 h-[360px] w-[440px] rounded-full bg-[#2F7BFF]/[0.14] blur-[140px]"
                />

                <div className="relative mx-auto max-w-[1600px] px-5 pb-16 pt-32 sm:px-8 sm:pb-24 sm:pt-40 lg:px-14 xl:px-20">
                    <Reveal>
                        <div className="mb-8 flex items-center gap-3 sm:mb-10">
                            <span className="h-[7px] w-[7px] rounded-full bg-[#2F7BFF]" />
                            <p className="text-[10px] font-bold uppercase tracking-[0.23em] text-[#A9C7FF]">
                                The company / MindSpace
                            </p>
                        </div>
                    </Reveal>

                    <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
                        <Reveal delay={80} className="lg:col-span-9">
                            <h1 className="max-w-[1150px] text-[clamp(2.4rem,7.2vw,7.6rem)] font-semibold leading-[0.96] tracking-[-0.075em] [font-family:var(--about-heading)] sm:leading-[0.94] sm:tracking-[-0.085em]">
                                We bring
                                <br />
                                <span className="text-[#86ACFF]">
                                    different disciplines
                                </span>
                                <br />
                                into one direction.
                            </h1>
                        </Reveal>

                        <Reveal delay={180} className="max-w-[360px] pb-1 lg:col-span-3 lg:justify-self-end">
                            <p className="text-[14px] leading-[1.9] text-[#B9C5D6] sm:text-[15px] sm:leading-[1.95]">
                                MindSpace is a technology, education and career
                                development company. We build digital solutions
                                for businesses and support people through
                                learning, global education and career pathways.
                            </p>

                            <Link
                                href="#who-we-are"
                                className="group mt-6 inline-flex min-h-[44px] items-center gap-3 border-b border-[#2F7BFF]/70 pb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:text-[#A9C7FF] sm:mt-7"
                            >
                                Get to know us
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2F7BFF] transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </Link>
                        </Reveal>
                    </div>

                    {/* Wide visual composition */}
                    <div className="relative mt-14 grid gap-3 sm:mt-20 sm:grid-cols-12 sm:gap-4">
                        <Reveal className="group relative aspect-[4/3] overflow-hidden sm:col-span-7 sm:aspect-auto sm:min-h-[330px] lg:min-h-[410px]">
                            <EditorialImage
                                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1500&q=90"
                                alt="People collaborating in a professional environment"
                                className="absolute inset-0 h-full w-full"
                                grayscale
                                priority
                                sizes="(max-width: 768px) 100vw, 60vw"
                                objectPosition="center"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/10 to-transparent" />

                            <div className="absolute bottom-5 left-5 max-w-[440px] sm:bottom-9 sm:left-9">
                                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A9C7FF]">
                                    Our perspective
                                </p>
                                <h2 className="mt-3 text-[clamp(1.6rem,3.6vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.06em] text-white [font-family:var(--about-heading)]">
                                    Different needs deserve different solutions.
                                </h2>
                            </div>
                        </Reveal>

                        <div className="grid grid-cols-2 gap-3 sm:col-span-5 sm:gap-4">
                            {[
                                {
                                    src: "/website-development-poster.jpg",
                                    alt: "Website development capability",
                                    gray: false,
                                },
                                {
                                    src: "/app-development-poster.jpg",
                                    alt: "Application development capability",
                                    gray: false,
                                },
                                {
                                    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=85",
                                    alt: "People learning together",
                                    gray: true,
                                },
                                {
                                    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=85",
                                    alt: "University campus and graduation",
                                    gray: true,
                                },
                            ].map((img, i) => (
                                <Reveal
                                    key={i}
                                    delay={120 + i * 60}
                                    className="group relative aspect-square overflow-hidden sm:aspect-auto sm:min-h-0"
                                >
                                    <EditorialImage
                                        src={img.src}
                                        alt={img.alt}
                                        className="absolute inset-0 h-full w-full"
                                        grayscale={img.gray}
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                    />
                                    <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-transparent" />
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <BlueCheckerBand />

            {/* =================================================
                02 — WHO WE ARE
            ================================================= */}

            <section
                id="who-we-are"
                className="relative scroll-mt-24 overflow-hidden bg-[#050505] py-20 sm:py-28 lg:py-32"
            >
                <CheckerPattern className="absolute -left-20 top-12 h-[300px] w-[300px] opacity-25 sm:h-[320px] sm:w-[320px]" />

                <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14 xl:px-20">
                    <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
                        <Reveal className="lg:col-span-7">
                            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.21em] text-[#2F7BFF] sm:mb-6">
                                Who we are
                            </p>

                            <h2 className="max-w-[800px] text-[clamp(2.2rem,6vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.07em] text-[#F3F5FA] [font-family:var(--about-heading)] sm:leading-[1.01] sm:tracking-[-0.08em]">
                                One company.
                                <br />
                                <span className="text-[#2F7BFF]">
                                    Four areas of focus.
                                </span>
                            </h2>
                        </Reveal>

                        <Reveal delay={120} className="flex flex-col justify-end lg:col-span-4 lg:col-start-9">
                            <p className="text-[14px] leading-[1.9] text-[#9AA6B7] sm:leading-[1.95]">
                                Our work connects business technology with
                                individual growth. Each division has a specific
                                purpose, while sharing the same commitment to
                                useful solutions, clear guidance and practical
                                progress.
                            </p>
                        </Reveal>
                    </div>

                    <div className="mt-12 border-y border-white/10 sm:mt-16">
                        {divisions.map((division, i) => (
                            <Reveal key={division.title} delay={i * 60}>
                                <Link
                                    href={division.link}
                                    className="group grid gap-3 border-b border-white/[0.08] py-6 transition-colors duration-300 last:border-b-0 hover:bg-white/[0.03] sm:gap-4 sm:py-9 md:py-10 lg:grid-cols-[0.8fr_1.35fr_1.5fr_40px] lg:items-center lg:gap-8 lg:px-4"
                                >
                                    <h3 className="text-[clamp(1.5rem,4vw,2.5rem)] font-semibold tracking-[-0.055em] text-[#F3F5FA] transition-colors group-hover:text-[#2F7BFF] [font-family:var(--about-heading)]">
                                        {division.title}
                                    </h3>

                                    <p className="text-[13px] font-semibold leading-6 text-[#D3D9E2] sm:text-[14px]">
                                        {division.subtitle}
                                    </p>

                                    <div>
                                        <p className="max-w-[450px] text-[12px] leading-[1.85] text-[#8A96A8]">
                                            {division.description}
                                        </p>
                                        <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.14em] text-[#2F7BFF] sm:mt-3">
                                            {division.words}
                                        </p>
                                    </div>

                                    <span
                                        aria-hidden="true"
                                        className="hidden h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[#2F7BFF] transition-all duration-300 group-hover:border-[#2F7BFF] group-hover:bg-[#2F7BFF] group-hover:text-white lg:flex"
                                    >
                                        →
                                    </span>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* =================================================
                03 — PORTFOLIO
            ================================================= */}

            <section
                id="portfolio"
                className="relative isolate scroll-mt-24 overflow-hidden bg-[#0B0F17] py-20 sm:py-28 lg:py-32"
            >
                <CheckerPattern className="absolute -right-20 top-0 h-[420px] w-[420px] opacity-40 sm:h-[500px] sm:w-[500px]" />

                <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14 xl:px-20">
                    <div className="mb-10 grid gap-6 sm:mb-14 sm:gap-8 lg:grid-cols-12 lg:items-end">
                        <Reveal className="lg:col-span-8">
                            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2F7BFF] sm:mb-6">
                                What our work covers
                            </p>

                            <h2 className="max-w-[900px] text-[clamp(2.2rem,6vw,5.5rem)] font-semibold leading-[1.03] tracking-[-0.07em] text-[#F3F5FA] [font-family:var(--about-heading)] sm:leading-[1.02] sm:tracking-[-0.075em]">
                                Ideas are only the beginning.
                                <br />
                                <span className="text-[#2F7BFF]">
                                    Here&rsquo;s where they go.
                                </span>
                            </h2>
                        </Reveal>

                        <Reveal delay={120} className="lg:col-span-4 lg:justify-self-end">
                            <p className="max-w-[350px] text-[13px] leading-[1.85] text-[#8A96A8] sm:leading-[1.9]">
                                From digital products to learning and
                                professional opportunities, these are the
                                areas in which MindSpace works.
                            </p>
                        </Reveal>
                    </div>

                    {/* Mosaic — aspect-locked so no ragged overflow on mobile */}
                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-12 md:auto-rows-[minmax(180px,auto)] md:gap-4">
                        {workItems.map((item, i) => (
                            <Reveal
                                key={item.title}
                                delay={i * 60}
                                className={`group relative overflow-hidden rounded-[6px] bg-[#0F131C] ${item.size} ${item.aspect}`}
                            >
                                <EditorialImage
                                    src={item.image}
                                    alt={item.alt}
                                    className="absolute inset-0 h-full w-full"
                                    grayscale={item.grayscale}
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    objectPosition={item.pos}
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/95 via-[#050505]/15 to-transparent transition-opacity duration-500 group-hover:from-[#050505]/98" />

                                <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-2 sm:left-5 sm:right-5 sm:top-5">
                                    <span className="bg-white/95 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.12em] text-[#050505] sm:px-3 sm:py-1.5">
                                        {item.category}
                                    </span>
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-sm transition-all duration-300 group-hover:border-[#2F7BFF] group-hover:bg-[#2F7BFF] sm:h-9 sm:w-9">
                                        ↗
                                    </span>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                                    <h3 className="text-[clamp(1.25rem,3vw,2.1rem)] font-semibold tracking-[-0.05em] text-white [font-family:var(--about-heading)]">
                                        {item.title}
                                    </h3>
                                    <p className="mt-1.5 max-w-[440px] text-[11px] leading-[1.7] text-white/70 sm:mt-2 sm:leading-[1.8]">
                                        {item.description}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <div className="mt-6 flex flex-col justify-between gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center">
                        <p className="text-[9px] uppercase tracking-[0.16em] text-[#6B7686]">
                            Technology · Learning · Education · Careers
                        </p>
                        <p className="max-w-[480px] text-[10px] leading-5 text-[#6B7686] sm:text-right">
                            These are illustrative capability previews.
                            Replace them with verified MindSpace project
                            images and case studies when available.
                        </p>
                    </div>
                </div>
            </section>

            <BlueCheckerBand />

            {/* =================================================
                04 — WHAT CONNECTS
            ================================================= */}

            <section className="relative overflow-hidden bg-[#050505] py-20 text-white sm:py-28 lg:py-32">
                <CheckerPattern className="absolute -left-24 bottom-0 h-[380px] w-[380px] opacity-30 sm:h-[450px] sm:w-[450px]" />

                <div className="relative mx-auto grid max-w-[1600px] gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-14 xl:px-20">
                    <Reveal className="lg:col-span-5">
                        <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#A9C7FF] sm:mb-6">
                            What connects our work
                        </p>

                        <h2 className="max-w-[600px] text-[clamp(2.2rem,5.5vw,5rem)] font-semibold leading-[1.04] tracking-[-0.07em] [font-family:var(--about-heading)] sm:leading-[1.03] sm:tracking-[-0.075em]">
                            Different services.
                            <br />
                            <span className="text-[#7EA9FF]">
                                One way of thinking.
                            </span>
                        </h2>

                        <p className="mt-6 max-w-[440px] text-[14px] leading-[1.9] text-[#9AA6B7] sm:mt-7 sm:leading-[1.95]">
                            A technology project, a training programme and
                            an international education application are not
                            the same. What they should share is a thoughtful
                            approach to the needs behind them.
                        </p>
                    </Reveal>

                    <div className="lg:col-span-6 lg:col-start-7">
                        {principles.map((principle, i) => (
                            <Reveal key={principle.title} delay={i * 80}>
                                <article className="border-t border-white/12 py-7 sm:py-10">
                                    <h3 className="max-w-[640px] text-[clamp(1.4rem,3.5vw,2.6rem)] font-semibold leading-[1.16] tracking-[-0.05em] text-white [font-family:var(--about-heading)]">
                                        {principle.title}
                                    </h3>
                                    <p className="mt-3 max-w-[560px] text-[13px] leading-[1.85] text-[#8A96A8] sm:mt-4 sm:leading-[1.9]">
                                        {principle.description}
                                    </p>
                                </article>
                            </Reveal>
                        ))}
                        <div className="border-t border-white/12" />
                    </div>
                </div>
            </section>

            {/* =================================================
                05 — MISSION / VISION
            ================================================= */}

            <section className="relative overflow-hidden bg-[#0B0F17] py-20 sm:py-28 lg:py-32">
                <CheckerPattern className="absolute -right-20 top-0 h-[340px] w-[340px] opacity-25 sm:h-[390px] sm:w-[390px]" />

                <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14 xl:px-20">
                    <Reveal className="mb-10 sm:mb-14">
                        <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2F7BFF] sm:mb-6">
                            Purpose and direction
                        </p>
                        <h2 className="max-w-[800px] text-[clamp(2.2rem,5.8vw,5.3rem)] font-semibold leading-[1.03] tracking-[-0.07em] text-[#F3F5FA] [font-family:var(--about-heading)] sm:leading-[1.02] sm:tracking-[-0.075em]">
                            Why MindSpace exists.
                        </h2>
                    </Reveal>

                    <div className="grid gap-4 lg:grid-cols-12">
                        {/* Mission */}
                        <Reveal className="lg:col-span-7">
                            <article className="relative flex min-h-[300px] flex-col overflow-hidden bg-[#2F7BFF] p-6 text-white sm:min-h-[340px] sm:p-9 lg:min-h-[400px] lg:p-12">
                                <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full border border-white/15 sm:h-64 sm:w-64" />
                                <div className="pointer-events-none absolute -right-5 -top-5 h-40 w-40 rounded-full border border-white/15 sm:h-48 sm:w-48" />

                                <p className="relative text-[9px] font-bold uppercase tracking-[0.2em] text-white/75">
                                    Our mission
                                </p>

                                <h3 className="relative mt-auto max-w-[560px] pt-10 text-[clamp(1.7rem,4vw,3.7rem)] font-semibold leading-[1.1] tracking-[-0.055em] [font-family:var(--about-heading)] sm:leading-[1.08] sm:tracking-[-0.065em]">
                                    Make technology, learning and opportunity
                                    more accessible through meaningful support.
                                </h3>

                                <div className="pointer-events-none absolute bottom-0 right-0 h-24 w-24 opacity-70 sm:h-28 sm:w-28">
                                    <CheckerPattern className="h-full w-full" />
                                </div>
                            </article>
                        </Reveal>

                        {/* Vision */}
                        <Reveal delay={120} className="lg:col-span-5">
                            <article className="relative flex min-h-[300px] flex-col overflow-hidden border border-white/10 bg-[#0F131C] p-6 sm:min-h-[340px] sm:p-9 lg:min-h-[400px] lg:p-10">
                                <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#2F7BFF]/[0.12] blur-[70px] sm:h-80 sm:w-80" />

                                <p className="relative text-[9px] font-bold uppercase tracking-[0.2em] text-[#2F7BFF]">
                                    Our vision
                                </p>

                                <h3 className="relative mt-auto max-w-[450px] pt-10 text-[clamp(1.6rem,3.6vw,3rem)] font-semibold leading-[1.12] tracking-[-0.05em] text-[#F3F5FA] [font-family:var(--about-heading)] sm:leading-[1.1] sm:tracking-[-0.06em]">
                                    One connected platform for business,
                                    education and career progress.
                                </h3>

                                <p className="relative mt-5 max-w-[400px] text-[13px] leading-[1.85] text-[#9AA6B7] sm:mt-6 sm:leading-[1.9]">
                                    A future where people can discover services,
                                    access information and navigate the support
                                    they need in one place.
                                </p>
                            </article>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* =================================================
                06 — CLOSING
            ================================================= */}

            <section className="relative overflow-hidden bg-[#050505] pb-20 pt-20 text-white sm:pb-28 sm:pt-28 lg:pb-32 lg:pt-32">
                <CheckerPattern className="absolute right-0 top-0 h-[360px] w-[360px] opacity-35 sm:h-[420px] sm:w-[420px]" />

                <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14 xl:px-20">
                    <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
                        <Reveal className="lg:col-span-9">
                            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#A9C7FF] sm:mb-6">
                                The MindSpace perspective
                            </p>

                            <h2 className="max-w-[1100px] text-[clamp(2.4rem,7vw,6.4rem)] font-semibold leading-[1] tracking-[-0.07em] [font-family:var(--about-heading)] sm:leading-[0.98] sm:tracking-[-0.08em]">
                                Build something useful.
                                <br />
                                <span className="text-[#82ACFF]">
                                    Make progress possible.
                                </span>
                            </h2>
                        </Reveal>

                        <Reveal delay={120} className="lg:col-span-3 lg:justify-self-end">
                            <p className="text-[13px] leading-[1.9] text-[#9AA6B7]">
                                Have a project, a learning goal, an education
                                plan or a career question? Start by telling us
                                what you need.
                            </p>

                            <Link
                                href="/contact"
                                className="group mt-6 inline-flex min-h-[52px] items-center gap-4 bg-[#2F7BFF] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2168E8] sm:mt-7"
                            >
                                Connect with MindSpace
                                <span className="transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}