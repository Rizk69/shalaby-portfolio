"use client";

import { motion } from "framer-motion";
import { Rocket, Layers3, Globe2, Sparkles } from "lucide-react";

const STATS = [
  {
    icon: Rocket,
    value: "~3",
    label: "Years building production apps",
  },
  {
    icon: Layers3,
    value: "10+",
    label: "Shipped Flutter applications",
  },
  {
    icon: Globe2,
    value: "Multi-role",
    label: "Customer · Driver · Vendor · Admin",
  },
  {
    icon: Sparkles,
    value: "iOS · Android",
    label: "Live on Play Store & App Store",
  },
];

export function About() {
  return (
    <section id="about" className="py-20 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-12 gap-10 items-center"
        >
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary mb-4">
              <span className="w-8 h-px bg-primary" /> About
            </div>
            <h2 className="text-2xl md:text-5xl font-bold leading-tight mb-6">
              Mobile apps with a focus on
              <span className="text-gradient"> clean architecture</span> and
              <span className="text-gradient"> great UX</span>.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              I specialize in Flutter — building cross-platform mobile apps for
              e-commerce, delivery, and fintech. From single-screen utilities to
              multi-role platforms with Customer, Driver, and Vendor apps, I focus
              on shipping maintainable code that scales with the product.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="glass-card rounded-2xl p-6 hover:border-primary/30 transition-colors group"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground leading-snug">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
