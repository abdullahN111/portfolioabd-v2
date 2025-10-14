import { Quote, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 bg-muted/10 relative">
      <div className="container mx-auto max-w-5xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Client <span className="text-primary">Testimonials</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 bg-card rounded-2xl shadow-sm border border-border hover:shadow-md transition-all duration-300 relative"
            >
              <Quote className="text-primary absolute top-4 right-4 opacity-20" />

              <h4 className="font-semibold text-lg">{t.name}</h4>
              <p className="text-sm text-muted-foreground mb-3">{t.role}</p>

              <p className="text-muted-foreground mb-4 leading-relaxed">
                {t.message}
              </p>

              <div className="flex">
                {[...Array(t.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
