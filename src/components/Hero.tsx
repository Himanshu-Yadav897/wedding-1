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
          {
            scale: 1.1,
            opacity: 0,
            duration: isMobile ? 1 : 1.5,
            ease: "power2.out",
          },
          0,
        )
        .from(".hero-scroll", { opacity: 0, y: 10, duration: 0.5 }, "-=0.2");
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen-safe overflow-hidden"
    >
      {/* Background image — covers full viewport */}
      <div className="hero-image absolute inset-0 z-0">
        <Image
          src="/Wedding Invitaion Gallery/DSC05170.JPEG"
          alt="Shreyansh & Ankita"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Content — centered, max-width constrained */}
      <div className="absolute top-[5dvh] sm:top-0 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-center px-5 sm:px-8 sm:pt-[8dvh] safe-top w-full max-w-[px]">
        {/* Hindu invocation */}
        <div className="overflow-hidden mb-4 sm:mb-5 lg:mb-6">
          <p
            className="hero-line text-[var(--gold)] text-sm sm:text-base lg:text-lg tracking-wide"
            style={{ fontFamily: "var(--font-amita), serif" }}
          >
            || श्री गणेशाय नमः ||
          </p>
        </div>

        <div className="overflow-hidden">
          <p
            className="hero-line text-[var(--gold-light)] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[11px] sm:text-xs lg:text-base mb-5 sm:mb-3 lg:mb-5 mt-3 sm:mt-0 font-bold"
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          >
            Together with their families
          </p>
        </div>

        <div className="mt-1 sm:mt-1 lg:mt-2 px-4">
          <h1
            className="hero-line text-white text-[9vw] sm:text-[7vw] lg:text-[72px] xl:text-[84px] leading-[1.1]"
            style={{ fontFamily: "var(--font-carattere)" }}
          >
            Shreyansh
          </h1>
        </div>
        <div className="overflow-hidden">
          <p
            className="hero-line text-[var(--gold-light)] text-[10px] sm:text-xs lg:text-sm tracking-[0.15em]"
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          >
            (S/o Mrs. Sarita &amp; Mr. Shiv Kumar Chauhan)
          </p>
        </div>

        <div className="overflow-hidden my-0.5 sm:my-1 lg:my-2 px-4">
          <p
            className="hero-line text-[var(--gold-light)] text-xl sm:text-2xl lg:text-4xl"
            style={{ fontFamily: "var(--font-script)" }}
          >
            &amp;
          </p>
        </div>

        <div className="px-4">
          <h1
            className="hero-line text-white text-[9vw] sm:text-[7vw] lg:text-[72px] xl:text-[84px] leading-[1.1]"
            style={{ fontFamily: "var(--font-carattere)" }}
          >
            Ankita
          </h1>
        </div>
        <div className="overflow-hidden">
          {/* {we have to reduce the padding of y axis} */}
          <p
            className="hero-line text-[var(--gold-light)] text-[10px] sm:text-xs lg:text-sm tracking-[0.15em]"
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          >
            (D/o Mrs. Nisha Devi &amp; Late Rajesh Singh Rajawat)
          </p>
        </div>

        <div className="overflow-hidden">
          <p
            className="hero-line text-[var(--gold-light)] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[11px] sm:text-xs lg:text-base mb-5 sm:mb-3 lg:mb-5 mt-3 sm:mt-0 font-bold pt-3"
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          >
            request the honour of your presence at their wedding ceremony
          </p>
        </div>
      </div>

      {/* Date & venue pinned near bottom */}
      <div className="absolute bottom-24 sm:bottom-20 lg:bottom-24 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-center">
        <div className="hero-date">
          <div className="ornament">
            <span
              className="text-[var(--gold-light)] tracking-[0.2em] uppercase text-[11px] sm:text-xs lg:text-base"
              style={{ fontFamily: "var(--font-kavivanar)" }}
            >
              April 18–19, 2026
            </span>
          </div>
        </div>

        <p
          className="hero-venue text-white/70 mt-4 sm:mt-5 lg:mt-6 tracking-[0.12em] sm:tracking-[0.15em] uppercase text-[10px] sm:text-xs lg:text-sm"
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
