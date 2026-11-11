"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { INTRO_MP4, MARK_SRC, WORDMARK_SRC } from "./LogoMark";


/* ============================================================
   LOGO INTRO
   1. The MP4 plays on black and ends on the finished logo.
   2. On the last frame, two image layers (mark + wordmark, rendered from the
      very same final frame) are placed exactly over the video, so the swap
      from video to image is invisible.
   3. The mark then flies, using transform only (GPU, no layout work), into the
      navbar's logo slot while the black fades and the hero starts revealing.
   4. The navbar logo fades in under the landed mark. Both are the same image,
      so nothing visibly changes.

   Safety nets: if the video can't start in time, errors, or autoplay is
   blocked, the same layers fade in and the sequence continues. Skip works at
   any moment. The intro plays once per full page load.
============================================================ */

const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
const DOCK_MS = 1100;
const BOOT_TIMEOUT_MS = 3200;

// Where each layer sits inside the 1440 x 1200 video frame (percent)
const MARK_BOX = { left: 23.194, top: 8.0, width: 52.986, height: 63.583 };
const WORD_BOX = { left: 6.597, top: 64.0, width: 86.806, height: 27.0 };

// Size of the video frame on screen
const FRAME_W = "min(94vw, calc(86svh * 1.2), 1120px)";

type Stage = "boot" | "play" | "dock" | "land" | "done";
type IntroFlag = { __mindspaceIntro?: "playing" | "docking" | "done" };

// Survives client-side navigation, resets on a full reload
let introPlayed = false;

const signal = (state: "playing" | "docking" | "done") => {
    (window as unknown as IntroFlag).__mindspaceIntro = state;
    if (state === "docking") window.dispatchEvent(new Event("mindspace:intro-dock"));
    if (state === "done") window.dispatchEvent(new Event("mindspace:intro-done"));
};

export default function LogoIntro({ onDock }: { onDock?: () => void }) {
    const [stage, setStageState] = useState<Stage>(() => (introPlayed ? "done" : "boot"));
    const stageRef = useRef<Stage>(stage);
    const [layersOn, setLayersOn] = useState(false);
    const [fadeMs, setFadeMs] = useState(0);
    const [videoHidden, setVideoHidden] = useState(false);
    const [markTf, setMarkTf] = useState("none");

    const videoRef = useRef<HTMLVideoElement>(null);
    const markRef = useRef<HTMLImageElement>(null);
    const timers = useRef<number[]>([]);
    const onDockRef = useRef(onDock);
    onDockRef.current = onDock;

    const setStage = (s: Stage) => {
        stageRef.current = s;
        setStageState(s);
    };
    const later = (ms: number, fn: () => void) => {
        timers.current.push(window.setTimeout(fn, ms));
    };

    /* ---------- hand-over: layers on -> video off -> fly to navbar ---------- */
    const beginDock = (fade: number, hold: number) => {
        if (stageRef.current === "dock" || stageRef.current === "land" || stageRef.current === "done") return;
        stageRef.current = "dock"; // lock against double triggers
        videoRef.current?.pause();
        setFadeMs(fade);
        setLayersOn(true);

        const start = () => {
            const markEl = markRef.current;
            const slot = document.querySelector<HTMLElement>("[data-nav-logo]");
            if (markEl) {
                const from = markEl.getBoundingClientRect();
                const to = slot
                    ? slot.getBoundingClientRect()
                    : ({ left: 24, top: 10, width: 56 } as DOMRect);
                const s = to.width / from.width;
                setMarkTf(`translate3d(${to.left - from.left}px, ${to.top - from.top}px, 0) scale(${s})`);
            }
            setVideoHidden(true);
            setStage("dock");
            signal("docking");
            onDockRef.current?.();

            later(DOCK_MS + 60, () => {
                setStage("land");
                signal("done");
                introPlayed = true;
                document.body.style.overflow = "";
                later(500, () => setStage("done"));
            });
        };

        // two frames so the layers are painted on top of the video before anything moves
        requestAnimationFrame(() =>
            requestAnimationFrame(() => {
                if (hold > 0) later(hold, start);
                else start();
            }),
        );
    };

    const fallback = () => {
        if (stageRef.current === "boot" || stageRef.current === "play") beginDock(700, 950);
    };

    const skip = () => {
        if (stageRef.current === "boot" || stageRef.current === "play") beginDock(320, 260);
    };

    /* ---------- boot ---------- */
    useEffect(() => {
        const w = window as unknown as IntroFlag;

        if (introPlayed || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            introPlayed = true;
            setStage("done");
            signal("docking");
            signal("done");
            onDockRef.current?.();
            return;
        }

        w.__mindspaceIntro = "playing";
        document.body.style.overflow = "hidden";

        const v = videoRef.current;
        if (v) {
            v.muted = true;
            v.play().catch(() => fallback());
        }
        later(BOOT_TIMEOUT_MS, () => {
            if (stageRef.current === "boot") fallback();
        });

        return () => {
            timers.current.forEach((t) => clearTimeout(t));
            timers.current = [];
            document.body.style.overflow = "";
            if (stageRef.current !== "done" && stageRef.current !== "land") delete w.__mindspaceIntro;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (stage === "done") return null;

    const flying = stage === "dock" || stage === "land";

    const layer = (box: typeof MARK_BOX): CSSProperties => ({
        left: `${box.left}%`,
        top: `${box.top}%`,
        width: `${box.width}%`,
        height: `${box.height}%`,
    });

    return (
        <>
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60]" style={{ isolation: "isolate" }}>
                {/* black stage — fades out as the logo starts flying */}
                <div
                    className="absolute inset-0 bg-black"
                    style={{
                        opacity: flying ? 0 : 1,
                        transition: flying ? "opacity 950ms ease 120ms" : "none",
                    }}
                />

                {/* the video frame + identical image layers */}
                <div
                    className="absolute left-1/2 top-1/2"
                    style={{ width: FRAME_W, aspectRatio: "1440 / 1200", transform: "translate(-50%, -50%)" }}
                >
                    <video
                        ref={videoRef}
                        src={INTRO_MP4}
                        autoPlay
                        muted
                        playsInline
                        preload="auto"
                        disablePictureInPicture
                        onPlaying={() => {
                            if (stageRef.current === "boot") setStage("play");
                        }}
                        onEnded={() => beginDock(0, 0)}
                        onError={fallback}
                        className="absolute inset-0 h-full w-full"
                        style={{
                            mixBlendMode: "screen",
                            opacity: videoHidden ? 0 : 1,
                            transition: `opacity ${fadeMs}ms linear`,
                        }}
                    />

                    <img
                        ref={markRef}
                        src={MARK_SRC}
                        alt=""
                        draggable={false}
                        className="absolute select-none"
                        style={{
                            ...layer(MARK_BOX),
                            transformOrigin: "0 0",
                            transform: markTf,
                            opacity: stage === "land" ? 0 : layersOn ? 1 : 0,
                            willChange: "transform, opacity",
                            transition:
                                stage === "land"
                                    ? "opacity 400ms ease"
                                    : `opacity ${fadeMs}ms linear, transform ${DOCK_MS}ms ${EASE}`,
                        }}
                    />
                    <img
                        src={WORDMARK_SRC}
                        alt=""
                        draggable={false}
                        className="absolute select-none"
                        style={{
                            ...layer(WORD_BOX),
                            opacity: flying ? 0 : layersOn ? 1 : 0,
                            transform: flying ? "translate3d(0,-14px,0)" : "none",
                            transition: flying
                                ? "opacity 420ms ease, transform 700ms cubic-bezier(0.22,1,0.36,1)"
                                : `opacity ${fadeMs}ms linear`,
                        }}
                    />
                </div>
            </div>


        </>
    );
}