import { Bot, Code2, Github, Mail, Server, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const pillars = [
  {
    icon: Code2,
    title: "Full-Stack Web Engineering",
    description:
      "Architecting fast, SEO-friendly B2B platforms, e-commerce marketplaces, and SaaS dashboards with Next.js, React, TypeScript, and Tailwind CSS.",
  },
  {
    icon: Bot,
    title: "Generative AI & Agentic Systems",
    description:
      "Designing multi-agent workflows, tool-calling pipelines, and RAG applications using the OpenAI Agents SDK, LangChain, and Python.",
  },
  {
    icon: Server,
    title: "Scalable APIs & Data Layer",
    description:
      "Building reliable backend services, authentication flows, and database architectures with FastAPI, Node.js, PostgreSQL, MongoDB, and Sanity CMS.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-16 sm:py-20 relative">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            Who I Am
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Engineering With <span className="text-primary">Purpose</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-sm sm:text-base">
            Bridging modern full-stack web craftsmanship with practical AI
            automation to deliver production-ready digital products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Narrative Card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 rounded-2xl border border-border/80 bg-card/70 backdrop-blur-sm p-6 sm:p-8 shadow-sm space-y-5 text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              Full-Stack Developer &amp; AI Engineer
            </div>

            <h3 className="text-xl sm:text-2xl font-bold leading-snug text-foreground">
              Turning complex business requirements into clean, reliable
              software.
            </h3>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              I&apos;m <strong className="text-foreground">Muhammad Abdullah</strong>,
              a developer focused on building modern web applications and
              AI-powered solutions. From global B2B export platforms and
              full-stack marketplaces to autonomous AI workflows, I care deeply
              about performance, clean architecture, and polished user
              experiences.
            </p>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              My current work centers on combining{" "}
              <span className="text-foreground font-medium">
                Next.js &amp; TypeScript
              </span>{" "}
              frontends with{" "}
              <span className="text-foreground font-medium">
                Python, FastAPI, and the OpenAI Agents SDK
              </span>{" "}
              to build software that not only looks great, but actively
              automates real-world workflows.
            </p>

            {/* Action Links including GitHub */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <Link to="/contact" className="cosmic-button px-5 py-2.5 text-sm">
                Get in Touch
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <a
                href="https://github.com/abdullahN111/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 hover:bg-secondary hover:border-primary/40 px-5 py-2.5 text-sm font-medium text-foreground transition-all"
              >
                <Github className="h-4 w-4 text-primary" />
                GitHub Profile
              </a>

              <a
                href="mailto:myselfabdullah360@gmail.com"
                className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card hover:border-primary/40 px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-all"
              >
                <Mail className="h-4 w-4 text-primary" />
                Email Me
              </a>
            </div>
          </motion.div>

          {/* Right Specialty Pillars */}
          <div className="lg:col-span-6 space-y-4">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                  className="group rounded-2xl border border-border/70 bg-card/70 backdrop-blur-sm p-5 sm:p-6 hover:border-primary/50 hover:shadow-md transition-all duration-300 text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 rounded-xl bg-primary/12 p-3 text-primary border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base sm:text-lg text-foreground mb-1.5">
                        {pillar.title}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
