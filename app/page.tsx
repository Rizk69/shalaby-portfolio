import { getPortfolioData } from "@/lib/portfolio-data";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { Languages } from "@/components/Languages";
import { Marquee } from "@/components/Marquee";
import { AppShowcase } from "@/components/AppShowcase";
import { Footer } from "@/components/Footer";

export default async function Portfolio() {
  const data = await getPortfolioData();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 selection:text-primary-foreground">
      <Navbar />

      <main>
        {data.personalInfo && (
          <Hero data={data.personalInfo} showcase={data.heroShowcase} />
        )}
        <About />
        <Marquee />
        <Experience data={data.experiences} />
        <AppShowcase
          projects={data.projects.filter(
            (p) => p.appStore?.screenshots && p.appStore.screenshots.length > 0
          )}
        />
        <Projects data={data.projects} />
        <Skills data={data.skills} />
        <Education data={data.education} />
        {data.personalInfo?.languages && (
          <Languages data={data.personalInfo.languages} />
        )}
      </main>

      {data.personalInfo && <Footer data={data.personalInfo} />}
    </div>
  );
}
