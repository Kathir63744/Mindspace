"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState, type CSSProperties } from "react";
import LogoIntro from "./LogoIntro";

/* ============================================================
   CONFIG — 13 slides across technology / training / careers
============================================================ */

type SlideKind = "video" | "photo";

type Clip = {
    kind: SlideKind;
    src: string;
    poster?: string;
    href?: string;
    caption?: string;
};

const CLIPS: Clip[] = [
    // Technology (4)
    { kind: "video", src: "/website-development-video.mp4", poster: "/website-development-poster.jpg", href: "/services/website-development", caption: "Websites" },
    { kind: "photo", src: "/website-development-poster.jpg", href: "/services/website-development", caption: "Websites" },
    { kind: "video", src: "/app-development-video.mp4", poster: "/app-development-poster.jpg", href: "/services/app-development", caption: "Mobile apps" },
    { kind: "photo", src: "/app-development-poster.jpg", href: "/services/app-development", caption: "Mobile apps" },
    { kind: "video", src: "/software-development-video.mp4", poster: "/software-development-poster.jpg", href: "/services/software-development", caption: "Custom software" },
    { kind: "photo", src: "/software-development-poster.jpg", href: "/services/software-development", caption: "Custom software" },

    // Training (4)
    {
        kind: "photo",
        src: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&q=80&auto=format&fit=crop",
        href: "/training/programming-foundations",
        caption: "Programming",
    },
    {
        kind: "photo",
        src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80&auto=format&fit=crop",
        href: "/training/web-development",
        caption: "Web dev",
    },
    {
        kind: "photo",
        src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80&auto=format&fit=crop",
        href: "/training/app-development",
        caption: "Mobile dev",
    },
    {
        kind: "photo",
        src: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&q=80&auto=format&fit=crop",
        href: "/training/cloud-devops",
        caption: "Cloud & DevOps",
    },

    // Careers (3)
    {
        kind: "photo",
        src: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&q=80&auto=format&fit=crop",
        href: "/careers/resume-linkedin",
        caption: "Resume",
    },
    {
        kind: "photo",
        src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=80&auto=format&fit=crop",
        href: "/careers/interview-coaching",
        caption: "Interview",
    },
    {
        kind: "photo",
        src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80&auto=format&fit=crop",
        href: "/careers/placement-support",
        caption: "Placement",
    },
];

const CLIP_DURATION_MS = 5000;

/* ============================================================
   FLIP TILE CONTENT
============================================================ */

const FLIP_TILES = [
    {
        pos: { left: 0, top: 0, width: 15, height: 47.6 },
        front: { word: "Business", label: "Websites, apps and custom software" },
        back: { word: "Startups", label: "Launch-ready products and platforms" },
        interval: 5200,
        offset: 2600,
    },
    {
        pos: { left: 68, top: 52.4, width: 15, height: 47.6 },
        front: { word: "Careers", label: "Placement, internships and jobs" },
        back: { word: "Learners", label: "Training, practice and certificates" },
        interval: 5200,
        offset: 4200,
    },
];

const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";
const MOVE_MS = 1100;

/* ============================================================
   HERO PHRASES
============================================================ */

const BLUE = "#8E9BFF";

const PHRASES = [
    { lead: "Build your ", blue: "business." },
    { lead: "Develop your ", blue: "skills." },
    { lead: "Advance your ", blue: "career." },
    { lead: "Ship with ", blue: "confidence." },
];

function TypewriterHeading({ start, reduced }: { start: boolean; reduced: boolean }) {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [blink, setBlink] = useState(true);

    const currentPhrase = PHRASES[index];
    const fullText = currentPhrase.lead + currentPhrase.blue;

    useEffect(() => {
        const timer = setInterval(() => setBlink((b) => !b), 500);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (!start || reduced) return;

        let timeout: ReturnType<typeof setTimeout>;

        if (isDeleting) {
            if (subIndex === 0) {
                setIsDeleting(false);
                setIndex((prev) => (prev + 1) % PHRASES.length);
            } else {
                timeout = setTimeout(() => setSubIndex((prev) => prev - 1), 30);
            }
        } else {
            if (subIndex === fullText.length) {
                timeout = setTimeout(() => setIsDeleting(true), 2500);
            } else {
                timeout = setTimeout(() => setSubIndex((prev) => prev + 1), 70);
            }
        }

        return () => clearTimeout(timeout);
    }, [subIndex, isDeleting, index, fullText, start, reduced]);

    if (reduced) {
        return (
            <span className="whitespace-nowrap">
                {currentPhrase.lead}
                <span style={{ color: BLUE }}>{currentPhrase.blue}</span>
            </span>
        );
    }

    const currentLead = currentPhrase.lead.substring(0, Math.min(subIndex, currentPhrase.lead.length));
    const currentBlue = subIndex > currentPhrase.lead.length
        ? currentPhrase.blue.substring(0, subIndex - currentPhrase.lead.length)
        : "";

    return (
        <span className="whitespace-nowrap">
            {currentLead}
            <span style={{ color: BLUE }}>{currentBlue}</span>
            <span
                className="inline-block w-[3px] h-[1em] translate-y-[2px] ml-1 bg-[#8E9BFF]"
                style={{ opacity: blink ? 1 : 0 }}
            />
        </span>
    );
}

/* ============================================================
   CAROUSEL
============================================================ */

type Rect = { left: number; top: number; width: number; height: number; opacity: number };

const SLOTS_WIDE = {
    exit: { left: -20, top: 52.4, width: 15, height: 47.6, opacity: 0 },
    left: { left: 0, top: 52.4, width: 15, height: 47.6, opacity: 1 },
    center: { left: 17, top: 0, width: 49, height: 100, opacity: 1 },
    r1: { left: 68, top: 0, width: 32, height: 47.6, opacity: 1 },
    r2: { left: 85, top: 52.4, width: 15, height: 47.6, opacity: 1 },
    enter: { left: 104, top: 52.4, width: 15, height: 47.6, opacity: 0 },
} satisfies Record<string, Rect>;

const SLOTS_COMPACT = {
    exit: { left: -25, top: 15, width: 14, height: 70, opacity: 0 },
    left: { left: -2, top: 15, width: 14, height: 70, opacity: 1 },
    center: { left: 14, top: 0, width: 72, height: 100, opacity: 1 },
    r1: { left: 88, top: 15, width: 14, height: 70, opacity: 1 },
    r2: { left: 100, top: 15, width: 14, height: 70, opacity: 0 },
    enter: { left: 105, top: 15, width: 14, height: 70, opacity: 0 },
} satisfies Record<string, Rect>;

function slotFor(off: number, compact: boolean): Rect {
    const S = compact ? SLOTS_COMPACT : SLOTS_WIDE;
    if (off <= -2) return S.exit;
    if (off === -1) return S.left;
    if (off === 0) return S.center;
    if (off === 1) return S.r1;
    if (off === 2) return S.r2;
    return S.enter;
}

function CarouselCard({
    clip,
    off,
    rect,
    transition,
    revealed,
    cycle,
    onEnded,
}: {
    clip: Clip;
    off: number;
    rect: Rect;
    transition: string;
    revealed: boolean;
    cycle: number;
    onEnded: () => void;
}) {
    const [imgFailed, setImgFailed] = useState(false);
    const [videoReady, setVideoReady] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const isCenter = off === 0;
    const isPhoto = clip.kind === "photo";
    const isVideo = clip.kind === "video";
    const imgSrc = isPhoto ? clip.src : clip.poster || clip.src;

    const advancedRef = useRef(false);

    useEffect(() => {
        if (!isCenter || !revealed) return;
        const v = isVideo ? videoRef.current : null;
        let cancelled = false;
        advancedRef.current = false;
        setVideoReady(false);

        const finish = () => {
            if (cancelled || advancedRef.current) return;
            advancedRef.current = true;
            onEnded();
        };

        if (v) {
            try {
                v.currentTime = 0;
            } catch {
                /* metadata may not be loaded yet */
            }
            v.play().catch(() => {
                /* autoplay blocked — timer still advances */
            });
        }

        const timer = window.setTimeout(finish, CLIP_DURATION_MS);
        return () => {
            cancelled = true;
            window.clearTimeout(timer);
            v?.pause();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCenter, isVideo, revealed, cycle]);

    const finishVideo = () => {
        if (advancedRef.current) return;
        advancedRef.current = true;
        onEnded();
    };

    return (
        <div
            className="absolute overflow-hidden rounded-[16px] border border-white/10 bg-[#0D121D] md:rounded-[24px]"
            style={{
                left: `${rect.left}%`,
                top: `${rect.top}%`,
                width: `${rect.width}%`,
                height: `${rect.height}%`,
                opacity: rect.opacity,
                transition,
                zIndex: isCenter ? 2 : 1,
                boxShadow: isCenter
                    ? "0 24px 70px rgba(47,123,255,0.18), 0 0 0 1px rgba(47,123,255,0.12)"
                    : "0 10px 30px rgba(0,0,0,0.4)",
            }}
        >
            {imgFailed ? (
                <div className="absolute inset-0 bg-gradient-to-br from-[#17294B] via-[#0D121D] to-[#07090F]" />
            ) : (
                <img
                    src={imgSrc}
                    alt={clip.caption || ""}
                    draggable={false}
                    onError={() => setImgFailed(true)}
                    className="absolute inset-0 h-full w-full object-cover will-change-transform"
                    style={{
                        transform: isPhoto && isCenter && revealed ? "scale(1.08)" : "scale(1)",
                        transition:
                            isPhoto && isCenter
                                ? `transform ${CLIP_DURATION_MS}ms linear`
                                : "transform 800ms ease",
                    }}
                />
            )}

            {isVideo && isCenter && (
                <video
                    key={`${clip.src}-${cycle}`}
                    ref={videoRef}
                    src={clip.src}
                    poster={clip.poster}
                    muted
                    playsInline
                    preload="auto"
                    onLoadedData={() => setVideoReady(true)}
                    onEnded={finishVideo}
                    onError={finishVideo}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{
                        opacity: videoReady ? 1 : 0,
                        transition: "opacity 500ms ease",
                    }}
                />
            )}

            {clip.caption && (
                <span className="absolute bottom-3 left-3 z-10 rounded-full bg-black/60 px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                    {clip.caption}
                </span>
            )}
        </div>
    );
}

/* ============================================================
   FLIP TILE — centred text, glass highlight
============================================================ */

function FlipTile({
    pos,
    front,
    back,
    interval,
    offset,
    revealed,
    reduced,
}: {
    pos: { left: number; top: number; width: number; height: number };
    front: { word: string; label: string };
    back: { word: string; label: string };
    interval: number;
    offset: number;
    revealed: boolean;
    reduced: boolean;
}) {
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        if (!revealed || reduced) return;
        let id: ReturnType<typeof setInterval> | undefined;
        const start = setTimeout(() => {
            id = setInterval(() => setFlipped((f) => !f), interval);
        }, offset);
        return () => {
            clearTimeout(start);
            if (id) clearInterval(id);
        };
    }, [revealed, reduced, offset, interval]);

    // Shared visual style for both faces — glassmorphism
    const faceStyle: CSSProperties = {
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "1rem",
        borderRadius: 20,
        overflow: "hidden",
        // Glass effect: translucent gradient over blurred backdrop
        background:
            "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 40%, rgba(13,18,29,0.55) 100%)",
        backdropFilter: "blur(14px) saturate(140%)",
        WebkitBackdropFilter: "blur(14px) saturate(140%)",
        border: "1px solid rgba(255,255,255,0.16)",
        boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(255,255,255,0.04), 0 18px 55px rgba(0,0,0,0.45), 0 0 0 1px rgba(47,123,255,0.10)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
    };

    const renderFace = (
        content: { word: string; label: string },
        isBack: boolean,
    ) => (
        <div
            style={{
                ...faceStyle,
                transform: isBack ? "rotateY(180deg)" : "rotateY(0deg)",
                // Belt-and-braces: hide the non-visible face so no overlap is possible
                opacity: isBack ? (flipped ? 1 : 0) : flipped ? 0 : 1,
                transition: reduced ? "none" : "opacity 380ms ease",
                pointerEvents: flipped === isBack ? "auto" : "none",
            }}
        >
            {/* Top glass sheen */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-1/2"
                style={{
                    background:
                        "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 100%)",
                }}
            />

            {/* Corner accent glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[#2F7BFF]/30 blur-3xl"
            />

            {/* Bottom accent line */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-6 bottom-3 h-[1px]"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, rgba(142,155,255,0.6), transparent)",
                }}
            />

            <span className="relative font-questrial text-[clamp(1.5rem,2.4vw,2.2rem)] font-medium leading-[1.05] tracking-[-0.02em] text-[#F3F5FA]">
                {content.word}
            </span>

            <span className="relative mt-2 max-w-[210px] text-[11.5px] leading-[1.5] tracking-[0.01em] text-[#C6D0E1] lg:text-[12.5px]">
                {content.label}
            </span>
        </div>
    );

    return (
        <div
            className="absolute hidden md:block"
            style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                width: `${pos.width}%`,
                height: `${pos.height}%`,
                perspective: "1200px",
                opacity: revealed ? 1 : 0,
                transform: revealed ? "none" : "translateY(24px)",
                transition: reduced
                    ? "none"
                    : `opacity 800ms ease 500ms, transform 1000ms ${EASE_OUT} 500ms`,
            }}
        >
            <div
                className="relative h-full w-full"
                style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${flipped ? 180 : 0}deg)`,
                    transition: reduced
                        ? "none"
                        : "transform 900ms cubic-bezier(0.65, 0, 0.35, 1)",
                }}
            >
                {renderFace(front, false)}
                {renderFace(back, true)}
            </div>
        </div>
    );
}

/* ============================================================
   CAROUSEL
============================================================ */

function Carousel({ revealed, reduced }: { revealed: boolean; reduced: boolean }) {
    const n = CLIPS.length;
    const [cur, setCur] = useState(0);
    const [prev, setPrev] = useState(0);
    const [compact, setCompact] = useState(false);
    const [settled, setSettled] = useState(false);
    const [cycle, setCycle] = useState(0);

    const advancingRef = useRef(false);
    const scrollLockRef = useRef(0);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 767px)");
        const on = () => setCompact(mq.matches);
        on();
        mq.addEventListener("change", on);
        return () => mq.removeEventListener("change", on);
    }, []);

    useEffect(() => {
        if (!revealed) return;
        const t = setTimeout(() => setSettled(true), 2600);
        return () => clearTimeout(t);
    }, [revealed]);

    const advance = () => {
        if (advancingRef.current) return;
        advancingRef.current = true;
        setPrev(cur);
        setCur((cur + 1) % n);
        setCycle((c) => c + 1);
        requestAnimationFrame(() => {
            advancingRef.current = false;
        });
    };

    useEffect(() => {
        if (!revealed) return;
        const onScroll = () => {
            const now = Date.now();
            if (now - scrollLockRef.current < 700) return;
            scrollLockRef.current = now;
            advance();
        };
        window.addEventListener("wheel", onScroll, { passive: true });
        window.addEventListener("touchmove", onScroll, { passive: true });
        return () => {
            window.removeEventListener("wheel", onScroll);
            window.removeEventListener("touchmove", onScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [revealed, cur]);

    const offOf = (i: number, c: number) => ((((i - c + 2) % n) + n) % n) - 2;

    return (
        <div
            role="group"
            aria-label="Project showcase"
            className="relative w-full max-w-[1350px] overflow-hidden aspect-[4/5] max-h-[70svh] md:aspect-auto md:h-[min(62vh,530px)] md:max-h-none"
        >
            {CLIPS.map((clip, i) => {
                const off = offOf(i, cur);
                const prevOff = offOf(i, prev);
                const jump = Math.abs(off - prevOff) > 1;
                const rect = revealed ? slotFor(off, compact) : slotFor(99, compact);
                const delay = !settled && revealed ? Math.max(0, off + 1) * 140 : 0;
                const transition =
                    reduced || jump || !revealed
                        ? "none"
                        : `left ${MOVE_MS}ms ${EASE} ${delay}ms, top ${MOVE_MS}ms ${EASE} ${delay}ms, width ${MOVE_MS}ms ${EASE} ${delay}ms, height ${MOVE_MS}ms ${EASE} ${delay}ms, opacity 800ms ease ${delay}ms`;

                return (
                    <CarouselCard
                        key={i}
                        clip={clip}
                        off={off}
                        rect={rect}
                        transition={transition}
                        revealed={revealed}
                        cycle={cycle}
                        onEnded={advance}
                    />
                );
            })}

            {FLIP_TILES.map((tile, i) => (
                <FlipTile
                    key={i}
                    pos={tile.pos}
                    front={tile.front}
                    back={tile.back}
                    interval={tile.interval}
                    offset={tile.offset}
                    revealed={revealed}
                    reduced={reduced}
                />
            ))}
        </div>
    );
}

/* ============================================================
   HERO
============================================================ */

export default function HeroBanner() {
    const [shown, setShown] = useState(false);
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }, []);

    const rise = (delay: number): CSSProperties => ({
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(20px)",
        transition: reduced
            ? "none"
            : `opacity 900ms ease ${delay}ms, transform 1000ms ${EASE_OUT} ${delay}ms`,
    });

    return (
        <>
            <style>{`
                .hero-heading-wrapper { padding-top: 30px; }
                .hero-carousel-wrapper { margin-top: 15px; }

                @media (max-width: 767px) {
                    .hero-heading-wrapper { padding-top: 72px; }
                    .hero-carousel-wrapper { margin-top: 20px; }
                }
            `}</style>

            <section
                className="relative -mt-20 flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#050505] text-[#F3F5FA] selection:bg-[#2F7BFF] selection:text-white"
                style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 132px)" }}
            >
                <div className="hero-heading-wrapper relative z-10 mx-auto flex w-full max-w-[1600px] flex-col items-start justify-between px-4 sm:px-8 md:flex-row md:px-12 lg:px-20">
                    <div className="flex w-full flex-col md:w-[65%]">
                        <div
                            className="relative overflow-hidden px-2 md:-ml-7 md:px-6 md:py-4 md:sm:px-10"
                            style={rise(200)}
                        >
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                            <h1 className="relative z-10 max-w-[900px] font-questrial text-[clamp(1.8rem,7.5vw,2.8rem)] font-medium leading-[1.02] tracking-[-0.045em] text-[#F3F5FA] sm:text-[clamp(2.4rem,7vw,3.4rem)] md:text-[clamp(2.7rem,6.2vw,4.6rem)] md:leading-[0.98] md:tracking-[-0.065em]">
                                <TypewriterHeading start={shown} reduced={reduced} />
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="hero-carousel-wrapper relative z-10 mx-auto flex w-full max-w-[1490px] flex-1 flex-col items-center justify-start px-4 pb-6 sm:px-8 md:px-12 lg:px-[clamp(32px,6vw,92px)]">
                    <Carousel revealed={shown} reduced={reduced} />
                </div>
            </section>

            <LogoIntro onDock={() => setShown(true)} />
        </>
    );
}