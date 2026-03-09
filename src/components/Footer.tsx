"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-12 sm:py-14 lg:py-16 bg-[var(--black-deep)] border-t border-white/5 safe-bottom">
      <div className="w-full max-w-[800px] mx-auto text-center px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p
            className="text-[var(--gold)] text-2xl sm:text-3xl lg:text-4xl font-light mb-3 lg:mb-4"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            S &amp; A
          </p>

          <p
            className="text-white/40 text-[11px] sm:text-xs lg:text-sm tracking-[0.2em] uppercase mb-6 sm:mb-7 lg:mb-8"
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          >
            #ShreyanshWedsAnkita
          </p>

          <div className="ornament mb-6 sm:mb-7 lg:mb-8">
            <span className="text-white/30 text-[10px] sm:text-[11px] lg:text-xs tracking-widest uppercase">
              18–19 · 04 · 2026
            </span>
          </div>

          <p
            className="text-white/20 text-[10px] sm:text-[11px] lg:text-xs tracking-wider"
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          >
            Made with love
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
