
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
        themeColor: "rgba(47, 123, 255, 0.15)",
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
        themeColor: "rgba(20, 184, 122, 0.15)",
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
        themeColor: "rgba(168, 85, 247, 0.15)",
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
            className="group relative flex h-full min-w-0 flex-col p-5 transition-colors duration-300 sm:p-7 lg:p-8 xl:p-9"
            initial={reducedMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: EASE }}
        >
            {/* Hover background */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background: `linear-gradient(180deg, ${service.themeColor} 0%, transparent 100%)`,
                }}
            />

            {/* Card header */}
            <div className="relative z-10 flex items-center justify-between gap-3">
                <span className="font-questrial text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D0D8E5] sm:text-[13px]">
                    {service.number} / 03
                </span>

                <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full border text-white transition-colors duration-300 sm:h-14 sm:w-14"
                    style={{
                        borderColor: service.themeColor.replace("0.15", "0.4"),
                        backgroundColor: service.themeColor.replace("0.15", "0.1"),
                    }}
                >
                    <span className="block h-5 w-5 sm:h-7 sm:w-7">
                        <ServiceSymbol type={service.symbol} />
                    </span>
                </span>
            </div>

            {/* Heading and description */}
            <div className="relative z-10 mt-7 sm:mt-9 lg:mt-10">
                <h3 className="m-0 max-w-[340px] font-questrial text-[clamp(23px,5vw,32px)] font-semibold leading-[1.15] tracking-[-0.045em] text-white">
                    {service.title}
                </h3>

                <p className="mt-3 font-questrial text-[14px] leading-[1.75] text-[#E0E8F4] sm:mt-4 sm:text-[15px] sm:leading-[1.8]">
                    {service.summary}
                </p>
            </div>

            {/* Service links */}
            <ul className="relative z-10 my-6 grid list-none gap-x-5 gap-y-3 p-0 sm:my-7">
                {service.items.map((item) => (
                    <li key={item.href} className="min-w-0">
                        <Link
                            href={item.href}
                            className="group/item flex min-w-0 items-start gap-2.5 font-questrial text-[14px] leading-[1.5] text-white transition-colors duration-200 hover:text-[#A9C7FF] sm:text-[15px]"
                        >
                            <span
                                className="mt-[1px] shrink-0 text-[14px] text-[#A9C7FF]"
                                aria-hidden="true"
                            >
                                ↗
                            </span>

                            <span className="min-w-0 break-words">
                                {item.label}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Card footer */}
            <Link
                className="relative z-10 mt-auto flex min-w-0 items-center justify-between gap-3 border-t border-white/[0.13] pt-4 font-questrial text-[11px] font-bold uppercase tracking-[0.08em] text-white no-underline transition-colors duration-250 hover:text-[#A9C7FF] sm:pt-[17px] sm:text-[13px] sm:tracking-[0.1em]"
                href={service.href}
            >
                <span className="min-w-0">{service.linkLabel}</span>

                <span
                    className="shrink-0 text-[18px] text-[#A9C7FF] transition-transform duration-250 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
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
            id={id}
            aria-labelledby={`${id}-heading`}
            className="relative isolate w-full overflow-hidden bg-[#07090F] px-5 pb-10 pt-[68px] font-questrial text-[#F3F5FA] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(ellipse_at_82%_8%,rgba(47,123,255,0.12),transparent_34%)] sm:px-7 sm:pb-12 sm:pt-20 md:px-9 md:pt-24 lg:px-[clamp(40px,6vw,92px)] lg:pt-[clamp(76px,9vw,128px)]"
        >
            <div className="relative z-10 mx-auto max-w-[1440px]">

                {/* Top eyebrow */}
                <motion.div
                    className="mb-8 flex flex-col items-start gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between sm:gap-5 lg:mb-[clamp(24px,3.4vw,44px)]"
                    initial={reducedMotion ? false : "hidden"}
                    whileInView={reducedMotion ? undefined : "show"}
                    viewport={{ once: true }}
                >
                    <div className="flex max-w-full items-center gap-2.5 sm:gap-3">
                        <span className="h-px w-7 shrink-0 bg-[#2F7BFF] sm:w-8" />

                        <span className="font-questrial text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A9C7FF] sm:text-[12px] sm:tracking-[0.24em]">
                            MINDSPACE / WHAT WE DO
                        </span>

                        <span className="h-px max-w-20 flex-1 bg-white/10" />
                    </div>

                    <motion.span
                        className="max-w-full font-questrial text-[11px] font-medium uppercase leading-relaxed tracking-[0.08em] text-white/90 sm:text-right sm:text-[12px] md:text-[13px]"
                        variants={{
                            hidden: { opacity: 0, y: 24 },
                            show: { opacity: 1, y: 0 },
                        }}
                    >
                        {eyebrow}
                    </motion.span>
                </motion.div>

                {/* Hero heading and description */}
                <motion.div
                    className="mb-9 grid grid-cols-1 items-start gap-6 sm:mb-11 sm:gap-8 md:mb-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,.75fr)] lg:items-end lg:gap-[clamp(24px,4vw,72px)]"
                    variants={{
                        hidden: {},
                        show: {
                            transition: {
                                staggerChildren: 0.09,
                                delayChildren: 0.06,
                            },
                        },
                    }}
                    initial={reducedMotion ? false : "hidden"}
                    whileInView={reducedMotion ? undefined : "show"}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <h2
                        id={`${id}-heading`}
                        className="m-0 w-full font-questrial text-[clamp(36px,9vw,58px)] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[clamp(46px,7vw,68px)] lg:text-[clamp(48px,6.4vw,72px)]"
                    >
                        <span className="block overflow-hidden pb-[0.12em]">
                            <motion.span
                                className="inline-block text-white"
                                variants={{
                                    hidden: { opacity: 0, y: 24 },
                                    show: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            duration: 0.7,
                                            ease: EASE,
                                        },
                                    },
                                }}
                            >
                                {titleLine1.trim()}
                            </motion.span>
                        </span>

                        <span className="block overflow-hidden pb-[0.12em]">
                            <motion.span
                                className="inline-block font-medium italic text-[#80ADFF]"
                                variants={{
                                    hidden: { opacity: 0, y: 24 },
                                    show: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            duration: 0.7,
                                            ease: EASE,
                                        },
                                    },
                                }}
                            >
                                {titleAccent.trim()}
                            </motion.span>
                        </span>
                    </h2>

                    <motion.div
                        className="w-full max-w-[620px] pb-1 lg:max-w-[720px] lg:justify-self-end lg:pb-2"
                        variants={{
                            hidden: { opacity: 0, y: 24 },
                            show: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                    duration: 0.7,
                                    ease: EASE,
                                },
                            },
                        }}
                    >
                        <span className="font-questrial text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A9C7FF] sm:text-[12px] sm:tracking-[0.18em]">
                            A CONNECTED APPROACH
                        </span>

                        <p className="mt-3 font-questrial text-[15px] leading-[1.8] text-white/90 sm:mt-[17px] sm:text-[16px] md:text-[17px] lg:text-[clamp(16px,1.3vw,19px)] lg:leading-[1.85]">
                            {description}
                        </p>

                        <a
                            className="group mt-5 inline-flex min-h-11 items-center gap-3 border-b border-[#2F7BFF] pb-1.5 font-questrial text-[14px] font-semibold tracking-[0.04em] text-white no-underline transition-all duration-300 hover:gap-4 hover:text-[#A9C7FF] sm:text-[15px]"
                            href={contactHref}
                        >
                            Talk to our team

                            <span
                                className="text-base text-[#80ADFF]"
                                aria-hidden="true"
                            >
                                ↗
                            </span>
                        </a>
                    </motion.div>
                </motion.div>

                {/* Section divider */}
                <div className="flex items-center justify-between gap-3 border-t border-white/[0.13] py-4 font-questrial text-[10px] font-semibold uppercase tracking-[0.1em] text-[#C2D0E2] sm:gap-5 sm:py-[17px] sm:text-[12px] sm:tracking-[0.14em] md:text-[13px] md:tracking-[0.16em]">
                    <span className="shrink-0 text-[#A9C7FF]">
                        OUR SERVICES
                    </span>

                    <span className="text-right">
                        Three Services. One MindSpace.
                    </span>
                </div>

                {/* Responsive service cards */}
                <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-white/[0.13] bg-white/[0.02] backdrop-blur-md md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
                        <div
                            key={`${service.number}-${service.title}`}
                            className={[
                                "flex min-w-0 flex-col",
                                index > 0
                                    ? "border-t border-white/[0.13] md:border-t-0"
                                    : "",
                                index === 1
                                    ? "md:border-l md:border-white/[0.13] lg:border-l-0"
                                    : "",
                                index === 2
                                    ? "md:col-span-2 md:border-l-0 lg:col-span-1 lg:border-l lg:border-white/[0.13]"
                                    : "",
                                index > 1
                                    ? "lg:border-l lg:border-white/[0.13]"
                                    : "",
                            ].join(" ")}
                        >
                            <ServiceCard
                                service={service}
                                reducedMotion={Boolean(reducedMotion)}
                            />
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-7 flex flex-col items-start justify-between gap-4 border-t border-white/[0.13] pt-5 sm:mt-9 sm:flex-row sm:items-center sm:pt-6">
                    <p className="max-w-[620px] font-questrial text-[13px] leading-[1.7] text-[#E0E8F4] sm:text-[14px]">
                        Ready to start? Choose a track above or contact our
                        team for guidance.
                    </p>

                    <Link
                        href="/contact"
                        className="group inline-flex min-h-11 shrink-0 items-center gap-2 font-questrial text-[11px] font-bold uppercase tracking-[0.13em] text-white transition-colors hover:text-[#A9C7FF] sm:text-[13px] sm:tracking-[0.15em]"
                    >
                        Talk to an expert

                        <span className="transition-transform group-hover:translate-x-1">
                            ↗
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
