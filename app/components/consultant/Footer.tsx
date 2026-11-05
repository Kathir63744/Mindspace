import Link from "next/link";
import { footerContent, navItems, siteConfig } from "./data";

const linkCls =
    "text-sm text-white/50 transition-colors hover:text-[#2dd4bf] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2dd4bf]";

export default function Footer() {
    // Note: Ensure your data.ts has these exact labels, or adjust them here.
    const services = navItems.find((i) => i.label === "Services")?.children ?? [];
    const training = navItems.find((i) => i.label === "Training and careers")?.children ?? [];

    return (
        <footer className="relative overflow-hidden bg-[#0B0B0C] border-t border-white/5 text-white">

            {/* Subtle Top Glow */}
            <div aria-hidden="true" className="absolute left-1/2 top-0 -z-10 h-[1px] w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#2dd4bf]/50 to-transparent" />

            <div className="mx-auto max-w-[90rem] px-8 lg:px-24 pt-16 pb-8">

                {/* TOP SECTION: Grid */}
                <div className="grid gap-12 lg:grid-cols-12">

                    {/* Brand & Contact */}
                    <div className="lg:col-span-4">
                        <Link href="/" className="inline-flex items-center gap-2 text-white">
                            <span className="font-display text-2xl font-bold tracking-tight">
                                {siteConfig.name}<span className="text-[#2dd4bf]">.</span>
                            </span>
                        </Link>
                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
                            {footerContent.about}
                        </p>

                        <div className="mt-6 flex flex-col gap-2 text-sm text-white/50">
                            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-[#2dd4bf] transition-colors">
                                {siteConfig.phone}
                            </a>
                            <a href={`mailto:${siteConfig.email}`} className="hover:text-[#2dd4bf] transition-colors">
                                {siteConfig.email}
                            </a>
                            <span>{siteConfig.address}</span>
                        </div>
                    </div>

                    {/* Navigation Links (Compact) */}
                    <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-white/80">Services</h3>
                            <ul className="mt-4 space-y-3">
                                {services.slice(0, 4).map((l) => (
                                    <li key={l.href}>
                                        <Link href={l.href} className={linkCls}>
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-white/80">Training</h3>
                            <ul className="mt-4 space-y-3">
                                {training.slice(0, 4).map((l) => (
                                    <li key={l.href}>
                                        <Link href={l.href} className={linkCls}>
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-white/80">Company</h3>
                            <ul className="mt-4 space-y-3">
                                {footerContent.company.map((l) => (
                                    <li key={l.href}>
                                        <Link href={l.href} className={linkCls}>
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>

                    {/* Newsletter / CTA Box */}
                    <div className="lg:col-span-3">
                        <div className="rounded-2xl border border-white/5 bg-[#151517] p-6">
                            <h3 className="font-display text-lg font-bold text-white">Stay updated</h3>
                            <p className="mt-2 text-xs leading-relaxed text-white/50">
                                Get the latest news on university admissions and scholarship deadlines.
                            </p>
                            <form className="mt-4 flex flex-col gap-2">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full rounded-lg border border-white/10 bg-[#0B0B0C] px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-[#2dd4bf] focus:outline-none"
                                />
                                <button type="button" className="w-full rounded-lg bg-[#2dd4bf] px-3 py-2 text-sm font-bold text-[#0B0B0C] transition-colors hover:bg-[#5eead4]">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>

                </div>

                {/* BOTTOM SECTION: Legal & Copyright */}
                <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-2xl text-xs leading-relaxed text-white/30">
                        {footerContent.disclaimer}
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center text-xs text-white/40">
                        <p>
                            &copy; 2024 {siteConfig.name}. All rights reserved.
                        </p>
                        <ul className="flex gap-4">
                            {footerContent.legal.map((l) => (
                                <li key={l.href}>
                                    <Link href={l.href} className="transition-colors hover:text-white">
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}