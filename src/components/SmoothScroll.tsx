"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import { LenisContext } from "@/context/LenisContext";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    const w = window.innerWidth;
    const isMobile = w < 768;
    const isTablet = w >= 768 && w < 1024;

    const lenis = new Lenis({
      duration: isMobile ? 0.8 : isTablet ? 1.0 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: isMobile ? 1.5 : isTablet ? 1.8 : 2,
    });

    setLenisInstance(lenis);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisInstance}>
      {children}
    </LenisContext.Provider>
  );
}
