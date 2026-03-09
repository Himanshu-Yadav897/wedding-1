"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Couple() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const isMobile = window.innerWidth < 768;
      const dur = isMobile ? 0.8 : 1.2;
      const textDur = isMobile ? 0.6 : 1;
      const start = isMobile ? "top 85%" : "top 75%";
      const textStart = isMobile ? "top 75%" : "top 65%";

      gsap.from(".groom-img", {
        clipPath: "inset(100% 0 0 0)", duration: dur, ease: "power3.inOut",
        scrollTrigger: { trigger: ".groom-block", start, toggleActions: "play none none none" },
      });
      gsap.from(".groom-text", {
        y: isMobile ? 30 : 60, opacity: 0, duration: textDur, ease: "power3.out",
        scrollTrigger: { trigger: ".groom-block", start: textStart },
      });
      gsap.from(".bride-img", {
        clipPath: "inset(100% 0 0 0)", duration: dur, ease: "power3.inOut",
        scrollTrigger: { trigger: ".bride-block", start, toggleActions: "play none none none" },
      });
      gsap.from(".bride-text", {
        y: isMobile ? 30 : 60, opacity: 0, duration: textDur, ease: "power3.out",
        scrollTrigger: { trigger: ".bride-block", start: textStart },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 lg:py-44 bg-[var(--cream)]">
      {/* Section title */}
      <div className="section-container text-center mb-14 sm:mb-20 lg:mb-28">
        <p
          className="text-[var(--gold)] tracking-[0.3em] uppercase text-[10px] sm:text-xs lg:text-sm mb-5 sm:mb-6 lg:mb-8"
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
        >
          The Couple
        </p>
        <h2
          className="text-[var(--black)] text-3xl sm:text-4xl lg:text-6xl font-light"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Two Souls, One Journey
        </h2>
      </div>

      {/* Groom */}
      <div className="groom-block section-container flex flex-col lg:flex-row items-center gap-10 sm:gap-14 lg:gap-16 mb-24 sm:mb-28 lg:mb-36">
        <div className="groom-img relative w-[90%] mx-auto sm:w-[80%] lg:w-[480px] lg:mx-0 lg:shrink-0 aspect-[3/4] overflow-hidden rounded-xl sm:rounded-lg lg:rounded-sm">
          <Image
            src="/S&A/DSC03134.JPG"
            alt="Shreyansh"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 480px"
          />
        </div>
        <div className="groom-text flex-1 text-center lg:text-left px-6 sm:px-10 lg:px-0">
          <p
            className="text-[var(--gold)] tracking-[0.3em] uppercase text-[10px] sm:text-xs mb-4 sm:mb-5 lg:mb-6"
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          >
            The Groom
          </p>
          <h3
            className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6 sm:mb-8 lg:mb-10"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Shreyansh
          </h3>
          <p
            className="text-[var(--text-muted)] text-base sm:text-lg lg:text-xl leading-relaxed max-w-md mx-auto lg:mx-0"
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          >
            A man of quiet strength and warm laughter, who believes that the
            best things in life are the ones you share with someone special.
          </p>
        </div>
      </div>

      {/* Bride */}
      <div className="bride-block section-container flex flex-col lg:flex-row-reverse items-center gap-10 sm:gap-14 lg:gap-16">
        <div className="bride-img relative w-[90%] mx-auto sm:w-[80%] lg:w-[480px] lg:mx-0 lg:shrink-0 aspect-[3/4] overflow-hidden rounded-xl sm:rounded-lg lg:rounded-sm">
          <Image
            src="/S&A/DSC03168.JPG"
            alt="Ankita"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 480px"
          />
        </div>
        <div className="bride-text flex-1 text-center lg:text-right px-6 sm:px-10 lg:px-0">
          <p
            className="text-[var(--gold)] tracking-[0.3em] uppercase text-[10px] sm:text-xs mb-4 sm:mb-5 lg:mb-6"
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          >
            The Bride
          </p>
          <h3
            className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6 sm:mb-8 lg:mb-10"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Ankita
          </h3>
          <p
            className="text-[var(--text-muted)] text-base sm:text-lg lg:text-xl leading-relaxed max-w-md mx-auto lg:ml-auto"
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          >
            A woman of grace and radiance, whose smile lights up every room and
            whose heart holds a universe of kindness.
          </p>
        </div>
      </div>
    </section>
  );
}
