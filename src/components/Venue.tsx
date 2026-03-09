"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    name: "Mehendi",
    time: "11:00 AM",
    description: "A celebration of colours, intricate henna artistry, and joyous music.",
  },
  {
    name: "Sangeet",
    time: "4:00 PM",
    description: "An evening of dance, music, and unforgettable performances by family & friends.",
  },
  {
    name: "Wedding Ceremony",
    time: "7:30 PM",
    description: "The sacred union of two hearts, blessed under the stars at the palace grounds.",
  },
  {
    name: "Reception",
    time: "9:30 PM",
    description: "A grand celebration with dinner, dancing, and memories to last a lifetime.",
  },
];

export default function Venue() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const isMobile = window.innerWidth < 768;

      gsap.from(".venue-info", {
        y: isMobile ? 30 : 60, opacity: 0, duration: isMobile ? 0.6 : 1, ease: "power3.out",
        scrollTrigger: { trigger: ".venue-info", start: isMobile ? "top 90%" : "top 80%" },
      });

      const items = gsap.utils.toArray<HTMLElement>(".event-card");
      items.forEach((item, i) => {
        gsap.from(item, {
          y: isMobile ? 30 : 60, opacity: 0, duration: isMobile ? 0.5 : 0.8, delay: i * 0.1, ease: "power3.out",
          scrollTrigger: { trigger: item, start: isMobile ? "top 92%" : "top 85%" },
        });
      });

      gsap.from(".timeline-line", {
        scaleY: 0, transformOrigin: "top", duration: 1.5, ease: "power3.inOut",
        scrollTrigger: { trigger: ".timeline-container", start: "top 70%" },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 lg:py-40 bg-[var(--black-deep)] relative">
      {/* Section title */}
      <div className="section-container text-center mb-10 sm:mb-14 lg:mb-20">
        <p
          className="text-[var(--gold)] tracking-[0.3em] uppercase text-[10px] sm:text-xs lg:text-sm mb-3"
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
        >
          The Celebration
        </p>
        <h2
          className="text-white text-3xl sm:text-4xl lg:text-6xl font-light"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Where & When
        </h2>
      </div>

      {/* Venue Info — constrained center */}
      <div className="venue-info w-full max-w-[900px] mx-auto text-center mb-14 sm:mb-20 lg:mb-28 px-5 sm:px-8">
        {/* Venue image — fixed 16:9 on desktop, portrait on mobile */}
        <div className="relative w-full aspect-[3/4] sm:aspect-[4/3] lg:aspect-[16/9] rounded-xl sm:rounded-lg lg:rounded-sm overflow-hidden mb-8 sm:mb-8 lg:mb-10">
          <Image
            src="/S&A/DSC05174.JPG"
            alt="Taj Usha Kiran Palace"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 900px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 lg:bottom-6 lg:left-6 text-left">
            <h3
              className="text-white text-xl sm:text-2xl lg:text-3xl font-light"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Taj Usha Kiran Palace
            </h3>
            <p
              className="text-white/70 text-xs sm:text-sm lg:text-base mt-0.5"
              style={{ fontFamily: "var(--font-cormorant-garamond)" }}
            >
              Jayendraganj, Lashkar, Gwalior, MP
            </p>
          </div>
        </div>

        <p
          className="text-white/60 text-[15px] sm:text-base lg:text-lg leading-relaxed max-w-[600px] mx-auto"
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
        >
          Built in 1880 by Maharaja Jayaji Rao Scindia, this heritage palace
          stands on nine acres of lush gardens — a royal haven where history
          meets celebration.
        </p>

        {/* Date row */}
        <div className="mt-6 sm:mt-7 lg:mt-8 flex flex-row items-center justify-center gap-4 sm:gap-5 lg:gap-8">
          <div className="text-center">
            <p
              className="text-[var(--gold)] text-2xl sm:text-3xl lg:text-5xl font-light"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              18–19
            </p>
            <p className="text-white/50 text-[9px] sm:text-[10px] lg:text-xs tracking-[0.2em] uppercase mt-0.5">April</p>
          </div>
          <div className="w-px h-8 sm:h-10 lg:h-14 bg-white/20" />
          <div className="text-center">
            <p
              className="text-[var(--gold)] text-2xl sm:text-3xl lg:text-5xl font-light"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              2026
            </p>
            <p className="text-white/50 text-[9px] sm:text-[10px] lg:text-xs tracking-[0.2em] uppercase mt-0.5">Year</p>
          </div>
          <div className="w-px h-8 sm:h-10 lg:h-14 bg-white/20" />
          <div className="text-center">
            <p
              className="text-[var(--gold)] text-2xl sm:text-3xl lg:text-5xl font-light"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Gwalior
            </p>
            <p className="text-white/50 text-[9px] sm:text-[10px] lg:text-xs tracking-[0.2em] uppercase mt-0.5">City</p>
          </div>
        </div>
      </div>

      {/* Events Timeline — centered, max 800px on desktop */}
      <div className="timeline-container w-full max-w-[800px] mx-auto px-5 sm:px-8 lg:px-6 relative">
        {/* Vertical line — left on mobile/tablet, center on lg */}
        <div className="timeline-line absolute left-5 sm:left-8 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-px bg-[var(--gold)]/30" />

        <div className="space-y-10 sm:space-y-12 lg:space-y-14">
          {events.map((event, i) => (
            <div
              key={i}
              className={`event-card relative flex items-start lg:items-center gap-4 sm:gap-5 lg:gap-10 lg:flex-row ${
                i % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Dot — mobile/tablet */}
              <div className="w-3 h-3 lg:hidden rounded-full bg-[var(--gold)] border-2 border-[var(--black-deep)] shrink-0 mt-1 relative z-10" />

              {/* Content */}
              <div className={`flex-1 ${i % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}>
                <p
                  className="text-[var(--gold)] text-[11px] sm:text-xs lg:text-sm tracking-[0.2em] uppercase mb-1"
                  style={{ fontFamily: "var(--font-cormorant-garamond)" }}
                >
                  {event.time}
                </p>
                <h4
                  className="text-white text-xl sm:text-2xl lg:text-3xl font-light mb-1 lg:mb-2"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {event.name}
                </h4>
                <p
                  className="text-white/50 text-[13px] sm:text-sm lg:text-base leading-relaxed"
                  style={{ fontFamily: "var(--font-cormorant-garamond)" }}
                >
                  {event.description}
                </p>
              </div>

              {/* Center dot — desktop only */}
              <div className="hidden lg:flex w-4 h-4 rounded-full bg-[var(--gold)] border-2 border-[var(--black-deep)] z-10 shrink-0" />

              {/* Spacer — desktop only */}
              <div className="flex-1 hidden lg:block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
