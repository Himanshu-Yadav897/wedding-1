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
    title: "The Beginning",
    text: "Some meetings may appear coincidental but it is destiny quietly bringing two souls together. When we first met, little did we know that this simple meeting would become the beginning of a beautiful story, one that would change our lives forever.",
  },
  {
    title: "The Journey",
    text: "What started with long conversations soon turned into shared dreams. With every passing day, our bond grew deeper. Through moments both big and small, we discovered that love isn’t just a feeling in time, it’s choosing each other, every single day. And somewhere along the way, we both knew this was forever.",
  },
  {
    title: "The Surprise",
    text: "What Ankita thought was simply a beautiful birthday getaway soon turned into one of the most unforgettable chapters of her life. Amidst the breathtaking beauty of Bali, Shreyansh had quietly planned a surprise that would change their story forever. Little did she know that this trip would become the moment when their love story turned truly magical.",
  },
  {
    title: "The Promise",
    text: "A moment filled with love, surprise, and the promise of a lifetime. As her blindfold withdrew and he went down on one knee, time seemed to stand still. And in that beautiful moment, with a heartfelt “yes”, their forever officially began.",
  },
  {
    title: "Forever Begins",
    text: "Surrounded by the love of family, heartfelt blessings, and endless joy, we came together to celebrate the beginning of our forever. The Roka was more than a ceremony, it was the coming together of two hearts and two beautiful families. With love, laughter, and blessings all around, our journey toward forever truly began.",
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
      className="pt-6 pb-24 sm:pt-10 sm:pb-32 lg:pt-14 lg:pb-44 bg-[var(--black-deep)]"
    >
      {/* Section title */}
      <div className="section-container text-center mb-8 sm:mb-20 lg:mb-28">
        <p
          className="text-[var(--gold)] tracking-[0.3em] uppercase text-[10px] sm:text-xs lg:text-sm mb-5 sm:mb-6 lg:mb-8"
          style={{ fontFamily: "var(--font-kavivanar)" }}
        >
          Our Love Story
        </p>
        <h2
          className="text-white text-3xl sm:text-4xl lg:text-6xl font-light"
          style={{ fontFamily: "var(--font-cookie)" }}
        >
          Written in the Stars
          <br />
          <span className="font-bold" style={{ fontFamily: "serif" }}>
            ✦ विधि का विधान ✦
          </span>
        </h2>
      </div>

      {/* Story items */}
      <div className="section-container space-y-12 sm:space-y-28 lg:space-y-36">
        {storyImages.map((img, i) => (
          <div
            key={i}
            className={`story-item flex flex-col ${
              i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } items-center gap-4 lg:gap-16`}
          >
            {/* Chapter label — mobile: first, desktop: inside text block */}
            <p
              className={`order-1 lg:hidden text-center text-[var(--gold)] tracking-[0.2em] uppercase text-sm sm:text-base lg:text-sm font-bold`}
              style={{ fontFamily: "var(--font-kavivanar)" }}
            >
              Chapter {i + 1}
            </p>

            {/* Image — mobile: second */}
            <div className="story-img relative w-[90%] mx-auto sm:w-[80%] lg:w-[420px] lg:mx-0 lg:shrink-0 aspect-[4/5] overflow-hidden rounded-xl sm:rounded-lg lg:rounded-sm order-2 lg:order-none">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 420px"
              />
            </div>

            {/* Text — mobile: third (heading + description only), desktop: full block */}
            <div
              className={`story-text flex-1 text-center px-6 sm:px-10 lg:px-0 order-3 lg:order-none ${
                i % 2 === 0 ? "lg:text-left" : "lg:text-right"
              }`}
            >
              <p
                className="hidden lg:block text-[var(--gold)] tracking-[0.2em] uppercase text-sm sm:text-base lg:text-sm mb-4 sm:mb-5 lg:mb-6 font-bold"
                style={{ fontFamily: "var(--font-kavivanar)" }}
              >
                Chapter {i + 1}
              </p>
              <h3
                className="text-white text-xl sm:text-2xl lg:text-3xl mb-5 sm:mb-6 lg:mb-8"
                style={{ fontFamily: "var(--font-cinzel-decorative)" }}
              >
                {storyTexts[i].title}
              </h3>
              <p
                className={`text-white/60 text-[15px] sm:text-base lg:text-lg leading-relaxed max-w-md mx-auto ${
                  i % 2 === 0 ? "lg:mr-auto lg:ml-0" : "lg:ml-auto lg:mr-0"
                }`}
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
