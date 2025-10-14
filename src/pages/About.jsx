import { Rocket, Brain } from "lucide-react";
import AboutSection from "@/components/AboutSection";
import { exploringSkills } from "@/data/skills";

export const About = () => {
  return (
    <div className="pt-18">
      <AboutSection />
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto max-w-5xl text-center space-y-5">
          <div className="flex justify-center">
            <Rocket className="h-10 w-10 text-primary mb-2" />
          </div>
          <h2 className="text-3xl font-bold">
            My <span className="text-primary">Vision & Emerging Tech</span>
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground">
            My vision is to bridge the gap between intelligent automation and
            real-world problem solving. I’m continuously exploring how AI-driven
            systems can simplify workflows, optimize business logic, and bring
            smarter web experiences to life.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-5">
            {exploringSkills.map((tech, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto max-w-4xl text-center space-y-5">
          <div className="flex justify-center">
            <Brain className="h-10 w-10 text-primary mb-2" />
          </div>
          <h2 className="text-3xl font-bold">
            Beyond <span className="text-primary">Code</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I see development as more than just writing functions it’s about
            crafting digital experiences that feel human, efficient, and
            purposeful. Every day, I challenge myself to learn one new thing,
            refine my craft, and stay curious.
          </p>
        </div>
      </section>
    </div>
  );
};
