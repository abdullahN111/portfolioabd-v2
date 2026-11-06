import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("theme") !== "light";
  });

  useEffect(() => {
    const syncTheme = () => {
      const dark = localStorage.getItem("theme") !== "light";
      setIsDarkMode(dark);
      document.documentElement.classList.toggle("dark", dark);
    };

    syncTheme();
    window.addEventListener("theme-change", syncTheme);
    return () => window.removeEventListener("theme-change", syncTheme);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDarkMode;
    localStorage.setItem("theme", nextDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", nextDark);
    setIsDarkMode(nextDark);
    window.dispatchEvent(new Event("theme-change"));
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-secondary/60 hover:bg-secondary text-foreground transition-colors cursor-pointer"
      aria-label={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDarkMode ? (
          <motion.span
            key="sun"
            initial={{ rotate: -60, opacity: 0, scale: 0.7 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 60, opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.18 }}
          >
            <Sun className="h-4 w-4 text-amber-400" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 60, opacity: 0, scale: 0.7 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -60, opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.18 }}
          >
            <Moon className="h-4 w-4 text-indigo-600" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};
