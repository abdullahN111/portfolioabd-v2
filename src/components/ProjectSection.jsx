import { useState } from "react";
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { projectCategories } from "@/data/projects";
import { cn } from "@/lib/utils";

export const ProjectsSection = ({
  projects,
  padding = "py-16",
  display = "flex",
  showFilters = false,
  isPageHeader = false,
}) => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    showFilters && activeCategory !== "all"
      ? projects.filter((p) => p.category === activeCategory)
      : projects;

  const HeadingTag = isPageHeader ? "h1" : "h2";

  return (
    <section id="projects" className={cn("relative", padding)}>
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-12"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            Selected Work
          </span>
          <HeadingTag className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Featured <span className="text-primary">Projects</span>
          </HeadingTag>
          <p className="text-muted-foreground mt-3 text-sm sm:text-base leading-relaxed">
            A curated showcase of commercial client platforms, full-stack web
            applications, and intelligent AI agent systems.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        {showFilters && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {projectCategories.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "relative px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer",
                    active
                      ? "text-primary-foreground"
                      : "bg-secondary/60 text-muted-foreground hover:text-foreground border border-border/60"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="project-filter-pill"
                      className="absolute inset-0 rounded-full bg-primary -z-10 shadow-sm"
                      transition={{
                        type: "spring",
                        stiffness: 360,
                        damping: 28,
                      }}
                    />
                  )}
                  {cat.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.article
                layout
                key={project.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="group flex flex-col rounded-2xl border border-border/80 bg-card/80 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/45 transition-all duration-300 h-full text-left"
              >
                {/* Cover Image with Badge Overlay */}
                <Link
                  to={`/projects/${project.slug}`}
                  className="relative block h-48 sm:h-52 overflow-hidden bg-secondary/40"
                >
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-background/90 backdrop-blur-md text-foreground border border-border/70 shadow-xs">
                      {project.badge || project.category}
                    </span>
                    <span
                      className={cn(
                        "px-2.5 py-0.5 rounded-full text-[11px] font-medium backdrop-blur-md border",
                        project.quickInfo?.status === "Completed"
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                          : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                      )}
                    >
                      {project.quickInfo?.status}
                    </span>
                  </div>
                </Link>

                {/* Card Body */}
                <div className="flex flex-col flex-grow p-5 sm:p-6">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 text-[11px] font-medium rounded-md bg-secondary/80 text-secondary-foreground/90 border border-border/50"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-secondary/50 text-muted-foreground">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>

                  <Link to={`/projects/${project.slug}`}>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </Link>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex-grow" />

                  {/* Footer Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/60">
                    {project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live Website
                      </a>
                    ) : (
                      <span className="text-xs font-medium text-muted-foreground/70">
                        Backend / CLI Architecture
                      </span>
                    )}

                    <Link
                      to={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1 rounded-full bg-primary/12 hover:bg-primary text-primary hover:text-primary-foreground px-3.5 py-1.5 text-xs font-semibold transition-all duration-200"
                    >
                      Case Study
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* See All Projects Button (shown on Home page) */}
        {display !== "hidden" && (
          <div className="text-center mt-12">
            <Link
              className="cosmic-button px-7 py-3 text-sm"
              to="/projects"
            >
              View All {projects.length} Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
