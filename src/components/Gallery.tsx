"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: "/S&A/DSC05181.JPG", tall: true },
  { src: "/S&A/DSC03198.JPG", tall: false },
  { src: "/S&A/DSC01322.JPG", tall: false },
  { src: "/S&A/DSC05156.JPG", tall: false },
  { src: "/S&A/DSC05194.JPG", tall: true },
  { src: "/S&A/DSC01287.JPG", tall: false },
  { src: "/S&A/DSC03184.JPG", tall: false },
  { src: "/S&A/DSC05145.JPG", tall: false },
  { src: "/S&A/DSC01335.JPG", tall: true },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const isMobile = window.innerWidth < 768;
      const images = gsap.utils.toArray<HTMLElement>(".gallery-item");

      images.forEach((img, i) => {
        gsap.from(img, {
          y: isMobile ? 40 : 60,
          opacity: 0,
          duration: isMobile ? 0.6 : 0.8,
          delay: isMobile ? 0 : i * 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: img,
            start: isMobile ? "top 92%" : "top 88%",
            toggleActions: "play none none none",
          },
        });
      });

      // Parallax on desktop only
      if (!isMobile) {
        images.forEach((img) => {
          const inner = img.querySelector("img");
          if (inner) {
            gsap.to(inner, {
              yPercent: -8,
              ease: "none",
              scrollTrigger: {
                trigger: img,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });
          }
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 lg:py-40 bg-[var(--cream)]">
      {/* Section title */}
      <div className="section-container text-center mb-10 sm:mb-14 lg:mb-20">
        <p
          className="text-[var(--gold)] tracking-[0.3em] uppercase text-[10px] sm:text-xs lg:text-sm mb-3"
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
        >
          Moments
        </p>
        <h2
          className="text-[var(--black)] text-3xl sm:text-4xl lg:text-6xl font-light"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          A Royal Affair
        </h2>
      </div>

      {/* Grid gallery — clean, controlled layout */}
      <div className="w-full max-w-[1100px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`gallery-item overflow-hidden rounded-sm ${
                img.tall ? "row-span-2" : ""
              }`}
            >
              <div className="relative overflow-hidden group cursor-pointer w-full h-full">
                <div className={`relative w-full ${img.tall ? "aspect-[3/5]" : "aspect-[4/5]"}`}>
                  <Image
                    src={img.src}
                    alt={`Gallery photo ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 sm:group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 350px"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 sm:group-hover:bg-black/15 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
