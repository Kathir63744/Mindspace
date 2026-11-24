"use client";

export default function FeatureHighlight() {
    return (
        <section className="relative overflow-hidden bg-[#07090F] px-5 py-24 font-questrial text-white sm:px-8 lg:py-32">
            {/* Ambient background */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2F7BFF]/[0.08] blur-[150px]" />

            <div className="relative mx-auto max-w-[1400px]">
                {/* Section heading */}
                <div className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
                    <div>
                        <div className="mx-auto mb-10 flex max-w-7xl items-center gap-3 px-6 md:mx-0 md:px-0">
                            <span className="h-px w-9 bg-[#2F7BFF]" />
                            <span className="font-questrial text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A9C7FF]">
                                Beyond The Classroom
                            </span>
                            <span className="h-px max-w-24 flex-1 bg-white/10" />
                        </div>
                        <h2 className="max-w-3xl font-questrial text-[clamp(38px,6.4vw,72px)] leading-[0.94] tracking-[-0.055em] font-[600] max-sm:text-[clamp(36px,11vw,58px)]">
                            <span className="block pb-[0.10em]">
                                Practical Skills
                            </span>
                            <span className="block pb-[0.10em] text-[#80ADFF] italic font-medium">
                                Professional Progress
                            </span>
                        </h2>
                    </div>

                    <p className="max-w-[300px] pb-1 font-questrial text-[clamp(15px,1.25vw,18px)] leading-[1.85] text-white/90">
                        Discover a world of opportunities through education, experience,
                        and global connections.
                    </p>
                </div>

                {/* Cinematic framed feature — shorter height, crafted edges */}
                <div className="relative">
                    {/* Outer decorative frame with layered edges */}
                    <div className="relative rounded-[28px] bg-gradient-to-br from-white/[0.14] via-white/[0.04] to-white/[0.10] p-[1px] sm:rounded-[36px]">
                        <div className="relative rounded-[27px] bg-[#0D121D] p-2 sm:rounded-[35px] sm:p-3">

                            {/* Corner brackets — four small L-shapes */}
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute left-3 top-3 h-6 w-6 border-l-2 border-t-2 border-[#2F7BFF]/70 rounded-tl-[6px] sm:left-4 sm:top-4 sm:h-8 sm:w-8"
                            />
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute right-3 top-3 h-6 w-6 border-r-2 border-t-2 border-[#2F7BFF]/70 rounded-tr-[6px] sm:right-4 sm:top-4 sm:h-8 sm:w-8"
                            />
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute left-3 bottom-3 h-6 w-6 border-l-2 border-b-2 border-[#2F7BFF]/70 rounded-bl-[6px] sm:left-4 sm:bottom-4 sm:h-8 sm:w-8"
                            />
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute right-3 bottom-3 h-6 w-6 border-r-2 border-b-2 border-[#2F7BFF]/70 rounded-br-[6px] sm:right-4 sm:bottom-4 sm:h-8 sm:w-8"
                            />

                            {/* Video frame — reduced height */}
                            <div className="group relative min-h-[340px] overflow-hidden rounded-[21px] bg-[#111B2C] sm:min-h-[400px] sm:rounded-[28px] lg:min-h-[480px]">
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                    poster="/feature-bg.png"
                                    className="absolute inset-0 h-full w-full object-cover"
                                >
                                    <source src="/videoframe1.mp4" type="video/mp4" />
                                </video>

                                {/* Image contrast */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050811]/90 via-[#050811]/15 to-[#050811]/10" />

                                {/* Inner soft glow ring */}
                                <div className="pointer-events-none absolute inset-0 rounded-[21px] shadow-[inset_0_0_60px_rgba(47,123,255,0.15),inset_0_1px_0_rgba(255,255,255,0.08)] sm:rounded-[28px]" />

                                {/* Thin inner border */}
                                <div className="pointer-events-none absolute inset-0 rounded-[21px] border border-white/[0.10] sm:rounded-[28px]" />

                                {/* Top corner label */}
                                <div className="absolute left-5 top-5 sm:left-8 sm:top-8">
                                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 font-questrial text-[10px] font-medium uppercase tracking-[0.2em] text-white/90 backdrop-blur-xl">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#2F7BFF]" />
                                        MindSpace Experiences
                                    </span>
                                </div>

                                {/* Bottom content */}
                                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-7 p-6 sm:p-10 lg:flex-row lg:items-end lg:justify-between lg:p-12">
                                    <div className="max-w-2xl">
                                        <span className="mb-4 block font-questrial text-[11px] font-semibold uppercase tracking-[0.24em] text-[#A9C7FF]">
                                            Explore without limits
                                        </span>

                                        <h3 className="font-questrial text-[clamp(2.2rem,4.6vw,4rem)] font-medium leading-[1.02] tracking-[-0.055em]">
                                            <span className="block">Your next chapter</span>
                                            <span className="block text-[#80ADFF] italic font-medium">
                                                starts here.
                                            </span>
                                        </h3>
                                    </div>

                                    {/* Minimal information box */}
                                    <div className="w-full max-w-[260px] rounded-2xl border border-white/20 bg-[#080D18]/65 p-5 backdrop-blur-xl lg:mb-1">
                                        <span className="mb-3 block font-questrial text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A9C7FF]">
                                            Discover
                                        </span>

                                        <div className="flex flex-wrap gap-4">
                                            {["Build practical knowledge", "Strengthen your confidence", "Prepare for your next professional opportunity"].map(
                                                (tag) => (
                                                    <span
                                                        key={tag}
                                                        className="rounded-full border border-[#2F7BFF]/30 bg-[#2F7BFF]/10 px-4 py-2 font-questrial text-[12px] text-white/85"
                                                    >
                                                        {tag}
                                                    </span>
                                                )
                                            )}
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