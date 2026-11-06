import { Link } from "react-router-dom";
import { navItems, socialLinks } from "@/data/links";
import { Mail, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative mt-20 border-t border-border/80 bg-card/60 backdrop-blur-md">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="container max-w-6xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-border/60 text-left">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 text-xl font-bold tracking-tight"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary font-extrabold text-sm border border-primary/30">
                A
              </span>
              <span>
                <span className="text-foreground">Abd</span>
                <span className="text-primary">.Dev</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Full-Stack Developer &amp; AI Engineer building scalable web
              platforms, commercial B2B products, and autonomous agentic
              systems.
            </p>
            <div className="flex items-center gap-4 pt-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                Karachi, Pakistan
              </span>
              <a
                href="mailto:myselfabdullah360@gmail.com"
                className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-primary" />
                myselfabdullah360@gmail.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & GitHub Column */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Connect &amp; Code
            </h3>
            <p className="text-sm text-muted-foreground">
              Explore my open-source repositories, AI agent experiments, or
              reach out for collaborations.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="group flex h-10 w-10 items-center justify-center rounded-xl border border-border/80 bg-secondary/60 hover:bg-primary hover:border-primary text-foreground hover:text-primary-foreground transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Muhammad Abdullah (Abd.Dev). All
            rights reserved.
          </p>
          <p>Built with React, Tailwind CSS &amp; Framer Motion</p>
        </div>
      </div>
    </footer>
  );
};
