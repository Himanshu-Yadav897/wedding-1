"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-8 sm:py-20 lg:py-24 bg-[var(--black-deep)] border-t border-white/5 safe-bottom">
      <div className="w-full max-w-[800px] mx-auto text-center px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <Image
            src="/SA logo.png"
            alt="SA Logo"
            width={150}
            height={150}
            className="mb-6 sm:mb-8 lg:mb-10"
          />

          <p
            className="text-[var(--gold)] text-4xl sm:text-4xl lg:text-5xl mb-6 sm:mb-8 lg:mb-10"
            style={{ fontFamily: "var(--font-script)" }}
          >
            Shreyansh &amp; Ankita
          </p>

          <p
            className=" text-[var(--gold)] text-[13px] sm:text-xs lg:text-sm tracking-[0.2em] uppercase mb-8 sm:mb-10 lg:mb-12"
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          >
            #DilTohShAnkiHai
          </p>

          <p
            className="text-white/20 text-[16px] sm:text-[11px] lg:text-xs tracking-wider"
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          >
            Made with love
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
