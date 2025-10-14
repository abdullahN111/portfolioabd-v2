import { ArrowDown, ArrowRight, Download } from "lucide-react";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 mt-6 sm:mt-10"
    >
      <div className="max-w-3xl mx-auto space-y-6 md:space-y-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
          <span className="block opacity-0 animate-fade-in">
            Hey there, I’m
          </span>
          <span className="block text-primary opacity-0 animate-fade-in-delay-1">
            Muhammad
          </span>
          <span className="block text-gradient opacity-0 animate-fade-in-delay-2">
            Abdullah
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-muted-foreground mx-auto max-w-2xl opacity-0 animate-fade-in-delay-3">
          I’m a passionate{" "}
          <span className="text-primary font-medium">Full-Stack Developer</span>{" "}
          crafting scalable web solutions using modern technologies. I build
          elegant front-ends and robust back-ends that deliver seamless user
          experiences.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 sm:pt-6 opacity-0 animate-fade-in-delay-4 max-w-44 sm:max-w-full mx-auto">
          <a
            href="/AbdullahResume.pdf"
            download
            className="border border-primary text-primary font-semibold px-4 py-3 rounded-lg hover:bg-primary hover:text-white transition flex items-center justify-center gap-2"
          >
            <Download className="h-4 w-4" />
            Resume
          </a>
          <a
            href="#projects"
            className="border border-primary font-semibold px-4 py-3 rounded-lg bg-primary text-white transition flex items-center justify-center gap-2"
          >
            See Projects
            <ArrowRight className="h-4 w-4 mt-1" />
          </a>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mt-2">Scroll</span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};
