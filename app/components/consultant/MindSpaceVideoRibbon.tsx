
"use client";

import { easeOut } from "framer-motion";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef } from "react";
import * as THREE from "three";

export type RibbonItem = {
    title: string;
    category: string;
    type: "video" | "image";
    src: string;
    poster?: string;
    alt: string;
};

type Props = {
    id?: string;
    eyebrow: string;
    lineOne: string;
    lineTwo: string;
    caption: string;
    summary: string;
    items: RibbonItem[];
    durationVh?: number;
    gridCount?: number;
    contactHref?: string;
    footerLabel?: string;
    active?: boolean;
};

const CARD_W = 2.1;
const CARD_H = 1.32;
const CARD_GAP = 0.035;
const CARD_STEP = CARD_W + CARD_GAP;
const GRID_Z = 8;
const RIBBON_START = 0.04;
const RIBBON_END = 0.72;
const SAMPLES = 1200;
const NX = 28;
const NY = 3;

const clamp = (v: number, a = 0, b = 1) =>
    Math.min(b, Math.max(a, v));

const mix = (a: number, b: number, t: number) =>
    a + (b - a) * t;

const smooth = (t: number) => t * t * (3 - 2 * t);
const out = (t: number) => 1 - Math.pow(1 - t, 3);

const span = (p: number, a: number, b: number) =>
    clamp((p - a) / (b - a));

type Card = {
    item: RibbonItem;
    index: number;
    mesh: THREE.Mesh<
        THREE.BufferGeometry,
        THREE.ShaderMaterial
    >;
    video?: HTMLVideoElement;
    videoTexture?: THREE.VideoTexture;
    posterTexture?: THREE.Texture;
    rect: {
        x: number;
        y: number;
        w: number;
        h: number;
        vw: number;
        vh: number;
    } | null;
    playRequested: boolean;
};

const VERTEX_SHADER = `
    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const FRAGMENT_SHADER = `
    uniform sampler2D uMap;
    uniform vec2 uCover;
    uniform float uReady;
    uniform float uOpacity;
    uniform float uRadius;

    varying vec2 vUv;

    void main() {
        vec2 uv = vUv;

        if (!gl_FrontFacing) {
            uv.x = 1.0 - uv.x;
        }

        vec2 point = (uv - 0.5) * vec2(1.0, 0.62857);
        vec2 halfSize = vec2(0.5, 0.314285);

        vec2 q = abs(point) - halfSize + uRadius;

        float distanceRounded =
            length(max(q, 0.0)) +
            min(max(q.x, q.y), 0.0) -
            uRadius;

        float edge = fwidth(distanceRounded);
        float alpha = 1.0 - smoothstep(-edge, edge, distanceRounded);

        if (alpha < 0.01) discard;

        vec2 sampleUv = (uv - 0.5) * uCover + 0.5;
        vec4 pixel = texture2D(uMap, sampleUv);

        vec3 placeholder = vec3(0.075, 0.085, 0.105);
        vec3 colour = mix(placeholder, pixel.rgb, uReady);

        float border = smoothstep(-0.012 - edge, -0.012, distanceRounded);
        colour = mix(colour, vec3(1.0), border * 0.075);

        gl_FragColor = vec4(colour, alpha * uOpacity);

        #include <tonemapping_fragment>
        #include <colorspace_fragment>
    }
`;

export default function MindSpaceVideoRibbon({
    id = "mindspace-ribbon",
    eyebrow,
    lineOne,
    lineTwo,
    caption,
    summary,
    items,
    durationVh = 560,
    gridCount = 6,
    contactHref = "/contact",
    footerLabel = "TECHNOLOGY / TRAINING / STUDY ABROAD / CAREERS",
    active = true,
}: Props) {
    const trackRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const lineOneRef = useRef<HTMLDivElement>(null);
    const lineTwoRef = useRef<HTMLDivElement>(null);
    const captionRef = useRef<HTMLDivElement>(null);
    const chromeRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const crossRef = useRef<HTMLDivElement>(null);
    const ruleRef = useRef<HTMLDivElement>(null);
    const openingRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const visibleCount = Math.min(
        Math.max(0, gridCount),
        items.length,
        6
    );

    useEffect(() => {
        const track = trackRef.current;
        const stage = stageRef.current;
        const canvas = canvasRef.current;

        if (!track || !stage || !canvas || items.length === 0) {
            return;
        }

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        let renderer: THREE.WebGLRenderer;

        try {
            renderer = new THREE.WebGLRenderer({
                canvas,
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
            });
        } catch (error) {
            console.error("MindSpace 3D renderer failed:", error);
            if (openingRef.current) {
                openingRef.current.style.opacity = "1";
            }
            return;
        }

        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(
            Math.min(window.devicePixelRatio || 1, 1.75)
        );
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            35,
            1,
            0.1,
            100
        );

        camera.position.set(0, 0, 0);

        const loader = new THREE.TextureLoader();
        loader.setCrossOrigin("anonymous");

        const fallbackTexture = new THREE.DataTexture(
            new Uint8Array([20, 28, 43, 255]),
            1,
            1,
            THREE.RGBAFormat
        );

        fallbackTexture.colorSpace = THREE.SRGBColorSpace;
        fallbackTexture.needsUpdate = true;

        const cards: Card[] = [];

        const applyCover = (
            material: THREE.ShaderMaterial,
            width: number,
            height: number
        ) => {
            const mediaAspect = width / Math.max(height, 1);
            const cardAspect = CARD_W / CARD_H;

            material.uniforms.uCover.value.set(
                mediaAspect > cardAspect
                    ? cardAspect / mediaAspect
                    : 1,
                mediaAspect > cardAspect
                    ? 1
                    : mediaAspect / cardAspect
            );
        };

        /* ----------------------------------------------------
           CREATE MEDIA CARDS
        ---------------------------------------------------- */

        items.forEach((item, index) => {
            const material = new THREE.ShaderMaterial({
                vertexShader: VERTEX_SHADER,
                fragmentShader: FRAGMENT_SHADER,
                transparent: true,
                side: THREE.DoubleSide,
                depthWrite: true,
                uniforms: {
                    uMap: { value: fallbackTexture },
                    uCover: {
                        value: new THREE.Vector2(1, 1),
                    },
                    uReady: { value: 0 },
                    uOpacity: { value: 0 },
                    uRadius: { value: 0.035 },
                },
            });

            const geometry = new THREE.PlaneGeometry(
                CARD_W,
                CARD_H,
                NX,
                NY
            );

            const mesh = new THREE.Mesh(geometry, material);

            mesh.frustumCulled = false;
            mesh.visible = false;

            scene.add(mesh);

            const card: Card = {
                item,
                index,
                mesh,
                rect: null,
                playRequested: false,
            };

            if (item.type === "image") {
                loader.load(
                    item.src,
                    (texture) => {
                        texture.colorSpace = THREE.SRGBColorSpace;
                        texture.minFilter = THREE.LinearFilter;
                        texture.magFilter = THREE.LinearFilter;
                        texture.generateMipmaps = false;

                        material.uniforms.uMap.value = texture;
                        material.uniforms.uReady.value = 1;

                        const image = texture.image as HTMLImageElement;

                        applyCover(
                            material,
                            image.naturalWidth || 1,
                            image.naturalHeight || 1
                        );

                        card.posterTexture = texture;
                    },
                    undefined,
                    (error) => {
                        console.warn(
                            `MindSpace image failed: ${item.src}`,
                            error
                        );
                    }
                );
            } else {
                const video = document.createElement("video");

                video.crossOrigin = "anonymous";
                video.muted = true;
                video.loop = true;
                video.playsInline = true;
                video.preload = "metadata";
                video.src = item.src;

                video.setAttribute("playsinline", "");
                video.setAttribute("muted", "");

                card.video = video;

                const videoTexture = new THREE.VideoTexture(video);

                videoTexture.colorSpace = THREE.SRGBColorSpace;
                videoTexture.minFilter = THREE.LinearFilter;
                videoTexture.magFilter = THREE.LinearFilter;
                videoTexture.generateMipmaps = false;

                card.videoTexture = videoTexture;

                if (item.poster) {
                    loader.load(
                        item.poster,
                        (texture) => {
                            texture.colorSpace = THREE.SRGBColorSpace;
                            texture.minFilter = THREE.LinearFilter;
                            texture.magFilter = THREE.LinearFilter;

                            card.posterTexture = texture;

                            if (video.readyState < 2) {
                                material.uniforms.uMap.value = texture;
                                material.uniforms.uReady.value = 1;

                                const image = texture.image as HTMLImageElement;

                                applyCover(
                                    material,
                                    image.naturalWidth || 1,
                                    image.naturalHeight || 1
                                );
                            }
                        },
                        undefined,
                        () => {
                            // The dark canvas placeholder remains available.
                        }
                    );
                }

                const onLoaded = () => {
                    material.uniforms.uMap.value = videoTexture;
                    material.uniforms.uReady.value = 1;

                    applyCover(
                        material,
                        video.videoWidth || 1,
                        video.videoHeight || 1
                    );
                };

                video.addEventListener("loadeddata", onLoaded);
                video.load();
            }

            cards.push(card);
        });

        /* ----------------------------------------------------
           BUILD FIXED RIBBON PATH
        ---------------------------------------------------- */

        const pathPointsInput: THREE.Vector3[] = [];

        const phaseStart = -1.5;
        const phaseEnd = Math.PI * 2 + 1.35;

        for (let index = 0; index <= 160; index++) {
            const t = index / 160;
            const phase = mix(phaseStart, phaseEnd, t);
            const cosine = Math.cos(phase);
            const u = 2 * t - 1;

            const depth =
                cosine > 0
                    ? 7.6 + 16.4 * Math.pow(cosine, 0.9)
                    : 7.6 + 2.2 * cosine;

            const edge =
                0.84 +
                0.5 * span(0.14 - t, 0, 0.14) +
                0.8 * span(t, 0.84, 1);

            pathPointsInput.push(
                new THREE.Vector3(
                    edge * Math.sin(phase) * depth * 0.561,
                    0.5 *
                    Math.sign(u) *
                    Math.pow(Math.abs(u), 1.4) *
                    depth *
                    0.63,
                    -depth
                )
            );
        }

        const path = new THREE.CatmullRomCurve3(
            pathPointsInput,
            false,
            "centripetal"
        );

        path.arcLengthDivisions = 1500;

        const pathLength = path.getLength();
        const pathPoints: THREE.Vector3[] = [];
        const pathTangents: THREE.Vector3[] = [];

        for (let index = 0; index <= SAMPLES; index++) {
            const t = index / SAMPLES;

            pathPoints.push(path.getPointAt(t));
            pathTangents.push(path.getTangentAt(t));
        }

        const position = new THREE.Vector3();
        const tangent = new THREE.Vector3();
        const worldUp = new THREE.Vector3(0, 1, 0);
        const up = new THREE.Vector3();
        const vertex = new THREE.Vector3();

        const at = (
            distance: number,
            outPosition: THREE.Vector3,
            outTangent: THREE.Vector3
        ) => {
            const factor =
                clamp(distance / pathLength) * SAMPLES;

            const index = Math.min(
                SAMPLES - 1,
                Math.floor(factor)
            );

            const alpha = factor - index;

            outPosition.lerpVectors(
                pathPoints[index],
                pathPoints[index + 1],
                alpha
            );

            outTangent
                .lerpVectors(
                    pathTangents[index],
                    pathTangents[index + 1],
                    alpha
                )
                .normalize();
        };

        /* ----------------------------------------------------
           VIEWPORT AND GRID
        ---------------------------------------------------- */

        let width = 1;
        let height = 1;
        let aspect = 1;
        let columns = 3;
        let rows = 2;
        let tanHalfFov = Math.tan((35 * Math.PI) / 360);

        const resize = () => {
            width = stage.clientWidth || window.innerWidth;
            height = stage.clientHeight || window.innerHeight;

            aspect = width / Math.max(height, 1);

            renderer.setSize(width, height, false);

            camera.aspect = aspect;

            camera.fov =
                aspect < 16 / 9
                    ? (Math.atan(0.561 / aspect) * 360) / Math.PI
                    : 35;

            tanHalfFov = Math.tan(
                (camera.fov * Math.PI) / 360
            );

            camera.updateProjectionMatrix();

            columns = aspect < 0.9 ? 2 : 3;
            rows = aspect < 0.9 ? 3 : 2;
        };

        const grid = (index: number) => {
            const viewHeight = 2 * GRID_Z * tanHalfFov;
            const viewWidth = viewHeight * aspect;

            const gridWidth =
                viewWidth * (columns === 3 ? 0.74 : 0.88);

            const gap = gridWidth * 0.017;

            const cardWidth =
                (gridWidth - gap * (columns - 1)) / columns;

            const cardHeight =
                cardWidth / (CARD_W / CARD_H);

            const gridHeight =
                cardHeight * rows +
                gap * 1.6 * (rows - 1);

            const column = index % columns;
            const row = Math.floor(index / columns);

            return {
                x:
                    -gridWidth / 2 +
                    cardWidth / 2 +
                    column * (cardWidth + gap),
                y:
                    gridHeight / 2 -
                    cardHeight / 2 -
                    row * (cardHeight + gap * 1.6),
                w: cardWidth,
                h: cardHeight,
                vw: viewWidth,
                vh: viewHeight,
                column,
                row,
            };
        };

        /* ----------------------------------------------------
           RIBBON GEOMETRY
        ---------------------------------------------------- */

        const poseRibbon = (card: Card, head: number) => {
            const positions = card.mesh.geometry.attributes
                .position as THREE.BufferAttribute;

            const centre = head - card.index * CARD_STEP;

            for (let row = 0; row <= NY; row++) {
                for (let column = 0; column <= NX; column++) {
                    const vertexIndex =
                        row * (NX + 1) + column;

                    const localX = column / NX - 0.5;
                    const localY = 0.5 - row / NY;

                    at(
                        centre + localX * CARD_W,
                        position,
                        tangent
                    );

                    up.copy(worldUp)
                        .addScaledVector(
                            tangent,
                            -worldUp.dot(tangent)
                        )
                        .normalize();

                    vertex
                        .copy(position)
                        .addScaledVector(up, localY * CARD_H);

                    positions.setXYZ(
                        vertexIndex,
                        vertex.x,
                        vertex.y,
                        vertex.z
                    );
                }
            }

            positions.needsUpdate = true;
        };

        /* ----------------------------------------------------
           GRID LANDING POSE
        ---------------------------------------------------- */

        const poseGrid = (card: Card, q: number) => {
            const g = grid(card.index);

            const positions = card.mesh.geometry.attributes
                .position as THREE.BufferAttribute;

            const direction =
                g.column === 0
                    ? -1
                    : g.column === columns - 1
                        ? 1
                        : 0;

            const originX = g.x + direction * g.vw * 0.68;

            const originY =
                g.y +
                (g.row === 0 ? 1 : -1) * g.vh * 0.7;

            const tilt =
                (1 - q) *
                0.19 *
                (g.column - (columns - 1) / 2 || 0.5) *
                (g.row === 0 ? 1 : -1);

            const cosine = Math.cos(tilt);
            const sine = Math.sin(tilt);

            const finalX = mix(originX, g.x, q);
            const finalY = mix(originY, g.y, q);

            for (let row = 0; row <= NY; row++) {
                for (let column = 0; column <= NX; column++) {
                    const vertexIndex =
                        row * (NX + 1) + column;

                    const localX =
                        (column / NX - 0.5) * g.w;

                    const localY =
                        (0.5 - row / NY) * g.h;

                    const x =
                        localX * cosine - localY * sine;

                    const y =
                        localX * sine + localY * cosine;

                    positions.setXYZ(
                        vertexIndex,
                        finalX + x,
                        finalY + y,
                        -GRID_Z - (1 - q) * 0.35
                    );
                }
            }

            positions.needsUpdate = true;

            card.rect = {
                x: g.x,
                y: g.y,
                w: g.w,
                h: g.h,
                vw: g.vw,
                vh: g.vh,
            };
        };

        /* ----------------------------------------------------
           SCROLL STATE
        ---------------------------------------------------- */

        let targetProgress = 0;
        let progress = 0;
        let frame = 0;
        let disposed = false;

        const readScroll = () => {
            if (!active) {
                targetProgress = 0;
                return;
            }

            const rect = track.getBoundingClientRect();

            const distance = Math.max(
                track.offsetHeight - window.innerHeight,
                1
            );

            targetProgress = clamp(-rect.top / distance);
        };

        const resizeObserver = new ResizeObserver(() => {
            resize();
            readScroll();
        });

        resizeObserver.observe(stage);

        window.addEventListener("resize", resize);
        window.addEventListener("scroll", readScroll, {
            passive: true,
        });

        resize();
        readScroll();

        /* ----------------------------------------------------
           RENDER
        ---------------------------------------------------- */

        const render = () => {
            const p = progress;

            const headlineTravel = easeOut(
                span(p, 0.035, 0.58)
            );

            const headlineOpacity =
                1 - span(p, 0.12, 0.25);

            if (lineOneRef.current) {
                lineOneRef.current.style.transform =
                    `translate3d(${headlineTravel * 86}vw, 0, 0)`;

                lineOneRef.current.style.opacity =
                    String(headlineOpacity);
            }

            if (lineTwoRef.current) {
                lineTwoRef.current.style.transform =
                    `translate3d(${-headlineTravel * 86}vw, 0, 0)`;

                lineTwoRef.current.style.opacity =
                    String(headlineOpacity);
            }

            if (captionRef.current) {
                captionRef.current.style.opacity =
                    String(1 - span(p, 0.48, 0.56));
            }

            if (chromeRef.current) {
                chromeRef.current.style.opacity = "1";
            }

            if (glowRef.current) {
                glowRef.current.style.opacity =
                    String(1 - span(p, 0, 0.1));
            }

            if (crossRef.current) {
                crossRef.current.style.opacity =
                    String(1 - span(p, 0, 0.1));
            }

            if (openingRef.current) {
                const openingFade = smooth(span(p, 0.025, 0.19));

                openingRef.current.style.opacity =
                    String(1 - openingFade);

                openingRef.current.style.transform =
                    `translate3d(0, ${openingFade * 18}px, 0) scale(${1 + openingFade * 0.025})`;

                openingRef.current.style.pointerEvents =
                    p < 0.19 ? "none" : "none";
            }

            if (ruleRef.current) {
                ruleRef.current.style.transform =
                    `scaleX(${smooth(span(p, 0.72, 0.86))})`;
            }

            const initialHead =
                pathLength * 0.45 + cards.length * CARD_STEP;

            const finalHead =
                pathLength + cards.length * CARD_STEP;

            const ribbonProgress = span(
                p,
                RIBBON_START,
                RIBBON_END
            );

            const head = mix(
                initialHead,
                finalHead,
                ribbonProgress
            );

            const end = pathLength - CARD_W;
            const cardOpacity = out(span(p, 0.025, 0.19));

            cards.forEach((card) => {
                const railPosition =
                    head - card.index * CARD_STEP;

                card.mesh.material.uniforms.uOpacity.value =
                    cardOpacity;

                if (railPosition < end) {
                    card.rect = null;

                    card.mesh.visible =
                        railPosition > -CARD_W &&
                        railPosition < pathLength + CARD_W;

                    if (card.mesh.visible) {
                        poseRibbon(card, head);
                    }
                } else if (card.index < visibleCount) {
                    const landingDistance =
                        end + card.index * CARD_STEP;

                    const landingFraction = clamp(
                        (landingDistance - initialHead) /
                        Math.max(finalHead - initialHead, 0.001)
                    );

                    const landingStart = mix(
                        RIBBON_START,
                        RIBBON_END,
                        landingFraction
                    );

                    const landing = out(
                        span(p, landingStart, landingStart + 0.13)
                    );

                    card.mesh.visible = landing > 0.001;

                    if (card.mesh.visible) {
                        poseGrid(card, landing);
                    }
                } else {
                    card.mesh.visible = false;
                    card.rect = null;
                }

                // Play only visible videos.
                if (card.video) {
                    const shouldPlay =
                        active &&
                        !reducedMotion &&
                        card.mesh.visible &&
                        p > 0.02;

                    if (
                        shouldPlay &&
                        card.video.paused &&
                        card.video.readyState >= 2 &&
                        !card.playRequested
                    ) {
                        card.playRequested = true;

                        card.video.play().catch(() => {
                            card.playRequested = false;
                        });
                    } else if (!shouldPlay) {
                        card.playRequested = false;

                        if (!card.video.paused) {
                            card.video.pause();
                        }
                    }
                }
            });

            renderer.render(scene, camera);
        };

        /* ----------------------------------------------------
           HOVER LABEL
        ---------------------------------------------------- */

        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();

        const handlePointerMove = (event: PointerEvent) => {
            const tooltip = tooltipRef.current;

            if (!tooltip || progress < 0.86) {
                if (tooltip) tooltip.style.opacity = "0";
                return;
            }

            const bounds = stage.getBoundingClientRect();

            pointer.x =
                ((event.clientX - bounds.left) / bounds.width) * 2 - 1;

            pointer.y =
                -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

            raycaster.setFromCamera(pointer, camera);

            const visibleMeshes = cards
                .filter((card) => card.mesh.visible && card.rect)
                .map((card) => card.mesh);

            const hit = raycaster.intersectObjects(visibleMeshes)[0];

            if (!hit) {
                tooltip.style.opacity = "0";
                return;
            }

            const card = cards.find(
                (entry) => entry.mesh === hit.object
            );

            if (!card) {
                tooltip.style.opacity = "0";
                return;
            }

            tooltip.textContent = card.item.title;
            tooltip.style.opacity = "1";

            tooltip.style.transform =
                `translate(${event.clientX - bounds.left + 14}px, ${event.clientY - bounds.top + 14}px)`;
        };

        const handlePointerLeave = () => {
            if (tooltipRef.current) {
                tooltipRef.current.style.opacity = "0";
            }
        };

        stage.addEventListener("pointermove", handlePointerMove);
        stage.addEventListener("pointerleave", handlePointerLeave);

        /* ----------------------------------------------------
           ANIMATION LOOP
        ---------------------------------------------------- */

        const loop = () => {
            if (disposed) return;

            if (reducedMotion) {
                progress = targetProgress;
            } else {
                progress += (targetProgress - progress) * 0.09;

                if (Math.abs(targetProgress - progress) < 0.00005) {
                    progress = targetProgress;
                }
            }

            render();

            frame = requestAnimationFrame(loop);
        };

        loop();

        /* ----------------------------------------------------
           CLEANUP
        ---------------------------------------------------- */

        return () => {
            disposed = true;

            cancelAnimationFrame(frame);

            window.removeEventListener("resize", resize);
            window.removeEventListener("scroll", readScroll);

            stage.removeEventListener("pointermove", handlePointerMove);
            stage.removeEventListener("pointerleave", handlePointerLeave);

            resizeObserver.disconnect();

            cards.forEach((card) => {
                if (card.video) {
                    card.video.pause();
                    card.video.removeAttribute("src");
                    card.video.load();
                }

                card.videoTexture?.dispose();
                card.posterTexture?.dispose();

                card.mesh.geometry.dispose();
                card.mesh.material.dispose();

                scene.remove(card.mesh);
            });

            fallbackTexture.dispose();
            renderer.dispose();
        };
    }, [items, visibleCount, active]);

    return (
        <div
            id={id}
            ref={trackRef}
            className="relative bg-[#080B12]"
            style={{ height: `${durationVh}vh` }}
        >
            <section
                ref={stageRef}
                className="sticky top-0 h-[100svh] min-h-[620px] overflow-hidden bg-[#080B12] text-[#F5F7FB]"
            >
                {/* Three.js canvas */}
                <canvas
                    ref={canvasRef}
                    aria-label="MindSpace animated portfolio ribbon"
                    className="pointer-events-none absolute inset-0 z-10 h-full w-full"
                />

                {/* Initial glow */}
                <div
                    ref={glowRef}
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-white/[0.07] via-transparent to-transparent"
                    style={{ height: "42%" }}
                />

                {/* Initial crosshair */}
                <div
                    ref={crossRef}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-5 right-5 top-[37.5%] z-20 h-px bg-white/15 sm:left-8 sm:right-8 lg:left-10 lg:right-10"
                >
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#080B12] px-2 font-mono text-xs text-white/45">
                        +
                    </span>
                </div>

                {/* Top navigation */}
                <header
                    ref={chromeRef}
                    className="absolute left-5 right-5 top-5 z-40 flex items-center justify-between gap-4 sm:left-8 sm:right-8 sm:top-7 lg:left-10 lg:right-10"
                >
                    <a
                        href="/"
                        className="text-[14px] font-extrabold tracking-[-0.055em] text-white"
                    >
                        MINDSPACE<span className="text-[#2F7BFF]">.</span>
                    </a>

                    <div className="hidden text-[9px] font-medium uppercase tracking-[0.17em] text-white/40 sm:block">
                        {eyebrow}
                    </div>

                    <a
                        href={contactHref}
                        className="inline-flex items-center gap-2 border border-white/30 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#7EAEFF] hover:text-[#A9C7FF] sm:px-4"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#2F7BFF]" />
                        Let&apos;s talk
                    </a>
                </header>

                {/* Headline */}
                <h1 className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
                    <div
                        ref={lineOneRef}
                        className="absolute left-0 right-0 top-[calc(37%-0.98em)] whitespace-nowrap text-center text-[clamp(3rem,8vw,8rem)] font-medium leading-none tracking-[-0.075em] text-white [font-family:var(--ms-heading)] will-change-transform"
                    >
                        {lineOne}
                    </div>

                    <div
                        ref={lineTwoRef}
                        className="absolute left-0 right-0 top-[calc(37%+0.03em)] whitespace-nowrap text-center text-[clamp(3rem,8vw,8rem)] font-medium leading-none tracking-[-0.075em] text-[#86ACFF] [font-family:var(--ms-heading)] will-change-transform"
                    >
                        {lineTwo}
                    </div>
                </h1>

                {/* Caption */}
                <div
                    ref={captionRef}
                    className="pointer-events-none absolute left-1/2 top-[60%] z-20 w-[20em] -translate-x-1/2 text-center text-[8px] font-semibold uppercase leading-[1.6] tracking-[0.18em] text-white/65 sm:text-[9px]"
                >
                    {caption}
                </div>

                {/* Opening preview — visible before scroll */}
                <div
                    ref={openingRef}
                    className="pointer-events-none absolute bottom-[13%] left-[5%] right-[5%] z-30"
                >
                    <div className="mb-3 flex items-center justify-between gap-4">
                        <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-white/65">
                            A glimpse of MindSpace
                        </span>

                        <span className="hidden text-[8px] uppercase tracking-[0.16em] text-white/35 sm:block">
                            Digital / Learning / Opportunities
                        </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
                        {items.slice(0, visibleCount).map((item, index) => {
                            const preview =
                                item.type === "video"
                                    ? item.poster || item.src
                                    : item.src;

                            return (
                                <div
                                    key={`${item.title}-${index}`}
                                    className={`relative aspect-[1.5/1] min-w-0 overflow-hidden rounded-md border border-white/10 bg-[#131D2B] ${index % 3 === 1
                                        ? "sm:translate-y-2"
                                        : ""
                                        }`}
                                >
                                    <img
                                        src={preview}
                                        alt={item.alt}
                                        loading="eager"
                                        draggable={false}
                                        className="h-full w-full object-cover grayscale-[25%]"
                                        onError={(event) => {
                                            event.currentTarget.style.display =
                                                "none";
                                        }}
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />

                                    <span className="absolute bottom-1.5 left-2 right-2 truncate text-[7px] font-medium text-white/90 sm:text-[8px]">
                                        {item.title}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Final grid divider */}
                <div
                    ref={ruleRef}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-[3.5%] right-[3.5%] top-1/2 z-20 h-px origin-left scale-x-0 bg-white/20"
                />

                {/* Hover label */}
                <div
                    ref={tooltipRef}
                    className="pointer-events-none absolute left-0 top-0 z-50 rounded-full bg-[#F5F7FB] px-3 py-1.5 text-[10px] font-semibold text-[#080B12] opacity-0"
                />

                {/* Bottom metadata */}
                <footer className="absolute bottom-5 left-5 right-5 z-40 flex items-end justify-between gap-5 sm:bottom-7 sm:left-8 sm:right-8 lg:bottom-8 lg:left-10 lg:right-10">
                    <p className="max-w-[250px] text-[9px] leading-[1.65] text-white/65 sm:text-[10px]">
                        {summary}
                    </p>

                    <p className="hidden text-center font-mono text-[8px] tracking-[0.1em] text-white/35 md:block">
                        {footerLabel}
                    </p>

                    <span className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/65">
                        MindSpace
                    </span>
                </footer>
            </section>
        </div>
    );
}
