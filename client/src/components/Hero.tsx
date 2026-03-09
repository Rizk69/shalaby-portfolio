import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight, Download } from "lucide-react";
import type { PersonalInfo } from "@shared/schema";

interface HeroProps {
  data: PersonalInfo;
}

export function Hero({ data }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] opacity-50 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[128px] opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for new opportunities
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-6"
          >
            Hi, I'm {data.name.split(' ')[0]}. <br />
            <span className="text-gradient">{data.role}</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl"
          >
            {data.objective}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-6"
          >
            <a 
              href="#projects" 
              className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium flex items-center gap-2 hover:bg-primary/90 hover:-translate-y-1 transition-all shadow-lg shadow-primary/25"
            >
              View My Work
              <ArrowRight className="w-4 h-4" />
            </a>

            <div className="flex items-center gap-4">
              {data.github && (
                <a 
                  href={data.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-secondary text-foreground hover:bg-white/10 hover:-translate-y-1 transition-all border border-white/5"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {data.linkedin && (
                <a 
                  href={data.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-secondary text-foreground hover:bg-white/10 hover:-translate-y-1 transition-all border border-white/5"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              <a 
                href={`mailto:${data.email}`} 
                className="p-4 rounded-xl bg-secondary text-foreground hover:bg-white/10 hover:-translate-y-1 transition-all border border-white/5"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
