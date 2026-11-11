"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { heroContent } from "./data";
import LogoIntro from "./LogoIntro";

/* ============================================================
   CONFIG
   ============================================================ */

const WORDS = ["Create", "Connect", "Educate", "Elevate"];

type Clip = { src: string; poster: string };

const CLIPS: Clip[] = [
    { src: "/website-development-video.mp4", poster: "/website-development-poster.jpg" },
    { src: "/app-development-video.mp4", poster: "/app-development-poster.jpg" },
    { src: "/software-development-video.mp4", poster: "/software-development-poster.jpg" },
    { src: "/website-development-video.mp4", poster: "/website-development-poster.jpg" },
    { src: "/app-development-video.mp4", poster: "/app-development-poster.jpg" },
    { src: "/software-development-video.mp4", poster: "/software-development-poster.jpg" },
];

const FALLBACK_MS = 5000;

// The two dark tiles answer "who is this for?" at a glance, one audience per face.
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

/* ============================================================
   MOTION CONSTANTS
   ============================================================ */

const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";
const MOVE_MS = 1100;

const CSS = `
@keyframes ms-in{from{opacity:0;transform:translateY(45%) rotateX(-90deg)}to{opacity:1;transform:none}}
@keyframes ms-out{from{opacity:1;transform:none}to{opacity:0;transform:translateY(-45%) rotateX(90deg)}}
@media (prefers-reduced-motion: reduce){.ms-letter{animation:none!important}}
`;

/* ============================================================
   ROTATING HEADLINE
============================================================ */

function RotatingHeadline({ active, reduced }: { active: boolean; reduced: boolean }) {
    const [idx, setIdx] = useState(0);
    const [stage, setStage] = useState<"in" | "out">("in");
    const word = WORDS[idx];

    useEffect(() => {
        if (!active) return;
        if (reduced) {
            const id = setInterval(() => setIdx((i) => (i + 1) % WORDS.length), 3000);
            return () => clearInterval(id);
        }
        let t: ReturnType<typeof setTimeout>;
        if (stage === "in") {
            t = setTimeout(() => setStage("out"), 900 + word.length * 70 + 1800);
        } else {
            t = setTimeout(() => {
                setIdx((i) => (i + 1) % WORDS.length);
                setStage("in");
            }, 700 + word.length * 45);
        }
        return () => clearTimeout(t);
    }, [active, reduced, stage, idx, word.length]);

    return (
        <h1
            aria-label={WORDS.join(", ")}
            className="relative mx-auto max-w-[1100px] text-center font-display text-[clamp(3.25rem,8vw,7rem)] font-medium leading-[0.98] tracking-[-0.075em] text-[#F3F5FA] [text-shadow:0_0_70px_rgba(47,123,255,0.22)] max-[560px]:text-[clamp(2.7rem,11vw,4rem)]"
            style={{ perspective: 800 }}
        >
            <span aria-hidden="true" className="invisible block">
                &nbsp;
            </span>
            {active && (
                <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center whitespace-nowrap px-2">
                    {word.split("").map((ch, i) => (
                        <span
                            key={`${idx}-${i}`}
                            className="ms-letter inline-block"
                            style={{
                                transformOrigin: "50% 100%",
                                animation:
                                    stage === "in"
                                        ? `ms-in 900ms ${EASE_OUT} ${i * 70}ms both`
                                        : `ms-out 650ms ${EASE} ${i * 45}ms both`,
                            }}
                        >
                            {ch}
                        </span>
                    ))}
                </span>
            )}
        </h1>
    );
}

/* ============================================================
   SHOWCASE CAROUSEL
   next clip waits on the right -> big centre frame (plays) -> bottom-left -> out
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
    exit: { left: -16, top: 18, width: 12, height: 64, opacity: 0 },
    left: { left: 0, top: 18, width: 12, height: 64, opacity: 1 },
    center: { left: 13.5, top: 0, width: 73, height: 100, opacity: 1 },
    r1: { left: 88, top: 18, width: 12, height: 64, opacity: 1 },
    r2: { left: 102, top: 18, width: 12, height: 64, opacity: 0 },
    enter: { left: 104, top: 18, width: 12, height: 64, opacity: 0 },
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
    onEnded,
    onFail,
}: {
    clip: Clip;
    off: number;
    rect: Rect;
    transition: string;
    revealed: boolean;
    onEnded: () => void;
    onFail: () => void;
}) {
    const [posterFailed, setPosterFailed] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const isCenter = off === 0;
    const mountVideo = off >= -1 && off <= 1;

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        if (isCenter && revealed) {
            v.currentTime = 0;
            v.play().catch(() => onFail());
        } else {
            v.pause();
            if (off === 1) v.currentTime = 0;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCenter, revealed, off]);

    return (
        <div
            className="absolute overflow-hidden rounded-[20px] border border-white/[0.13] bg-[#0D121D] md:rounded-[24px]"
            style={{
                left: `${rect.left}%`,
                top: `${rect.top}%`,
                width: `${rect.width}%`,
                height: `${rect.height}%`,
                opacity: rect.opacity,
                transition,
                zIndex: isCenter ? 2 : 1,
                boxShadow: isCenter
                    ? "0 28px 90px rgba(47,123,255,0.18), 0 0 0 1px rgba(47,123,255,0.12)"
                    : "0 12px 35px rgba(0,0,0,0.18)",
            }}
        >
            {posterFailed ? (
                <div className="absolute inset-0 bg-gradient-to-br from-[#17294B] via-[#0D121D] to-[#07090F]" />
            ) : (
                <img
                    src={clip.poster}
                    alt=""
                    draggable={false}
                    onError={() => setPosterFailed(true)}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            )}
            {mountVideo && (
                <video
                    ref={videoRef}
                    src={clip.src}
                    poster={clip.poster}
                    muted
                    playsInline
                    preload={off >= 0 ? "auto" : "metadata"}
                    onEnded={isCenter ? onEnded : undefined}
                    onError={isCenter ? onFail : undefined}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ opacity: isCenter ? 1 : 0, transition: "opacity 700ms ease" }}
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
            className="absolute inset-0 flex flex-col justify-end bg-[#0D121D] p-5 lg:p-6"
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
            <span className="relative font-display text-[1.6rem] font-medium leading-none tracking-[-0.05em] text-[#F3F5FA] lg:text-[2.1rem]">
                {item.value}
            </span>
            <span className="relative mt-3 max-w-[150px] text-[11px] leading-[1.55] tracking-[0.01em] text-[#A0A9BA] lg:text-xs">
                {item.label}
            </span>
        </div>
    );

    return (
        <div
            className="absolute hidden overflow-hidden rounded-[24px] border border-white/[0.13] bg-[#0D121D] shadow-[0_18px_55px_rgba(0,0,0,0.2)] md:block"
            style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                width: `${pos.width}%`,
                height: `${pos.height}%`,
                perspective: 900,
                opacity: revealed ? 1 : 0,
                transform: revealed ? "none" : "translateX(60px)",
                transition: reduced ? "none" : `opacity 800ms ease 500ms, transform 1000ms ${EASE_OUT} 500ms`,
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
    const [failed, setFailed] = useState<Record<number, boolean>>({});
    const [compact, setCompact] = useState(false);
    const [settled, setSettled] = useState(false);

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
        setPrev(cur);
        setCur((cur + 1) % n);
    };

    useEffect(() => {
        if (!revealed || !failed[cur]) return;
        const t = setTimeout(advance, FALLBACK_MS);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [revealed, failed, cur]);

    const offOf = (i: number, c: number) => ((((i - c + 2) % n) + n) % n) - 2;

    return (
        <div
            role="group"
            aria-label="Project showcase"
            className="relative mt-10 h-[64vw] max-h-[420px] w-full overflow-hidden md:h-[min(54vh,520px)] md:max-h-none"
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
                        onEnded={advance}
                        onFail={() => setFailed((f) => ({ ...f, [i]: true }))}
                    />
                );
            })}

            {AUDIENCES.map((a, i) => (
                <AudienceTile key={i} pos={a.pos} faces={a.faces} offset={a.offset} revealed={revealed} reduced={reduced} />
            ))}
        </div>
    );
}

/* ============================================================
   HERO
   The logo intro hands over to the navbar, and the hero starts revealing the
   moment the mark begins flying (not after it lands), so the whole opening is
   one continuous motion with no dead time.
============================================================ */

export default function HeroBanner() {
    const [shown, setShown] = useState(false);
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }, []);

    const rise = (delay: number): CSSProperties => ({
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(28px)",
        transition: reduced ? "none" : `opacity 900ms ease ${delay}ms, transform 1000ms ${EASE_OUT} ${delay}ms`,
    });

    return (
        <>
            <style>{CSS}</style>

            <section className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#07090F] text-[#F3F5FA] selection:bg-[#2F7BFF] selection:text-white">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, rgba(255,255,255,.9) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.9) 1px, transparent 1px)",
                        backgroundSize: "80px 80px",
                        maskImage: "radial-gradient(circle at 85% 95%, black 0%, transparent 60%)",
                        WebkitMaskImage: "radial-gradient(circle at 85% 95%, black 0%, transparent 60%)",
                    }}
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full bg-[#2F7BFF]/[0.12] blur-[160px]"
                />

                <div className="relative z-20 mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-center justify-center px-5 pb-14 pt-28 sm:px-8 lg:px-[clamp(32px,6vw,92px)]">
                    {/* who we serve, in one line */}
                    <p
                        className="mb-5 text-center text-[11px] uppercase tracking-[0.32em] text-[#7EA9FF]"
                        style={rise(150)}
                    >
                        Technology · Study abroad · Training · Careers
                    </p>

                    <RotatingHeadline active={shown} reduced={reduced} />

                    <p
                        className="mx-auto mt-5 max-w-[620px] text-center text-[14px] font-normal leading-[1.85] tracking-[0.005em] text-[#A0A9BA] sm:text-[15px]"
                        style={rise(500)}
                    >
                        {heroContent.body}
                    </p>

                    <Carousel revealed={shown} reduced={reduced} />
                </div>
            </section>

            <LogoIntro onDock={() => setShown(true)} />
        </>
    );
}