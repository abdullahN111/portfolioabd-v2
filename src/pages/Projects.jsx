import { StarBackground } from "@/components/StarBackground";
import { ProjectsSection } from "@/components/ProjectSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { projects } from "@/data/projects";

export const Projects = () => {
  return (
    <div className="space-y-8">
      <StarBackground />
  


      <ProjectsSection
        projects={projects}
        padding={"mt-36"}
        display={"hidden"}
      />
      <TestimonialsSection />
    </div>
  );
};
