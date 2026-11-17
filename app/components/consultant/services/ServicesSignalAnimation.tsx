"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import type { Service } from "@/app/components/consultant/services/ServicesData";

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
    delay: number; // 0..1 stagger for assembly
};

const GLYPHS = "01·/+=<>";
const BLUE_CORE = "#93c5fd";
const BLUE_MID = "#60a5fa";
const BLUE_DEEP = "#3b82f6";

export default function ServiceSignalAnimation({ service, tagline, pillarNumber }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d", { alpha: true });
        if (!canvas || !ctx) return;

        let raf = 0;
        let width = 0;
        let height = 0;
        let particles: Particle[] = [];
        let startTime = 0;
        let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
            const maskCtx = mask.getContext("2d", { willReadFrequently: true });
            if (!maskCtx) return;

            // Match the HTML heading's clamp() exactly so the particle word
            // overlays the real title with a near-perfect fit.
            const compact = width < 640;
            const title = service.title.toUpperCase();
            // HTML: clamp(2.35rem, 8.2vw, 5rem)
            const vw = window.innerWidth || width;
            const clampFontPx = Math.min(Math.max(2.35 * 16, 0.082 * vw * 16 / 16), 5 * 16);
            // In canvas coords we scale relative to canvas width for stability
            const baseFontPx = (clampFontPx / Math.max(vw, 1)) * width * 1.0;
            let fontSize = Math.max(compact ? 26 : 44, baseFontPx);
            const trackingEm = -0.015; // matches tracking-[-.015em]

            const applyFont = (size: number) => {
                maskCtx.font = `900 ${size}px Arial, Helvetica, sans-serif`;
            };

            const measureWithTracking = (text: string) => {
                let w = 0;
                for (const ch of text) w += maskCtx.measureText(ch).width;
                w += trackingEm * (text.length - 1) * fontSize;
                return w;
            };

            applyFont(fontSize);
            const maxWidth = width * 0.94;
            let measured = measureWithTracking(title);
            if (measured > maxWidth) {
                fontSize *= maxWidth / measured;
                applyFont(fontSize);
                measured = measureWithTracking(title);
            }

            maskCtx.textAlign = "left";
            maskCtx.textBaseline = "middle";
            maskCtx.fillStyle = "#fff";

            // Draw glyph-by-glyph with the same tracking as the HTML title
            const totalWidth = measureWithTracking(title);
            let cursorX = width / 2 - totalWidth / 2;
            const cy = height / 2;
            for (const ch of title) {
                maskCtx.fillText(ch, cursorX, cy);
                cursorX += maskCtx.measureText(ch).width + trackingEm * fontSize;
            }

            const pixels = maskCtx.getImageData(0, 0, width, height).data;
            const stride = 4;
            const targets: Array<{ x: number; y: number }> = [];
            for (let y = 0; y < height; y += stride) {
                for (let x = 0; x < width; x += stride) {
                    if (pixels[(y * width + x) * 4 + 3] > 110) targets.push({ x, y });
                }
            }

            const cap = compact ? 620 : 1150;
            const step = Math.max(1, Math.ceil(targets.length / cap));
            particles = targets.filter((_, i) => i % step === 0).map((point, i) => ({
                x: Math.random() * width,
                y: Math.random() * height,
                tx: point.x,
                ty: point.y,
                glyph: GLYPHS[(i * 5 + Math.floor(Math.random() * GLYPHS.length)) % GLYPHS.length],
                phase: Math.random() * Math.PI * 2,
                size: compact ? 4.6 + Math.random() * 1.3 : 5 + Math.random() * 1.6,
                opacity: 0.55 + Math.random() * 0.4,
                delay: Math.random() * 0.45, // 0..0.45s arrival offset
            }));
            startTime = performance.now();
        };

        const draw = (now: number) => {
            const elapsed = (now - startTime) / 1000;
            const progress = reducedMotion ? 1 : Math.min(1, elapsed / 2.2);
            const globalEase = 1 - Math.pow(1 - progress, 3);

            ctx.clearRect(0, 0, width, height);


            ctx.save();
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.shadowColor = "rgba(96,165,250,.95)";
            ctx.shadowBlur = 10;

            for (const p of particles) {
                // Per-particle staggered assembly: each particle has its own progress
                const localElapsed = reducedMotion
                    ? 1
                    : Math.min(1, Math.max(0, (elapsed - p.delay) / 1.9));
                const localEase = 1 - Math.pow(1 - localElapsed, 3);
                const pull = 0.05 + localEase * 0.16;

                p.x += (p.tx - p.x) * pull;
                p.y += (p.ty - p.y) * pull;

                const settled = localElapsed > 0.98;
                const movement = reducedMotion
                    ? 0
                    : Math.sin(now * 0.0009 + p.phase) * (settled ? 0.5 : 2.0);
                const pulse = reducedMotion
                    ? 1
                    : 0.82 + (Math.sin(now * 0.0013 + p.phase) + 1) * 0.09;

                ctx.globalAlpha = p.opacity * pulse * (0.4 + localEase * 0.6);

                // Blue-theme color: deep → mid → core as it settles
                const colorPhase = localElapsed;
                ctx.fillStyle =
                    colorPhase < 0.5
                        ? BLUE_DEEP
                        : colorPhase < 0.85
                            ? BLUE_MID
                            : BLUE_CORE;

                ctx.font = `700 ${p.size}px ui-monospace, SFMono-Regular, Menlo, monospace`;
                ctx.fillText(p.glyph, p.x + movement, p.y);
            }
            ctx.restore();

            if (!reducedMotion) raf = window.requestAnimationFrame(draw);
        };

        buildParticles();
        draw(performance.now());

        const resizeObserver = new ResizeObserver(() => {
            buildParticles();
            if (reducedMotion) draw(performance.now());
        });
        resizeObserver.observe(canvas);

        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const onMotionChange = (event: MediaQueryListEvent) => {
            reducedMotion = event.matches;
            window.cancelAnimationFrame(raf);
            startTime = performance.now();
            if (reducedMotion) draw(performance.now());
            else raf = window.requestAnimationFrame(draw);
        };
        motionQuery.addEventListener?.("change", onMotionChange);

        return () => {
            window.cancelAnimationFrame(raf);
            resizeObserver.disconnect();
            motionQuery.removeEventListener?.("change", onMotionChange);
        };
    }, [service.title]);

    const titleStyle = {
        "--title-delay": "180ms",
    } as CSSProperties;

    return (
        <div className="relative mx-auto flex w-full max-w-[1500px] flex-col items-center px-4 text-center sm:px-8">


            <div className="relative isolate flex min-h-[190px] w-full max-w-[1380px] items-center justify-center sm:min-h-[255px] lg:min-h-[310px]">
                <canvas
                    ref={canvasRef}
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-90"
                />
                {/* Transparent heading — no background color, blue-only glow */}
                <h1
                    style={titleStyle}
                    className="service-title-reveal relative z-10 mx-auto max-w-full px-1 py-5 text-center text-[clamp(2.35rem,8.2vw,5rem)] font-black uppercase leading-[.98] tracking-[-.015em] text-white [text-shadow:0_0_1px_rgba(255,255,255,.6),0_0_18px_rgba(96,165,250,.55),0_0_42px_rgba(59,130,246,.35)]"
                >
                    {service.title}
                </h1>
            </div>

            <p className=" max-w-[780px] -mt-8 text-[14px] leading-2 text-[#d5deee]  sm:text-[17px] ">
                {tagline}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4">
                <a
                    href="/contact"
                    className="group inline-flex min-h-12 items-center gap-4 rounded-full border border-[#76aaff]/60 bg-[#2F7BFF] px-6 text-[10px] font-bold uppercase tracking-[.15em] text-white shadow-[0_0_38px_rgba(47,123,255,.28)] transition duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-[#080a0f]"
                >
                    Discuss this service
                    <span className="text-base transition-transform group-hover:translate-x-1">↗</span>
                </a>
                <span className="inline-flex items-center gap-2 px-3 text-[9px] font-semibold uppercase tracking-[.16em] text-white/60">
                    <span className="h-1 w-1 rounded-full bg-[#78aaff]" />
                    Built around your next move
                </span>
            </div>

            <div className="mt-10 grid w-full max-w-[850px] grid-cols-1 border-y border-white/35 sm:mt-14 sm:grid-cols-3">
                <div className="px-4 py-4 sm:border-r sm:border-white/15">
                    <p className="text-[14px] font-bold uppercase tracking-[.29em] text-white/45">Primary focus</p>
                    <p className="mt-2 text-[12px] text-white/90">{service.gets[0] ?? service.need}</p>
                </div>
                <div className="border-t border-white/15 px-4 py-4 sm:border-r sm:border-t-0 sm:border-white/15">
                    <p className="text-[14px] font-bold uppercase tracking-[.29em] text-white/45">Designed for</p>
                    <p className="mt-2 text-[12px] text-white/90">{service.need}</p>
                </div>
                <div className="border-t border-white/15 px-4 py-4 sm:border-t-0">
                    <p className="text-[14px] font-bold uppercase tracking-[.29em] text-white/45">Delivery approach</p>
                    <p className="mt-2 text-[12px] text-white/90">People-first, practical</p>
                </div>
            </div>

            <style jsx>{`
        .service-title-reveal {
          opacity: 0;
          clip-path: inset(0 100% 0 0);
          transform: translateY(18px) scale(.985);
          animation: serviceTitleReveal 1.15s cubic-bezier(.16, 1, .3, 1) var(--title-delay) forwards,
                     serviceTitleGlow 3.6s ease-in-out 1.4s infinite;
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
              0 0 18px rgba(96,165,250,.55),
              0 0 42px rgba(59,130,246,.35);
          }
          50% {
            text-shadow:
              0 0 1px rgba(255,255,255,.8),
              0 0 26px rgba(96,165,250,.75),
              0 0 60px rgba(59,130,246,.5);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .service-title-reveal {
            animation: none;
            opacity: 1;
            clip-path: none;
            transform: none;
            filter: none;
            text-shadow:
              0 0 1px rgba(255,255,255,.6),
              0 0 18px rgba(96,165,250,.55),
              0 0 42px rgba(59,130,246,.35);
          }
        }
      `}</style>
        </div>
    );
}