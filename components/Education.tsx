"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import type { Education as EducationType } from "@/types/portfolio";
import { SectionHeading } from "./SectionHeading";

interface EducationProps {
  data: EducationType[];
}

export function Education({ data }: EducationProps) {
  if (!data?.length) return null;

  return (
    <section id="education" className="py-24 bg-secondary/20">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <SectionHeading title="Education & Training" subtitle="My academic and professional foundation." />

        <div className="grid md:grid-cols-2 gap-6">
          {data.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="glass-card rounded-2xl p-6 md:p-7 flex items-start gap-5 group hover:border-primary/30 hover:-translate-y-1 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-xs font-medium text-muted-foreground bg-secondary/60 border border-white/5 px-2.5 py-0.5 rounded-full inline-block mb-2">
                  {item.period}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                  {item.degree}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground mt-1">
                  {item.institution}
                </p>
                {item.detail && (
                  <p className="text-sm text-muted-foreground/80 mt-3 leading-relaxed">
                    {item.detail}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
