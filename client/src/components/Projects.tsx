import { motion } from "framer-motion";
import { ExternalLink, Github, Smartphone } from "lucide-react";
import type { Project } from "@shared/schema";
import { SectionHeading } from "./SectionHeading";

interface ProjectsProps {
  data: Project[];
}

export function Projects({ data }: ProjectsProps) {
  if (!data?.length) return null;

  return (
    <section id="projects" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading 
          title="Featured Projects" 
          subtitle="A selection of applications I've built and deployed." 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {data.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 flex flex-col h-full group hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div className="flex gap-3">
                  {project.githubLink && (
                    <a 
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="GitHub Repository"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {project.storeLink && (
                    <a 
                      href={project.storeLink}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="App Store Link"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {project.name}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-6 flex-grow leading-relaxed">
                {project.description}
              </p>

              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                  {project.technologies.map((tech, i) => (
                    <span 
                      key={i} 
                      className="text-xs font-mono text-muted-foreground bg-white/5 px-2 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
