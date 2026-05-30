"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart, MapPin, Phone, ArrowRight } from "lucide-react";
import type { PersonalInfo } from "@/types/portfolio";

interface FooterProps {
  data: PersonalInfo;
}

export function Footer({ data }: FooterProps) {
  return (
    <footer
      id="contact"
      className="relative bg-background pt-24 pb-12 border-t border-white/5 overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary mb-4">
            <span className="w-8 h-px bg-primary" /> Contact
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground leading-tight">
            Let&apos;s build the next
            <br />
            <span className="text-gradient">great mobile app</span> together.
          </h2>
          <p className="text-muted-foreground max-w-xl mb-10 leading-relaxed">
            I&apos;m currently open to new freelance and full-time opportunities.
            Whether you have a project in mind or just want to chat — drop a line.
          </p>

          <a
            href={`mailto:${data.email}`}
            className="px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium inline-flex items-center gap-2 hover:bg-primary/90 hover:-translate-y-0.5 transition-all shadow-lg shadow-primary/25 mb-10"
          >
            Say hello
            <ArrowRight className="w-4 h-4" />
          </a>

          <div className="grid sm:grid-cols-3 gap-3 w-full max-w-2xl">
            <a
              href={`mailto:${data.email}`}
              className="glass-card rounded-xl p-4 flex items-center gap-3 hover:border-primary/30 transition-colors group"
            >
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors truncate">
                {data.email}
              </span>
            </a>
            <a
              href={`tel:${data.phone.replace(/\s/g, "")}`}
              className="glass-card rounded-xl p-4 flex items-center gap-3 hover:border-primary/30 transition-colors group"
            >
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors truncate">
                {data.phone}
              </span>
            </a>
            <div className="glass-card rounded-xl p-4 flex items-center gap-3">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span className="text-sm text-muted-foreground">{data.location}</span>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            Built with <Heart className="w-4 h-4 text-primary fill-primary" /> by{" "}
            <span className="text-foreground font-medium">{data.name}</span>
          </p>

          <div className="flex gap-2">
            {data.github && (
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-secondary/60 border border-white/5 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {data.linkedin && (
              <a
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-secondary/60 border border-white/5 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            <a
              href={`mailto:${data.email}`}
              className="p-2.5 rounded-lg bg-secondary/60 border border-white/5 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
