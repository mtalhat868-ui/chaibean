import { useEffect, useMemo, useState } from "react";
import MenuCard from "../components/MenuCard";
import SectionTitle from "../components/SectionTitle";

const CATEGORIES = ["All", "Coffee", "Chai", "Cold Drinks", "Snacks"];

const FALLBACK_MENU = [
  { name: "Espresso", category: "Coffee", price: 350, description: "Rich and bold single shot" },
  { name: "Cappuccino", category: "Coffee", price: 450, description: "Espresso with silky steamed milk foam" },
  { name: "Caramel Latte", category: "Coffee", price: 550, description: "Smooth latte with caramel drizzle" },
  { name: "Iced Americano", category: "Coffee", price: 400, description: "Chilled espresso over ice" },
  { name: "Doodh Patti", category: "Chai", price: 200, description: "Classic creamy milk tea" },
  { name: "Kadak Chai", category: "Chai", price: 180, description: "Strong, dark and full of flavour" },
  { name: "Kashmiri Chai", category: "Chai", price: 350, description: "Pink tea with nuts and cream" },
  { name: "Masala Chai", category: "Chai", price: 250, description: "Spiced tea with cardamom and ginger" },
  { name: "Mint Mojito", category: "Cold Drinks", price: 380, description: "Fresh mint, lime and soda" },
  { name: "Cold Coffee", category: "Cold Drinks", price: 480, description: "Blended coffee with ice cream" },
  { name: "Chicken Sandwich", category: "Snacks", price: 500, description: "Grilled chicken with creamy sauce" },
  { name: "Samosa Plate", category: "Snacks", price: 250, description: "Crispy samosas with chutney" },
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
  const [status, setStatus] = useState("loading");
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadMenu() {
      try {
        const res = await fetch("/api/menu");
        if (!res.ok) throw new Error("Could not load the menu.");
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Menu data was not valid.");
        if (!cancelled) {
          setItems(data.filter(isMenuItem));
          setUsingFallback(false);
          setStatus("ready");
        }
      } catch {
        if (!cancelled) {
          setItems(FALLBACK_MENU);
          setUsingFallback(true);
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
    if (category === "All") return items;
    return items.filter((item) => item.category === category);
  }, [items, category]);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-10">
      <SectionTitle
        eyebrow="The board"
        title="Our Menu"
        subtitle="Coffee, kadak chai, cold drinks, and snacks — pulled fresh from the kitchen."
      />

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setCategory(name)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              category === name
                ? "bg-gold text-espresso shadow-sm"
                : "border border-gold/20 bg-latte text-roast hover:bg-gold/30 dark:bg-roast dark:text-cream"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {usingFallback && (
        <p className="mt-6 text-center text-sm text-caramel">
          Showing the house menu while the kitchen API is offline.
        </p>
      )}

      {status === "loading" && (
        <p className="mt-16 text-center text-roast/70 dark:text-cream/70">
          Warming the kettle…
        </p>
      )}

      {status === "ready" && visible.length === 0 && (
        <p className="mt-16 text-center text-roast/70 dark:text-cream/70">
          Nothing on this list yet. Seed the menu from the server to fill it.
        </p>
      )}

      {status === "ready" && visible.length > 0 && (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, index) => (
            <MenuCard key={item._id || item.name} item={item} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}
