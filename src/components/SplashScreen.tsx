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

      // Fade in Ganesha + invocation
      tl.from(".splash-top", {
        scale: 0.6,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      })
        // Fade in shlok
        .from(".splash-subtext", {
          y: 15,
          opacity: 0,
          duration: 2,
          ease: "power3.out",
        })
        // Fade in bottom logo + hashtag
        .from(".splash-bottom", {
          y: 20,
          opacity: 0,
          duration: 2,
          ease: "power3.out",
        })
        // Hold
        .to({}, { duration: 1 })
        // Fade out everything
        .to(splashRef.current, {
          opacity: 0,
          duration: 2,
          ease: "power2.inOut",
        });
    },
    { scope: splashRef },
  );

  if (gone) return null;

  return (
    <div
      ref={splashRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center bg-[var(--black-deep)]"
    >
      {/* Top section — Ganesha + invocation + shlok at 40% */}
      <div className="absolute top-[40%] -translate-y-full flex flex-col items-center">
        <div className="splash-top flex flex-col items-center">
          <Image
            src="/ganesha-Photoroom.png"
            alt="Lord Ganesha"
            width={120}
            height={120}
            className="mb-3 sm:mb-4"
          />
          <p
            className="text-[var(--gold-light)] text-xl sm:text-base lg:text-lg tracking-wide mb-2 sm:mb-3"
            style={{ fontFamily: "var(--font-amita), serif" }}
          >
            ॥ श्री गणेशाय नमः ॥
          </p>
        </div>
        <div
          className="splash-subtext text-center text-white/50 text-[15px] sm:text-xs lg:text-sm leading-relaxed"
          style={{ fontFamily: "var(--font-amita), serif" }}
        >
          <p>वक्रतुण्ड महाकाय सूर्यकोटि समप्रभः।</p>
          <p>निर्विघ्नं कुरु मे देव सर्व कार्येषु सर्वदा॥</p>
        </div>
      </div>

      {/* Bottom section — Logo + hashtag */}
      <div className="splash-bottom absolute bottom-16 sm:bottom-20 flex flex-col items-center">
        <Image
          src="/SA logo.png"
          alt="Wedding Logo"
          width={120}
          height={120}
          className="mb-4 sm:mb-5"
        />

        {/* s IS GETTING CUT */}
        <p
          className="text-[var(--gold)] text-3xl sm:text-4xl lg:text-5xl mb-6 sm:mb-8 lg:mb-10"
          style={{ fontFamily: "var(--font-script)" }}
        >
          Shreyansh &amp; Ankita
        </p>
        <p className="text-[var(--gold)] text-[11px] sm:text-xs lg:text-sm tracking-[0.2em]">
          #DilTohShAnkiHai
        </p>
      </div>
    </div>
  );
}
