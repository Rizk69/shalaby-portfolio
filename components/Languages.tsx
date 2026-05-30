"use client";

import { motion } from "framer-motion";
import { Languages as LanguagesIcon } from "lucide-react";
import type { Language } from "@/types/portfolio";

interface LanguagesProps {
  data: Language[];
}

export function Languages({ data }: LanguagesProps) {
  if (!data?.length) return null;

  return (
    <section id="languages" className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="glass-card rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <LanguagesIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                Languages
              </div>
              <div className="text-lg font-bold text-foreground">
                Communication
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 md:ml-auto">
            {data.map((lang) => (
              <div
                key={lang.name}
                className="px-4 py-2.5 rounded-xl bg-secondary/60 border border-white/5 flex items-center gap-2.5"
              >
                <span className="font-semibold text-foreground">{lang.name}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                <span className="text-sm text-muted-foreground">
                  {lang.proficiency}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
