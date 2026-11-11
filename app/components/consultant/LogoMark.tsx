/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";

// Asset locations (copy the files from the download into your /public folder):
//   public/videos/mindspace-intro.mp4
//   public/images/mindspace-mark.png
//   public/images/mindspace-wordmark.png
export const INTRO_MP4 = "/mindspace-intro.mp4";
export const MARK_SRC = "/mindspace-mark.png";
export const WORDMARK_SRC = "/mindspace-wordmark.png";

interface LogoMarkProps {
    className?: string;
    /** 
     * If provided, renders the dynamic SVG crescent and layers the image petals.
     * If undefined, renders the static composite image (default for Navbar).
     */
    drawCrescent?: number;
}

/**
 * The logo mark.
 * By default, it uses the same composite image the intro video ends on.
 * If `drawCrescent` is passed, it switches to an animated SVG version 
 * for the intro sequence.
 */
export default function LogoMark({ className = "", drawCrescent }: LogoMarkProps) {

    // STATIC MODE (Navbar, Footer, etc.)
    if (drawCrescent === undefined) {
        return (
            <img
                src={MARK_SRC}
                alt=""
                aria-hidden="true"
                draggable={false}
                className={`block select-none object-contain ${className}`}
            />
        );
    }

    // ANIMATED MODE (Intro Sequence)
    return (
        <span aria-hidden="true" className={`relative flex items-center justify-center ${className}`}>
            {/* The Crescent SVG (Draws itself) */}
            <CrescentSVG
                size={100} // ViewBox is 100x100, CSS will scale it
                draw={drawCrescent}
                className="absolute inset-0 w-full h-full"
                stroke={8} // Thicker stroke for the intro
            />

            {/* The Petals (Uses the static image, scaled down and centered) */}
            <span
                className="relative block overflow-hidden w-[70%] h-[70%] transition-transform duration-700 ease-out"
                style={{
                    transform: drawCrescent > 0.5 ? 'scale(1)' : 'scale(0.5)',
                    opacity: drawCrescent > 0.5 ? 1 : 0
                }}
            >
                <img
                    src={MARK_SRC}
                    alt=""
                    draggable={false}
                    className="absolute max-w-none select-none w-full h-full object-contain"
                />
            </span>
        </span>
    );
}

/**
 * The crescent / swoosh, drawn as a real SVG arc.
 * Uses stroke-dashoffset so it can *draw itself* on mount.
 */
export function CrescentSVG({
    size = 200,
    draw = 1,
    stroke = 14,
    className = "",
    style,
}: {
    size?: number;
    draw?: number;
    stroke?: number;
    className?: string;
    style?: CSSProperties;
}) {
    const R = 42;
    const cx = 50;
    const cy = 50;
    const startAngle = -55;
    const endAngle = 235;
    const sweep = endAngle - startAngle;
    const circumf = (sweep / 360) * 2 * Math.PI * R;
    const dash = circumf;
    const gap = 2 * Math.PI * R - dash;

    const polar = (deg: number) => {
        const rad = (deg * Math.PI) / 180;
        return { x: cx + R * Math.cos(rad), y: cy + R * Math.sin(rad) };
    };
    const p0 = polar(startAngle);
    const p1 = polar(endAngle);
    const largeArc = sweep > 180 ? 1 : 0;

    return (
        <svg
            viewBox="0 0 100 100"
            width={size}
            height={size}
            className={className}
            style={style}
            aria-hidden="true"
        >
            <defs>
                <linearGradient id="ms-crescent" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#2f7bff" />
                    <stop offset="100%" stopColor="#1a3fd1" />
                </linearGradient>
            </defs>
            <path
                d={`M ${p0.x} ${p0.y} A ${R} ${R} 0 ${largeArc} 1 ${p1.x} ${p1.y}`}
                fill="none"
                stroke="url(#ms-crescent)"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={`${dash} ${gap}`}
                strokeDashoffset={dash * (1 - draw)}
                style={{ transition: "stroke-dashoffset 1200ms cubic-bezier(0.22,1,0.36,1)" }}
            />
        </svg>
    );
}