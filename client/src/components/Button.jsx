import { Link } from "react-router-dom";

const variants = {
  gold: "bg-gold text-espresso hover:bg-caramel",
  outline:
    "border border-gold text-espresso hover:bg-gold dark:text-cream dark:hover:text-espresso",
  dark: "bg-espresso text-cream hover:bg-roast dark:bg-gold dark:text-espresso dark:hover:bg-caramel",
};

export default function Button({
  to,
  children,
  variant = "gold",
  type = "button",
  className = "",
  ...props
}) {
  const classes = `inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold shadow-sm transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`;

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
