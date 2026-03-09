import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import type { Experience as ExperienceType } from "@shared/schema";
import { SectionHeading } from "./SectionHeading";

interface ExperienceProps {
  data: ExperienceType[];
}

export function Experience({ data }: ExperienceProps) {
  if (!data?.length) return null;

  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <SectionHeading title="Work Experience" subtitle="My professional journey and roles." />
        
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {data.map((job, index) => (
            <motion.div 
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              {/* Timeline dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-secondary text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 absolute left-0 md:left-1/2 -translate-x-1/2">
                <Briefcase className="w-4 h-4" />
              </div>

              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] ml-16 md:ml-0 glass-card p-6 md:p-8 rounded-2xl hover:border-primary/30 transition-colors">
                <div className="flex flex-col gap-1 mb-4">
                  <span className="text-sm font-medium text-primary bg-primary/10 w-fit px-3 py-1 rounded-full mb-2">
                    {job.period}
                  </span>
                  <h3 className="text-xl font-bold text-foreground">{job.role}</h3>
                  <div className="text-muted-foreground font-medium flex items-center gap-2">
                    {job.company} {job.location && <span className="text-sm opacity-70">• {job.location}</span>}
                  </div>
                </div>
                
                {job.achievements && job.achievements.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {job.achievements.map((achievement, i) => (
                      <li key={i} className="text-muted-foreground text-sm flex gap-3">
                        <span className="text-primary mt-1 flex-shrink-0">▹</span>
                        <span className="leading-relaxed">{achievement}</span>
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
