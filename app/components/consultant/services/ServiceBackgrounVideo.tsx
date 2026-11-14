//consultant/app/components/consultant/services/ServiceBackgrounVideo.tsx
"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
    src?: string;
    webmSrc?: string;
    poster?: string;
    className?: string;
    /** Playback rate. 1 = normal. 0.7 = slower, calmer. */
    rate?: number;
};

export default function ServiceBackgroundVideo({
    src = "/service-bg.mp4",
    webmSrc,
    poster = "/services-bg-poster.jpg",
    className = "",
    rate = 1,
}: Props) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;

        // Respect reduced motion — pause on a still frame
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (reduced.matches) {
            v.pause();
            v.currentTime = 0;
        }

        // Pause when off-screen (saves battery, avoids decode spikes)
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !reduced.matches) {
                    v.play().catch(() => { });
                } else {
                    v.pause();
                }
            },
            { threshold: 0.01 }
        );
        io.observe(v);

        return () => io.disconnect();
    }, []);

    if (failed) {
        // Fallback: static blue atmospheric glow (matches the rest of the site)
        return (
            <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 ${className}`}
                style={{
                    background:
                        "radial-gradient(ellipse 55% 70% at 50% 8%, rgba(47,123,255,.34), rgba(30,107,255,.12) 45%, transparent 72%)",
                }}
            />
        );
    }

    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        >
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={poster}
                onError={() => setFailed(true)}
                onLoadedMetadata={() => {
                    const v = videoRef.current;
                    if (v && rate !== 1) {
                        try {
                            v.playbackRate = rate;
                        } catch {
                            /* ignore */
                        }
                    }
                }}
                className="h-full w-full object-cover"
                style={{
                    // Slight scale so edge pixels never show at the seams
                    transform: "scale(1.02)",
                }}
            >
                {webmSrc && <source src={webmSrc} type="video/webm" />}
                <source src={src} type="video/mp4" />
            </video>

            {/* Dark overlay so text stays readable over any frame */}
            <div className="absolute inset-0 bg-[#050505]/55" />

            {/* Blue tint that matches your palette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(47,123,255,0.22),transparent_60%)]" />
        </div>
    );
}