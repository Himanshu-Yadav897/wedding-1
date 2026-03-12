"use client";

import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

/* ── Event data ─────────────────────────────────────────── */
const wardrobeEvents = [
  {
    date: "18 April · Pushp Bahaar",
    theme: "Bloom & Glow",
    tagline: "Floral Pastels · Sunshine vibes",
    image: "/Wardrobe/haldi.png",
    inspiration:
      "Fresh, playful and full of floral energy — think garden party meets haldi celebration.",
    men: "Pastel kurtas with white churidar / pyjama or Nehru jacket",
    women: "Floral lehengas, pastel shararas, breezy sarees or anarkalis",
    tip: "Fresh flower jewellery, minimal makeup & comfy footwear for dancing in the sunshine",
    palette: [
      { name: "Butter Yellow", hex: "#F6D860" },
      { name: "Peach", hex: "#F4B7A6" },
      { name: "Mint Green", hex: "#CFE8D5" },
      { name: "Powder Pink", hex: "#F7D1D9" },
      { name: "Lavender", hex: "#DCD6F7" },
    ],
    bgTint: "#fef9e2",
    glowColor: "#F6D860",
  },
  {
    date: "18 April · Ring in the Bling",
    theme: "Filmy Glam",
    tagline: "Bollywood sparkle · Red carpet moments",
    image: "/Wardrobe/flimygyaan.png",
    inspiration:
      "Channel your inner Bollywood star — dramatic, glamorous and camera-ready.",
    men: "Tuxedos, velvet bandhgalas, or sharp suits",
    women:
      "Sequined gowns, cocktail sarees, indo-western lehengas or glam dresses",
    tip: "Statement heels, bold makeup & dazzling jewellery — tonight is all about glamour",
    palette: [
      { name: "Midnight Blue", hex: "#0B1F3B" },
      { name: "Emerald", hex: "#0F6B4F" },
      { name: "Champagne Gold", hex: "#D4AF7F" },
      { name: "Wine", hex: "#6A1B2E" },
      { name: "Jet Black", hex: "#111111" },
    ],
    bgTint: "#e2e5ed",
    glowColor: "#0B1F3B",
  },
  {
    date: "19 April · Shahi Yatra\nMangal Sanskar",
    theme: "Rajwada Royal",
    tagline: "Timeless heritage · Royal grandeur",
    image: "/Wardrobe/Rajwada royal.png",
    inspiration:
      "Celebrate regal traditions with rich fabrics, intricate embroidery and royal colours.",
    men: "Sherwanis, bandhgalas, safa or pagdi with mojris",
    women:
      "Bridal lehengas, banarasi sarees, heavy anarkalis or heritage silk ensembles",
    tip: "Kundan jewellery, embroidered dupattas & classic Indian silhouettes for the royal spirit",
    palette: [
      { name: "Royal Red", hex: "#8B0000" },
      { name: "Maroon", hex: "#5C0A0A" },
      { name: "Ivory", hex: "#F5F0E6" },
      { name: "Temple Gold", hex: "#C6A55C" },
      { name: "Emerald", hex: "#046A38" },
    ],
    bgTint: "#f2e2de",
    glowColor: "#8B0000",
  },
];

/* ── Component ──────────────────────────────────────────── */
export default function Wardrobe() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(0);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const [active, setActive] = useState(0);

  /* ── Entrance animations ── */
  useGSAP(
    () => {
      const isMobile = window.innerWidth < 768;

      gsap.from(".wardrobe-heading", {
        y: isMobile ? 30 : 60,
        opacity: 0,
        duration: isMobile ? 0.6 : 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".wardrobe-heading",
          start: isMobile ? "top 90%" : "top 80%",
        },
      });

      gsap.from(".wardrobe-carousel", {
        y: isMobile ? 40 : 80,
        opacity: 0,
        duration: isMobile ? 0.8 : 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".wardrobe-carousel",
          start: isMobile ? "top 88%" : "top 78%",
        },
      });
    },
    { scope: sectionRef },
  );

  /* ── Carousel: go to slide ── */
  const goTo = useCallback((index: number) => {
    if (isAnimatingRef.current) return;
    const clamped = Math.max(0, Math.min(wardrobeEvents.length - 1, index));
    if (clamped === currentRef.current) return;

    isAnimatingRef.current = true;
    currentRef.current = clamped;
    setActive(clamped);

    const w = containerRef.current?.offsetWidth ?? 0;
    const ev = wardrobeEvents[clamped];

    gsap.to(trackRef.current, {
      x: -clamped * w,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

    /* Atmosphere shift */
    gsap.to(bgRef.current, {
      backgroundColor: ev.bgTint,
      duration: 0.8,
      ease: "power2.out",
    });
    gsap.to(glowRef.current, {
      backgroundColor: ev.glowColor,
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  /* ── Touch handlers (horizontal swipe) ── */
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const deltaX = touchStartXRef.current - e.changedTouches[0].clientX;
      const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;
      if (Math.abs(deltaX) < 50 || Math.abs(deltaY) > Math.abs(deltaX))
        return;

      if (deltaX > 0) goTo(currentRef.current + 1);
      else goTo(currentRef.current - 1);
    },
    [goTo],
  );

  return (
    <section
      ref={sectionRef}
      className="relative pt-6 pb-24 sm:pt-10 sm:pb-32 lg:pt-14 lg:pb-44 overflow-hidden"
    >
      {/* Atmospheric background — shifts color per event */}
      <div
        ref={bgRef}
        className="absolute inset-0 transition-none"
        style={{ backgroundColor: wardrobeEvents[0].bgTint }}
      />

      {/* ── Section title ── */}
      <div className="wardrobe-heading section-container text-center mb-10 sm:mb-16 lg:mb-20 relative z-10">
        <p
          className="text-[var(--gold)] tracking-[0.3em] uppercase text-[10px] sm:text-xs lg:text-sm mb-5 sm:mb-6 lg:mb-8 font-bold"
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
        >
          Dress Code
        </p>
        <h2
          className="text-[var(--black)] text-3xl sm:text-4xl lg:text-6xl font-light"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          THE ROYAL WARDROBE
        </h2>
      </div>

      {/* ── Carousel ── */}
      <div className="wardrobe-carousel relative w-full max-w-[400px] sm:max-w-[480px] lg:max-w-[540px] mx-auto px-5 sm:px-0 z-10">
        {/* Ambient glow orb behind the card */}
        <div
          ref={glowRef}
          className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 w-[140%] aspect-square rounded-full blur-[100px] opacity-20 pointer-events-none -z-10"
          style={{ backgroundColor: wardrobeEvents[0].glowColor }}
        />

        {/* Overflow container */}
        <div ref={containerRef} className="overflow-hidden rounded-2xl">
          <div
            ref={trackRef}
            className="flex"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {wardrobeEvents.map((event, i) => (
              <div key={event.theme} className="min-w-full">
                {/* ── Card ── */}
                <div
                  className="mx-1 sm:mx-0 bg-[var(--black-deep)] border border-[var(--gold)]/20 rounded-2xl overflow-hidden"
                  style={{
                    boxShadow:
                      "0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(212,168,83,0.08)",
                  }}
                >
                  {/* Image */}
                  <div className="relative w-full aspect-square">
                    <Image
                      src={event.image}
                      alt={event.theme}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 90vw, 540px"
                      priority={i === 0}
                    />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--black-deep)] via-[var(--black-deep)]/60 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 -mt-6 relative z-10">
                    {/* Date */}
                    <p
                      className="text-[var(--gold)] tracking-[0.2em] uppercase text-[11px] sm:text-sm lg:text-base mb-1 font-bold whitespace-pre-line"
                      style={{ fontFamily: "var(--font-kavivanar)" }}
                    >
                      {event.date}
                    </p>

                    {/* Theme name + tagline */}
                    <h3
                      className="text-white text-2xl sm:text-3xl lg:text-4xl"
                      style={{ fontFamily: "var(--font-script)" }}
                    >
                      {event.theme}
                    </h3>
                    <p
                      className="text-white/70 text-[10px] sm:text-[11px] tracking-[0.15em] mb-4"
                      style={{ fontFamily: "var(--font-cormorant-garamond)" }}
                    >
                      {event.tagline}
                    </p>

                    {/* Color palette */}
                    <div className="flex items-center gap-2.5 sm:gap-3 mb-4">
                      {event.palette.map((color) => (
                        <div
                          key={color.hex}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>

                    {/* Men & Women */}
                    <div className="space-y-2">
                      <p
                        className="text-white/80 text-[11px] sm:text-xs leading-relaxed"
                        style={{ fontFamily: "var(--font-cormorant-garamond)" }}
                      >
                        <span className="text-[var(--gold-light)] tracking-[0.15em] uppercase text-[8px] sm:text-[9px]">
                          Men{" "}
                        </span>
                        {event.men}
                      </p>
                      <p
                        className="text-white/80 text-[11px] sm:text-xs leading-relaxed"
                        style={{ fontFamily: "var(--font-cormorant-garamond)" }}
                      >
                        <span className="text-[var(--gold-light)] tracking-[0.15em] uppercase text-[8px] sm:text-[9px]">
                          Women{" "}
                        </span>
                        {event.women}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex items-center justify-center gap-3 mt-6 sm:mt-8">
          {wardrobeEvents.map((ev, i) => (
            <button
              key={ev.theme}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                active === i ? "w-6" : "bg-[var(--text-muted)]/40 w-2"
              }`}
              style={
                active === i
                  ? { backgroundColor: wardrobeEvents[active].palette[0].hex }
                  : undefined
              }
              aria-label={`Go to ${ev.theme}`}
            />
          ))}
        </div>

        {/* Event labels under dots */}
        <p
          className="text-center text-[var(--text-muted)] text-[10px] sm:text-[11px] tracking-[0.15em] uppercase mt-2"
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
        >
          {wardrobeEvents[active].theme}
        </p>

        {/* Desktop arrow buttons */}
        <button
          onClick={() => goTo(currentRef.current - 1)}
          className={`hidden sm:flex absolute top-[45%] -translate-y-1/2 -left-16 lg:-left-20 w-12 h-12 items-center justify-center rounded-full bg-[var(--black-deep)] border-2 border-[var(--gold)] text-[var(--gold)] shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:bg-[var(--gold)] hover:text-[var(--black-deep)] transition-all duration-300 ${
            active === 0 ? "opacity-30 pointer-events-none" : ""
          }`}
          aria-label="Previous event"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={() => goTo(currentRef.current + 1)}
          className={`hidden sm:flex absolute top-[45%] -translate-y-1/2 -right-16 lg:-right-20 w-12 h-12 items-center justify-center rounded-full bg-[var(--black-deep)] border-2 border-[var(--gold)] text-[var(--gold)] shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:bg-[var(--gold)] hover:text-[var(--black-deep)] transition-all duration-300 ${
            active === wardrobeEvents.length - 1
              ? "opacity-30 pointer-events-none"
              : ""
          }`}
          aria-label="Next event"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Mobile swipe hint */}
        <p
          className="sm:hidden text-center text-[var(--text-muted)] text-sm tracking-[0.2em] uppercase mt-3 animate-pulse font-bold"
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
        >
          Swipe to explore
        </p>
      </div>
    </section>
  );
}
