"use client";

import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";

/* -------------------------------------------------------------------------- */
/* Types and editable content                                                  */
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
    hidden: { opacity: 0, y: 34 },
    show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
};

/* -------------------------------------------------------------------------- */
/* Small visual components                                                     */
/* -------------------------------------------------------------------------- */

function Eyebrow({ children }: { children: string }) {
    return (
        <div className="inline-flex items-center gap-[11px] text-[#80ADFF] text-[11px] font-bold tracking-[0.22em] uppercase">
            <span className="w-[7px] h-[7px] rounded-full bg-[#2F7BFF] shadow-[0_0_18px_#2F7BFF]" />
            <span>{children}</span>
        </div>
    );
}

function StatItem({ stat, index }: { stat: AboutStat; index: number }) {
    return (
        <motion.div
            className="relative flex gap-5 items-start pt-7 pb-[30px] pr-[clamp(12px,2.5vw,34px)] md:pl-[clamp(12px,2.5vw,34px)] md:border-l border-white/10 first:border-l-0 first:pl-0 max-md:border-t max-md:first:border-t-0"
            variants={reveal}
        >
            <span className="pt-2 text-[#80ADFF] text-[10px] tracking-[0.1em]">0{index + 1}</span>
            <div>
                <div className="text-white text-[clamp(34px,4.5vw,58px)] font-semibold tracking-[-0.065em] leading-none tabular-nums">
                    {stat.value}
                </div>
                <div className="mt-2.5 text-[#9AA6BA] text-[11px] leading-relaxed tracking-[0.1em] uppercase">
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
            className="mt-7 overflow-hidden border-b border-white/10 pb-[22px] [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
            aria-label={`Our capabilities: ${items.join(", ")}`}
        >
            <div className="flex w-max animate-[scroll_34s_linear_infinite] hover:[animation-play-state:paused]">
                {loop.map((item, index) => (
                    <span
                        className="inline-flex items-center gap-[34px] pr-[34px] text-[#9AA6BA] text-[11px] font-semibold tracking-[0.18em] uppercase whitespace-nowrap"
                        key={`${item}-${index}`}
                    >
                        {item}
                        <span aria-hidden="true" className="text-[#2F7BFF] text-base">✳</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Main component                                                              */
/* -------------------------------------------------------------------------- */

interface AboutProps {
    theme?: AboutThemeName;
    content?: Partial<AboutContent>;
    id?: string;
}

export default function About({
    content,
    id = "about",
}: AboutProps) {
    const c: AboutContent = { ...DEFAULT_CONTENT, ...content };
    const visualRef = useRef<HTMLDivElement | null>(null);
    const inView = useInView(visualRef, { once: true, amount: 0.2 });

    const pointerX = useMotionValue(0);
    const pointerY = useMotionValue(0);
    const smoothX = useSpring(pointerX, { stiffness: 90, damping: 22 });
    const smoothY = useSpring(pointerY, { stiffness: 90, damping: 22 });
    const imageX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
    const imageY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

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
                className="relative isolate w-full overflow-hidden bg-[#080B13] text-[#F5F7FC] px-[clamp(22px,6vw,100px)] pt-[clamp(88px,10vw,148px)] pb-[42px]"
                aria-labelledby={`${id}-heading`}
            >
                {/* Background Glow & Grid */}
                <div className="absolute -z-10 w-[min(58vw,760px)] aspect-square -top-[30%] -right-[18%] rounded-full bg-[#2F7BFF] blur-[180px] opacity-[0.13] pointer-events-none" />
                <div className="absolute -z-10 inset-0 opacity-[0.18] pointer-events-none bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />

                <div className="relative z-10 max-w-[1440px] mx-auto">
                    {/* Topline */}
                    <motion.div
                        className="flex justify-between items-center gap-6 mb-[clamp(46px,7vw,92px)] max-sm:items-start max-sm:mb-[42px]"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        <div className="mx-autmb-10 mb-4  flex max-w-7xl items-center gap-3 px-6">
                            <span className="h-px w-9 bg-[#2F7BFF]" />
                            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A9C7FF]">
                                A Little About Us
                            </span>
                            <span className="h-px max-w-24 flex-1 bg-white/10" />
                        </div>
                        <motion.span
                            className="text-[#9AA6BA] text-xs tracking-[0.08em] uppercase max-sm:max-w-[110px] max-sm:text-right max-sm:leading-relaxed"
                            variants={reveal}
                        >
                            Independent minds. Shared ambition.
                        </motion.span>
                    </motion.div>

                    {/* Hero Text */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-[minmax(0,1.25fr)_minmax(260px,.65fr)] items-end gap-[clamp(28px,6vw,100px)] mb-[clamp(42px,6vw,76px)]"
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.25 }}
                    >
                        <h2 id={`${id}-heading`} className="max-w-[980px] m-0 text-[clamp(54px,8.5vw,132px)] leading-[0.91] tracking-[-0.075em] font-[650] max-sm:text-[clamp(49px,15vw,76px)]">
                            <span className="block overflow-hidden pb-[0.08em]">
                                <motion.span variants={reveal}>{c.headlineLine1}</motion.span>
                            </span>
                            <span className="block overflow-hidden pb-[0.08em]">
                                <motion.span className="text-[#80ADFF] italic font-medium" variants={reveal}>{c.headlineLine2}</motion.span>
                            </span>
                        </h2>
                        <motion.div className="max-w-[390px] pb-2.5 max-md:max-w-[580px]" variants={reveal}>
                            <p className="m-0 text-[#9AA6BA] text-[clamp(15px,1.25vw,18px)] leading-[1.85]">{c.paragraph}</p>
                            <a className="group inline-flex items-center gap-[14px] mt-7 pb-2.5 text-[#F5F7FC] no-underline border-b border-[#2F7BFF] text-[13px] font-[650] tracking-[0.04em] transition-all duration-300 hover:gap-[22px] hover:text-[#80ADFF]" href="#contact">
                                {c.cta}<span className="text-[#80ADFF] text-lg" aria-hidden="true">↗</span>
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Visual / Image Section */}
                    <motion.div
                        ref={visualRef}
                        className="relative min-h-[360px] h-[clamp(360px,48vw,650px)] max-md:h-[clamp(360px,68vw,560px)] max-sm:min-h-[390px] max-sm:h-[112vw] max-sm:max-h-[520px]"
                        onMouseMove={handleMove}
                        onMouseLeave={resetPointer}
                        initial={{ opacity: 0, y: 42 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 1, ease: EASE }}
                    >
                        <motion.div className="absolute inset-0 right-[5%] overflow-hidden rounded-[5px] bg-[#111827] max-sm:right-[12px]" style={{ x: imageX, y: imageY }}>
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#040810]/75 z-10 pointer-events-none" />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <motion.img
                                className="w-full h-full block object-cover saturate-[0.78]"
                                src={c.image}
                                alt={c.imageAlt}
                                loading="lazy"
                                initial={{ scale: 1.12 }}
                                animate={inView ? { scale: 1.04 } : { scale: 1.12 }}
                                transition={{ duration: 1.5, ease: EASE }}
                            />
                            <div className="absolute z-20 left-[clamp(20px,4vw,54px)] bottom-[clamp(22px,4vw,48px)] flex flex-col gap-2">
                                <small className="text-white/68 text-[10px] tracking-[0.2em] uppercase">Curiosity, crafted into reality</small>
                                <strong className="max-w-[340px] text-white text-[clamp(24px,3vw,42px)] leading-[1.05] tracking-[-0.045em] font-semibold">Good work starts with a different point of view.</strong>
                            </div>
                        </motion.div>

                        {/* Floating Card */}
                        <motion.div
                            className="absolute z-30 right-0 top-[12%] w-[clamp(150px,19vw,238px)] p-[22px] text-[#F5F7FC] bg-[#111827] border border-white/10 backdrop-blur-xl shadow-[0_22px_70px_rgba(0,0,0,0.25)] max-sm:top-[8%] max-sm:p-[15px] max-sm:w-[145px]"
                            initial={{ opacity: 0, x: 24 }}
                            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
                            transition={{ delay: .35, duration: .8, ease: EASE }}
                        >
                            <span className="block text-[#80ADFF] text-[10px] tracking-[0.18em] uppercase">{c.badge}</span>
                            <strong className="block mt-[18px] text-[clamp(34px,4vw,54px)] leading-none tracking-[-0.06em] max-sm:mt-3">∞</strong>
                            <p className="mt-[9px] text-[#9AA6BA] text-xs leading-relaxed">Always exploring. Always making what’s next.</p>
                        </motion.div>

                        {/* Rotating Badge */}
                        <motion.div
                            className="absolute z-30 right-0 bottom-[10%] w-[76px] h-[76px] grid place-items-center rounded-full text-white bg-[#2F7BFF] shadow-[0_12px_40px_rgba(47,123,255,0.35)] text-[25px] max-sm:w-[58px] max-sm:h-[58px] max-sm:text-xl"
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
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-t border-b border-white/10 mt-[clamp(58px,8vw,108px)] max-sm:mt-[58px]"
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