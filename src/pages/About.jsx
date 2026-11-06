import { Rocket, Brain, Github, Linkedin, ArrowUpRight } from "lucide-react";
import AboutSection from "@/components/AboutSection";
import { exploringSkills } from "@/data/skills";
import { StarBackground } from "@/components/StarBackground";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";

export const About = () => {
  return (
    <main className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      <SEO
        title="About Me"
        description="Learn more about Muhammad Abdullah — Full-Stack Developer & AI Engineer building modern web platforms and agentic AI systems in Next.js, TypeScript, Python, and FastAPI."
      />
      <StarBackground />

      <div className="container max-w-4xl mx-auto text-center pt-6 pb-2">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary mb-3"
        >
          About &amp; Philosophy
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="text-3xl sm:text-5xl font-extrabold tracking-tight"
        >
          Developer, Problem Solver &amp;{" "}
          <span className="text-gradient">AI Builder</span>
        </motion.h1>
      </div>

      <AboutSection />

      {/* Vision & Emerging Tech Section */}
      <section className="py-14 relative">
        <div className="container max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-border/80 bg-card/70 backdrop-blur-md p-8 sm:p-12 text-center space-y-6"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary border border-primary/25 mx-auto">
              <Rocket className="h-6 w-6" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold">
              Vision &amp; <span className="text-primary">Emerging Tech</span>
            </h2>

            <p className="max-w-2xl mx-auto text-muted-foreground text-sm sm:text-base leading-relaxed">
              My goal is to bridge the gap between intelligent automation and
              real-world business software. I actively explore how agentic AI
              systems, RAG pipelines, and Model Context Protocol (MCP) can
              simplify complex workflows and power smarter web experiences.
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-2.5">
              {exploringSkills.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full bg-secondary/80 border border-border/70 text-foreground text-xs sm:text-sm font-medium hover:border-primary/50 hover:text-primary transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Beyond Code + Open Source / GitHub Callout */}
      <section className="py-8">
        <div className="container max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border/80 bg-card/70 p-6 sm:p-8 text-left space-y-4"
          >
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Brain className="h-5 w-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">
              Beyond <span className="text-primary">Code</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              I view software engineering as more than writing functions —
              it&apos;s about crafting digital products that feel intuitive,
              fast, and dependable. Every project is an opportunity to refine
              system design, sharpen attention to detail, and deliver measurable
              value.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-border/80 bg-card/70 p-6 sm:p-8 text-left flex flex-col justify-between space-y-6"
          >
            <div className="space-y-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Github className="h-5 w-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold">
                Code &amp; <span className="text-primary">Open Source</span>
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                While commercial client work remains private, I regularly share
                open-source AI agent experiments, full-stack templates, and
                Python tools on my GitHub profile.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/abdullahN111/"
                target="_blank"
                rel="noopener noreferrer"
                className="cosmic-button px-5 py-2.5 text-sm"
              >
                <Github className="h-4 w-4" />
                Visit My GitHub
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/m-abdullah-nadeem/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 hover:bg-secondary px-5 py-2.5 text-sm font-medium text-foreground transition-colors"
              >
                <Linkedin className="h-4 w-4 text-primary" />
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};
