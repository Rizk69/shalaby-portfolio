import { motion } from "framer-motion";
import type { Skill } from "@shared/schema";
import { SectionHeading } from "./SectionHeading";

interface SkillsProps {
  data: Skill[];
}

export function Skills({ data }: SkillsProps) {
  if (!data?.length) return null;

  return (
    <section id="skills" className="py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading 
          title="Technical Arsenal" 
          subtitle="Technologies and tools I use to build robust applications." 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-8"
            >
              <h3 className="text-lg font-bold mb-6 text-foreground border-b border-white/10 pb-4">
                {category.category}
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {category.items?.map((item, i) => (
                  <span 
                    key={i} 
                    className="px-4 py-2 bg-secondary/50 border border-white/5 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
