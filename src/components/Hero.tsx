"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const isMobile = window.innerWidth < 768;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-line", {
        y: isMobile ? 50 : 100,
        opacity: 0,
        duration: isMobile ? 0.8 : 1.2,
        stagger: 0.15,
      })
        .from(".hero-date", { y: 20, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(".hero-venue", { y: 20, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(
          ".hero-image",
          { scale: 1.1, opacity: 0, duration: isMobile ? 1 : 1.5, ease: "power2.out" },
          0
        )
        .from(".hero-scroll", { opacity: 0, y: 10, duration: 0.5 }, "-=0.2");
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen-safe items-center justify-center overflow-hidden"
    >
      {/* Background image — covers full viewport */}
      <div className="hero-image absolute inset-0 z-0">
        <Image
          src="/S&A/DSC05170.JPG"
          alt="Sheryansh & Akanksha"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Content — centered, max-width constrained */}
      <div className="relative z-10 flex flex-col items-center text-center px-5 sm:px-8 py-16 safe-top w-full max-w-[900px] mx-auto">
        <div className="overflow-hidden">
          <p
            className="hero-line text-[var(--gold-light)] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[11px] sm:text-xs lg:text-base mb-3 lg:mb-5"
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          >
            Together with their families
          </p>
        </div>

        <div className="overflow-hidden">
          <h1
            className="hero-line text-white text-[11vw] sm:text-[8vw] lg:text-[80px] xl:text-[96px] font-light leading-[1.1]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Sheryansh
          </h1>
        </div>

        <div className="overflow-hidden my-1 sm:my-2 lg:my-4">
          <p
            className="hero-line text-[var(--gold-light)] text-xl sm:text-2xl lg:text-4xl italic font-light"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            &amp;
          </p>
        </div>

        <div className="overflow-hidden">
          <h1
            className="hero-line text-white text-[11vw] sm:text-[8vw] lg:text-[80px] xl:text-[96px] font-light leading-[1.1]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Akanksha
          </h1>
        </div>

        <div className="hero-date mt-6 sm:mt-8 lg:mt-12">
          <div className="ornament">
            <span
              className="text-[var(--gold-light)] tracking-[0.2em] uppercase text-[11px] sm:text-xs lg:text-base"
              style={{ fontFamily: "var(--font-cormorant-garamond)" }}
            >
              April 7, 2026
            </span>
          </div>
        </div>

        <p
          className="hero-venue text-white/70 mt-3 lg:mt-4 tracking-[0.12em] sm:tracking-[0.15em] uppercase text-[10px] sm:text-xs lg:text-sm"
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
        >
          Taj Usha Kiran Palace · Gwalior
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 safe-bottom">
        <span
          className="text-white/50 text-[9px] lg:text-xs tracking-[0.2em] uppercase"
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
        >
          Scroll
        </span>
        <div className="w-px h-6 lg:h-8 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
