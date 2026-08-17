import { Briefcase, Code, User } from "lucide-react";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section id="about" className="py-12 mt-8 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 sm:mb-10 text-center">
          About <span className="text-primary">Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-7 items-center">
          <div className="space-y-5">
            <h3 className="text-2xl font-semibold">
              Full-Stack Developer & AI Engineer
            </h3>

            <p className="text-muted-foreground">
              I'm a Full-Stack Developer and AI Engineer focused on building
              modern web applications and AI-powered solutions. I work with
              Next.js, React, TypeScript, Python, FastAPI, and modern database
              technologies to build scalable and user-focused software.
            </p>

            <p className="text-muted-foreground">
              My current focus is Generative AI and agentic systems. I build AI
              agents and AI-powered applications using technologies such as the
              OpenAI Agents SDK, LangChain, and FastAPI, while exploring RAG,
              LLM applications, and intelligent automation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <Link
                to="mailto:myselfabdullah360@gmail.com"
                className="cosmic-button"
              >
                Email me
              </Link>

              <Link
                to="/contact"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-5 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold text-lg">
                  Full-Stack Development
                </h4>
                <p className="text-muted-foreground">
                  Building modern web applications with Next.js, React,
                  TypeScript, Python, FastAPI, Node.js, MongoDB, and PostgreSQL.
                </p>
              </div>
            </div>

            <div className="gradient-border p-5 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold text-lg">
                  Generative AI & AI Agents
                </h4>
                <p className="text-muted-foreground">
                  Building AI-powered applications and agent-based systems using
                  OpenAI Agents SDK, LangChain, FastAPI, and modern LLM
                  technologies.
                </p>
              </div>
            </div>

            <div className="gradient-border p-5 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold text-lg">
                  Backend & API Development
                </h4>
                <p className="text-muted-foreground">
                  Developing reliable REST APIs, backend services, database
                  integrations, authentication systems, and AI application
                  backends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
