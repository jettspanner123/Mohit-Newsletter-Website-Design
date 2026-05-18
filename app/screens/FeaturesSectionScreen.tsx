"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useScrollContainer } from "@/app/context/ScrollContext";
import LineWaves from "@/app/design/LineWaves";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const FEATURES = [
  {
    index: "01",
    title: "Curated, not aggregated",
    body: "Every story is hand-picked by humans who actually read it. No bots, no keyword stuffing — just signal.",
  },
  {
    index: "02",
    title: "5 minutes, every morning",
    body: "We respect your time. Each edition is tight, scannable, and done before your coffee gets cold.",
  },
  {
    index: "03",
    title: "Research to plain English",
    body: "Dense papers and model releases translated into language that makes sense — without losing the nuance.",
  },
  {
    index: "04",
    title: "Tools you'll actually use",
    body: "Practical prompts, new releases, and workflow tips that slot into your day immediately.",
  },
];

// Each card gets a unique entrance recipe based on its grid position
const CARD_CONFIGS = [
  // Card 0 — top-left: slides from left + rotates in
  {
    yRange:       [60, 0]   as [number, number],
    xRange:       [-60, 0]  as [number, number],
    rotateRange:  [-8, 0]   as [number, number],
    scaleRange:   [0.88, 1] as [number, number],
    skewRange:    [0, 0]    as [number, number],
  },
  // Card 1 — top-right: slides from right + rotates in
  {
    yRange:       [60, 0]   as [number, number],
    xRange:       [60, 0]   as [number, number],
    rotateRange:  [8, 0]    as [number, number],
    scaleRange:   [0.88, 1] as [number, number],
    skewRange:    [0, 0]    as [number, number],
  },
  // Card 2 — bottom-left: rises with a skew wipe
  {
    yRange:       [80, 0]   as [number, number],
    xRange:       [0, 0]    as [number, number],
    rotateRange:  [0, 0]    as [number, number],
    scaleRange:   [0.82, 1] as [number, number],
    skewRange:    [-6, 0]   as [number, number],
  },
  // Card 3 — bottom-right: drops in from above with scale
  {
    yRange:       [-50, 0]  as [number, number],
    xRange:       [0, 0]    as [number, number],
    rotateRange:  [5, 0]    as [number, number],
    scaleRange:   [0.9, 1]  as [number, number],
    skewRange:    [4, 0]    as [number, number],
  },
];

function FeatureCard({
  index,
  title,
  body,
  i,
}: {
  index: string;
  title: string;
  body: string;
  i: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollContainer = useScrollContainer();
  const cfg = i % 2 === 0 ? CARD_CONFIGS[0] : CARD_CONFIGS[1];

  const { scrollYProgress } = useScroll({
    target: ref,
    container: scrollContainer,
    offset: ["0 1", "0.75 1"],
  });

  const springCfg = { stiffness: 70, damping: 18 };

  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.6], [0, 1]),   springCfg);
  const y       = useSpring(useTransform(scrollYProgress, [0, 1], cfg.yRange),  springCfg);
  const x       = useSpring(useTransform(scrollYProgress, [0, 1], cfg.xRange),  springCfg);
  const rotate  = useSpring(useTransform(scrollYProgress, [0, 1], cfg.rotateRange), springCfg);
  const scale   = useSpring(useTransform(scrollYProgress, [0, 1], cfg.scaleRange),  springCfg);
  const skewX   = useSpring(useTransform(scrollYProgress, [0, 1], cfg.skewRange),   springCfg);

  // Inner content staggers in after the card itself arrives
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.85], [0, 1]);
  const contentY       = useTransform(scrollYProgress, [0.3, 0.85], [12, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, x, rotate, scale, skewX }}
      className="group relative flex flex-col gap-4 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm p-8 hover:border-white/15 hover:bg-white/6 transition-colors duration-300 overflow-hidden"
    >
      {/* Accent corner glow */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(circle, rgba(196,106,85,0.15) 0%, transparent 70%)" }}
      />

      {/* Index */}
      <motion.span
        style={{ opacity: contentOpacity, y: contentY, color: "#C46A55" }}
        className="text-xs font-semibold tracking-widest uppercase"
      >
        {index}
      </motion.span>

      {/* Title */}
      <motion.h3
        style={{ opacity: contentOpacity, y: contentY }}
        className="text-white font-bold text-lg leading-snug tracking-tight"
      >
        {title}
      </motion.h3>

      {/* Body */}
      <motion.p
        style={{ opacity: contentOpacity, y: contentY }}
        className="text-white/45 text-sm leading-relaxed tracking-tight"
      >
        {body}
      </motion.p>

      {/* Bottom accent line that grows in */}
      <motion.div
        className="absolute bottom-0 left-0 h-px"
        style={{
          backgroundColor: "#C46A55",
          width: useTransform(scrollYProgress, [0.4, 1], ["0%", "100%"]),
          opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 0.4]),
        }}
      />
    </motion.div>
  );
}

export default function FeaturesSectionScreen(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainer = useScrollContainer();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: scrollContainer,
    offset: ["start end", "end start"],
  });

  const headingY = useSpring(
    useTransform(scrollYProgress, [0, 1], [-30, 30]),
    { stiffness: 60, damping: 20 }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black overflow-hidden px-6 py-32 md:py-40"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          zIndex: 0,
          width: "60vw",
          height: "50vh",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, 0)",
          background:
            "radial-gradient(ellipse at center, rgba(196,106,85,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* LineWaves background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
        style={{ zIndex: 0, opacity: 0.05 }}
      >
        <LineWaves
          speed={0.2}
          innerLineCount={28}
          outerLineCount={32}
          warpIntensity={0.7}
          rotation={-45}
          edgeFadeWidth={0.0}
          colorCycleSpeed={0.8}
          brightness={0.25}
          color1="#C46A55"
          color2="#C46A55"
          color3="#C46A55"
          enableMouseInteraction={false}
          mouseInfluence={0}
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-16">

        {/* Section heading with parallax */}
        <motion.div style={{ y: headingY }} className="flex flex-col gap-3">
          <motion.span
            className="text-xs font-semibold uppercase tracking-widest text-white/30"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            Why subscribe
          </motion.span>

          <motion.h2
            className="font-black text-white text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.95] tracking-[-0.04em] max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
          >
            Everything you need.
            <span
              className="block"
              style={{
                background:
                  "linear-gradient(135deg, #C46A55 0%, #d4856e 50%, #e8a090 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Nothing you don&apos;t.
            </span>
          </motion.h2>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.index} {...f} i={i} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm px-8 py-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <p className="text-white font-semibold text-sm tracking-tight">
              Join 12,000+ readers
            </p>
            <p className="text-white/40 text-xs tracking-tight">
              Free forever. Unsubscribe any time.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-2 rounded-full bg-white/8 border border-white/10 backdrop-blur-sm px-2 py-2 w-full sm:w-auto focus-within:border-white/25 transition-colors duration-200"
          >
            <input
              type="email"
              placeholder="your@email.com"
              required
              className="flex-1 min-w-0 bg-transparent text-white text-sm placeholder-white/25 outline-none px-3 tracking-tight"
            />
            <motion.button
              type="submit"
              className="shrink-0 bg-white text-black rounded-full px-5 py-2 text-xs font-semibold tracking-tight cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              Get it free
            </motion.button>
          </form>
        </motion.div>

      </div>
    </section>
  );
}
