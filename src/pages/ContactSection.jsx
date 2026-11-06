import { Mail, MapPin, Phone, Send, Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import emailjs from "emailjs-com";
import { StarBackground } from "@/components/StarBackground";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      toast({
        title: "Failed to send message",
        description: "Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      id="contact"
      className="min-h-screen pt-28 pb-20 relative overflow-hidden"
    >
      <SEO
        title="Contact Me"
        description="Get in touch with Muhammad Abdullah for full-stack web development, B2B platform engineering, and AI agent projects."
      />
      <StarBackground />

      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary mb-3">
            Let&apos;s Collaborate
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Get In <span className="text-primary">Touch</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Have a project in mind, need a full-stack platform, or want to
            integrate AI agents into your product? Reach out below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Info Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 }}
            className="lg:col-span-5 rounded-2xl border border-border/80 bg-card/80 backdrop-blur-sm p-6 sm:p-8 space-y-6 text-left"
          >
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">
                Direct Channels
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Prefer direct email or a quick call? You can reach me any time
                through the details below.
              </p>
            </div>

            <div className="space-y-5 pt-2">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/12 text-primary border border-primary/20 shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Email
                  </h3>
                  <a
                    href="mailto:myselfabdullah360@gmail.com"
                    className="text-foreground font-medium hover:text-primary transition-colors text-sm sm:text-base break-all"
                  >
                    myselfabdullah360@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/12 text-primary border border-primary/20 shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Phone / WhatsApp
                  </h3>
                  <a
                    href="tel:+923155639870"
                    className="text-foreground font-medium hover:text-primary transition-colors text-sm sm:text-base"
                  >
                    +92 315 5639870
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/12 text-primary border border-primary/20 shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Location
                  </h3>
                  <p className="text-foreground font-medium text-sm sm:text-base">
                    Karachi, Pakistan (Remote Worldwide)
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/60 flex flex-wrap gap-3">
              <a
                href="https://github.com/abdullahN111/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/60 hover:bg-secondary px-4 py-2.5 text-xs sm:text-sm font-medium text-foreground transition-colors"
              >
                <Github className="h-4 w-4 text-primary" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/m-abdullah-nadeem/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/60 hover:bg-secondary px-4 py-2.5 text-xs sm:text-sm font-medium text-foreground transition-colors"
              >
                <Linkedin className="h-4 w-4 text-primary" />
                LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Contact Form Column */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.14 }}
            onSubmit={handleSubmit}
            className="lg:col-span-7 bg-card/85 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-border/80 shadow-sm text-left"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-6">
              Send a Message
            </h2>

            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background/80 text-sm focus:ring-2 focus:ring-primary focus:outline-none transition"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background/80 text-sm focus:ring-2 focus:ring-primary focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2"
                >
                  Project Details / Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your project, timeline, and goals..."
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background/80 text-sm focus:ring-2 focus:ring-primary focus:outline-none resize-none transition"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "cosmic-button w-full py-3.5 text-sm font-semibold rounded-xl",
                  "disabled:opacity-70 disabled:cursor-not-allowed"
                )}
              >
                {isSubmitting ? "Sending Message..." : "Send Message"}
                <Send size={16} />
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </main>
  );
};
