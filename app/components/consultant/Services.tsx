"use client";

import Link from "next/link";

const services = [
  {
    id: "counselling",
    number: "01",
    title: "Career Counselling",
    description:
      "Find the right academic direction based on your ambitions.",
    tags: ["Career Planning", "Profile Assessment", "Guidance"],
    visual: "compass",
    layout: "featured",
  },
  {
    id: "visa",
    number: "02",
    title: "Visa Assistance",
    description:
      "Prepare confidently for your international student journey.",
    tags: ["Visa Documentation", "Interview Preparation"],
    visual: "visa",
    layout: "tall",
  },
  {
    id: "admissions",
    number: "03",
    title: "University Admissions",
    description:
      "Move from university research to a complete application.",
    tags: ["University Selection", "SOP Review", "Applications"],
    visual: "admissions",
    layout: "standard",
  },
  {
    id: "tests",
    number: "04",
    title: "Test Preparation",
    description:
      "Build the skills and scores needed for your next step.",
    tags: ["IELTS", "TOEFL", "GRE", "GMAT"],
    visual: "tests",
    layout: "standard",
  },
  {
    id: "scholarships",
    number: "05",
    title: "Scholarship Guidance",
    description:
      "Explore funding opportunities that support your education.",
    tags: ["Scholarships", "Financial Aid"],
    visual: "scholarship",
    layout: "standard",
  },
  {
    id: "pre-departure",
    number: "06",
    title: "Pre-Departure Support",
    description:
      "Get ready for life, study, and opportunities in a new country.",
    tags: ["Accommodation", "Travel", "Student Guidance"],
    visual: "departure",
    layout: "wide",
  },
];

function ServiceArtwork({ type }: { type: string }) {
  return (
    <div
      className="absolute -bottom-[18px] -right-2 z-0 h-[58%] w-[43%] opacity-55 pointer-events-none transition-all duration-500 group-hover:-translate-x-[5px] group-hover:-translate-y-[5px] group-hover:opacity-80 max-sm:opacity-35"
      aria-hidden="true"
    >
      {type === "compass" && (
        <div className="absolute right-[8%] -bottom-[28%] grid aspect-square w-[220px] place-items-center rounded-full border border-white/30 bg-[#0A225A]/28">
          <div className="relative grid aspect-square w-[68%] place-items-center rounded-full border border-white/50">
            <span className="absolute h-full w-px bg-white/20" />
            <span className="absolute h-full w-px rotate-45 bg-white/20" />
            <span className="absolute h-full w-px rotate-90 bg-white/20" />
            <span className="absolute h-full w-px rotate-[135deg] bg-white/20" />
            <div className="grid h-[42px] w-[42px] place-items-center rounded-full border border-white/55 bg-[#2766D8] text-xs text-white">
              N
            </div>
          </div>
        </div>
      )}

      {type === "visa" && (
        <div className="absolute right-[10%] -bottom-[12%] h-[220px] w-[170px] rotate-[-7deg] rounded-t-xl border border-white/38 bg-[#071843]/48 p-5 shadow-[0_15px_50px_rgba(0,0,0,0.16)]">
          <div className="mb-6 flex gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A9C7FF]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#A9C7FF]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#A9C7FF]" />
          </div>
          <div className="my-3 h-[7px] w-full rounded-[5px] bg-white/42" />
          <div className="my-3 h-[7px] w-[80%] rounded-[5px] bg-white/24" />
          <div className="my-3 h-[7px] w-[55%] rounded-[5px] bg-white/24" />
          <div className="mt-5 grid h-9 w-9 place-items-center rounded-full border border-white/50 text-white">
            ✓
          </div>
        </div>
      )}

      {type === "admissions" && (
        <div className="absolute -right-[3%] -bottom-[20%] h-[170px] w-[230px] rotate-[-5deg] rounded-t-[10px] border border-white/35 bg-[#071843]/42 p-3.5">
          <div className="flex gap-1.5 border-b border-white/20 pb-3.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
          </div>
          <div className="mt-3 h-1.5 w-[90%] rounded-[5px] bg-white/30" />
          <div className="mt-3 h-1.5 w-[48%] rounded-[5px] bg-white/30" />
          <div className="mt-3 h-1.5 w-[90%] rounded-[5px] bg-white/30" />
          <div className="mt-3 h-1.5 w-[70%] rounded-[5px] bg-white/30" />
        </div>
      )}

      {type === "tests" && (
        <div className="flex h-[110px] items-end justify-center gap-3 border-b border-white/50 p-[15px]">
          <span className="h-[35%] w-[22px] border border-white/50 bg-gradient-to-t from-white/[0.08] to-white/50" />
          <span className="h-[55%] w-[22px] border border-white/50 bg-gradient-to-t from-white/[0.08] to-white/50" />
          <span className="h-[72%] w-[22px] border border-white/50 bg-gradient-to-t from-white/[0.08] to-white/50" />
          <span className="h-[95%] w-[22px] border border-white/50 bg-gradient-to-t from-white/[0.08] to-white/50" />
        </div>
      )}

      {type === "scholarship" && (
        <div className="absolute right-[15%] -bottom-[30%] grid aspect-square w-[200px] place-items-center">
          <div className="absolute inset-0 rotate-[-30deg] scale-y-[0.55] rounded-full border border-white/40" />
          <div className="grid h-[65px] w-[65px] place-items-center rounded-full border border-white/50 bg-white/13 text-[25px] text-white">
            ✦
          </div>
          <span className="absolute right-[18%] top-[15%] h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_15px_white]" />
        </div>
      )}

      {type === "departure" && (
        <div className="absolute bottom-[18%] right-[8%] flex w-[250px] items-center justify-between">
          <div className="grid h-12 w-12 place-items-center rounded-full border border-white/60 bg-white/12 text-xs text-white">
            A
          </div>
          <div className="mx-2.5 h-px flex-1 bg-[repeating-linear-gradient(90deg,white_0_5px,transparent_5px_10px)]" />
          <div className="grid h-12 w-12 place-items-center rounded-full border border-white/60 bg-white/25 text-xs text-white">
            B
          </div>
        </div>
      )}
    </div>
  );
}

export function SectionBadge({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#2F7BFF]/30 bg-[#2F7BFF]/10 px-4 py-2 backdrop-blur-md">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2F7BFF] opacity-50" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2F7BFF]" />
      </span>

      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A9C7FF]">
        {text}
      </span>
    </div>
  );
}

export default function Services() {
  return (
    <section
      className="relative overflow-hidden bg-[#07090F] px-[clamp(20px,5vw,76px)] py-[clamp(80px,9vw,130px)] text-[#F5F8FF] max-sm:px-[18px] max-sm:py-[75px]"
      id="services"
    >
      {/* 
        Minimal CSS for the complex responsive grid layout.
        Tailwind cannot easily handle grid-template-areas across multiple breakpoints 
        without unreadable arbitrary values.
      */}
      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          grid-template-rows: repeat(3, minmax(245px, auto));
          grid-template-areas:
            "counselling counselling visa"
            "admissions tests visa"
            "scholarship departure departure";
          gap: 20px;
        }
        .card-counselling { grid-area: counselling; }
        .card-visa { grid-area: visa; }
        .card-admissions { grid-area: admissions; }
        .card-tests { grid-area: tests; }
        .card-scholarships { grid-area: scholarship; }
        .card-pre-departure { grid-area: departure; }

        @media (max-width: 900px) {
          .services-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-template-rows: auto;
            grid-template-areas:
              "counselling counselling"
              "admissions visa"
              "tests visa"
              "scholarship departure";
          }
        }
        @media (max-width: 600px) {
          .services-grid {
            grid-template-columns: 1fr;
            grid-template-areas:
              "counselling"
              "admissions"
              "visa"
              "tests"
              "scholarship"
              "departure";
            gap: 13px;
          }
        }
      `}</style>

      <div className="mx-auto max-w-[1480px]">
        <header className="mb-12 flex items-end justify-between gap-[35px] max-md:flex-col max-md:items-start">
          <div>
            <div className="mx-autmb-10 mb-4  flex max-w-7xl items-center gap-3 px-6">
              <span className="h-px w-9 bg-[#2F7BFF]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A9C7FF]">
                Global Education / What We Offer
              </span>
              <span className="h-px max-w-24 flex-1 bg-white/10" />
            </div>

            <h2 className="m-0 max-w-[850px] text-[clamp(44px,6.5vw,86px)] font-medium leading-[0.98] tracking-[-0.07em] max-sm:text-[clamp(43px,12vw,65px)]">
              Your journey.
              <br />
              <span className="text-[#A9C7FF]">Our guidance.</span>
            </h2>
          </div>

          <p className="max-w-[260px] pb-[5px] text-[13px] leading-[1.8] text-[#A0A9BA] max-md:max-w-[500px]">
            From choosing your destination to preparing for departure, get the
            right support at every stage.
          </p>
        </header>

        <div className="services-grid">
          {services.map((service) => {
            // Calculate min-height classes based on layout
            const heightClass =
              service.layout === "tall"
                ? "min-h-[510px]"
                : service.layout === "featured"
                  ? "min-h-[265px]"
                  : "min-h-[245px]";

            return (
              <Link
                key={service.id}
                href="/contact"
                className={`card-${service.id} group relative isolate flex min-w-0 flex-col justify-between overflow-hidden bg-[linear-gradient(125deg,#7586a0e9_0%,#668fd0be_48%,#426ca0ff_100%)] p-[clamp(23px,2.6vw,38px)] text-white no-underline shadow-sm transition-all duration-350 hover:-translate-y-1 hover:brightness-[1.08] border border-white/[0.32] hover:border-white/50 ${heightClass} max-sm:min-h-[245px]`}
                aria-label={`Enquire about ${service.title}`}
              >
                {/* Background Overlays via Tailwind arbitrary properties */}
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.22),transparent_38%),linear-gradient(115deg,rgba(255,255,255,0.08),transparent_65%)] pointer-events-none" />
                <div className="absolute -bottom-[100px] -right-[50px] -z-10 h-[220px] w-[260px] rounded-full border border-white/25 shadow-[0_0_0_22px_rgba(255,255,255,0.045),0_0_0_45px_rgba(255,255,255,0.035)] pointer-events-none" />

                <ServiceArtwork type={service.visual} />

                <div className="relative z-10 max-w-[540px]">
                  <div className="mb-[17px] flex items-center gap-3">
                    <span className="text-[10px] font-semibold tracking-[0.16em] text-white/72">
                      {service.number} / 06
                    </span>
                    <span
                      className="grid h-[31px] w-[31px] place-items-center border border-white/38 text-base text-white transition-all duration-300 group-hover:-translate-y-[3px] group-hover:translate-x-[3px] group-hover:bg-white/14"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </div>

                  <h3 className="m-0 max-w-[500px] text-[clamp(22px,2.1vw,30px)] font-semibold leading-[1.15] tracking-[-0.045em] text-white max-sm:text-[25px]">
                    {service.title}
                  </h3>
                  <p className="mt-[13px] max-w-[460px] text-sm leading-[1.65] text-white/88 max-sm:max-w-[85%] max-sm:text-[13px]">
                    {service.description}
                  </p>

                  <div className="relative z-20 mt-5 flex max-w-[600px] flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        className="rounded-[2px] border border-white/40 bg-white/13 px-3 py-2 text-[11px] text-white backdrop-blur-md"
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}