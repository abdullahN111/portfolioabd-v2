"use client";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Link } from "react-router-dom";
import { navItems } from "@/data/links";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/70 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-bold text-primary hover:text-primary/80 transition-colors"
        >
          <span className="text-foreground">Abd.</span>Dev
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item, key) => (
            <Link
              key={key}
              to={item.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-foreground z-50 focus:outline-none cursor-pointer"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={cn(
          "absolute top-full left-0 w-full bg-background/95 backdrop-blur-md border-t border-border shadow-md transform transition-all duration-300 md:hidden",
          isMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center py-4 space-y-4">
          {navItems.map((item, key) => (
            <Link
              key={key}
              to={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-foreground/90 hover:text-primary transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};
