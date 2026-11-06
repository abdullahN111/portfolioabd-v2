import { HeroSection } from "@/components/HeroSection";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { ProjectsSection } from "@/components/ProjectSection";
import { SkillsSection } from "@/components/SkillsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { projects } from "@/data/projects";
import AboutSection from "@/components/AboutSection";
import { StarBackground } from "@/components/StarBackground";
import { SEO } from "@/components/SEO";

const Home = () => {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 6);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <SEO />
      <StarBackground />
      <HeroSection />
      <AboutSection />
      <ProjectsSection
        projects={featuredProjects}
        padding="py-16"
        display="flex"
      />
      <SkillsSection />
      <TestimonialsSection />
      <ScrollToTopButton />
    </main>
  );
};

export default Home;
