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
        clipPath: "inset(100% 0 0 0)",
        duration: dur,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: ".groom-block",
          start,
          toggleActions: "play none none none",
        },
      });
      gsap.from(".groom-text", {
        y: isMobile ? 30 : 60,
        opacity: 0,
        duration: textDur,
        ease: "power3.out",
        scrollTrigger: { trigger: ".groom-block", start: textStart },
      });
      gsap.from(".bride-img", {
        clipPath: "inset(100% 0 0 0)",
        duration: dur,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: ".bride-block",
          start,
          toggleActions: "play none none none",
        },
      });
      gsap.from(".bride-text", {
        y: isMobile ? 30 : 60,
        opacity: 0,
        duration: textDur,
        ease: "power3.out",
        scrollTrigger: { trigger: ".bride-block", start: textStart },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="pt-6 pb-24 sm:pt-10 sm:pb-32 lg:pt-14 lg:pb-44 bg-[var(--cream)]"
    >
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
          style={{ fontFamily: "var(--font-cookie)" }}
        >
          Two Souls, One Sacred Bond
        </h2>
      </div>

      {/* Groom */}
      <div className="groom-block section-container flex flex-col lg:flex-row items-center gap-10 sm:gap-14 lg:gap-16 mb-24 sm:mb-28 lg:mb-36">
        <div className="groom-img relative w-[90%] mx-auto sm:w-[80%] lg:w-[480px] lg:mx-0 lg:shrink-0 aspect-[3/4] overflow-hidden rounded-xl sm:rounded-lg lg:rounded-sm">
          <Image
            src="/Wedding Invitaion Gallery/IMG_1682.JPG"
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
            className="text-4xl sm:text-5xl lg:text-6xl mb-6 sm:mb-8 lg:mb-10"
            style={{ fontFamily: "var(--font-script)" }}
          >
            Shreyansh
          </h3>
          <p
            className="text-[var(--text-muted)] text-base sm:text-lg lg:text-xl leading-relaxed max-w-md mx-auto lg:mx-0"
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          >
            "He has a smile that instantly feels like home. He believes in a
            life guided by faith and purpose, and that conviction shapes the way
            he lives and loves. To me, he is not just a partner, but my best
            friend and my safe haven."
            <br />
            <span> ~ Ankita</span>
          </p>
        </div>
      </div>

      {/* Bride */}
      <div className="bride-block section-container flex flex-col lg:flex-row-reverse items-center gap-10 sm:gap-14 lg:gap-16">
        <div className="bride-img relative w-[90%] mx-auto sm:w-[80%] lg:w-[480px] lg:mx-0 lg:shrink-0 aspect-[3/4] overflow-hidden rounded-xl sm:rounded-lg lg:rounded-sm">
          <Image
            src="/Wedding Invitaion Gallery/IMG_3361.JPG"
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
            className="text-4xl sm:text-5xl lg:text-6xl mb-6 sm:mb-8 lg:mb-10"
            style={{ fontFamily: "var(--font-script)" }}
          >
            Ankita
          </h3>
          <p
            className="text-[var(--text-muted)] text-base sm:text-lg lg:text-xl leading-relaxed max-w-md mx-auto lg:ml-auto lg:mr-0"
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          >
            "She is a woman of grace and vibrant energy. She believes that love
            and dreams grow stronger with time and togetherness, and she carries
            that belief into everything she does. To me, she is not just a
            partner, but a constant source of joy in my world."
            <br />
            <span> ~ Shreyansh</span>
          </p>
        </div>
      </div>
    </section>
  );
}
