export type PageAccentTheme = {
    accent: string;
    accentRgb: string;
};

const DEFAULT_THEME: PageAccentTheme = {
    accent: "#2F7BFF",
    accentRgb: "47, 123, 255",
};

const PAGE_THEMES: Record<string, PageAccentTheme> = {
    technology: {
        accent: "#2F7BFF",
        accentRgb: "47, 123, 255",
    },
    training: {
        accent: "#35D07F",
        accentRgb: "53, 208, 127",
    },
    careers: {
        accent: "#FF8758",
        accentRgb: "255, 135, 88",
    },
};

export function getPageAccentTheme(pathname: string): PageAccentTheme {
    if (pathname === "/services" || pathname.startsWith("/services/")) {
        return PAGE_THEMES.technology;
    }

    if (pathname === "/training" || pathname.startsWith("/training/")) {
        return PAGE_THEMES.training;
    }

    if (pathname === "/careers" || pathname.startsWith("/careers/")) {
        return PAGE_THEMES.careers;
    }

    return DEFAULT_THEME;
}