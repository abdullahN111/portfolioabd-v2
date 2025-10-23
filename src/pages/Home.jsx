import { HeroSection } from "@/components/HeroSection";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { ProjectsSection } from "@/components/ProjectSection";
import { SkillsSection } from "@/components/SkillsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { projects } from "@/data/projects";
import AboutSection from "@/components/AboutSection";
import { StarBackground } from "@/components/StarBackground";

const Home = () => {
  const featuredProjects = projects.slice(0, 6);
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <div>
        <StarBackground />
        <HeroSection />
        <AboutSection />
        <ProjectsSection
          projects={featuredProjects}
          padding={"py-12"}
          display={"flex"}
        />
        <SkillsSection />
        <TestimonialsSection />
      </div>

      <ScrollToTopButton />
    </main>
  );
};

export default Home;
