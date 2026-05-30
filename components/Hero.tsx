"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  MapPin,
  Phone,
  Download,
  Sparkles,
  Star,
} from "lucide-react";
import type { PersonalInfo } from "@/types/portfolio";
import type { HeroShowcaseItem } from "@/lib/portfolio-data";
import { Magnetic } from "./Magnetic";

interface HeroProps {
  data: PersonalInfo;
  showcase?: HeroShowcaseItem[];
}

export function Hero({ data, showcase = [] }: HeroProps) {
  const firstName = data.name.split(" ")[0];
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax transforms — smoothed via spring
  const rawY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const rawCopyY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const rawCopyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const rawGlowY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const rawPhoneRot = useTransform(scrollYProgress, [0, 1], [0, -8]);
  const rawScrollCueOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const phoneY = useSpring(rawY, { stiffness: 120, damping: 24, mass: 0.3 });
  const copyY = useSpring(rawCopyY, { stiffness: 120, damping: 24, mass: 0.3 });
  const phoneRot = useSpring(rawPhoneRot, {
    stiffness: 100,
    damping: 22,
    mass: 0.3,
  });

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-12 md:pt-28 md:pb-16 overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-fade pointer-events-none" />

      {/* Parallax glows */}
      <motion.div
        style={{ y: rawGlowY }}
        className="absolute top-24 -left-24 w-[480px] h-[480px] bg-primary/20 rounded-full blur-[140px] opacity-60 pointer-events-none"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -120]) }}
        className="absolute bottom-0 right-0 w-[560px] h-[560px] bg-teal-500/10 rounded-full blur-[160px] opacity-60 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full grid lg:grid-cols-12 gap-12 items-center">
        {/* Left column — copy */}
        <motion.div
          style={{ y: copyY, opacity: rawCopyOpacity }}
          className="lg:col-span-7"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for new opportunities
            <span className="opacity-60">·</span>
            <span className="inline-flex items-center gap-1 opacity-80">
              <MapPin className="w-3.5 h-3.5" /> {data.location}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-5 md:mb-6"
          >
            Hi, I&apos;m {firstName}.
            <br />
            <span className="text-gradient">{data.role}</span>
            <span className="inline-block ml-2 align-middle">
              <Sparkles className="inline w-7 h-7 md:w-9 md:h-9 text-primary animate-pulse" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base md:text-xl text-muted-foreground mb-4 leading-relaxed max-w-2xl"
          >
            {data.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-sm md:text-lg text-muted-foreground/80 mb-8 md:mb-10 leading-relaxed max-w-2xl"
          >
            3 years of shipping cross-platform apps on Google Play & the App Store —
            e-commerce, delivery, fintech, and multi-role systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center gap-3 md:gap-4 mb-8 md:mb-10"
          >
            <Magnetic>
              <a
                href="#projects"
                className="px-5 md:px-7 py-3 md:py-3.5 rounded-xl bg-primary text-primary-foreground font-medium inline-flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 text-sm md:text-base"
              >
                View My Work
                <ArrowRight className="w-4 h-4" />
              </a>
            </Magnetic>

            <Magnetic>
              <a
                href={`mailto:${data.email}`}
                className="px-5 md:px-7 py-3 md:py-3.5 rounded-xl bg-secondary text-foreground font-medium inline-flex items-center gap-2 border border-white/5 hover:border-primary/30 transition-colors text-sm md:text-base"
              >
                <Mail className="w-4 h-4" />
                Get in Touch
              </a>
            </Magnetic>

            {data.resumeUrl && (
              <a
                href={data.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-transparent text-muted-foreground font-medium inline-flex items-center gap-2 border border-white/10 hover:text-foreground hover:border-white/30 transition-all"
              >
                <Download className="w-4 h-4" />
                Resume
              </a>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap items-center gap-3"
          >
            {data.github && (
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-secondary/60 text-foreground hover:bg-white/10 hover:-translate-y-0.5 transition-all border border-white/5"
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
                className="p-3 rounded-xl bg-secondary/60 text-foreground hover:bg-white/10 hover:-translate-y-0.5 transition-all border border-white/5"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            <a
              href={`tel:${data.phone.replace(/\s/g, "")}`}
              className="px-4 py-3 rounded-xl bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all border border-white/5 inline-flex items-center gap-2 text-sm font-medium"
            >
              <Phone className="w-4 h-4" />
              {data.phone}
            </a>
          </motion.div>
        </motion.div>

        {/* Right column — phone mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ y: phoneY, rotate: phoneRot }}
          className="lg:col-span-5 hidden lg:flex justify-center relative"
        >
          <PhoneMockup name={firstName} role={data.role} showcase={showcase} />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: rawScrollCueOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/60 text-xs tracking-widest uppercase"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-muted-foreground to-transparent"
        />
      </motion.div>
    </section>
  );
}

function PhoneMockup({
  name,
  role,
  showcase,
}: {
  name: string;
  role: string;
  showcase: HeroShowcaseItem[];
}) {
  const hasShowcase = showcase.length > 0;
  const [index, setIndex] = useState(0);
  const current = hasShowcase ? showcase[index % showcase.length] : null;

  // Auto-advance the screenshot every 3.5s
  useEffect(() => {
    if (!hasShowcase) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % showcase.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [hasShowcase, showcase.length]);

  return (
    <div className="relative">
      {/* Floating tech badges */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-10 top-8 z-20 glass-card rounded-2xl px-4 py-3 flex items-center gap-2 text-sm font-medium shadow-xl"
      >
        <span className="w-2 h-2 rounded-full bg-blue-400" />
        Flutter
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute -right-8 top-32 z-20 glass-card rounded-2xl px-4 py-3 flex items-center gap-2 text-sm font-medium shadow-xl"
      >
        <span className="w-2 h-2 rounded-full bg-teal-400" />
        GetX · Bloc
      </motion.div>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -left-6 bottom-24 z-20 glass-card rounded-2xl px-4 py-3 flex items-center gap-2 text-sm font-medium shadow-xl"
      >
        <span className="w-2 h-2 rounded-full bg-amber-400" />
        Firebase
      </motion.div>

      {/* Live app info card (floats above phone) */}
      {current && (
        <motion.div
          key={`info-${current.appName}`}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute -right-6 bottom-12 z-20 glass-card rounded-2xl px-4 py-3 flex items-center gap-3 text-sm shadow-xl max-w-[200px]"
        >
          {current.icon && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={current.icon}
              alt=""
              className="w-9 h-9 rounded-xl shrink-0"
            />
          )}
          <div className="min-w-0">
            <div className="text-xs font-bold text-foreground truncate">
              {current.appName}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span className="truncate">{current.category}</span>
              {current.rating ? (
                <>
                  <span>·</span>
                  <span className="inline-flex items-center gap-0.5 text-amber-300">
                    <Star className="w-2.5 h-2.5 fill-amber-300" />
                    {current.rating.toFixed(1)}
                  </span>
                </>
              ) : null}
            </div>
          </div>
        </motion.div>
      )}

      {/* Phone frame */}
      <div className="relative w-[280px] h-[560px] rounded-[3rem] border-[10px] border-white/10 bg-black shadow-2xl shadow-primary/20 overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-30 border-x border-b border-white/5" />

        {/* Screenshot crossfade */}
        <div className="absolute inset-0 rounded-[2.25rem] overflow-hidden">
          {hasShowcase ? (
            <AnimatePresence mode="sync">
              <motion.div
                key={`${current!.appName}-${index}`}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={current!.screenshot}
                  alt={`${current!.appName} screenshot`}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                {/* Subtle bottom gradient overlay for readability if we add caption */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-teal-500/5 flex flex-col items-center justify-center gap-2 p-5">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Now Shipping
              </div>
              <div className="text-lg font-bold text-foreground">
                {name}&apos;s Apps
              </div>
              <div className="text-xs text-muted-foreground text-center">
                {role}
              </div>
            </div>
          )}

          {/* Progress dots overlay (bottom of phone) */}
          {hasShowcase && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
              {showcase.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-1 rounded-full transition-all ${
                    i === index % showcase.length
                      ? "w-6 bg-white"
                      : "w-1 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Show screenshot ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Soft glow behind phone */}
      <div className="absolute inset-0 -z-10 bg-primary/25 blur-[110px] rounded-full" />
    </div>
  );
}
