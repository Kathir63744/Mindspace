
"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
    src?: string;
    webmSrc?: string;
    poster?: string;
    className?: string;
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

        const reduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        if (reduced.matches) {
            v.pause();
            v.currentTime = 0;
        }

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
        return null;
    }

    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
            style={{
                background: "transparent",
                fontFamily: "inherit",
            }}
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
                        } catch { }
                    }
                }}
                className="h-full w-full object-cover"
                style={{
                    transform: "scale(1.02)",
                    opacity: 0.35,
                    mixBlendMode: "screen",
                }}
            >
                {webmSrc && (
                    <source src={webmSrc} type="video/webm" />
                )}

                <source src={src} type="video/mp4" />
            </video>
        </div>
    );
}
