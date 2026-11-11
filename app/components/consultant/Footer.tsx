"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { footerContent, navItems, siteConfig } from "./data";

const linkCls =
    "group inline-flex items-center gap-2 text-[13px] font-medium leading-6 text-[#C5D0E0] transition-colors duration-300 hover:text-[#7EAEFF]";

const groups = [
    {
        number: "01",
        title: "Technology",
        description: "Digital solutions for business.",
        source: "services",
    },
    {
        number: "02",
        title: "Learning & careers",
        description: "Skills and career development.",
        source: "training",
    },
    {
        number: "03",
        title: "Study abroad",
        description: "International education support.",
        source: "study",
    },
    {
        number: "04",
        title: "Company",
        description: "Get to know MindSpace.",
        source: "company",
    },
] as const;

export default function Footer() {
    // Defer year calculation to client-side only to avoid hydration mismatch
    const [year, setYear] = useState<number | null>(null);

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    const services =
        navItems.find((item) => item.label === "Services")?.children ?? [];

    const training =
        navItems.find(
            (item) => item.label === "Training and careers"
        )?.children ?? [];

    const studyItem = navItems.find((item) =>
        /study|abroad|visa/i.test(item.label)
    );

    const studyLinks = studyItem
        ? studyItem.children?.length
            ? studyItem.children
            : [studyItem]
        : [];

    const navigationData = {
        services,
        training,
        study: studyLinks,
        company: footerContent.company,
    };

    const phoneHref = `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`;

    return (
        <footer className="relative isolate overflow-hidden bg-[#080B12] text-[#F5F7FB]">

            {/* Ambient background lighting */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-48 -top-48 h-[520px] w-[520px] rounded-full bg-[#2F7BFF]/[0.07] blur-[150px]"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-60 right-[-8%] h-[480px] w-[480px] rounded-full bg-[#2F7BFF]/[0.045] blur-[140px]"
            />

            <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">

                {/* Main closing statement */}
                <div className="grid gap-10 border-b border-white/10 py-16 sm:py-20 lg:grid-cols-12 lg:items-end lg:gap-12 lg:py-24">

                    <div className="lg:col-span-7">
                        <div className="mb-7 flex items-center gap-3">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2F7BFF] opacity-40" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2F7BFF]" />
                            </span>

                            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#A9C7FF]">
                                The next step starts here
                            </span>
                        </div>

                        <h2 className="max-w-[800px] text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.94] tracking-[-0.075em] text-[#F5F7FB]">
                            Make your next
                            <br />
                            move with
                            <span className="text-[#2F7BFF]"> MindSpace.</span>
                        </h2>
                    </div>

                    <div className="lg:col-span-5 lg:justify-self-end lg:pb-2">
                        <p className="max-w-[390px] text-[14px] leading-[1.9] text-[#A2AAB8] sm:text-[15px]">
                            From digital solutions and professional training
                            to international education and career
                            opportunities, find the right direction with
                            MindSpace.
                        </p>

                        <Link
                            href={`mailto:${siteConfig.email}`}
                            className="group mt-7 inline-flex items-center gap-4 rounded-full bg-[#2F7BFF] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#1E65E5] hover:shadow-[0_12px_30px_rgba(47,123,255,0.2)]"
                        >
                            Start a conversation

                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                                ↗
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Navigation and brand directory */}
                <div className="grid gap-12 border-b border-white/10 py-14 lg:grid-cols-12 lg:gap-12 lg:py-16">

                    {/* Brand column */}
                    <div className="lg:col-span-3">
                        <Link
                            href="/"
                            className="inline-flex items-center text-[34px] font-bold tracking-[-0.07em] text-white transition-opacity hover:opacity-80"
                        >
                            {siteConfig.name}
                            <span className="ml-1 text-[#2F7BFF]">.</span>
                        </Link>

                        <p className="mt-5 max-w-[260px] text-[13px] leading-7 text-[#A2AAB8]">
                            Technology for businesses. Learning for growth.
                            Global opportunities for what&apos;s next.
                        </p>

                        <div className="mt-8 border-l-2 border-[#2F7BFF] pl-4">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                                One connected platform
                            </p>

                            <p className="mt-2 text-[11px] text-[#929EAF]">
                                Technology · Education · Careers
                            </p>
                        </div>
                    </div>

                    {/* Navigation columns */}
                    <nav
                        aria-label="Footer navigation"
                        className="grid grid-cols-2 gap-x-7 gap-y-10 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-4 lg:gap-8"
                    >
                        {groups.map((group) => {
                            const links = navigationData[group.source];

                            const validLinks = links.filter(
                                (link): link is typeof link & { href: string } =>
                                    typeof link.href === "string" &&
                                    link.href.trim().length > 0
                            );

                            if (!validLinks.length) return null;

                            return (
                                <div key={group.number}>
                                    <div className="mb-6 border-t border-white/15 pt-4">
                                        <span className="font-mono text-[10px] text-[#2F7BFF]">
                                            / {group.number}
                                        </span>

                                        <h3 className="mt-3 text-[14px] font-bold tracking-tight text-[#F5F7FB]">
                                            {group.title}
                                        </h3>

                                        <p className="mt-2 text-[11px] leading-5 text-[#929EAF]">
                                            {group.description}
                                        </p>
                                    </div>

                                    <ul className="space-y-3">
                                        {validLinks.map((link) => (
                                            <li key={link.href}>
                                                <Link
                                                    href={link.href}
                                                    className={linkCls}
                                                >
                                                    <span>{link.label}</span>

                                                    <span className="text-[10px] text-[#2F7BFF] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
                                                        ↗
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </nav>
                </div>

                {/* Contact information */}
                <div className="grid gap-8 border-b border-white/10 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:items-center lg:gap-10">

                    <div className="lg:col-span-3">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A9C7FF]">
                            Get in touch
                        </span>

                        <h3 className="mt-3 text-[clamp(1.7rem,3vw,2.2rem)] font-semibold leading-tight tracking-[-0.055em] text-white">
                            Let&apos;s talk possibilities.
                        </h3>
                    </div>

                    <div className="grid gap-7 sm:col-span-1 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-3">

                        {/* Phone */}
                        <a
                            href={phoneHref}
                            className="group border-t border-white/15 pt-5 transition-colors hover:border-[#2F7BFF]"
                        >
                            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#929EAF]">
                                Call MindSpace
                            </span>

                            <div className="mt-3 flex items-center justify-between gap-3">
                                <span className="break-words text-[14px] font-semibold text-[#D5DEEC] transition-colors group-hover:text-[#A9C7FF]">
                                    {siteConfig.phone}
                                </span>

                                <span className="text-[#2F7BFF] transition-transform duration-300 group-hover:translate-x-1">
                                    ↗
                                </span>
                            </div>
                        </a>

                        {/* Email */}
                        <a
                            href={`mailto:${siteConfig.email}`}
                            className="group border-t border-white/15 pt-5 transition-colors hover:border-[#2F7BFF]"
                        >
                            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#929EAF]">
                                Write to us
                            </span>

                            <div className="mt-3 flex items-center justify-between gap-3">
                                <span className="break-all text-[14px] font-semibold text-[#D5DEEC] transition-colors group-hover:text-[#A9C7FF]">
                                    {siteConfig.email}
                                </span>

                                <span className="shrink-0 text-[#2F7BFF] transition-transform duration-300 group-hover:translate-x-1">
                                    ↗
                                </span>
                            </div>
                        </a>

                        {/* Location */}
                        <div className="border-t border-white/15 pt-5">
                            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#929EAF]">
                                Our location
                            </span>

                            <p className="mt-3 text-[13px] leading-6 text-[#B6C1D1]">
                                {siteConfig.address}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom signature */}
                <div className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                        <span className="text-[11px] font-bold tracking-tight text-white">
                            {siteConfig.name}
                            <span className="text-[#2F7BFF]">.</span>
                        </span>

                        <span className="hidden h-4 w-px bg-white/15 sm:block" />

                        <span className="text-[10px] text-[#929EAF]">
                            Technology · Learning · Global opportunities
                        </span>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:gap-8">

                        <nav aria-label="Legal navigation">
                            <ul className="flex flex-wrap gap-x-5 gap-y-3">
                                {footerContent.legal.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-[11px] font-medium text-[#B6C1D1] transition-colors hover:text-[#7EAEFF]"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <p className="text-[10px] text-[#929EAF]">
                            © {year ?? 2025} {siteConfig.name}. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}