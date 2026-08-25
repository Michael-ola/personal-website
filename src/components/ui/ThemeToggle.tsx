"use client";

import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  const toggleTheme = () => {
    const isLight = document.documentElement.classList.contains("light");
    setTheme(isLight ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="icon-button"
      aria-label="Switch color theme"
      title="Switch color theme"
    >
      <FiMoon className="theme-action-light h-4 w-4" />
      <FiSun className="theme-action-dark h-4 w-4" />
    </button>
  );
}
