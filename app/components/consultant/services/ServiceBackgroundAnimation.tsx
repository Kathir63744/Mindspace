
"use client";

import { useEffect, useRef } from "react";

const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;

  varying vec2 v_uv;
  uniform vec2 u_resolution;
  uniform float u_time;

  #define PI 3.14159265359

  float ribbon(float distance, float width) {
    float d = abs(distance);
    float body = 1.0 - smoothstep(width * 0.55, width, d);
    float glow = exp(-d * d / (width * width * 2.8));
    return max(body, glow * 0.42);
  }

  vec3 palette(float x) {
    vec3 blue = vec3(0.12, 0.34, 1.0);
    vec3 violet = vec3(0.48, 0.25, 0.95);
    vec3 amber = vec3(1.0, 0.48, 0.20);

    return x < 0.5
      ? mix(blue, violet, smoothstep(0.0, 0.5, x))
      : mix(violet, amber, smoothstep(0.5, 1.0, x));
  }

  void main() {
    vec2 uv = v_uv;
    float aspect = u_resolution.x / max(u_resolution.y, 1.0);
    float t = u_time;

    vec2 p = vec2(uv.x * aspect, uv.y);
    float center = aspect * 0.5;

    // The ribbons begin together near the upper centre.
    float originY = 0.78;
    float endY = 0.035;

    float progress = clamp(
      (originY - uv.y) / (originY - endY),
      0.0,
      1.0
    );

    float spread = smoothstep(0.0, 1.0, progress);

    // Slow movement shared by the whole light formation.
    float drift =
      sin(progress * 4.0 - t * 0.42) * 0.025 +
      sin(progress * 7.0 + t * 0.25) * 0.009;

    float floatWave =
      sin(t * 0.34 + progress * 3.2) * 0.018;

    // Both motions vanish at the common start and end.
    float curve = (drift + floatWave) *
      sin(PI * progress);

    float total = 0.0;
    vec3 colorSum = vec3(0.0);

    // Five broad, evenly spaced curved ribbons.
    for (int i = 0; i < 5; i++) {
      float id = float(i);
      float lane = (id - 2.0) / 2.0;

      // Uniform spacing from the same origin.
      float endpoint = lane * aspect * 0.43;
      float path = center + endpoint * spread + curve;

      // Gentle individual floating motion, not rigid rotation.
      float individualFloat =
        sin(t * 0.30 + id * 0.75 + progress * 3.0) *
        0.006 * sin(PI * progress);

      path += individualFloat;

      // Broad translucent surfaces.
      float width = aspect * mix(0.009, 0.032, spread);

      float d = p.x - path;
      float light = ribbon(d, width);

      // Soft luminous centre within each ribbon.
      float core = exp(
        -pow(d / max(width * 0.34, 0.001), 2.0)
      );

      // Subtle light travelling down each curved surface.
      float travel =
        0.82 + 0.18 * sin(
          progress * 7.0 - t * 0.65 + id * 0.6
        );

      float intensity = light * travel;

      vec3 c = palette(id / 4.0);
      c *= 0.72 + core * 0.48;

      colorSum += c * intensity;
      total += intensity;
    }

    // A common fade makes all five lower ends finish together.
    float startFade = smoothstep(0.015, 0.19, progress);
    float endFade = 1.0 - smoothstep(0.82, 1.0, progress);
    float verticalFade = startFade * endFade;

    // Soft outer silhouette.
    float outerWidth = aspect * (0.035 + spread * 0.46);
    float sideDistance = abs(p.x - center);

    float sideFade = 1.0 - smoothstep(
      outerWidth * 0.82,
      outerWidth,
      sideDistance
    );

    float coverage = 1.0 - exp(-total * 0.62);
    float intensity = coverage * verticalFade * sideFade;

    vec3 averageColor = colorSum / max(total, 0.001);

    // Wide atmospheric glow behind the ribbons.
    float atmosphere =
      exp(-pow((p.x - center) / (aspect * 0.48), 2.0)) *
      exp(-pow((uv.y - 0.35) / 0.39, 2.0));

    vec3 finalColor =
      averageColor * intensity * 1.25 +
      palette(0.48) * atmosphere * 0.055;

    float alpha = clamp(
      intensity * 0.70 + atmosphere * 0.045,
      0.0,
      0.72
    );

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

function compileShader(
    gl: WebGLRenderingContext,
    type: number,
    source: string
): WebGLShader {
    const shader = gl.createShader(type);

    if (!shader) {
        throw new Error("Could not create shader.");
    }

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
    const vertex = compileShader(
        gl,
        gl.VERTEX_SHADER,
        vertexShaderSource
    );

    const fragment = compileShader(
        gl,
        gl.FRAGMENT_SHADER,
        fragmentShaderSource
    );

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

export default function ServiceBackgroundAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext("webgl", {
            alpha: true,
            antialias: true,
            depth: false,
            stencil: false,
            premultipliedAlpha: false,
            powerPreference: "low-power",
        });

        if (!gl) return;

        let program: WebGLProgram;

        try {
            program = createProgram(gl);
        } catch (error) {
            console.error("Background shader error:", error);
            return;
        }

        const positionLocation = gl.getAttribLocation(
            program,
            "a_position"
        );

        const resolutionLocation = gl.getUniformLocation(
            program,
            "u_resolution"
        );

        const timeLocation = gl.getUniformLocation(
            program,
            "u_time"
        );

        const buffer = gl.createBuffer();

        if (!buffer) {
            gl.deleteProgram(program);
            return;
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([
                -1, -1,
                1, -1,
                -1, 1,
                1, 1,
            ]),
            gl.STATIC_DRAW
        );

        gl.useProgram(program);
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(
            positionLocation,
            2,
            gl.FLOAT,
            false,
            0,
            0
        );

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.clearColor(0, 0, 0, 0);

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        let frame = 0;
        let startTime = 0;
        let visible = true;
        let disposed = false;

        const draw = (time: number) => {
            if (disposed) return;

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

            draw(
                reducedMotion.matches
                    ? 0
                    : (timestamp - startTime) / 1000
            );

            if (!reducedMotion.matches) {
                frame = requestAnimationFrame(render);
            }
        };

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(canvas);

        const intersectionObserver = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            cancelAnimationFrame(frame);

            if (visible) {
                startTime = 0;

                if (reducedMotion.matches) {
                    draw(0);
                } else {
                    frame = requestAnimationFrame(render);
                }
            }
        });

        intersectionObserver.observe(canvas);

        const handleMotionChange = () => {
            cancelAnimationFrame(frame);
            startTime = 0;

            if (reducedMotion.matches) {
                draw(0);
            } else if (visible) {
                frame = requestAnimationFrame(render);
            }
        };

        reducedMotion.addEventListener("change", handleMotionChange);

        resize();

        if (reducedMotion.matches) {
            draw(0);
        } else {
            frame = requestAnimationFrame(render);
        }

        return () => {
            disposed = true;
            cancelAnimationFrame(frame);
            resizeObserver.disconnect();
            intersectionObserver.disconnect();

            reducedMotion.removeEventListener(
                "change",
                handleMotionChange
            );

            gl.deleteBuffer(buffer);
            gl.deleteProgram(program);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
        />
    );
}
