"use client";

import { motion } from "framer-motion";
import {
  Smartphone,
  Layers,
  Blocks,
  Plug,
  Server,
  Database,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { Skill } from "@/types/portfolio";
import { SectionHeading } from "./SectionHeading";

interface SkillsProps {
  data: Skill[];
}

const ICONS: Record<string, LucideIcon> = {
  smartphone: Smartphone,
  layers: Layers,
  blocks: Blocks,
  plug: Plug,
  server: Server,
  database: Database,
  wrench: Wrench,
};

export function Skills({ data }: SkillsProps) {
  if (!data?.length) return null;

  return (
    <section id="skills" className="py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-grid-fade opacity-40 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <SectionHeading
          title="Technical Arsenal"
          subtitle="The tools and patterns I reach for when building mobile apps."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {data.map((category, index) => {
            const Icon = ICONS[category.icon] ?? Layers;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="glass-card rounded-2xl p-6 md:p-7 group hover:border-primary/30 hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-foreground">
                    {category.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.items?.map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-secondary/60 border border-white/5 rounded-lg text-xs md:text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
