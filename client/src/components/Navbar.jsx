// =================================================================================================
// [COMMIT] refactor(navbar): Refined dark-theme palette — espresso bg, ivory text, copper accents
// RATIONALE: Gold reduced to active-pill only. Dark backgrounds use deep #13100C surface.
//            Copper (#C8956A) replaces pervasive gold for hover states for a warmer, premium feel.
// =================================================================================================

import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu as MenuIcon, X, Sun, Moon, Calendar, Phone } from "lucide-react";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/booking", label: "Booking" },
  { to: "/about", label: "Our Story" },
];

export default function Navbar({ dark, toggleDark }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-3 left-1/2 z-50 w-[94%] max-w-6xl -translate-x-1/2 sm:top-4"
    >
      {/* ── Main Navigation Ribbon ── */}
      <nav
        className={`flex items-center justify-between rounded-full border px-4 py-2 sm:px-6 sm:py-2.5 transition-all duration-300 ${
          scrolled
            ? "border-amber-900/15 bg-white/95 shadow-[0_12px_36px_rgba(139,90,43,0.14)] backdrop-blur-xl dark:border-white/[0.07] dark:bg-[#13100C]/96 dark:shadow-[0_14px_38px_rgba(0,0,0,0.75)]"
            : "border-amber-900/10 bg-white/85 shadow-[0_8px_25px_rgba(139,90,43,0.08)] backdrop-blur-md dark:border-white/[0.05] dark:bg-[#13100C]/88 dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
        }`}
      >
        {/* Brand Emblem */}
        <Link
          to="/"
          className="group flex items-center gap-3 transition-transform hover:scale-[1.02]"
          aria-label="ChaiBean Home"
        >
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber-700/30 bg-gradient-to-br from-[#edd9c0] to-[#f7eedf] shadow-sm transition-transform duration-300 group-hover:rotate-6 sm:h-11 sm:w-11 dark:border-white/10 dark:from-[#2a1a10] dark:to-[#1a0e08]">
            <img
              src="/chaibean-logo.svg"
              alt="ChaiBean Emblem"
              className="h-full w-full object-contain p-1"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center leading-tight">
              <span className="font-display text-xl font-bold tracking-tight text-stone-900 sm:text-2xl dark:text-[#EDE8DF]">
                Chai<span className="text-amber-700 dark:text-[#C8956A]">Bean</span>
              </span>
              <span className="ml-1.5 hidden rounded-full bg-amber-100 border border-amber-300/80 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-900 sm:inline-block dark:border-white/10 dark:bg-white/[0.06] dark:text-[#A09080]">
                Cafe
              </span>
            </div>
            <span className="hidden text-[8px] font-semibold uppercase tracking-[0.24em] text-amber-800/80 md:block dark:text-[#7A6A5A]">
              Artisan Roastery &amp; Chai
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.to === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(link.to);

            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                  isActive
                    ? "text-white dark:text-[#EDE8DF]"
                    : "text-stone-700 hover:text-amber-800 dark:text-[#9A8878] dark:hover:text-[#EDE8DF]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNav"
                    // Light: amber gradient pill. Dark: deep espresso with subtle ivory tint — no gold
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-800 to-amber-950 shadow-md shadow-amber-950/20 dark:bg-[#2A201A] dark:shadow-black/40"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Book Table CTA */}
          <Link
            to="/booking"
            className="hidden items-center gap-1.5 rounded-full border border-amber-800/40 bg-amber-50 px-4 py-1.5 text-xs font-bold text-amber-900 transition-all duration-200 hover:bg-amber-800 hover:text-white lg:inline-flex dark:border-white/10 dark:bg-white/[0.05] dark:text-[#C8956A] dark:hover:bg-[#2A201A] dark:hover:text-[#EDE8DF]"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Book Table</span>
          </Link>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleDark}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-900/20 bg-amber-50 text-amber-800 transition-all hover:scale-105 hover:border-amber-600 hover:bg-amber-100 sm:h-10 sm:w-10 dark:border-white/10 dark:bg-[#1C1510] dark:text-[#9A8878] dark:hover:border-[#C8956A]/40 dark:hover:bg-[#2A201A] dark:hover:text-[#EDE8DF]"
          >
            <AnimatePresence mode="wait" initial={false}>
              {dark ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-900/20 bg-amber-50 text-stone-800 transition-colors hover:text-amber-900 md:hidden dark:border-white/10 dark:bg-[#1C1510] dark:text-[#9A8878] dark:hover:text-[#EDE8DF]"
          >
            {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Slide-Down Drawer ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mt-2 overflow-hidden rounded-[2rem] border border-amber-900/15 bg-white/95 p-5 shadow-2xl backdrop-blur-2xl md:hidden dark:border-white/[0.07] dark:bg-[#13100C]/96"
          >
            {/* Status Bar */}
            <div className="mb-3 flex items-center justify-between border-b border-amber-900/10 pb-2.5 text-xs text-stone-600 dark:border-white/[0.06] dark:text-[#7A6A5A]">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Open Daily: 8:00 AM – 11:30 PM
              </span>
              <span className="font-semibold text-amber-800 dark:text-[#C8956A]">ChaiBean Cafe</span>
            </div>

            {/* Nav Links */}
            <div className="flex flex-col gap-1.5">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.to === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(link.to);

                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={`rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-amber-800 to-amber-950 text-white shadow-md dark:from-[#2A201A] dark:to-[#1C1510] dark:text-[#EDE8DF]"
                        : "text-stone-700 hover:bg-amber-100/70 hover:text-amber-900 dark:text-[#9A8878] dark:hover:bg-white/[0.05] dark:hover:text-[#EDE8DF]"
                    }`}
                  >
                    {link.label}
                  </NavLink>
                );
              })}
            </div>

            {/* Reserve CTA */}
            <div className="mt-4 border-t border-amber-900/10 pt-3 dark:border-white/[0.06]">
              <Link
                to="/booking"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-700 to-amber-900 py-3 text-center text-sm font-bold text-white shadow-md transition hover:from-amber-800 hover:to-amber-950 dark:from-[#2A201A] dark:to-[#1C1510] dark:text-[#EDE8DF] dark:border dark:border-white/[0.08]"
              >
                <Calendar className="h-4 w-4" />
                Reserve a Table
              </Link>
            </div>

            {/* Footer row */}
            <div className="mt-3 flex items-center justify-between text-[11px] text-stone-500 dark:text-[#5C504A]">
              <span>Artisan Quarter, Lane 42</span>
              <a href="tel:+923001234567" className="flex items-center gap-1 text-amber-800 hover:underline dark:text-[#C8956A]">
                <Phone className="h-3 w-3" /> Call Cafe
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
