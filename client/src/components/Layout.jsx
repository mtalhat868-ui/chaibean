import { useState, useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  // Dark mode starts from the saved choice, if any
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  // Apply the dark class to the page and save the choice
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="flex min-h-screen flex-col bg-cream bg-[radial-gradient(circle_at_top,_rgba(212,162,74,0.16),_transparent_36%)] text-espresso dark:bg-espresso dark:text-cream">
      <Navbar dark={dark} toggleDark={() => setDark((d) => !d)} />
      <main className="flex-1 pt-24">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}