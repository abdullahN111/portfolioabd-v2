import { Quote, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { motion } from "framer-motion";

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 sm:py-20 relative">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            Social Proof
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Client <span className="text-primary">Testimonials</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-sm sm:text-base">
            Feedback from founders, product leads, and business owners I&apos;ve
            partnered with.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="p-6 sm:p-7 bg-card/80 backdrop-blur-sm rounded-2xl border border-border/75 hover:border-primary/40 shadow-sm hover:shadow-md transition-all duration-300 relative text-left flex flex-col justify-between"
            >
              <Quote className="text-primary/15 h-9 w-9 absolute top-5 right-5" />

              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>

                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                  &ldquo;{t.message}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary font-bold text-sm border border-primary/25">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-foreground">
                    {t.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
