"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useScrollContainer } from "@/app/context/ScrollContext";

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

function FeatureCard({
  index,
  title,
  body,
}: {
  index: string;
  title: string;
  body: string;
  i: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollContainer = useScrollContainer();

  const { scrollYProgress } = useScroll({
    target: ref,
    container: scrollContainer,
    offset: ["0 1", "0.6 1"],
  });

  const opacity = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 80,
    damping: 20,
  });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [48, 0]), {
    stiffness: 80,
    damping: 20,
  });

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="group relative flex flex-col gap-4 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm p-8 hover:border-white/15 hover:bg-white/6 transition-colors duration-300"
    >
      <span className="text-xs font-semibold tracking-widest text-white/25 uppercase">
        {index}
      </span>
      <h3 className="text-white font-bold text-lg leading-snug tracking-tight">
        {title}
      </h3>
      <p className="text-white/45 text-sm leading-relaxed tracking-tight">
        {body}
      </p>
      <div className="absolute top-0 right-0 w-16 h-16 rounded-tr-2xl overflow-hidden pointer-events-none">
        <div className="absolute -top-8 -right-8 w-16 h-16 rounded-full bg-white/5 blur-xl" />
      </div>
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
            "radial-gradient(ellipse at center, rgba(255,255,255,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

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
                  "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
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
