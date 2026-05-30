"use client";

import { motion } from "framer-motion";

const ITEMS = [
  "Flutter",
  "Dart",
  "GetX",
  "Bloc",
  "Cubit",
  "Clean Architecture",
  "REST APIs",
  "Firebase",
  "iOS",
  "Android",
  "Dio",
  "SQLite",
  "MVVM",
  "Node.js",
];

export function Marquee() {
  // Two copies for seamless loop
  const loop = [...ITEMS, ...ITEMS];

  return (
    <section
      aria-hidden
      className="py-12 md:py-16 border-y border-white/5 bg-secondary/10 overflow-hidden relative"
    >
      {/* Fades on edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {loop.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-12 text-2xl md:text-3xl font-bold text-muted-foreground/40 hover:text-primary transition-colors"
          >
            <span>{item}</span>
            <span className="w-2 h-2 rounded-full bg-primary/60" />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
