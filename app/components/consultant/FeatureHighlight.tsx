
"use client";

const discoverItems = [
    "Build practical knowledge",
    "Strengthen your confidence",
    "Prepare for your next professional opportunity",
];

export default function FeatureHighlight() {
    return (
        <section className="relative isolate w-full overflow-hidden bg-[#07090F] px-4 py-16 font-questrial text-white sm:px-6 sm:py-20 md:px-8 md:py-24 lg:py-32">
            {/* Ambient background */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2F7BFF]/[0.08] blur-[100px] sm:h-[500px] sm:w-[700px] sm:blur-[150px]"
            />

            <div className="relative mx-auto w-full max-w-[1400px]">
                {/* Section heading */}
                <div className="mb-10 flex flex-col gap-6 sm:mb-12 md:mb-16 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
                    <div className="min-w-0">
                        {/* Eyebrow */}
                        <div className="mb-7 flex items-center gap-3 sm:mb-9">
                            <span className="h-px w-7 shrink-0 bg-[#2F7BFF] sm:w-9" />

                            <span className="font-questrial text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A9C7FF] sm:text-[11px] sm:tracking-[0.25em]">
                                Beyond The Classroom
                            </span>

                            <span className="h-px max-w-24 flex-1 bg-white/10" />
                        </div>

                        {/* Heading */}
                        <h2 className="max-w-3xl font-questrial text-[clamp(36px,7vw,72px)] font-[600] leading-[0.98] tracking-[-0.055em]">
                            <span className="block pb-[0.08em]">
                                Practical Skills
                            </span>

                            <span className="block pb-[0.08em] font-medium italic text-[#80ADFF]">
                                Professional Progress
                            </span>
                        </h2>
                    </div>

                    {/* Description */}
                    <p className="max-w-[420px] font-questrial text-[clamp(14px,1.25vw,18px)] leading-[1.8] text-white/65 lg:max-w-[300px] lg:pb-2">
                        Discover a world of opportunities through education,
                        experience, and global connections.
                    </p>
                </div>

                {/* Cinematic feature frame */}
                <div className="relative w-full">
                    {/* Outer frame */}
                    <div className="rounded-[22px] bg-gradient-to-br from-white/[0.14] via-white/[0.04] to-white/[0.10] p-px sm:rounded-[30px] lg:rounded-[36px]">
                        <div className="relative rounded-[21px] bg-[#0D121D] p-1.5 sm:rounded-[29px] sm:p-2 lg:rounded-[35px] lg:p-3">

                            {/* Corner brackets */}
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute left-3 top-3 z-20 h-5 w-5 rounded-tl-[5px] border-l-2 border-t-2 border-[#2F7BFF]/70 sm:left-4 sm:top-4 sm:h-7 sm:w-7 lg:h-8 lg:w-8"
                            />

                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute right-3 top-3 z-20 h-5 w-5 rounded-tr-[5px] border-r-2 border-t-2 border-[#2F7BFF]/70 sm:right-4 sm:top-4 sm:h-7 sm:w-7 lg:h-8 lg:w-8"
                            />

                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute bottom-3 left-3 z-20 h-5 w-5 rounded-bl-[5px] border-b-2 border-l-2 border-[#2F7BFF]/70 sm:bottom-4 sm:left-4 sm:h-7 sm:w-7 lg:h-8 lg:w-8"
                            />

                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute bottom-3 right-3 z-20 h-5 w-5 rounded-br-[5px] border-b-2 border-r-2 border-[#2F7BFF]/70 sm:bottom-4 sm:right-4 sm:h-7 sm:w-7 lg:h-8 lg:w-8"
                            />

                            {/* Video frame */}
                            <div className="group relative min-h-[560px] overflow-hidden rounded-[16px] bg-[#111B2C] sm:min-h-[520px] sm:rounded-[23px] md:min-h-[560px] lg:min-h-[480px]">

                                {/* Background video */}
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                    poster="/feature-bg.png"
                                    className="absolute inset-0 h-full w-full object-cover"
                                >
                                    <source
                                        src="/videoframe1.mp4"
                                        type="video/mp4"
                                    />
                                </video>

                                {/* Image contrast */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/35 to-[#050811]/15" />

                                {/* Inner glow */}
                                <div className="pointer-events-none absolute inset-0 rounded-[16px] shadow-[inset_0_0_35px_rgba(47,123,255,0.12),inset_0_1px_0_rgba(255,255,255,0.08)] sm:rounded-[23px] sm:shadow-[inset_0_0_60px_rgba(47,123,255,0.15),inset_0_1px_0_rgba(255,255,255,0.08)]" />

                                {/* Inner border */}
                                <div className="pointer-events-none absolute inset-0 rounded-[16px] border border-white/[0.10] sm:rounded-[23px]" />

                                {/* Top label */}
                                <div className="absolute left-4 top-5 z-10 sm:left-7 sm:top-7 lg:left-8 lg:top-8">
                                    <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-2 font-questrial text-[9px] font-medium uppercase tracking-[0.15em] text-white/90 backdrop-blur-xl sm:px-4 sm:text-[10px] sm:tracking-[0.2em]">
                                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2F7BFF]" />
                                        MindSpace Experiences
                                    </span>
                                </div>

                                {/* Bottom content */}
                                <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-6 p-5 sm:gap-7 sm:p-8 md:p-10 lg:flex-row lg:items-end lg:justify-between lg:gap-8 lg:p-12">

                                    {/* Main message */}
                                    <div className="max-w-2xl min-w-0">
                                        <span className="mb-3 block font-questrial text-[9px] font-semibold uppercase tracking-[0.2em] text-[#A9C7FF] sm:mb-4 sm:text-[11px] sm:tracking-[0.24em]">
                                            Explore without limits
                                        </span>

                                        <h3 className="font-questrial text-[clamp(32px,6vw,64px)] font-medium leading-[1.02] tracking-[-0.055em]">
                                            <span className="block">
                                                Your next chapter
                                            </span>

                                            <span className="block font-medium italic text-[#80ADFF]">
                                                starts here.
                                            </span>
                                        </h3>
                                    </div>

                                    {/* Discover panel */}
                                    <div className="w-full rounded-xl border border-white/20 bg-[#080D18]/75 p-4 backdrop-blur-xl sm:rounded-2xl sm:p-5 lg:max-w-[280px] lg:shrink-0 lg:mb-1">
                                        <span className="mb-3 block font-questrial text-[9px] font-semibold uppercase tracking-[0.2em] text-[#A9C7FF] sm:text-[10px] sm:tracking-[0.22em]">
                                            Discover
                                        </span>

                                        <div className="flex flex-col gap-2 sm:gap-2.5">
                                            {discoverItems.map((tag, index) => (
                                                <div
                                                    key={tag}
                                                    className="flex items-start gap-2.5"
                                                >
                                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2F7BFF]" />

                                                    <span className="font-questrial text-[11px] leading-[1.6] text-white/80 sm:text-[12px]">
                                                        {tag}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
