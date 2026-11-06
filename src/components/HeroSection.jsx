import { ArrowRight, Download, Github, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const stats = [
  { value: "8+", label: "Shipped Projects" },
  { value: "B2B & SaaS", label: "Production Platforms" },
  { value: "Full-Stack", label: "Next.js & FastAPI" },
  { value: "Agentic AI", label: "OpenAI SDK & RAG" },
];

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-[92vh] pt-28 pb-16 px-4 overflow-hidden"
    >
      {/* Subtle Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 sm:h-96 sm:w-96 rounded-full bg-primary/15 blur-[110px]"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container max-w-4xl mx-auto text-center z-10"
      >
        {/* Status Pill */}
        <motion.div variants={itemVariants} className="inline-flex mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available for Full-Stack &amp; AI Engineering Projects
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.12] mb-6"
        >
          Building Scalable Web Platforms &amp;{" "}
          <span className="text-gradient">Intelligent AI Systems</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8"
        >
          Hi, I&apos;m{" "}
          <strong className="text-foreground font-semibold">
            Muhammad Abdullah
          </strong>{" "}
          — a Full-Stack Developer &amp; AI Engineer crafting high-performance
          applications with{" "}
          <span className="text-foreground font-medium">
            Next.js, TypeScript, Python, FastAPI
          </span>
          , and the{" "}
          <span className="text-foreground font-medium">
            OpenAI Agents SDK
          </span>
          .
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mb-14"
        >
          <Link
            to="/projects"
            className="cosmic-button px-6 py-3 text-sm sm:text-base"
          >
            Explore Projects
            <ArrowRight className="h-4 w-4" />
          </Link>

          <a
            href="/AbdullahCV.pdf"
            download
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/80 hover:bg-secondary/80 text-foreground font-medium px-6 py-3 text-sm sm:text-base transition-all duration-200 hover:-translate-y-0.5"
          >
            <Download className="h-4 w-4 text-primary" />
            Download CV
          </a>

          <a
            href="https://github.com/abdullahN111/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/60 hover:border-primary/40 hover:text-primary text-muted-foreground font-medium px-5 py-3 text-sm sm:text-base transition-all duration-200"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </motion.div>

        {/* Highlights Strip */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-4 text-center hover:border-primary/40 transition-colors"
            >
              <div className="text-lg sm:text-xl font-bold text-foreground flex items-center justify-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>{stat.value}</span>
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
