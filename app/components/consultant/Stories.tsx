"use client";

import Image from "next/image";
import { stories, storiesContent } from "./data";
import { SectionBadge } from "./Services";

export default function Stories() {
    return (
        <section id="stories" className="relative overflow-hidden bg-[#0B0B0C] py-24 sm:py-32">

            {/* Ambient Background Glow */}
            <div aria-hidden="true" className="absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2dd4bf]/5 blur-[120px]" />

            <div className="mx-auto max-w-[90rem] px-8 lg:px-24">

                {/* Centered Header */}
                <div className="mx-auto mb-16 max-w-3xl text-center lg:mb-24">
                    <SectionBadge text="Student Success" />
                    <h2 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
                        {storiesContent.heading}
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/50">
                        {storiesContent.body}
                    </p>
                </div>

                {/* Staggered Card Grid */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {stories.map((story, index) => {
                        // We apply a slight vertical stagger to the middle card on desktop
                        const isStaggered = index === 1;

                        return (
                            <div
                                key={story.id}
                                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#151517] shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-[#2dd4bf]/40 hover:shadow-[0_20px_40px_-15px_rgba(45,212,191,0.15)] ${isStaggered ? "md:translate-y-8" : ""
                                    }`}
                            >
                                {/* Image */}
                                <div className="relative h-[350px] w-full overflow-hidden">
                                    <Image
                                        src={story.image}
                                        alt={story.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Gradient to blend image into the text area */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#151517] via-[#151517]/20 to-transparent" />
                                </div>

                                {/* Content Area */}
                                <div className="relative flex flex-1 flex-col p-6 pt-2">

                                    {/* Quote Mark (Overlapping the image slightly) */}
                                    <div className="absolute -top-6 left-6 text-5xl font-serif leading-none text-[#2dd4bf] drop-shadow-md">
                                        “
                                    </div>

                                    {/* Quote Text */}
                                    <p className="mt-4 flex-1 text-sm leading-relaxed text-white/80">
                                        {story.quote}
                                    </p>

                                    {/* Divider */}
                                    <div className="my-6 h-px w-full bg-gradient-to-r from-white/10 to-transparent" />

                                    {/* Student Details */}
                                    <div className="mt-auto">
                                        <h3 className="font-display text-lg font-bold text-white transition-colors group-hover:text-[#2dd4bf]">
                                            {story.name}
                                        </h3>
                                        <p className="mt-1 text-xs font-medium text-white/50">
                                            {story.role}
                                        </p>
                                        <p className="mt-1 text-xs font-medium text-[#2dd4bf]">
                                            {story.location}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}