"use client";

import React from "react";
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Navbar(): React.JSX.Element {
  return (
    <motion.nav
      className="fixed top-4 left-1/2 z-50 flex items-center justify-between px-4 py-2 rounded-full"
      style={{ translateX: "-50%", width: "clamp(320px, 60vw, 720px)" }}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {/* Frosted pill background */}
      <div className="absolute inset-0 rounded-full bg-white/8 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/30" />

      {/* Logo / wordmark */}
      <div className="relative flex items-center gap-2.5">
        {/* Small accent dot */}
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#C46A55" }} />
        <span className="text-white text-sm font-semibold tracking-tight leading-none">
          THAtha{" "}
          <span className="text-white/40 font-normal">
            Business Development LLP
          </span>
        </span>
      </div>

      {/* Nav links */}
      <div className="relative hidden md:flex items-center gap-8">
        {["About", "Archive", "Contact"].map((link) => (
          <a
            key={link}
            href="#"
            className="text-white/40 text-sm font-medium tracking-tight hover:text-white/80 transition-colors duration-200"
          >
            {link}
          </a>
        ))}
      </div>

      {/* CTA */}
      <motion.a
        href="#"
        className="relative text-white rounded-full px-4 py-1.5 text-xs font-semibold tracking-tight cursor-pointer"
        style={{ backgroundColor: "#C46A55" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        Subscribe
      </motion.a>
    </motion.nav>
  );
}
