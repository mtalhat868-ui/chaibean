// client/src/components/Layout.jsx
// Page shell: Navbar on top, page content in the middle, Footer at the bottom.
// Also owns the dark / light theme choice.
import { useState, useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const THEME_KEY = "theme";

// Saved choice first, then the device setting, then light.
function getInitialDark() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") return saved === "dark";
  } catch {
    // Storage can be blocked. Use the default below.
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
}

export default function Layout() {
  const [dark, setDark] = useState(getInitialDark);

  // Add or remove the "dark" class on the page when the theme changes.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Called by the Navbar toggle. Saves only when the visitor chooses.
  function toggleDark() {
    const next = !dark;
    setDark(next);
    try {
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    } catch {
      // Ignore: the choice just will not be remembered.
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF6F0] text-[#2B1810] dark:bg-[#0D0905] dark:text-[#EDE8DF]">
      <Navbar dark={dark} toggleDark={toggleDark} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}