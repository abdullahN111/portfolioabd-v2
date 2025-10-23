import { useState } from "react";
import { cn } from "@/lib/utils";
import { skills, categories } from "@/data/skills";

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("frontend");

  const filteredSkills = skills.filter(
    (skill) => skill.category === activeCategory
  );
  return (
    <section id="expertise" className="py-12 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          My <span className="text-primary">Tech Stack</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 my-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 uppercase cursor-pointer",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-forefround hover:bd-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredSkills.map((skill, key) => {
            const Icon = skill.icon;

            return (
              <div
                key={key}
                className="bg-card p-4 sm:p-6 rounded-lg shadow-xs card-hover"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">{skill.name}</h3>
                  <span>
                    <Icon color={skill.color} size={22} />
                  </span>
                </div>
                <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"
                    style={{ width: skill.level + "%" }}
                  />
                </div>

                <div className="text-right mt-1">
                  <span className="text-sm text-muted-foreground">
                    {skill.level}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
