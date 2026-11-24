// app/components/consultant/services/ServiceMeaningSection.tsx
"use client";

export type ServiceMeaningItem = {
    label: string;
    title: string;
    description: string;
};

export default function ServiceMeaningSection({
    serviceTitle,
    items,
}: {
    serviceTitle: string;
    items: ServiceMeaningItem[];
}) {
    return (
        <section
            className="relative overflow-hidden border-y py-14 text-[var(--ms-text)] sm:py-20 lg:py-24"
            style={{
                background: "var(--ms-background)",
                borderColor: "color-mix(in srgb, var(--ms-accent) 20%, transparent)",
            }}
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-40 top-0 h-[460px] w-[460px] blur-[130px]"
                style={{
                    background:
                        "color-mix(in srgb, var(--ms-accent) 10%, transparent)",
                }}
            />

            <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
                <div className="mb-9 max-w-[760px] sm:mb-12">
                    <div className="mb-5 flex items-center gap-3">
                        <span
                            className="h-px w-9"
                            style={{ background: "var(--ms-accent)" }}
                        />
                        <span
                            className="text-[10px] font-bold uppercase tracking-[.22em]"
                            style={{ color: "var(--ms-secondary)" }}
                        >
                            Understanding the difference
                        </span>
                    </div>

                    <h2 className="text-balance text-3xl font-medium leading-[1.08] tracking-[-.055em] text-[var(--ms-text)] sm:text-4xl lg:text-5xl">
                        What does{" "}
                        <span style={{ color: "var(--ms-secondary)" }}>
                            {serviceTitle}
                        </span>{" "}
                        actually make possible?
                    </h2>

                    <p className="mt-5 max-w-[620px] text-[13px] leading-7 text-[var(--ms-muted)] sm:text-sm">
                        Every solution should have a purpose. Explore the meaningful
                        ways this service can improve experiences, solve challenges
                        and create lasting value.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {items.slice(0, 4).map((item, index) => (
                        <article
                            key={`${item.title}-${index}`}
                            className="meaning-card group relative flex min-h-[330px] flex-col overflow-hidden border p-6 transition-all duration-500 hover:-translate-y-1 sm:min-h-[355px] sm:p-7"
                            style={{
                                background: "var(--ms-surface-alt)",
                                borderColor:
                                    "color-mix(in srgb, var(--ms-accent) 20%, transparent)",
                            }}
                        >
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 transition-transform duration-700 group-hover:scale-y-100"
                                style={{
                                    background:
                                        "linear-gradient(to top, color-mix(in srgb, var(--ms-accent) 15%, transparent), transparent)",
                                }}
                            />

                            <div
                                aria-hidden="true"
                                className="absolute right-0 top-0 h-14 w-14 border-b border-l transition-all duration-500 group-hover:h-20 group-hover:w-20"
                                style={{
                                    borderColor:
                                        "color-mix(in srgb, var(--ms-accent) 25%, transparent)",
                                    background:
                                        "color-mix(in srgb, var(--ms-accent) 5%, transparent)",
                                }}
                            />

                            <div className="relative z-10 flex h-full flex-col">
                                <div className="flex items-center justify-between gap-3">
                                    <span
                                        className="text-[9px] font-bold uppercase tracking-[.16em]"
                                        style={{ color: "var(--ms-secondary)" }}
                                    >
                                        {item.label}
                                    </span>
                                    <span className="text-[10px] tabular-nums text-[var(--ms-muted)]">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                </div>

                                <div className="mt-auto pt-16">
                                    <div
                                        className="mb-5 h-[3px] w-9 transition-all duration-500 group-hover:w-14"
                                        style={{ background: "var(--ms-accent)" }}
                                    />

                                    <h3 className="max-w-[280px] text-[24px] font-medium leading-[1.13] tracking-[-.05em] text-[var(--ms-text)] sm:text-[26px]">
                                        {item.title}
                                    </h3>

                                    <p className="mt-4 text-[12px] leading-[1.85] text-[var(--ms-muted)] transition-colors duration-500 group-hover:text-[var(--ms-text)]">
                                        {item.description}
                                    </p>
                                </div>

                                <div
                                    className="mt-7 flex items-center justify-between border-t pt-4"
                                    style={{
                                        borderColor:
                                            "color-mix(in srgb, var(--ms-text) 10%, transparent)",
                                    }}
                                >
                                    <span className="text-[9px] font-semibold uppercase tracking-[.16em] text-[var(--ms-muted)]">
                                        The meaning
                                    </span>
                                    <span
                                        className="text-base transition-transform duration-300 group-hover:translate-x-1"
                                        style={{ color: "var(--ms-secondary)" }}
                                    >
                                        ↗
                                    </span>
                                </div>
                            </div>

                            <div
                                aria-hidden="true"
                                className="absolute bottom-0 left-0 z-20 h-[2px] w-0 transition-all duration-700 group-hover:w-full"
                                style={{ background: "var(--ms-accent)" }}
                            />
                        </article>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @media (prefers-reduced-motion: reduce) {
                    .meaning-card,
                    .meaning-card * {
                        transition-duration: 0.01ms !important;
                    }
                }
            `}</style>
        </section>
    );
}