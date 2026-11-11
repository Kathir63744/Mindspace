
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
        <section className="relative overflow-hidden bg-[#07090F] py-24 text-[#F3F5FA] sm:py-32">

            {/* Shared section label */}
            <div className="mx-auto  flex max-w-7xl items-center gap-3 px-6">
                <span className="h-px w-9 bg-[#2F7BFF]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A9C7FF]">
                    The MindSpace perspective
                </span>
                <span className="h-px max-w-24 flex-1 bg-white/10" />
            </div>

            <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">

                {/* Visual composition */}
                <div className="relative mx-auto flex min-h-[560px] w-full max-w-[600px] items-center justify-center">

                    {/* Full visual background */}
                    <div
                        className="absolute inset-0 opacity-[0.18]"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(169,199,255,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(169,199,255,0.13) 1px, transparent 1px)",
                            backgroundSize: "38px 38px",
                            maskImage:
                                "radial-gradient(ellipse at center, black 35%, transparent 82%)",
                        }}
                    />

                    {/* Soft ambient glow */}
                    <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2F7BFF]/[0.08] blur-[90px]" />

                    {/* Orbital rings */}
                    <div className="absolute left-1/2 top-1/2 h-[470px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2F7BFF]/20" />
                    <div className="absolute left-1/2 top-1/2 h-[370px] w-[370px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#A9C7FF]/20" />
                    <div className="absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2F7BFF]/25" />

                    {/* Decorative orbit points */}
                    <span className="absolute left-[13%] top-[29%] h-2.5 w-2.5 rounded-full bg-[#2F7BFF] shadow-[0_0_20px_#2F7BFF]" />
                    <span className="absolute right-[14%] top-[25%] h-2 w-2 rounded-full bg-[#A9C7FF] shadow-[0_0_18px_#A9C7FF]" />
                    <span className="absolute bottom-[22%] left-[23%] h-2 w-2 rounded-full bg-[#2F7BFF] shadow-[0_0_18px_#2F7BFF]" />
                    <span className="absolute bottom-[29%] right-[13%] h-2.5 w-2.5 rounded-full bg-[#A9C7FF] shadow-[0_0_18px_#A9C7FF]" />

                    {/* Central identity */}
                    <div className="relative z-10 flex h-[220px] w-[220px] items-center justify-center rounded-full border border-[#A9C7FF]/30 bg-gradient-to-br from-[#17294A] via-[#0D1527] to-[#080D18] shadow-[0_0_100px_rgba(47,123,255,0.22)]">
                        <div className="absolute inset-3 rounded-full border border-[#2F7BFF]/25" />
                        <div className="absolute inset-7 rounded-full border border-white/[0.06]" />
                        <span className="bg-gradient-to-br from-white via-[#A9C7FF] to-[#2F7BFF] bg-clip-text text-[104px] font-semibold tracking-[-0.13em] text-transparent">
                            M
                        </span>
                    </div>

                    {/* Floating labels */}
                    <div className="absolute left-0 top-[35%] z-20 rounded-xl border border-white/10 bg-[#101827]/95 px-5 py-4 shadow-2xl backdrop-blur-md">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#78869D]">
                            Built around
                        </p>
                        <p className="mt-1.5 text-sm font-medium text-white">
                            Individual goals
                        </p>
                    </div>

                    <div className="absolute right-0 top-[30%] z-20 rounded-xl border border-white/10 bg-[#101827]/95 px-5 py-4 shadow-2xl backdrop-blur-md">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#78869D]">
                            Looking ahead
                        </p>
                        <p className="mt-1.5 text-sm font-medium text-white">
                            New horizons
                        </p>
                    </div>

                    <div className="absolute bottom-[15%] left-[8%] z-20 rounded-xl border border-white/10 bg-[#101827]/95 px-5 py-4 shadow-2xl backdrop-blur-md">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#78869D]">
                            Your direction
                        </p>
                        <p className="mt-1.5 text-sm font-medium text-white">
                            A personal vision
                        </p>
                    </div>

                    <div className="absolute bottom-[12%] right-[5%] z-20 rounded-xl border border-white/10 bg-[#101827]/95 px-5 py-4 shadow-2xl backdrop-blur-md">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#78869D]">
                            The bigger picture
                        </p>
                        <p className="mt-1.5 text-sm font-medium text-white">
                            A future with purpose
                        </p>
                    </div>

                    {/* Small editorial details */}
                    <span className="absolute left-2 top-2 text-[10px] tracking-[0.2em] text-white/30">
                        MINDSPACE / 01
                    </span>
                    <span className="absolute bottom-2 right-2 text-[10px] tracking-[0.2em] text-white/30">
                        BEYOND BOUNDARIES
                    </span>
                </div>

                {/* Editorial content */}
                <div className="relative flex h-full flex-col justify-center py-8 lg:py-12">

                    {/* Subtle background accent */}
                    <div className="pointer-events-none absolute -right-10 top-10 h-64 w-64 rounded-full bg-[#2F7BFF]/[0.06] blur-[90px]" />

                    {/* Heading and introduction */}
                    <div className="relative">
                        <h2 className="max-w-xl text-4xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-5xl lg:text-[58px]">
                            Beyond the destination,
                            <span className="mt-3 block bg-gradient-to-r from-[#A9C7FF] to-[#2F7BFF] bg-clip-text text-transparent">
                                it’s how you get there.
                            </span>
                        </h2>

                        <p className="mt-7 max-w-lg text-[14px] leading-8 text-[#A0A9BA]">
                            Every ambition has its own direction. We believe the experience
                            should reflect the person behind it, with thoughtful guidance,
                            honest conversations and a clearer perspective.
                        </p>
                    </div>

                    {/* Principles */}
                    <div className="relative mt-11 grid gap-3">
                        {principles.map((item) => (
                            <div
                                key={item.number}
                                className="group relative grid grid-cols-[48px_1fr] items-start gap-4 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0D121D]/75 p-5 transition-all duration-300 hover:border-[#2F7BFF]/35 hover:bg-[#101A2B]"
                            >
                                {/* Hover accent */}
                                <div className="absolute inset-y-0 left-0 w-[2px] scale-y-0 bg-[#2F7BFF] transition-transform duration-300 group-hover:scale-y-100" />

                                {/* Number */}
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#2F7BFF]/20 bg-[#2F7BFF]/[0.09] text-xs font-semibold tracking-wider text-[#A9C7FF] transition-colors group-hover:bg-[#2F7BFF]/20">
                                    {item.number}
                                </div>

                                {/* Content */}
                                <div className="pt-0.5">
                                    <h3 className="text-[15px] font-semibold tracking-tight text-white transition-colors group-hover:text-[#A9C7FF]">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 max-w-md text-[13px] leading-[1.8] text-[#929EB1]">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom signature */}
                    <div className="relative mt-7 flex items-center justify-between border-t border-white/[0.08] pt-5">
                        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">
                            MindSpace · A different perspective
                        </span>
                        
                    </div>
                </div>
            </div>
        </section>
    );
}
