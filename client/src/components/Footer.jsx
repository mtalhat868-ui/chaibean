// =================================================================================================
// [COMMIT] refactor(footer): Refined dark-theme palette — espresso bg, ivory text, copper accents
// RATIONALE: Gold reduced to sparingly used accent only. Footer bg deepened, text uses warm ivory.
// =================================================================================================

import { Link } from "react-router-dom";
import { Coffee, Leaf, Heart, ArrowUpRight, Sparkles } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-amber-900/15 bg-[#F4EDE2] text-stone-800 transition-colors duration-300 dark:border-white/[0.07] dark:bg-[#0D0905] dark:text-[#EDE8DF]">
      {/* Upper Footer Grid */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">

          {/* Brand Column (5 cols) */}
          <div className="lg:col-span-5">
            <Link to="/" className="inline-flex items-center gap-2.5 text-stone-900 dark:text-[#EDE8DF]">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-200/60 text-amber-900 dark:bg-white/[0.06] dark:text-[#C8956A]">
                <Coffee className="h-6 w-6" />
              </span>
              <span className="font-display text-2xl font-bold tracking-tight">
                Chai<span className="text-amber-700 dark:text-[#C8956A]">Bean</span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-600 dark:text-[#9A8878]">
              An artisanal cafe where slow-roasted Colombian beans meet authentic roadside
              Kadak Chai. Simmered in brass kettles, pulled at 9 bars of pressure, and served
              with quiet warmth.
            </p>

            <div className="mt-6 flex items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-800/30 bg-amber-100/70 px-3 py-1 font-medium text-amber-900 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#9A8878]">
                <Leaf className="h-3 w-3" /> Direct-Trade Assam
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-800/30 bg-amber-100/70 px-3 py-1 font-medium text-amber-900 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#9A8878]">
                <Sparkles className="h-3 w-3" /> 100% Single Origin
              </span>
            </div>
          </div>

          {/* Quick Nav (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-base font-semibold tracking-wide text-stone-900 dark:text-[#EDE8DF]">
              Explore
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { to: "/", label: "Home Sanctuary" },
                { to: "/menu", label: "Signature Menu" },
                { to: "/booking", label: "Book a Table" },
                { to: "/about", label: "Our Roasting Story" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-stone-600 transition hover:text-amber-800 dark:text-[#7A6A5A] dark:hover:text-[#C8956A]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-base font-semibold tracking-wide text-stone-900 dark:text-[#EDE8DF]">
              Hours of Warmth
            </h4>
            <div className="mt-4 space-y-2 text-xs leading-relaxed text-stone-700 dark:text-[#7A6A5A]">
              {[
                { days: "Mon – Thu", hours: "8:00 AM – 11:00 PM" },
                { days: "Fri – Sat", hours: "8:00 AM – 12:00 AM" },
                { days: "Sunday Brunch", hours: "7:30 AM – 11:30 PM" },
              ].map(({ days, hours }, i, arr) => (
                <div
                  key={days}
                  className={`flex justify-between pb-1.5 ${i < arr.length - 1 ? "border-b border-amber-900/10 dark:border-white/[0.06]" : ""}`}
                >
                  <span>{days}</span>
                  {/* Hours use muted copper — not gold */}
                  <span className="font-medium text-amber-800 dark:text-[#C8956A]">{hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-base font-semibold tracking-wide text-stone-900 dark:text-[#EDE8DF]">
              Social Visuals
            </h4>
            <p className="mt-3 text-xs text-stone-500 dark:text-[#5C504A]">
              Browse our aesthetic moody shots, vinyl sessions, and latte pours.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:underline dark:text-[#C8956A] dark:hover:text-[#EDE8DF]"
              >
                Pinterest Moodboards <ArrowUpRight className="h-3 w-3" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:underline dark:text-[#C8956A] dark:hover:text-[#EDE8DF]"
              >
                Instagram Moments <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-amber-900/10 pt-8 text-xs text-stone-500 sm:flex-row dark:border-white/[0.06] dark:text-[#5C504A]">
          <p>© {currentYear} ChaiBean Cafe &amp; Roastery. Handcrafted with precision.</p>
          <p className="flex items-center gap-1">
            Brewed with <Heart className="h-3.5 w-3.5 text-amber-700 dark:text-[#C8956A] fill-current" /> for tea &amp; coffee devotees
          </p>
        </div>
      </div>
    </footer>
  );
}
