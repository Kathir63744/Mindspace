// app/test-theme/page.tsx
import Link from "next/link";
import { getThemeVariables, resolveTheme } from "@/app/components/consultant/themes/MindSpaceTheme";

const PILLARS = ["Technology", "Study abroad", "Training", "Careers"];

export default function TestThemePage() {
    return (
        <div className="min-h-screen bg-black p-6">
            {PILLARS.map((pillar) => {
                const theme = resolveTheme(pillar);
                return (
                    <div
                        key={pillar}
                        style={getThemeVariables(theme)}
                        className="mb-6 rounded-xl border border-white/20 p-6"
                    >
                        <p className="mb-3 text-sm text-white">
                            PILLAR: <strong>{pillar}</strong> → THEME: <strong>{theme.name}</strong> → ACCENT: <strong>{theme.accent}</strong>
                        </p>
                        <div
                            className="h-16 w-full rounded-md"
                            style={{ background: "var(--ms-accent)" }}
                        />
                        <div
                            className="mt-3 h-16 w-full rounded-md"
                            style={{ background: "var(--ms-background)" }}
                        />
                    </div>
                );
            })}
            <div className="mt-8 flex gap-4">
                <Link href="/services/website-development" className="text-blue-400 underline">website-development</Link>
                <Link href="/services/visa-support" className="text-green-400 underline">visa-support</Link>
                <Link href="/services/portfolio-certification" className="text-amber-400 underline">portfolio-certification</Link>
                <Link href="/services/interview-coaching" className="text-purple-400 underline">interview-coaching</Link>
            </div>
        </div>
    );
}