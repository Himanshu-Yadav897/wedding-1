"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

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
          "-=0.4",
        )
        // Fade in shlok
        .from(
          ".splash-subtext",
          { y: 15, opacity: 0, duration: 0.6, ease: "power3.out" },
          "-=0.3",
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
    { scope: splashRef },
  );

  if (gone) return null;

  return (
    <div
      ref={splashRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--black-deep)]"
    >
      {/* Om symbol */}
      <div
        className="splash-om text-[var(--gold)] text-5xl sm:text-6xl lg:text-7xl mb-3 sm:mb-4"
        style={{ fontFamily: "serif" }}
      >
        ॐ
      </div>

      <Image src="/ganesha-Photoroom.png" alt="Lord Ganesha" width={80} height={80} className="splash-om mb-3 sm:mb-4" />

      {/* Ganesh invocation */}
      <p
        className="splash-text text-[var(--gold-light)] text-sm sm:text-base lg:text-lg tracking-wide mb-2 sm:mb-3"
        style={{ fontFamily: "var(--font-amita), serif" }}
      >
        ॥ श्री गणेशाय नमः ॥
      </p>

      {/* Ganesh Shlok */}
      <div
        className="splash-subtext text-center text-white/50 text-[10px] sm:text-xs lg:text-sm leading-relaxed mb-8 sm:mb-10"
        style={{ fontFamily: "var(--font-amita), serif" }}
      >
        <p>वक्रतुण्ड महाकाय सूर्यकोटि समप्रभः।</p>
        <p>निर्विघ्नं कुरु मे देव सर्व कार्येषु सर्वदा॥</p>
      </div>

      {/* Logo — center */}
      <Image src="/SA logo.png" alt="Wedding Logo" width={200} height={200} className="splash-logo" />
    </div>
  );
}
