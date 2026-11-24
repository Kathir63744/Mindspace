// app/components/consultant/services/ServicesSections.tsx
"use client";

import Link from "next/link";
import { SERVICES } from "./ServicesData";
import { Eyebrow, GradientText, Icon, Reveal } from "./ServicesUi";

export function Catalogue() {
    const techServices = SERVICES.filter((s) => s.pillar === "Technology");

    return (
        <section
            id="services"
            className="relative -mt-39 overflow-hidden bg-[var(--ms-background)] py-24 text-[var(--ms-text)] lg:py-32"
        >
            <div className="relative mx-auto max-w-[1240px] px-6">
                <Reveal className="text-center">
                    <Eyebrow>Technology Services</Eyebrow>
                    <h2 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2rem,4.6vw,3.8rem)] leading-[1.05] tracking-[-0.05em] text-[var(--ms-text)]">
                        Pick the stack that fits{" "}
                        <GradientText>what you need to ship.</GradientText>
                    </h2>
                    <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.8] text-[var(--ms-muted)]">
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
                                className="group relative flex flex-col overflow-hidden rounded-3xl border border-[color-mix(in_srgb,var(--ms-accent)_22%,transparent)] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-[var(--ms-accent)] hover:shadow-[0_30px_70px_-24px_var(--ms-accent)] sm:p-8"
                                style={{
                                    background:
                                        "linear-gradient(to bottom, color-mix(in srgb, var(--ms-accent) 6%, transparent), color-mix(in srgb, var(--ms-background) 85%, transparent))",
                                }}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[color-mix(in_srgb,var(--ms-accent)_40%,transparent)] bg-[color-mix(in_srgb,var(--ms-accent)_12%,transparent)] text-[var(--ms-accent)] transition-colors duration-300 group-hover:bg-[var(--ms-accent)] group-hover:text-[var(--ms-background)]">
                                        <Icon name={s.icon} className="h-6 w-6" />
                                    </span>
                                    <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--ms-muted)]">
                                        Technology
                                    </span>
                                </div>

                                <h3 className="mt-6 font-display text-[clamp(1.35rem,2.2vw,1.6rem)] leading-[1.15] tracking-[-0.035em] text-[var(--ms-text)]">
                                    {s.title}
                                </h3>
                                <p className="mt-1 text-[13px] text-[var(--ms-accent)]">
                                    {s.need}.
                                </p>

                                {s.explain && (
                                    <p className="mt-4 text-[14px] leading-[1.8] text-[var(--ms-muted)]">
                                        {s.explain}
                                    </p>
                                )}

                                {stack.length > 0 && (
                                    <div className="mt-6">
                                        <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--ms-muted)]">
                                            Tech stack
                                        </p>
                                        <ul className="mt-3 flex flex-wrap gap-2">
                                            {stack.map((t) => (
                                                <li
                                                    key={t}
                                                    className="rounded-full border border-[color-mix(in_srgb,var(--ms-accent)_30%,transparent)] bg-[color-mix(in_srgb,var(--ms-accent)_10%,transparent)] px-3 py-1 text-[11.5px] text-[var(--ms-accent)]"
                                                >
                                                    {t}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="mt-6 border-t border-white/10 pt-5">
                                    <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--ms-muted)]">
                                        What you get
                                    </p>
                                    <ul className="mt-3 space-y-2">
                                        {deliverables.map((g) => (
                                            <li
                                                key={g}
                                                className="flex items-start gap-2.5 text-[13.5px] leading-snug text-[var(--ms-text)]"
                                            >
                                                <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[color-mix(in_srgb,var(--ms-accent)_35%,transparent)] text-[var(--ms-accent)]">
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

                                <span className="mt-7 inline-flex items-center gap-2 text-[13px] text-[var(--ms-accent)] transition-colors group-hover:text-[var(--ms-text)]">
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