
"use client";

import Image from "next/image";
import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import { stories, storiesContent } from "./data";

/* ================================================================== */
/* Types                                                               */
/* ================================================================== */

interface Story {
    id: string;
    name: string;
    role: string;
    location: string;
    image: string;
    quote: string;
    focus?: string;
}

/* ================================================================== */
/* Constants                                                           */
/* ================================================================== */

const MAX_DPR = 2;
const BG = "#07090F";
const PANEL = "#0D121D";

const PALETTE = [
    "#1B4FFF",
    "#2F7BFF",
    "#4A8FFF",
    "#6AA8FF",
    "#A9C7FF",
    "#D6E4FF",
    "#F0F6FF",
] as const;

function hash3(a: number, b: number, c: number): number {
    let h = (a * 374761393 + b * 668265263 + c * 2147483647) | 0;
    h = ((h ^ (h >>> 13)) * 1274126177) | 0;
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function mod(n: number, m: number) {
    return ((n % m) + m) % m;
}

/* ================================================================== */
/* Component                                                           */
/* ================================================================== */

export default function Stories() {
    const beltRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const cardRefs = useRef<HTMLDivElement[]>([]);
    const panelRefs = useRef<HTMLDivElement[]>([]);

    const sparks = useRef<
        {
            x: number;
            y: number;
            vx: number;
            vy: number;
            life: number;
            size: number;
            color: string;
        }[]
    >([]);

    const [paused, setPaused] = useState(false);
    const [activeIdx, setActiveIdx] = useState(0);

    const b = useRef({
        cw: 0,
        ch: 0,
        gap: 0,
        span: 0,
        period: 0,

        off: 0,
        vel: 0,
        hover: 0,

        dragging: false,
        lastX: 0,
        lastT: 0,

        Lx: 0,
        W: 0,
        H: 0,
        dpr: 1,

        reduced: false,
        autoSpeed: 0,

        raf: 0,
        lastFrame: 0,
    });

    /* ================================================================ */
    /* Measure                                                           */
    /* ================================================================ */

    const measure = useCallback(() => {
        const r = b.current;
        const firstCard = cardRefs.current[0];

        if (!firstCard || !beltRef.current) return;

        const rect = firstCard.getBoundingClientRect();

        r.cw = rect.width;
        r.ch = rect.height;

        const gapCss = getComputedStyle(document.documentElement)
            .getPropertyValue("--belt-gap")
            .trim();

        const tmp = document.createElement("div");
        tmp.style.width = gapCss || "4.75vw";

        document.body.appendChild(tmp);

        r.gap = tmp.getBoundingClientRect().width;

        tmp.remove();

        r.span = r.cw + r.gap;
        r.period = r.span * stories.length;

        r.W = beltRef.current.clientWidth;
        r.H = beltRef.current.clientHeight;

        // Give the quote panel more room on mobile.
        const isMobile = window.innerWidth < 768;
        const lineRatio = isMobile ? 0.62 : 0.5;

        r.Lx = r.W * lineRatio;

        r.dpr = Math.min(
            window.devicePixelRatio || 1,
            MAX_DPR
        );

        const cv = canvasRef.current;

        if (cv) {
            cv.width = r.W * r.dpr;
            cv.height = r.H * r.dpr;

            cv.style.width = `${r.W}px`;
            cv.style.height = `${r.H}px`;
        }

        r.autoSpeed = r.reduced
            ? 0
            : -0.075 * window.innerWidth;

        if (r.off === 0) {
            r.off = r.W / 2 - 0.62 * r.cw;
        }
    }, []);

    /* ================================================================ */
    /* Position Cards + Sequential Panel Reveal                         */
    /* ================================================================ */

    const positionCards = useCallback(() => {
        const r = b.current;

        if (!r.period) return;

        let crossingIdx = -1;
        let crossingProgress = 0;

        for (let i = 0; i < stories.length; i++) {
            const x =
                mod(r.off + i * r.span + r.span, r.period) -
                r.span;

            const cut = Math.max(
                0,
                Math.min(r.cw, r.Lx - x)
            );

            if (cut > 0 && cut < r.cw) {
                crossingIdx = i;
                crossingProgress = cut / r.cw;
                break;
            }
        }

        for (let i = 0; i < stories.length; i++) {
            const x =
                mod(r.off + i * r.span + r.span, r.period) -
                r.span;

            const cut = Math.max(
                0,
                Math.min(r.cw, r.Lx - x)
            );

            const card = cardRefs.current[i];
            const panel = panelRefs.current[i];

            // Image card
            if (card) {
                card.style.transform = `translate3d(${x}px,0,0)`;

                card.style.clipPath =
                    cut > 0
                        ? `inset(0 0 0 ${cut}px round 0 12px 12px 0)`
                        : "none";

                card.style.opacity =
                    cut >= r.cw ? "0" : "1";
            }

            // Quote panel
            if (panel) {
                const isCrossing = i === crossingIdx;
                const isVisible =
                    isCrossing && crossingProgress > 0.05;

                panel.style.opacity = isVisible ? "1" : "0";

                const logo =
                    panel.firstElementChild as HTMLDivElement | null;

                if (logo) {
                    logo.style.opacity = isVisible ? "1" : "0";

                    logo.style.transform = isVisible
                        ? "scale(1)"
                        : "scale(0.85)";
                }

                const content =
                    panel.lastElementChild as HTMLDivElement | null;

                if (content) {
                    content.style.opacity = isVisible ? "1" : "0";

                    content.style.transform = isVisible
                        ? "translateY(0)"
                        : "translateY(14px)";
                }
            }
        }

        if (
            crossingIdx !== -1 &&
            crossingIdx !== activeIdx
        ) {
            setActiveIdx(crossingIdx);
        }
    }, [activeIdx]);

    /* ================================================================ */
    /* Canvas Effects                                                    */
    /* ================================================================ */

    const drawFx = useCallback((t: number) => {
        const r = b.current;
        const cv = canvasRef.current;

        if (!cv || !r.cw) return;

        const ctx = cv.getContext("2d");

        if (!ctx) return;

        ctx.setTransform(
            r.dpr,
            0,
            0,
            r.dpr,
            0,
            0
        );

        ctx.clearRect(0, 0, r.W, r.H);

        const cardTop = (r.H - r.ch) / 2;
        const Lx = r.Lx;

        const HAZE_W = window.innerWidth < 768 ? 55 : 100;
        const R = r.cw * 0.22;
        const GRID = window.innerWidth < 768 ? 4 : 3;

        const rows = Math.ceil(r.ch / GRID) + 4;

        for (let i = 0; i < stories.length; i++) {
            const x =
                mod(r.off + i * r.span + r.span, r.period) -
                r.span;

            const right = x + r.cw;

            if (right < Lx) continue;

            const cut = Math.max(
                0,
                Math.min(r.cw, Lx - x)
            );

            if (cut <= 0 || cut >= r.cw) continue;

            // Blue haze
            const hazeW = Math.min(
                HAZE_W,
                right - Lx
            );

            if (hazeW > 0) {
                const g = ctx.createLinearGradient(
                    Lx,
                    0,
                    Lx + HAZE_W,
                    0
                );

                g.addColorStop(
                    0,
                    "rgba(47,123,255,0.30)"
                );

                g.addColorStop(
                    1,
                    "rgba(47,123,255,0)"
                );

                ctx.fillStyle = g;
                ctx.fillRect(
                    Lx,
                    cardTop,
                    hazeW,
                    r.ch
                );
            }

            // Dissolve particles
            const startCol = Math.floor(cut / GRID);
            const endCol = Math.ceil((cut + R) / GRID);

            const tick = Math.floor(t * 8) + 97;

            for (
                let gx = startCol;
                gx <= endCol;
                gx++
            ) {
                const sx = x + gx * GRID;
                const d = sx - Lx;

                if (d < 0 || d > R) continue;

                const p =
                    Math.pow(1 - d / R, 2.2) * 0.55;

                if (p <= 0.004) continue;

                for (
                    let row = -4;
                    row <= rows + 4;
                    row++
                ) {
                    const inside =
                        row >= 0 && row <= rows - 4;

                    const prob = inside
                        ? p
                        : p *
                        0.12 *
                        Math.max(0, 1 - Math.abs(row) / 4);

                    if (hash3(gx, row, i) >= prob) continue;

                    if (hash3(gx, row, tick) < 0.3) continue;

                    const h2 = hash3(row, gx, i + 31);
                    const near = d < 8;

                    const ci = near
                        ? 4 + Math.floor(h2 * 3)
                        : Math.floor(h2 * h2 * 7);

                    const color = PALETTE[
                        Math.min(6, ci)
                    ];

                    const jx =
                        (hash3(gx, row, i + 7) - 0.5) * 1.4;

                    const jy =
                        (hash3(gx, row, i + 11) - 0.5) * 1.4;

                    const size = 0.9 + h2 * 1.3;

                    ctx.fillStyle = color;

                    ctx.globalAlpha =
                        (inside ? 0.85 : 0.25) *
                        (1 - d / R);

                    ctx.fillRect(
                        sx + jx,
                        cardTop + row * GRID + jy,
                        size,
                        size
                    );
                }
            }

            ctx.globalAlpha = 1;
        }

        // Sparks
        if (
            !r.reduced &&
            Math.random() < 0.15
        ) {
            sparks.current.push({
                x: Lx + Math.random() * 16,
                y: cardTop + Math.random() * r.ch,
                vx:
                    -20 +
                    Math.random() * 40 +
                    r.vel * 0.4,
                vy: (Math.random() - 0.5) * 30,
                life: 0.4 + Math.random() * 0.6,
                size: 0.6 + Math.random() * 1.2,
                color: PALETTE[
                    Math.floor(Math.random() * PALETTE.length)
                ],
            });
        }

        const dt = 1 / 60;

        for (
            let s = sparks.current.length - 1;
            s >= 0;
            s--
        ) {
            const sp = sparks.current[s];

            sp.life -= dt;

            if (sp.life <= 0) {
                sparks.current.splice(s, 1);
                continue;
            }

            sp.x += sp.vx * dt;
            sp.y += sp.vy * dt;

            ctx.globalAlpha = Math.min(
                0.75,
                sp.life * 1.6
            );

            ctx.fillStyle = sp.color;

            ctx.fillRect(
                sp.x,
                sp.y,
                sp.size,
                sp.size
            );
        }

        ctx.globalAlpha = 1;
    }, []);

    /* ================================================================ */
    /* Main Animation Loop                                               */
    /* ================================================================ */

    const loop = useCallback(
        (now: number) => {
            const r = b.current;

            const dt = Math.min(
                0.05,
                (now - r.lastFrame) / 1000 || 0.016
            );

            r.lastFrame = now;

            const targetHover = paused ? 1 : 0;

            r.hover +=
                (targetHover - r.hover) *
                (1 - Math.exp(-4 * dt));

            if (!r.dragging) {
                const target =
                    r.autoSpeed * (1 - 0.65 * r.hover);

                r.vel +=
                    (target - r.vel) *
                    (1 - Math.exp(-2.2 * dt));

                r.off += r.vel * dt;
            }

            positionCards();
            drawFx(now / 1000);

            r.raf = requestAnimationFrame(loop);
        },
        [paused, positionCards, drawFx]
    );

    /* ================================================================ */
    /* Drag Interaction                                                  */
    /* ================================================================ */

    const onPointerDown = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            const r = b.current;

            r.dragging = true;
            r.lastX = e.clientX;
            r.lastT = performance.now();

            beltRef.current?.classList.add("dragging");

            e.currentTarget.setPointerCapture(e.pointerId);
        },
        []
    );

    const onPointerMove = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            const r = b.current;

            if (!r.dragging) return;

            const dx = e.clientX - r.lastX;

            const dt = Math.max(
                8,
                performance.now() - r.lastT
            );

            r.off += dx;

            r.vel =
                (dx / dt) * 1000 * 0.8 +
                r.vel * 0.2;

            r.lastX = e.clientX;
            r.lastT = performance.now();
        },
        []
    );

    const onPointerUp = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            const r = b.current;

            r.dragging = false;

            beltRef.current?.classList.remove("dragging");

            if (
                e.currentTarget.hasPointerCapture(e.pointerId)
            ) {
                e.currentTarget.releasePointerCapture(
                    e.pointerId
                );
            }
        },
        []
    );

    const onWheel = useCallback(
        (e: React.WheelEvent<HTMLDivElement>) => {
            if (
                Math.abs(e.deltaX) >
                Math.abs(e.deltaY)
            ) {
                b.current.vel += -e.deltaX * 6;
            }
        },
        []
    );

    /* ================================================================ */
    /* Lifecycle                                                         */
    /* ================================================================ */

    useEffect(() => {
        const r = b.current;

        r.reduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        measure();
        positionCards();

        const onResize = () => {
            measure();
            positionCards();
        };

        window.addEventListener("resize", onResize);

        r.lastFrame = performance.now();
        r.raf = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener("resize", onResize);
            cancelAnimationFrame(r.raf);
        };
    }, [measure, positionCards, loop]);

    useEffect(() => {
        const r = b.current;

        cancelAnimationFrame(r.raf);

        r.lastFrame = performance.now();
        r.raf = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(r.raf);
    }, [loop]);

    /* ================================================================ */
    /* Render                                                            */
    /* ================================================================ */

    return (
        <section
            id="stories"
            className="relative isolate w-full select-none overflow-hidden bg-[#07090F] py-16 font-questrial sm:py-20 md:py-24 lg:py-32"
            style={
                {
                    "--belt-cw": "min(46vw, 660px)",
                    "--belt-ch": "min(52vh, 460px)",
                    "--belt-gap": "4.75vw",
                    "--panel-w": "min(38vw, 540px)",
                    "--belt-extra": "60px",
                    "--scanner-x": "50%",
                } as React.CSSProperties
            }
        >
            <style>{`
                @media (max-width: 767px) {
                    #stories {
                        --belt-cw: 84vw;
                        --belt-ch: 64vw;
                        --belt-gap: 7vw;
                        --panel-w: 56vw;
                        --belt-extra: 220px;
                        --scanner-x: 62%;
                    }
                }

                @media (min-width: 768px) and (max-width: 1023px) {
                    #stories {
                        --belt-cw: 58vw;
                        --belt-ch: min(48vh, 400px);
                        --belt-gap: 5vw;
                        --panel-w: 43vw;
                        --belt-extra: 100px;
                    }
                }

                .belt-grab {
                    cursor: grab;
                    -webkit-tap-highlight-color: transparent;
                }

                .belt-grab.dragging {
                    cursor: grabbing;
                }

                @media (max-width: 767px) {
                    .belt-grab {
                        cursor: grab;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .belt-grab {
                        scroll-behavior: auto;
                    }
                }
            `}</style>

            {/* Ambient Background */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-40 top-0 -z-10 h-[300px] w-[300px] rounded-full bg-[#2F7BFF]/10 blur-[100px] sm:h-[520px] sm:w-[520px] sm:blur-[140px]"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-40 -right-40 -z-10 h-[300px] w-[300px] rounded-full bg-[#2F7BFF]/10 blur-[100px] sm:h-[520px] sm:w-[520px] sm:blur-[140px]"
            />

            {/* Header */}
            <div className="relative z-10 mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-20">
                <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-12 md:mb-14 lg:flex-row lg:items-end lg:gap-10">

                    <div className="min-w-0">
                        <span className="flex items-center gap-2.5 font-questrial text-[9px] font-bold uppercase tracking-[0.16em] text-[#A9C7FF] sm:text-[11px] sm:tracking-[0.18em]">
                            <span className="h-px w-6 shrink-0 bg-[#2F7BFF]" />
                            Client & Learner Experiences
                        </span>

                        <h2 className="mt-5 max-w-2xl font-questrial text-[clamp(36px,7vw,72px)] font-[600] leading-[0.96] tracking-[-0.055em] text-white sm:mt-6">
                            {storiesContent.heading
                                .split(" ")
                                .slice(0, 2)
                                .join(" ")}

                            <span className="block text-[#A9C7FF]">
                                {storiesContent.heading
                                    .split(" ")
                                    .slice(2)
                                    .join(" ")}
                            </span>
                        </h2>
                    </div>

                    <p className="max-w-[420px] font-questrial text-[14px] leading-[1.8] text-white/70 sm:text-[16px] sm:leading-[1.85] lg:max-w-sm lg:pb-1">
                        {storiesContent.body}
                    </p>
                </div>
            </div>

            {/* ====================================================== */}
            {/* Story Belt                                             */}
            {/* ====================================================== */}

            <div
                ref={beltRef}
                className="belt-grab relative mx-auto w-full touch-pan-y overflow-hidden"
                style={{
                    height: "calc(var(--belt-ch) + var(--belt-extra))",
                }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onWheel={onWheel}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                {/* Quote Panels */}
                <div className="pointer-events-none absolute inset-0 z-[6]">
                    {stories.map((s, i) => {
                        const story = s as Story;

                        return (
                            <div
                                key={`panel-${story.id}`}
                                ref={(el) => {
                                    if (el) panelRefs.current[i] = el;
                                }}
                                className="absolute top-1/2 flex -translate-y-1/2 flex-col justify-center will-change-[opacity]"
                                style={{
                                    right:
                                        "calc(50% + 40px)",
                                    width: "var(--panel-w)",
                                    maxWidth:
                                        "calc(50vw - 48px)",
                                    opacity: 0,
                                    transition: "opacity 0.3s ease",
                                }}
                            >
                                {/* Profile Image */}
                                <div
                                    className="mb-3 h-[clamp(44px,7vw,80px)] w-[clamp(44px,7vw,80px)] shrink-0 overflow-hidden rounded-full border-2 border-[#2F7BFF]/40 shadow-[0_0_24px_rgba(47,123,255,0.35)] sm:mb-5"
                                    style={{
                                        opacity: 0,
                                        transform: "scale(0.85)",
                                        transition:
                                            "opacity 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)",
                                    }}
                                >
                                    <Image
                                        src={story.image}
                                        alt={`${story.name} portrait`}
                                        width={85}
                                        height={85}
                                        className="h-full w-full object-cover"
                                        style={{
                                            objectPosition:
                                                story.focus ?? "center 25%",
                                        }}
                                    />
                                </div>

                                {/* Quote Content */}
                                <div
                                    className="rounded-xl border border-white/10 p-[clamp(10px,2.2vw,28px)] backdrop-blur-md sm:rounded-2xl"
                                    style={{
                                        background: `linear-gradient(180deg, ${PANEL}F2 0%, ${BG}FA 100%)`,
                                        opacity: 0,
                                        transform: "translateY(14px)",
                                        transition:
                                            "opacity 0.4s ease 0.1s, transform 0.5s cubic-bezier(0.22,1,0.36,1) 0.1s",
                                    }}
                                >
                                    <span className="flex items-center gap-2 font-questrial text-[8px] font-bold uppercase tracking-[0.12em] text-[#A9C7FF] sm:gap-2.5 sm:text-[11px] sm:tracking-[0.18em]">
                                        <span className="h-px w-4 shrink-0 bg-[#2F7BFF] sm:w-6" />
                                        A student&apos;s perspective
                                    </span>

                                    <blockquote className="mt-2 font-questrial text-[clamp(12px,1.55vw,22px)] font-medium leading-[1.5] tracking-[-0.015em] text-[#F3F5FA] sm:mt-3 sm:leading-[1.6]">
                                        &ldquo;{story.quote}&rdquo;
                                    </blockquote>

                                    {/* Author */}
                                    <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3 sm:mt-4 sm:gap-3.5 sm:pt-3.5">
                                        <span className="h-7 w-[3px] shrink-0 rounded-[10px] bg-gradient-to-b from-[#2F7BFF] to-[#A9C7FF] sm:h-[34px]" />

                                        <div className="min-w-0">
                                            <h3 className="font-questrial text-[11px] font-semibold leading-tight text-white sm:text-[16px]">
                                                {story.name}
                                            </h3>

                                            <p className="mt-0.5 break-words font-questrial text-[9px] leading-[1.5] text-[#A0A9BA] sm:text-[13px] sm:leading-[1.65]">
                                                {story.role} · {story.location}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Image Cards */}
                <div className="pointer-events-none absolute inset-0 z-[5]">
                    {stories.map((s, i) => {
                        const story = s as Story;

                        return (
                            <div
                                key={`card-${story.id}`}
                                ref={(el) => {
                                    if (el) cardRefs.current[i] = el;
                                }}
                                className="absolute top-1/2 -translate-y-1/2 overflow-hidden will-change-[transform,clip-path]"
                                style={{
                                    width: "var(--belt-cw)",
                                    height: "var(--belt-ch)",
                                    borderRadius:
                                        "clamp(12px, 1.6vw, 24px)",
                                }}
                            >
                                <Image
                                    src={story.image}
                                    alt={story.name}
                                    fill
                                    priority={i < 3}
                                    sizes="(max-width:767px) 84vw, (max-width:1023px) 58vw, 46vw"
                                    className="object-cover"
                                    style={{
                                        objectPosition:
                                            story.focus ?? "center 25%",
                                    }}
                                />

                                <div className="absolute inset-0 bg-gradient-to-b from-[#07090F]/25 via-transparent to-[#07090F]/55" />

                                {/* Name Tag */}
                                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between sm:bottom-5 sm:left-5 sm:right-5">
                                    <div className="min-w-0">
                                        <div className="font-questrial text-[12px] font-semibold text-white/95 sm:text-[15px]">
                                            {story.name}
                                        </div>

                                        <div className="mt-0.5 font-questrial text-[10px] text-white/65 sm:text-[13px]">
                                            {story.role}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Canvas Dissolve */}
                <canvas
                    ref={canvasRef}
                    className="pointer-events-none absolute inset-0 z-[7] block h-full w-full"
                />

                {/* Scanner Line */}
                <div
                    className="pointer-events-none absolute top-0 z-[8] w-0"
                    style={{
                        left: "var(--scanner-x)",
                        height: "100%",
                    }}
                >
                    <i
                        className="absolute -left-0.5 top-0 h-full w-1 rounded"
                        style={{
                            background:
                                "linear-gradient(180deg,#7AAEFF 0%,#2F7BFF 12%,#2F7BFF 88%,#7AAEFF 100%)",
                            boxShadow:
                                "0 0 10px 2px rgba(47,123,255,.75), 0 0 30px 8px rgba(47,123,255,.3)",
                        }}
                    />

                    <b
                        className="absolute left-0 h-[92%] w-[24px] rounded-r sm:w-[36px]"
                        style={{
                            top: "4%",
                            background:
                                "linear-gradient(90deg,rgba(47,123,255,.45),transparent)",
                            filter: "blur(6px)",
                        }}
                    />
                </div>
            </div>

            {/* ====================================================== */}
            {/* Footer Progress                                        */}
            {/* ====================================================== */}

            <div className="relative z-10 mx-auto mt-5 max-w-[90rem] px-5 sm:mt-8 sm:px-8 lg:px-20">
                <div className="flex items-center justify-between gap-4 sm:gap-6">

                    {/* Progress Indicators */}
                    <div className="flex flex-1 gap-1.5 sm:gap-[9px]">
                        {stories.map((s, i) => (
                            <button
                                key={s.id}
                                type="button"
                                aria-label={`Show story ${i + 1}`}
                                aria-current={
                                    i === activeIdx
                                        ? "true"
                                        : undefined
                                }
                                onClick={() => {
                                    const r = b.current;

                                    const target =
                                        -i * r.span +
                                        r.W / 2 -
                                        r.cw / 2 -
                                        r.span +
                                        r.period;

                                    r.off = target;
                                }}
                                className="relative h-1 flex-1 cursor-pointer overflow-hidden rounded-full bg-white/15 transition-colors hover:bg-white/25"
                            >
                                <span
                                    className="absolute inset-0 origin-left rounded-full bg-[#2F7BFF] transition-transform duration-300"
                                    style={{
                                        transform: `scaleX(${i === activeIdx ? 1 : 0
                                            })`,
                                    }}
                                />
                            </button>
                        ))}
                    </div>

                    {/* Current Story */}
                    <div className="flex shrink-0 items-center gap-2 whitespace-nowrap font-questrial text-[10px] tracking-[0.1em] text-[#A0A9BA] sm:gap-[9px] sm:text-[12px]">
                        <strong className="font-semibold text-[#A9C7FF]">
                            {String(activeIdx + 1).padStart(2, "0")}
                        </strong>

                        <span>/</span>

                        {String(stories.length).padStart(2, "0")}
                    </div>
                </div>
            </div>
        </section>
    );
}
