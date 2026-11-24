// app/components/consultant/services/ServiceUsageHighlights.tsx
"use client";

export type ServiceUsageItem = {
    label: string;
    title: string;
    text: string;
};

export default function ServiceUsageHighlights({
    serviceTitle,
    items,
}: {
    serviceTitle: string;
    items: ServiceUsageItem[];
}) {
    const visibleItems = items.slice(0, 4);

    return (
        <section
            className="relative isolate overflow-hidden py-24 text-[var(--ms-text)] sm:py-28 lg:py-32"
            style={{ background: "var(--ms-background)" }}
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] blur-[140px]"
                style={{
                    background:
                        "color-mix(in srgb, var(--ms-accent) 8%, transparent)",
                }}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] blur-[140px]"
                style={{
                    background:
                        "color-mix(in srgb, var(--ms-secondary) 8%, transparent)",
                }}
            />

            <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
                <div className="mb-12 max-w-[760px] sm:mb-16 lg:mb-20">
                    <span
                        className="mb-5 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em]"
                        style={{ color: "var(--ms-secondary)" }}
                    >
                        <span
                            className="h-px w-8"
                            style={{ background: "var(--ms-accent)" }}
                        />
                        Where it makes a difference
                    </span>

                    <h2 className="text-balance text-3xl font-medium leading-[1.12] tracking-[-0.045em] text-[var(--ms-text)] sm:text-4xl lg:text-[52px]">
                        Explore what{" "}
                        <span style={{ color: "var(--ms-muted)" }}>{serviceTitle}</span>
                        <br className="hidden sm:block" /> can make possible.
                    </h2>

                    <div className="mt-6 flex items-start justify-between gap-6">
                        <p className="max-w-[570px] text-sm leading-7 text-[var(--ms-muted)] sm:text-base">
                            Discover the different ways this service can solve real
                            challenges and create meaningful outcomes.
                        </p>
                        <span className="hidden shrink-0 pt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--ms-muted)] sm:block">
                            04 applications
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
                    {visibleItems.map((item, index) => (
                        <article
                            key={`${item.title}-${index}`}
                            tabIndex={0}
                            aria-label={`${item.title}. ${item.text}`}
                            className="usage-card group relative flex min-h-[390px] flex-col overflow-hidden rounded-2xl border p-7 outline-none transition-all duration-500 hover:border-[var(--ms-accent)] focus-visible:border-[var(--ms-accent)] focus-visible:ring-2 focus-visible:ring-[var(--ms-accent)] sm:min-h-[420px] sm:p-9 lg:min-h-[440px] lg:p-10"
                            style={{
                                background: "var(--ms-surface)",
                                borderColor:
                                    "color-mix(in srgb, var(--ms-text) 10%, transparent)",
                            }}
                        >
                            <div className="relative z-10 flex items-center justify-between">
                                <span
                                    className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em]"
                                    style={{ color: "var(--ms-secondary)" }}
                                >
                                    <span
                                        className="h-[5px] w-[5px]"
                                        style={{ background: "var(--ms-accent)" }}
                                    />
                                    {item.label || "Application"}
                                </span>
                                <span className="text-sm font-medium tabular-nums text-[var(--ms-muted)]">
                                    {String(index + 1).padStart(2, "0")} / 04
                                </span>
                            </div>

                            <div className="relative z-10 mt-auto pb-8">
                                <div
                                    className="mb-5 h-px w-10 transition-all duration-500 group-hover:w-20 group-focus:w-20"
                                    style={{
                                        background:
                                            "color-mix(in srgb, var(--ms-accent) 60%, transparent)",
                                    }}
                                />

                                <h3 className="max-w-[440px] text-[20px] font-medium leading-[1.12] tracking-[-0.045em] text-[var(--ms-text)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2 group-focus:-translate-y-2 sm:text-[32px] lg:text-[36px]">
                                    {item.title}
                                </h3>

                                <p className="mt-4 max-w-[380px] text-[14px] leading-6 text-[var(--ms-muted)] transition-all duration-500 group-hover:-translate-y-2 group-hover:opacity-0 group-focus:-translate-y-2 group-focus:opacity-0">
                                    A closer look at how this application creates practical
                                    value through {item.label.toLowerCase()}.
                                </p>
                            </div>

                            <div
                                aria-hidden="true"
                                className="usage-reveal absolute inset-x-0 bottom-0 z-10 flex min-h-[175px] translate-y-full flex-col justify-between px-7 pb-7 pt-6 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-focus:translate-y-0 sm:px-9 sm:pb-8 sm:pt-7 lg:px-10"
                                style={{
                                    background:
                                        "color-mix(in srgb, var(--ms-surface) 80%, black 20%)",
                                }}
                            >
                                <p className="marker-copy mt-5 max-w-[480px] text-[18px] leading-[1.85] text-[var(--ms-text)] sm:text-[20px]">
                                    <span>{item.text}</span>
                                </p>

                                <div
                                    className="mt-5 flex items-center justify-between border-t pt-4"
                                    style={{
                                        borderColor:
                                            "color-mix(in srgb, var(--ms-accent) 25%, transparent)",
                                    }}
                                >
                                    <span
                                        className="text-[9px] font-bold uppercase tracking-[0.18em]"
                                        style={{ color: "var(--ms-secondary)" }}
                                    >
                                        MindSpace
                                    </span>
                                    <span
                                        className="text-lg leading-none"
                                        style={{ color: "var(--ms-secondary)" }}
                                    >
                                        ↗
                                    </span>
                                </div>
                            </div>

                            <div
                                className="relative z-[5] mt-auto flex items-center justify-between border-t pt-5 transition-opacity duration-300 group-hover:opacity-0 group-focus:opacity-0"
                                style={{
                                    borderColor:
                                        "color-mix(in srgb, var(--ms-text) 10%, transparent)",
                                }}
                            >
                                <span className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[var(--ms-muted)]">
                                    Explore application
                                </span>
                                <span
                                    className="text-lg leading-none transition-transform duration-500 group-hover:translate-x-1"
                                    style={{ color: "var(--ms-accent)" }}
                                >
                                    →
                                </span>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .marker-copy span {
                    background-image: linear-gradient(
                        transparent 58%,
                        color-mix(in srgb, var(--ms-accent) 35%, transparent) 58%,
                        color-mix(in srgb, var(--ms-accent) 35%, transparent) 94%,
                        transparent 94%
                    );
                    background-size: 0% 100%;
                    background-repeat: no-repeat;
                    -webkit-box-decoration-break: clone;
                    box-decoration-break: clone;
                    transition: background-size 1100ms cubic-bezier(0.22, 1, 0.36, 1);
                    transition-delay: 180ms;
                }
                .group:hover .marker-copy span,
                .group:focus .marker-copy span {
                    background-size: 100% 100%;
                }
                @media (prefers-reduced-motion: reduce) {
                    .marker-copy span,
                    .usage-reveal {
                        transition: none;
                    }
                }
            `}</style>
        </section>
    );
}