"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useTransform,
  useSpring,
} from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowUpRight, Star, ChevronLeft, ChevronRight } from "lucide-react";
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

  if (slides.length === 0) return null;

  return (
    <section id="showcase" className="bg-secondary/10">
      {/* Mobile: swipeable carousel (fluid, finger-friendly) */}
      <div className="lg:hidden">
        <MobileShowcase projects={projects} />
      </div>

      {/* Desktop: sticky scroll showcase */}
      <div className="hidden lg:block">
        <DesktopShowcase slides={slides} />
      </div>
    </section>
  );
}

/* ============================================================ */
/* MOBILE                                                       */
/* ============================================================ */

function MobileShowcase({ projects }: { projects: Project[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative py-16 overflow-hidden">
      {/* Eyebrow */}
      <div className="text-center mb-8 px-6">
        <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-primary mb-3">
          <span className="w-6 h-px bg-primary" /> Showcase{" "}
          <span className="w-6 h-px bg-primary" />
        </div>
        <h2 className="text-2xl font-bold leading-tight">
          Apps shipped to production
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          Swipe to explore live App Store releases
        </p>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex-[0_0_88%] min-w-0 px-2 first:pl-6 last:pr-6"
            >
              <MobileShowcaseCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination + arrows */}
      <div className="flex items-center justify-center gap-6 mt-6 px-6">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={selectedIndex === 0}
          className="p-2 rounded-full bg-secondary/60 border border-white/5 text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5">
          {projects.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === selectedIndex
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-white/20"
              }`}
              aria-label={`Go to ${i + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          disabled={selectedIndex === projects.length - 1}
          className="p-2 rounded-full bg-secondary/60 border border-white/5 text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function MobileShowcaseCard({ project }: { project: Project }) {
  const firstScreenshot = project.appStore?.screenshots?.[0];

  return (
    <div className="glass-card rounded-3xl p-5 flex flex-col gap-5 h-full">
      {/* App identity row */}
      <div className="flex items-center gap-3">
        {project.appStore?.icon && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.appStore.icon}
            alt=""
            className="w-12 h-12 rounded-2xl border border-white/10 shadow"
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-foreground truncate">
            {project.name}
          </h3>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary">
              {project.category}
            </span>
            {project.appStore?.rating ? (
              <span className="inline-flex items-center gap-0.5 text-[10px] text-amber-300">
                <Star className="w-2.5 h-2.5 fill-amber-300" />
                {project.appStore.rating.toFixed(1)}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {/* Phone preview */}
      {firstScreenshot && (
        <div className="flex justify-center">
          <div className="relative w-[180px] aspect-[9/19.5]">
            <div className="absolute inset-0 -z-10 bg-primary/20 blur-[60px] rounded-full" />
            <div className="relative w-full h-full rounded-[2rem] border-[8px] border-white/10 bg-black shadow-xl shadow-primary/20 overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-b-xl z-10 border-x border-b border-white/5" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={firstScreenshot}
                alt={`${project.name} screenshot`}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          </div>
        </div>
      )}

      {/* Description */}
      {project.tagline && (
        <p className="text-sm text-foreground/80 font-medium text-center">
          {project.tagline}
        </p>
      )}
      <p className="text-xs text-muted-foreground leading-relaxed">
        {project.description}
      </p>

      {/* Tech */}
      {project.technologies && (
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-[10px] font-mono bg-white/5 border border-white/10 rounded text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {project.storeLink && (
        <a
          href={project.storeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm shadow-lg shadow-primary/25"
        >
          View on App Store
          <ArrowUpRight className="w-4 h-4" />
        </a>
      )}
    </div>
  );
}

/* ============================================================ */
/* DESKTOP — sticky scroll showcase                             */
/* ============================================================ */

function DesktopShowcase({ slides }: { slides: ShowcaseSlide[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.35,
  });
  const phoneY = useTransform(smoothProgress, [0, 1], [-12, 12]);
  const glow1X = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const glow2X = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (slides.length === 0) return;
    const raw = v * slides.length;
    const idx = Math.min(slides.length - 1, Math.max(0, Math.floor(raw)));
    if (idx !== activeIndex) setActiveIndex(idx);
  });

  const current = slides[activeIndex];
  const currentProject = current.project;

  return (
    <section
      ref={ref}
      className="relative"
      style={{ height: `${slides.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-grid-fade pointer-events-none" />
        <motion.div
          style={{ x: glow1X }}
          className="absolute top-1/3 -left-32 w-[480px] h-[480px] bg-primary/15 rounded-full blur-[140px] opacity-60 pointer-events-none"
        />
        <motion.div
          style={{ x: glow2X }}
          className="absolute bottom-1/4 -right-32 w-[520px] h-[520px] bg-teal-500/10 rounded-full blur-[160px] opacity-60 pointer-events-none"
        />

        <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center z-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary">
            <span className="w-8 h-px bg-primary" /> Showcase{" "}
            <span className="w-8 h-px bg-primary" />
          </div>
          <h2 className="text-3xl font-bold mt-2">
            Apps shipped to production
          </h2>
        </div>

        <div className="absolute top-28 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
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

        <div className="relative max-w-7xl mx-auto px-12 w-full grid grid-cols-12 gap-16 items-center">
          <div className="col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
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

                <h3 className="text-5xl xl:text-6xl font-bold mb-3 leading-[1.05]">
                  <span className="text-gradient">{currentProject.name}</span>
                </h3>

                {currentProject.tagline && (
                  <p className="text-xl text-foreground/85 mb-5 font-medium">
                    {currentProject.tagline}
                  </p>
                )}

                <p className="text-base text-muted-foreground leading-relaxed mb-6 max-w-xl">
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

                {currentProject.technologies && (
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

          <div className="col-span-5 flex justify-center">
            <motion.div
              style={{ y: phoneY }}
              className="relative w-[280px] aspect-[9/19.5]"
            >
              <div className="absolute inset-0 -z-10 bg-primary/25 blur-[110px] rounded-full" />

              <div className="relative w-full h-full rounded-[3rem] border-[10px] border-white/10 bg-black shadow-2xl shadow-primary/30 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-30 border-x border-b border-white/5" />

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

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/60 tracking-widest uppercase flex items-center gap-2">
          <span>Scroll to explore</span>
          <span className="text-primary">→</span>
        </div>
      </div>
    </section>
  );
}
