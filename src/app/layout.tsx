import type { Metadata, Viewport } from "next";
import {
  Playfair_Display,
  Carattere,
  Great_Vibes,
  Imperial_Script,
  Cormorant_Garamond,
  Amita,
} from "next/font/google";

import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const carattere = Carattere({
  variable: "--font-carattere",
  subsets: ["latin"],
  weight: ["400"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
});

const imperialScript = Imperial_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
});

const amita = Amita({
  variable: "--font-amita",
  subsets: ["devanagari"],
  weight: ["400", "700"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0d0d0d",
};

export const metadata: Metadata = {
  title: "Shreyansh & Ankita — Wedding Invitation",
  description:
    "Join us in celebrating the union of Shreyansh & Ankita on April 18-19, 2026 at Taj Usha Kiran Palace, Gwalior.",
  openGraph: {
    title: "Shreyansh & Ankita — Wedding Invitation",
    description: "April 18-19, 2026 · Taj Usha Kiran Palace, Gwalior",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${carattere.variable} ${greatVibes.variable} ${imperialScript.variable} ${cormorantGaramond.variable} ${amita.variable} antialiased`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
