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
    default: "MindSpace | Technology, Training & Career Support",
    template: "%s | Consultancy",
  },
  description:
    "MindSpace provides website, app and software development, professional training, and job placement and career support for businesses and individuals.",
  metadataBase: new URL("https://your-domain.com"),
  openGraph: {
    title: "MindSpace | Technology, Training & Career Support",
    description:
      "MindSpace provides website, app and software development, professional training, and job placement and career support for businesses and individuals.",
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