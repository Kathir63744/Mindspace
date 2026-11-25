
"use client";

export type ServiceImpactItem = {
    headline: string;
    label: string;
    description: string;
    tiles: number;
};

export default function ServiceImpactSection({
    title,
    items,
}: {
    title: string;
    items: ServiceImpactItem[];
}) {
    return (
        <section
            className="relative overflow-hidden border-y py-14 text-[var(--ms-text)] sm:py-20 lg:py-24"
            style={{
                background: "var(--ms-background)",
                borderColor:
                    "color-mix(in srgb, var(--ms-accent) 20%, transparent)",
            }}
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[700px] -translate-x-1/2 blur-[130px]"
                style={{
                    background:
                        "color-mix(in srgb, var(--ms-accent) 10%, transparent)",
                }}
            />

            <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
                <header className="mx-auto mb-9 max-w-[760px] sm:mb-12">
                    <div
                        className="mb-5 flex items-center justify-center gap-3 text-[12px] font-bold uppercase tracking-[.2em]"
                        style={{ color: "var(--ms-secondary)" }}
                    >
                        <span
                            className="h-px w-8"
                            style={{ background: "var(--ms-accent)" }}
                        />
                        The impact of {title}
                        <span
                            className="h-px w-8"
                            style={{ background: "var(--ms-accent)" }}
                        />
                    </div>

                    <h2 className="text-balance text-center text-4xl font-medium leading-[1.08] tracking-[-.055em] text-[var(--ms-text)] sm:text-5xl lg:text-5xl">
                        Where can{" "}
                        <span style={{ color: "var(--ms-secondary)" }}>
                            {title.toLowerCase()}
                        </span>{" "}
                        make a meaningful difference?
                    </h2>

                    <p className="mx-auto mt-5 max-w-[600px] text-center text-[14px] leading-7 text-[var(--ms-muted)]">
                        Explore the areas where this service can create practical,
                        measurable value for people and organisations.
                    </p>
                </header>

                <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    {items.slice(0, 6).map((item, index) => (
                        <article
                            key={`${item.label}-${index}`}
                            className="impact-card group relative flex min-h-[340px] flex-col overflow-hidden border p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(0,0,0,.25)] sm:min-h-[360px]"
                            style={{
                                background: "var(--ms-surface-alt)",
                                borderColor:
                                    "color-mix(in srgb, var(--ms-accent) 20%, transparent)",
                            }}
                        >
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-700 group-hover:scale-y-100"
                                style={{
                                    background:
                                        "linear-gradient(to top, color-mix(in srgb, var(--ms-accent) 25%, transparent), color-mix(in srgb, var(--ms-accent) 7%, transparent), transparent)",
                                }}
                            />

                            <div className="relative z-10 flex h-full flex-1 flex-col">
                                {/* CARD TOP */}

                                <div className="flex h-5 shrink-0 items-center justify-between">
                                    <span
                                        className="text-[12px] font-bold uppercase tracking-[.15em]"
                                        style={{ color: "var(--ms-secondary)" }}
                                    >
                                        IMPACT / {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <span
                                        className="text-[11px]"
                                        style={{ color: "var(--ms-secondary)" }}
                                    >
                                        ↗
                                    </span>
                                </div>

                                {/* COMPLETE CONTENT */}

                                <div className="mt-8">
                                    <div className="min-h-[72px]">
                                        <h3 className="break-words text-[27px] font-medium leading-[1.04] tracking-[-.055em] text-[var(--ms-text)]">
                                            {item.headline}
                                        </h3>
                                    </div>

                                    <div className="mt-4 min-h-[34px]">
                                        <p
                                            className="break-words text-[11px] font-bold uppercase leading-[1.5] tracking-[.1em]"
                                            style={{
                                                color: "var(--ms-secondary)",
                                            }}
                                        >
                                            {item.label}
                                        </p>
                                    </div>

                                    <div className="mt-3">
                                        <p className="break-words text-[13px] leading-[1.8] text-[var(--ms-muted)] transition-colors duration-500 group-hover:text-[var(--ms-text)]">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                {/* BOTTOM — ALIGNED */}

                                <div className="mt-auto shrink-0 pt-7">
                                    <div
                                        className="grid w-fit grid-cols-6 gap-[4px]"
                                        aria-hidden="true"
                                    >
                                        {Array.from({ length: 24 }).map(
                                            (_, tileIndex) => (
                                                <span
                                                    key={tileIndex}
                                                    className="h-[11px] w-[11px] transition-colors duration-500"
                                                    style={{
                                                        background:
                                                            tileIndex <
                                                                Math.max(
                                                                    0,
                                                                    Math.min(
                                                                        24,
                                                                        item.tiles
                                                                    )
                                                                )
                                                                ? "var(--ms-accent)"
                                                                : "color-mix(in srgb, var(--ms-text) 10%, transparent)",
                                                    }}
                                                />
                                            )
                                        )}
                                    </div>

                                    <div
                                        className="mt-5 h-px w-full"
                                        style={{
                                            background:
                                                "color-mix(in srgb, var(--ms-text) 10%, transparent)",
                                        }}
                                    >
                                        <div
                                            className="h-full w-0 transition-all duration-700 group-hover:w-full"
                                            style={{
                                                background: "var(--ms-accent)",
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div
                    className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t pt-5"
                    style={{
                        borderColor:
                            "color-mix(in srgb, var(--ms-text) 10%, transparent)",
                    }}
                >
                    <span className="text-[9px] font-semibold uppercase tracking-[.16em] text-[var(--ms-muted)]">
                        MindSpace / Service impact
                    </span>

                    <span className="text-[9px] uppercase tracking-[.14em] text-[var(--ms-muted)]">
                        Practical value · Connected outcomes
                    </span>
                </div>
            </div>

            <style jsx>{`
                @media (prefers-reduced-motion: reduce) {
                    .impact-card,
                    .impact-card * {
                        transition-duration: 0.01ms !important;
                    }
                }
            `}</style>
        </section>
    );
}
