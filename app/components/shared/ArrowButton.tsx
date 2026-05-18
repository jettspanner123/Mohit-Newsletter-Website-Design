"use client";

import React from "react";
import { motion } from "framer-motion";

interface ArrowButtonProps {
  label?: string;
}

export default function ArrowButton({ label }: ArrowButtonProps): React.JSX.Element {
  return (
    <motion.button
      className="inline-flex items-center gap-2 text-white rounded-full px-6 py-3 text-base font-semibold cursor-pointer select-none"
      style={{ verticalAlign: "middle", backgroundColor: "#C46A55" }}
      whileHover="hovered"
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {label && <span className="text-sm tracking-tight">{label}</span>}

      <motion.span
        className="flex items-center justify-center"
        variants={{
          hovered: { x: 4, rotate: 0 },
        }}
        initial={{ rotate: -45 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        aria-hidden="true"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </motion.span>
    </motion.button>
  );
}
