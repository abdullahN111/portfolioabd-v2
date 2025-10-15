import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { StarBackground } from "@/components/StarBackground";

export const ProjectsSection = ({ projects, padding, display }) => {
  return (
    <section id="projects" className={`${padding} relative`}>
      <StarBackground />
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects each one crafted with attention to
          performance, design, and user experience.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group flex flex-col bg-card rounded-lg overflow-hidden shadow-sm card-hover h-full"
            >
              <div className="h-46 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="flex flex-col flex-grow p-4 sm:p-5">
                <div className="h-16 overflow-hidden mb-2">
                  <div className="flex flex-wrap gap-[6px] sm:gap-2">
                    {project.tags.map((tag, key) => (
                      <span
                        key={key}
                        className="px-2 sm:px-3 py-1 text-xs font-medium rounded-full bg-secondary/70 text-secondary-foreground/90 border border-border/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-1 line-clamp-1 group-hover:text-primary">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex-grow" />

                <div className="flex justify-between items-center mt-auto pt-3 border-t border-border/30">
                  <div className="flex space-x-3">
                    <Link
                      to={project.demoUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </Link>
                    <Link
                      to={project.githubUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            className={`cosmic-button w-fit ${display} items-center mx-auto gap-2`}
            to="/projects"
          >
            See All Projects <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};
