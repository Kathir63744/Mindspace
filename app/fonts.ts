// app/fonts.ts
import { Inter, Playfair_Display, Questrial } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});
export const questrial = Questrial({
  subsets: ["latin"],
  display: "swap",
  weight: "400", // Questrial only comes in one weight
  variable: "--font-questrial",
});