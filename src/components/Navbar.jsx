import { cn } from "@/lib/utils";
import { Menu, X, ArrowUpRight, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Link, useLocation } from "react-router-dom";
import { navItems, socialLinks } from "@/data/links";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "py-3" : "py-4 sm:py-5"
        )}
      >
        <div className="container">
          <nav
            aria-label="Main navigation"
            className={cn(
              "flex items-center justify-between rounded-2xl px-4 sm:px-6 py-2.5 transition-all duration-300",
              isScrolled || isMenuOpen
                ? "bg-card/85 backdrop-blur-xl border border-border/80 shadow-lg shadow-black/5"
                : "bg-card/40 backdrop-blur-md border border-border/40"
            )}
          >
            {/* Brand Logo */}
            <Link
              to="/"
              className="group flex items-center gap-2.5 text-lg sm:text-xl font-bold tracking-tight"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary font-extrabold text-sm border border-primary/30 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                A
              </span>
              <span>
                <span className="text-foreground">Abd</span>
                <span className="text-primary">.Dev</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 rounded-full bg-secondary/50 p-1 border border-border/50">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200",
                      active
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="desktop-nav-pill"
                        className="absolute inset-0 rounded-full bg-primary -z-10 shadow-sm"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Right Actions */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <Link
                to="/contact"
                className="cosmic-button px-4 py-2 text-xs sm:text-sm"
              >
                Let&apos;s Talk
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-secondary/60 text-foreground hover:bg-secondary transition-colors cursor-pointer"
                aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Drawer + Backdrop */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed top-[4.5rem] left-4 right-4 z-50 rounded-2xl bg-card/95 backdrop-blur-2xl border border-border/80 shadow-2xl p-5 md:hidden"
            >
              <div className="flex flex-col space-y-1.5">
                {navItems.map((item, idx) => {
                  const active = isActive(item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                          "flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors",
                          active
                            ? "bg-primary/15 text-primary border border-primary/25"
                            : "text-foreground/85 hover:bg-secondary/70 hover:text-foreground"
                        )}
                      >
                        <span>{item.name}</span>
                        {active && (
                          <span className="h-2 w-2 rounded-full bg-primary" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="my-4 h-px bg-border/70" />

              {/* Mobile CTA Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="/AbdullahCV.pdf"
                  download
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary/60 px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                >
                  <Download className="h-4 w-4 text-primary" />
                  Resume
                </a>
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm"
                >
                  Let&apos;s Talk
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Social Links Row */}
              <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">
                  Connect with me
                </span>
                <div className="flex items-center gap-2">
                  {socialLinks.map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/70 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
