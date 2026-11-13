"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState, type CSSProperties } from "react";
import LogoIntro from "./LogoIntro";

/* ============================================================
   CONFIG
============================================================ */

type Clip =
    | { type: "video"; src: string; poster: string }
    | { type: "photo"; src: string };

const CLIPS: Clip[] = [
    { type: "video", src: "/website-development-video.mp4", poster: "/website-development-poster.jpg" },
    { type: "photo", src: "/website-development-poster.jpg" },
    { type: "video", src: "/app-development-video.mp4", poster: "/app-development-poster.jpg" },
    { type: "photo", src: "/app-development-poster.jpg" },
    { type: "video", src: "/software-development-video.mp4", poster: "/software-development-poster.jpg" },
    { type: "photo", src: "/software-development-poster.jpg" },
];

const CLIP_DURATION_MS = 5000;

const AUDIENCES = [
    {
        pos: { left: 0, top: 0, width: 15, height: 47.6 },
        faces: [
            { value: "Business", label: "Websites, apps and custom software" },
            { value: "Students", label: "Study abroad, admissions and visas" },
        ],
        offset: 2600,
    },
    {
        pos: { left: 68, top: 52.4, width: 15, height: 47.6 },
        faces: [
            { value: "Learners", label: "Training, practice and certificates" },
            { value: "Careers", label: "Placement, internships and jobs" },
        ],
        offset: 4200,
    },
];

const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";
const MOVE_MS = 1100;

/* ============================================================
   TYPOGRAPHY — dot fade reveal + always-changing blue last word
============================================================ */

const BLUE = "#8E9BFF";
const ROTATING_WORDS = ["further.", "faster.", "smarter.", "bolder.", "sharper.", "clearer."];
const HOLD_MS = 10000;

function useWordRotator(start: boolean, reduced: boolean) {
    const [idx, setIdx] = useState(0);
    useEffect(() => {
        if (!start || reduced) return;
        const t = setTimeout(() => setIdx((i) => (i + 1) % ROTATING_WORDS.length), HOLD_MS);
        return () => clearTimeout(t);
    }, [idx, start, reduced]);
    return ROTATING_WORDS[idx];
}

function DotFadeWord({ word, start }: { word: string; start: boolean }) {
    const [phase, setPhase] = useState<"dot" | "sharp">("dot");

    useEffect(() => {
        if (!start) return;
        setPhase("dot");
        const t = setTimeout(() => setPhase("sharp"), 40);
        return () => clearTimeout(t);
    }, [word, start]);

    return (
        <span
            style={{ color: BLUE }}
            className="inline-flex flex-nowrap items-baseline whitespace-nowrap"
            aria-label={word}
        >
            {word.split("").map((ch, i) => (
                <span
                    key={`${word}-${i}`}
                    aria-hidden="true"
                    className="inline-block will-change-[opacity,filter,transform]"
                    style={{
                        opacity: start ? (phase === "sharp" ? 1 : 0.15) : 0,
                        filter: start
                            ? phase === "sharp"
                                ? "blur(0px)"
                                : "blur(6px)"
                            : "blur(6px)",
                        transform: start
                            ? phase === "sharp"
                                ? "translate3d(0,0,0) scale(1)"
                                : "translate3d(0,0.15em,0) scale(0.55)"
                            : "translate3d(0,0.15em,0) scale(0.55)",
                        transition: `opacity 620ms ease ${i * 55}ms, filter 700ms ease ${i * 55}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${i * 55}ms`,
                    }}
                >
                    {ch}
                </span>
            ))}
        </span>
    );
}

function RotatingLastWord({ start, reduced }: { start: boolean; reduced: boolean }) {
    const word = useWordRotator(start, reduced);
    if (reduced) return <span style={{ color: BLUE }}>{word}</span>;
    return <DotFadeWord word={word} start={start} />;
}

function DotRevealHeading({
    text,
    visible,
    reduced,
}: {
    text: string;
    visible: boolean;
    reduced: boolean;
}) {
    const parts = text.trim().split(" ");
    parts.pop();
    const lead = parts.join(" ") + (parts.length ? " " : "");

    const [animate, setAnimate] = useState(false);
    useEffect(() => {
        if (!visible || reduced) {
            setAnimate(reduced);
            return;
        }
        const t = setTimeout(() => setAnimate(true), 900);
        return () => clearTimeout(t);
    }, [visible, reduced]);

    return (
        <span className="inline-flex flex-wrap items-baseline" aria-label={text}>
            {lead.split("").map((char, index) => (
                <span
                    key={`lead-${char}-${index}`}
                    aria-hidden="true"
                    className="inline-block"
                    style={{
                        opacity: visible || reduced ? 1 : 0,
                        transform:
                            visible || reduced
                                ? "translate3d(0,0,0)"
                                : "translate3d(0,0.42em,0)",
                        filter: visible || reduced ? "blur(0)" : "blur(5px)",
                        transition: reduced
                            ? "none"
                            : `opacity 650ms ease ${index * 24}ms, transform 750ms cubic-bezier(0.22,1,0.36,1) ${index * 24
                            }ms, filter 650ms ease ${index * 24}ms`,
                        whiteSpace: char === " " ? "pre" : "normal",
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}

            <span className="inline-block">
                <RotatingLastWord start={animate} reduced={reduced} />
            </span>
        </span>
    );
}

/* ============================================================
   DOT MATRIX BACKGROUND
============================================================ */

function DotMatrixBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let width = 0;
        let height = 0;
        let reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const resize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = parent.clientWidth;
            height = parent.clientHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        window.addEventListener("resize", resize);
        resize();

        const DOT_SPACING = 16;
        const DOT_RADIUS = 1.5;

        const render = (time: number) => {
            ctx.clearRect(0, 0, width, height);

            const speed = 0.08;
            const rawProgress = (time * speed) % (width * 2);
            const sweepX = rawProgress <= width ? rawProgress : width * 2 - rawProgress;

            for (let x = 0; x < width; x += DOT_SPACING) {
                for (let y = 0; y < height; y += DOT_SPACING) {
                    const dx = Math.abs(x - sweepX);
                    const wave = Math.max(0, 1 - dx / 300);
                    const vWave = Math.sin(y * 0.02 + time * 0.002) * 0.5 + 0.5;

                    if (wave > 0.05) {
                        const radius = DOT_RADIUS + wave * 1.5 * vWave;
                        const alpha = wave * 0.3 * vWave;

                        ctx.beginPath();
                        ctx.fillStyle = `rgba(20, 60, 150, ${alpha})`;
                        ctx.arc(x, y, radius, 0, Math.PI * 2);
                        ctx.fill();

                        if (dx < 50 && vWave > 0.6) {
                            ctx.fillStyle = `rgba(142, 155, 255, ${alpha * 1.5})`;
                            ctx.arc(x, y, radius * 1.2, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }
                }
            }
            if (!reduced) animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        const onMotionChange = () => {
            reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (reduced) cancelAnimationFrame(animationFrameId);
            else animationFrameId = requestAnimationFrame(render);
        };
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        mq.addEventListener("change", onMotionChange);

        return () => {
            window.removeEventListener("resize", resize);
            mq.removeEventListener("change", onMotionChange);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 h-full w-full z-0 opacity-80"
        />
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
    exit: { left: -18, top: 18, width: 10, height: 64, opacity: 0 },
    left: { left: 0, top: 18, width: 10, height: 64, opacity: 1 },
    center: { left: 11, top: 0, width: 78, height: 100, opacity: 1 },
    r1: { left: 91, top: 18, width: 10, height: 64, opacity: 1 },
    r2: { left: 103, top: 18, width: 10, height: 64, opacity: 0 },
    enter: { left: 104, top: 18, width: 10, height: 64, opacity: 0 },
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
    const isPhoto = clip.type === "photo";
    const isVideo = clip.type === "video";
    const imgSrc = isPhoto ? clip.src : clip.poster;

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
                    alt=""
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
        </div>
    );
}

function AudienceTile({
    pos,
    faces,
    offset,
    revealed,
    reduced,
}: {
    pos: { left: number; top: number; width: number; height: number };
    faces: { value: string; label: string }[];
    offset: number;
    revealed: boolean;
    reduced: boolean;
}) {
    const [rot, setRot] = useState(0);

    useEffect(() => {
        if (!revealed || reduced) return;
        let id: ReturnType<typeof setInterval> | undefined;
        const start = setTimeout(() => {
            id = setInterval(() => setRot((r) => r + 180), 5200);
        }, offset);
        return () => {
            clearTimeout(start);
            if (id) clearInterval(id);
        };
    }, [revealed, reduced, offset]);

    const face = (item: { value: string; label: string }, base: number) => (
        <div
            className="absolute inset-0 flex flex-col justify-end bg-[#0D121D] p-4 border border-white/5 lg:p-6"
            style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: `rotateY(${rot + base}deg)`,
                transition: reduced ? "none" : "transform 900ms cubic-bezier(0.65, 0, 0.35, 1)",
            }}
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#2F7BFF]/20 blur-3xl"
            />
            <span className="relative font-display text-[1.25rem] font-medium leading-none tracking-[-0.04em] text-[#F3F5FA] lg:text-[2.1rem]">
                {item.value}
            </span>
            <span className="relative mt-2 max-w-[150px] text-[10px] leading-[1.5] tracking-[0.01em] text-[#A0A9BA] lg:mt-3 lg:text-xs">
                {item.label}
            </span>
        </div>
    );

    return (
        <div
            className="absolute hidden overflow-hidden rounded-[20px] border border-white/10 bg-[#0D121D] shadow-[0_18px_55px_rgba(0,0,0,0.4)] md:block lg:rounded-[24px]"
            style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                width: `${pos.width}%`,
                height: `${pos.height}%`,
                perspective: 900,
                opacity: revealed ? 1 : 0,
                transform: revealed ? "none" : "translateX(60px)",
                transition: reduced
                    ? "none"
                    : `opacity 800ms ease 500ms, transform 1000ms ${EASE_OUT} 500ms`,
            }}
        >
            {face(faces[0], 0)}
            {face(faces[1], 180)}
        </div>
    );
}

function Carousel({ revealed, reduced }: { revealed: boolean; reduced: boolean }) {
    const n = CLIPS.length;
    const [cur, setCur] = useState(0);
    const [prev, setPrev] = useState(0);
    const [compact, setCompact] = useState(false);
    const [settled, setSettled] = useState(false);
    const [cycle, setCycle] = useState(0);

    const advancingRef = useRef(false);

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

    const offOf = (i: number, c: number) => ((((i - c + 2) % n) + n) % n) - 2;

    return (
        <div
            role="group"
            aria-label="Project showcase"
            className="relative w-full max-w-[1350px] overflow-hidden mt-6 md:mt-10 h-[58vw] max-h-[400px] md:h-[min(58vh,520px)] md:max-h-none"
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

            {AUDIENCES.map((a, i) => (
                <AudienceTile
                    key={i}
                    pos={a.pos}
                    faces={a.faces}
                    offset={a.offset}
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
            <section
                className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#050505] text-[#F3F5FA] selection:bg-[#2F7BFF] selection:text-white"
                style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
            >
                <DotMatrixBackground />

                {/* Headline */}
                <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col items-start justify-between gap-6 px-4 pt-16 sm:gap-12 sm:px-8 sm:pt-20 md:flex-row md:px-12 md:pt-24 lg:px-20">
                    <div className="flex w-full flex-col md:w-[65%]">
                        <div
                            className="relative overflow-hidden px-2 pt-2 sm:px-6 sm:pt-6 md:-ml-7 md:px-6 md:py-4 md:pt-14 md:sm:px-10"
                            style={rise(200)}
                        >
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                            <h1 className="relative z-10 max-w-[900px] font-sans text-[clamp(2rem,8vw,3rem)] font-medium leading-[1.02] tracking-[-0.045em] text-[#F3F5FA] sm:text-[clamp(2.4rem,7vw,3.4rem)] md:text-[clamp(2.7rem,6.2vw,4.6rem)] md:leading-[0.98] md:tracking-[-0.065em]">
                                <DotRevealHeading
                                    text="Learn. Build. Go further."
                                    visible={shown}
                                    reduced={reduced}
                                />
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Carousel */}
                <div className="relative z-10 mx-auto mt-4 flex w-full max-w-[1490px] flex-1 flex-col items-center justify-center px-4 pb-8 sm:mt-6 sm:px-8 md:mt-10 md:px-12 lg:px-[clamp(32px,6vw,92px)]">
                    <Carousel revealed={shown} reduced={reduced} />
                </div>
            </section>

            <LogoIntro onDock={() => setShown(true)} />
        </>
    );
}