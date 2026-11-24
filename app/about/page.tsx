// app/about/page.tsx
"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

import Navbar from "@/app/components/consultant/Navbar";
import Footer from "@/app/components/consultant/Footer";

/* =========================================================
   REVEAL ANIMATION
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

        if (reducedMotion) {
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
            className={`${className} transition-[opacity,transform] duration-700 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0"
                }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

/* =========================================================
   CHECKER PATTERN
========================================================= */

function CheckerPattern({ className = "" }: { className?: string }) {
    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none ${className}`}
            style={{
                backgroundImage: `
          linear-gradient(45deg, #2F7BFF 25%, transparent 25%),
          linear-gradient(-45deg, #2F7BFF 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, #2F7BFF 75%),
          linear-gradient(-45deg, transparent 75%, #2F7BFF 75%)
        `,
                backgroundSize: "18px 18px",
                backgroundPosition: "0 0, 0 9px, 9px -9px, -9px 0px",
            }}
        />
    );
}

/* =========================================================
   SECTION LABEL
========================================================= */

function SectionLabel({
    number,
    children,
}: {
    number: string;
    children: ReactNode;
}) {
    return (
        <div className="mb-9 flex items-center gap-4 sm:mb-12 lg:mb-14">
            <span className="text-[14px] font-medium tracking-[0.14em] text-[#2F7BFF]">
                {number}
            </span>

            <span className="h-px w-9 bg-[#2F7BFF]/70" />

            <span className="text-[14px] font-medium tracking-[0.13em] text-white">
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
   DATA
========================================================= */

const divisions = [
    {
        number: "01",
        name: "Technology",
        title: "Digital ideas, built to work.",
        description:
            "We design and develop websites, applications and software experiences that help businesses move forward with clarity and confidence.",
        href: "/services/technology",
    },
    {
        number: "02",
        name: "Training",
        title: "Skills that move beyond theory.",
        description:
            "Practical learning experiences designed around real tools, real projects and the skills people need to grow.",
        href: "/services/training",
    },
    {
        number: "03",
        name: "Careers",
        title: "Turning potential into progress.",
        description:
            "We help people navigate opportunities, build confidence and take meaningful steps towards their professional goals.",
        href: "/services/careers",
    },
];

const portfolio = [
    {
        number: "01",
        category: "Digital experiences",
        title: "Websites with a purpose.",
        description:
            "Thoughtful digital platforms designed around people, businesses and their goals.",
        image: "/website-development-poster.jpg",
        size: "md:col-span-7",
        imageClass: "aspect-[16/9] md:aspect-[1.6/1]",
    },
    {
        number: "02",
        category: "Application development",
        title: "Useful things, made digital.",
        description:
            "Mobile and web applications that simplify everyday interactions.",
        image: "/app-development-poster.jpg",
        size: "md:col-span-5",
        imageClass: "aspect-[16/9] md:aspect-[1.6/1]",
    },
    {
        number: "03",
        category: "Custom software",
        title: "Systems that fit the work.",
        description:
            "Purpose-built tools and connected systems for specific business needs.",
        image: "/software-development-poster.jpg",
        size: "md:col-span-4",
        imageClass: "aspect-[5/4]",
    },
    {
        number: "04",
        category: "Learning & development",
        title: "Learning by doing.",
        description:
            "Hands-on training, collaborative projects and technology-led learning.",
        image:
            "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85",
        size: "md:col-span-4",
        imageClass: "aspect-[5/4]",
    },
    {
        number: "05",
        category: "Career growth",
        title: "Your next step, in focus.",
        description:
            "Career guidance and opportunity support to make the next move more meaningful.",
        image:
            "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
        size: "md:col-span-4",
        imageClass: "aspect-[5/4]",
    },
];

const principles = [
    {
        number: "01",
        title: "Understand before building.",
        text: "Every solution starts with listening, context and the right questions.",
    },
    {
        number: "02",
        title: "Make complexity clearer.",
        text: "We turn confusing processes into focused, practical and accessible experiences.",
    },
    {
        number: "03",
        title: "Keep progress tangible.",
        text: "We focus on outcomes people can use, experience and build upon.",
    },
];

/* =========================================================
   ABOUT PAGE
========================================================= */

export default function AboutPage() {
    const pageGutter = "px-6 sm:px-10 lg:px-20 2xl:px-28";

    return (
        <main className="font-questrial overflow-hidden bg-[#050505] text-[#F5F7FC]">
            <Navbar />

            {/* =====================================================
          01 — HERO / MANIFESTO
      ===================================================== */}
            <section
                className={`${pageGutter} pb-20 pt-32 sm:pb-24 sm:pt-40 lg:pb-28 lg:pt-48`}
            >
                <div className="mx-auto max-w-[1600px]">
                    <Reveal>
                        <div className="mb-10 flex items-center gap-4 sm:mb-14">
                            <span className="h-2 w-2 rounded-full bg-[#2F7BFF]" />

                            <span className="text-[14px] font-medium tracking-[0.18em] text-white">
                                ABOUT MINDSPACE
                            </span>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-12 items-end gap-12 lg:gap-20 xl:gap-24">
                        <Reveal className="col-span-12 lg:col-span-8">
                            <h1 className="text-[clamp(40px,7.2vw,92px)] font-normal leading-[0.98] tracking-[-0.055em] text-white">
                                Technology, learning
                                <br />
                                &amp; careers.
                                <span className="text-[#2F7BFF]">
                                    {" "}
                                    One MindSpace.
                                </span>
                            </h1>
                        </Reveal>

                        <Reveal delay={120} className="col-span-12 lg:col-span-4 lg:pb-3">
                            <p className="max-w-[500px] text-[17px] leading-[1.85] text-[#E2E8F0] sm:text-[18px]">
                                We bring technology, learning and career development
                                together to make ideas useful, skills meaningful and
                                opportunities easier to move towards.
                            </p>
                        </Reveal>
                    </div>

                    {/* HERO IMAGE GRID */}
                    <Reveal delay={100} className="mt-14 sm:mt-20 lg:mt-24">
                        <div className="grid grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
                            {/* Main hero image */}
                            <div className="group relative col-span-12 overflow-hidden rounded-[3px] md:col-span-7">
                                <div className="relative aspect-[16/9] max-h-[450px] overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=90"
                                        alt="Team collaborating on a creative project"
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/10" />

                                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9 lg:p-11">
                                        <span className="mb-4 block text-[13px] font-medium tracking-[0.16em] text-white sm:text-[14px]">
                                            ONE TEAM. DIFFERENT POSSIBILITIES.
                                        </span>

                                        <h2 className="max-w-[500px] text-[clamp(24px,4vw,46px)] leading-[1.06] tracking-[-0.035em] text-white">
                                            Different needs.
                                            <br />
                                            One connected approach.
                                        </h2>
                                    </div>

                                    <div className="absolute left-0 top-0 h-[2px] w-0 bg-[#2F7BFF] transition-all duration-700 group-hover:w-full" />
                                </div>
                            </div>

                            {/* Smaller image collection */}
                            <div className="col-span-12 grid grid-cols-3 gap-4 md:col-span-5 md:grid-cols-2 md:grid-rows-2 sm:gap-5 lg:gap-6">
                                <div className="group relative overflow-hidden rounded-[3px]">
                                    <div className="relative aspect-[4/3] h-full min-h-[120px] overflow-hidden">
                                        <img
                                            src="/website-development-poster.jpg"
                                            alt="Website design and development"
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />

                                        <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/5" />

                                        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                                            <span className="text-[12px] font-medium tracking-[0.12em] text-white sm:text-[13px]">
                                                TECHNOLOGY
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="group relative overflow-hidden rounded-[3px]">
                                    <div className="relative aspect-[4/3] h-full min-h-[120px] overflow-hidden">
                                        <img
                                            src="/app-development-poster.jpg"
                                            alt="Digital application development"
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />

                                        <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/5" />

                                        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                                            <span className="text-[12px] font-medium tracking-[0.12em] text-white sm:text-[13px]">
                                                DIGITAL
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="group relative col-span-2 hidden overflow-hidden rounded-[3px] md:block">
                                    <div className="relative h-full min-h-[160px] overflow-hidden">
                                        <img
                                            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=85"
                                            alt="Collaborative learning and professional development"
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />

                                        <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/10" />

                                        <div className="absolute bottom-4 left-4">
                                            <span className="text-[13px] font-medium tracking-[0.12em] text-white">
                                                LEARNING &amp; GROWTH
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={180}>
                        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-6 sm:mt-16 lg:mt-20">
                            <p className="text-[14px] font-medium tracking-[0.12em] text-[#E2E8F0]">
                                TECHNOLOGY / TRAINING / CAREERS
                            </p>

                            <a
                                href="#who-we-are"
                                className="group inline-flex items-center gap-4 text-[15px] font-medium text-white transition-colors hover:text-[#2F7BFF]"
                            >
                                Discover MindSpace
                                <span className="transition-transform group-hover:translate-y-1">
                                    ↓
                                </span>
                            </a>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* BLUE CHECKER BAND */}
            <div className="relative h-[12px] w-full overflow-hidden bg-[#2F7BFF]">
                <CheckerPattern className="absolute inset-0 opacity-25" />
            </div>

            {/* =====================================================
          02 — WHO WE ARE
      ===================================================== */}
            <section
                id="who-we-are"
                className={`${pageGutter} scroll-mt-24 py-24 sm:py-28 lg:py-32`}
            >
                <div className="mx-auto max-w-[1600px]">
                    <div className="grid grid-cols-12 gap-12 lg:gap-20 xl:gap-24">
                        <Reveal className="col-span-12 lg:col-span-4">
                            <SectionLabel number="02">WHO WE ARE</SectionLabel>

                            <h2 className="text-[clamp(34px,5vw,66px)] leading-[1.02] tracking-[-0.045em] text-white">
                                One company.
                                <br />
                                <span className="text-[#2F7BFF]">Three areas</span>
                                <br />
                                of focus.
                            </h2>
                        </Reveal>

                        <Reveal delay={100} className="col-span-12 lg:col-span-8">
                            <div className="flex h-full flex-col justify-between">
                                <p className="max-w-[800px] text-[17px] leading-[1.85] text-[#E2E8F0] sm:text-[18px]">
                                    MindSpace works across interconnected areas that
                                    shape how people and businesses grow. From digital
                                    solutions to skill-building and career direction, each
                                    area has its own purpose — connected by a shared
                                    focus on practical progress.
                                </p>

                                <div className="mt-12 border-t border-white/15 lg:mt-16">
                                    {divisions.map((item) => (
                                        <Link
                                            href={item.href}
                                            key={item.number}
                                            className="group grid grid-cols-12 gap-5 border-b border-white/15 py-7 transition-colors hover:bg-white/[0.025] sm:gap-7 sm:py-9 lg:py-10"
                                        >
                                            <span className="col-span-1 pt-1 text-[14px] font-medium text-[#2F7BFF]">
                                                {item.number}
                                            </span>

                                            <div className="col-span-10 sm:col-span-4">
                                                <h3 className="text-[26px] leading-tight tracking-[-0.025em] text-white transition-colors group-hover:text-[#2F7BFF] sm:text-[30px]">
                                                    {item.name}
                                                </h3>

                                                <p className="mt-3 text-[16px] text-[#E2E8F0]">
                                                    {item.title}
                                                </p>
                                            </div>

                                            <p className="col-span-12 text-[16px] leading-[1.8] text-[#E2E8F0] sm:col-span-6 sm:col-start-6 sm:pr-8">
                                                {item.description}
                                            </p>

                                            <span className="col-span-1 hidden items-center justify-end text-[#2F7BFF] sm:flex">
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
          03 — PORTFOLIO
      ===================================================== */}
            <section
                id="portfolio"
                className={`${pageGutter} scroll-mt-24 bg-[#0A0D12] py-24 sm:py-28 lg:py-32`}
            >
                <div className="mx-auto max-w-[1600px]">
                    <Reveal>
                        <SectionLabel number="03">WHAT WE DO</SectionLabel>
                    </Reveal>

                    <Reveal delay={70}>
                        <div className="mb-12 grid grid-cols-12 items-end gap-12 sm:mb-16 lg:mb-20 lg:gap-20 xl:gap-24">
                            <div className="col-span-12 lg:col-span-8">
                                <h2 className="max-w-[920px] text-[clamp(34px,5.6vw,72px)] leading-[1] tracking-[-0.05em] text-white">
                                    Ideas are only the beginning.
                                    <span className="text-[#2F7BFF]">
                                        {" "}
                                        Here&apos;s where they go.
                                    </span>
                                </h2>
                            </div>

                            <p className="col-span-12 max-w-[480px] text-[16px] leading-[1.85] text-[#E2E8F0] lg:col-span-4 lg:ml-auto">
                                A range of capabilities, connected by a focus on
                                creating useful experiences and real-world outcomes.
                            </p>
                        </div>
                    </Reveal>

                    {/* PORTFOLIO GRID */}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-7">
                        {portfolio.map((item, index) => (
                            <Reveal key={item.number} delay={index * 80} className={item.size}>
                                <article className="group h-full">
                                    <div className="relative overflow-hidden rounded-[3px] border border-white/[0.07] bg-[#111720]">
                                        <div className={`relative ${item.imageClass} overflow-hidden`}>
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                loading="lazy"
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                                            />

                                            <div className="absolute inset-0 bg-black/30 transition-colors duration-500 group-hover:bg-black/10" />

                                            <div className="absolute left-0 top-0 h-[2px] w-0 bg-[#2F7BFF] transition-all duration-700 group-hover:w-full" />

                                            <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
                                                <span className="inline-flex border border-white/25 bg-black/40 px-3 py-1.5 text-[11px] font-medium tracking-[0.12em] text-white backdrop-blur-sm sm:text-[12px]">
                                                    {item.category.toUpperCase()}
                                                </span>
                                            </div>

                                            <span className="absolute right-4 top-4 text-[13px] font-medium text-white/90 sm:right-5 sm:top-5">
                                                {item.number}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-start justify-between gap-5 border-b border-white/10 py-5 sm:py-7">
                                        <div>
                                            <h3 className="text-[24px] leading-tight tracking-[-0.025em] text-white sm:text-[28px]">
                                                {item.title}
                                            </h3>

                                            <p className="mt-3 max-w-[440px] text-[16px] leading-[1.8] text-[#E2E8F0] sm:text-[17px]">
                                                {item.description}
                                            </p>
                                        </div>

                                        <span className="mt-1 text-[#2F7BFF] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                            ↗
                                        </span>
                                    </div>
                                </article>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal delay={200}>
                        <div className="mt-12 flex items-center justify-between gap-6 sm:mt-16 lg:mt-20">
                            <span className="text-[13px] font-medium tracking-[0.12em] text-[#E2E8F0]">
                                OUR CAPABILITIES
                            </span>

                            <Link
                                href="/services"
                                className="group inline-flex items-center gap-4 text-[15px] font-medium text-white transition-colors hover:text-[#2F7BFF]"
                            >
                                Explore our services
                                <ArrowIcon />
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* =====================================================
          04 — WHAT CONNECTS US
      ===================================================== */}
            <section className={`${pageGutter} py-24 sm:py-28 lg:py-32`}>
                <div className="mx-auto max-w-[1600px]">
                    <div className="grid grid-cols-12 gap-12 lg:gap-20 xl:gap-24">
                        <Reveal className="col-span-12 lg:col-span-5">
                            <SectionLabel number="04">WHAT CONNECTS US</SectionLabel>

                            <h2 className="text-[clamp(34px,5vw,66px)] leading-[1.02] tracking-[-0.045em] text-white">
                                Different services.
                                <br />
                                <span className="text-[#2F7BFF]">One way of thinking.</span>
                            </h2>
                        </Reveal>

                        <Reveal delay={100} className="col-span-12 lg:col-span-7">
                            <p className="max-w-[800px] text-[17px] leading-[1.85] text-[#E2E8F0] sm:text-[18px]">
                                Technology, training and careers may look like
                                different paths, but they share the same foundation.
                                We believe the best work starts with understanding
                                what people need and making the next step easier to
                                see, achieve and sustain.
                            </p>

                            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:mt-16 lg:gap-7">
                                {principles.map((principle) => (
                                    <div
                                        key={principle.number}
                                        className="group relative min-h-[190px] border border-white/10 bg-[#0C1017] p-5 transition-colors duration-300 hover:border-[#2F7BFF]/60 sm:p-6 lg:min-h-[210px]"
                                    >
                                        <span className="text-[13px] font-medium tracking-[0.12em] text-[#2F7BFF]">
                                            {principle.number}
                                        </span>

                                        <h3 className="mt-7 text-[20px] leading-tight text-white sm:text-[22px]">
                                            {principle.title}
                                        </h3>

                                        <p className="mt-3 text-[15px] leading-[1.8] text-[#E2E8F0]">
                                            {principle.text}
                                        </p>

                                        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#2F7BFF] transition-all duration-500 group-hover:w-full" />
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* =====================================================
          05 — MISSION / VISION
      ===================================================== */}
            <section className={`${pageGutter} bg-[#2F7BFF] py-20 sm:py-24 lg:py-28`}>
                <div className="mx-auto max-w-[1600px]">
                    <Reveal>
                        <SectionLabel number="05">
                            <span className="text-white">OUR MISSION &amp; VISION</span>
                        </SectionLabel>
                    </Reveal>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-7">
                        <Reveal delay={70}>
                            <div className="flex min-h-[270px] flex-col justify-between bg-[#0A0D12] p-7 sm:min-h-[330px] sm:p-10 lg:p-14">
                                <div className="text-[13px] font-medium tracking-[0.14em] text-[#7EA9FF]">
                                    OUR MISSION
                                </div>

                                <h2 className="mt-12 max-w-[600px] text-[clamp(28px,4vw,48px)] leading-[1.08] tracking-[-0.04em] text-white">
                                    To make technology, knowledge and opportunities
                                    more accessible, useful and impactful.
                                </h2>
                            </div>
                        </Reveal>

                        <Reveal delay={140}>
                            <div className="relative flex min-h-[270px] flex-col justify-between overflow-hidden border border-white/35 bg-[#2365D9] p-7 sm:min-h-[330px] sm:p-10 lg:p-14">
                                <CheckerPattern className="absolute right-0 top-0 h-28 w-28 opacity-15 sm:h-36 sm:w-36" />

                                <div className="relative text-[13px] font-medium tracking-[0.14em] text-white">
                                    OUR VISION
                                </div>

                                <h2 className="relative mt-12 max-w-[600px] text-[clamp(28px,4vw,48px)] leading-[1.08] tracking-[-0.04em] text-white">
                                    A future where people and businesses have the
                                    clarity and capability to move forward.
                                </h2>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* =====================================================
          06 — CLOSING
      ===================================================== */}
            <section
                className={`${pageGutter} relative overflow-hidden py-24 sm:py-28 lg:py-36`}
            >
                <CheckerPattern className="absolute right-0 top-0 h-36 w-36 opacity-[0.09] sm:h-48 sm:w-48 lg:h-56 lg:w-56" />

                <div className="relative mx-auto max-w-[1600px]">
                    <Reveal>
                        <SectionLabel number="06">LET&apos;S MOVE FORWARD</SectionLabel>

                        <h2 className="max-w-[1100px] text-[clamp(40px,7vw,88px)] leading-[0.98] tracking-[-0.055em] text-white">
                            Build something useful.
                            <br />
                            <span className="text-[#2F7BFF]">
                                Make progress possible.
                            </span>
                        </h2>
                    </Reveal>

                    <Reveal delay={120}>
                        <div className="mt-12 flex flex-col justify-between gap-8 border-t border-white/15 pt-8 sm:mt-16 sm:gap-12 lg:mt-20 lg:flex-row lg:items-end">
                            <p className="max-w-[540px] text-[17px] leading-[1.85] text-[#E2E8F0] sm:text-[18px]">
                                Whether you&apos;re building a digital solution,
                                developing new skills or looking for your next
                                opportunity, let&apos;s find a way forward.
                            </p>

                            <Link
                                href="/contact"
                                className="group inline-flex min-h-[54px] items-center justify-between gap-12 border border-[#2F7BFF] bg-[#2F7BFF] px-6 text-[15px] font-medium text-white transition-colors hover:bg-transparent sm:min-w-[230px]"
                            >
                                Let&apos;s talk

                                <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                    ↗
                                </span>
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            <Footer />
        </main>
    );
}