"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================
   Luminous ribbon background (WebGL), blue edition.

   Differences from the first version:
   - Palette is navy -> ocean -> sky -> ice, symmetric around the centre ribbon.
   - Output is premultiplied (no double-darkening of the edges).
   - Negative bases are never passed to pow() (that is undefined in GLSL and
     shows up as black speckles on some GPUs), squares are written as x * x.
   - Falls back to a soft CSS glow if WebGL is unavailable or the context is lost.
   - Pauses when off-screen, and draws a single still frame for reduced motion.
============================================================ */

const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  #ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  #else
  precision mediump float;
  #endif

  varying vec2 v_uv;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_origin;

  #define PI 3.14159265359

  float ribbon(float distance, float width) {
    float d = abs(distance);
    float body = 1.0 - smoothstep(width * 0.55, width, d);
    float glow = exp(-d * d / (width * width * 2.8));
    return max(body, glow * 0.42);
  }

  vec3 palette(float x) {
    vec3 deep  = vec3(0.03, 0.14, 0.66);
    vec3 ocean = vec3(0.09, 0.40, 1.00);
    vec3 sky   = vec3(0.34, 0.70, 1.00);
    vec3 ice   = vec3(0.62, 0.86, 1.00);

    vec3 a = mix(deep,  ocean, smoothstep(0.0, 0.4, x));
    vec3 b = mix(ocean, sky,   smoothstep(0.4, 0.75, x));
    vec3 c = mix(sky,   ice,   smoothstep(0.75, 1.0, x));

    return x < 0.4 ? a : (x < 0.75 ? b : c);
  }

  void main() {
    vec2 uv = v_uv;
    float aspect = u_resolution.x / max(u_resolution.y, 1.0);
    float t = u_time;

    vec2 p = vec2(uv.x * aspect, uv.y);
    float center = aspect * 0.5;

    // The ribbons start together near the top centre and fan out downward.
    float originY = u_origin;
    float endY = 0.03;

    float progress = clamp((originY - uv.y) / (originY - endY), 0.0, 1.0);
    float spread = smoothstep(0.0, 1.0, progress);

    // Slow movement shared by the whole formation.
    float drift =
      sin(progress * 4.0 - t * 0.42) * 0.025 +
      sin(progress * 7.0 + t * 0.25) * 0.009;
    float floatWave = sin(t * 0.34 + progress * 3.2) * 0.018;

    // Both motions vanish at the common start and end.
    float curve = (drift + floatWave) * sin(PI * progress);

    float total = 0.0;
    vec3 colorSum = vec3(0.0);

    for (int i = 0; i < 5; i++) {
      float id = float(i);
      float lane = (id - 2.0) / 2.0;

      float endpoint = lane * aspect * 0.43;
      float path = center + endpoint * spread + curve;

      float individualFloat =
        sin(t * 0.30 + id * 0.75 + progress * 3.0) * 0.006 * sin(PI * progress);
      path += individualFloat;

      float width = aspect * mix(0.010, 0.036, spread);

      float d = p.x - path;
      float light = ribbon(d, width);

      float dn = d / max(width * 0.34, 0.001);
      float core = exp(-dn * dn);

      float travel = 0.82 + 0.18 * sin(progress * 7.0 - t * 0.65 + id * 0.6);
      float intensity = light * travel;

      // brightest in the middle, deeper blue towards the outer ribbons
      vec3 c = palette(0.18 + 0.70 * (1.0 - abs(lane)));
      c *= 0.72 + core * 0.48;

      colorSum += c * intensity;
      total += intensity;
    }

    float startFade = smoothstep(0.015, 0.19, progress);
    float endFade = 1.0 - smoothstep(0.82, 1.0, progress);
    float verticalFade = startFade * endFade;

    float outerWidth = aspect * (0.035 + spread * 0.46);
    float sideDistance = abs(p.x - center);
    float sideFade = 1.0 - smoothstep(outerWidth * 0.82, outerWidth, sideDistance);

    float coverage = 1.0 - exp(-total * 0.62);
    float intensity = coverage * verticalFade * sideFade;

    vec3 averageColor = colorSum / max(total, 0.001);

    float ax = (p.x - center) / (aspect * 0.48);
    float ay = (uv.y - 0.35) / 0.39;
    float atmosphere = exp(-ax * ax) * exp(-ay * ay);

    vec3 rgb = averageColor * intensity * 1.45 + palette(0.5) * atmosphere * 0.055;

    // premultiplied alpha: never smaller than the brightest channel
    float alpha = clamp(max(max(rgb.r, rgb.g), rgb.b), 0.0, 1.0);

    gl_FragColor = vec4(rgb, alpha);
  }
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
    const shader = gl.createShader(type);
    if (!shader) throw new Error("Could not create shader.");

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const message = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error(message || "Shader compilation failed.");
    }
    return shader;
}

function createProgram(gl: WebGLRenderingContext): WebGLProgram {
    const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    const program = gl.createProgram();
    if (!program) {
        gl.deleteShader(vertex);
        gl.deleteShader(fragment);
        throw new Error("Could not create WebGL program.");
    }

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const message = gl.getProgramInfoLog(program);
        gl.deleteProgram(program);
        throw new Error(message || "Program linking failed.");
    }
    return program;
}

export default function ServiceBackgroundAnimation({
    origin = 0.84,
    className = "",
}: {
    /** Where the ribbons start, as a fraction of the height from the bottom (0.84 = near the top). */
    origin?: number;
    className?: string;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [fallback, setFallback] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext("webgl", {
            alpha: true,
            antialias: true,
            depth: false,
            stencil: false,
            premultipliedAlpha: true,
            powerPreference: "low-power",
        });

        if (!gl) {
            setFallback(true);
            return;
        }

        let program: WebGLProgram;
        try {
            program = createProgram(gl);
        } catch (error) {
            console.error("Background shader error:", error);
            setFallback(true);
            return;
        }

        const positionLocation = gl.getAttribLocation(program, "a_position");
        const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
        const timeLocation = gl.getUniformLocation(program, "u_time");
        const originLocation = gl.getUniformLocation(program, "u_origin");

        const buffer = gl.createBuffer();
        if (!buffer) {
            gl.deleteProgram(program);
            setFallback(true);
            return;
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

        gl.useProgram(program);
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
        gl.uniform1f(originLocation, origin);

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.clearColor(0, 0, 0, 0);

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

        let frame = 0;
        let startTime = 0;
        let visible = true;
        let disposed = false;

        const draw = (time: number) => {
            if (disposed || gl.isContextLost()) return;
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.useProgram(program);
            gl.uniform1f(timeLocation, time);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };

        const resize = () => {
            if (disposed) return;
            const rect = canvas.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
            const width = Math.max(1, Math.round(rect.width * dpr));
            const height = Math.max(1, Math.round(rect.height * dpr));

            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
            }
            gl.viewport(0, 0, width, height);
            gl.useProgram(program);
            gl.uniform2f(resolutionLocation, width, height);
            draw(0);
        };

        const render = (timestamp: number) => {
            if (disposed || !visible) return;
            if (!startTime) startTime = timestamp;
            draw(reducedMotion.matches ? 0 : (timestamp - startTime) / 1000);
            if (!reducedMotion.matches) frame = requestAnimationFrame(render);
        };

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(canvas);

        const intersectionObserver = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            cancelAnimationFrame(frame);
            if (visible) {
                startTime = 0;
                if (reducedMotion.matches) draw(0);
                else frame = requestAnimationFrame(render);
            }
        });
        intersectionObserver.observe(canvas);

        const onMotionChange = () => {
            cancelAnimationFrame(frame);
            startTime = 0;
            if (reducedMotion.matches) draw(0);
            else if (visible) frame = requestAnimationFrame(render);
        };
        reducedMotion.addEventListener("change", onMotionChange);

        const onLost = (e: Event) => {
            e.preventDefault();
            cancelAnimationFrame(frame);
            setFallback(true);
        };
        canvas.addEventListener("webglcontextlost", onLost);

        resize();
        if (reducedMotion.matches) draw(0);
        else frame = requestAnimationFrame(render);

        return () => {
            disposed = true;
            cancelAnimationFrame(frame);
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
            reducedMotion.removeEventListener("change", onMotionChange);
            canvas.removeEventListener("webglcontextlost", onLost);
            gl.deleteBuffer(buffer);
            gl.deleteProgram(program);
        };
    }, [origin]);

    return (
        <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
            {fallback && (
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse 55% 70% at 50% 8%, rgba(47,123,255,.34), rgba(30,107,255,.12) 45%, transparent 72%)",
                    }}
                />
            )}
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        </div>
    );
}