import { useState } from "react";
import { cn } from "@/lib/utils";
import { skills, categories } from "@/data/skills";
import { motion, AnimatePresence } from "framer-motion";

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("frontend");

  const filteredSkills = skills.filter(
    (skill) => skill.category === activeCategory
  );

  return (
    <section id="expertise" className="py-16 sm:py-20 relative bg-secondary/25">
      <div className="container max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            Technical Stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Tech &amp; <span className="text-primary">Expertise</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-sm sm:text-base">
            Modern frameworks, AI SDKs, and backend tools I use to take products
            from idea to production.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-10">
          {categories.map((category) => {
            const active = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 cursor-pointer",
                  active
                    ? "text-primary-foreground"
                    : "bg-card/80 text-muted-foreground hover:text-foreground border border-border/70"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="skills-category-pill"
                    className="absolute inset-0 rounded-full bg-primary -z-10 shadow-sm"
                    transition={{ type: "spring", stiffness: 360, damping: 28 }}
                  />
                )}
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, idx) => {
              const Icon = skill.icon;
              const isDarkIcon =
                skill.color === "#000000" || skill.color === "#181717";

              return (
                <motion.div
                  layout
                  key={skill.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, delay: idx * 0.04 }}
                  className="rounded-2xl border border-border/75 bg-card/80 backdrop-blur-sm p-5 hover:border-primary/45 hover:shadow-md transition-all text-left"
                >
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/80 border border-border/60">
                        <Icon
                          color={isDarkIcon ? undefined : skill.color}
                          className={cn(isDarkIcon && "text-foreground")}
                          size={20}
                        />
                      </span>
                      <h3 className="font-bold text-base text-foreground">
                        {skill.name}
                      </h3>
                    </div>

                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                      {skill.level}%
                    </span>
                  </div>

                  <div className="w-full bg-secondary/70 h-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="bg-gradient-to-r from-primary to-violet-400 h-2 rounded-full"
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
