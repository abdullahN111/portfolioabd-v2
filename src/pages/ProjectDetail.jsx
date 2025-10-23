import { useParams, Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { Settings, Info } from "lucide-react";

export const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold mb-2">Project Not Found</h1>
        <Link
          to="/projects"
          className="text-primary underline hover:text-primary/80 transition"
        >
          Go Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen my-20 sm:my-24 space-y-8 bg-background text-foreground">
      <section className="relative w-full h-[55vh] sm:h-[60vh] md:h-[70vh] mb-12">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover object-center brightness-90"
          style={{ imageRendering: "auto" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        <div className="relative z-10 flex flex-col justify-end h-full px-4 sm:px-6 md:px-16 pb-8 sm:pb-10 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-[40px] font-bold mb-4 leading-tight">
            {project.title}
          </h1>

          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {project.demoUrl && (
              <Link
                to={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cosmic-button px-4 sm:px-6 py-2 text-[15px]"
              >
                Live Demo
              </Link>
            )}
            {project.githubUrl && (
              <Link
                to={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-6 py-2 text-[15px] rounded-full bg-card border border-border text-foreground font-medium transition-all hover:shadow-lg hover:scale-105"
              >
                GitHub
              </Link>
            )}
          </div>
        </div>
      </section>

      <div className="container max-w-5xl mx-auto px-4">
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Overview</h2>
          <p className="text-muted-foreground leading-relaxed">
            {project.overview}
          </p>
          <div className="mt-6 mb-12 flex justify-center">
            <span className="h-[2px] w-24 bg-gradient-to-r from-primary/60 via-primary to-primary/60 rounded-full" />
          </div>
        </section>

        <section className="mb-12 flex flex-col gap-8 items-center max-w-2xl mx-auto">
          <div className="bg-card/30 py-8 px-4 sm:px-6 rounded-2xl border border-border/40 shadow-sm hover:shadow-md transition-all duration-300 w-full flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Settings className="size-5 text-primary mt-1" />
              <span>Tech Stack</span>
            </h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs md:text-sm rounded-full bg-gradient-to-r from-primary/20 to-primary/10 text-primary font-medium border border-primary/30 hover:scale-105 transition-transform"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-card/30 py-8 px-4 sm:px-6 rounded-2xl border border-border/40 shadow-sm hover:shadow-md transition-all duration-300 w-full flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Info className="size-5 text-primary mt-1" />
              <span>Quick Info</span>
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <strong className="text-foreground">Duration:</strong>{" "}
                {project.quickInfo.duration || "2 weeks"}
              </li>
              <li>
                <strong className="text-foreground">Role:</strong>{" "}
                {project.quickInfo.role || "Full Stack Developer"}
              </li>
              <li>
                <strong className="text-foreground">Tools Used:</strong>{" "}
                {project.quickInfo.tools.join(", ")}
              </li>
              <li>
                <strong className="text-foreground">Status:</strong>{" "}
                <span className="text-green-500 font-semibold">
                  {project.quickInfo.status}
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Project Planning</h2>
          <p className="text-muted-foreground leading-relaxed text-[15px]">
            {project.planning}
          </p>
          <div className="mt-6 mb-12 flex justify-center">
            <span className="h-[2px] w-24 bg-gradient-to-r from-primary/60 via-primary to-primary/60 rounded-full" />
          </div>
          <img
            src={project.image}
            alt="Planning phase"
            className="rounded-lg shadow-md my-6 w-full object-cover object-center"
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Challenges & Solutions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.challenges.map((challenge, index) => (
              <div
                key={index}
                className="bg-card/30 p-4 sm:p-6 rounded-2xl border border-border/40 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <h3 className="text-lg font-semibold mb-2 text-primary">
                  Challenge {index + 1}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {challenge}
                </p>
                <div className="border-t border-border/40 pt-3">
                  <h4 className="font-semibold text-foreground mb-1">
                    Solution
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.solutions[index]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
            <p className="text-muted-foreground leading-relaxed">
              Collection of screenshots showcasing some features and
              functionalities of the project.
            </p>
            <div className="mt-6 mb-12 flex justify-center">
              <span className="h-[2px] w-24 bg-gradient-to-r from-primary/60 via-primary to-primary/60 rounded-full" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto px-4 sm:px-8">
            {project.gallary.map((image, index) => (
              <img
                key={index}
                src={image}
                className="rounded-lg shadow-md object-cover w-full"
              />
            ))}
          </div>
        </section>

        <div className="flex justify-center">
          <Link
            to="/projects"
            className="cosmic-button text-center inline-block"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    </div>
  );
};
