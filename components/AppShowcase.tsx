"use client";

import { useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useTransform,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import type { Project } from "@/types/portfolio";

interface AppShowcaseProps {
  projects: Project[];
  screenshotsPerApp?: number;
}

interface ShowcaseSlide {
  project: Project;
  screenshot: string;
  withinAppIndex: number;
  totalForApp: number;
}

export function AppShowcase({
  projects,
  screenshotsPerApp = 2,
}: AppShowcaseProps) {
  // Flatten projects → slides (N screenshots per app)
  const slides = useMemo<ShowcaseSlide[]>(() => {
    const list: ShowcaseSlide[] = [];
    projects.forEach((project) => {
      const shots =
        project.appStore?.screenshots?.slice(0, screenshotsPerApp) ?? [];
      shots.forEach((screenshot, i) => {
        list.push({
          project,
          screenshot,
          withinAppIndex: i,
          totalForApp: shots.length,
        });
      });
    });
    return list;
  }, [projects, screenshotsPerApp]);

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Smooth the progress with a spring so the phone parallax feels fluid
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.35,
  });

  // Slight vertical drift for the phone as you scroll within the section
  const phoneY = useTransform(smoothProgress, [0, 1], [-12, 12]);

  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (slides.length === 0) return;
    const raw = v * slides.length;
    const idx = Math.min(slides.length - 1, Math.max(0, Math.floor(raw)));
    if (idx !== activeIndex) setActiveIndex(idx);
  });

  if (slides.length === 0) return null;

  const current = slides[activeIndex];
  const currentProject = current.project;
  const projectStartIndex = slides.findIndex(
    (s) => s.project.id === currentProject.id
  );

  return (
    <section
      id="showcase"
      ref={ref}
      className="relative bg-secondary/10"
      style={{ height: `${slides.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Background dotted grid + glow */}
        <div className="absolute inset-0 bg-grid-fade pointer-events-none" />
        <motion.div
          style={{
            x: useTransform(scrollYProgress, [0, 1], [-100, 100]),
          }}
          className="absolute top-1/3 -left-32 w-[480px] h-[480px] bg-primary/15 rounded-full blur-[140px] opacity-60 pointer-events-none"
        />
        <motion.div
          style={{
            x: useTransform(scrollYProgress, [0, 1], [100, -100]),
          }}
          className="absolute bottom-1/4 -right-32 w-[520px] h-[520px] bg-teal-500/10 rounded-full blur-[160px] opacity-60 pointer-events-none"
        />

        {/* Section eyebrow */}
        <div className="absolute top-8 md:top-10 left-1/2 -translate-x-1/2 text-center z-10">
          <div className="inline-flex items-center gap-2 text-[11px] md:text-xs font-mono uppercase tracking-widest text-primary">
            <span className="w-6 md:w-8 h-px bg-primary" /> Showcase{" "}
            <span className="w-6 md:w-8 h-px bg-primary" />
          </div>
          <h2 className="text-xl md:text-3xl font-bold mt-2">
            Apps shipped to production
          </h2>
        </div>

        {/* Progress rail (top) */}
        <div className="absolute top-24 md:top-28 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === activeIndex
                  ? "w-8 bg-primary"
                  : i < activeIndex
                  ? "w-1.5 bg-primary/40"
                  : "w-1.5 bg-white/15"
              }`}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Content side */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* App identity row */}
                <div className="flex items-center gap-4 mb-5">
                  {currentProject.appStore?.icon && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={currentProject.appStore.icon}
                      alt=""
                      className="w-14 h-14 rounded-2xl border border-white/10 shadow-lg"
                    />
                  )}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center text-[11px] font-mono uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">
                      {currentProject.category}
                    </span>
                    {currentProject.appStore?.rating ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full">
                        <Star className="w-3 h-3 fill-amber-300" />
                        {currentProject.appStore.rating.toFixed(1)}
                      </span>
                    ) : null}
                  </div>
                </div>

                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 leading-[1.05]">
                  <span className="text-gradient">{currentProject.name}</span>
                </h3>

                {currentProject.tagline && (
                  <p className="text-lg md:text-xl text-foreground/85 mb-5 font-medium">
                    {currentProject.tagline}
                  </p>
                )}

                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 max-w-xl">
                  {currentProject.description}
                </p>

                {currentProject.highlights &&
                  currentProject.highlights.length > 0 && (
                    <ul className="space-y-2 mb-6 max-w-xl">
                      {currentProject.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground/90 flex items-start gap-2.5"
                        >
                          <span className="text-primary mt-1.5">▸</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                {currentProject.technologies &&
                  currentProject.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-7">
                      {currentProject.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-[11px] font-mono bg-white/5 border border-white/10 rounded-md text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                {currentProject.storeLink && (
                  <a
                    href={currentProject.storeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/25 hover:bg-primary/90 hover:-translate-y-0.5 transition-all"
                  >
                    View on App Store
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Phone side */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
            <motion.div
              style={{ y: phoneY }}
              className="relative w-[240px] md:w-[280px] aspect-[9/19.5]"
            >
              {/* Floating glow */}
              <div className="absolute inset-0 -z-10 bg-primary/25 blur-[110px] rounded-full" />

              {/* Phone frame */}
              <div className="relative w-full h-full rounded-[3rem] border-[10px] border-white/10 bg-black shadow-2xl shadow-primary/30 overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-30 border-x border-b border-white/5" />

                {/* Screenshot crossfade */}
                <div className="absolute inset-0 rounded-[2.25rem] overflow-hidden">
                  <AnimatePresence>
                    <motion.div
                      key={`${currentProject.id}-${current.withinAppIndex}`}
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{
                        duration: 0.75,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="absolute inset-0"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={current.screenshot}
                        alt={`${currentProject.name} screenshot ${
                          current.withinAppIndex + 1
                        }`}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Per-app screenshot dots inside the phone */}
                {current.totalForApp > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
                    {Array.from({ length: current.totalForApp }).map((_, i) => (
                      <span
                        key={i}
                        className={`h-1 rounded-full transition-all duration-500 ${
                          i === current.withinAppIndex
                            ? "w-5 bg-white"
                            : "w-1 bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Side counter (i / N) */}
              <div className="absolute -right-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-2 text-xs font-mono text-muted-foreground tabular-nums">
                <span className="text-foreground font-semibold text-base">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <span className="w-px h-8 bg-white/15" />
                <span>{String(slides.length).padStart(2, "0")}</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Hint at bottom */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] md:text-xs text-muted-foreground/60 tracking-widest uppercase flex items-center gap-2">
          <span>Scroll to explore</span>
          <span className="text-primary">→</span>
        </div>
      </div>
    </section>
  );
}
