
// app/about/page.tsx
"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import {
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from "react";

import Navbar from "@/app/components/consultant/Navbar";
import Footer from "@/app/components/consultant/Footer";

/* =========================================================
   REVEAL
========================================================= */

type RevealProps = {
    children: ReactNode;
    className?: string;
    delay?: number;
};

function Reveal({
    children,
    className = "",
    delay = 0,
}: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reducedMotion || !("IntersectionObserver" in window)) {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(element);
                }
            },
            { threshold: 0.12 }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={[
                "transition-[opacity,transform] duration-700 ease-out",
                visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-7 opacity-0",
                className,
            ].join(" ")}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

/* =========================================================
   SECTION INDEX
========================================================= */

function SectionLabel({
    number,
    children,
    light = false,
}: {
    number: string;
    children: ReactNode;
    light?: boolean;
}) {
    return (
        <div className="mb-9 flex items-center gap-4 sm:mb-12">
            <span className="text-[12px] tracking-[0.16em] text-[#2F7BFF]">
                {number}
            </span>

            <span className="h-px w-9 bg-[#2F7BFF]/70" />

            <span
                className={`text-[12px] tracking-[0.16em] ${light ? "text-white" : "text-white/75"
                    }`}
            >
                {children}
            </span>
        </div>
    );
}

/* =========================================================
   ARROW
========================================================= */

function ArrowIcon() {
    return (
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
            ↗
        </span>
    );
}

/* =========================================================
   IMAGE FRAME
========================================================= */

function ImageFrame({
    src,
    alt,
    className = "",
    imageClassName = "",
    label,
}: {
    src: string;
    alt: string;
    className?: string;
    imageClassName?: string;
    label?: string;
}) {
    return (
        <div
            className={`group relative isolate overflow-hidden bg-[#101722] ${className}`}
        >
            <img
                src={src}
                alt={alt}
                loading="lazy"
                className={`h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.045] ${imageClassName}`}
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10 opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="pointer-events-none absolute left-0 top-0 h-[2px] w-0 bg-[#2F7BFF] transition-all duration-700 group-hover:w-full" />

            <div className="pointer-events-none absolute bottom-0 left-0 h-0 w-[2px] bg-[#2F7BFF] transition-all duration-700 group-hover:h-full" />

            {label && (
                <div className="absolute bottom-4 left-4 z-10 sm:bottom-5 sm:left-5">
                    <span className="text-[10px] tracking-[0.16em] text-white sm:text-[11px]">
                        {label}
                    </span>
                </div>
            )}
        </div>
    );
}

/* =========================================================
   DATA
========================================================= */

const divisions = [
    {
        number: "01",
        name: "Technology",
        statement: "Digital ideas, built to work.",
        description:
            "We design and develop websites, applications and software experiences that help businesses move forward with clarity and confidence.",
        href: "/services/technology",
        tag: "BUILD",
    },
    {
        number: "02",
        name: "Training",
        statement: "Skills that move beyond theory.",
        description:
            "Practical learning experiences shaped around real tools, real projects and the skills people need to grow.",
        href: "/services/training",
        tag: "LEARN",
    },
    {
        number: "03",
        name: "Careers",
        statement: "Turning potential into progress.",
        description:
            "We help people navigate opportunities, build confidence and take meaningful steps towards their professional goals.",
        href: "/services/careers",
        tag: "GROW",
    },
];

const portfolio = [
    {
        number: "01",
        category: "DIGITAL EXPERIENCES",
        title: "Websites with a purpose.",
        description:
            "Thoughtful digital platforms designed around people, businesses and their goals.",
        image: "/website-development-poster.jpg",
        layout: "md:col-span-7",
        ratio: "aspect-[16/10] md:aspect-[1.55/1]",
    },
    {
        number: "02",
        category: "APPLICATION DEVELOPMENT",
        title: "Useful things, made digital.",
        description:
            "Mobile and web applications that simplify everyday interactions.",
        image: "/app-development-poster.jpg",
        layout: "md:col-span-5 md:mt-24",
        ratio: "aspect-[16/10] md:aspect-[1.25/1]",
    },
    {
        number: "03",
        category: "CUSTOM SOFTWARE",
        title: "Systems that fit the work.",
        description:
            "Purpose-built tools and connected systems for specific business needs.",
        image: "/software-development-poster.jpg",
        layout: "md:col-span-4",
        ratio: "aspect-[5/4]",
    },
    {
        number: "04",
        category: "LEARNING & DEVELOPMENT",
        title: "Learning by doing.",
        description:
            "Hands-on training, collaborative projects and technology-led learning.",
        image:
            "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85",
        layout: "md:col-span-4 md:mt-16",
        ratio: "aspect-[5/4]",
    },
    {
        number: "05",
        category: "CAREER GROWTH",
        title: "Your next step, in focus.",
        description:
            "Career guidance and opportunity support to make the next move more meaningful.",
        image:
            "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
        layout: "md:col-span-4",
        ratio: "aspect-[5/4]",
    },
];

const principles = [
    {
        number: "01",
        title: "Understand first.",
        text: "Every solution begins with listening, context and the right questions.",
        symbol: "↗",
    },
    {
        number: "02",
        title: "Make it clearer.",
        text: "We turn complexity into focused, practical and accessible experiences.",
        symbol: "◎",
    },
    {
        number: "03",
        title: "Move with purpose.",
        text: "We focus on outcomes people can use, experience and build upon.",
        symbol: "→",
    },
];

/* =========================================================
   ABOUT PAGE
========================================================= */

export default function AboutPage() {
    const pageGutter =
        "px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28";

    return (
        <main className="about-page font-questrial overflow-x-clip bg-[#05070B] text-white">
            <Navbar />

            {/* =====================================================
                01 — HERO
            ===================================================== */}

            <section
                className={`${pageGutter} relative pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-48`}
            >
                <div className="pointer-events-none absolute right-[-10%] top-24 h-[420px] w-[420px] rounded-full bg-[#2F7BFF]/[0.07] blur-[130px]" />

                <div className="relative mx-auto max-w-[1600px]">
                    <Reveal>
                        <div className="mb-10 flex items-center gap-3 sm:mb-14">
                            <span className="h-[7px] w-[7px] rounded-full bg-[#2F7BFF] shadow-[0_0_18px_#2F7BFF]" />

                            <span className="text-[11px] tracking-[0.2em] text-white/65 sm:text-[12px]">
                                ABOUT MINDSPACE
                            </span>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-12 items-end gap-x-8 gap-y-8 lg:gap-x-14">
                        <Reveal className="col-span-12 lg:col-span-8">
                            <h1 className="max-w-[1100px] text-[clamp(43px,7.5vw,108px)] leading-[0.94] tracking-[-0.065em]">
                                More than one
                                <br />
                                way to move
                                <span className="text-[#2F7BFF]"> forward.</span>
                            </h1>
                        </Reveal>

                        <Reveal
                            delay={120}
                            className="col-span-12 lg:col-span-4 lg:pb-2"
                        >
                            <div className="max-w-[440px] lg:ml-auto">
                                <span className="mb-5 block h-px w-12 bg-[#2F7BFF]" />

                                <p className="text-[16px] leading-[1.9] text-white/65 sm:text-[18px]">
                                    We bring technology, learning and career
                                    development together to make ideas useful,
                                    skills meaningful and opportunities easier
                                    to move towards.
                                </p>
                            </div>
                        </Reveal>
                    </div>

                    {/* Editorial image composition */}
                    <Reveal delay={100} className="mt-14 sm:mt-20 lg:mt-24">
                        <div className="grid grid-cols-12 gap-3 sm:gap-4 lg:gap-5">
                            <div className="col-span-12 md:col-span-7">
                                <div className="group relative overflow-hidden bg-[#101722]">
                                    <div className="relative aspect-[16/10] max-h-[570px] overflow-hidden">
                                        <img
                                            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=90"
                                            alt="A team collaborating on a project"
                                            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.035]"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/10" />

                                        <div className="absolute bottom-0 left-0 p-6 sm:p-9 lg:p-12">
                                            <span className="mb-4 block text-[10px] tracking-[0.18em] text-white/65 sm:text-[11px]">
                                                ONE TEAM. DIFFERENT POSSIBILITIES.
                                            </span>

                                            <h2 className="max-w-[550px] text-[clamp(25px,4vw,48px)] leading-[1.05] tracking-[-0.04em]">
                                                Different needs.
                                                <br />
                                                One connected approach.
                                            </h2>
                                        </div>

                                        <div className="absolute left-0 top-0 h-[2px] w-0 bg-[#2F7BFF] transition-all duration-700 group-hover:w-full" />

                                        <span className="absolute right-5 top-5 text-[10px] tracking-[0.15em] text-white/70">
                                            MS / 001
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-12 grid grid-cols-2 gap-3 sm:gap-4 md:col-span-5 md:grid-cols-1 md:grid-rows-2 lg:gap-5">
                                <ImageFrame
                                    src="/website-development-poster.jpg"
                                    alt="Website development"
                                    label="01 / TECHNOLOGY"
                                    className="aspect-[5/3] md:aspect-auto md:min-h-0"
                                />

                                <ImageFrame
                                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1100&q=85"
                                    alt="People learning together"
                                    label="02 / LEARNING & GROWTH"
                                    className="aspect-[5/3] md:aspect-auto md:min-h-0"
                                />
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={180}>
                        <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-6 sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-[10px] tracking-[0.17em] text-white/50 sm:text-[11px]">
                                TECHNOLOGY <span className="px-2 text-[#2F7BFF]">/</span>
                                TRAINING <span className="px-2 text-[#2F7BFF]">/</span>
                                CAREERS
                            </p>

                            <a
                                href="#who-we-are"
                                className="group inline-flex w-fit items-center gap-4 text-[13px] text-white/80 transition-colors hover:text-[#2F7BFF]"
                            >
                                Discover MindSpace
                                <span className="transition-transform duration-300 group-hover:translate-y-1">
                                    ↓
                                </span>
                            </a>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* =====================================================
                BLUE DIVIDER
            ===================================================== */}

            <div className="relative h-[3px] overflow-hidden bg-[#2F7BFF]">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />
            </div>

            {/* =====================================================
                02 — WHO WE ARE
            ===================================================== */}

            <section
                id="who-we-are"
                className={`${pageGutter} scroll-mt-24 py-24 sm:py-28 lg:py-36`}
            >
                <div className="mx-auto max-w-[1600px]">
                    <div className="grid grid-cols-12 gap-y-12 lg:gap-x-16">
                        <Reveal className="col-span-12 lg:col-span-4">
                            <SectionLabel number="02">
                                WHO WE ARE
                            </SectionLabel>

                            <h2 className="text-[clamp(36px,5.4vw,72px)] leading-[0.99] tracking-[-0.055em]">
                                One company.
                                <br />
                                <span className="text-[#2F7BFF]">
                                    Three areas.
                                </span>
                                <br />
                                Shared purpose.
                            </h2>
                        </Reveal>

                        <Reveal
                            delay={100}
                            className="col-span-12 lg:col-span-8"
                        >
                            <div className="flex h-full flex-col justify-between">
                                <p className="max-w-[760px] text-[16px] leading-[1.9] text-white/65 sm:text-[18px]">
                                    MindSpace works across interconnected areas
                                    that shape how people and businesses grow.
                                    From digital solutions to skill-building and
                                    career direction, each area has its own
                                    purpose — connected by a shared focus on
                                    practical progress.
                                </p>

                                <div className="mt-12 border-t border-white/15 lg:mt-16">
                                    {divisions.map((item) => (
                                        <Link
                                            href={item.href}
                                            key={item.number}
                                            className="group grid grid-cols-12 items-center gap-3 border-b border-white/15 py-7 transition-colors duration-300 hover:bg-white/[0.025] sm:gap-5 sm:py-9 lg:py-10"
                                        >
                                            <span className="col-span-1 text-[11px] tracking-[0.12em] text-[#2F7BFF]">
                                                {item.number}
                                            </span>

                                            <div className="col-span-10 sm:col-span-4">
                                                <div className="mb-2 text-[9px] tracking-[0.18em] text-white/35">
                                                    {item.tag}
                                                </div>

                                                <h3 className="text-[25px] leading-tight tracking-[-0.035em] transition-colors duration-300 group-hover:text-[#2F7BFF] sm:text-[30px]">
                                                    {item.name}
                                                </h3>

                                                <p className="mt-2 text-[13px] text-white/55 sm:text-[14px]">
                                                    {item.statement}
                                                </p>
                                            </div>

                                            <p className="col-span-12 text-[14px] leading-[1.85] text-white/55 sm:col-span-6 sm:col-start-6 sm:pr-5 sm:text-[15px]">
                                                {item.description}
                                            </p>

                                            <span className="col-span-1 hidden justify-end text-[#2F7BFF] sm:flex">
                                                <ArrowIcon />
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* =====================================================
                03 — WHAT WE DO
            ===================================================== */}

            <section
                id="portfolio"
                className={`${pageGutter} scroll-mt-24 bg-[#090D14] py-24 sm:py-28 lg:py-36`}
            >
                <div className="mx-auto max-w-[1600px]">
                    <Reveal>
                        <SectionLabel number="03">
                            WHAT WE DO
                        </SectionLabel>
                    </Reveal>

                    <Reveal delay={70}>
                        <div className="mb-14 grid grid-cols-12 items-end gap-y-7 lg:mb-20 lg:gap-x-12">
                            <div className="col-span-12 lg:col-span-8">
                                <h2 className="max-w-[950px] text-[clamp(36px,6vw,78px)] leading-[0.98] tracking-[-0.06em]">
                                    Ideas are only the beginning.
                                    <span className="text-[#2F7BFF]">
                                        {" "}Here's where they go.
                                    </span>
                                </h2>
                            </div>

                            <p className="col-span-12 max-w-[440px] text-[15px] leading-[1.9] text-white/55 lg:col-span-4 lg:ml-auto">
                                A range of capabilities, connected by a focus
                                on creating useful experiences and real-world
                                outcomes.
                            </p>
                        </div>
                    </Reveal>

                    {/* Asymmetric portfolio */}
                    <div className="grid grid-cols-1 gap-x-5 gap-y-12 md:grid-cols-12 md:gap-x-7 md:gap-y-20">
                        {portfolio.map((item, index) => (
                            <Reveal
                                key={item.number}
                                delay={index * 70}
                                className={item.layout}
                            >
                                <article className="group">
                                    <div className="relative overflow-hidden border border-white/[0.08] bg-[#111720]">
                                        <div
                                            className={`relative overflow-hidden ${item.ratio}`}
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                loading="lazy"
                                                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.045]"
                                            />

                                            <div className="absolute inset-0 bg-black/25 transition-colors duration-500 group-hover:bg-black/10" />

                                            <div className="absolute left-0 top-0 h-[2px] w-0 bg-[#2F7BFF] transition-all duration-700 group-hover:w-full" />

                                            <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
                                                <span className="border border-white/25 bg-black/40 px-3 py-2 text-[9px] tracking-[0.14em] text-white backdrop-blur-md sm:text-[10px]">
                                                    {item.category}
                                                </span>
                                            </div>

                                            <span className="absolute right-4 top-4 text-[11px] tracking-[0.12em] text-white/85 sm:right-5 sm:top-5">
                                                {item.number}
                                            </span>

                                            <span className="absolute bottom-4 right-5 text-[22px] text-white/75 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                                ↗
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-start justify-between gap-5 border-b border-white/10 py-5 sm:py-6">
                                        <div>
                                            <h3 className="text-[23px] leading-tight tracking-[-0.035em] text-white sm:text-[27px]">
                                                {item.title}
                                            </h3>

                                            <p className="mt-3 max-w-[420px] text-[14px] leading-[1.85] text-white/55 sm:text-[15px]">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal delay={180}>
                        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-6 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
                            <span className="text-[10px] tracking-[0.17em] text-white/40">
                                OUR CAPABILITIES
                            </span>

                            <Link
                                href="/services"
                                className="group inline-flex w-fit items-center gap-4 text-[13px] text-white/80 transition-colors hover:text-[#2F7BFF]"
                            >
                                Explore our services
                                <ArrowIcon />
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* =====================================================
                04 — OUR APPROACH
            ===================================================== */}

            <section
                className={`${pageGutter} relative overflow-hidden py-24 sm:py-28 lg:py-36`}
            >
                <div className="pointer-events-none absolute -right-32 top-20 h-[380px] w-[380px] rounded-full bg-[#2F7BFF]/[0.055] blur-[120px]" />

                <div className="relative mx-auto max-w-[1600px]">
                    <div className="grid grid-cols-12 gap-y-12 lg:gap-x-16">
                        <Reveal className="col-span-12 lg:col-span-5">
                            <SectionLabel number="04">
                                WHAT CONNECTS US
                            </SectionLabel>

                            <h2 className="text-[clamp(36px,5.5vw,72px)] leading-[0.99] tracking-[-0.055em]">
                                Different services.
                                <br />
                                <span className="text-[#2F7BFF]">
                                    One way of thinking.
                                </span>
                            </h2>

                            <p className="mt-8 max-w-[430px] text-[15px] leading-[1.9] text-white/55 sm:text-[16px]">
                                The best work starts with understanding what
                                people need — then making the next step easier
                                to see, achieve and sustain.
                            </p>
                        </Reveal>

                        <Reveal
                            delay={100}
                            className="col-span-12 lg:col-span-7"
                        >
                            <div className="border-t border-white/15">
                                {principles.map((principle) => (
                                    <div
                                        key={principle.number}
                                        className="group grid grid-cols-12 items-start gap-4 border-b border-white/15 py-7 sm:py-9"
                                    >
                                        <span className="col-span-1 pt-1 text-[11px] tracking-[0.12em] text-[#2F7BFF]">
                                            {principle.number}
                                        </span>

                                        <div className="col-span-9">
                                            <h3 className="text-[24px] tracking-[-0.035em] transition-colors duration-300 group-hover:text-[#2F7BFF] sm:text-[30px]">
                                                {principle.title}
                                            </h3>

                                            <p className="mt-3 max-w-[480px] text-[14px] leading-[1.85] text-white/55 sm:text-[15px]">
                                                {principle.text}
                                            </p>
                                        </div>

                                        <span className="col-span-2 text-right text-[25px] text-[#2F7BFF]/65 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                            {principle.symbol}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* =====================================================
                05 — MISSION & VISION
            ===================================================== */}

            <section
                className={`${pageGutter} relative overflow-hidden bg-[#2F7BFF] py-20 sm:py-24 lg:py-32`}
            >
                <div className="pointer-events-none absolute -right-20 -top-24 h-[360px] w-[360px] rounded-full border border-white/15" />
                <div className="pointer-events-none absolute -right-8 -top-12 h-[240px] w-[240px] rounded-full border border-white/15" />

                <div className="relative mx-auto max-w-[1600px]">
                    <Reveal>
                        <SectionLabel number="05" light>
                            OUR MISSION &amp; VISION
                        </SectionLabel>
                    </Reveal>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5">
                        <Reveal delay={70}>
                            <div className="relative flex min-h-[300px] flex-col justify-between overflow-hidden bg-[#080D16] p-7 sm:min-h-[360px] sm:p-10 lg:p-14">
                                <span className="text-[10px] tracking-[0.18em] text-[#2F7BFF]">
                                    OUR MISSION
                                </span>

                                <h2 className="mt-16 max-w-[570px] text-[clamp(28px,4vw,49px)] leading-[1.08] tracking-[-0.045em]">
                                    To make technology, knowledge and
                                    opportunities more accessible, useful and
                                    impactful.
                                </h2>

                                <span className="absolute right-7 top-5 text-[65px] leading-none text-white/[0.045] sm:right-10 sm:text-[90px]">
                                    01
                                </span>
                            </div>
                        </Reveal>

                        <Reveal delay={140}>
                            <div className="relative flex min-h-[300px] flex-col justify-between overflow-hidden border border-white/30 bg-[#2466D9] p-7 sm:min-h-[360px] sm:p-10 lg:p-14">
                                <span className="text-[10px] tracking-[0.18em] text-white/80">
                                    OUR VISION
                                </span>

                                <h2 className="relative mt-16 max-w-[570px] text-[clamp(28px,4vw,49px)] leading-[1.08] tracking-[-0.045em]">
                                    A future where people and businesses have
                                    the clarity and capability to move forward.
                                </h2>

                                <span className="absolute right-7 top-5 text-[65px] leading-none text-white/[0.10] sm:right-10 sm:text-[90px]">
                                    02
                                </span>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* =====================================================
                06 — CLOSING
            ===================================================== */}

            <section
                className={`${pageGutter} relative overflow-hidden py-24 sm:py-28 lg:py-40`}
            >
                <div className="pointer-events-none absolute right-[-5%] top-10 h-[300px] w-[300px] rounded-full bg-[#2F7BFF]/[0.07] blur-[110px]" />

                <div className="relative mx-auto max-w-[1600px]">
                    <Reveal>
                        <SectionLabel number="06">
                            LET'S MOVE FORWARD
                        </SectionLabel>

                        <h2 className="max-w-[1150px] text-[clamp(43px,7.4vw,100px)] leading-[0.94] tracking-[-0.065em]">
                            Build something useful.
                            <br />
                            <span className="text-[#2F7BFF]">
                                Make progress possible.
                            </span>
                        </h2>
                    </Reveal>

                    <Reveal delay={120}>
                        <div className="mt-12 flex flex-col justify-between gap-9 border-t border-white/15 pt-8 sm:mt-16 lg:mt-20 lg:flex-row lg:items-end">
                            <p className="max-w-[530px] text-[15px] leading-[1.9] text-white/60 sm:text-[17px]">
                                Whether you're building a digital solution,
                                developing new skills or looking for your next
                                opportunity, let's find a way forward.
                            </p>

                            <Link
                                href="/contact"
                                className="group inline-flex min-h-[54px] w-full items-center justify-between gap-12 border border-[#2F7BFF] bg-[#2F7BFF] px-6 text-[13px] text-white transition-colors duration-300 hover:bg-transparent sm:w-fit sm:min-w-[230px]"
                            >
                                Let's talk

                                <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                    ↗
                                </span>
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            <Footer />

            {/* =====================================================
                PAGE STYLES
            ===================================================== */}

            <style jsx global>{`
                html {
                    scroll-behavior: smooth;
                    background: #05070b;
                }

                body {
                    overflow-x: clip;
                }

                .about-page {
                    width: 100%;
                    max-width: 100%;
                    overflow-x: clip;
                    background: #05070b;
                    -webkit-font-smoothing: antialiased;
                    text-rendering: optimizeLegibility;
                }

                .about-page *,
                .about-page *::before,
                .about-page *::after {
                    box-sizing: border-box;
                }

                .about-page img {
                    display: block;
                    max-width: 100%;
                }

                .about-page section[id] {
                    scroll-margin-top: 90px;
                }

                @media (max-width: 768px) {
                    .about-page section[id] {
                        scroll-margin-top: 70px;
                    }
                }

                @media (max-width: 640px) {
                    .about-page section[id] {
                        scroll-margin-top: 60px;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    html {
                        scroll-behavior: auto;
                    }

                    .about-page *,
                    .about-page *::before,
                    .about-page *::after {
                        scroll-behavior: auto !important;
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            `}</style>
        </main>
    );
}
