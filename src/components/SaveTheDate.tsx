"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

export default function SaveTheDate() {
  const sectionRef = useRef<HTMLElement>(null);
  const weddingDate = new Date("2026-04-07T19:30:00+05:30");
  const { days, hours, minutes, seconds } = useCountdown(weddingDate);

  useGSAP(
    () => {
      const isMobile = window.innerWidth < 768;

      gsap.from(".countdown-item", {
        y: isMobile ? 20 : 40, opacity: 0, duration: isMobile ? 0.5 : 0.8, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".countdown-grid", start: isMobile ? "top 90%" : "top 80%" },
      });

      gsap.from(".save-title", {
        y: isMobile ? 30 : 60, opacity: 0, duration: isMobile ? 0.6 : 1, ease: "power3.out",
        scrollTrigger: { trigger: ".save-title", start: isMobile ? "top 90%" : "top 85%" },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative min-h-screen-safe flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/S&A/DSC05188.JPG"
          alt="Background"
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={80}
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      {/* Content — centered, max-width constrained */}
      <div className="relative z-10 text-center px-5 sm:px-8 py-16 w-full max-w-[800px] mx-auto safe-top safe-bottom">
        <p
          className="text-[var(--gold-light)] tracking-[0.25em] uppercase text-[10px] sm:text-xs lg:text-sm mb-4 sm:mb-5 lg:mb-6"
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
        >
          Save the Date
        </p>

        <h2
          className="save-title text-white text-[10vw] sm:text-[7vw] lg:text-[64px] xl:text-[72px] font-light mb-3 lg:mb-4"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          April 7, 2026
        </h2>

        <p
          className="text-white/60 text-[15px] sm:text-base lg:text-lg mb-10 sm:mb-12 lg:mb-14 max-w-[480px] mx-auto"
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
        >
          The countdown to forever has begun
        </p>

        {/* Countdown — always 4 cols, constrained width */}
        <div className="countdown-grid grid grid-cols-4 gap-3 sm:gap-6 lg:gap-8 max-w-xs sm:max-w-sm lg:max-w-[520px] mx-auto mb-10 sm:mb-12 lg:mb-14">
          {[
            { value: days, label: "Days", labelFull: "Days" },
            { value: hours, label: "Hours", labelFull: "Hours" },
            { value: minutes, label: "Min", labelFull: "Minutes" },
            { value: seconds, label: "Sec", labelFull: "Seconds" },
          ].map((item) => (
            <div key={item.labelFull} className="countdown-item text-center">
              <p
                className="text-white text-3xl sm:text-4xl lg:text-6xl font-light"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {String(item.value).padStart(2, "0")}
              </p>
              <p
                className="text-[var(--gold-light)] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[9px] sm:text-[10px] lg:text-xs mt-1"
                style={{ fontFamily: "var(--font-cormorant-garamond)" }}
              >
                <span className="sm:hidden">{item.label}</span>
                <span className="hidden sm:inline">{item.labelFull}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Honoured message */}
        <div className="ornament mb-6 sm:mb-7 lg:mb-8">
          <span
            className="text-[var(--gold-light)] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[11px] sm:text-xs lg:text-sm"
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          >
            We would be honoured by your presence
          </span>
        </div>

        {/* CTA */}
        <a
          href="https://maps.google.com/?q=Taj+Usha+Kiran+Palace+Gwalior"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center border border-[var(--gold)] text-[var(--gold-light)] px-8 sm:px-9 lg:px-10 py-4 tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[11px] sm:text-xs lg:text-sm hover:bg-[var(--gold)] hover:text-[var(--black-deep)] transition-all duration-500 active:scale-95"
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
        >
          View Venue on Map
        </a>
      </div>
    </section>
  );
}
