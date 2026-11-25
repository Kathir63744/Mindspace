"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";

import { siteConfig } from "./data";
import { getPageAccentTheme } from "./PageAccent";

const FOOTER_LINKS = [
    {
        number: "01",
        title: "Technology Solutions",
        description: "Digital solutions for business.",
        links: [
            {
                label: "Website Development",
                href: "/services/website-development",
            },
            {
                label: "Mobile Apps",
                href: "/services/app-development",
            },
            {
                label: "Custom Software",
                href: "/services/software-development",
            },
            {
                label: "All Tech Services",
                href: "/services",
            },
        ],
    },
    {
        number: "02",
        title: "Professional Training",
        description: "Skills and career development.",
        links: [
            {
                label: "Built-in Courses",
                href: "/training/courses",
            },
            {
                label: "Ready-made Products",
                href: "/training/products",
            },
            {
                label: "Web Development",
                href: "/training/web-development",
            },
            {
                label: "Data & AI Basics",
                href: "/training/data-ai",
            },
            {
                label: "All Training",
                href: "/training",
            },
        ],
    },
    {
        number: "03",
        title: "Jobs & Career Support",
        description: "Placement and career direction.",
        links: [
            {
                label: "Career Direction",
                href: "/careers/career-direction",
            },
            {
                label: "Interview Coaching",
                href: "/careers/interview-coaching",
            },
            {
                label: "Placement Support",
                href: "/careers/placement-support",
            },
            {
                label: "All Careers",
                href: "/careers",
            },
        ],
    },
    {
        number: "04",
        title: "Company",
        description: "Get to know MindSpace.",
        links: [
            {
                label: "About",
                href: "/about",
            },
            {
                label: "Contact",
                href: "/contact",
            },
        ],
    },
];

const LEGAL_LINKS = [
    {
        label: "Privacy Policy",
        href: "/privacy",
    },
    {
        label: "Terms of Service",
        href: "/terms",
    },
    {
        label: "Cookie Policy",
        href: "/cookies",
    },
];

 export default function Footer() {
    const pathname = require("next/navigation").usePathname() as string;

    const { accent, accentRgb } = getPageAccentTheme(pathname);

    const accentStyle = {
        "--page-accent": accent,
        "--page-accent-rgb": accentRgb,
    } as CSSProperties;

    const [year, setYear] = useState<number | null>(null);

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    const phoneHref = `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`;

    return (
        <footer
            className="relative isolate overflow-hidden bg-[#080B12] text-[#F5F7FB] font-questrial"
            style={accentStyle}
        >
            {/* AMBIENT BACKGROUND LIGHTING */}

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-48 -top-48 h-[520px] w-[520px] rounded-full blur-[150px]"
                style={{
                    backgroundColor: `rgba(${accentRgb},0.09)`,
                }}
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-60 right-[-8%] h-[480px] w-[480px] rounded-full blur-[140px]"
                style={{
                    backgroundColor: `rgba(${accentRgb},0.06)`,
                }}
            />

            <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
                {/* =================================================
                    MAIN CLOSING STATEMENT
                ================================================= */}

                <div className="grid gap-10 border-b border-white/15 py-16 sm:py-20 lg:grid-cols-12 lg:items-end lg:gap-12 lg:py-24">
                    <div className="lg:col-span-7">
                        <div className="mb-7 flex items-center gap-3">
                            <span className="relative flex h-2 w-2">
                                <span
                                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-40"
                                    style={{
                                        backgroundColor: accent,
                                    }}
                                />

                                <span
                                    className="relative inline-flex h-2 w-2 rounded-full"
                                    style={{
                                        backgroundColor: accent,
                                    }}
                                />
                            </span>

                            <span
                                className="text-[11px] font-semibold uppercase tracking-[0.22em]"
                                style={{
                                    color: `rgba(${accentRgb},0.9)`,
                                }}
                            >
                                The next step starts here
                            </span>
                        </div>

                        <h2 className="max-w-[800px] text-[clamp(38px,6.4vw,72px)] font-[600] leading-[0.94] tracking-[-0.055em] text-[#F5F7FB] max-sm:text-[clamp(36px,11vw,58px)]">
                            Make your next
                            <br />
                            move with
                            <span style={{ color: accent }}>
                                {" "}MindSpace.
                            </span>
                        </h2>
                    </div>

                    <div className="lg:col-span-5 lg:justify-self-end lg:pb-2">
                        <p className="max-w-[390px] text-[clamp(15px,1.15vw,16px)] leading-[1.9] text-[#C2CDDC]">
                            From digital solutions and professional training
                            to career support, find the right direction with
                            MindSpace.
                        </p>

                        <Link
                            href={`mailto:${siteConfig.email}`}
                            className="group mt-7 inline-flex items-center gap-4 rounded-full px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-1"
                            style={{
                                backgroundColor: accent,
                                boxShadow: `0 12px 30px rgba(${accentRgb},0.2)`,
                            }}
                        >
                            Start a conversation

                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                                ↗
                            </span>
                        </Link>
                    </div>
                </div>

                {/* =================================================
                    NAVIGATION DIRECTORY
                ================================================= */}

                <div className="grid gap-12 border-b border-white/15 py-14 lg:grid-cols-12 lg:gap-12 lg:py-16">
                    {/* BRAND COLUMN */}

                    <div className="lg:col-span-3">
                        <Link
                            href="/"
                            className="inline-flex items-center text-[clamp(30px,3vw,34px)] font-semibold tracking-[-0.065em] text-white transition-opacity hover:opacity-80"
                        >
                            {siteConfig.name}

                            <span
                                className="ml-1"
                                style={{ color: accent }}
                            >
                                .
                            </span>
                        </Link>

                        <p className="mt-5 max-w-[260px] text-[15px] leading-[1.9] text-[#C2CDDC]">
                            Technology for businesses. Training for practical
                            skills. Support for your next career move.
                        </p>

                        <div
                            className="mt-8 border-l-2 pl-4"
                            style={{ borderColor: accent }}
                        >
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                                One connected platform
                            </p>

                            <p className="mt-2 text-[12px] text-[#B7C5D8]">
                                Technology · Training · Careers
                            </p>
                        </div>
                    </div>

                    {/* NAVIGATION COLUMNS */}

                    <nav
                        aria-label="Footer navigation"
                        className="grid grid-cols-2 gap-x-7 gap-y-10 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-4 lg:gap-8"
                    >
                        {FOOTER_LINKS.map((group) => (
                            <div key={group.number}>
                                <div className="mb-6 border-t border-white/20 pt-4">
                                    <span
                                        className="font-mono text-[11px]"
                                        style={{
                                            color: accent,
                                        }}
                                    >
                                        / {group.number}
                                    </span>

                                    <h3 className="mt-3 text-[15px] font-semibold tracking-tight text-[#F5F7FB]">
                                        {group.title}
                                    </h3>

                                    <p className="mt-2 text-[12px] leading-6 text-[#B7C5D8]">
                                        {group.description}
                                    </p>
                                </div>

                                <ul className="space-y-3">
                                    {group.links.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className="group inline-flex items-center gap-2 text-[14px] font-medium leading-7 text-[#D0D9E7] transition-colors duration-300"
                                                onMouseEnter={(event) => {
                                                    event.currentTarget.style.color =
                                                        accent;
                                                }}
                                                onMouseLeave={(event) => {
                                                    event.currentTarget.style.color =
                                                        "";
                                                }}
                                            >
                                                <span>{link.label}</span>

                                                <span
                                                    className="text-[11px] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                                                    style={{
                                                        color: accent,
                                                    }}
                                                >
                                                    ↗
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </div>

                {/* =================================================
                    CONTACT INFORMATION
                ================================================= */}

                <div className="grid gap-8 border-b border-white/15 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:items-center lg:gap-10">
                    <div className="lg:col-span-3">
                        <span
                            className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                            style={{
                                color: `rgba(${accentRgb},0.9)`,
                            }}
                        >
                            Get in touch
                        </span>

                        <h3 className="mt-3 text-[clamp(28px,3vw,36px)] font-[600] leading-[1.08] tracking-[-0.055em] text-white">
                            Let&apos;s talk possibilities.
                        </h3>
                    </div>

                    <div className="grid gap-7 sm:col-span-1 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
                        {/* PHONE */}

                        <a
                            href={phoneHref}
                            className="group border-t border-white/20 pt-5 transition-colors"
                            onMouseEnter={(event) => {
                                event.currentTarget.style.borderColor =
                                    accent;
                            }}
                            onMouseLeave={(event) => {
                                event.currentTarget.style.borderColor = "";
                            }}
                        >
                            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B7C5D8]">
                                Call MindSpace
                            </span>

                            <div className="mt-3 flex items-center justify-between gap-3">
                                <span className="break-words text-[15px] font-semibold text-[#E2EAF5] transition-colors">
                                    {siteConfig.phone}
                                </span>

                                <span
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                    style={{ color: accent }}
                                >
                                    ↗
                                </span>
                            </div>
                        </a>

                        {/* EMAIL */}

                        <a
                            href={`mailto:${siteConfig.email}`}
                            className="group border-t border-white/20 pt-5 transition-colors"
                            onMouseEnter={(event) => {
                                event.currentTarget.style.borderColor =
                                    accent;
                            }}
                            onMouseLeave={(event) => {
                                event.currentTarget.style.borderColor = "";
                            }}
                        >
                            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B7C5D8]">
                                Write to us
                            </span>

                            <div className="mt-3 flex items-center justify-between gap-3">
                                <span className="break-all text-[15px] font-semibold text-[#E2EAF5]">
                                    {siteConfig.email}
                                </span>

                                <span
                                    className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                                    style={{ color: accent }}
                                >
                                    ↗
                                </span>
                            </div>
                        </a>

                        {/* LOCATION */}

                        <div className="border-t border-white/20 pt-5">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B7C5D8]">
                                Our location
                            </span>

                            <p className="mt-3 text-[14px] leading-7 text-[#C2CDDC]">
                                {siteConfig.address}
                            </p>
                        </div>
                    </div>
                </div>

                {/* =================================================
                    BOTTOM SIGNATURE
                ================================================= */}

                <div className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                        <span className="text-[12px] font-semibold tracking-tight text-white">
                            {siteConfig.name}

                            <span style={{ color: accent }}>
                                .
                            </span>
                        </span>

                        <span className="hidden h-4 w-px bg-white/20 sm:block" />

                        <span className="text-[11px] text-[#B7C5D8]">
                            Technology · Training · Careers
                        </span>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:gap-8">
                        <nav aria-label="Legal navigation">
                            <ul className="flex flex-wrap gap-x-5 gap-y-3">
                                {LEGAL_LINKS.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-[12px] font-medium text-[#C2CDDC] transition-colors"
                                            onMouseEnter={(event) => {
                                                event.currentTarget.style.color =
                                                    accent;
                                            }}
                                            onMouseLeave={(event) => {
                                                event.currentTarget.style.color =
                                                    "";
                                            }}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <p className="text-[11px] text-[#B7C5D8]">
                            © {year ?? 2025} {siteConfig.name}. All rights
                            reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}