
"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { Questrial } from "next/font/google";
import type { Service } from "@/app/components/consultant/services/ServicesData";

const questrial = Questrial({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

type Props = {
    service: Service;
    tagline: string;
    pillarNumber?: string;
};

type Particle = {
    x: number;
    y: number;
    tx: number;
    ty: number;
    glyph: string;
    phase: number;
    size: number;
    opacity: number;
    delay: number;
};

const GLYPHS = "01·/+=<>";

/** Read a CSS variable from the closest element, with a safe hex fallback. */
function readVar(
    el: HTMLElement | null,
    name: string,
    fallback: string,
) {
    if (!el) return fallback;

    const v = getComputedStyle(el)
        .getPropertyValue(name)
        .trim();

    return v || fallback;
}

/** Mix two hex colors. */
function mixHex(a: string, b: string, t: number): string {
    const pa = a.match(/^#([0-9a-f]{6})$/i);
    const pb = b.match(/^#([0-9a-f]{6})$/i);

    if (!pa || !pb) return a;

    const na = parseInt(pa[1], 16);
    const nb = parseInt(pb[1], 16);

    const r = Math.round(
        ((na >> 16) & 255) * (1 - t) +
        ((nb >> 16) & 255) * t,
    );

    const g = Math.round(
        ((na >> 8) & 255) * (1 - t) +
        ((nb >> 8) & 255) * t,
    );

    const bl = Math.round(
        (na & 255) * (1 - t) +
        (nb & 255) * t,
    );

    return `#${(
        (1 << 24) +
        (r << 16) +
        (g << 8) +
        bl
    ).toString(16).slice(1)}`;
}

/** Convert hex to r, g, b for rgba() usage. */
function hexToRgb(hex: string): string {
    const m = hex.trim().match(/^#([0-9a-f]{6})$/i);

    if (!m) return "47, 123, 255";

    const n = parseInt(m[1], 16);

    return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

export default function ServiceSignalAnimation({
    service,
    tagline,
}: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d", { alpha: true });

        if (!canvas || !ctx) return;

        /* =====================================================
           1. READ THEME COLORS
        ===================================================== */

        const accent = readVar(
            wrapRef.current,
            "--ms-accent",
            "#2F7BFF",
        );

        const secondary = readVar(
            wrapRef.current,
            "--ms-secondary",
            "#7CC4FF",
        );

        /* =====================================================
           2. DERIVE PARTICLE COLORS
        ===================================================== */

        const CORE = mixHex(secondary, "#ffffff", 0.35);
        const MID = accent;
        const DEEP = mixHex(accent, "#000000", 0.35);

        let raf = 0;
        let width = 0;
        let height = 0;
        let startTime = 0;

        let particles: Particle[] = [];

        let reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        /* =====================================================
           3. BUILD PARTICLES
        ===================================================== */

        const buildParticles = () => {
            const rect = canvas.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);

            width = Math.max(320, Math.floor(rect.width));
            height = Math.max(170, Math.floor(rect.height));

            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const mask = document.createElement("canvas");

            mask.width = width;
            mask.height = height;

            const maskCtx = mask.getContext("2d", {
                willReadFrequently: true,
            });

            if (!maskCtx) return;

            const compact = width < 640;
            const title = service.title.toUpperCase();
            const vw = window.innerWidth || width;

            const clampFontPx = Math.min(
                Math.max(2.35 * 16, 0.082 * vw),
                5 * 16,
            );

            const baseFontPx =
                (clampFontPx / Math.max(vw, 1)) * width;

            let fontSize = Math.max(
                compact ? 26 : 44,
                baseFontPx,
            );

            const trackingEm = -0.015;

            /* Questrial typography for particle mask */

            const applyFont = (size: number) => {
                maskCtx.font = `${size}px Questrial, sans-serif`;
            };

            const measure = (text: string) => {
                let w = 0;

                for (const ch of text) {
                    w += maskCtx.measureText(ch).width;
                }

                w += trackingEm * (text.length - 1) * fontSize;

                return w;
            };

            applyFont(fontSize);

            const maxWidth = width * 0.94;
            let measured = measure(title);

            if (measured > maxWidth) {
                fontSize *= maxWidth / measured;
                applyFont(fontSize);
                measured = measure(title);
            }

            maskCtx.textAlign = "left";
            maskCtx.textBaseline = "middle";
            maskCtx.fillStyle = "#fff";

            const totalWidth = measure(title);
            let cursorX = width / 2 - totalWidth / 2;
            const cy = height / 2;

            for (const ch of title) {
                maskCtx.fillText(ch, cursorX, cy);

                cursorX +=
                    maskCtx.measureText(ch).width +
                    trackingEm * fontSize;
            }

            const pixels = maskCtx.getImageData(
                0,
                0,
                width,
                height,
            ).data;

            const stride = 4;
            const targets: Array<{ x: number; y: number }> = [];

            for (let y = 0; y < height; y += stride) {
                for (let x = 0; x < width; x += stride) {
                    if (
                        pixels[(y * width + x) * 4 + 3] > 110
                    ) {
                        targets.push({ x, y });
                    }
                }
            }

            const cap = compact ? 620 : 1150;

            const step = Math.max(
                1,
                Math.ceil(targets.length / cap),
            );

            particles = targets
                .filter((_, i) => i % step === 0)
                .map((point, i) => ({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    tx: point.x,
                    ty: point.y,
                    glyph: GLYPHS[
                        (i * 5 +
                            Math.floor(
                                Math.random() * GLYPHS.length,
                            )) % GLYPHS.length
                    ],
                    phase: Math.random() * Math.PI * 2,
                    size: compact
                        ? 4.6 + Math.random() * 1.3
                        : 5 + Math.random() * 1.6,
                    opacity: 0.55 + Math.random() * 0.4,
                    delay: Math.random() * 0.45,
                }));

            startTime = performance.now();
        };

        /* =====================================================
           4. DRAW PARTICLE ANIMATION
        ===================================================== */

        const draw = (now: number) => {
            const elapsed = (now - startTime) / 1000;

            ctx.clearRect(0, 0, width, height);

            ctx.save();

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.shadowColor = `rgba(${hexToRgb(accent)}, .95)`;
            ctx.shadowBlur = 10;

            for (const p of particles) {
                const localElapsed = reducedMotion
                    ? 1
                    : Math.min(
                        1,
                        Math.max(
                            0,
                            (elapsed - p.delay) / 1.9,
                        ),
                    );

                const localEase =
                    1 - Math.pow(1 - localElapsed, 3);

                const pull = 0.05 + localEase * 0.16;

                p.x += (p.tx - p.x) * pull;
                p.y += (p.ty - p.y) * pull;

                const settled = localElapsed > 0.98;

                const movement = reducedMotion
                    ? 0
                    : Math.sin(
                        now * 0.0009 + p.phase,
                    ) * (settled ? 0.5 : 2.0);

                const pulse = reducedMotion
                    ? 1
                    : 0.82 +
                    (Math.sin(
                        now * 0.0013 + p.phase,
                    ) + 1) * 0.09;

                ctx.globalAlpha =
                    p.opacity * pulse * (0.4 + localEase * 0.6);

                ctx.fillStyle =
                    localElapsed < 0.5
                        ? DEEP
                        : localElapsed < 0.85
                            ? MID
                            : CORE;

                /* Questrial particle font */

                ctx.font = `${p.size}px Questrial, sans-serif`;

                ctx.fillText(
                    p.glyph,
                    p.x + movement,
                    p.y,
                );
            }

            ctx.restore();

            if (!reducedMotion) {
                raf = window.requestAnimationFrame(draw);
            }
        };

        /* =====================================================
           5. INITIALIZE
        ===================================================== */

        buildParticles();
        draw(performance.now());

        /* =====================================================
           6. RESIZE HANDLER
        ===================================================== */

        const ro = new ResizeObserver(() => {
            buildParticles();

            if (reducedMotion) {
                draw(performance.now());
            }
        });

        ro.observe(canvas);

        /* =====================================================
           7. REDUCED MOTION HANDLER
        ===================================================== */

        const motionQuery = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        );

        const onMotionChange = (
            event: MediaQueryListEvent,
        ) => {
            reducedMotion = event.matches;

            window.cancelAnimationFrame(raf);

            startTime = performance.now();

            if (reducedMotion) {
                draw(performance.now());
            } else {
                raf = window.requestAnimationFrame(draw);
            }
        };

        motionQuery.addEventListener?.(
            "change",
            onMotionChange,
        );

        /* =====================================================
           8. CLEANUP
        ===================================================== */

        return () => {
            window.cancelAnimationFrame(raf);
            ro.disconnect();

            motionQuery.removeEventListener?.(
                "change",
                onMotionChange,
            );
        };
    }, [service.title]);

    /* =============================================================
       TITLE STYLES
    ============================================================= */

    const titleStyle = {
        "--title-delay": "180ms",
        textShadow:
            "0 0 1px rgba(255,255,255,.6), 0 0 18px color-mix(in srgb, var(--ms-accent) 55%, transparent), 0 0 42px color-mix(in srgb, var(--ms-secondary) 35%, transparent)",
    } as CSSProperties;

    /* =============================================================
       RENDER
    ============================================================= */

    return (
        <div
            ref={wrapRef}
            className={`${questrial.className} relative mx-auto flex w-full max-w-[1500px] flex-col items-center px-4 text-center sm:px-8`}
        >
            {/* =====================================================
               PARTICLE TITLE
            ===================================================== */}

            <div className="relative isolate flex min-h-[190px] w-full max-w-[1380px] items-center justify-center sm:min-h-[255px] lg:min-h-[310px]">
                <canvas
                    ref={canvasRef}
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-90"
                />

                <h1
                    style={titleStyle}
                    className="service-title-reveal relative z-10 mx-auto max-w-full px-1 py-5 text-center text-[clamp(2.35rem,8.2vw,5rem)] uppercase leading-[.98] tracking-[-.015em] text-[var(--ms-text)]"
                >
                    {service.title}
                </h1>
            </div>

            {/* =====================================================
               TAGLINE
            ===================================================== */}

            <p className="-mt-8 max-w-[780px] text-[14px] leading-6 text-[var(--ms-muted)] sm:text-[17px] sm:leading-7">
                {tagline}
            </p>

            {/* =====================================================
               CTA
            ===================================================== */}

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4">
                <a
                    href="/contact"
                    className="group inline-flex min-h-12 items-center gap-4 rounded-full border px-6 text-[10px] uppercase tracking-[.15em] transition duration-300 hover:-translate-y-1"
                    style={{
                        borderColor:
                            "color-mix(in srgb, var(--ms-accent) 60%, transparent)",
                        background: "var(--ms-accent)",
                        color: "var(--ms-background)",
                        boxShadow:
                            "0 0 38px color-mix(in srgb, var(--ms-accent) 28%, transparent)",
                    }}
                >
                    Discuss this service

                    <span className="text-base transition-transform group-hover:translate-x-1">
                        ↗
                    </span>
                </a>

                <span className="inline-flex items-center gap-2 px-3 text-[11px] uppercase tracking-[.16em] text-[var(--ms-muted)]">
                    <span
                        className="h-1 w-1 rounded-full"
                        style={{ background: "var(--ms-accent)" }}
                    />

                    Built around your next move
                </span>
            </div>

            {/* =====================================================
               SERVICE INFORMATION
            ===================================================== */}

            <div
                className="mt-10 grid w-full max-w-[850px] grid-cols-1 border-y sm:mt-14 sm:grid-cols-3"
                style={{
                    borderColor:
                        "color-mix(in srgb, var(--ms-text) 25%, transparent)",
                }}
            >
                {/* Primary Focus */}

                <div
                    className="px-4 py-4 sm:border-r"
                    style={{
                        borderColor:
                            "color-mix(in srgb, var(--ms-text) 15%, transparent)",
                    }}
                >
                    <p className="text-[14px] uppercase tracking-[.26em] text-[var(--ms-muted)]">
                        Primary focus
                    </p>

                    <p className="mt-2 text-[13px] text-[var(--ms-text)]">
                        {service.gets[0] ?? service.need}
                    </p>
                </div>

                {/* Designed For */}

                <div
                    className="border-t px-4 py-4 sm:border-r sm:border-t-0"
                    style={{
                        borderColor:
                            "color-mix(in srgb, var(--ms-text) 15%, transparent)",
                    }}
                >
                    <p className="text-[14px] uppercase tracking-[.26em] text-[var(--ms-muted)]">
                        Designed for
                    </p>

                    <p className="mt-2 text-[13px] text-[var(--ms-text)]">
                        {service.need}
                    </p>
                </div>

                {/* Delivery Approach */}

                <div
                    className="border-t px-4 py-4 sm:border-t-0"
                    style={{
                        borderColor:
                            "color-mix(in srgb, var(--ms-text) 15%, transparent)",
                    }}
                >
                    <p className="text-[14px] uppercase tracking-[.26em] text-[var(--ms-muted)]">
                        Delivery approach
                    </p>

                    <p className="mt-2 text-[13px] text-[var(--ms-text)]">
                        People-first, practical
                    </p>
                </div>
            </div>

            {/* =====================================================
               TITLE ANIMATION
            ===================================================== */}

            <style jsx>{`
                .service-title-reveal {
                    opacity: 0;
                    clip-path: inset(0 100% 0 0);
                    transform: translateY(18px) scale(.985);

                    animation:
                        serviceTitleReveal
                        1.15s
                        cubic-bezier(.16, 1, .3, 1)
                        var(--title-delay)
                        forwards,
                        serviceTitleGlow
                        3.6s
                        ease-in-out
                        1.4s
                        infinite;
                }

                @keyframes serviceTitleReveal {
                    0% {
                        opacity: 0;
                        clip-path: inset(0 100% 0 0);
                        transform: translateY(18px) scale(.985);
                        filter: blur(9px);
                    }

                    55% {
                        opacity: 1;
                        clip-path: inset(0 15% 0 0);
                        filter: blur(0);
                    }

                    100% {
                        opacity: 1;
                        clip-path: inset(0 0 0 0);
                        transform: translateY(0) scale(1);
                        filter: blur(0);
                    }
                }

                @keyframes serviceTitleGlow {
                    0%, 100% {
                        text-shadow:
                            0 0 1px rgba(255,255,255,.6),
                            0 0 18px color-mix(in srgb, var(--ms-accent) 55%, transparent),
                            0 0 42px color-mix(in srgb, var(--ms-secondary) 35%, transparent);
                    }

                    50% {
                        text-shadow:
                            0 0 1px rgba(255,255,255,.8),
                            0 0 26px color-mix(in srgb, var(--ms-accent) 75%, transparent),
                            0 0 60px color-mix(in srgb, var(--ms-secondary) 50%, transparent);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .service-title-reveal {
                        animation: none;
                        opacity: 1;
                        clip-path: none;
                        transform: none;
                        filter: none;
                    }
                }
            `}</style>
        </div>
    );
}
