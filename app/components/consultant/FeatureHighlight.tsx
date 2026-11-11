"use client";

export default function FeatureHighlight() {
    return (
        <section className="relative overflow-hidden bg-[#07090F] px-5 py-24 text-white sm:px-8 lg:py-32">
            {/* Ambient background */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2F7BFF]/[0.08] blur-[150px]" />

            <div className="relative mx-auto max-w-[1400px]">
                {/* Section heading */}
                <div className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
                    <div>
                        <div className="mx-auto mb-10 flex max-w-7xl items-center gap-3 px-6 md:mx-0 md:px-0">
                            <span className="h-px w-9 bg-[#2F7BFF]" />
                            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A9C7FF]">
                                Beyond The Classroom
                            </span>
                            <span className="h-px max-w-24 flex-1 bg-white/10" />
                        </div>
                        <h2 className="max-w-3xl text-5xl font-medium leading-[0.98] tracking-[-0.065em] sm:text-6xl lg:text-[88px]">
                            Learning meets
                            <span className="block text-[#7FAEFF]">
                                new possibilities.
                            </span>
                        </h2>
                    </div>

                    <p className="max-w-[300px] pb-1 text-sm leading-7 text-[#A0A9BA]">
                        Discover a world of opportunities through education, experience,
                        and global connections.
                    </p>
                </div>

                {/* Cinematic framed feature */}
                <div className="relative">
                    {/* Outer frame */}
                    <div className="relative rounded-[28px] border border-white/[0.12] bg-[#0D121D] p-2 sm:rounded-[36px] sm:p-3">

                        {/* Video frame */}
                        <div className="group relative min-h-[400px] overflow-hidden rounded-[21px] bg-[#111B2C] sm:min-h-[540px] sm:rounded-[28px] lg:min-h-[640px]">
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
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050811]/90 via-[#050811]/15 to-[#050811]/10" />

                            {/* Blue frame detail */}
                            <div className="pointer-events-none absolute inset-0 rounded-[21px] border border-white/[0.10] sm:rounded-[28px]" />

                            {/* Top corner label */}
                            <div className="absolute left-5 top-5 sm:left-8 sm:top-8">
                                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/90 backdrop-blur-xl">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#2F7BFF]" />
                                    MindSpace Experiences
                                </span>
                            </div>

                            {/* Bottom content */}
                            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-7 p-6 sm:p-10 lg:flex-row lg:items-end lg:justify-between lg:p-14">

                                <div className="max-w-2xl">
                                    <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.24em] text-[#A9C7FF]">
                                        Explore without limits
                                    </span>

                                    <h3 className="text-4xl font-medium leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-[76px]">
                                        Your next chapter
                                        <span className="block text-[#A9C7FF]">
                                            starts here.
                                        </span>
                                    </h3>
                                </div>

                                {/* Minimal information box */}
                                <div className="w-full max-w-[260px] rounded-2xl border border-white/20 bg-[#080D18]/65 p-5 backdrop-blur-xl lg:mb-1">
                                    <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A9C7FF]">
                                        Discover
                                    </span>

                                    <div className="flex flex-wrap gap-2">
                                        {["Global Education", "New Cultures", "New Opportunities"].map(
                                            (tag) => (
                                                <span
                                                    key={tag}
                                                    className="rounded-full border border-[#2F7BFF]/30 bg-[#2F7BFF]/10 px-3 py-2 text-[11px] text-white/85"
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

                    {/* Small frame accent */}
                    <div className="absolute -bottom-2 right-10 h-[2px] w-24 rounded-full bg-[#2F7BFF] sm:right-16 sm:w-36" />
                </div>
            </div>
        </section>
    );
}