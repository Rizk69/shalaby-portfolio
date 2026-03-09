import { Github, Linkedin, Mail, Heart } from "lucide-react";
import type { PersonalInfo } from "@shared/schema";

interface FooterProps {
  data: PersonalInfo;
}

export function Footer({ data }: FooterProps) {
  return (
    <footer className="bg-background py-12 border-t border-white/5 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Get In Touch</h2>
        <p className="text-muted-foreground text-center max-w-md mb-8">
          I'm currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        
        <div className="flex gap-6 mb-12">
          {data.github && (
            <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="w-6 h-6" />
            </a>
          )}
          {data.linkedin && (
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
          )}
          <a href={`mailto:${data.email}`} className="text-muted-foreground hover:text-primary transition-colors">
            <Mail className="w-6 h-6" />
          </a>
        </div>
        
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          Built with <Heart className="w-4 h-4 text-primary fill-primary" /> by {data.name}
        </p>
      </div>
    </footer>
  );
}
