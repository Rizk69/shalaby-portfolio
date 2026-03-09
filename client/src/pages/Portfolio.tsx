import { usePortfolio } from "@/hooks/use-portfolio";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { Footer } from "@/components/Footer";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Portfolio() {
  const { data, isLoading, error } = usePortfolio();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Loader2 className="w-12 h-12 text-primary" />
        </motion.div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6 text-center">
        <h1 className="text-4xl font-bold mb-4 text-destructive">Oops!</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          Something went wrong while loading the portfolio data. Please try again later.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 selection:text-primary-foreground">
      <Navbar />
      
      <main>
        {data.personalInfo && <Hero data={data.personalInfo} />}
        <Experience data={data.experiences} />
        <Projects data={data.projects} />
        <Skills data={data.skills} />
        <Education data={data.education} />
      </main>

      {data.personalInfo && <Footer data={data.personalInfo} />}
    </div>
  );
}
