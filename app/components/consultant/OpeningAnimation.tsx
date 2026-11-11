"use client";

import { useEffect, useRef, useState } from "react";

const focus =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB547]";

export default function OpeningAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);
    const [phase, setPhase] = useState(0);
    // 0 → blackout + particles start
    // 1 → line sweep
    // 2 → logo + text
    // 3 → exit

    useEffect(() => {
        document.body.style.overflow = "hidden";

        // ---------- Particle field on canvas ----------
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let raf = 0;
        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        const PARTICLE_COUNT = 90;
        type P = {
            x: number; y: number;
            vx: number; vy: number;
            r: number; base: number;
            hue: 0 | 1; // 0 = amber, 1 = sky
        };
        const particles: P[] = Array.from({ length: PARTICLE_COUNT }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            r: Math.random() * 1.6 + 0.4,
            base: Math.random() * 0.5 + 0.25,
            hue: Math.random() > 0.7 ? 1 : 0,
        }));

        const onResize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", onResize);

        let t = 0;
        const draw = () => {
            t += 0.016;
            ctx.clearRect(0, 0, w, h);

            // faint connecting lines
            for (let i = 0; i < particles.length; i++) {
                const a = particles[i];
                for (let j = i + 1; j < particles.length; j++) {
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < 130 * 130) {
                        const alpha = (1 - Math.sqrt(d2) / 130) * 0.08;
                        ctx.strokeStyle = `rgba(255, 181, 71, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }

            // particles
            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;

                const twinkle = p.base + Math.sin(t + p.x * 0.01) * 0.25;
                const color =
                    p.hue === 0
                        ? `rgba(255, 181, 71, ${Math.max(twinkle, 0)})`
                        : `rgba(155, 209, 225, ${Math.max(twinkle, 0)})`;

                ctx.fillStyle = color;
                ctx.shadowColor = color;
                ctx.shadowBlur = 8;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.shadowBlur = 0;

            raf = requestAnimationFrame(draw);
        };
        draw();

        // ---------- Phase timeline ----------
        const t1 = setTimeout(() => setPhase(1), 350);   // line sweep
        const t2 = setTimeout(() => setPhase(2), 1250);  // logo + text
        const t3 = setTimeout(() => triggerExit(), 3800);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", onResize);
            clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
            document.body.style.overflow = "";
        };
    }, []);

    const triggerExit = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsVisible(false);
            document.body.style.overflow = "";
        }, 900);
    };

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${isExiting
                ? "pointer-events-none scale-110 opacity-0 blur-sm"
                : "scale-100 opacity-100 blur-0"
                }`}
        >
            {/* 1. Particle canvas (always running) */}
            <canvas
                ref={canvasRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full"
            />

            {/* 2. Vignette */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_85%)]"
            />

            {/* 3. Horizontal light sweep (phase 1) */}
            <div
                aria-hidden="true"
                className={`absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 transition-opacity duration-300 ${phase >= 1 ? "opacity-100" : "opacity-0"
                    }`}
            >
                <div className="h-full w-full bg-gradient-to-r from-transparent via-[#FFB547] to-transparent animate-[sweep_1.4s_ease-out_forwards]" />
            </div>

            {/* 4. Lens flare burst (phase 1 → 2) */}
            <div
                aria-hidden="true"
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${phase >= 1 ? "opacity-100" : "opacity-0"
                    }`}
            >
                <div className="h-40 w-40 animate-[flare_1.6s_ease-out_forwards] rounded-full bg-[#FFB547]/30 blur-3xl" />
                <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_40px_12px_rgba(255,181,71,0.9)] animate-[flareCore_1.6s_ease-out_forwards]" />
            </div>

            {/* 5. Center content (phase 2) */}
            <div className="relative z-10 flex flex-col items-center gap-7 px-6 text-center">

                {/* Logo mark */}
                <div
                    className={`relative flex h-24 w-24 items-center justify-center transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${phase >= 2
                        ? "translate-y-0 scale-100 opacity-100 blur-0"
                        : "translate-y-4 scale-75 opacity-0 blur-md"
                        }`}
                >
                    <span className="absolute inset-0 rounded-full border border-[#FFB547]/40" />
                    <span className="absolute inset-2 rounded-full border border-[#FFB547]/60 animate-[ringPulse_2.2s_ease-out_infinite]" />
                    <span className="absolute inset-4 rounded-full bg-[#FFB547]/10 backdrop-blur-sm" />
                    <span className="relative text-4xl font-bold tracking-tight text-[#FFB547]">
                        A
                    </span>
                </div>

                {/* Headline */}
                <h1
                    className={`font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight tracking-tight text-white transition-all duration-[800ms] ease-out ${phase >= 2
                        ? "translate-y-0 opacity-100"
                        : "translate-y-6 opacity-0"
                        }`}
                    style={{ transitionDelay: phase >= 2 ? "150ms" : "0ms" }}
                >
                    Build the software.
                    <br />
                    <span className="text-[#9bd1e1]">Shape the career.</span>
                </h1>

                {/* Loading bar */}
                <div
                    className={`mt-2 h-[2px] w-44 overflow-hidden rounded-full bg-white/10 transition-opacity duration-500 ${phase >= 2 ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <div className="h-full w-full origin-left bg-gradient-to-r from-[#FFB547] via-[#9bd1e1] to-[#FFB547] animate-[loadbar_2.2s_ease-in-out_forwards]" />
                </div>
            </div>


        </div>
    );
}