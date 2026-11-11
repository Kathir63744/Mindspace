
import Link from "next/link";

const capabilities = [
    "Technology",
    "Training",
    "Global education",
    "Careers",
];

export default function EraOfMakers() {
    return (
        <section
            id="era-of-makers"
            className="relative isolate overflow-hidden bg-[#080B12] py-24 text-[#F5F7FB] sm:py-32 lg:py-36"
        >
            <div className="pointer-events-none absolute -left-48 top-20 h-[420px] w-[420px] rounded-full bg-[#2F7BFF]/[0.07] blur-[130px]" />

            <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">

                {/* Section identity */}
                <div className="mb-16 flex items-center gap-4">
                    
                    <div className="mx-autmb-10 mb-4  flex max-w-7xl items-center gap-3 px-6">
                        <span className="h-px w-9 bg-[#2F7BFF]" />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A9C7FF]">
                            MindSpace / OurVisions
                        </span>
                        <span className="h-px max-w-24 flex-1 bg-white/10" />
                    </div>
                    <span className="h-px flex-1 bg-white/10" />
                    <span className="hidden text-[9px] uppercase tracking-[0.2em] text-white/35 sm:block">
                        One connected platform
                    </span>
                </div>

                <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">

                    {/* Meaningful brand explanation */}
                    <div className="relative z-10 lg:col-span-5">
                        <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.24em] text-white/45">
                            An era of connected possibilities
                        </p>

                        <h2 className="max-w-[680px] text-[clamp(3rem,6.5vw,6.4rem)] font-medium leading-[0.96] tracking-[-0.075em]">
                            Different needs.
                            <br />
                            <span className="text-[#2F7BFF]">
                                One MindSpace.
                            </span>
                        </h2>

                        <p className="mt-8 max-w-[510px] text-[15px] leading-[1.95] text-[#A2AAB8] sm:text-base">
                            MindSpace brings technology solutions, professional
                            training, international education assistance and
                            career support together in one platform. We help
                            businesses build digital products while helping
                            individuals develop skills, explore global education
                            and move towards meaningful career opportunities.
                        </p>

                        <div className="mt-9">
                            <Link
                                href="#services"
                                className="group inline-flex items-center gap-4 border-b border-[#2F7BFF]/60 pb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:text-[#A9C7FF]"
                            >
                                Explore what we do

                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2F7BFF] transition-transform duration-300 group-hover:translate-x-1">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M5 12h14m-6-6 6 6-6 6"
                                            stroke="currentColor"
                                            strokeWidth="1.7"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Architectural illustration */}
                    <div className="relative lg:col-span-7">
                        <div className="pointer-events-none absolute inset-0 rounded-full bg-[#2F7BFF]/[0.045] blur-[100px]" />

                        <div className="relative mx-auto max-w-[720px]">
                            <svg
                                viewBox="0 0 720 540"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                role="img"
                                aria-label="Abstract architectural framework representing the four connected divisions of MindSpace"
                                className="h-auto w-full overflow-visible"
                            >
                                <defs>
                                    <linearGradient
                                        id="mindspace-architecture-front"
                                        x1="180"
                                        y1="150"
                                        x2="370"
                                        y2="420"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#2F7BFF" stopOpacity=".28" />
                                        <stop offset="1" stopColor="#2F7BFF" stopOpacity=".025" />
                                    </linearGradient>

                                    <linearGradient
                                        id="mindspace-architecture-side"
                                        x1="390"
                                        y1="170"
                                        x2="550"
                                        y2="390"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#A9C7FF" stopOpacity=".15" />
                                        <stop offset="1" stopColor="#A9C7FF" stopOpacity=".015" />
                                    </linearGradient>

                                    <radialGradient
                                        id="mindspace-architecture-glow"
                                        cx="0"
                                        cy="0"
                                        r="1"
                                        gradientTransform="translate(365 265) rotate(90) scale(210)"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#2F7BFF" stopOpacity=".14" />
                                        <stop offset="1" stopColor="#2F7BFF" stopOpacity="0" />
                                    </radialGradient>
                                </defs>

                                {/* Ambient field */}
                                <ellipse
                                    cx="360"
                                    cy="285"
                                    rx="290"
                                    ry="220"
                                    fill="url(#mindspace-architecture-glow)"
                                />

                                {/* Architectural ground plane */}
                                <path
                                    d="M65 355L357 465L655 350L360 238L65 355Z"
                                    fill="#0B1423"
                                    stroke="white"
                                    strokeOpacity=".13"
                                />

                                {/* Ground grid */}
                                <g stroke="white" strokeOpacity=".09" strokeWidth="1">
                                    <path d="M108 338L402 450" />
                                    <path d="M155 320L449 433" />
                                    <path d="M203 302L497 415" />
                                    <path d="M250 284L544 397" />
                                    <path d="M297 266L592 380" />
                                    <path d="M123 377L419 264" />
                                    <path d="M174 397L469 283" />
                                    <path d="M225 417L520 303" />
                                    <path d="M276 437L571 322" />
                                    <path d="M327 456L622 342" />
                                </g>

                                {/* Rear structural framework */}
                                <g
                                    stroke="#A9C7FF"
                                    strokeOpacity=".4"
                                    strokeWidth="1.4"
                                >
                                    <path d="M142 278V150L359 66L578 150V278" />
                                    <path d="M142 150L359 233L578 150" />
                                    <path d="M359 66V233" />
                                    <path d="M142 150L142 278L359 361L578 278V150" />
                                </g>

                                {/* Upper architectural roof */}
                                <path
                                    d="M142 150L359 67L578 150L359 235L142 150Z"
                                    fill="#111F34"
                                    fillOpacity=".65"
                                    stroke="#A9C7FF"
                                    strokeOpacity=".5"
                                    strokeWidth="1.5"
                                />

                                {/* Main central structure */}
                                <path
                                    d="M267 187L359 151L452 187L452 345L359 381L267 345V187Z"
                                    fill="url(#mindspace-architecture-front)"
                                    stroke="#2F7BFF"
                                    strokeOpacity=".8"
                                    strokeWidth="1.6"
                                />
                                <path
                                    d="M267 187L359 223L452 187"
                                    stroke="#A9C7FF"
                                    strokeOpacity=".6"
                                    strokeWidth="1.3"
                                />
                                <path
                                    d="M359 223V381"
                                    stroke="#A9C7FF"
                                    strokeOpacity=".35"
                                />
                                <path
                                    d="M267 345L359 381L452 345"
                                    stroke="#A9C7FF"
                                    strokeOpacity=".4"
                                />

                                {/* Left supporting structure */}
                                <path
                                    d="M119 239L190 211L261 239V359L190 387L119 359V239Z"
                                    fill="#10213A"
                                    fillOpacity=".8"
                                    stroke="#A9C7FF"
                                    strokeOpacity=".43"
                                />
                                <path
                                    d="M119 239L190 267L261 239M190 267V387"
                                    stroke="#A9C7FF"
                                    strokeOpacity=".38"
                                />

                                {/* Right supporting structure */}
                                <path
                                    d="M457 239L528 211L599 239V359L528 387L457 359V239Z"
                                    fill="url(#mindspace-architecture-side)"
                                    stroke="#A9C7FF"
                                    strokeOpacity=".43"
                                />
                                <path
                                    d="M457 239L528 267L599 239M528 267V387"
                                    stroke="#A9C7FF"
                                    strokeOpacity=".38"
                                />

                                {/* Structural connecting beams */}
                                <g
                                    stroke="#2F7BFF"
                                    strokeOpacity=".7"
                                    strokeWidth="2"
                                >
                                    <path d="M190 211L190 157L359 91" />
                                    <path d="M528 211L528 157L359 91" />
                                    <path d="M190 267L267 235" />
                                    <path d="M452 235L528 267" />
                                </g>

                                {/* Architectural openings */}
                                <g
                                    stroke="#A9C7FF"
                                    strokeOpacity=".55"
                                    strokeWidth="1.2"
                                >
                                    <path d="M298 249L359 273L420 249V330L359 354L298 330V249Z" />
                                    <path d="M319 257V321" />
                                    <path d="M399 257V321" />
                                    <path d="M298 249L359 225L420 249" />
                                </g>

                                {/* Blue structural details */}
                                <g fill="#2F7BFF">
                                    <circle cx="359" cy="91" r="4" />
                                    <circle cx="190" cy="211" r="3" />
                                    <circle cx="528" cy="211" r="3" />
                                </g>

                                {/* Ground-level connection */}
                                <path
                                    d="M65 355L357 465L655 350"
                                    stroke="#2F7BFF"
                                    strokeOpacity=".6"
                                    strokeWidth="1.5"
                                />

                                <path
                                    d="M359 381V465"
                                    stroke="#2F7BFF"
                                    strokeOpacity=".5"
                                    strokeDasharray="4 7"
                                />
                            </svg>

                            {/* Labels beneath the architectural illustration */}
                            <div className="relative -mt-2 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-white/10 pt-6 sm:grid-cols-4">
                                {capabilities.map((item, index) => (
                                    <div key={item} className="flex items-start gap-2">
                                        <span className="mt-1 font-mono text-[9px] text-[#2F7BFF]">
                                            0{index + 1}
                                        </span>
                                        <span className="text-[10px] leading-5 text-white/65">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Closing brand line */}
                <div className="mt-20 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                        Technology. Learning. Global opportunities.
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                        The MindSpace vision
                    </p>
                </div>
            </div>
        </section>
    );
}
