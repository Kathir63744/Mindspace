// app/components/consultant/MindSpaceEcosystem.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

type Service = {
    number: string;
    title: string;
    summary: string;
    items: { label: string; href: string }[];
    symbol: "technology" | "global" | "career";
    href: string;
    linkLabel: string;
    themeColor: string;
};

const DEFAULT_SERVICES: Service[] = [
    {
        number: "01",
        title: "Technology Solutions",
        summary:
            "We build websites, mobile applications, web applications and custom software around your business requirements.",
        items: [
            { label: "Website Development", href: "/services/website-development" },
            { label: "Mobile App Development", href: "/services/app-development" },
            { label: "Web Application Development", href: "/services/web-application" },
            { label: "Custom Software Development", href: "/services/software-development" },
        ],
        symbol: "technology",
        href: "/services",
        linkLabel: "Explore Technology Solutions",
        themeColor: "rgba(47, 123, 255, 0.15)", // Blue
    },
    {
        number: "02",
        title: "Professional Training",
        summary:
            "Develop practical skills through technical training, hands-on projects, and professional communication programmes.",
        items: [
            { label: "Technical & Programming Training", href: "/training/programming-foundations" },
            { label: "Practical Projects", href: "/training/web-development" },
            { label: "Job Readiness Training", href: "/training/portfolio-certification" },
            { label: "Corporate & Communication Training", href: "/training/communication" },
        ],
        symbol: "global",
        href: "/training",
        linkLabel: "Explore Professional Training",
        themeColor: "rgba(20, 184, 122, 0.15)", // Green
    },
    {
        number: "03",
        title: "Job Placement & Career Support",
        summary:
            "Prepare for your next opportunity with career guidance, resume support, interview preparation and placement assistance.",
        items: [
            { label: "Career Guidance", href: "/careers/career-direction" },
            { label: "Resume & LinkedIn Profile Support", href: "/careers/resume-linkedin" },
            { label: "Interview Preparation", href: "/careers/interview-coaching" },
            { label: "Job Search Support", href: "/careers/placement-support" },
            { label: "Internship Assistance", href: "/careers/internships" },
            { label: "Job Placement Assistance", href: "/careers/on-the-job-readiness" },
        ],
        symbol: "career",
        href: "/careers",
        linkLabel: "Explore Career Support",
        themeColor: "rgba(168, 85, 247, 0.15)", // Purple
    },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function ServiceSymbol({ type }: { type: Service["symbol"] }) {
    const common = {
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.5,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
    };

    if (type === "technology") {
        return (
            <svg viewBox="0 0 48 48" aria-hidden="true" {...common}>
                <rect x="5.5" y="7" width="37" height="27" rx="3" />
                <path d="M17 41h14M24 34v7M18 18l-5 4 5 4M30 18l5 4-5 4M27 16l-6 12" />
            </svg>
        );
    }

    if (type === "global") {
        return (
            <svg viewBox="0 0 48 48" aria-hidden="true" {...common}>
                <circle cx="24" cy="24" r="18" />
                <path d="M6 24h36M24 6c5 5 7 11 7 18s-2 13-7 18c-5-5-7-11-7-18s2-13 7-18Z" />
                <path d="M10 14h28M10 34h28" opacity=".55" />
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 48 48" aria-hidden="true" {...common}>
            <circle cx="18" cy="15" r="7" />
            <path d="M5 40v-4c0-7 5-11 13-11 4 0 7 1 9 3" />
            <path d="m29 29 5 5 9-11M27 41h15" />
        </svg>
    );
}

function ServiceCard({
    service,
    reducedMotion,
}: {
    service: Service;
    reducedMotion: boolean;
}) {
    return (
        <motion.article
            className="group relative flex h-full min-w-0 flex-col p-[clamp(24px,3vw,42px)] transition-colors duration-300"
            initial={reducedMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: EASE }}
        >
            {/* Glass overlay effect that fades in on hover */}
            <div
                className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background: `linear-gradient(180deg, ${service.themeColor} 0%, transparent 100%)`,
                }}
            />

            <div className="relative z-10 flex items-start justify-between gap-3.5">
                <span className="font-questrial text-[13px] font-semibold uppercase tracking-[0.16em] text-[#D0D8E5]">
                    {service.number} / 03
                </span>
                <span
                    className="grid h-14 w-14 place-items-center rounded-full border text-white transition-colors duration-300"
                    style={{
                        borderColor: service.themeColor.replace("0.15", "0.4"),
                        backgroundColor: service.themeColor.replace("0.15", "0.1"),
                    }}
                >
                    <div className="h-[28px] w-[28px]">
                        <ServiceSymbol type={service.symbol} />
                    </div>
                </span>
            </div>

            <div className="relative z-10 mt-[42px] max-md:mt-7">
                <h3 className="m-0 max-w-[300px] font-questrial text-[clamp(24px,2.4vw,32px)] font-semibold leading-[1.15] tracking-[-0.045em] text-white">
                    {service.title}
                </h3>
                <p className="mt-[15px] font-questrial text-[15px] leading-[1.8] text-[#E0E8F4] sm:text-[16px]">
                    {service.summary}
                </p>
            </div>

            <ul className="relative z-10 my-7 grid gap-3 p-0 list-none max-md:grid-cols-2 max-md:max-sm:grid-cols-1">
                {service.items.map((item) => (
                    <li key={item.href}>
                        <Link
                            href={item.href}
                            className="group/item flex items-start gap-2.5 font-questrial text-[15px] leading-normal text-white transition-colors hover:text-[#A9C7FF]"
                        >
                            <span className="text-[14px] text-[#A9C7FF]" aria-hidden="true">
                                ↗
                            </span>
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>

            <Link
                className="relative z-10 mt-auto flex items-center justify-between gap-4 border-t border-white/[0.13] pt-[17px] font-questrial text-[13px] font-bold uppercase tracking-[0.1em] text-white no-underline transition-colors duration-250 hover:text-[#A9C7FF]"
                href={service.href}
            >
                {service.linkLabel}
                <span
                    className="text-[18px] text-[#A9C7FF] transition-transform duration-250 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
                    aria-hidden="true"
                >
                    ↗
                </span>
            </Link>
        </motion.article>
    );
}

export default function MindSpaceEcosystem({
    id = "about",
    eyebrow = "ONE PLATFORM. MORE POSSIBILITIES.",
    titleLine1 = "Technology, Training ",
    titleAccent = " & Career Support",
    description = "Whether you need a digital solution, practical training, or support with your next career move, MindSpace helps you take the next step with a clear plan.",
    services = DEFAULT_SERVICES,
    contactHref = "/contact",
}: {
    id?: string;
    eyebrow?: string;
    titleLine1?: string;
    titleAccent?: string;
    description?: string;
    services?: Service[];
    contactHref?: string;
}) {
    const reducedMotion = useReducedMotion();

    return (
        <section
            className="relative isolate w-full overflow-hidden bg-[#07090F] px-[clamp(20px,6vw,92px)] pt-[clamp(76px,9vw,128px)] pb-12 font-questrial text-[#F3F5FA] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(ellipse_at_82%_8%,rgba(47,123,255,0.12),transparent_34%)] max-sm:px-[18px] max-sm:pt-[66px] max-sm:pb-[34px]"
            id={id}
            aria-labelledby={`${id}-heading`}
        >
            <div className="relative z-10 mx-auto max-w-[1440px]">
                {/* Top eyebrow */}
                <motion.div
                    className="flex justify-between items-center gap-4 mb-[clamp(24px,3.4vw,44px)] max-sm:items-start"
                    initial={reducedMotion ? false : "hidden"}
                    whileInView={reducedMotion ? undefined : "show"}
                    viewport={{ once: true }}
                >
                    <div className="flex max-w-7xl items-center gap-3">
                        <span className="h-px w-8 bg-[#2F7BFF]" />
                        <span className="font-questrial text-[13px] font-semibold uppercase tracking-[0.24em] text-[#A9C7FF]">
                            MINDSPACE / WHAT WE DO
                        </span>
                        <span className="h-px max-w-20 flex-1 bg-white/10" />
                    </div>
                    <motion.span
                        className="font-questrial text-white/90 text-[13px] font-medium tracking-[0.08em] uppercase max-sm:max-w-[120px] max-sm:text-right max-sm:leading-relaxed"
                        variants={{
                            hidden: { opacity: 0, y: 24 },
                            show: { opacity: 1, y: 0 },
                        }}
                    >
                        {eyebrow}
                    </motion.span>
                </motion.div>

                {/* HERO TEXT */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-[minmax(0,1.25fr)_minmax(320px,.75fr)] items-start gap-[clamp(24px,4vw,72px)] mb-[clamp(24px,3.4vw,44px)]"
                    variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
                    }}
                    initial={reducedMotion ? false : "hidden"}
                    whileInView={reducedMotion ? undefined : "show"}
                    viewport={{ once: true, amount: 0.25 }}
                >
                    <h2
                        id={`${id}-heading`}
                        className="m-0 w-full font-questrial text-[clamp(38px,6.4vw,72px)] leading-[0.94] tracking-[-0.055em] font-semibold max-sm:text-[clamp(36px,11vw,58px)]"
                    >
                        <span className="block overflow-hidden pb-[0.10em]">
                            <motion.span
                                className="inline-block text-white"
                                variants={{
                                    hidden: { opacity: 0, y: 24 },
                                    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                                }}
                            >
                                {titleLine1.trim()}
                            </motion.span>
                        </span>
                        <span className="block overflow-hidden pb-[0.10em]">
                            <motion.span
                                className="inline-block text-[#80ADFF] italic font-medium"
                                variants={{
                                    hidden: { opacity: 0, y: 24 },
                                    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                                }}
                            >
                                {titleAccent.trim()}
                            </motion.span>
                        </span>
                    </h2>

                    <motion.div
                        className="max-w-[720px] pb-2 md:justify-self-end"
                        variants={{
                            hidden: { opacity: 0, y: 24 },
                            show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                        }}
                    >
                        <span className="font-questrial text-[13px] font-semibold uppercase tracking-[0.18em] text-[#A9C7FF]">
                            A CONNECTED APPROACH
                        </span>
                        <p className="mt-[17px] font-questrial text-white/90 text-[clamp(16px,1.3vw,19px)] leading-[1.85]">
                            {description}
                        </p>
                        <a
                            className="group mt-5 inline-flex items-center gap-3 pb-1.5 font-questrial text-[15px] font-semibold text-white no-underline border-b border-[#2F7BFF] tracking-[0.04em] transition-all duration-300 hover:gap-4 hover:text-[#A9C7FF]"
                            href={contactHref}
                        >
                            Talk to our team
                            <span className="text-[#80ADFF] text-base" aria-hidden="true">
                                ↗
                            </span>
                        </a>
                    </motion.div>
                </motion.div>

                <div className="flex justify-between gap-[18px] border-t border-white/[0.13] py-[17px] font-questrial text-[13px] font-semibold uppercase tracking-[0.16em] text-[#C2D0E2] max-sm:text-[12px] max-sm:tracking-[0.1em]">
                    <span className="text-[#A9C7FF]">OUR SERVICES</span>
                    <span>Three Services. One MindSpace.</span>
                </div>

                {/* Glassmorphism Cards */}
                <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-white/[0.13] bg-white/[0.02] backdrop-blur-md md:grid-cols-3">
                    {services.map((service, index) => (
                        <div
                            key={`${service.number}-${service.title}`}
                            className={`flex flex-col ${index > 0 ? "border-t border-white/[0.13] md:border-t-0 md:border-l" : ""}`}
                        >
                            <ServiceCard service={service} reducedMotion={Boolean(reducedMotion)} />
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/[0.13] pt-6 sm:flex-row sm:items-center">
                    <p className="font-questrial text-[14px] text-[#E0E8F4]">
                        Ready to start? Choose a track above or contact our team for guidance.
                    </p>
                    <Link
                        href="/contact"
                        className="group inline-flex items-center gap-2 font-questrial text-[13px] font-bold uppercase tracking-[0.15em] text-white hover:text-[#A9C7FF]"
                    >
                        Talk to an expert
                        <span className="transition-transform group-hover:translate-x-1">↗</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}