"use client";

import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";

/* -------------------------------------------------------------------------- */
/* Types and editable content                                                 */
/* -------------------------------------------------------------------------- */

type AboutThemeName = "midnight" | "peach" | "split";

interface AboutStat {
    value: string;
    label: string;
}

interface AboutContent {
    eyebrow: string;
    headlineLine1: string;
    headlineLine2: string;
    paragraph: string;
    stats: AboutStat[];
    ticker: string[];
    cta: string;
    badge: string;
    image: string;
    imageAlt: string;
}

const DEFAULT_CONTENT: AboutContent = {
    eyebrow: "A LITTLE ABOUT US",
    headlineLine1: "We turn bold",
    headlineLine2: "ideas into impact.",
    paragraph:
        "MindSpace is a creative digital studio shaping thoughtful brands, meaningful experiences, and high-performing digital products. We bring strategy, design, and technology together to make every interaction count.",
    stats: [
        { value: "08+", label: "Years of making" },
        { value: "120+", label: "Projects delivered" },
        { value: "40+", label: "Partners in progress" },
        { value: "12", label: "Industry recognitions" },
    ],
    ticker: ["Strategy", "Brand identity", "Digital experiences", "Development", "Motion"],
    cta: "Get to know us",
    badge: "Independent creative studio",
    image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=85&auto=format&fit=crop",
    imageAlt: "Creative team collaborating around a table",
};

const EASE = [0.22, 1, 0.36, 1] as const;

const reveal = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
};

/* -------------------------------------------------------------------------- */
/* Small visual components                                                    */
/* -------------------------------------------------------------------------- */

function Eyebrow({ children }: { children: string }) {
    return (
        <div className="inline-flex items-center gap-[10px] text-[#80ADFF] text-[10px] font-bold tracking-[0.22em] uppercase">
            <span className="w-[6px] h-[6px] rounded-full bg-[#2F7BFF] shadow-[0_0_14px_#2F7BFF]" />
            <span>{children}</span>
        </div>
    );
}

function StatItem({ stat, index }: { stat: AboutStat; index: number }) {
    return (
        <motion.div
            className="relative flex gap-3 items-start pt-4 pb-4 pr-3 md:pl-4 md:border-l border-white/10 first:border-l-0 first:pl-0 max-md:border-t max-md:first:border-t-0"
            variants={reveal}
        >
            <span className="pt-1 text-[#80ADFF] text-[9px] tracking-[0.1em]">
                0{index + 1}
            </span>
            <div>
                <div className="text-white text-[clamp(24px,3vw,38px)] font-semibold tracking-[-0.055em] leading-none tabular-nums">
                    {stat.value}
                </div>
                <div className="mt-1.5 text-[#9AA6BA] text-[10px] leading-tight tracking-[0.08em] uppercase">
                    {stat.label}
                </div>
            </div>
        </motion.div>
    );
}

function Marquee({ items }: { items: string[] }) {
    if (!items.length) return null;
    const loop = [...items, ...items];

    return (
        <div
            className="mt-3 overflow-hidden border-b border-white/10 pb-3 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
            aria-label={`Our capabilities: ${items.join(", ")}`}
        >
            <div className="flex w-max animate-[scroll_30s_linear_infinite] hover:[animation-play-state:paused]">
                {loop.map((item, index) => (
                    <span
                        className="inline-flex items-center gap-7 pr-7 text-[#9AA6BA] text-[10px] font-semibold tracking-[0.16em] uppercase whitespace-nowrap"
                        key={`${item}-${index}`}
                    >
                        {item}
                        <span aria-hidden="true" className="text-[#2F7BFF] text-sm">
                            ✳
                        </span>
                    </span>
                ))}
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Main component                                                             */
/* -------------------------------------------------------------------------- */

interface AboutProps {
    theme?: AboutThemeName;
    content?: Partial<AboutContent>;
    id?: string;
}

export default function About({ content, id = "about" }: AboutProps) {
    const c: AboutContent = { ...DEFAULT_CONTENT, ...content };
    const visualRef = useRef<HTMLDivElement | null>(null);
    const inView = useInView(visualRef, { once: true, amount: 0.2 });

    const pointerX = useMotionValue(0);
    const pointerY = useMotionValue(0);
    const smoothX = useSpring(pointerX, { stiffness: 90, damping: 22 });
    const smoothY = useSpring(pointerY, { stiffness: 90, damping: 22 });
    const imageX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
    const imageY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

    const handleMove = (event: MouseEvent<HTMLDivElement>) => {
        const rect = visualRef.current?.getBoundingClientRect();
        if (!rect) return;
        pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
        pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
    };

    const resetPointer = () => {
        pointerX.set(0);
        pointerY.set(0);
    };

    return (
        <>
            <style>{`
                @keyframes scroll {
                    to { transform: translateX(-50%); }
                }
            `}</style>
            <section
                id={id}
                className="relative isolate w-full overflow-hidden bg-[#080B13] text-[#F5F7FC] px-[clamp(18px,5vw,80px)] pt-[clamp(60px,7vw,96px)] pb-6"
                aria-labelledby={`${id}-heading`}
            >
                {/* Background glow + grid */}
                <div className="absolute -z-10 w-[min(46vw,600px)] aspect-square -top-[30%] -right-[18%] rounded-full bg-[#2F7BFF] blur-[160px] opacity-[0.12] pointer-events-none" />
                <div className="absolute -z-10 inset-0 opacity-[0.16] pointer-events-none bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />

                <div className="relative z-10 max-w-[1440px] mx-auto">
                    {/* Topline */}
                    <motion.div
                        className="flex justify-between items-center gap-4 mb-[clamp(24px,3.4vw,44px)] max-sm:items-start"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        <div className="flex max-w-7xl items-center gap-3">
                            <span className="h-px w-8 bg-[#2F7BFF]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#A9C7FF]">
                                A Little About Us
                            </span>
                            <span className="h-px max-w-20 flex-1 bg-white/10" />
                        </div>
                        <motion.span
                            className="text-[#9AA6BA] text-[10px] tracking-[0.08em] uppercase max-sm:max-w-[100px] max-sm:text-right max-sm:leading-relaxed"
                            variants={reveal}
                        >
                            Independent minds. Shared ambition.
                        </motion.span>
                    </motion.div>

                    {/* Hero text */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-[minmax(0,1.25fr)_minmax(240px,.65fr)] items-end gap-[clamp(20px,4vw,64px)] mb-[clamp(22px,3.2vw,42px)]"
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.25 }}
                    >
                        <h2
                            id={`${id}-heading`}
                            className="max-w-[900px] m-0 text-[clamp(38px,6.4vw,80px)] leading-[0.94] tracking-[-0.055em] font-[650] max-sm:text-[clamp(36px,11vw,58px)]"
                        >
                            <span className="block overflow-hidden pb-[0.06em]">
                                <motion.span variants={reveal}>{c.headlineLine1}</motion.span>
                            </span>
                            <span className="block overflow-hidden pb-[0.06em]">
                                <motion.span
                                    className="text-[#80ADFF] italic font-medium"
                                    variants={reveal}
                                >
                                    {c.headlineLine2}
                                </motion.span>
                            </span>
                        </h2>
                        <motion.div
                            className="max-w-[360px] pb-1 max-md:max-w-[560px]"
                            variants={reveal}
                        >
                            <p className="m-0 text-[#9AA6BA] text-[clamp(13px,1.05vw,15px)] leading-[1.7]">
                                {c.paragraph}
                            </p>
                            <a
                                className="group inline-flex items-center gap-3 mt-4 pb-1.5 text-[#F5F7FC] no-underline border-b border-[#2F7BFF] text-[12px] font-[650] tracking-[0.04em] transition-all duration-300 hover:gap-4 hover:text-[#80ADFF]"
                                href="#contact"
                            >
                                {c.cta}
                                <span className="text-[#80ADFF] text-base" aria-hidden="true">
                                    ↗
                                </span>
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Visual / image */}
                    <motion.div
                        ref={visualRef}
                        className="relative h-[clamp(210px,26vw,320px)] max-md:h-[clamp(210px,40vw,300px)] max-sm:h-[56vw] max-sm:min-h-[210px] max-sm:max-h-[300px]"
                        onMouseMove={handleMove}
                        onMouseLeave={resetPointer}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.9, ease: EASE }}
                    >
                        <motion.div
                            className="absolute inset-0 right-[4%] overflow-hidden rounded-[4px] bg-[#111827] max-sm:right-[10px]"
                            style={{ x: imageX, y: imageY }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#040810]/75 z-10 pointer-events-none" />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <motion.img
                                className="w-full h-full block object-cover saturate-[0.78]"
                                src={c.image}
                                alt={c.imageAlt}
                                loading="lazy"
                                initial={{ scale: 1.1 }}
                                animate={inView ? { scale: 1.02 } : { scale: 1.1 }}
                                transition={{ duration: 1.3, ease: EASE }}
                            />
                            <div className="absolute z-20 left-[clamp(16px,3vw,36px)] bottom-[clamp(14px,2.4vw,26px)] flex flex-col gap-1.5">
                                <small className="text-white/65 text-[9px] tracking-[0.2em] uppercase">
                                    Curiosity, crafted into reality
                                </small>
                                <strong className="max-w-[300px] text-white text-[clamp(16px,1.9vw,26px)] leading-[1.06] tracking-[-0.03em] font-semibold">
                                    Good work starts with a different point of view.
                                </strong>
                            </div>
                        </motion.div>

                        {/* Floating card */}
                        <motion.div
                            className="absolute z-30 right-0 top-[10%] w-[clamp(128px,14vw,168px)] p-4 text-[#F5F7FC] bg-[#111827] border border-white/10 backdrop-blur-xl shadow-[0_18px_50px_rgba(0,0,0,0.28)] max-sm:top-[6%] max-sm:p-3 max-sm:w-[118px]"
                            initial={{ opacity: 0, x: 20 }}
                            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                            transition={{ delay: 0.3, duration: 0.7, ease: EASE }}
                        >
                            <span className="block text-[#80ADFF] text-[9px] tracking-[0.18em] uppercase">
                                {c.badge}
                            </span>
                            <strong className="block mt-3 text-[clamp(24px,3vw,36px)] leading-none tracking-[-0.05em] max-sm:mt-2">
                                ∞
                            </strong>
                            <p className="mt-1.5 text-[#9AA6BA] text-[10px] leading-relaxed">
                                Always exploring. Always making what's next.
                            </p>
                        </motion.div>

                        {/* Rotating badge */}
                        <motion.div
                            className="absolute z-30 right-0 bottom-[12%] w-[58px] h-[58px] grid place-items-center rounded-full text-white bg-[#2F7BFF] shadow-[0_10px_30px_rgba(47,123,255,0.35)] text-lg max-sm:w-[44px] max-sm:h-[44px] max-sm:text-sm"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                            aria-hidden="true"
                        >
                            ✳
                        </motion.div>
                    </motion.div>

                    {/* Stats */}
                    {c.stats.length > 0 && (
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-t border-b border-white/10 mt-[clamp(20px,3vw,38px)]"
                            variants={stagger}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.25 }}
                        >
                            {c.stats.map((stat, index) => (
                                <StatItem key={`${stat.label}-${index}`} stat={stat} index={index} />
                            ))}
                        </motion.div>
                    )}

                    {/* Marquee */}
                    <Marquee items={c.ticker} />
                </div>
            </section>
        </>
    );
}