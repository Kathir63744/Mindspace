
"use client";

const principles = [
    {
        number: "01",
        title: "Personal, not generic",
        description:
            "Your ambitions, interests and priorities deserve attention beyond a standard checklist.",
    },
    {
        number: "02",
        title: "Informed, not rushed",
        description:
            "Good decisions start with understanding the possibilities, not simply choosing the quickest option.",
    },
    {
        number: "03",
        title: "Support that continues",
        description:
            "A meaningful experience is built on consistent communication, not one-time conversations.",
    },
];

export default function ExperienceSlider() {
    return (
        <section className="relative isolate w-full overflow-hidden bg-[#07090F] py-16 font-questrial text-[#F3F5FA] sm:py-20 md:py-24 lg:py-32">

            {/* Background Atmosphere */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)] sm:opacity-[0.16] sm:[background-size:64px_64px]"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 top-[8%] -z-10 h-[280px] w-[280px] rounded-full bg-[#2F7BFF]/10 blur-[100px] sm:h-[450px] sm:w-[450px] sm:blur-[140px] lg:h-[600px] lg:w-[600px] lg:blur-[160px]"
            />

            {/* Section Label */}
            <div className="mx-auto mb-10 flex max-w-7xl items-center gap-3 px-5 sm:mb-14 sm:px-8 lg:mb-16 lg:px-10">
                <span className="h-px w-7 shrink-0 bg-[#2F7BFF] sm:w-8" />

                <span className="font-questrial text-[9px] font-semibold uppercase tracking-[0.2em] text-[#A9C7FF] sm:text-[10px] sm:tracking-[0.24em]">
                    The MindSpace perspective
                </span>

                <span className="h-px max-w-20 flex-1 bg-white/10" />
            </div>

            {/* Main Layout */}
            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:gap-14 sm:px-8 md:gap-16 lg:grid-cols-2 lg:gap-12 lg:px-10 xl:gap-20">

                {/* LEFT: Orbital Visual */}
                <div className="relative flex min-h-[390px] w-full items-center justify-center sm:min-h-[470px] md:min-h-[510px] lg:min-h-[540px]">

                    {/* Visual Background Grid */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-[0.13]"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(169,199,255,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(169,199,255,0.13) 1px, transparent 1px)",
                            backgroundSize: "38px 38px",
                            maskImage:
                                "radial-gradient(ellipse at center, black 25%, transparent 78%)",
                        }}
                    />

                    {/* Central Glow */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-1/2 h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2F7BFF]/10 blur-[75px] sm:h-[340px] sm:w-[340px] sm:blur-[100px] lg:h-[400px] lg:w-[400px]"
                    />

                    {/* Orbital Rings */}
                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2F7BFF]/20 sm:h-[340px] sm:w-[340px] md:h-[390px] md:w-[390px] lg:h-[420px] lg:w-[420px]" />

                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[185px] w-[185px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#A9C7FF]/20 sm:h-[260px] sm:w-[260px] md:h-[300px] md:w-[300px] lg:h-[320px] lg:w-[320px]" />

                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[130px] w-[130px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2F7BFF]/25 sm:h-[180px] sm:w-[180px] md:h-[205px] md:w-[205px] lg:h-[220px] lg:w-[220px]" />

                    {/* Orbit Dots */}
                    <span className="absolute left-[9%] top-[27%] h-2 w-2 rounded-full bg-[#2F7BFF] shadow-[0_0_18px_#2F7BFF] sm:h-3 sm:w-3" />

                    <span className="absolute right-[10%] top-[23%] h-2 w-2 rounded-full bg-[#A9C7FF] shadow-[0_0_18px_#A9C7FF] sm:h-2.5 sm:w-2.5" />

                    <span className="absolute bottom-[22%] left-[17%] h-2 w-2 rounded-full bg-[#2F7BFF] shadow-[0_0_18px_#2F7BFF] sm:h-2.5 sm:w-2.5" />

                    <span className="absolute bottom-[24%] right-[9%] h-2.5 w-2.5 rounded-full bg-[#A9C7FF] shadow-[0_0_20px_#A9C7FF] sm:h-3 sm:w-3" />

                    {/* Center MindSpace Emblem */}
                    <div className="relative z-10 flex h-[112px] w-[112px] items-center justify-center rounded-full border border-[#A9C7FF]/30 bg-gradient-to-br from-[#17294A] via-[#0D1527] to-[#080D18] shadow-[0_0_65px_rgba(47,123,255,0.24)] sm:h-[155px] sm:w-[155px] sm:shadow-[0_0_90px_rgba(47,123,255,0.25)] lg:h-[200px] lg:w-[200px]">

                        <div className="absolute inset-2.5 rounded-full border border-[#2F7BFF]/25 sm:inset-3 lg:inset-3" />

                        <div className="absolute inset-5 rounded-full border border-white/[0.06] sm:inset-6 lg:inset-7" />

                        <span className="bg-gradient-to-br from-white via-[#A9C7FF] to-[#2F7BFF] bg-clip-text pl-1 text-[65px] font-semibold tracking-[-0.13em] text-transparent sm:text-[80px] lg:text-[96px]">
                            M
                        </span>
                    </div>

                    {/* Floating Labels - Built Around */}
                    <div className="absolute left-0 top-[12%] z-20 max-w-[145px] rounded-lg border border-white/10 bg-[#101827]/95 px-3 py-2.5 shadow-xl backdrop-blur-md sm:top-[19%] sm:max-w-none sm:rounded-xl sm:px-5 sm:py-4">
                        <p className="font-questrial text-[8px] uppercase tracking-[0.14em] text-[#78869D] sm:text-[9px] sm:tracking-[0.2em]">
                            Built around
                        </p>

                        <p className="mt-1 font-questrial text-[11px] font-medium text-white sm:mt-1.5 sm:text-sm">
                            Individual goals
                        </p>
                    </div>

                    {/* Floating Labels - Looking Ahead */}
                    <div className="absolute right-0 top-[12%] z-20 max-w-[140px] rounded-lg border border-white/10 bg-[#101827]/95 px-3 py-2.5 shadow-xl backdrop-blur-md sm:top-[17%] sm:max-w-none sm:rounded-xl sm:px-5 sm:py-4">
                        <p className="font-questrial text-[8px] uppercase tracking-[0.14em] text-[#78869D] sm:text-[9px] sm:tracking-[0.2em]">
                            Looking ahead
                        </p>

                        <p className="mt-1 font-questrial text-[11px] font-medium text-white sm:mt-1.5 sm:text-sm">
                            New horizons
                        </p>
                    </div>

                    {/* Floating Labels - Your Direction */}
                    <div className="absolute bottom-[10%] left-0 z-20 max-w-[145px] rounded-lg border border-white/10 bg-[#101827]/95 px-3 py-2.5 shadow-xl backdrop-blur-md sm:bottom-[12%] sm:left-[5%] sm:max-w-none sm:rounded-xl sm:px-5 sm:py-4">
                        <p className="font-questrial text-[8px] uppercase tracking-[0.14em] text-[#78869D] sm:text-[9px] sm:tracking-[0.2em]">
                            Your direction
                        </p>

                        <p className="mt-1 font-questrial text-[11px] font-medium text-white sm:mt-1.5 sm:text-sm">
                            A personal vision
                        </p>
                    </div>

                    {/* Floating Labels - Bigger Picture */}
                    <div className="absolute bottom-[10%] right-0 z-20 max-w-[150px] rounded-lg border border-white/10 bg-[#101827]/95 px-3 py-2.5 shadow-xl backdrop-blur-md sm:bottom-[12%] sm:right-[2%] sm:max-w-none sm:rounded-xl sm:px-5 sm:py-4">
                        <p className="font-questrial text-[8px] uppercase tracking-[0.14em] text-[#78869D] sm:text-[9px] sm:tracking-[0.2em]">
                            The bigger picture
                        </p>

                        <p className="mt-1 font-questrial text-[11px] font-medium text-white sm:mt-1.5 sm:text-sm">
                            A future with purpose
                        </p>
                    </div>
                </div>

                {/* RIGHT: Editorial Content */}
                <div className="relative flex h-full min-w-0 flex-col justify-center py-2 sm:py-4 lg:py-2">

                    {/* Content Glow */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-10 top-10 h-48 w-48 rounded-full bg-[#2F7BFF]/[0.06] blur-[80px] sm:h-64 sm:w-64 sm:blur-[90px]"
                    />

                    {/* Heading and Description */}
                    <div className="relative">
                        <h2 className="max-w-4xl font-questrial text-[clamp(36px,6vw,64px)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#F5F7FC]">
                            Beyond the destination,

                            <span className="mt-2 block font-medium italic text-[#80ADFF]">
                                it&apos;s how you get there.
                            </span>
                        </h2>

                        <p className="mt-5 max-w-[480px] font-questrial text-[14px] leading-[1.8] text-white/65 sm:mt-6 sm:text-[16px] sm:leading-[1.85]">
                            Every ambition has its own direction. We believe
                            the experience should reflect the person behind it,
                            with thoughtful guidance, honest conversations and
                            a clearer perspective.
                        </p>
                    </div>

                    {/* Principles List */}
                    <div className="relative mt-8 grid gap-3 sm:mt-10 sm:gap-4">
                        {principles.map((item) => (
                            <div
                                key={item.number}
                                className="group relative grid grid-cols-[42px_minmax(0,1fr)] items-start gap-3 overflow-hidden rounded-xl border border-white/[0.08] bg-[#0D121D]/90 p-4 transition-all duration-300 hover:border-[#2F7BFF]/40 hover:bg-[#101A2B] sm:grid-cols-[56px_minmax(0,1fr)] sm:gap-5 sm:rounded-2xl sm:p-5"
                            >
                                {/* Active Accent */}
                                <div className="absolute inset-y-0 left-0 w-[3px] origin-center scale-y-0 bg-[#2F7BFF] transition-transform duration-300 group-hover:scale-y-100" />

                                {/* Number */}
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#2F7BFF]/30 bg-[#2F7BFF]/10 font-questrial text-xs font-semibold tracking-wider text-[#A9C7FF] transition-colors group-hover:bg-[#2F7BFF]/20 sm:h-12 sm:w-12 sm:rounded-xl sm:text-sm">
                                    {item.number}
                                </div>

                                {/* Text */}
                                <div className="min-w-0 pt-0.5">
                                    <h3 className="font-questrial text-[14px] font-semibold leading-snug tracking-tight text-white transition-colors group-hover:text-[#A9C7FF] sm:text-[17px]">
                                        {item.title}
                                    </h3>

                                    <p className="mt-1.5 max-w-md font-questrial text-[12px] leading-[1.7] text-white/55 sm:mt-2 sm:text-[14.5px] sm:leading-[1.75]">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Signature */}
                    <div className="relative mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-5 sm:mt-8">
                        <span className="font-questrial text-[9px] font-medium uppercase tracking-[0.15em] text-white/40 sm:text-[11px] sm:tracking-[0.2em]">
                            MindSpace · A different perspective
                        </span>

                        <span className="h-px w-8 bg-[#2F7BFF]/60" />
                    </div>
                </div>
            </div>
        </section>
    );
}
