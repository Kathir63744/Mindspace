import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PillarDetail from "../../components/pillar/PillarDetail";
import { SERVICES, VISUALS } from "./data";

export const instant = false;

type Props = { params: Promise<{ slug: string }> };

/* Slug aliases — old/alternate URLs map to canonical slugs */
const ALIASES: Record<string, string> = {
    "university-selection": "university-shortlisting",
    "admission-sop": "admission-support",
    "financial-docs": "financial-documentation",
    "visa-filing": "visa-support",
    "predeparture": "pre-departure",
};

function resolveSlug(raw: string): string {
    return ALIASES[raw] ?? raw;
}

export function generateStaticParams() {
    const canonical = SERVICES.map((s) => ({ slug: s.slug }));
    const aliases = Object.keys(ALIASES).map((slug) => ({ slug }));
    return [...canonical, ...aliases];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug: raw } = await params;
    const slug = resolveSlug(raw);
    const service = SERVICES.find((s) => s.slug === slug);
    if (!service) return { title: "Not found" };
    return {
        title: `${service.title} — Study Abroad — MindSpace`,
        description: service.need,
    };
}

export default async function StudyAbroadDetail({ params }: Props) {
    const { slug: raw } = await params;
    const slug = resolveSlug(raw);
    const service = SERVICES.find((s) => s.slug === slug);
    const visual = VISUALS[slug];
    if (!service || !visual) notFound();

    return (
        <PillarDetail
            pillarLabel="Study abroad"
            pillarSlug="study-abroad"
            service={service}
            allServices={SERVICES}
            visual={visual}
        />
    );
}