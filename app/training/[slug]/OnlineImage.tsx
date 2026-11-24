
"use client";

import { useState } from "react";

type Props = {
    src: string;
    alt: string;
    className?: string;
    imageClassName?: string;
    priority?: boolean;
};

const FALLBACK_IMAGES = [
    "https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/1524752/pexels-photo-1524752.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://picsum.photos/seed/mindspace-training-image/1600/1000",
];

export default function OnlineImage({
    src,
    alt,
    className = "",
    imageClassName = "",
    priority = false,
}: Props) {
    const [currentSrc, setCurrentSrc] = useState(src);
    const [fallbackIndex, setFallbackIndex] = useState(0);
    const [failed, setFailed] = useState(false);

    function handleError() {
        if (fallbackIndex < FALLBACK_IMAGES.length) {
            setCurrentSrc(FALLBACK_IMAGES[fallbackIndex]);
            setFallbackIndex((index) => index + 1);
        } else {
            setFailed(true);
        }
    }

    return (
        <div className={`relative overflow-hidden bg-[#0D1A13] ${className}`}>
            {!failed ? (
                <img
                    key={currentSrc}
                    src={currentSrc}
                    alt={alt}
                    loading={priority ? "eager" : "lazy"}
                    fetchPriority={priority ? "high" : "auto"}
                    decoding="async"
                    onError={handleError}
                    className={`absolute inset-0 h-full w-full object-cover ${imageClassName}`}
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0D1A13] via-[#13251A] to-[#07110D]">
                    <div className="text-center">
                        <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center border border-[#35D07F]/40">
                            <span className="h-2 w-2 bg-[#35D07F]" />
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.24em] text-[#35D07F]">
                            MindSpace Training
                        </p>
                        <p className="mt-2 text-xs text-white/40">
                            Learn · Practice · Grow
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
