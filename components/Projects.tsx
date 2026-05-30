"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Smartphone,
  ArrowUpRight,
  Star,
} from "lucide-react";
import type { Project } from "@/types/portfolio";
import { SectionHeading } from "./SectionHeading";
import { AppScreenshots } from "./AppScreenshots";

interface ProjectsProps {
  data: Project[];
}

const CATEGORY_COLORS: Record<string, string> = {
  "E-commerce": "from-blue-500 to-cyan-400",
  Delivery: "from-teal-400 to-emerald-500",
  Fintech: "from-violet-500 to-fuchsia-400",
  Productivity: "from-amber-400 to-orange-500",
  Enterprise: "from-rose-400 to-pink-500",
};

export function Projects({ data }: ProjectsProps) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    data.forEach((p) => set.add(p.category));
    return ["All", ...Array.from(set)];
  }, [data]);

  const [active, setActive] = useState("All");
  const filtered =
    active === "All" ? data : data.filter((p) => p.category === active);

  if (!data?.length) return null;

  return (
    <section id="projects" className="py-24 bg-secondary/20 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading
          title="Featured Projects"
          subtitle="A selection of mobile apps I've built and shipped to production."
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                    : "bg-secondary/40 text-muted-foreground border-white/5 hover:text-foreground hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const gradient =
    CATEGORY_COLORS[project.category] ?? "from-primary to-teal-400";
  const icon = project.appStore?.icon;
  const rating = project.appStore?.rating;
  const ratingCount = project.appStore?.ratingCount;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="glass-card rounded-2xl p-6 flex flex-col h-full group hover:-translate-y-2 hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
    >
      {/* Background category glow */}
      <div
        className={`absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br ${gradient} opacity-10 blur-3xl pointer-events-none`}
      />

      {/* Header */}
      <div className="flex justify-between items-start mb-5 relative">
        {icon ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={icon}
            alt={`${project.name} icon`}
            className="w-14 h-14 rounded-2xl shadow-lg border border-white/10"
            loading="lazy"
          />
        ) : (
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} text-white flex items-center justify-center shadow-lg`}
          >
            <Smartphone className="w-6 h-6" />
          </div>
        )}

        <div className="flex items-center gap-3">
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

      {/* Category + Rating row */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="inline-flex items-center w-fit text-[11px] font-mono uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
          {project.category}
        </span>
        {rating !== null && rating !== undefined && rating > 0 && (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-full">
            <Star className="w-3 h-3 fill-amber-300" />
            {rating.toFixed(1)}
            {ratingCount !== null && ratingCount !== undefined && (
              <span className="text-amber-300/70 ml-0.5">
                ({ratingCount.toLocaleString()})
              </span>
            )}
          </span>
        )}
        {project.appStore && (
          <span className="text-[11px] font-medium text-muted-foreground bg-secondary/60 border border-white/5 px-2.5 py-0.5 rounded-full">
            Live on App Store
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors inline-flex items-center gap-1">
        {project.name}
        <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
      </h3>
      {project.tagline && (
        <div className="text-sm text-muted-foreground/80 mb-4">
          {project.tagline}
        </div>
      )}

      <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
        {project.description}
      </p>

      {project.highlights && project.highlights.length > 0 && (
        <ul className="space-y-1.5 mb-5">
          {project.highlights.map((h, i) => (
            <li
              key={i}
              className="text-xs text-muted-foreground/90 flex items-start gap-2"
            >
              <span className="text-primary mt-0.5">▹</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      {project.technologies && project.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="text-[11px] font-mono text-muted-foreground bg-white/5 px-2 py-1 rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {project.appStore?.screenshots && project.appStore.screenshots.length > 0 && (
        <AppScreenshots
          appName={project.name}
          screenshots={project.appStore.screenshots}
        />
      )}

      {project.storeLink && (
        <a
          href={project.storeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all text-sm font-medium"
        >
          View on App Store
          <ArrowUpRight className="w-4 h-4" />
        </a>
      )}
    </motion.article>
  );
}
