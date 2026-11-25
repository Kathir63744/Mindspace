import type { CSSProperties } from "react";

export type MindSpaceTheme = {
    name: string;
    background: string;
    backgroundAlt: string;
    surface: string;
    surfaceAlt: string;
    text: string;
    muted: string;
    accent: string;
    secondary: string;
    secondaryDeep: string;
    accentSoft: string;
    border: string;
    glow: string;
};

type ThemeFamily = Pick<
    MindSpaceTheme,
    | "background"
    | "backgroundAlt"
    | "surface"
    | "surfaceAlt"
    | "text"
    | "muted"
    | "accent"
>;

const FAMILY_THEMES: Record<string, ThemeFamily> = {
    technology: {
        background: "#081735",
        backgroundAlt: "#081735",
        surface: "#0B1D40",
        surfaceAlt: "#0E234A",
        text: "#FFFFFF",
        muted: "#C5D5F5",
        accent: "#2F7BFF",
    },
    training: {
        background: "#07110D",
        backgroundAlt: "#0A1911",
        surface: "#0D1A13",
        surfaceAlt: "#13251A",
        text: "#F3FAF5",
        muted: "#C2D7CA",
        accent: "#35D07F",
    },
    // UPDATED CAREERS THEME (#261549)
    careers: {
        background: "#261549",
        backgroundAlt: "#1C1036",
        surface: "#2F1B5C",
        surfaceAlt: "#3A226B",
        text: "#F5F0FF",
        muted: "#f8f5feff",
        accent: "#9D66FF",
    },
    studyAbroad: {
        background: "#07110D",
        backgroundAlt: "#0A1911",
        surface: "#0D1A13",
        surfaceAlt: "#13251A",
        text: "#F3FAF5",
        muted: "#C2D7CA",
        accent: "#35D07F",
    },
};

const SLUG_SECONDARIES: Record<string, string> = {
    "website-development": "#123A9B",
    "app-development": "#244ED6",
    "web-application": "#0D2868",
    "software-development": "#194ABF",
    "programming-foundations": "#087A48",
    "training-web-development": "#145C35",
    "web-development": "#145C35",
    "portfolio-certification": "#0C8C55",
    "training-portfolio": "#0C8C55",
    "communication": "#17663B",
    "training-communication": "#17663B",
    // Careers secondary variations based on violet
    "career-direction": "#7A44D1",
    "resume-linkedin": "#6030B3",
    "interview-coaching": "#8B5CF6",
    "placement-support": "#552699",
    "internships": "#6C35C2",
    "on-the-job-readiness": "#4A1F8C",
    "job-search-support": "#552699",
};

const FAMILY_SECONDARIES: Record<string, string> = {
    technology: "#123A9B",
    training: "#087A48",
    careers: "#7A44D1",
    studyAbroad: "#087A48",
};

function getFamilyFromSlug(
    pillar: string,
    slug: string,
): keyof typeof FAMILY_THEMES {
    const normalizedPillar = pillar.toLowerCase().replace(/[\s\-_]/g, "");
    const normalizedSlug = slug.toLowerCase().trim();

    if (normalizedPillar.includes("studyabroad") || normalizedSlug.includes("study-abroad")) {
        return "studyAbroad";
    }
    if (
        normalizedPillar.includes("training") ||
        normalizedSlug.startsWith("training-") ||
        normalizedSlug === "programming-foundations" ||
        normalizedSlug === "web-development" ||
        normalizedSlug === "portfolio-certification" ||
        normalizedSlug === "communication"
    ) {
        return "training";
    }
    if (
        normalizedPillar.includes("career") ||
        normalizedSlug.startsWith("career-") ||
        normalizedSlug.startsWith("careers-") ||
        normalizedSlug === "resume-linkedin" ||
        normalizedSlug === "interview-coaching" ||
        normalizedSlug === "placement-support" ||
        normalizedSlug === "internships" ||
        normalizedSlug === "on-the-job-readiness" ||
        normalizedSlug === "job-search-support"
    ) {
        return "careers";
    }
    return "technology";
}

function hexToRgb(hex: string) {
    const clean = hex.replace("#", "");
    return {
        r: parseInt(clean.slice(0, 2), 16),
        g: parseInt(clean.slice(2, 4), 16),
        b: parseInt(clean.slice(4, 6), 16),
    };
}

function rgba(hex: string, alpha: number): string {
    const { r, g, b } = hexToRgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function resolveTheme(
    pillar: string,
    slug: string = "",
): MindSpaceTheme {
    const normalizedSlug = slug.toLowerCase().trim();
    const familyName = getFamilyFromSlug(pillar, normalizedSlug);
    const family = FAMILY_THEMES[familyName];

    const secondary = SLUG_SECONDARIES[normalizedSlug] ?? FAMILY_SECONDARIES[familyName];

    return {
        name: normalizedSlug || familyName,
        ...family,
        secondary,
        secondaryDeep: secondary,
        accentSoft: rgba(family.accent, 0.13),
        border: rgba(family.accent, 0.22),
        glow: rgba(family.accent, 0.30),
    };
}

export const MAIN_THEMES = {
    technology: resolveTheme("technology"),
    training: resolveTheme("training"),
    careers: resolveTheme("careers"),
    studyAbroad: resolveTheme("study-abroad"),
} as const;

export function getThemeVariables(theme: MindSpaceTheme): CSSProperties {
    return {
        "--ms-background": theme.background,
        "--ms-background-alt": theme.backgroundAlt,
        "--ms-surface": theme.surface,
        "--ms-surface-alt": theme.surfaceAlt,
        "--ms-text": theme.text,
        "--ms-muted": theme.muted,
        "--ms-accent": theme.accent,
        "--ms-secondary": theme.secondary,
        "--ms-secondary-deep": theme.secondaryDeep,
        "--ms-accent-soft": theme.accentSoft,
        "--ms-border": theme.border,
        "--ms-glow": theme.glow,
        "--ms-gradient": `linear-gradient(135deg, ${theme.accent}, ${theme.secondaryDeep})`,
        "--ms-gradient-soft": `linear-gradient(135deg, ${rgba(theme.accent, 0.16)}, ${rgba(theme.secondaryDeep, 0.22)})`,
        "--ms-gradient-strong": `linear-gradient(135deg, ${theme.accent}, ${theme.secondaryDeep})`,
    } as CSSProperties;
}