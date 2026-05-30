"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Images } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface AppScreenshotsProps {
  appName: string;
  screenshots: string[];
}

export function AppScreenshots({ appName, screenshots }: AppScreenshotsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const autoplay = useRef(
    Autoplay({ delay: 2800, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: false,
      containScroll: "trimSnaps",
    },
    [autoplay.current]
  );

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

  if (!screenshots || screenshots.length === 0) return null;

  return (
    <>
      <div className="mt-5 pt-5 border-t border-white/5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium">
            Screenshots
          </span>
          <button
            type="button"
            onClick={() => setOpenIndex(selectedIndex)}
            className="text-[11px] font-medium text-primary hover:text-primary/80 inline-flex items-center gap-1 transition-colors"
          >
            <Images className="w-3.5 h-3.5" />
            View all
          </button>
        </div>

        {/* Embla fluid strip — autoplay, pause on hover, peek both sides */}
        <div className="relative -mx-2">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {screenshots.map((src, i) => (
                <div
                  key={i}
                  className="flex-[0_0_38%] min-w-0 pl-2 pr-2"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(i)}
                    className="group relative w-full aspect-[9/19] rounded-xl overflow-hidden border border-white/10 bg-secondary/40 hover:border-primary/40 transition-all"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`${appName} screenshot ${i + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Edge fades — feels fluid */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-card/70 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-card/70 to-transparent" />
        </div>

        {/* Progress dots */}
        {screenshots.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {screenshots.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-1 rounded-full transition-all ${
                  i === selectedIndex
                    ? "w-5 bg-primary"
                    : "w-1 bg-white/15 hover:bg-white/30"
                }`}
                aria-label={`Go to screenshot ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <ScreenshotLightbox
            appName={appName}
            screenshots={screenshots}
            startIndex={openIndex}
            onClose={() => setOpenIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

interface LightboxProps {
  appName: string;
  screenshots: string[];
  startIndex: number;
  onClose: () => void;
}

function ScreenshotLightbox({
  appName,
  screenshots,
  startIndex,
  onClose,
}: LightboxProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    startIndex,
    align: "center",
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(startIndex);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") scrollPrev();
      if (e.key === "ArrowRight") scrollNext();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, scrollPrev, scrollNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[80] bg-background/85 backdrop-blur-2xl flex flex-col"
      onClick={onClose}
      role="dialog"
      aria-label={`${appName} screenshots`}
    >
      {/* Header */}
      <div
        className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/5"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            Showcase
          </div>
          <div className="text-lg md:text-xl font-bold text-foreground">
            {appName}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground font-mono tabular-nums">
            {String(selectedIndex + 1).padStart(2, "0")}{" "}
            <span className="opacity-50">
              / {String(screenshots.length).padStart(2, "0")}
            </span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg bg-secondary/60 border border-white/5 text-foreground hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        className="relative flex-1 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="embla h-full" ref={emblaRef}>
          <div className="flex h-full">
            {screenshots.map((src, i) => (
              <div
                key={i}
                className="flex-[0_0_100%] min-w-0 h-full flex items-center justify-center p-6 md:p-10"
              >
                <PhoneFrame>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${appName} screenshot ${i + 1}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </PhoneFrame>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <button
          type="button"
          onClick={scrollPrev}
          disabled={selectedIndex === 0}
          className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-secondary/80 border border-white/10 backdrop-blur-md text-foreground items-center justify-center hover:bg-primary hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          disabled={selectedIndex === screenshots.length - 1}
          className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-secondary/80 border border-white/10 backdrop-blur-md text-foreground items-center justify-center hover:bg-primary hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots */}
      <div
        className="relative z-10 flex items-center justify-center gap-2 py-5"
        onClick={(e) => e.stopPropagation()}
      >
        {screenshots.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === selectedIndex
                ? "w-8 bg-primary"
                : "w-1.5 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to screenshot ${i + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full max-h-[80vh] aspect-[9/19.5]">
      <div className="absolute inset-0 rounded-[3rem] border-[10px] border-white/10 bg-black shadow-2xl shadow-primary/20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-10 border-x border-b border-white/5" />
        <div className="w-full h-full overflow-hidden rounded-[2.25rem]">
          {children}
        </div>
      </div>
    </div>
  );
}
