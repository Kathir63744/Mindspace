"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navItems, siteConfig, type NavItem } from "./data";

const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2dd4bf]";

const links: NavItem[] = [{ label: "Home", href: "/" }, ...navItems];

function Chevron({ open }: { open: boolean }) {
    return (
        <svg viewBox="0 0 20 20" className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const wrapRef = useRef<HTMLElement>(null);

    const solid = scrolled || mobileOpen;

    const isActive = (item: NavItem) => {
        if (item.href) return item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return !!item.children?.some((c) => pathname.startsWith(c.href));
    };

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 16);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") { setOpenMenu(null); setMobileOpen(false); }
        };
        const onPointer = (e: MouseEvent) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpenMenu(null);
        };
        document.addEventListener("keydown", onKey);
        document.addEventListener("mousedown", onPointer);
        return () => {
            document.removeEventListener("keydown", onKey);
            document.removeEventListener("mousedown", onPointer);
        };
    }, []);

    useEffect(() => { setOpenMenu(null); setMobileOpen(false); }, [pathname]);

    return (
        <header ref={wrapRef} className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${solid ? "border-white/10 bg-[#0B0B0C]/90 backdrop-blur-md" : "border-transparent bg-transparent"}`}>
            <nav className="mx-auto grid h-[72px] max-w-[90rem] grid-cols-[auto_1fr] items-center px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-12">

                {/* Logo */}
                <Link href="/" className={`flex items-center gap-2.5 justify-self-start rounded-md text-white ${focus}`}>
                    <Image src={siteConfig.logo} alt="Logo" width={46} height={46} className="h-12 w-12 object-contain" priority />
                    <span className="font-display text-xl font-bold tracking-tight">{siteConfig.name}</span>
                </Link>

                {/* Desktop Links */}
                <ul className="hidden items-center gap-2 lg:flex">
                    {links.map((item) => {
                        const open = openMenu === item.label;
                        const active = isActive(item);

                        return (
                            <li
                                key={item.label}
                                className="relative"
                                onPointerEnter={() => item.children && setOpenMenu(item.label)}
                                onPointerLeave={() => item.children && setOpenMenu(null)}
                            >
                                {item.children ? (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => setOpenMenu(open ? null : item.label)}
                                            className={`relative flex items-center gap-1 rounded-md px-4 py-2 text-[15px] font-medium transition-colors ${active || open ? "text-teal-400" : "text-white/70 hover:text-white"} ${focus}`}
                                        >
                                            {item.label}
                                            <Chevron open={open} />
                                        </button>

                                        {/* Dropdown */}
                                        {open && (
                                            <div className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-4">
                                                <ul className="overflow-hidden rounded-2xl border border-white/10 bg-[#151517] p-2 shadow-2xl backdrop-blur-xl">
                                                    {item.children.map((child) => (
                                                        <li key={child.href}>
                                                            <Link
                                                                href={child.href}
                                                                className="block rounded-xl px-4 py-3 transition-colors hover:bg-white/5"
                                                            >
                                                                <span className="block text-sm font-bold text-white">{child.label}</span>
                                                                {child.note && <span className="mt-1 block text-xs text-white/50">{child.note}</span>}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        href={item.href ?? "#"}
                                        className={`relative flex items-center rounded-md px-4 py-2 text-[15px] font-medium transition-colors ${active ? "text-teal-400" : "text-white/70 hover:text-white"} ${focus}`}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ul>

                {/* CTA & Mobile */}
                <div className="flex items-center justify-self-end gap-3">
                    <Link href="/contact" className={`hidden items-center gap-2 rounded-full bg-teal-400 px-6 py-2.5 text-[15px] font-bold text-[#0B0B0C] transition-all hover:scale-105 hover:bg-teal-300 lg:inline-flex ${focus}`}>
                        Book a Demo
                    </Link>
                    <button onClick={() => setMobileOpen(!mobileOpen)} className="grid h-11 w-11 place-items-center rounded-lg text-white ring-1 ring-inset ring-white/20 lg:hidden">
                        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                            {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
                        </svg>
                    </button>
                </div>
            </nav>
        </header>
    );
}