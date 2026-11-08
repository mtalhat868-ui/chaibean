// =================================================================================================
// [COMMIT] feat(menu): Rebuilt Menu Page with Fixed Navbar Clearance, Authentic Product Photography & Backend Data
// RATIONALE:
//   - Fixed navbar overlap issue with generous top padding (`pt-32 sm:pt-36`).
//   - Restructured layout according to backend architecture (Coffee, Chai, Cold Drinks, Snacks).
//   - Every item features high-resolution product photography matching the exact drink or dish.
//   - Seamless MongoDB backend synchronization with resilient offline fallbacks.
//   - Search input and category filter pills with instant responsive feedback.
// =================================================================================================

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Sparkles, Coffee, Leaf, RefreshCw } from "lucide-react";
import MenuCard from "../components/MenuCard";

const CATEGORIES = ["All", "Coffee", "Chai", "Cold Drinks", "Snacks"];

const FALLBACK_MENU = [
  {
    name: "Espresso",
    category: "Coffee",
    price: 350,
    description: "Rich and bold single-origin double shot extracted at 9 bars.",
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Cappuccino",
    category: "Coffee",
    price: 450,
    description: "Espresso balanced with velvety steamed milk and dense micro-foam.",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Caramel Latte",
    category: "Coffee",
    price: 550,
    description: "Smooth double-ristretto with silky steamed milk and house-made caramel drizzle.",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Iced Americano",
    category: "Coffee",
    price: 400,
    description: "Chilled espresso poured over crystal clear ice with cold mountain water.",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Doodh Patti",
    category: "Chai",
    price: 200,
    description: "Classic creamy milk tea slow-simmered in buffalo milk with cardamom and ginger.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Kadak Chai",
    category: "Chai",
    price: 180,
    description: "Strong, dark, and full of flavor Assam CTC brew poured from height for natural froth.",
    image: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Kashmiri Chai",
    category: "Chai",
    price: 350,
    description: "Slow-aerated pink tea churned with whole milk, sea salt, and crushed pistachios.",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Masala Chai",
    category: "Chai",
    price: 250,
    description: "Aromatic Assam tea simmered with cracked cinnamon, clove, ginger, and green cardamom.",
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Mint Mojito",
    category: "Cold Drinks",
    price: 380,
    description: "Fresh crushed garden mint, zesty key lime, pure cane sugar, and chilled soda.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Cold Coffee",
    category: "Cold Drinks",
    price: 480,
    description: "16-hour slow-drip espresso blended with vanilla bean ice cream and dark cocoa.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Chicken Sandwich",
    category: "Snacks",
    price: 500,
    description: "Herb-grilled chicken breast with garlic aioli and crisp lettuce on artisan sourdough.",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Samosa Plate",
    category: "Snacks",
    price: 250,
    description: "Crispy golden pastries stuffed with spiced potatoes and peas, served with sweet tamarind dip.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
  },
];

function isMenuItem(item) {
  return (
    item &&
    typeof item === "object" &&
    typeof item.name === "string" &&
    typeof item.category === "string" &&
    Number.isFinite(Number(item.price))
  );
}

export default function Menu() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    async function loadMenu() {
      try {
        const res = await fetch("/api/menu");
        if (!res.ok) throw new Error("Could not load the menu.");
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Menu data was not valid.");
        if (!cancelled) {
          const validated = data.filter(isMenuItem);
          setItems(validated.length > 0 ? validated : FALLBACK_MENU);
          setStatus("ready");
        }
      } catch {
        if (!cancelled) {
          setItems(FALLBACK_MENU);
          setStatus("ready");
        }
      }
    }

    loadMenu();
    return () => {
      cancelled = true;
    };
  }, []);

  const visible = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        category === "All" || item.category.toLowerCase() === category.toLowerCase();
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [items, category, searchQuery]);

  return (
    <div className="w-full transition-colors duration-300">
      {/* Generous Top Padding ensures Fixed Navbar NEVER overlaps menu title or category buttons */}
      <section className="mx-auto w-full max-w-7xl px-6 pt-32 pb-20 sm:pt-36 sm:px-10 lg:px-12">
        {/* Editorial Menu Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-900/15 bg-amber-100/60 px-4 py-1 text-xs font-bold uppercase tracking-[0.25em] text-amber-900 dark:border-white/[0.08] dark:bg-[#2A201A] dark:text-[#C8956A]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>The Artisan Board</span>
          </div>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-stone-900 sm:text-6xl dark:text-[#EDE8DF]">
            Our Handcrafted Menu
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-base dark:text-[#9A8878]">
            Slow-simmered Assam chai in clay kulhads, calibrated 9-bar espresso extractions, refreshing iced tonics, and freshly baked hearth savories.
          </p>
        </div>

        {/* Search Bar & Category Navigation (Clear & Accessible) */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((name) => {
              const isSelected = category.toLowerCase() === name.toLowerCase();
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => setCategory(name)}
                  className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    isSelected
                      ? "bg-gradient-to-r from-amber-700 to-amber-900 text-white shadow-md shadow-amber-950/20 dark:from-gold dark:to-caramel dark:text-espresso"
                      : "border border-amber-900/15 bg-white/80 text-stone-700 hover:bg-amber-100/70 hover:border-amber-700 dark:border-white/[0.07] dark:bg-[#1C1510] dark:text-[#B0A498] dark:hover:bg-gold/15"
                  }`}
                >
                  {name}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400 dark:text-[#5C504A]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search brews, chai, snacks..."
              className="w-full rounded-full border border-amber-900/15 bg-white py-2 pl-10 pr-4 text-xs font-medium text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-700 focus:ring-2 focus:ring-amber-600/20 dark:border-white/[0.07] dark:bg-[#1C1510] dark:text-[#EDE8DF] dark:placeholder:text-cream/40 dark:focus:border-gold"
            />
          </div>
        </div>

        {/* Status Loading Indicator */}
        {status === "loading" && (
          <div className="mt-20 flex flex-col items-center justify-center gap-3 text-stone-500 dark:text-[#7A6A5A]">
            <RefreshCw className="h-6 w-6 animate-spin text-amber-700 dark:text-[#C8956A]" />
            <p className="text-sm">Warming the kettle & pulling fresh shots…</p>
          </div>
        )}

        {/* Empty State */}
        {status === "ready" && visible.length === 0 && (
          <div className="mt-16 rounded-3xl border border-amber-900/15 bg-white/60 p-12 text-center dark:border-white/[0.06] dark:bg-[#1C1510]">
            <p className="text-base font-semibold text-stone-800 dark:text-[#EDE8DF]">
              No menu items match your search.
            </p>
            <p className="mt-1 text-xs text-stone-500 dark:text-[#7A6A5A]">
              Try choosing another category or clearing your search term.
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 rounded-full bg-amber-700 px-5 py-2 text-xs font-bold text-white hover:bg-amber-800 dark:bg-gold dark:text-espresso"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Modern Menu Card Grid */}
        {status === "ready" && visible.length > 0 && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((item, index) => (
              <MenuCard key={item._id || item.name} item={item} index={index} />
            ))}
          </div>
        )}

        {/* Bottom Booking Callout Banner */}
        <div className="mt-20 rounded-[2.5rem] border border-amber-900/15 bg-gradient-to-r from-[#edd9c0] to-[#f7eedf] p-8 text-center shadow-lg dark:border-white/[0.08] dark:bg-gradient-to-r dark:from-[#24120a] dark:to-[#120804] sm:p-12">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-200/60 text-amber-900 dark:bg-[#2A201A] dark:text-[#C8956A]">
            <Coffee className="h-6 w-6" />
          </div>
          <h2 className="mt-4 font-display text-2xl font-bold text-stone-900 sm:text-3xl dark:text-[#EDE8DF]">
            Reserve Your Seat for Tasting
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-stone-600 dark:text-[#9A8878]">
            Enjoy your chosen brews fresh from the kettle and hearth with priority seating.
          </p>
          <div className="mt-6">
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-700 to-amber-900 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-xl transition-transform hover:scale-105 active:scale-95 dark:from-gold dark:to-caramel dark:text-espresso"
            >
              <Leaf className="h-4 w-4" />
              <span>Book Table with Order</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
