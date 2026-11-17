
"use client";

export type ServiceMeaningItem = {
    label: string;
    title: string;
    description: string;
};

type Props = {
    serviceTitle: string;
    items: ServiceMeaningItem[];
};

export default function ServiceMeaningSection({
    serviceTitle,
    items,
}: Props) {
    return (
        <section className="relative overflow-hidden border-y border-white/10 bg-[#0d1119] py-14 text-[#eef2f8] sm:py-20 lg:py-24">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-40 top-0 h-[460px] w-[460px] bg-[#2F7BFF]/[0.09] blur-[130px]"
            />

            <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
                <div className="mb-9 max-w-[760px] sm:mb-12">
                    <div className="mb-5 flex items-center gap-3">
                        <span className="h-px w-9 bg-[#2F7BFF]" />
                        <span className="text-[10px] font-bold uppercase tracking-[.22em] text-[#8eb7ff]">
                            Understanding the difference
                        </span>
                    </div>

                    <h2 className="text-balance text-3xl font-medium leading-[1.08] tracking-[-.055em] text-[#f2f5fb] sm:text-4xl lg:text-5xl">
                        What does{" "}
                        <span className="text-[#8eb7ff]">{serviceTitle}</span>{" "}
                        actually make possible?
                    </h2>

                    <p className="mt-5 max-w-[620px] text-[13px] leading-7 text-[#aeb9cb] sm:text-sm">
                        Every solution should have a purpose. Explore the meaningful
                        ways this service can improve experiences, solve challenges
                        and create lasting value.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {items.slice(0, 4).map((item, index) => (
                        <article
                            key={`${item.title}-${index}`}
                            className="meaning-card group relative flex min-h-[330px] flex-col overflow-hidden border border-white/10 bg-[#111722] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#2F7BFF]/60 hover:bg-[#141d2b] sm:min-h-[355px] sm:p-7"
                        >
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-t from-[#2F7BFF]/15 to-transparent transition-transform duration-700 group-hover:scale-y-100"
                            />

                            <div
                                aria-hidden="true"
                                className="absolute right-0 top-0 h-14 w-14 border-b border-l border-[#2F7BFF]/20 bg-[#2F7BFF]/[0.04] transition-all duration-500 group-hover:h-20 group-hover:w-20"
                            />

                            <div className="relative z-10 flex h-full flex-col">
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-[9px] font-bold uppercase tracking-[.16em] text-[#8eb7ff]">
                                        {item.label}
                                    </span>
                                    <span className="text-[10px] tabular-nums text-[#748197]">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                </div>

                                <div className="mt-auto pt-16">
                                    <div className="mb-5 h-[3px] w-9 bg-[#2F7BFF] transition-all duration-500 group-hover:w-14" />

                                    <h3 className="max-w-[280px] text-[24px] font-medium leading-[1.13] tracking-[-.05em] text-[#f2f5fb] sm:text-[26px]">
                                        {item.title}
                                    </h3>

                                    <p className="mt-4 text-[12px] leading-[1.85] text-[#aeb9cb] transition-colors duration-500 group-hover:text-[#d5deeb]">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-4">
                                    <span className="text-[9px] font-semibold uppercase tracking-[.16em] text-[#748197]">
                                        The meaning
                                    </span>
                                    <span className="text-base text-[#8eb7ff] transition-transform duration-300 group-hover:translate-x-1">
                                        ↗
                                    </span>
                                </div>
                            </div>

                            <div
                                aria-hidden="true"
                                className="absolute bottom-0 left-0 z-20 h-[2px] w-0 bg-[#2F7BFF] transition-all duration-700 group-hover:w-full"
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
