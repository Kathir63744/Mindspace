
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { processContent, processSteps } from "./data";

const stepVisuals = [
  {
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=85&w=900&auto=format&fit=crop",
    label: "01 / Consultation",
  },
  {
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=85&w=900&auto=format&fit=crop",
    label: "02 / Shortlisting",
  },
  {
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=85&w=900&auto=format&fit=crop",
    label: "03 / Application",
  },
  {
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=85&w=900&auto=format&fit=crop",
    label: "04 / Visa Support",
  },
  {
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=85&w=900&auto=format&fit=crop",
    label: "05 / Departure",
  },
];

const INTERVAL = 4500;

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [slideOffset, setSlideOffset] = useState(0);

  const viewportRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);

  const total = Math.min(processSteps.length, stepVisuals.length);

  // Autoplay
  useEffect(() => {
    if (paused || total <= 1) return;

    const timer = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % total);
    }, INTERVAL);

    return () => window.clearInterval(timer);
  }, [paused, total]);

  // Measure card width and responsive gap
  useEffect(() => {
    const viewport = viewportRef.current;
    const firstCard = firstCardRef.current;

    if (!viewport || !firstCard || !firstCard.parentElement) return;

    const rail = firstCard.parentElement;

    const measure = () => {
      const cardWidth = firstCard.getBoundingClientRect().width;
      const gap =
        parseFloat(window.getComputedStyle(rail).columnGap) || 0;

      setSlideOffset(cardWidth + gap);
    };

    measure();

    const observer = new ResizeObserver(measure);

    observer.observe(viewport);
    observer.observe(firstCard);

    return () => observer.disconnect();
  }, [total]);

  // Keep active slide within available steps
  useEffect(() => {
    setActiveStep((current) =>
      Math.min(current, Math.max(total - 1, 0))
    );
  }, [total]);

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-[#080B12] py-20 text-[#F5F7FB] sm:py-28"
    >
      {/* Top accent */}

      <div className="mx-auto w-full max-w-[1800px]">

        {/* Section label */}
        <div className="mb-12 px-6 sm:mb-16 sm:px-10 lg:px-16">
          <div className="flex items-center gap-3">
            <span className="h-px w-9 shrink-0 bg-[#2F7BFF]" />

            <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A9C7FF] sm:text-[11px]">
              How the process works
            </span>

            <span className="h-px w-11 bg-white/10" />
          </div>
        </div>

        {/* Main layout */}
        <div
          className="grid grid-cols-1 items-center gap-10 pl-6 sm:gap-12 sm:pl-10 lg:grid-cols-[minmax(280px,0.75fr)_minmax(0,2.25fr)] lg:gap-12 lg:pl-[6vw]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setPaused(false);
            }
          }}
        >

          {/* LEFT CONTENT */}
          <div className="max-w-[390px] pb-6 pr-6 lg:py-5 lg:pb-9">

            <span className="mb-5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5C9AFF]">
              The MindSpace Journey
            </span>

            <h2 className="text-[36px] font-semibold leading-[1.16] tracking-[-0.055em] text-[#F5F7FB] sm:text-[40px] lg:text-[clamp(34px,3vw,46px)]">
              {processContent.heading}
            </h2>

            <p className="mt-5 text-[14px] leading-[1.8] text-[#A2AAB8]">
              {processContent.body}
            </p>

            {/* Pagination */}
            <div className="mt-9 flex items-center gap-[15px]">
              {processSteps.slice(0, total).map((step, index) => (
                <button
                  key={step.title}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  aria-label={`Show process step ${index + 1}`}
                  aria-current={
                    activeStep === index ? "step" : undefined
                  }
                  className={`h-[7px] w-[7px] rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5C9AFF] ${activeStep === index
                    ? "h-3 w-3 border-2 border-[#5C9AFF] bg-transparent"
                    : "bg-[#465064] hover:bg-[#8AB5FF]"
                    }`}
                />
              ))}
            </div>

            {/* Current step indicator */}
            <div className="mt-6 flex items-center gap-3">
              <span className="text-[11px] font-semibold tabular-nums text-[#A9C7FF]">
                {String(activeStep + 1).padStart(2, "0")}
              </span>

              <span className="h-px w-8 bg-white/15" />

              <span className="text-[10px] uppercase tracking-[0.15em] text-[#737F92]">
                {String(total).padStart(2, "0")} Journey steps
              </span>
            </div>
          </div>

          {/* RIGHT CAROUSEL */}
          <div
            ref={viewportRef}
            className="min-w-0 overflow-hidden"
          >
            <div
              className="flex gap-6 transition-transform duration-[850ms] ease-[cubic-bezier(.22,.75,.25,1)] motion-reduce:transition-none sm:gap-9 lg:gap-10"
              style={{
                transform: `translate3d(-${activeStep * slideOffset}px, 0, 0)`,
              }}
            >
              {processSteps.slice(0, total).map((step, index) => (
                <article
                  key={step.title}
                  ref={index === 0 ? firstCardRef : null}
                  className="group min-w-0 flex-[0_0_82%] sm:flex-[0_0_min(55vw,420px)] lg:flex-[0_0_min(28vw,425px)]"
                >
                  {/* Image */}
                  <div className="relative h-[320px] overflow-hidden rounded-[9px] border border-white/[0.09] bg-[#151C2B] sm:h-[380px] lg:h-[clamp(280px,23vw,420px)]">
                    <Image
                      src={stepVisuals[index].img}
                      alt={step.title}
                      fill
                      priority={index < 2}
                      sizes="(max-width: 600px) 82vw, (max-width: 1000px) 55vw, 28vw"
                      className="object-cover brightness-[0.82] saturate-[0.85] transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.045] group-hover:brightness-95 group-hover:saturate-100"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#03070F]/55 via-transparent via-[38%] to-[#03070F]/35" />

                    {/* Card label */}
                    <div className="absolute left-5 top-5 text-[11px] font-semibold leading-relaxed tracking-[0.01em] text-white drop-shadow-lg">
                      {stepVisuals[index].label}
                      <br />
                      MindSpace
                    </div>

                    {/* Card number */}
                    <div className="absolute bottom-[17px] right-[17px] grid h-[38px] w-[38px] place-items-center rounded-full border border-white/45 bg-[#050A14]/50 text-[11px] text-white backdrop-blur-md">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="pt-5">
                    <h3 className="text-[19px] font-semibold leading-tight tracking-[-0.04em] text-[#F5F7FB] sm:text-[22px]">
                      {step.title}
                    </h3>

                    <p className="mt-2 max-w-[390px] text-[14px] leading-[1.65] text-[#A2AAB8]">
                      {step.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mx-6 mt-10 flex items-center justify-between border-t border-white/10 pt-6 sm:mx-10 lg:mx-16">
          <span className="text-[10px] uppercase tracking-[0.15em] text-[#737F92]">
            {String(activeStep + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")} &nbsp; Journey steps
          </span>

          <button
            type="button"
            onClick={() => setPaused((current) => !current)}
            className="text-[11px] font-semibold text-[#5C9AFF] transition-colors hover:text-[#A5C8FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5C9AFF]"
          >
            {paused ? "Resume autoplay ↗" : "Pause autoplay ↗"}
          </button>
        </div>
      </div>
    </section>
  );
}
