//consultant/app/components/consultant/services/ServicesUi.tsx
"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import type { IconName } from "./ServicesData";

/* ============================================================
   Palette (blue only): navy #334da1ff · dark blue #0A1A4A · ocean #1E6BFF / #2F7BFF · sky #7CC4FF
   ============================================================ */

export const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";

export const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4aa3ff]";

const CSS = `
@keyframes ms-sway-a{0%{transform:rotate(-2.2deg)}100%{transform:rotate(2.2deg)}}
@keyframes ms-sway-b{0%{transform:rotate(2.6deg) scaleX(1.02)}100%{transform:rotate(-2.6deg) scaleX(1)}}
@keyframes ms-pulse-glow{0%,100%{opacity:.75}50%{opacity:1}}
@keyframes ms-spin{to{transform:rotate(360deg)}}
@keyframes ms-spin-rev{to{transform:rotate(-360deg)}}
@keyframes ms-drift{0%{transform:translateX(0)}100%{transform:translateX(-60px)}}
@keyframes ms-pop{from{opacity:0;transform:translateY(18px) scale(.97)}to{opacity:1;transform:none}}
@keyframes ms-scroll-hint{0%{transform:translateY(-100%)}100%{transform:translateY(100%)}}
@media (prefers-reduced-motion: reduce){
  .ms-anim,.ms-anim *{animation:none!important}
}
`;

export const StyleTag = () => <style>{CSS}</style>;

/* ============================================================
   Hooks + reveal
============================================================ */

export function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(
    () => setR(window.matchMedia("(prefers-reduced-motion: reduce)").matches),
    []
  );
  return r;
}

/**
 * Called as `useInView<T>(threshold)`.
 * Returns `{ ref, inView }`.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.2
): { ref: RefObject<T | null>; inView: boolean } {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export function Reveal({
  children,
  delay = 0,
  x = 0,
  y = 28,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  x?: number;
  y?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : `translate3d(${x}px, ${y}px, 0)`,
        transition: `opacity 800ms ease ${delay}ms, transform 900ms ${EASE_OUT} ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ============================================================
   Icons
============================================================ */

const PATHS: Record<IconName, ReactNode> = {
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  mobile: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  code: <path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14" />,
  pen: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
    </>
  ),
  university: (
    <>
      <path d="M3 10l9-5 9 5" />
      <path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" />
    </>
  ),
  file: (
    <>
      <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  cap: (
    <>
      <path d="M2 9l10-5 10 5-10 5L2 9z" />
      <path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5M22 9v6" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </>
  ),
  trend: (
    <>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18" />
    </>
  ),
  star: (
    <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z" />
  ),
  spark: (
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l3 3M15 15l3 3M6 18l3-3M15 9l3-3" />
  ),
  chat: <path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.5A8 8 0 1121 12z" />,
  check: <path d="M5 13l4 4L19 7" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0113 0M16 4.6a3.5 3.5 0 010 6.8M18 14.2A6.5 6.5 0 0121.5 20" />
    </>
  ),
};

export function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}

/* ============================================================
   Small building blocks
============================================================ */

export function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] uppercase tracking-[0.26em] ${
        light
          ? "border-[#BBD8FF] bg-white text-[#1E6BFF]"
          : "border-[#2F7BFF]/40 bg-[#2F7BFF]/10 text-[#9CCBFF]"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          light ? "bg-[#1E6BFF]" : "bg-[#7CC4FF]"
        }`}
      />
      {children}
    </span>
  );
}

export function GradientText({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <span
      className={`bg-clip-text text-transparent ${
        light
          ? "bg-gradient-to-r from-[#0B3FA8] via-[#1E6BFF] to-[#38A9FF]"
          : "bg-gradient-to-r from-[#9CD3FF] via-[#4F9BFF] to-[#1E6BFF]"
      }`}
    >
      {children}
    </span>
  );
}

export function CornerTicks({
  className = "text-[#7CC4FF]/70",
  size = 16,
  offset = -1,
}: {
  className?: string;
  size?: number;
  offset?: number;
}) {
  const base = "pointer-events-none absolute border-current";
  const st = (p: CSSProperties): CSSProperties => ({
    width: size,
    height: size,
    ...p,
  });
  return (
    <span aria-hidden="true" className={className}>
      <span
        className={`${base} border-l border-t`}
        style={st({ left: offset, top: offset })}
      />
      <span
        className={`${base} border-r border-t`}
        style={st({ right: offset, top: offset })}
      />
      <span
        className={`${base} border-b border-l`}
        style={st({ left: offset, bottom: offset })}
      />
      <span
        className={`${base} border-b border-r`}
        style={st({ right: offset, bottom: offset })}
      />
    </span>
  );
}

export function RayBurst({
  style,
  className = "",
}: {
  style?: CSSProperties;
  className?: string;
}) {
  const mask =
    "radial-gradient(ellipse 72% 100% at 50% 100%, #000 8%, transparent 74%)";
  return (
    <div
      aria-hidden="true"
      className={`ms-anim pointer-events-none absolute inset-x-0 bottom-0 h-full overflow-hidden ${className}`}
      style={style}
    >
      <div
        className="absolute inset-x-0 bottom-0 h-[70%]"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 50% 100%, rgba(124,196,255,.55), rgba(30,107,255,.28) 38%, rgba(10,26,74,0) 70%)",
          animation: "ms-pulse-glow 6s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -inset-x-[40%] bottom-0 h-full"
        style={{
          transformOrigin: "50% 100%",
          animation: "ms-sway-a 14s ease-in-out infinite alternate",
          background:
            "repeating-conic-gradient(from 270deg at 50% 100%, rgba(5,11,30,0) 0deg, rgba(30,107,255,.55) 1.5deg, rgba(5,11,30,0) 3.4deg, rgba(10,40,120,.4) 4.6deg, rgba(5,11,30,0) 6.4deg)",
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      />
      <div
        className="absolute -inset-x-[40%] bottom-0 h-full"
        style={{
          transformOrigin: "50% 100%",
          animation: "ms-sway-b 11s ease-in-out infinite alternate",
          background:
            "repeating-conic-gradient(from 268deg at 50% 100%, rgba(5,11,30,0) 0deg, rgba(156,211,255,.34) .7deg, rgba(5,11,30,0) 1.8deg, rgba(5,11,30,0) 4.2deg)",
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      />
      <div
        className="absolute inset-x-[18%] bottom-[-6%] h-[18%] rounded-[100%]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(190,226,255,.95), rgba(79,155,255,.4) 45%, transparent 72%)",
          filter: "blur(18px)",
        }}
      />
    </div>
  );
}

export function FramedImage({
  src,
  alt,
  label,
  index,
  mirror = false,
}: {
  src: string;
  alt: string;
  label: string;
  index: string;
  mirror?: boolean;
}) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className={`absolute inset-0 rounded-[30px] border border-[#2F7BFF]/45 ${
          mirror ? "-translate-x-4 translate-y-4" : "translate-x-4 translate-y-4"
        }`}
      />
      <div
        aria-hidden="true"
        className={`absolute inset-0 rounded-[30px] border border-[#7CC4FF]/20 ${
          mirror ? "-translate-x-8 translate-y-8" : "translate-x-8 translate-y-8"
        }`}
      />

      <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-white/20 bg-gradient-to-br from-[#0B2A6F] via-[#0A1A4A] to-[#050B1E] sm:aspect-[5/5]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 560px, 100vw"
          className="object-cover opacity-90 saturate-[.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B1E]/90 via-[#0A1A4A]/20 to-[#1E6BFF]/15" />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(124,196,255,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(124,196,255,.35) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "linear-gradient(to bottom, transparent, #000 40%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, #000 40%, transparent)",
          }}
        />
        <CornerTicks className="text-[#9CD3FF]" size={22} offset={14} />

        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
          <div className="rounded-2xl border border-white/20 bg-[#050B1E]/70 px-4 py-3 backdrop-blur-md">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#7CC4FF]">
              {label}
            </p>
          </div>
          <span
            className="font-display text-5xl leading-none text-transparent"
            style={{ WebkitTextStroke: "1px rgba(156,211,255,.7)" }}
          >
            {index}
          </span>
        </div>
      </div>
    </div>
  );
}