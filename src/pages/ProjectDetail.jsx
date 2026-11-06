import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { projects } from "@/data/projects";
import {
  ArrowLeft,
  ExternalLink,
  Layers,
  CheckCircle2,
  Sparkles,
  Clock,
  UserCheck,
  Wrench,
  X,
  ZoomIn,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SEO } from "@/components/SEO";
import { StarBackground } from "@/components/StarBackground";

export const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const [selectedImage, setSelectedImage] = useState(null);

  if (!project) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <SEO title="Project Not Found" />
        <h1 className="text-3xl font-bold mb-3">Project Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The project case study you&apos;re looking for doesn&apos;t exist or
          has been moved.
        </p>
        <Link to="/projects" className="cosmic-button">
          <ArrowLeft className="h-4 w-4" />
          Back to All Projects
        </Link>
      </main>
    );
  }

  const galleryImages = project.gallery || project.gallary || [];

  return (
    <main className="min-h-screen pt-28 pb-20 bg-background text-foreground relative overflow-hidden">
      <SEO
        title={`${project.title} — Case Study`}
        description={project.description}
      />
      <StarBackground />

      <div className="container max-w-5xl mx-auto">
        {/* Top Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-8"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/12 text-primary border border-primary/25">
              {project.badge || project.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-500 border border-emerald-500/25">
              {project.quickInfo.status}
            </span>
          </div>
        </motion.div>

        {/* Title & CTA Header */}
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-left mb-10"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            {project.title}
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-3xl leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cosmic-button px-6 py-3 text-sm"
              >
                Visit Live Website
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </motion.header>

        {/* Browser Frame Cover Preview */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="rounded-2xl border border-border/80 bg-card/90 shadow-xl overflow-hidden mb-12"
        >
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/70 bg-secondary/50">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-xs text-muted-foreground font-mono truncate max-w-xs sm:max-w-md">
              {project.demoUrl || `abd.dev/projects/${project.slug}`}
            </span>
            <div className="w-10" />
          </div>
          <img
            src={project.image}
            alt={project.title}
            className="w-full max-h-[540px] object-cover object-top"
          />
        </motion.div>

        {/* Quick Info Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 text-left">
          <div className="rounded-2xl border border-border/70 bg-card/70 p-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              <UserCheck className="h-4 w-4 text-primary" />
              Role
            </div>
            <div className="font-bold text-foreground text-sm sm:text-base">
              {project.quickInfo.role}
            </div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card/70 p-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              <Clock className="h-4 w-4 text-primary" />
              Timeline
            </div>
            <div className="font-bold text-foreground text-sm sm:text-base">
              {project.quickInfo.duration}
            </div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card/70 p-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              <Sparkles className="h-4 w-4 text-primary" />
              Category
            </div>
            <div className="font-bold text-foreground text-sm sm:text-base">
              {project.category}
            </div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card/70 p-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              <Wrench className="h-4 w-4 text-primary" />
              Key Tools
            </div>
            <div className="font-bold text-foreground text-sm truncate">
              {project.quickInfo.tools.join(", ")}
            </div>
          </div>
        </section>

        {/* Tech Stack Pills */}
        <section className="rounded-2xl border border-border/70 bg-card/70 p-6 sm:p-8 mb-12 text-left">
          <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            Technologies &amp; Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 text-xs sm:text-sm rounded-full bg-primary/12 text-primary font-semibold border border-primary/25"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* Overview & Architecture Planning */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14 text-left">
          <section className="rounded-2xl border border-border/70 bg-card/70 p-6 sm:p-8 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Project Overview
            </h2>
            {project.overview.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="text-muted-foreground text-sm sm:text-base leading-relaxed"
              >
                {para}
              </p>
            ))}
          </section>

          <section className="rounded-2xl border border-border/70 bg-card/70 p-6 sm:p-8 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Architecture &amp; Planning
            </h2>
            {project.planning.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="text-muted-foreground text-sm sm:text-base leading-relaxed"
              >
                {para}
              </p>
            ))}
          </section>
        </div>

        {/* Challenges & Solutions */}
        <section className="mb-16 text-left">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-2">
              Problem Solving
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Challenges &amp; <span className="text-primary">Solutions</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {project.challenges.map((challenge, index) => (
              <div
                key={index}
                className="rounded-2xl border border-border/75 bg-card/75 p-6 flex flex-col justify-between space-y-4 hover:border-primary/40 transition-colors"
              >
                <div>
                  <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-md mb-2.5">
                    Challenge 0{index + 1}
                  </span>
                  <p className="text-foreground font-medium text-sm sm:text-base leading-relaxed">
                    {challenge}
                  </p>
                </div>

                <div className="border-t border-border/60 pt-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-500 mb-1.5">
                    <CheckCircle2 className="h-4 w-4" />
                    Engineering Solution
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.solutions[index]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Project Gallery (only rendered when gallery images exist) */}
        {galleryImages.length > 0 && (
          <section className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-2">
                Visual Walkthrough
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold">
                Interface <span className="text-primary">Gallery</span>
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mt-2">
                Click any screenshot to inspect the full-resolution interface.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className="group relative rounded-2xl border border-border/80 bg-card overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/50 transition-all cursor-pointer text-left"
                >
                  <img
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    loading="lazy"
                    className="w-full h-60 sm:h-64 object-cover object-top transition-transform duration-500 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3.5 py-1.5 text-xs font-semibold text-foreground shadow">
                      <ZoomIn className="h-3.5 w-3.5 text-primary" />
                      Expand View
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Navigation */}
        <div className="flex justify-center pt-4">
          <Link to="/projects" className="cosmic-button px-7 py-3">
            <ArrowLeft className="h-4 w-4" />
            Explore More Projects
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="fixed top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close preview"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              src={selectedImage}
              alt="Expanded project view"
              className="max-h-[88vh] max-w-[92vw] rounded-xl border border-white/15 shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};
