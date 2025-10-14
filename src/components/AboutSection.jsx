import { Briefcase, Code, User } from "lucide-react";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section id="about" className="py-12 mt-6 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 sm:mb-10 text-center">
          About <span className="text-primary">Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-7 items-center">
          <div className="space-y-5">
            <h3 className="text-2xl font-semibold">Full-Stack Web Developer</h3>

            <p className="text-muted-foreground">
              I'm a Full-Stack Web Developer skilled in the MERN Stack, Python
              FastAPI, Next.js, and TypeScript. I build modern, performant web
              apps that combine dynamic frontends with scalable backend systems.
            </p>

            <p className="text-muted-foreground">
              Lately, I’ve been exploring AI integration and automation using
              the OpenAI Agent SDK to build intelligent agentic systems that
              connect seamlessly with real-world tools and APIs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <Link
                to="mailto:myselfabdullah360@gmail.com"
                className="cosmic-button"
              >
                Get In Touch
              </Link>

              <Link
                to="/contact"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                Message me
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-5 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    Full-Stack Development
                  </h4>
                  <p className="text-muted-foreground">
                    Building scalable web apps with React, Next.js, Node.js,
                    FastAPI, MongoDB, Neon, and Sqlite.
                  </p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-5 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">AI & Automation</h4>
                  <p className="text-muted-foreground">
                    Integrating AI systems using OpenAI Agent SDK and automating
                    workflows.
                  </p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-5 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    Creative Problem Solving
                  </h4>
                  <p className="text-muted-foreground">
                    Turning complex technical challenges into smooth,
                    user-friendly solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
