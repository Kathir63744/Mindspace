"use client";

import { motion, useReducedMotion } from "framer-motion";

type Service = {
    number: string;
    title: string;
    summary: string;
    items: string[];
    symbol: "technology" | "global" | "career";
    href: string;
    linkLabel: string;
};

type MindSpaceEcosystemProps = {
    id?: string;
    eyebrow?: string;
    titleLine1?: string;
    titleAccent?: string;
    description?: string;
    services?: Service[];
    contactHref?: string;
};

const DEFAULT_SERVICES: Service[] = [
    {
        number: "01",
        title: "Technology & Digital Solutions",
        summary:
            "We help businesses turn ideas into reliable digital products, from the first concept to development and launch.",
        items: [
            "Website development",
            "Mobile app development",
            "Custom software development",
            "Digital solutions",
        ],
        symbol: "technology",
        href: "#technology",
        linkLabel: "Explore technology",
    },
    {
        number: "02",
        title: "Global Education",
        summary:
            "We help students navigate international education opportunities and understand the steps involved in studying abroad.",
        items: [
            "Study abroad guidance",
            "Student visa assistance",
            "University application support",
            "Education pathway guidance",
        ],
        symbol: "global",
        href: "#global-education",
        linkLabel: "Explore global education",
    },
    {
        number: "03",
        title: "Skills & Career Development",
        summary:
            "We support learners as they build practical skills, work towards certifications, and prepare for career opportunities.",
        items: [
            "Professional training",
            "Practical skill development",
            "Certification programs",
            "Placement assistance",
        ],
        symbol: "career",
        href: "#careers",
        linkLabel: "Explore career development",
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
            className="group flex min-w-0 flex-col bg-white/[0.012] p-[clamp(22px,2.7vw,38px)] transition-colors duration-300 hover:bg-[#111B2C] max-md:min-h-0"
            initial={reducedMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: EASE }}
        >
            <div className="flex items-start justify-between gap-3.5">
                <span className="text-[9px] font-[650] uppercase tracking-[0.16em] text-[#7E899E]">
                    {service.number} / 03
                </span>
                <span className="grid h-12 w-12 place-items-center rounded-full border border-[#2F7BFF]/35 bg-[#2F7BFF]/[0.08] text-[#A9C7FF]">
                    <div className="h-[25px] w-[25px]">
                        <ServiceSymbol type={service.symbol} />
                    </div>
                </span>
            </div>

            <div className="mt-[42px] max-md:mt-7">
                <h3 className="m-0 max-w-[300px] text-[clamp(22px,2.2vw,29px)] font-[550] leading-[1.15] tracking-[-0.045em] text-[#F3F5FA]">
                    {service.title}
                </h3>
                <p className="mt-[15px] text-[13px] leading-[1.8] text-[#A0A9BA]">
                    {service.summary}
                </p>
            </div>

            <ul className="my-7 grid gap-3 p-0 list-none max-md:grid-cols-2 max-md:max-sm:grid-cols-1">
                {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-base leading-normal text-[#D3D8E2]">
                        <span className="text-[13px] text-[#A9C7FF]" aria-hidden="true">↗</span>
                        {item}
                    </li>
                ))}
            </ul>

            <a
                className="mt-auto flex items-center justify-between gap-4 border-t border-white/[0.13] pt-[17px] text-[11px] font-[650] text-[#F3F5FA] no-underline transition-colors duration-250 hover:text-[#A9C7FF]"
                href={service.href}
            >
                {service.linkLabel}
                <span className="text-[17px] text-[#A9C7FF] transition-transform duration-250 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]" aria-hidden="true">
                    ↗
                </span>
            </a>
        </motion.article>
    );
}

/**
 * MindSpaceEcosystem
 *
 * A clear About / platform overview for a business combining:
 * technology services, international education support, and career development.
 */
export default function MindSpaceEcosystem({
    id = "about",
    eyebrow = "ONE PLATFORM. MORE POSSIBILITIES.",
    titleLine1 = "Technology, education",
    titleAccent = " & careers.",
    description = "MindSpace brings digital services, global education guidance, and career development together in one place. Whether you're building a business, planning to study abroad, or preparing for your next opportunity, we're here to help you take the next step.",
    services = DEFAULT_SERVICES,
    contactHref = "#contact",
}: MindSpaceEcosystemProps) {
    const reducedMotion = useReducedMotion();

    return (
        <section
            className="relative isolate w-full overflow-hidden bg-[#07090F] px-[clamp(20px,6vw,92px)] pt-[clamp(76px,9vw,128px)] pb-12 text-[#F3F5FA] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(ellipse_at_82%_8%,rgba(47,123,255,0.12),transparent_34%)] max-sm:px-[18px] max-sm:pt-[66px] max-sm:pb-[34px]"
            id={id}
            aria-labelledby={`${id}-heading`}
        >
            <div className="relative z-10 mx-auto max-w-[1440px]">

                {/* Header */}
                <div className="mx-autmb-10 mb-4  flex max-w-7xl items-center gap-3 px-6">
                            <span className="h-px w-9 bg-[#2F7BFF]" />
                            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A9C7FF]">
                                MINDSPACE / WHAT WE DO
                            </span>
                            <span className="h-px max-w-24 flex-1 bg-white/10" />
                        </div>

                {/* Intro */}
                <div className="grid grid-cols-1 items-end gap-[clamp(30px,7vw,100px)] py-[clamp(48px,7vw,94px)] md:grid-cols-[minmax(0,1.35fr)_minmax(260px,.65fr)] md:pb-[clamp(48px,6vw,76px)]">
                    <motion.div
                        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.85, ease: EASE }}
                    >
                        <h2 id={`${id}-heading`} className="m-0 max-w-[900px] text-[clamp(48px,7.4vw,108px)] font-medium leading-[0.98] tracking-[-0.075em] text-[#F3F5FA] max-sm:text-[clamp(43px,12vw,66px)]">
                            {titleLine1}
                            <span className="text-[#A9C7FF]">{titleAccent}</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        className="max-w-[430px] pb-2 max-md:max-w-[620px]"
                        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
                    >
                        <span className="text-[9px] font-[650] uppercase tracking-[0.16em] text-[#A9C7FF]">
                            A CONNECTED APPROACH
                        </span>
                        <p className="mt-[17px] text-[15px] leading-[1.85] text-[#A0A9BA] max-sm:text-sm">
                            {description}
                        </p>
                        <a className="group mt-6 inline-flex items-center gap-5 border-b border-[#2F7BFF] pb-[9px] text-xs font-semibold text-[#F3F5FA] no-underline transition-all duration-250 hover:gap-[27px] hover:text-[#A9C7FF]" href={contactHref}>
                            Talk to our team
                            <span className="text-[17px] text-[#A9C7FF]" aria-hidden="true">
                                ↗
                            </span>
                        </a>
                    </motion.div>
                </div>

                {/* Section Label */}
                <div className="flex justify-between gap-[18px] border-t border-white/[0.13] py-[17px] text-[9px] font-[650] uppercase tracking-[0.16em] text-[#8993A6] max-sm:text-[8px] max-sm:tracking-[0.1em]">
                    <span className="text-[#A9C7FF]">OUR SERVICES</span>
                    <span>THREE WAYS WE HELP YOU MOVE FORWARD</span>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 border border-white/[0.13] md:grid-cols-3">
                    {services.map((service, index) => (
                        <div key={`${service.number}-${service.title}`} className={`flex flex-col ${index > 0 ? "border-t border-white/[0.13] md:border-t-0 md:border-l" : ""}`}>
                            <ServiceCard
                                service={service}
                                reducedMotion={Boolean(reducedMotion)}
                            />
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <footer className="flex items-center justify-between gap-5 pt-[26px] max-sm:flex-col max-sm:items-start">
                    <div className="flex items-center gap-3.5">
                        <span className="text-2xl font-[750] tracking-[-0.1em] text-[#A9C7FF]" aria-hidden="true">
                            M.
                        </span>
                        <p className="m-0 text-xs text-[#A0A9BA]">
                            Different goals. One place to get moving.
                        </p>
                    </div>
                    <a href={contactHref} className="inline-flex items-center gap-4 text-[9px] font-[650] uppercase tracking-[0.16em] text-[#F3F5FA] no-underline transition-colors duration-250 hover:text-[#A9C7FF]">
                        Start a conversation
                        <span className="text-[17px] text-[#A9C7FF]" aria-hidden="true">
                            ↗
                        </span>
                    </a>
                </footer>
            </div>
        </section>
    );
}