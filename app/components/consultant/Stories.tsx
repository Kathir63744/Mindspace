"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { stories, storiesContent } from "./data";

/* ================================================================== */
/*  Types                                                              */
/* ================================================================== */

interface Story {
    id: string;
    name: string;
    role: string;
    location: string;
    image: string;
    quote: string;
    focus?: string; // object-position override
}

/* ================================================================== */
/*  Constants                                                          */
/* ================================================================== */

const LINE_X_RATIO = 0.5;
const MAX_DPR = 2;
const BG = "#07090F";
const PANEL = "#0D121D";

const PALETTE = [
    "#1B4FFF", "#2F7BFF", "#4A8FFF", "#6AA8FF",
    "#A9C7FF", "#D6E4FF", "#F0F6FF",
] as const;

function hash3(a: number, b: number, c: number): number {
    let h = (a * 374761393 + b * 668265263 + c * 2147483647) | 0;
    h = ((h ^ (h >>> 13)) * 1274126177) | 0;
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */

export default function Stories() {
    const beltRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cardRefs = useRef<HTMLDivElement[]>([]);
    const panelRefs = useRef<HTMLDivElement[]>([]);

    const sparks = useRef<
        { x: number; y: number; vx: number; vy: number; life: number; size: number; color: string }[]
    >([]);

    const [paused, setPaused] = useState(false);
    const [activeIdx, setActiveIdx] = useState(0);

    const b = useRef({
        cw: 0, ch: 0, gap: 0, span: 0, period: 0,
        off: 0, vel: 0, hover: 0,
        dragging: false, lastX: 0, lastT: 0,
        Lx: 0, W: 0, H: 0, dpr: 1,
        reduced: false, autoSpeed: 0,
        raf: 0, lastFrame: 0,
    });

    const mod = (n: number, m: number) => ((n % m) + m) % m;

    /* ================================================================ */
    /*  Measure                                                          */
    /* ================================================================ */

    const measure = useCallback(() => {
        const r = b.current;
        const firstCard = cardRefs.current[0];
        if (!firstCard) return;

        const rect = firstCard.getBoundingClientRect();
        r.cw = rect.width;
        r.ch = rect.height;

        const gapCss = getComputedStyle(document.documentElement)
            .getPropertyValue("--belt-gap").trim();
        const tmp = document.createElement("div");
        tmp.style.width = gapCss || "4.75vw";
        document.body.appendChild(tmp);
        r.gap = tmp.getBoundingClientRect().width;
        tmp.remove();

        r.span = r.cw + r.gap;
        r.period = r.span * stories.length;

        r.Lx = window.innerWidth * LINE_X_RATIO;
        r.W = beltRef.current?.clientWidth ?? window.innerWidth;
        r.H = beltRef.current?.clientHeight ?? window.innerHeight;

        r.dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
        const cv = canvasRef.current;
        if (cv) {
            cv.width = r.W * r.dpr;
            cv.height = r.H * r.dpr;
            cv.style.width = r.W + "px";
            cv.style.height = r.H + "px";
        }

        r.autoSpeed = r.reduced ? 0 : -0.075 * window.innerWidth;
        if (r.off === 0) r.off = r.W / 2 - 0.62 * r.cw;
    }, []);

    /* ================================================================ */
    /*  Position + sequential panel reveal                              */
    /* ================================================================ */

    const positionCards = useCallback(() => {
        const r = b.current;
        if (!r.period) return;

        /* Find the card currently crossing the line */
        let crossingIdx = -1;
        let crossingProgress = 0;

        for (let i = 0; i < stories.length; i++) {
            const x = mod(r.off + i * r.span + r.span, r.period) - r.span;
            const cut = Math.max(0, Math.min(r.cw, r.Lx - x));
            if (cut > 0 && cut < r.cw) {
                crossingIdx = i;
                crossingProgress = cut / r.cw;
                break;
            }
        }

        /* Position every card; hide its panel unless it's the crossing one */
        for (let i = 0; i < stories.length; i++) {
            const x = mod(r.off + i * r.span + r.span, r.period) - r.span;
            const cut = Math.max(0, Math.min(r.cw, r.Lx - x));

            const card = cardRefs.current[i];
            const panel = panelRefs.current[i];

            /* ---- card (image) ---- */
            if (card) {
                card.style.transform = `translate3d(${x}px,0,0)`;
                card.style.clipPath =
                    cut > 0 ? `inset(0 0 0 ${cut}px round 0 1.6vw 1.6vw 0)` : "none";
                card.style.opacity = cut >= r.cw ? "0" : "1";
            }

            /* ---- panel (left of line) ---- */
            if (panel) {
                const isCrossing = i === crossingIdx;

                if (isCrossing) {
                    /* reveal in two phases:
                       - 0 → 0.25 : logo pops in
                       - 0.25 → 0.7 : content fades up
                       - 0.7 → 1.0 : hold, then fade out as next card approaches */
                    const logoIn = Math.min(1, crossingProgress / 0.25);
                    const contentIn = Math.max(0, Math.min(1, (crossingProgress - 0.25) / 0.45));
                    const fadeOut = crossingProgress > 0.85
                        ? Math.max(0, 1 - (crossingProgress - 0.85) / 0.15)
                        : 1;

                    const panelAlpha = fadeOut;
                    panel.style.opacity = String(panelAlpha);

                    const logo = panel.firstElementChild as HTMLDivElement | null;
                    if (logo) {
                        logo.style.opacity = String(logoIn * fadeOut);
                        logo.style.transform = `scale(${0.85 + 0.15 * logoIn})`;
                    }

                    const content = panel.lastElementChild as HTMLDivElement | null;
                    if (content) {
                        content.style.opacity = String(contentIn * fadeOut);
                        content.style.transform = `translateY(${(1 - contentIn) * 14}px)`;
                    }
                } else {
                    panel.style.opacity = "0";
                }
            }
        }

        if (crossingIdx !== -1 && crossingIdx !== activeIdx) setActiveIdx(crossingIdx);
    }, [activeIdx]);

    /* ================================================================ */
    /*  Canvas — soft blue dissolve + light sparks                     */
    /* ================================================================ */

    const drawFx = useCallback((t: number) => {
        const r = b.current;
        const cv = canvasRef.current;
        if (!cv || !r.cw) return;
        const ctx = cv.getContext("2d");
        if (!ctx) return;

        ctx.setTransform(r.dpr, 0, 0, r.dpr, 0, 0);
        ctx.clearRect(0, 0, r.W, r.H);

        const cardTop = (r.H - r.ch) / 2;
        const Lx = r.Lx;
        const HAZE_W = 100;
        const R = r.cw * 0.22;
        const GRID = 3;
        const rows = Math.ceil(r.ch / GRID) + 4;

        for (let i = 0; i < stories.length; i++) {
            const x = mod(r.off + i * r.span + r.span, r.period) - r.span;
            const right = x + r.cw;
            if (right < Lx) continue;
            const cut = Math.max(0, Math.min(r.cw, Lx - x));
            if (cut <= 0 || cut >= r.cw) continue;

            /* haze */
            const hazeW = Math.min(HAZE_W, right - Lx);
            if (hazeW > 0) {
                const g = ctx.createLinearGradient(Lx, 0, Lx + HAZE_W, 0);
                g.addColorStop(0, "rgba(47,123,255,0.30)");
                g.addColorStop(1, "rgba(47,123,255,0)");
                ctx.fillStyle = g;
                ctx.fillRect(Lx, cardTop, hazeW, r.ch);
            }

            /* particles */
            const startCol = Math.floor(cut / GRID);
            const endCol = Math.ceil((cut + R) / GRID);
            const tick = Math.floor(t * 8) + 97;

            for (let gx = startCol; gx <= endCol; gx++) {
                const sx = x + gx * GRID;
                const d = sx - Lx;
                if (d < 0 || d > R) continue;
                const p = Math.pow(1 - d / R, 2.2) * 0.55;
                if (p <= 0.004) continue;

                for (let row = -4; row <= rows + 4; row++) {
                    const inside = row >= 0 && row <= rows - 4;
                    const prob = inside ? p : p * 0.12 * Math.max(0, 1 - Math.abs(row) / 4);
                    if (hash3(gx, row, i) >= prob) continue;
                    if (hash3(gx, row, tick) < 0.3) continue;

                    const h2 = hash3(row, gx, i + 31);
                    const near = d < 8;
                    const ci = near ? 4 + Math.floor(h2 * 3) : Math.floor(h2 * h2 * 7);
                    const color = PALETTE[Math.min(6, ci)];

                    const jx = (hash3(gx, row, i + 7) - 0.5) * 1.4;
                    const jy = (hash3(gx, row, i + 11) - 0.5) * 1.4;
                    const size = 0.9 + h2 * 1.3;

                    ctx.fillStyle = color;
                    ctx.globalAlpha = (inside ? 0.85 : 0.25) * (1 - d / R);
                    ctx.fillRect(sx + jx, cardTop + row * GRID + jy, size, size);
                }
            }
            ctx.globalAlpha = 1;
        }

        /* rare sparks */
        if (!r.reduced && Math.random() < 0.15) {
            sparks.current.push({
                x: Lx + Math.random() * 16,
                y: cardTop + Math.random() * r.ch,
                vx: -20 + Math.random() * 40 + r.vel * 0.4,
                vy: (Math.random() - 0.5) * 30,
                life: 0.4 + Math.random() * 0.6,
                size: 0.6 + Math.random() * 1.2,
                color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
            });
        }

        const dt = 1 / 60;
        for (let s = sparks.current.length - 1; s >= 0; s--) {
            const sp = sparks.current[s];
            sp.life -= dt;
            if (sp.life <= 0) { sparks.current.splice(s, 1); continue; }
            sp.x += sp.vx * dt;
            sp.y += sp.vy * dt;
            ctx.globalAlpha = Math.min(0.75, sp.life * 1.6);
            ctx.fillStyle = sp.color;
            ctx.fillRect(sp.x, sp.y, sp.size, sp.size);
        }
        ctx.globalAlpha = 1;
    }, []);

    /* ================================================================ */
    /*  Main loop                                                        */
    /* ================================================================ */

    const loop = useCallback((now: number) => {
        const r = b.current;
        const dt = Math.min(0.05, (now - r.lastFrame) / 1000 || 0.016);
        r.lastFrame = now;

        const targetHover = paused ? 1 : 0;
        r.hover += (targetHover - r.hover) * (1 - Math.exp(-4 * dt));

        if (!r.dragging) {
            const target = r.autoSpeed * (1 - 0.65 * r.hover);
            r.vel += (target - r.vel) * (1 - Math.exp(-2.2 * dt));
            r.off += r.vel * dt;
        }

        positionCards();
        drawFx(now / 1000);
        r.raf = requestAnimationFrame(loop);
    }, [paused, positionCards, drawFx]);

    /* ================================================================ */
    /*  Drag / wheel                                                     */
    /* ================================================================ */

    const onPointerDown = useCallback((e: React.PointerEvent) => {
        const r = b.current;
        r.dragging = true;
        r.lastX = e.clientX;
        r.lastT = performance.now();
        beltRef.current?.classList.add("dragging");
        (e.target as Element).setPointerCapture?.(e.pointerId);
    }, []);

    const onPointerMove = useCallback((e: React.PointerEvent) => {
        const r = b.current;
        if (!r.dragging) return;
        const dx = e.clientX - r.lastX;
        const dt = Math.max(8, performance.now() - r.lastT);
        r.off += dx;
        r.vel = (dx / dt) * 1000 * 0.8 + r.vel * 0.2;
        r.lastX = e.clientX;
        r.lastT = performance.now();
    }, []);

    const onPointerUp = useCallback((e: React.PointerEvent) => {
        const r = b.current;
        r.dragging = false;
        beltRef.current?.classList.remove("dragging");
        (e.target as Element).releasePointerCapture?.(e.pointerId);
    }, []);

    const onWheel = useCallback((e: React.WheelEvent) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            b.current.vel += -e.deltaX * 6;
        }
    }, []);

    /* ================================================================ */
    /*  Lifecycle                                                        */
    /* ================================================================ */

    useEffect(() => {
        const r = b.current;
        r.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        measure();
        positionCards();

        const onResize = () => { measure(); positionCards(); };
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
    /*  Render                                                           */
    /* ================================================================ */

    return (
        <section
            id="stories"
            className="relative w-full select-none overflow-hidden bg-[#07090F] py-24 sm:py-32"
            style={
                {
                    "--belt-cw": "min(46vw, 660px)",
                    "--belt-ch": "min(52vh, 460px)",
                    "--belt-gap": "4.75vw",
                    "--panel-w": "min(38vw, 540px)",
                } as React.CSSProperties
            }
        >
            <style>{`
        @media (max-width:767px){
          #stories{
            --belt-cw:84vw;
            --belt-ch:64vw;
            --belt-gap:7vw;
            --panel-w:86vw;
          }
        }
        .belt-grab{cursor:grab}
        .belt-grab.dragging{cursor:grabbing}
      `}</style>

            <div className="pointer-events-none absolute left-[-16rem] top-0 h-[520px] w-[520px] rounded-full bg-[#2F7BFF]/10 blur-[140px]" />
            <div className="pointer-events-none absolute bottom-0 right-[-16rem] h-[520px] w-[520px] rounded-full bg-[#2F7BFF]/10 blur-[140px]" />

            <div className="relative z-10 mx-auto max-w-[90rem] px-6 sm:px-8 lg:px-20">
                <div className="mb-12 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
                    <div>
                        <span className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#A9C7FF] before:h-px before:w-6 before:bg-[#2F7BFF] before:content-['']">
                            Student experiences
                        </span>
                        <h2 className="mt-6 max-w-2xl font-display text-4xl font-medium leading-[1.08] tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">
                            {storiesContent.heading.split(" ").slice(0, 2).join(" ")}
                            <span className="block text-[#A9C7FF]">
                                {storiesContent.heading.split(" ").slice(2).join(" ")}
                            </span>
                        </h2>
                    </div>
                    <p className="max-w-sm text-sm leading-7 text-white/50">
                        {storiesContent.body}
                    </p>
                </div>
            </div>

            {/* ============== BELT ============== */}
            <div
                ref={beltRef}
                className="belt-grab relative mx-auto w-full touch-pan-y overflow-hidden"
                style={{ height: "calc(var(--belt-ch) + 60px)" }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onWheel={onWheel}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                {/* ---------- LEFT panels (one per story, anchored left of line) ---------- */}
                <div className="pointer-events-none absolute inset-0 z-[6]">
                    {stories.map((s, i) => {
                        const story = s as Story;
                        return (
                            <div
                                key={`panel-${story.id}`}
                                ref={(el) => { if (el) panelRefs.current[i] = el; }}
                                className="absolute top-1/2 flex -translate-y-1/2 flex-col justify-center will-change-[opacity,transform]"
                                style={{
                                    right: "calc(50% + 20px)",        // anchored just left of the line
                                    width: "var(--panel-w)",
                                    maxWidth: "calc(50vw - 32px)",    // never cross the line
                                    opacity: 0,
                                }}
                            >
                                {/* circular logo */}
                                <div
                                    className="mb-5 h-[clamp(56px,7vw,88px)] w-[clamp(56px,7vw,88px)] shrink-0 overflow-hidden rounded-full border-2 border-[#2F7BFF]/40 shadow-[0_0_24px_rgba(47,123,255,0.35)] will-change-[opacity,transform]"
                                    style={{ opacity: 0, transform: "scale(0.85)" }}
                                >
                                    <Image
                                        src={story.image}
                                        alt={`${story.name} logo`}
                                        width={88}
                                        height={88}
                                        className="h-full w-full object-cover"
                                        style={{ objectPosition: story.focus ?? "center 25%" }}
                                    />
                                </div>

                                {/* content container */}
                                <div
                                    className="rounded-[16px] border border-white/10 p-[clamp(16px,2.2vw,28px)] backdrop-blur-md will-change-[opacity,transform]"
                                    style={{
                                        background: `linear-gradient(180deg, ${PANEL}F2 0%, ${BG}FA 100%)`,
                                        opacity: 0,
                                        transform: "translateY(14px)",
                                    }}
                                >
                                    <span className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#A9C7FF] before:h-px before:w-6 before:bg-[#2F7BFF] before:content-['']">
                                        A student&apos;s perspective
                                    </span>

                                    <blockquote className="mt-3 text-[clamp(14px,1.35vw,18px)] font-medium leading-[1.55] tracking-[-0.01em] text-[#F3F5FA]">
                                        &ldquo;{story.quote}&rdquo;
                                    </blockquote>

                                    <div className="mt-4 flex items-center gap-3.5 border-t border-white/10 pt-3.5">
                                        <span className="h-[34px] w-[3px] rounded-[10px] bg-gradient-to-b from-[#2F7BFF] to-[#A9C7FF]" />
                                        <div>
                                            <h3 className="text-[14px] font-semibold text-white">
                                                {story.name}
                                            </h3>
                                            <p className="mt-0.5 text-[11px] leading-[1.6] text-[#A0A9BA]">
                                                {story.role} · {story.location}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ---------- RIGHT image cards ---------- */}
                <div className="pointer-events-none absolute inset-0 z-[5]">
                    {stories.map((s, i) => {
                        const story = s as Story;
                        return (
                            <div
                                key={`card-${story.id}`}
                                ref={(el) => { if (el) cardRefs.current[i] = el; }}
                                className="absolute top-1/2 -translate-y-1/2 overflow-hidden will-change-[transform,clip-path]"
                                style={{
                                    width: "var(--belt-cw)",
                                    height: "var(--belt-ch)",
                                    borderRadius: "1.6vw",
                                }}
                            >
                                <Image
                                    src={story.image}
                                    alt={story.name}
                                    fill
                                    priority={i < 3}
                                    sizes="(max-width:767px) 84vw, 46vw"
                                    className="object-cover"
                                    style={{ objectPosition: story.focus ?? "center 25%" }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-[#07090F]/25 via-transparent to-[#07090F]/55" />

                                {/* soft name tag bottom-left so each card reads on its own */}
                                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                                    <div>
                                        <div className="text-[13px] font-semibold text-white/95">
                                            {story.name}
                                        </div>
                                        <div className="mt-0.5 text-[11px] text-white/60">
                                            {story.role}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ---------- canvas dissolve ---------- */}
                <canvas
                    ref={canvasRef}
                    className="pointer-events-none absolute inset-0 z-[7] block h-full w-full"
                />

                {/* ---------- scanner line ---------- */}
                <div
                    className="pointer-events-none absolute top-0 z-[8] w-0"
                    style={{ left: `${LINE_X_RATIO * 100}%`, height: "100%" }}
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
                        className="absolute left-0 h-[92%] w-[36px] rounded-r"
                        style={{
                            top: "4%",
                            background:
                                "linear-gradient(90deg,rgba(47,123,255,.45),transparent)",
                            filter: "blur(6px)",
                        }}
                    />
                </div>
            </div>

            {/* ---------- footer progress ---------- */}
            <div className="relative z-10 mx-auto mt-8 max-w-[90rem] px-6 sm:px-8 lg:px-20">
                <div className="flex items-center justify-between gap-6 max-sm:gap-3">
                    <div className="flex flex-1 gap-[9px] max-sm:gap-[5px]">
                        {stories.map((s, i) => (
                            <button
                                key={s.id}
                                type="button"
                                aria-label={`Show story ${i + 1}`}
                                aria-current={i === activeIdx ? "true" : undefined}
                                onClick={() => {
                                    const r = b.current;
                                    const target =
                                        -i * r.span + r.W / 2 - r.cw / 2 - r.span + r.period;
                                    r.off = target;
                                }}
                                className="relative h-1 flex-1 cursor-pointer overflow-hidden rounded-[20px] bg-white/15"
                            >
                                <span
                                    className="absolute inset-0 origin-left bg-[#2F7BFF] transition-transform duration-300"
                                    style={{ transform: `scaleX(${i === activeIdx ? 1 : 0})` }}
                                />
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-[9px] whitespace-nowrap text-[11px] tracking-[0.1em] text-[#A0A9BA]">
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