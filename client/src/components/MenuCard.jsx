import { motion } from "motion/react";
import { Coffee } from "lucide-react";

function safeImage(url) {
  if (typeof url !== "string" || !url) return "";
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:"
      ? parsed.href
      : "";
  } catch {
    return "";
  }
}

export default function MenuCard({ item, index = 0 }) {
  const image = safeImage(item.image);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="overflow-hidden rounded-[1.75rem] border border-gold/20 bg-gradient-to-b from-latte/50 to-cream shadow-[0_12px_30px_rgba(36,20,14,0.06)] dark:from-roast/70 dark:to-espresso"
    >
      {image ? (
        <img src={image} alt="" className="h-40 w-full object-cover" />
      ) : null}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
              <Coffee className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-xl font-semibold">{item.name}</h3>
              <p className="text-xs uppercase tracking-wide text-caramel">
                {item.category}
              </p>
            </div>
          </div>
          <span className="shrink-0 font-semibold text-gold">
            Rs {Number(item.price)}
          </span>
        </div>
        {item.description && (
          <p className="mt-3 text-sm text-roast/70 dark:text-cream/70">
            {item.description}
          </p>
        )}
      </div>
    </motion.article>
  );
}
