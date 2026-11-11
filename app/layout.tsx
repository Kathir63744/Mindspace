import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree, Questrial } from "next/font/google";
import "./globals.css";
import OpeningAnimation from "./components/consultant/OpeningAnimation";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const body = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const questrial = Questrial({
  subsets: ["latin"],
  display: "swap",
  weight: "400", // Questrial only comes in one weight
  variable: "--font-questrial",
});

export const metadata: Metadata = {
  title: {
    default: "Consultancy | Education Consultants",
    template: "%s | Consultancy",
  },
  description:
    "Course selection, applications, and visa guidance for students going abroad.",
  metadataBase: new URL("https://your-domain.com"), // ← replace with real domain
  openGraph: {
    title: "Consultancy | Education Consultants",
    description:
      "Course selection, applications, and visa guidance for students going abroad.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body antialiased">

        {children}</body>
    </html>
  );
}