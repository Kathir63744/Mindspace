"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { siteConfig } from "./data";
import LogoMark from "./LogoMark";
import { PILLARS, SERVICES } from "./services/ServicesData";

/* ============================================================
   MENU — built from the single source of truth (ServicesData)
============================================================ */

type MenuItem = { label: string; href: string; note: string };
type Menu = {
    label: string;
    href?: string;
    intro?: string;
    all?: { label: string; href: string };
    items?: MenuItem[];
};

/* ------------------------------------------------------------
   Route maps — where the real pages live
------------------------------------------------------------ */

const PILLAR_ROUTE: Record<string, string> = {
    "Study abroad": "/study-abroad",
    Training: "/training",
    Careers: "/careers",
};

const SERVICE_ROUTE: Record<string, string> = {
    // Study abroad
    "country-course-mapping": "/study-abroad/country-course-mapping",
    "university-shortlisting": "/study-abroad/university-shortlisting",
    "admission-support": "/study-abroad/admission-support",
    "financial-documentation": "/study-abroad/financial-documentation",
    "visa-support": "/study-abroad/visa-support",
    "pre-departure": "/study-abroad/pre-departure",
    // Training
    "programming-foundations": "/training/programming-foundations",
    "web-development": "/training/web-development",
    "app-development": "/training/app-development",
    "data-ai": "/training/data-ai",
    "cloud-devops": "/training/cloud-devops",
    "portfolio-certification": "/training/portfolio-certification",
    // Careers
    "career-direction": "/careers/career-direction",
    "resume-linkedin": "/careers/resume-linkedin",
    "interview-coaching": "/careers/interview-coaching",
    internships: "/careers/internships",
    "placement-support": "/careers/placement-support",
    "on-the-job-readiness": "/careers/on-the-job-readiness",
};

function resolveHref(rawHref: string, pillarTag?: string): string {
    if (
        rawHref.startsWith("/study-abroad") ||
        rawHref.startsWith("/training") ||
        rawHref.startsWith("/careers")
    ) {
        return rawHref;
    }

    const slug = rawHref.split("/").filter(Boolean).pop() ?? "";
    if (SERVICE_ROUTE[slug]) return SERVICE_ROUTE[slug];
    if (pillarTag && PILLAR_ROUTE[pillarTag]) return PILLAR_ROUTE[pillarTag];
    return rawHref;
}

const MENUS: Menu[] = [
    ...PILLARS.map((p) => {
        const pillarServices = SERVICES.filter((s) => s.pillar === p.tag && s.linked);
        const pillarHref = PILLAR_ROUTE[p.tag] ?? resolveHref(p.cta.href, p.tag);

        return {
            label: p.tag,
            href: pillarHref,
            intro: p.lead,
            all: { label: p.cta.label, href: pillarHref },
            items: pillarServices.map((s) => ({
                label: s.title,
                href: resolveHref(s.href, p.tag),
                note: s.need,
            })),
        };
    }),
    { label: "About", href: "/about" },
];

const CTA = { label: "Talk to an Expert", href: "/contact" };

const BLUE = "#2F7BFF";
const focus =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4aa3ff]";

type IntroFlag = { __mindspaceIntro?: "playing" | "docking" | "done" };

const CSS = `
@keyframes nav-panel-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes nav-row-in{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion: reduce){.nav-anim{animation:none!important}}
`;

function Chevron({ open }: { open: boolean }) {
    return (
        <svg
            viewBox="0 0 20 20"
            className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function ArrowUpRight({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M6 14L14 6M7 6h7v7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function ArrowRight({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function Navbar() {
    const pathname = usePathname();
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
    const activeMenu = MENUS.find((m) => m.label === active && m.items) ?? MENUS[0];

    const isActive = (m: Menu) => {
        if (m.href) return pathname === m.href || pathname.startsWith(m.href + "/");
        return !!m.items?.some((i) => pathname === i.href || pathname.startsWith(i.href + "/"));
    };

    /* ---- intro hand-over ---- */
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

    /* ---- scroll, escape, outside click ---- */
    useEffect(() => {
        const onScroll = () => {
            const scrollY = window.scrollY;
            setScrolled(scrollY > 16);
            setHideTopBar(scrollY > 10);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(false);
                setMobileOpen(false);
            }
        };
        const onPointer = (e: MouseEvent) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("keydown", onKey);
        document.addEventListener("mousedown", onPointer);
        return () => {
            document.removeEventListener("keydown", onKey);
            document.removeEventListener("mousedown", onPointer);
        };
    }, []);

    useEffect(() => {
        setOpen(false);
        setMobileOpen(false);
        setMobileGroup(null);
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    /* ---- shared panel ---- */
    useEffect(() => {
        const el = innerRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => setPanelH(el.offsetHeight));
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    const placeNotch = useCallback(() => {
        const trig = triggerRefs.current[active];
        const panel = panelRef.current;
        if (!trig || !panel) return;
        const t = trig.getBoundingClientRect();
        const p = panel.getBoundingClientRect();
        setNotchX(t.left + t.width / 2 - p.left);
    }, [active]);

    useEffect(() => {
        placeNotch();
    }, [placeNotch, open, linksReady]);

    useEffect(() => {
        window.addEventListener("resize", placeNotch);
        return () => window.removeEventListener("resize", placeNotch);
    }, [placeNotch]);

    /* ---- hover intent ---- */
    const scheduleOpen = (label: string) => {
        window.clearTimeout(closeTimer.current);
        window.clearTimeout(openTimer.current);
        openTimer.current = window.setTimeout(() => {
            setActive(label);
            setOpen(true);
        }, open ? 0 : 80);
    };
    const scheduleClose = () => {
        window.clearTimeout(openTimer.current);
        window.clearTimeout(closeTimer.current);
        closeTimer.current = window.setTimeout(() => setOpen(false), 180);
    };
    const keepOpen = () => window.clearTimeout(closeTimer.current);

    const focusFirst = () =>
        window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus(), 60);

    const reveal = (i: number): CSSProperties => ({
        opacity: linksReady ? 1 : 0,
        transform: linksReady ? "none" : "translateY(-10px)",
        pointerEvents: linksReady ? "auto" : "none",
        transition: `opacity 600ms ease ${250 + i * 70}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${250 + i * 70}ms`,
    });

    return (
        <header className="fixed inset-x-0 top-0 z-50 flex flex-col transition-all duration-300">
            <style>{CSS}</style>

            {/* ---------- TOP ANNOUNCEMENT BAR ---------- */}
            <div
                className={`relative z-50 flex w-full items-center justify-center gap-2 bg-[#2F7BFF] px-4 text-center text-sm text-white overflow-hidden border-b border-white/10 transition-all duration-300 ${hideTopBar
                    ? "max-h-0 py-0 border-transparent opacity-0"
                    : "max-h-[60px] py-2.5 opacity-100"
                    }`}
            >
                <span className="hidden sm:inline opacity-80">Our perspective on deep tech for defence</span>
                <span className="hidden text-white/30 sm:inline">|</span>
                <span className="font-semibold">Watch the Defending India series</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200" />
            </div>

            {/* ---------- MAIN NAVIGATION ---------- */}
            <div
                className={`w-full border-b transition-colors duration-300 ${solid
                    ? "border-white/10 bg-[#07090F]/85 backdrop-blur-xl"
                    : "border-transparent bg-transparent"
                    }`}
            >
                <nav className="mx-auto grid h-[72px] max-w-[90rem] grid-cols-[auto_1fr] items-center px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-12">
                    {/* Logo */}
                    <Link
                        href="/"
                        aria-label={`${siteConfig.name} home`}
                        className={`flex items-center gap-3 justify-self-start rounded-xl text-white ${focus}`}
                    >
                        <span
                            data-nav-logo
                            className="relative block h-14 w-14 shrink-0"
                            style={{ opacity: logoReady ? 1 : 0, transition: "opacity 400ms ease" }}
                        >
                            <LogoMark className="h-full w-full" />
                        </span>
                        <span
                            className="text-xl tracking-tight"
                            style={{
                                opacity: linksReady ? 1 : 0,
                                transform: linksReady ? "none" : "translateX(-14px)",
                                transition:
                                    "opacity 700ms ease 450ms, transform 800ms cubic-bezier(0.22,1,0.36,1) 450ms",
                            }}
                        >
                            {siteConfig.name}
                        </span>
                    </Link>

                    {/* Desktop menu + shared panel */}
                    <div
                        ref={wrapRef}
                        className="relative hidden lg:block"
                        onPointerLeave={(e) => e.pointerType === "mouse" && scheduleClose()}
                        onPointerEnter={(e) => e.pointerType === "mouse" && keepOpen()}
                    >
                        <ul className="flex items-center gap-1">
                            {MENUS.map((m, i) => {
                                const isOpen = open && active === m.label;
                                const current = isActive(m);
                                const lineOn = isOpen || current;
                                const base = `group relative flex items-center gap-1.5 px-4 py-2 text-[15px] transition-colors ${isOpen || current ? "text-white" : "text-white/90 hover:text-white"
                                    } ${focus} rounded-md`;
                                const underline = (
                                    <span
                                        aria-hidden="true"
                                        className={`absolute inset-x-4 -bottom-0.5 h-px origin-left bg-[#4aa3ff] transition-transform duration-300 ${lineOn ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                            }`}
                                    />
                                );

                                return (
                                    <li key={m.label} style={reveal(i)}>
                                        {m.items ? (
                                            <button
                                                ref={(el) => {
                                                    triggerRefs.current[m.label] = el;
                                                }}
                                                type="button"
                                                aria-expanded={isOpen}
                                                aria-haspopup="true"
                                                aria-controls="nav-panel"
                                                onPointerEnter={(e) =>
                                                    e.pointerType === "mouse" && scheduleOpen(m.label)
                                                }
                                                onClick={() => {
                                                    setActive(m.label);
                                                    setOpen(!isOpen);
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === "ArrowDown") {
                                                        e.preventDefault();
                                                        setActive(m.label);
                                                        setOpen(true);
                                                        focusFirst();
                                                    }
                                                }}
                                                className={base}
                                            >
                                                {m.label}
                                                <Chevron open={isOpen} />
                                                {underline}
                                            </button>
                                        ) : (
                                            <Link
                                                ref={(el) => {
                                                    triggerRefs.current[m.label] = el;
                                                }}
                                                href={m.href ?? "#"}
                                                onPointerEnter={(e) =>
                                                    e.pointerType === "mouse" && scheduleClose()
                                                }
                                                className={base}
                                            >
                                                {m.label}
                                                {underline}
                                            </Link>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>

                        {/* shared panel */}
                        <div
                            ref={panelRef}
                            id="nav-panel"
                            role="region"
                            aria-label={`${activeMenu.label} menu`}
                            className="absolute left-1/2 top-full w-[680px] pt-4"
                            style={{
                                opacity: open ? 1 : 0,
                                visibility: open ? "visible" : "hidden",
                                transform: `translateX(-50%) translateY(${open ? 0 : -8}px)`,
                                transition: `opacity 220ms ease, transform 280ms cubic-bezier(0.22,1,0.36,1), visibility 0s linear ${open ? "0s" : "220ms"
                                    }`,
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Escape") {
                                    setOpen(false);
                                    triggerRefs.current[active]?.focus();
                                }
                            }}
                        >
                            <div className="relative">
                                <span
                                    aria-hidden="true"
                                    className="absolute -top-[7px] z-10 h-3.5 w-3.5 -translate-x-1/2 rotate-45 rounded-[3px] border-l border-t bg-white"
                                    style={{
                                        left: notchX,
                                        borderColor: BLUE,
                                        transition: "left 320ms cubic-bezier(0.22,1,0.36,1)",
                                    }}
                                />
                                <div
                                    className="overflow-hidden rounded-[22px] border bg-white"
                                    style={{
                                        borderColor: BLUE,
                                        height: panelH,
                                        boxShadow:
                                            "0 30px 80px -24px rgba(47,123,255,0.45), 0 0 0 4px rgba(47,123,255,0.10)",
                                        transition: "height 320ms cubic-bezier(0.22,1,0.36,1)",
                                    }}
                                >
                                    <div ref={innerRef}>
                                        <div
                                            key={activeMenu.label}
                                            className="nav-anim grid grid-cols-[240px_1fr]"
                                            style={{ animation: "nav-panel-in 260ms ease-out both" }}
                                        >
                                            <div className="flex flex-col justify-between bg-[#F3F7FF] p-6">
                                                <div>
                                                    <p
                                                        className="text-[11px] uppercase tracking-[0.28em]"
                                                        style={{ color: BLUE }}
                                                    >
                                                        {activeMenu.label}
                                                    </p>
                                                    <p className="mt-3 text-[15px] leading-6 text-[#0B1020]">
                                                        {activeMenu.intro}
                                                    </p>
                                                </div>
                                                {activeMenu.all && (
                                                    <Link
                                                        href={activeMenu.all.href}
                                                        className={`group/all mt-8 inline-flex items-center gap-1.5 self-start rounded-md text-[14px] ${focus}`}
                                                        style={{ color: BLUE }}
                                                    >
                                                        <span className="border-b border-transparent transition-colors group-hover/all:border-current">
                                                            {activeMenu.all.label}
                                                        </span>
                                                        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/all:-translate-y-0.5 group-hover/all:translate-x-0.5" />
                                                    </Link>
                                                )}
                                            </div>

                                            <ul className="p-3">
                                                {activeMenu.items?.map((item, idx) => (
                                                    <li
                                                        key={item.href}
                                                        className="nav-anim"
                                                        style={{
                                                            animation: `nav-row-in 320ms cubic-bezier(0.22,1,0.36,1) ${60 + idx * 45
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
                                                                style={{ background: BLUE }}
                                                            />
                                                            <span
                                                                className="w-6 shrink-0 text-xs tabular-nums"
                                                                style={{ color: BLUE }}
                                                            >
                                                                {String(idx + 1).padStart(2, "0")}
                                                            </span>
                                                            <span className="min-w-0 flex-1">
                                                                <span className="block text-[15px] text-[#0B1020]">
                                                                    {item.label}
                                                                </span>
                                                                <span className="mt-0.5 block text-[13px] text-[#5B6577]">
                                                                    You need this when {item.note}.
                                                                </span>
                                                            </span>
                                                            <ArrowUpRight className="h-4 w-4 shrink-0 -translate-x-1 translate-y-1 opacity-0 transition-all duration-200 group-hover/row:translate-x-0 group-hover/row:translate-y-0 group-hover/row:opacity-100 group-focus-visible/row:translate-x-0 group-focus-visible/row:translate-y-0 group-focus-visible/row:opacity-100" />
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA + mobile toggle */}
                    <div className="flex items-center justify-self-end gap-3" style={reveal(MENUS.length)}>
                        <Link
                            href={CTA.href}
                            className={`group hidden items-center gap-2 rounded-full bg-[#2F7BFF] px-6 py-2.5 text-[15px] text-white shadow-[0_0_30px_rgba(47,123,255,0.35)] transition-all hover:bg-[#4a8cff] hover:shadow-[0_0_40px_rgba(47,123,255,0.5)] lg:inline-flex ${focus}`}
                        >
                            {CTA.label}
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                        <button
                            type="button"
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                            aria-expanded={mobileOpen}
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className={`grid h-11 w-11 place-items-center rounded-xl text-white ring-1 ring-inset ring-white/20 lg:hidden ${focus}`}
                        >
                            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
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

            {/* Mobile sheet */}
            <div
                className={`grid transition-[grid-template-rows] duration-300 lg:hidden ${mobileOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
            >
                <div className="overflow-hidden bg-[#07090F]">
                    <div className="max-h-[calc(100svh-72px)] overflow-y-auto px-6 pb-6 pt-2">
                        <ul className="flex flex-col">
                            {MENUS.map((m) => {
                                const groupOpen = mobileGroup === m.label;
                                if (!m.items) {
                                    return (
                                        <li key={m.label} className="border-b border-white/10">
                                            <Link
                                                href={m.href ?? "#"}
                                                className={`flex items-center justify-between py-4 text-lg text-white ${focus}`}
                                            >
                                                {m.label}
                                                <ArrowUpRight className="h-5 w-5 text-white/50" />
                                            </Link>
                                        </li>
                                    );
                                }
                                return (
                                    <li key={m.label} className="border-b border-white/10">
                                        <button
                                            type="button"
                                            aria-expanded={groupOpen}
                                            onClick={() => setMobileGroup(groupOpen ? null : m.label)}
                                            className={`flex w-full items-center justify-between py-4 text-lg ${groupOpen ? "text-white" : "text-white/95"
                                                } ${focus}`}
                                        >
                                            {m.label}
                                            <Chevron open={groupOpen} />
                                        </button>
                                        <div
                                            className={`grid transition-[grid-template-rows] duration-300 ${groupOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                                }`}
                                        >
                                            <div className="overflow-hidden">
                                                <div
                                                    className="mb-4 rounded-2xl border bg-white p-2"
                                                    style={{
                                                        borderColor: BLUE,
                                                        boxShadow: "0 0 0 4px rgba(47,123,255,0.10)",
                                                    }}
                                                >
                                                    <p className="px-3 pb-1 pt-2 text-[13px] text-[#5B6577]">
                                                        {m.intro}
                                                    </p>
                                                    <ul>
                                                        {m.items.map((item) => (
                                                            <li key={item.href}>
                                                                <Link
                                                                    href={item.href}
                                                                    className={`block rounded-xl px-3 py-3 active:bg-[#F3F7FF] ${focus}`}
                                                                >
                                                                    <span className="block text-[15px] text-[#0B1020]">
                                                                        {item.label}
                                                                    </span>
                                                                    <span className="mt-0.5 block text-[13px] text-[#5B6577]">
                                                                        You need this when {item.note}.
                                                                    </span>
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    {m.all && (
                                                        <Link
                                                            href={m.all.href}
                                                            className={`mt-1 flex items-center gap-1.5 rounded-xl px-3 py-3 text-[14px] ${focus}`}
                                                            style={{ color: BLUE }}
                                                        >
                                                            {m.all.label}
                                                            <ArrowUpRight className="h-4 w-4" />
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>

                        <Link
                            href={CTA.href}
                            className={`mt-6 flex items-center justify-center gap-2 rounded-full bg-[#2F7BFF] px-6 py-3.5 text-base text-white ${focus}`}
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