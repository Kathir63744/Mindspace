
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    useCallback,
    useEffect,
    useRef,
    useState,
    type CSSProperties,
} from "react";

import { siteConfig } from "./data";
import LogoMark from "./LogoMark";
import { getPageAccentTheme } from "./PageAccent";

/* ============================================================
   MENU CONFIGURATION
============================================================ */

type MenuItem = {
    label: string;
    href: string;
    note: string;
};

type Menu = {
    label: string;
    href: string;
    intro?: string;
    items?: MenuItem[];
};

const MENUS: Menu[] = [
    {
        label: "Technology Solutions",
        href: "/services",
        intro: "Digital products, websites, and custom software built to scale.",
        items: [
            {
                label: "Website Development",
                href: "/services/website-development",
                note: "you need a fast, responsive site",
            },
            {
                label: "Mobile App Development",
                href: "/services/app-development",
                note: "you need an app for customers or staff",
            },
            {
                label: "Web Application Development",
                href: "/services/web-application",
                note: "you need a cloud-based platform",
            },
            {
                label: "Custom Software Development",
                href: "/services/software-development",
                note: "off-the-shelf tools no longer fit",
            },
        ],
    },
    {
        label: "Professional Training",
        href: "/training",
        intro: "Hands-on programmes and courses to master the tools.",
        items: [
            {
                label: "Technical & Programming Training",
                href: "/training/programming-foundations",
                note: "you are starting from scratch",
            },
            {
                label: "Practical Projects",
                href: "/training/web-development",
                note: "you want to build real products",
            },
            {
                label: "Job Readiness Training",
                href: "/training/portfolio-certification",
                note: "you want to prove your skills",
            },
            {
                label: "Corporate & Communication Training",
                href: "/training/communication",
                note: "your team needs upskilling",
            },
        ],
    },
    {
        label: "Jobs & Career Support",
        href: "/careers",
        intro: "Placement, interviews, and career direction.",
        items: [
            {
                label: "Career Guidance",
                href: "/careers/career-direction",
                note: "you need clarity on which roles to target",
            },
            {
                label: "Resume & LinkedIn Profile Support",
                href: "/careers/resume-linkedin",
                note: "your resume needs restructuring",
            },
            {
                label: "Interview Preparation",
                href: "/careers/interview-coaching",
                note: "you need mock interviews with feedback",
            },
            {
                label: "Job Search Support",
                href: "/careers/placement-support",
                note: "you want warm introductions and follow-ups",
            },
            {
                label: "Internship Assistance",
                href: "/careers/internships",
                note: "you want real experience early",
            },
            {
                label: "Job Placement Assistance",
                href: "/careers/placement-support",
                note: "you want warm introductions and offer negotiation",
            },
        ],
    },
    {
        label: "About",
        href: "/about",
        intro: "Learn more about who we are and what we do.",
    },
    {
        label: "Contact",
        href: "/contact",
        intro: "Get in touch with our team.",
    },
];

const CTA = {
    label: "Talk to an Expert",
    href: "/contact",
};

const focus =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4aa3ff]";

type IntroFlag = {
    __mindspaceIntro?: "playing" | "docking" | "done";
};

const CSS = `
@keyframes nav-panel-in {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: none; }
}

@keyframes nav-row-in {
    from { opacity: 0; transform: translateX(-8px); }
    to { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
    .nav-anim { animation: none !important; }
}
`;

function Chevron({ open }: { open: boolean }) {
    return (
        <svg
            viewBox="0 0 20 20"
            className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""
                }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            <path
                d="M5 8l5 5 5-5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function ArrowUpRight({ className = "" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 20 20"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            <path
                d="M6 14L14 6M7 6h7v7"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function Navbar() {
    const pathname = usePathname();

    /* ============================================================
       PAGE THEME
    ============================================================ */

    const {
        accent: pageAccent,
        accentRgb: pageAccentRgb,
    } = getPageAccentTheme(pathname);

    const isCareers =
        pathname === "/careers" ||
        pathname.startsWith("/careers/");

    const accent = isCareers ? "#9D66FF" : pageAccent;

    const accentRgb = isCareers
        ? "157, 102, 255"
        : pageAccentRgb;

    const accentStyle = {
        "--page-accent": accent,
        "--page-accent-rgb": accentRgb,
    } as CSSProperties;

    /* ============================================================
       STATE
    ============================================================ */

    const [scrolled, setScrolled] = useState(false);
    const [hideTopBar, setHideTopBar] = useState(false);
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState<string>(MENUS[0].label);
    const [notchX, setNotchX] = useState(0);
    const [panelH, setPanelH] = useState<number | undefined>(undefined);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileGroup, setMobileGroup] = useState<string | null>(null);
    const [linksReady, setLinksReady] = useState(pathname !== "/");
    const [logoReady, setLogoReady] = useState(pathname !== "/");

    const wrapRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    const triggerRefs = useRef<Record<string, HTMLElement | null>>({});
    const openTimer = useRef<number | undefined>(undefined);
    const closeTimer = useRef<number | undefined>(undefined);

    const solid = scrolled || mobileOpen;

    const activeMenu =
        MENUS.find((menu) => menu.label === active && menu.items) ??
        MENUS[0];

    const isActive = (menu: Menu) => {
        if (menu.items) {
            return (
                menu.items.some(
                    (item) =>
                        pathname === item.href ||
                        pathname.startsWith(item.href + "/")
                ) || pathname === menu.href
            );
        }

        return (
            pathname === menu.href ||
            pathname.startsWith(menu.href + "/")
        );
    };

    /* ============================================================
       HOMEPAGE LOGO INTRO
    ============================================================ */

    useEffect(() => {
        if (pathname !== "/") {
            setLinksReady(true);
            setLogoReady(true);
            return;
        }

        const flag = (window as unknown as IntroFlag).__mindspaceIntro;

        if (flag === "done") {
            setLinksReady(true);
            setLogoReady(true);
            return;
        }

        setLinksReady(flag === "docking");
        setLogoReady(false);

        const onDock = () => setLinksReady(true);

        const onDone = () => {
            setLinksReady(true);
            setLogoReady(true);
        };

        window.addEventListener("mindspace:intro-dock", onDock);
        window.addEventListener("mindspace:intro-done", onDone);

        return () => {
            window.removeEventListener("mindspace:intro-dock", onDock);
            window.removeEventListener("mindspace:intro-done", onDone);
        };
    }, [pathname]);

    /* ============================================================
       SCROLL STATE
    ============================================================ */

    useEffect(() => {
        const onScroll = () => {
            const scrollY = window.scrollY;

            setScrolled(scrollY > 16);
            setHideTopBar(scrollY > 10);
        };

        onScroll();

        window.addEventListener("scroll", onScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    /* ============================================================
       KEYBOARD AND OUTSIDE CLICK
    ============================================================ */

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
                setMobileOpen(false);
            }
        };

        const onPointer = (event: MouseEvent) => {
            if (
                wrapRef.current &&
                !wrapRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("keydown", onKey);
        document.addEventListener("mousedown", onPointer);

        return () => {
            document.removeEventListener("keydown", onKey);
            document.removeEventListener("mousedown", onPointer);
        };
    }, []);

    /* ============================================================
       ROUTE CHANGE
    ============================================================ */

    useEffect(() => {
        setOpen(false);
        setMobileOpen(false);
        setMobileGroup(null);
    }, [pathname]);

    /* ============================================================
       MOBILE BODY SCROLL
    ============================================================ */

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    /* ============================================================
       DROPDOWN HEIGHT
    ============================================================ */

    useEffect(() => {
        const element = innerRef.current;

        if (!element) return;

        const resizeObserver = new ResizeObserver(() => {
            setPanelH(element.offsetHeight);
        });

        resizeObserver.observe(element);

        return () => resizeObserver.disconnect();
    }, []);

    /* ============================================================
       DROPDOWN NOTCH POSITION
    ============================================================ */

    const placeNotch = useCallback(() => {
        const trigger = triggerRefs.current[active];
        const panel = panelRef.current;

        if (!trigger || !panel) return;

        const triggerRect = trigger.getBoundingClientRect();
        const panelRect = panel.getBoundingClientRect();

        setNotchX(
            triggerRect.left +
            triggerRect.width / 2 -
            panelRect.left
        );
    }, [active]);

    useEffect(() => {
        placeNotch();
    }, [placeNotch, open, linksReady]);

    useEffect(() => {
        window.addEventListener("resize", placeNotch);

        return () => {
            window.removeEventListener("resize", placeNotch);
        };
    }, [placeNotch]);

    /* ============================================================
       DROPDOWN INTERACTIONS
    ============================================================ */

    const scheduleOpen = (label: string) => {
        window.clearTimeout(closeTimer.current);
        window.clearTimeout(openTimer.current);

        openTimer.current = window.setTimeout(
            () => {
                setActive(label);
                setOpen(true);
            },
            open ? 0 : 80
        );
    };

    const scheduleClose = () => {
        window.clearTimeout(openTimer.current);
        window.clearTimeout(closeTimer.current);

        closeTimer.current = window.setTimeout(() => {
            setOpen(false);
        }, 180);
    };

    const keepOpen = () => {
        window.clearTimeout(closeTimer.current);
    };

    const focusFirst = () => {
        window.setTimeout(() => {
            panelRef.current
                ?.querySelector<HTMLElement>("a[href]")
                ?.focus();
        }, 60);
    };

    /* ============================================================
       INTRO REVEAL
    ============================================================ */

    const reveal = (index: number): CSSProperties => ({
        opacity: linksReady ? 1 : 0,
        transform: linksReady ? "none" : "translateY(-10px)",
        pointerEvents: linksReady ? "auto" : "none",
        transition: `
            opacity 600ms ease ${250 + index * 70}ms,
            transform 700ms cubic-bezier(0.22,1,0.36,1) ${250 + index * 70
            }ms
        `,
    });

    return (
        <header
            className="fixed inset-x-0 top-0 z-50 flex flex-col transition-all duration-300"
            style={accentStyle}
        >
            <style>{CSS}</style>

            {/* =====================================================
                MAIN NAVBAR
            ===================================================== */}

            <div
                className={`w-full border-b transition-colors duration-300 ${isCareers
                    ? "border-white/10 backdrop-blur-xl"
                    : solid
                        ? "border-white/10 bg-[#07090F]/85 backdrop-blur-xl"
                        : "border-transparent bg-transparent"
                    }`}
                style={
                    isCareers
                        ? {
                            backgroundColor: solid
                                ? "#1C1036"
                                : "#261549",
                        }
                        : undefined
                }
            >
                <nav className="mx-auto grid h-[72px] max-w-[90rem] grid-cols-[auto_1fr] items-center px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-12">
                    {/* BRAND */}

                    <Link
                        href="/"
                        aria-label={`${siteConfig.name} home`}
                        className={`flex items-center gap-3 justify-self-start rounded-xl text-white ${focus}`}
                    >
                        <span
                            data-nav-logo
                            className="relative block h-14 w-14 shrink-0"
                            style={{
                                opacity: logoReady ? 1 : 0,
                                transition: "opacity 400ms ease",
                            }}
                        >
                            <LogoMark className="h-full w-full" />
                        </span>

                        <span
                            className="font-questrial text-[22px] tracking-[-0.01em]"
                            style={{
                                opacity: linksReady ? 1 : 0,
                                transform: linksReady
                                    ? "none"
                                    : "translateX(-14px)",
                                transition:
                                    "opacity 700ms ease 450ms, transform 800ms cubic-bezier(0.22,1,0.36,1) 450ms",
                            }}
                        >
                            {siteConfig.name}
                        </span>
                    </Link>

                    {/* DESKTOP NAVIGATION */}

                    <div
                        ref={wrapRef}
                        className="relative hidden lg:block"
                        onPointerLeave={(event) =>
                            event.pointerType === "mouse" && scheduleClose()
                        }
                        onPointerEnter={(event) =>
                            event.pointerType === "mouse" && keepOpen()
                        }
                    >
                        <ul className="flex items-center gap-1">
                            {MENUS.map((menu, index) => {
                                const isOpen =
                                    open && active === menu.label;

                                const current = isActive(menu);
                                const lineOn = isOpen || current;

                                const base = `group relative flex items-center gap-1.5 rounded-md px-4 py-2 font-questrial text-[16px] tracking-[-0.01em] transition-colors ${isOpen || current
                                    ? "text-white"
                                    : "text-white/90 hover:text-white"
                                    } ${focus}`;

                                const underline = (
                                    <span
                                        aria-hidden="true"
                                        className={`absolute inset-x-4 -bottom-0.5 h-px origin-left transition-transform duration-300 ${lineOn
                                            ? "scale-x-100"
                                            : "scale-x-0 group-hover:scale-x-100"
                                            }`}
                                        style={{
                                            backgroundColor: accent,
                                        }}
                                    />
                                );

                                return (
                                    <li
                                        key={menu.label}
                                        style={reveal(index)}
                                    >
                                        {menu.items ? (
                                            <button
                                                ref={(element) => {
                                                    triggerRefs.current[
                                                        menu.label
                                                    ] = element;
                                                }}
                                                type="button"
                                                aria-expanded={isOpen}
                                                aria-haspopup="true"
                                                aria-controls="nav-panel"
                                                onPointerEnter={(event) =>
                                                    event.pointerType ===
                                                    "mouse" &&
                                                    scheduleOpen(menu.label)
                                                }
                                                onClick={() => {
                                                    setActive(menu.label);
                                                    setOpen(!isOpen);
                                                }}
                                                onKeyDown={(event) => {
                                                    if (
                                                        event.key ===
                                                        "ArrowDown"
                                                    ) {
                                                        event.preventDefault();
                                                        setActive(menu.label);
                                                        setOpen(true);
                                                        focusFirst();
                                                    }
                                                }}
                                                className={base}
                                            >
                                                {menu.label}
                                                <Chevron open={isOpen} />
                                                {underline}
                                            </button>
                                        ) : (
                                            <Link
                                                ref={(element) => {
                                                    triggerRefs.current[
                                                        menu.label
                                                    ] = element;
                                                }}
                                                href={menu.href}
                                                onPointerEnter={(event) =>
                                                    event.pointerType ===
                                                    "mouse" &&
                                                    scheduleClose()
                                                }
                                                className={base}
                                            >
                                                {menu.label}
                                                {underline}
                                            </Link>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>

                        {/* DROPDOWN PANEL */}

                        <div
                            ref={panelRef}
                            id="nav-panel"
                            role="region"
                            aria-label={`${activeMenu.label} menu`}
                            className="absolute left-1/2 top-full w-[680px] pt-4"
                            style={{
                                opacity: open ? 1 : 0,
                                visibility: open ? "visible" : "hidden",
                                transform: `translateX(-50%) translateY(${open ? 0 : -8
                                    }px)`,
                                transition: `opacity 220ms ease, transform 280ms cubic-bezier(0.22,1,0.36,1), visibility 0s linear ${open ? "0s" : "220ms"
                                    }`,
                            }}
                            onKeyDown={(event) => {
                                if (event.key === "Escape") {
                                    setOpen(false);
                                    triggerRefs.current[active]?.focus();
                                }
                            }}
                        >
                            <div className="relative">
                                {/* POINTER NOTCH */}

                                <span
                                    aria-hidden="true"
                                    className="absolute -top-[7px] z-10 h-3.5 w-3.5 -translate-x-1/2 rotate-45 rounded-[3px] border-l border-t bg-white"
                                    style={{
                                        left: notchX,
                                        borderColor: accent,
                                        transition:
                                            "left 320ms cubic-bezier(0.22,1,0.36,1)",
                                    }}
                                />

                                <div
                                    className="overflow-hidden rounded-[22px] border bg-white"
                                    style={{
                                        borderColor: accent,
                                        height: panelH,
                                        boxShadow: `0 30px 80px -24px rgba(${accentRgb},0.45), 0 0 0 4px rgba(${accentRgb},0.10)`,
                                        transition:
                                            "height 320ms cubic-bezier(0.22,1,0.36,1)",
                                    }}
                                >
                                    <div ref={innerRef}>
                                        <div
                                            key={activeMenu.label}
                                            className="nav-anim grid grid-cols-[240px_1fr]"
                                            style={{
                                                animation:
                                                    "nav-panel-in 260ms ease-out both",
                                            }}
                                        >
                                            {/* DROPDOWN INTRO */}

                                            <div className="flex flex-col justify-between bg-[#F3F7FF] p-6">
                                                <div>
                                                    <p
                                                        className="font-questrial text-[11px] uppercase tracking-[0.28em]"
                                                        style={{
                                                            color: accent,
                                                        }}
                                                    >
                                                        {activeMenu.label}
                                                    </p>

                                                    <p className="mt-3 text-[15px] leading-6 text-[#0B1020]">
                                                        {activeMenu.intro}
                                                    </p>
                                                </div>

                                                <Link
                                                    href={activeMenu.href}
                                                    className={`group/all mt-8 inline-flex items-center gap-1.5 self-start rounded-md font-questrial text-[14px] ${focus}`}
                                                    style={{
                                                        color: accent,
                                                    }}
                                                >
                                                    <span className="border-b border-transparent transition-colors group-hover/all:border-current">
                                                        View all{" "}
                                                        {activeMenu.label}
                                                    </span>

                                                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/all:-translate-y-0.5 group-hover/all:translate-x-0.5" />
                                                </Link>
                                            </div>

                                            {/* DROPDOWN LINKS */}

                                            <ul className="p-3">
                                                {activeMenu.items?.map(
                                                    (item, index) => (
                                                        <li
                                                            key={item.href}
                                                            className="nav-anim"
                                                            style={{
                                                                animation: `nav-row-in 320ms cubic-bezier(0.22,1,0.36,1) ${60 +
                                                                    index * 45
                                                                    }ms both`,
                                                            }}
                                                        >
                                                            <Link
                                                                href={item.href}
                                                                className={`group/row relative flex items-center gap-4 rounded-2xl px-4 py-3 transition-colors hover:bg-[#F3F7FF] focus-visible:bg-[#F3F7FF] ${focus}`}
                                                            >
                                                                <span
                                                                    aria-hidden="true"
                                                                    className="absolute left-0 top-3 bottom-3 w-[3px] origin-center scale-y-0 rounded-full transition-transform duration-200 group-hover/row:scale-y-100 group-focus-visible/row:scale-y-100"
                                                                    style={{
                                                                        background:
                                                                            accent,
                                                                    }}
                                                                />

                                                                <span
                                                                    className="w-6 shrink-0 font-questrial text-xs tabular-nums"
                                                                    style={{
                                                                        color: accent,
                                                                    }}
                                                                >
                                                                    {String(
                                                                        index + 1
                                                                    ).padStart(
                                                                        2,
                                                                        "0"
                                                                    )}
                                                                </span>

                                                                <span className="min-w-0 flex-1">
                                                                    <span className="block font-questrial text-[15px] text-[#0B1020]">
                                                                        {
                                                                            item.label
                                                                        }
                                                                    </span>

                                                                    <span className="mt-0.5 block text-[13px] text-[#5B6577]">
                                                                        You need
                                                                        this
                                                                        when{" "}
                                                                        {
                                                                            item.note
                                                                        }
                                                                        .
                                                                    </span>
                                                                </span>

                                                                <ArrowUpRight className="h-4 w-4 shrink-0 -translate-x-1 translate-y-1 opacity-0 transition-all duration-200 group-hover/row:translate-x-0 group-hover/row:translate-y-0 group-hover/row:opacity-100 group-focus-visible/row:translate-x-0 group-focus-visible/row:translate-y-0 group-focus-visible/row:opacity-100" />
                                                            </Link>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA AND MOBILE TOGGLE */}

                    <div
                        className="flex items-center justify-self-end gap-3"
                        style={reveal(MENUS.length)}
                    >
                        <Link
                            href={CTA.href}
                            className={`group hidden items-center gap-2 rounded-full px-6 py-2.5 font-questrial text-[15px] text-white transition-all lg:inline-flex ${focus}`}
                            style={{
                                backgroundColor: accent,
                                boxShadow: `0 0 30px rgba(${accentRgb},0.35)`,
                            }}
                        >
                            {CTA.label}

                            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>

                        <button
                            type="button"
                            aria-label={
                                mobileOpen ? "Close menu" : "Open menu"
                            }
                            aria-expanded={mobileOpen}
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className={`grid h-11 w-11 place-items-center rounded-xl text-white ring-1 ring-inset ring-white/20 lg:hidden ${focus}`}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            >
                                {mobileOpen ? (
                                    <path d="M6 6l12 12M18 6L6 18" />
                                ) : (
                                    <path d="M4 7h16M4 12h16M4 17h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </nav>
            </div>

            {/* =====================================================
                MOBILE NAVIGATION
            ===================================================== */}

            <div
                className={`grid transition-[grid-template-rows] duration-300 lg:hidden ${mobileOpen
                    ? "grid-rows-[1fr]"
                    : "grid-rows-[0fr]"
                    }`}
            >
                <div
                    className="overflow-hidden"
                    style={{
                        backgroundColor: isCareers
                            ? "#261549"
                            : "#07090F",
                    }}
                >
                    <div className="max-h-[calc(100svh-72px)] overflow-y-auto px-6 pb-6 pt-2">
                        <ul className="flex flex-col">
                            {MENUS.map((menu) => {
                                const groupOpen =
                                    mobileGroup === menu.label;

                                if (!menu.items) {
                                    return (
                                        <li
                                            key={menu.label}
                                            className="border-b border-white/10"
                                        >
                                            <Link
                                                href={menu.href}
                                                className={`flex items-center justify-between py-4 font-questrial text-lg text-white ${focus}`}
                                            >
                                                {menu.label}

                                                <ArrowUpRight className="h-5 w-5 text-white/50" />
                                            </Link>
                                        </li>
                                    );
                                }

                                return (
                                    <li
                                        key={menu.label}
                                        className="border-b border-white/10"
                                    >
                                        <button
                                            type="button"
                                            aria-expanded={groupOpen}
                                            onClick={() =>
                                                setMobileGroup(
                                                    groupOpen
                                                        ? null
                                                        : menu.label
                                                )
                                            }
                                            className={`flex w-full items-center justify-between py-4 font-questrial text-lg ${groupOpen
                                                ? "text-white"
                                                : "text-white/95"
                                                } ${focus}`}
                                        >
                                            {menu.label}
                                            <Chevron open={groupOpen} />
                                        </button>

                                        <div
                                            className={`grid transition-[grid-template-rows] duration-300 ${groupOpen
                                                ? "grid-rows-[1fr]"
                                                : "grid-rows-[0fr]"
                                                }`}
                                        >
                                            <div className="overflow-hidden">
                                                <div
                                                    className="mb-4 rounded-2xl border bg-white p-2"
                                                    style={{
                                                        borderColor: accent,
                                                        boxShadow: `0 0 0 4px rgba(${accentRgb},0.10)`,
                                                    }}
                                                >
                                                    <p className="px-3 pb-1 pt-2 text-[13px] text-[#5B6577]">
                                                        {menu.intro}
                                                    </p>

                                                    <ul>
                                                        {menu.items.map(
                                                            (item) => (
                                                                <li
                                                                    key={
                                                                        item.href
                                                                    }
                                                                >
                                                                    <Link
                                                                        href={
                                                                            item.href
                                                                        }
                                                                        className={`block rounded-xl px-3 py-3 active:bg-[#F3F7FF] ${focus}`}
                                                                    >
                                                                        <span className="block font-questrial text-[15px] text-[#0B1020]">
                                                                            {
                                                                                item.label
                                                                            }
                                                                        </span>

                                                                        <span className="mt-0.5 block text-[13px] text-[#5B6577]">
                                                                            You need
                                                                            this
                                                                            when{" "}
                                                                            {
                                                                                item.note
                                                                            }
                                                                            .
                                                                        </span>
                                                                    </Link>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>

                                                    <Link
                                                        href={menu.href}
                                                        className={`mt-1 flex items-center gap-1.5 rounded-xl px-3 py-3 font-questrial text-[14px] ${focus}`}
                                                        style={{
                                                            color: accent,
                                                        }}
                                                    >
                                                        View all {menu.label}
                                                        <ArrowUpRight className="h-4 w-4" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>

                        <Link
                            href={CTA.href}
                            className={`mt-6 flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-questrial text-base text-white ${focus}`}
                            style={{
                                backgroundColor: accent,
                            }}
                        >
                            {CTA.label}
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
