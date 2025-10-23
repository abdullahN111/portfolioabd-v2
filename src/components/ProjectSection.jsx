import { ArrowRight, ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";

export const ProjectsSection = ({ projects, padding, display }) => {
  return (
    <section id="projects" className={`${padding} relative`}>
      <div className="container mx-auto max-w-6xl">
       <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
          My <span className="text-primary">Project Showcase</span>
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          A curated selection of my professional and personal projects each
          built with clean code, scalability, and thoughtful design. Explore how
          I bring ideas to life through full-stack development.
        </p>
        <div className="mt-6 mb-12 flex justify-center">
          <span className="h-[2px] w-24 bg-gradient-to-r from-primary/60 via-primary to-primary/60 rounded-full" />
        </div>

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
                      aria-label={project.demoUrl}
                      title={project.demoUrl}
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </Link>
                    <Link
                      to={project.githubUrl}
                      target="_blank"
                      aria-label={project.githubUrl}
                      title={project.githubUrl}
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </Link>
                  </div>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="px-3 py-2 rounded-full bg-primary text-primary-foreground font-medium text-xs hover:text-[13px] transition-all duration-300 hover:shadow-[0_0_10px_rgba(139,92,246,0.5)] hover:scale-105 active:scale-95 flex items-center gap-1"
                  >
                    View Details
                    <ArrowUpRight className="size-[18px] hover:size-5" />
                  </Link>
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
