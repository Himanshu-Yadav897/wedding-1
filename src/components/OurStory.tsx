"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const storyImages = [
  { src: "/S&A/DSC05121.JPG", alt: "The first glance" },
  { src: "/S&A/DSC03152.JPG", alt: "Getting closer" },
  { src: "/S&A/DSC05108.JPG", alt: "Pure happiness" },
  { src: "/S&A/DSC03186.JPG", alt: "Together forever" },
];

const storyTexts = [
  {
    title: "The Beginning",
    text: "Some love stories begin with a grand gesture. Ours began with a simple smile — a moment so quiet, yet so unforgettable, that it changed everything.",
  },
  {
    title: "The Journey",
    text: "Through countless conversations, shared dreams, and stolen glances, two hearts discovered they spoke the same language — love.",
  },
  {
    title: "The Promise",
    text: "In every laugh, every quiet moment, and every adventure together, we found a love worth celebrating — a love that feels like home.",
  },
  {
    title: "Forever",
    text: "And now, surrounded by the people we cherish most, we begin the most beautiful chapter of our story — together, always.",
  },
];

export default function OurStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const isMobile = window.innerWidth < 768;
      const items = gsap.utils.toArray<HTMLElement>(".story-item");

      items.forEach((item) => {
        const img = item.querySelector(".story-img");
        const text = item.querySelector(".story-text");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: isMobile ? "top 90%" : "top 80%",
            toggleActions: "play none none none",
          },
        });

        tl.from(img, {
          clipPath: "inset(0 0 100% 0)",
          duration: isMobile ? 0.8 : 1.2,
          ease: "power3.inOut",
        }).from(
          text,
          { y: isMobile ? 25 : 50, opacity: 0, duration: isMobile ? 0.5 : 0.8, ease: "power3.out" },
          "-=0.4"
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 lg:py-40 bg-[var(--black-deep)]">
      {/* Section title */}
      <div className="section-container text-center mb-12 sm:mb-16 lg:mb-28">
        <p
          className="text-[var(--gold)] tracking-[0.3em] uppercase text-[10px] sm:text-xs lg:text-sm mb-3"
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
        >
          Our Love Story
        </p>
        <h2
          className="text-white text-3xl sm:text-4xl lg:text-6xl font-light"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Written in the Stars
        </h2>
      </div>

      {/* Story items */}
      <div className="section-container space-y-20 sm:space-y-24 lg:space-y-32">
        {storyImages.map((img, i) => (
          <div
            key={i}
            className={`story-item flex flex-col ${
              i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } items-center gap-8 sm:gap-10 lg:gap-14`}
          >
            {/* Image — fixed 420px width on desktop */}
            <div className="story-img relative w-[90%] mx-auto sm:w-[80%] lg:w-[420px] lg:mx-0 lg:shrink-0 aspect-[4/5] overflow-hidden rounded-xl sm:rounded-lg lg:rounded-sm">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 420px"
              />
            </div>

            {/* Text */}
            <div
              className={`story-text flex-1 text-center px-6 sm:px-10 lg:px-0 ${
                i % 2 === 0 ? "lg:text-left" : "lg:text-right"
              }`}
            >
              <p
                className="text-[var(--gold)] tracking-[0.2em] uppercase text-[10px] sm:text-xs mb-2"
                style={{ fontFamily: "var(--font-cormorant-garamond)" }}
              >
                Chapter {i + 1}
              </p>
              <h3
                className="text-white text-2xl sm:text-3xl lg:text-4xl font-light mb-3 lg:mb-4"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {storyTexts[i].title}
              </h3>
              <p
                className="text-white/60 text-[15px] sm:text-base lg:text-lg leading-relaxed max-w-md mx-auto lg:mx-0"
                style={{ fontFamily: "var(--font-cormorant-garamond)" }}
              >
                {storyTexts[i].text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
