// client/src/components/Button.jsx
// One reusable button. Pass `to` for a page link, otherwise it renders a normal button.
import { Link } from "react-router-dom";

// Colour styles for each variant (gold = main, outline = secondary, dark = strong).
const variants = {
  gold: "bg-gold text-espresso hover:bg-caramel",
  outline:
    "border border-gold text-espresso hover:bg-gold hover:text-espresso dark:text-cream",
  dark: "bg-espresso text-cream hover:bg-roast dark:bg-gold dark:text-espresso dark:hover:bg-caramel",
};

// Shared look: pill shape, smooth hover, visible keyboard focus ring.
const base =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold shadow-sm transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

export default function Button({
  to,
  children,
  variant = "gold",
  type = "button",
  className = "",
  ...props
}) {
  // Unknown variant names fall back to "gold" instead of printing "undefined".
  const style = variants[variant] ?? variants.gold;
  const classes = `${base} ${style} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}