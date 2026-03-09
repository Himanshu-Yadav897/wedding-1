import type { Metadata, Viewport } from "next";
import { Cormorant, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
      <body className={`${cormorant.variable} ${cormorantGaramond.variable} antialiased`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
