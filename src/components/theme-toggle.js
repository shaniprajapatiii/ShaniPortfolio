"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
   const [theme, setTheme] = useState("light");

   useEffect(() => {
      const stored = window.localStorage.getItem("theme");
      const initial =
         stored === "light" || stored === "dark"
            ? stored
            : window.matchMedia("(prefers-color-scheme: dark)").matches
               ? "dark"
               : "light";
      setTheme(initial);
      document.documentElement.classList.toggle("dark", initial === "dark");
      document.documentElement.style.colorScheme = initial;
   }, []);

   const toggle = () => {
      const next = theme === "dark" ? "light" : "dark";
      setTheme(next);
      document.documentElement.classList.toggle("dark", next === "dark");
      document.documentElement.style.colorScheme = next;
      window.localStorage.setItem("theme", next);
   };

   return (
      <button
         onClick={toggle}
         aria-label="Toggle theme"
         className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-background text-foreground transition-colors hover:border-ember/60 hover:text-ember shadow-xs"
      >
         {theme === "dark" ? (
            <Sun className="h-4 w-4" />
         ) : (
            <Moon className="h-4 w-4" />
         )}
      </button>
   );
}
