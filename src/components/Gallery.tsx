"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLenis } from "@/context/LenisContext";

gsap.registerPlugin(ScrollTrigger);

/* ── Flip pages based on scroll progress (0→1) ─────────── */
function flipPages(
  leaves: HTMLDivElement[],
  progress: number,
  counterEl: HTMLSpanElement | null,
) {
  const total = leaves.length;
  leaves.forEach((page, i) => {
    const pageStart = i / total;
    const pageEnd = (i + 1) / total;

    let p = 0;
    if (progress >= pageEnd) p = 1;
    else if (progress > pageStart)
      p = (progress - pageStart) / (pageEnd - pageStart);

    const rotation = p * -180;
    const zIndex = rotation < -90 ? i + 1 : total * 2 - i;
    page.style.transform = `translateZ(${zIndex * 0.1}px) rotateY(${rotation}deg)`;
    page.style.zIndex = String(zIndex);
  });

  if (counterEl) {
    counterEl.textContent = `${Math.round(progress * total)} / ${total}`;
  }
}

/* ── Image data ─────────────────────────────────────────── */
const galleryImages = [
  "/Gallery/img1a.jpeg",
  "/Gallery/img2a.JPG",
  "/Gallery/img3a.JPG",
  "/Gallery/img4a.JPG",
  "/Gallery/img5a.jpg",
  "/Gallery/img6a.JPG",
  "/Gallery/img7a.JPG",
  "/Gallery/img8.JPG",
  "/Gallery/img9.JPG",
  "/Gallery/img10a.JPG",
  "/Gallery/img11a.JPG",
  "/Gallery/img12a.JPEG",
  "/Gallery/img13a.jpeg",
  "/Gallery/img14a.JPEG",
  "/Gallery/img15a.JPEG",
  "/Gallery/img16a.JPEG",
  "/Gallery/img17a.jpg",
  "/Gallery/img18a.JPEG",
  "/Gallery/img19a.JPEG",
  "/Gallery/img20a.JPEG",
  "/Gallery/img21a.JPEG",
  "/Gallery/img22a.JPG",
  "/Gallery/img23a.JPG",
  "/Gallery/img24a.JPEG",
] as const;

interface BookPageData {
  front: string | null;
  back: string | null;
}

const innerPages: BookPageData[] = [];
for (let i = 0; i < galleryImages.length; i += 2) {
  innerPages.push({
    front: galleryImages[i],
    back: galleryImages[i + 1] ?? null,
  });
}

const TOTAL_LEAVES = 1 + innerPages.length + 1;
const SCROLL_PER_PAGE = 100;

/* ── Sub-components ─────────────────────────────────────── */

function FrontCover() {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-8"
      style={{
        background: "var(--black-deep)",
        border: "2px solid var(--gold)",
        borderRadius: "0 4px 4px 0",
        boxShadow: "inset 0 0 60px rgba(212, 168, 83, 0.06)",
      }}
    >
      <div
        className="book-corner book-corner--tl"
        style={{ borderColor: "rgba(212,168,83,0.4)" }}
      />
      <div
        className="book-corner book-corner--tr"
        style={{ borderColor: "rgba(212,168,83,0.4)" }}
      />
      <div
        className="book-corner book-corner--bl"
        style={{ borderColor: "rgba(212,168,83,0.4)" }}
      />
      <div
        className="book-corner book-corner--br"
        style={{ borderColor: "rgba(212,168,83,0.4)" }}
      />

      <p
        className="text-[var(--gold)] text-2xl sm:text-3xl mb-4"
        style={{ fontFamily: "serif" }}
      >
        ॐ
      </p>
      <h3
        className="text-[var(--gold)] text-2xl sm:text-3xl lg:text-4xl"
        style={{ fontFamily: "var(--font-script)" }}
      >
        Shreyansh
      </h3>
      <p
        className="text-[var(--gold-light)] text-base sm:text-lg my-1"
        style={{ fontFamily: "var(--font-script)" }}
      >
        &amp;
      </p>
      <h3
        className="text-[var(--gold)] text-2xl sm:text-3xl lg:text-4xl mb-5"
        style={{ fontFamily: "var(--font-script)" }}
      >
        Ankita
      </h3>
      <div className="ornament mb-3">
        <span
          className="text-[var(--gold-light)] opacity-50 text-[9px] tracking-[0.3em] uppercase"
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
        >
          Our Moments
        </span>
      </div>
      <p
        className="text-white/30 text-[10px] tracking-[0.2em] uppercase"
        style={{ fontFamily: "var(--font-kavivanar)" }}
      >
        April 2026
      </p>
    </div>
  );
}

function BackCover() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background: "var(--black-deep)",
        border: "2px solid rgba(212,168,83,0.3)",
        borderRadius: "4px 0 0 4px",
      }}
    >
      <div
        className="book-corner book-corner--tl"
        style={{ borderColor: "rgba(212,168,83,0.25)" }}
      />
      <div
        className="book-corner book-corner--tr"
        style={{ borderColor: "rgba(212,168,83,0.25)" }}
      />
      <div
        className="book-corner book-corner--bl"
        style={{ borderColor: "rgba(212,168,83,0.25)" }}
      />
      <div
        className="book-corner book-corner--br"
        style={{ borderColor: "rgba(212,168,83,0.25)" }}
      />
    </div>
  );
}

function DecorativeLast() {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ background: "var(--black-deep)", borderRadius: "4px 0 0 4px" }}
    >
      <p
        className="text-[var(--gold)] text-3xl sm:text-4xl mb-3"
        style={{ fontFamily: "serif" }}
      >
        ॐ
      </p>
      <p
        className="text-[var(--gold-light)] opacity-40 text-[10px] tracking-[0.3em] uppercase"
        style={{ fontFamily: "var(--font-cormorant-garamond)" }}
      >
        शुभ विवाह
      </p>
    </div>
  );
}

function CoverBack() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ background: "var(--cream-dark)", borderRadius: "4px 0 0 4px" }}
    >
      <p
        className="text-[var(--black-deep)] text-sm sm:text-base lg:text-lg text-center leading-relaxed px-4 italic"
        style={{ fontFamily: "var(--font-cormorant-garamond)" }}
      >
        A glimpse into the chapters
        <br />
        that led us here,
        <br />
        our love, our laughter,
        <br />
        our forever.
      </p>
    </div>
  );
}

function BackCoverInner() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ background: "var(--cream-dark)", borderRadius: "0 4px 4px 0" }}
    >
      <p
        className="text-[var(--black-deep)] text-sm sm:text-base lg:text-lg text-center leading-relaxed px-4 italic"
        style={{ fontFamily: "var(--font-cormorant-garamond)" }}
      >
        This is not the end,
        <br />
        this is just the beginning
        <br />
        of our forever.
      </p>
    </div>
  );
}

/* ── Main Gallery Component ─────────────────────────────── */
export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const bookPreviewRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pageCounterRef = useRef<HTMLSpanElement>(null);
  const savedScrollYRef = useRef(0);
  const pageEls = useRef<(HTMLDivElement | null)[]>(
    new Array(TOTAL_LEAVES).fill(null),
  );
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  /* Mobile touch refs */
  const currentPageRef = useRef(0);
  const touchStartYRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const lenis = useLenis();

  /* Detect mobile once on mount */
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const getPageRefCallback = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      pageEls.current[index] = el;
    },
    [],
  );

  // ── Entrance animation ──
  useGSAP(
    () => {
      if (!bookPreviewRef.current) return;
      gsap.from(bookPreviewRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef },
  );

  const openBook = useCallback(() => {
    savedScrollYRef.current = window.scrollY;
    setIsFullscreen(true);
  }, []);

  const closeBook = useCallback(() => {
    scrollTriggersRef.current.forEach((st) => st.kill());
    scrollTriggersRef.current = [];
    currentPageRef.current = 0;
    isAnimatingRef.current = false;
    setIsFullscreen(false);
  }, []);

  /* ── Mobile: animate to a specific page ── */
  const goToPage = useCallback((targetPage: number) => {
    if (isAnimatingRef.current) return;
    const leaves = pageEls.current.filter(Boolean) as HTMLDivElement[];
    if (leaves.length === 0) return;

    const clamped = Math.max(0, Math.min(TOTAL_LEAVES, targetPage));
    if (clamped === currentPageRef.current) return;

    isAnimatingRef.current = true;
    const fromP = currentPageRef.current / TOTAL_LEAVES;
    const toP = clamped / TOTAL_LEAVES;
    const obj = { p: fromP };

    gsap.to(obj, {
      p: toP,
      duration: 0.5,
      ease: "power2.inOut",
      onUpdate: () => flipPages(leaves, obj.p, pageCounterRef.current),
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });
    currentPageRef.current = clamped;
  }, []);

  /* ── Touch handlers (mobile — swipe left/right) ── */
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const deltaX = touchStartYRef.current - e.changedTouches[0].clientX;
      if (Math.abs(deltaX) < 40) return;

      if (deltaX > 0) {
        /* Swipe left → next page */
        goToPage(currentPageRef.current + 1);
      } else {
        /* Swipe right → prev page */
        goToPage(currentPageRef.current - 1);
      }
    },
    [goToPage],
  );

  // ── Fullscreen side effects ──
  useEffect(() => {
    if (!isFullscreen) {
      document.body.style.overflow = "";
      lenis?.start();
      if (savedScrollYRef.current > 0) {
        window.scrollTo(0, savedScrollYRef.current);
      }
      setTimeout(() => ScrollTrigger.refresh(), 100);
      return;
    }

    lenis?.stop();
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      const leaves = pageEls.current.filter(Boolean) as HTMLDivElement[];
      if (leaves.length === 0) return;

      /* Reset all pages — use translateZ to pre-create GPU layers */
      currentPageRef.current = 0;
      const total = leaves.length;
      leaves.forEach((page, i) => {
        const zIndex = total * 2 - i;
        page.style.transform = `translateZ(${zIndex * 0.1}px) rotateY(0deg)`;
        page.style.zIndex = String(zIndex);
      });

      if (isMobile) {
        /* Mobile: no ScrollTrigger — touch swipe handles everything */
        if (pageCounterRef.current) {
          pageCounterRef.current.textContent = `0 / ${TOTAL_LEAVES}`;
        }
        return;
      }

      /* Desktop: ScrollTrigger with scrub */
      const container = scrollContainerRef.current;
      if (!container) return;
      container.scrollTop = 0;

      const spacer = container.querySelector(".book-spacer") as HTMLElement;
      if (!spacer) return;

      const mainSt = ScrollTrigger.create({
        trigger: spacer,
        scroller: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
        onUpdate: (self) => {
          flipPages(leaves, self.progress, pageCounterRef.current);
        },
      });
      scrollTriggersRef.current.push(mainSt);
    }, 150);

    return () => {
      clearTimeout(timer);
      scrollTriggersRef.current.forEach((st) => st.kill());
      scrollTriggersRef.current = [];
    };
  }, [isFullscreen, isMobile, lenis]);

  // ── Escape key ──
  useEffect(() => {
    if (!isFullscreen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBook();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isFullscreen, closeBook]);

  return (
    <>
      <section
        ref={sectionRef}
        className="pt-6 pb-24 sm:pt-10 sm:pb-32 lg:pt-14 lg:pb-44 bg-[var(--cream)]"
      >
        <div className="section-container text-center mb-14 sm:mb-18 lg:mb-24">
          <p
            className="text-[var(--gold)] tracking-[0.3em] uppercase text-[10px] sm:text-xs lg:text-sm mb-4 sm:mb-5"
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          >
            Moments
          </p>
          <h2
            className="text-[var(--black)] text-3xl sm:text-4xl lg:text-6xl font-light"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            A ROYAL AFFAIR
          </h2>
        </div>

        <div className="flex flex-col items-center">
          <div
            ref={bookPreviewRef}
            onClick={openBook}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") openBook();
            }}
            role="button"
            tabIndex={0}
            aria-label="Photo gallery book. Click to open full screen."
            className="cursor-pointer"
            style={{ perspective: "1800px" }}
          >
            <div
              className="relative w-[220px] h-[308px] sm:w-[300px] sm:h-[420px] lg:w-[360px] lg:h-[500px]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="book-page" style={{ zIndex: TOTAL_LEAVES * 2 }}>
                <div className="book-face">
                  <FrontCover />
                </div>
                <div className="book-face book-face-back">
                  <CoverBack />
                </div>
              </div>
            </div>
          </div>

          <p
            className="mt-6 text-[var(--text-muted)] text-sm sm:text-base tracking-[0.2em] uppercase animate-pulse opacity-80 font-bold"
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          >
            Tap to open album
          </p>
        </div>
      </section>

      {/* ── Fullscreen 3D Book ── */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-[var(--black-deep)]">
          <button
            onClick={closeBook}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[60] text-[var(--gold)] border border-[var(--gold)]/30 rounded-none w-11 h-11 flex items-center justify-center hover:bg-[var(--gold)] hover:text-[var(--black-deep)] transition-all duration-300"
            aria-label="Close gallery"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center gap-2">
            <p
              className="book-scroll-hint text-[var(--gold-light)] text-xs sm:text-sm tracking-[0.3em] uppercase font-bold whitespace-nowrap"
              style={{ fontFamily: "var(--font-cormorant-garamond)" }}
            >
              {isMobile ? "← Flip the page →" : "Scroll to flip pages"}
            </p>
            <span
              ref={pageCounterRef}
              className="text-white/40 text-[10px] sm:text-xs tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-cormorant-garamond)" }}
            >
              0 / {TOTAL_LEAVES}
            </span>
          </div>

          {/* Container: scrollable on desktop, static with touch on mobile */}
          <div
            ref={scrollContainerRef}
            data-lenis-prevent
            className={`book-scroll-container w-full overflow-x-hidden ${
              isMobile ? "overflow-hidden" : "overflow-y-auto"
            }`}
            style={{ height: "100dvh", overscrollBehavior: "contain" }}
            onTouchStart={isMobile ? handleTouchStart : undefined}
            onTouchEnd={isMobile ? handleTouchEnd : undefined}
          >
            <div
              className="book-spacer"
              style={{
                height: isMobile
                  ? "100dvh"
                  : `${(TOTAL_LEAVES + 1) * SCROLL_PER_PAGE}vh`,
              }}
            >
              <div
                className={`${isMobile ? "" : "sticky"} top-0 w-full overflow-hidden`}
                style={{ perspective: "1600px", height: "100dvh" }}
              >
                {/* Book spine sits at horizontal center */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-y-1/2 w-[46vw] h-[64vw] sm:w-[min(48vw,340px)] sm:h-[min(67vw,476px)] lg:w-[min(42vw,420px)] lg:h-[min(59vw,588px)]"
                  style={{ transformStyle: "preserve-3d", maxHeight: "72vh" }}
                >
                  <div
                    ref={getPageRefCallback(0)}
                    className="book-page"
                    style={{ zIndex: TOTAL_LEAVES * 2 }}
                  >
                    <div className="book-face">
                      <FrontCover />
                    </div>
                    <div className="book-face book-face-back">
                      <CoverBack />
                    </div>
                  </div>

                  {innerPages.map((page, i) => (
                    <div
                      key={i}
                      ref={getPageRefCallback(i + 1)}
                      className="book-page"
                      style={{ zIndex: (TOTAL_LEAVES - (i + 1)) * 2 }}
                    >
                      <div className="book-face">
                        {page.front ? (
                          <Image
                            src={page.front}
                            alt={`Gallery photo ${i * 2 + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 46vw, 420px"
                            loading={i > 1 ? "lazy" : "eager"}
                          />
                        ) : (
                          <div className="absolute inset-0 bg-[var(--cream-dark)]" />
                        )}
                      </div>
                      <div className="book-face book-face-back">
                        {page.back ? (
                          <Image
                            src={page.back}
                            alt={`Gallery photo ${i * 2 + 2}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 46vw, 420px"
                            loading={i > 1 ? "lazy" : "eager"}
                          />
                        ) : (
                          <DecorativeLast />
                        )}
                      </div>
                    </div>
                  ))}

                  <div
                    ref={getPageRefCallback(innerPages.length + 1)}
                    className="book-page"
                    style={{ zIndex: 1 }}
                  >
                    <div className="book-face">
                      <BackCoverInner />
                    </div>
                    <div className="book-face book-face-back">
                      <BackCover />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
