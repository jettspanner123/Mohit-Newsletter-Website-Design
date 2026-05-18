"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import LineWaves from "../design/LineWaves";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function LandingSectionScreen(): React.JSX.Element {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black px-6">
      {/* ── Layer 1: LineWaves WebGL background ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 w-full h-full opacity-[0.7]"
      >
        <LineWaves
          speed={0.3}
          innerLineCount={32}
          outerLineCount={36}
          warpIntensity={1.0}
          rotation={-45}
          edgeFadeWidth={0.0}
          colorCycleSpeed={1.0}
          brightness={0.35}
          color1="#C46A55"
          color2="#C46A55"
          color3="#C46A55"
          enableMouseInteraction={true}
          mouseInfluence={2.0}
        />
      </div>

      {/* ── Layer 2: Soft radial glow ── */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          zIndex: 2,
          width: "60vw",
          height: "40vh",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* ── Layer 3: Content ── */}
      <div
        className="relative flex flex-col items-center gap-8"
        style={{ zIndex: 10 }}
      >
        {/* Headline */}
        <motion.h1
          className="font-sans font-black text-white text-[clamp(2rem,5vw,4rem)] leading-[0.92] tracking-[-0.04em] text-center max-w-5xl"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          <span className="block">Your Daily AI Briefing,</span>
          <span className="block mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
            <span>Straight to You.</span>
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-white/75 text-sm md:text-base text-center max-w-sm leading-relaxed tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2, ease: EASE }}
        >
          The most important AI stories, tools, and breakthroughs — distilled into a 5-minute read and delivered every morning.
        </motion.p>

        {/* Email signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.35, ease: EASE }}
          className="w-full max-w-md"
        >
          {submitted ? (
            <motion.p
              className="text-center text-white/70 text-sm tracking-tight"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              You&apos;re in. Check your inbox.
            </motion.p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 rounded-full bg-black/20 border border-white/10 backdrop-blur-xl px-2 py-2 focus-within:border-white/25 transition-colors duration-200"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 bg-transparent text-white text-sm placeholder-white/30 outline-none px-3 tracking-tight"
              />
              <motion.button
                type="submit"
                className="shrink-0 bg-white text-black rounded-full px-5 py-2 text-sm font-semibold tracking-tight cursor-pointer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                Subscribe
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
