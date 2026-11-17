
"use client";

export type ServiceImpactItem = {
    headline: string;
    label: string;
    description: string;
    tiles: number;
};

type Props = {
    title: string;
    items: ServiceImpactItem[];
};

export default function ServiceImpactSection({
    title,
    items,
}: Props) {
    return (
        <section className="relative overflow-hidden border-y border-white/10 bg-[#080a0f] py-14 text-[#eef2f8] sm:py-20 lg:py-24">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[700px] -translate-x-1/2 bg-[#2F7BFF]/[0.08] blur-[130px]"
            />

            <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
                <header className="mx-auto mb-9 max-w-[760px] sm:mb-12">
                    <div className="mb-5 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-[#8eb7ff]">
                        <span className="h-px w-8 bg-[#2F7BFF]" />
                        The impact of {title}
                        <span className="h-px w-8 bg-[#2F7BFF]" />
                    </div>

                    <h2 className="text-balance text-center text-3xl font-medium leading-[1.08] tracking-[-.055em] text-[#f2f5fb] sm:text-4xl lg:text-5xl">
                        Where can{" "}
                        <span className="text-[#8eb7ff]">{title.toLowerCase()}</span>{" "}
                        make a meaningful difference?
                    </h2>

                    <p className="mx-auto mt-5 max-w-[600px] text-center text-[13px] leading-7 text-[#aeb9cb]">
                        Explore the areas where this service can create practical,
                        measurable value for people and organisations.
                    </p>
                </header>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    {items.slice(0, 6).map((item, index) => (
                        <article
                            key={`${item.label}-${index}`}
                            className="impact-card group relative flex min-h-[320px] flex-col overflow-hidden border border-white/10 bg-[#111722] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#2F7BFF]/60 hover:shadow-[0_18px_35px_rgba(0,0,0,.25)] sm:min-h-[340px]"
                        >
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-t from-[#2F7BFF]/25 via-[#2F7BFF]/[0.07] to-transparent transition-transform duration-700 group-hover:scale-y-100"
                            />

                            <div className="relative z-10 flex h-full flex-col">
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-bold uppercase tracking-[.15em] text-[#8eb7ff]">
                                        IMPACT / {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <span className="text-[11px] text-[#8eb7ff]">↗</span>
                                </div>

                                <div className="mt-8">
                                    <h3 className="impact-headline break-words text-[25px] font-medium leading-[1.04] tracking-[-.055em] text-[#f2f5fb] sm:text-[27px]">
                                        {item.headline}
                                    </h3>

                                    <p className="mt-4 text-[10px] font-bold uppercase leading-[1.5] tracking-[.1em] text-[#8eb7ff]">
                                        {item.label}
                                    </p>

                                    <p className="mt-3 text-[11px] leading-[1.8] text-[#aeb9cb] transition-colors duration-500 group-hover:text-[#d5deeb]">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="mt-auto pt-7">
                                    <div
                                        className="grid w-fit grid-cols-6 gap-[4px]"
                                        aria-hidden="true"
                                    >
                                        {Array.from({ length: 24 }).map((_, tileIndex) => (
                                            <span
                                                key={tileIndex}
                                                className={`h-[11px] w-[11px] transition-colors duration-500 ${tileIndex < Math.max(0, Math.min(24, item.tiles))
                                                        ? "bg-[#2F7BFF]"
                                                        : "bg-white/10 group-hover:bg-white/20"
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    <div className="mt-5 h-px w-full bg-white/10">
                                        <div className="h-full w-0 bg-[#2F7BFF] transition-all duration-700 group-hover:w-full" />
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
                    <span className="text-[9px] font-semibold uppercase tracking-[.16em] text-[#748197]">
                        MindSpace / Service impact
                    </span>

                    <span className="text-[9px] uppercase tracking-[.14em] text-[#748197]">
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
