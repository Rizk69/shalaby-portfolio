import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import type { Education as EducationType } from "@shared/schema";
import { SectionHeading } from "./SectionHeading";

interface EducationProps {
  data: EducationType[];
}

export function Education({ data }: EducationProps) {
  if (!data?.length) return null;

  return (
    <section id="education" className="py-24 bg-secondary/30">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <SectionHeading title="Education" />
        
        <div className="space-y-6">
          {data.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 md:p-8 flex items-start gap-6 group hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-1">
                <GraduationCap className="w-6 h-6" />
              </div>
              
              <div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {item.degree}
                  </h3>
                  <span className="text-sm font-medium text-muted-foreground bg-secondary px-3 py-1 rounded-full w-fit">
                    {item.period}
                  </span>
                </div>
                <p className="text-lg text-muted-foreground">
                  {item.institution}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
