import { Link } from "react-router-dom";
import { socialLinks } from "@/data/links";

export const Footer = () => {
  return (
    <footer className="relative mt-24 border-t border-border bg-card/50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <span className="text-lg font-semibold tracking-tight hover:text-primary transition-colors">
            Abd<span className="text-primary">Portfolio</span>
          </span>
          <p className="text-sm text-muted-foreground mt-1">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {
            // eslint-disable-next-line no-unused-vars
            socialLinks.map(({ href, label, Icon }) => (
              <Link
                key={label}
                to={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 hover:scale-110 hover:shadow-[0_0_10px_rgba(0,0,0,0.1)]"
              >
                <Icon
                  size={20}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5"
                />
              </Link>
            ))
          }
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/30 via-primary/70 to-primary/30"></div>
    </footer>
  );
};
