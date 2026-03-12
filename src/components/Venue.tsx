"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    name: "Pushp Bahaar ",
    time: "11:00 AM - 18th April 2026",
    description:
      "In this sacred ritual, haldi is applied to the bride and groom, blessing them with purity, prosperity, and a radiant beginning to their new journey.",
  },
  {
    name: "Ring in the Bling",
    time: "7:00 PM - 18th April 2026",
    description:
      "The couple exchanges rings as a promise of togetherness, followed by an evening of music, dance, and celebration with family and friends.",
  },
  {
    name: "Shahi Yatra",
    time: "5:00 PM - 19th April 2026",
    description:
      "The groom’s grand royal procession as he arrives with joy, music, and celebration to seek his bride.",
  },
  {
    name: "Mangal Sanskar",
    time: "8:00 PM - 19th April 2026",
    description:
      "The couple exchanges garlands in acceptance of one another and takes the sacred Saat Phere around the holy fire, solemnizing their lifelong union.",
  },
];

export default function Venue() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const isMobile = window.innerWidth < 768;

      gsap.from(".venue-info", {
        y: isMobile ? 30 : 60,
        opacity: 0,
        duration: isMobile ? 0.6 : 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".venue-info",
          start: isMobile ? "top 90%" : "top 80%",
        },
      });

      const items = gsap.utils.toArray<HTMLElement>(".event-card");
      items.forEach((item, i) => {
        gsap.from(item, {
          y: isMobile ? 30 : 60,
          opacity: 0,
          duration: isMobile ? 0.5 : 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: isMobile ? "top 92%" : "top 85%",
          },
        });
      });

      gsap.from(".timeline-line", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: { trigger: ".timeline-container", start: "top 70%" },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="pt-6 pb-24 sm:pt-10 sm:pb-32 lg:pt-14 lg:pb-44 bg-[var(--black-deep)] relative"
    >
      {/* Section title */}
      <div className="section-container text-center mb-14 sm:mb-18 lg:mb-24">
        <p
          className="text-[var(--gold)] tracking-[0.3em] uppercase text-[10px] sm:text-xs lg:text-sm mb-5 sm:mb-6 lg:mb-8"
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
        >
          The Celebration
        </p>
        <h2
          className="text-white text-3xl sm:text-4xl lg:text-6xl font-light"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Where & When
        </h2>
      </div>

      {/* Venue Info — constrained center */}
      <div className="venue-info w-full max-w-[900px] mx-auto text-center mb-16 sm:mb-24 lg:mb-32 px-5 sm:px-8">
        {/* Venue image — fixed 16:9 on desktop, portrait on mobile */}
        <div className="relative w-full aspect-[3/4] sm:aspect-[4/3] lg:aspect-[16/9] rounded-xl sm:rounded-lg lg:rounded-sm overflow-hidden mb-12 sm:mb-14 lg:mb-16">
          <Image
            src="/taj hotel.avif"
            alt="Taj Usha Kiran Palace"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 900px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 lg:bottom-6 lg:left-6 text-left">
            <h3
              className="text-white text-xl sm:text-2xl lg:text-3xl font-light"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Taj Usha Kiran Palace
            </h3>
            <p
              className="text-white/70 text-xs sm:text-sm lg:text-base mt-0.5"
              style={{ fontFamily: "var(--font-cormorant-garamond)" }}
            >
              Gwalior, MP
            </p>
          </div>
        </div>

        <p
          className="text-white/60 text-[15px] sm:text-base lg:text-lg leading-relaxed max-w-[600px] mx-auto"
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
        >
          Built in 1880 by Maharaja Jayajirao Scindia as a palace for royal
          guests, Taj Usha Kiran Palace, surrounded by nine acres of regal
          gardens, now hosts the beginning of Shreyansh & Ankita’s royal journey
          together.
        </p>

        {/* Date row */}
        <div className="mt-10 sm:mt-12 lg:mt-14 flex flex-row items-center justify-center gap-4 sm:gap-5 lg:gap-8">
          <div className="text-center">
            <p
              className="text-[var(--gold)] text-2xl sm:text-3xl lg:text-5xl font-light"
              style={{ fontFamily: "var(--font-kavivanar)" }}
            >
              18–19
            </p>
            <p className="text-white/50 text-[9px] sm:text-[10px] lg:text-xs tracking-[0.2em] uppercase mt-0.5">
              April
            </p>
          </div>
          <div className="w-px h-8 sm:h-10 lg:h-14 bg-white/20" />
          <div className="text-center">
            <p
              className="text-[var(--gold)] text-2xl sm:text-3xl lg:text-5xl font-light"
              style={{ fontFamily: "var(--font-kavivanar)" }}
            >
              2026
            </p>
            <p className="text-white/50 text-[9px] sm:text-[10px] lg:text-xs tracking-[0.2em] uppercase mt-0.5">
              Year
            </p>
          </div>
          <div className="w-px h-8 sm:h-10 lg:h-14 bg-white/20" />
          <div className="text-center">
            <p
              className="text-[var(--gold)] text-2xl sm:text-3xl lg:text-5xl font-light"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Gwalior
            </p>
            <p className="text-white/50 text-[9px] sm:text-[10px] lg:text-xs tracking-[0.2em] uppercase mt-0.5">
              City
            </p>
          </div>
        </div>
      </div>

      {/* Events Timeline — centered, max 800px on desktop */}
      <div className="timeline-container w-full max-w-[800px] mx-auto px-5 sm:px-8 lg:px-6 relative">
        {/* Vertical line — left on mobile/tablet, center on lg */}
        <div className="timeline-line absolute left-5 sm:left-8 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-px bg-[var(--gold)]/30" />

        <div className="space-y-14 sm:space-y-16 lg:space-y-20">
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
              <div
                className={`flex-1 ${i % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}
              >
                <p
                  className="text-[var(--gold)] text-sm sm:text-base lg:text-sm tracking-[0.2em] uppercase mb-2 sm:mb-3"
                  style={{ fontFamily: "var(--font-kavivanar)" }}
                >
                  {event.time}
                </p>
                <h4
                  className="text-white text-3xl sm:text-2xl lg:text-5xl font-light mb-2 sm:mb-3 lg:mb-4"
                  style={{ fontFamily: "var(--font-cookie)" }}
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
