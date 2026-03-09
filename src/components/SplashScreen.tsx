"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function SplashScreen() {
  const splashRef = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => setGone(true),
      });

      // Fade in Om symbol
      tl.from(".splash-om", {
        scale: 0.6,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      })
        // Fade in invocation text
        .from(
          ".splash-text",
          { y: 20, opacity: 0, duration: 0.7, ease: "power3.out" },
          "-=0.4"
        )
        // Fade in shubh vivah
        .from(
          ".splash-subtext",
          { y: 15, opacity: 0, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        )
        // Hold
        .to({}, { duration: 1 })
        // Fade out everything
        .to(splashRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
        });
    },
    { scope: splashRef }
  );

  if (gone) return null;

  return (
    <div
      ref={splashRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--black-deep)]"
    >
      {/* Om symbol */}
      <div
        className="splash-om text-[var(--gold)] text-7xl sm:text-8xl lg:text-9xl mb-6 sm:mb-8"
        style={{ fontFamily: "serif" }}
      >
        ॐ
      </div>

      {/* Ganesh invocation */}
      <p
        className="splash-text text-[var(--gold-light)] text-base sm:text-lg lg:text-xl tracking-wide mb-3 sm:mb-4"
        style={{ fontFamily: "var(--font-cormorant-garamond)" }}
      >
        || श्री गणेशाय नमः ||
      </p>

      {/* Shubh Vivah */}
      <p
        className="splash-subtext text-white/40 text-xs sm:text-sm lg:text-base tracking-[0.3em] uppercase"
        style={{ fontFamily: "var(--font-cormorant-garamond)" }}
      >
        शुभ विवाह
      </p>
    </div>
  );
}
