"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import type { Experience as ExperienceType } from "@/types/portfolio";
import { SectionHeading } from "./SectionHeading";

interface ExperienceProps {
  data: ExperienceType[];
}

export function Experience({ data }: ExperienceProps) {
  if (!data?.length) return null;

  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <SectionHeading
          title="Work Experience"
          subtitle="My professional journey across freelance and full-time roles."
        />

        <div className="relative space-y-10 before:absolute before:left-5 md:before:left-7 before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-primary/30 before:via-border before:to-transparent">
          {data.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-14 md:pl-20"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-2 top-2 w-10 h-10 rounded-2xl border border-primary/30 bg-secondary text-primary flex items-center justify-center shadow-lg shadow-primary/10">
                <Briefcase className="w-4 h-4" />
              </div>

              <div className="glass-card p-6 md:p-8 rounded-2xl hover:border-primary/30 transition-colors">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="text-xs md:text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {job.period}
                  </span>
                  {job.type && (
                    <span className="text-xs font-medium text-muted-foreground bg-secondary/60 border border-white/5 px-3 py-1 rounded-full">
                      {job.type}
                    </span>
                  )}
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">
                  {job.role}{" "}
                  <span className="text-primary font-semibold">@ {job.company}</span>
                </h3>

                {job.location && (
                  <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                    <MapPin className="w-3.5 h-3.5" />
                    {job.location}
                  </div>
                )}

                {job.achievements && job.achievements.length > 0 && (
                  <ul className="mt-4 space-y-2.5">
                    {job.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="text-muted-foreground text-sm md:text-[15px] flex gap-3 leading-relaxed"
                      >
                        <span className="text-primary mt-1.5 flex-shrink-0">▸</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
