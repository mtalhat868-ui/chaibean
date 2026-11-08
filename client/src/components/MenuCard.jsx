// =================================================================================================
// [COMMIT] feat(menu-card): Luxury Modern Menu Card with Product Photography, Uniform Proportions & Hover CTA
// RATIONALE: Replaced small icons with authentic product photography, balanced sizing, and instant order triggers.
// =================================================================================================

import { motion } from "motion/react";
import { Coffee, Leaf, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";

// Reliable high-res product photos mapped by product name
const PRODUCT_IMAGE_FALLBACKS = {
  espresso: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80",
  cappuccino: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80",
  "caramel latte": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
  "iced americano": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80",
  "doodh patti": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
  "kadak chai": "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=800&q=80",
  "kashmiri chai": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
  "masala chai": "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80",
  "mint mojito": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
  "cold coffee": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
  "chicken sandwich": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
  "samosa plate": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
};

// Generic category fallbacks
const CATEGORY_FALLBACKS = {
  coffee: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
  chai: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
  "cold drinks": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
  snacks: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
};

function getProductImage(item) {
  if (item.image && typeof item.image === "string" && item.image.startsWith("http")) {
    return item.image;
  }
  const key = (item.name || "").toLowerCase().trim();
  if (PRODUCT_IMAGE_FALLBACKS[key]) {
    return PRODUCT_IMAGE_FALLBACKS[key];
  }
  const catKey = (item.category || "").toLowerCase().trim();
  return CATEGORY_FALLBACKS[catKey] || PRODUCT_IMAGE_FALLBACKS.espresso;
}

export default function MenuCard({ item, index = 0, onOrder }) {
  const imageUrl = getProductImage(item);
  const isChai = (item.category || "").toLowerCase() === "chai";

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-amber-900/15 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-700 hover:shadow-xl dark:border-white/[0.06] dark:bg-[#1C1510] dark:hover:border-[#C8956A]/40"
    >
      {/* High-Resolution Product Image with Consistent Aspect Ratio */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/10">
        <img
          src={imageUrl}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
        />

        {/* Live MongoDB Price Badge */}
        <div className="absolute right-3.5 top-3.5 rounded-full bg-gradient-to-r from-amber-700 to-amber-900 px-3.5 py-1 text-xs font-bold text-white shadow-md dark:from-gold dark:to-caramel dark:text-espresso">
          Rs {Number(item.price)}
        </div>

        {/* Category Pill */}
        <div className="absolute left-3.5 top-3.5 inline-flex items-center gap-1 rounded-full border border-black/10 bg-white/90 px-3 py-0.5 text-[11px] font-semibold text-stone-800 backdrop-blur-md dark:border-white/20 dark:bg-black/75 dark:text-[#EDE8DF]">
          {isChai ? <Leaf className="h-3 w-3 text-emerald-600 dark:text-emerald-400" /> : <Coffee className="h-3 w-3 text-amber-700 dark:text-[#C8956A]" />}
          <span>{item.category}</span>
        </div>

        {/* Modern Hover Overlay with Clear "Order Now" Button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
          {onOrder ? (
            <button
              type="button"
              onClick={() => onOrder(item)}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-700 to-amber-900 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-105 active:scale-95 dark:from-gold dark:to-caramel dark:text-espresso"
            >
              <UtensilsCrossed className="h-3.5 w-3.5" />
              <span>Order This</span>
            </button>
          ) : (
            <Link
              to="/booking"
              state={{ prefillNote: `Table order for: ${item.name} (Rs ${item.price})` }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-700 to-amber-900 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-105 active:scale-95 dark:from-gold dark:to-caramel dark:text-espresso"
            >
              <UtensilsCrossed className="h-3.5 w-3.5" />
              <span>Order with Table</span>
            </Link>
          )}
        </div>
      </div>

      {/* Card Content & Details */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-xl font-bold text-stone-900 transition-colors group-hover:text-amber-800 dark:text-[#EDE8DF] dark:group-hover:text-[#C8956A]">
            {item.name}
          </h3>
        </div>

        {item.description && (
          <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600 line-clamp-2 dark:text-[#9A8878]">
            {item.description}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-amber-900/10 pt-3 dark:border-white/[0.05]">
          <span className="text-xs font-medium text-stone-500 dark:text-[#7A6A5A]">
            Freshly prepared
          </span>
          <Link
            to="/booking"
            state={{ prefillNote: `Table order for: ${item.name} (Rs ${item.price})` }}
            className="text-xs font-bold text-amber-800 transition-colors hover:underline dark:text-[#C8956A]"
          >
            Reserve Table →
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
