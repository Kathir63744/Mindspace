"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { stories, storiesContent } from "./data";

export default function Stories() {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const [progressKey, setProgressKey] = useState(0);

    const total = stories.length;
    const story = stories[active];

    const changeStory = useCallback((index: number) => {
        setActive(index);
        setProgressKey((key) => key + 1);
    }, []);

    const nextStory = useCallback(() => {
        setActive((current) => (current + 1) % total);
        setProgressKey((key) => key + 1);
    }, [total]);

    useEffect(() => {
        if (paused || total < 2) return;

        const timer = window.setInterval(nextStory, 5500);

        return () => window.clearInterval(timer);
    }, [paused, nextStory, total, progressKey]);

    if (!story) return null;

    return (
        <section
            id="stories"
            className="relative overflow-hidden bg-[#07090F] py-24 sm:py-32"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <style>{`
                @keyframes storyProgress {
                    from { transform: scaleX(0); }
                    to { transform: scaleX(1); }
                }
                @keyframes photoReveal {
                    from { opacity: .35; transform: scale(1.045); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes contentReveal {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            {/* Background atmosphere */}
            <div className="pointer-events-none absolute left-[-16rem] top-0 h-[520px] w-[520px] rounded-full bg-[#2F7BFF]/10 blur-[140px]" />
            <div className="pointer-events-none absolute bottom-0 right-[-16rem] h-[520px] w-[520px] rounded-full bg-[#2F7BFF]/10 blur-[140px]" />

            <div className="relative z-10 mx-auto max-w-[90rem] px-6 sm:px-8 lg:px-20">

                {/* Header */}
                <div className="mb-12 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
                    <div>
                        <span className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#A9C7FF] before:h-px before:w-6 before:bg-[#2F7BFF] before:content-['']">
                            Student experiences
                        </span>

                        <h2 className="mt-6 max-w-2xl font-display text-4xl font-medium leading-[1.08] tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">
                            Real journeys.
                            <span className="block text-[#A9C7FF]">
                                Real experiences.
                            </span>
                        </h2>
                    </div>

                    <p className="max-w-sm text-sm leading-7 text-white/50">
                        {storiesContent.body}
                    </p>
                </div>

                {/* Active story */}
                <div
                    className="relative grid min-h-[510px] overflow-hidden rounded-[18px] border border-white/13 bg-[#0D121D] grid-cols-1 md:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)]"
                    key={active}
                >
                    {/* Image */}
                    <div className="relative min-h-[320px] overflow-hidden bg-[#111827] sm:min-h-[390px] md:min-h-[510px]">
                        <Image
                            src={story.image}
                            alt={story.name}
                            fill
                            priority
                            sizes="(max-width: 760px) 100vw, 50vw"
                            className="object-cover object-[center_35%] animate-[photoReveal_.8s_cubic-bezier(.2,.7,.2,1)_both] motion-reduce:animate-none"
                        />

                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(5,9,17,.5),transparent_50%)]" />

                        <span className="absolute left-[25px] top-[25px] rounded-[30px] border border-white/24 bg-[#07090F]/42 px-3.5 py-2 text-[10px] tracking-[0.16em] text-white backdrop-blur-md">
                            STUDENT STORY
                        </span>

                        <span className="absolute bottom-[25px] right-[28px] text-xs tracking-[0.18em] text-white/80">
                            {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                        </span>

                        <div className="pointer-events-none absolute inset-[13px] rounded-xl border border-white/13" />
                    </div>

                    {/* Quote */}
                    <div className="flex flex-col justify-center p-6 animate-[contentReveal_.55s_ease_both] motion-reduce:animate-none sm:p-[30px_25px] md:p-[clamp(28px,4vw,65px)]">
                        <span className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#A9C7FF] before:h-px before:w-6 before:bg-[#2F7BFF] before:content-['']">
                            A student's perspective
                        </span>

                        <div className="mt-[30px] font-serif text-[82px] leading-[0.65] text-[#2F7BFF] md:mt-10">
                            “
                        </div>

                        <blockquote className="mt-5 text-[clamp(20px,2.2vw,29px)] font-medium leading-[1.5] tracking-[-0.035em] text-[#F3F5FA] max-md:text-[21px]">
                            {story.quote}
                        </blockquote>

                        <div className="mt-[38px] flex items-center gap-[15px] border-t border-white/12 pt-6">
                            <span className="h-[42px] w-[3px] rounded-[10px] bg-gradient-to-b from-[#2F7BFF] to-[#A9C7FF]" />

                            <div>
                                <h3 className="text-[15px] font-[650] text-white">
                                    {story.name}
                                </h3>

                                <p className="mt-[5px] text-[11px] leading-[1.7] text-[#A0A9BA]">
                                    {story.role}
                                    <br />
                                    {story.location}
                                </p>
                            </div>
                        </div>

                        <div className="absolute bottom-0 right-0 h-[3px] w-[90px] bg-gradient-to-r from-transparent to-[#2F7BFF]" />
                    </div>
                </div>

                {/* Progress and manual navigation */}
                <div className="mt-[27px] flex items-center justify-between gap-6 max-sm:gap-3">
                    <div className="flex flex-1 gap-[9px] max-sm:gap-[5px]">
                        {stories.map((item, index) => (
                            <button
                                key={item.id}
                                type="button"
                                aria-label={`Show story ${index + 1}`}
                                aria-current={index === active ? "true" : undefined}
                                onClick={() => changeStory(index)}
                                className="relative h-1 flex-1 cursor-pointer overflow-hidden rounded-[20px] bg-white/17"
                            >
                                <span
                                    key={`${index}-${progressKey}`}
                                    className={`absolute inset-0 origin-left bg-[#2F7BFF] ${index < active
                                            ? "scale-x-100"
                                            : index === active
                                                ? "animate-[storyProgress_5.5s_linear_forwards] motion-reduce:animate-none motion-reduce:scale-x-100"
                                                : "scale-x-0"
                                        }`}
                                />
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-[9px] whitespace-nowrap text-[11px] tracking-[0.1em] text-[#A0A9BA]">
                        <strong className="font-semibold text-[#A9C7FF]">
                            {String(active + 1).padStart(2, "0")}
                        </strong>
                        <span>/</span>
                        {String(total).padStart(2, "0")}
                    </div>
                </div>
            </div>
        </section>
    );
}