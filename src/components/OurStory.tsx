"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const storyImages = [
  {
    src: "/Wedding Invitaion Gallery/Udaipur Ansh.jpg",
    alt: "The surprise begins",
  },
  {
    src: "/Wedding Invitaion Gallery/IMG_0796.JPG",
    alt: "Walking together",
  },
  {
    src: "/Wedding Invitaion Gallery/IMG_1306.jpg",
    alt: "The proposal",
  },
  { src: "/Wedding Invitaion Gallery/IMG_1312.jpg", alt: "Together forever" },
  { src: "/Wedding Invitaion Gallery/IMG_1820.JPG", alt: "Together forever" },
];

const storyTexts = [
  {
    title: "The Beginning — When We Met",
    text: "Some meetings are just coincidences… But some meetings are destiny gently introducing two souls. The day we met, we didn’t know it yet but our story had already begun.",
  },
  {
    title: "The Journey — Dating Phase",
    text: "From long conversations to shared dreams, our bond grew stronger with every passing day. Through laughter, adventures, and countless memories, we discovered that love isn’t just a feeling, it’s choosing each other every day. And somewhere along the journey, we knew this was forever.",
  },
  {
    title: "The Surprise — Bali Trip",
    text: "What Ankita thought was just a beautiful birthday trip turned into the most unforgettable chapter of her story. Amidst the breathtaking beauty of Bali, he had secretly planned a surprise that would change her life forever. Little did she know that this trip would become the moment when their love story truly turned magical.",
  },
  {
    title: "The Promise — The Proposal",
    text: "A moment filled with love, surprise, and a promise for a lifetime. When he went down on one knee, time seemed to pause. And with one “yes,” our forever officially began.",
  },
  {
    title: "Forever Begins — The Roka",
    text: "Surrounded by our families, blessings, and endless happiness, we came together to celebrate the beginning of our forever. The Roka marked not just the union of two hearts, but the coming together of two beautiful families. And with love, laughter, and blessings all around — our forever officially began...",
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
          {
            y: isMobile ? 25 : 50,
            opacity: 0,
            duration: isMobile ? 0.5 : 0.8,
            ease: "power3.out",
          },
          "-=0.4",
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="py-24 sm:py-32 lg:py-44 bg-[var(--black-deep)]"
    >
      {/* Section title */}
      <div className="section-container text-center mb-14 sm:mb-20 lg:mb-28">
        <p
          className="text-[var(--gold)] tracking-[0.3em] uppercase text-[10px] sm:text-xs lg:text-sm mb-5 sm:mb-6 lg:mb-8"
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
        >
          Our Love Story
        </p>
        <h2
          className="text-white text-3xl sm:text-4xl lg:text-6xl font-light"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Written in the Stars
          <br />
          <br />{" "}
          <span className="font-bold" style={{ fontFamily: "serif" }}>✦ विधि का विधान ✦</span>
        </h2>
      </div>

      {/* Story items */}
      <div className="section-container space-y-24 sm:space-y-28 lg:space-y-36">
        {storyImages.map((img, i) => (
          <div
            key={i}
            className={`story-item flex flex-col ${
              i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } items-center gap-10 sm:gap-14 lg:gap-16`}
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
                className="text-[var(--gold)] tracking-[0.2em] uppercase text-[10px] sm:text-xs mb-4 sm:mb-5 lg:mb-6"
                style={{ fontFamily: "var(--font-cormorant-garamond)" }}
              >
                Chapter {i + 1}
              </p>
              <h3
                className="text-white text-2xl sm:text-3xl lg:text-4xl font-light mb-5 sm:mb-6 lg:mb-8"
                style={{ fontFamily: "var(--font-playfair)" }}
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
