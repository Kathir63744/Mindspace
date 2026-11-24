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
        <section className="relative isolate overflow-hidden bg-[#07090F] py-24 text-[#F3F5FA] sm:py-32">

            {/* Background Atmosphere */}
            <div className="absolute -z-10 inset-0 opacity-[0.16] pointer-events-none bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
            <div className="absolute -z-10 w-[min(40vw,600px)] aspect-square top-[10%] right-[0%] rounded-full bg-[#2F7BFF] blur-[160px] opacity-[0.12] pointer-events-none" />

            {/* Shared section label */}
            <div className="mx-auto mb-16 flex max-w-7xl items-center gap-3 px-6">
                <span className="h-px w-8 bg-[#2F7BFF]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#A9C7FF]">
                    The MindSpace perspective
                </span>
                <span className="h-px max-w-20 flex-1 bg-white/10" />
            </div>

            {/* Balanced Grid */}
            <div className="mx-auto grid max-w-7xl items-stretch gap-16 px-6 lg:grid-cols-2 lg:gap-20">

                {/* LEFT: Visual Composition (Fixed Gaps) */}
                <div className="relative flex w-full items-center justify-center min-h-[500px] lg:min-h-0">

                    {/* Full visual background grid */}
                    <div
                        className="absolute inset-0 opacity-[0.15]"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(169,199,255,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(169,199,255,0.13) 1px, transparent 1px)",
                            backgroundSize: "38px 38px",
                            maskImage:
                                "radial-gradient(ellipse at center, black 35%, transparent 82%)",
                        }}
                    />

                    {/* Glow */}
                    <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2F7BFF]/[0.1] blur-[100px]" />

                    {/* Orbital rings */}
                    <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2F7BFF]/20" />
                    <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#A9C7FF]/20" />
                    <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2F7BFF]/25" />

                    {/* Orbit dots */}
                    <span className="absolute left-[8%] top-[28%] h-3 w-3 rounded-full bg-[#2F7BFF] shadow-[0_0_24px_#2F7BFF]" />
                    <span className="absolute right-[10%] top-[24%] h-2.5 w-2.5 rounded-full bg-[#A9C7FF] shadow-[0_0_20px_#A9C7FF]" />
                    <span className="absolute bottom-[22%] left-[18%] h-2.5 w-2.5 rounded-full bg-[#2F7BFF] shadow-[0_0_20px_#2F7BFF]" />
                    <span className="absolute bottom-[26%] right-[8%] h-3 w-3 rounded-full bg-[#A9C7FF] shadow-[0_0_24px_#A9C7FF]" />

                    {/* Center M */}
                    <div className="relative z-10 flex h-[200px] w-[200px] items-center justify-center rounded-full border border-[#A9C7FF]/30 bg-gradient-to-br from-[#17294A] via-[#0D1527] to-[#080D18] shadow-[0_0_120px_rgba(47,123,255,0.25)]">
                        <div className="absolute inset-3 rounded-full border border-[#2F7BFF]/25" />
                        <div className="absolute inset-7 rounded-full border border-white/[0.06]" />
                        <span className="bg-gradient-to-br from-white via-[#A9C7FF] to-[#2F7BFF] bg-clip-text text-[96px] font-semibold tracking-[-0.13em] text-transparent">
                            M
                        </span>
                    </div>

                    {/* Floating Labels */}
                    <div className="absolute left-0 top-[25%] z-20 rounded-xl border border-white/10 bg-[#101827]/95 px-5 py-4 shadow-2xl backdrop-blur-md">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#78869D]">
                            Built around
                        </p>
                        <p className="mt-1.5 text-sm font-medium text-white">
                            Individual goals
                        </p>
                    </div>

                    <div className="absolute right-0 top-[22%] z-20 rounded-xl border border-white/10 bg-[#101827]/95 px-5 py-4 shadow-2xl backdrop-blur-md">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#78869D]">
                            Looking ahead
                        </p>
                        <p className="mt-1.5 text-sm font-medium text-white">
                            New horizons
                        </p>
                    </div>

                    <div className="absolute bottom-[15%] left-[5%] z-20 rounded-xl border border-white/10 bg-[#101827]/95 px-5 py-4 shadow-2xl backdrop-blur-md">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#78869D]">
                            Your direction
                        </p>
                        <p className="mt-1.5 text-sm font-medium text-white">
                            A personal vision
                        </p>
                    </div>

                    <div className="absolute bottom-[12%] right-[2%] z-20 rounded-xl border border-white/10 bg-[#101827]/95 px-5 py-4 shadow-2xl backdrop-blur-md">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#78869D]">
                            The bigger picture
                        </p>
                        <p className="mt-1.5 text-sm font-medium text-white">
                            A future with purpose
                        </p>
                    </div>
                </div>

                {/* RIGHT: Editorial Content (White text) */}
                <div className="relative flex h-full flex-col justify-center py-2">
                    <div className="pointer-events-none absolute -right-10 top-10 h-64 w-64 rounded-full bg-[#2F7BFF]/[0.06] blur-[90px]" />

                    <div className="relative">
                        <h2 className="max-w-4xl text-[clamp(38px,5vw,64px)] font-sans font-semibold leading-[0.94] tracking-[-0.055em] text-[#F5F7FC]">
                            Beyond the destination,
                            <span className="mt-2 block text-[#80ADFF] italic font-medium">
                                it&apos;s how you get there.
                            </span>
                        </h2>

                        <p className="mt-6 max-w-[480px] text-[16px] leading-[1.85] text-white/90">
                            Every ambition has its own direction. We believe the experience
                            should reflect the person behind it, with thoughtful guidance,
                            honest conversations and a clearer perspective.
                        </p>
                    </div>

                    {/* Principles List */}
                    <div className="relative mt-10 grid gap-4">
                        {principles.map((item) => (
                            <div
                                key={item.number}
                                className="group relative grid grid-cols-[56px_1fr] items-start gap-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D121D]/90 p-5 transition-all duration-300 hover:border-[#2F7BFF]/40 hover:bg-[#101A2B]"
                            >
                                <div className="absolute inset-y-0 left-0 w-[3px] scale-y-0 bg-[#2F7BFF] transition-transform duration-300 group-hover:scale-y-100" />

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#2F7BFF]/30 bg-[#2F7BFF]/10 text-sm font-semibold tracking-wider text-[#A9C7FF] transition-colors group-hover:bg-[#2F7BFF]/20">
                                    {item.number}
                                </div>

                                <div className="pt-0.5">
                                    <h3 className="text-[17px] font-semibold tracking-tight text-white transition-colors group-hover:text-[#A9C7FF]">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 max-w-md text-[14.5px] leading-[1.75] text-white/80">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Signature */}
                    <div className="relative mt-8 flex items-center justify-between border-t border-white/[0.08] pt-5">
                        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                            MindSpace · A different perspective
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}