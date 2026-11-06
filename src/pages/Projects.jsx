import { StarBackground } from "@/components/StarBackground";
import { ProjectsSection } from "@/components/ProjectSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { projects } from "@/data/projects";
import { SEO } from "@/components/SEO";

export const Projects = () => {
  return (
    <main className="min-h-screen pt-20 pb-12 relative overflow-hidden">
      <SEO
        title="Projects & Case Studies"
        description="Explore commercial client websites, B2B platforms, full-stack Next.js marketplaces, and AI agent systems built by Muhammad Abdullah."
      />
      <StarBackground />

      <ProjectsSection
        projects={projects}
        padding="pt-12 pb-16"
        display="hidden"
        showFilters={true}
        isPageHeader={true}
      />

      <TestimonialsSection />
    </main>
  );
};
