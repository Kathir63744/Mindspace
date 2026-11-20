"use client";

import Link from "next/link";
import { SERVICES } from "./ServicesData";
import { Eyebrow, GradientText, Icon, Reveal } from "./ServicesUi";

export function Catalogue() {
    const techServices = SERVICES.filter((s) => s.pillar === "Technology");

    return (
        <section
            id="services"
            className="relative -mt-39 overflow-hidden bg-[#050505] py-24 text-white lg:py-32"
        >
            <div className="relative mx-auto max-w-[1240px] px-6">
                <Reveal className="text-center">
                    <Eyebrow>Technology Services</Eyebrow>
                    <h2 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2rem,4.6vw,3.8rem)] leading-[1.05] tracking-[-0.05em]">
                        Pick the stack that fits{" "}
                        <GradientText>what you need to ship.</GradientText>
                    </h2>
                    <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.8] text-[#A9BCD9]">
                        Four ways we build software, each with the frameworks,
                        infrastructure and deliverables that come with it.
                    </p>
                </Reveal>

                <div className="mt-14 grid gap-6 lg:grid-cols-2">
                    {techServices.map((s) => {
                        const stack = s.stack ?? [];
                        const deliverables = s.deliverables ?? s.gets;

                        return (
                            <Link
                                key={s.title}
                                href={s.href}
                                className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0B0F17] to-[#050505] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#2F7BFF]/70 hover:shadow-[0_30px_70px_-24px_rgba(47,123,255,0.55)] sm:p-8"
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between gap-4">
                                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[#2F7BFF]/40 bg-[#2F7BFF]/10 text-[#7CC4FF] transition-colors duration-300 group-hover:bg-[#2F7BFF] group-hover:text-white">
                                        <Icon name={s.icon} className="h-6 w-6" />
                                    </span>
                                    <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#9CCBFF]">
                                        Technology
                                    </span>
                                </div>

                                {/* Title + need */}
                                <h3 className="mt-6 font-display text-[clamp(1.35rem,2.2vw,1.6rem)] leading-[1.15] tracking-[-0.035em] text-white">
                                    {s.title}
                                </h3>
                                <p className="mt-1 text-[13px] text-[#7CC4FF]">
                                    {s.need}.
                                </p>

                                {/* Detailed explanation */}
                                {s.explain && (
                                    <p className="mt-4 text-[14px] leading-[1.8] text-[#A9BCD9]">
                                        {s.explain}
                                    </p>
                                )}

                                {/* Tech stack */}
                                {stack.length > 0 && (
                                    <div className="mt-6">
                                        <p className="text-[10px] uppercase tracking-[0.22em] text-[#8A96A8]">
                                            Tech stack
                                        </p>
                                        <ul className="mt-3 flex flex-wrap gap-2">
                                            {stack.map((t) => (
                                                <li
                                                    key={t}
                                                    className="rounded-full border border-[#2F7BFF]/30 bg-[#2F7BFF]/10 px-3 py-1 text-[11.5px] text-[#9CCBFF]"
                                                >
                                                    {t}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Deliverables */}
                                <div className="mt-6 border-t border-white/10 pt-5">
                                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#8A96A8]">
                                        What you get
                                    </p>
                                    <ul className="mt-3 space-y-2">
                                        {deliverables.map((g) => (
                                            <li
                                                key={g}
                                                className="flex items-start gap-2.5 text-[13.5px] leading-snug text-[#DCE9FF]"
                                            >
                                                <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#2F7BFF]/30 text-[#9CD3FF]">
                                                    <Icon
                                                        name="check"
                                                        className="h-2.5 w-2.5"
                                                    />
                                                </span>
                                                {g}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Footer link */}
                                <span className="mt-7 inline-flex items-center gap-2 text-[13px] text-[#7CC4FF] transition-colors group-hover:text-white">
                                    View full details
                                    <Icon
                                        name="arrow"
                                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                                    />
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}