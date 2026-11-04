import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Coffee, Menu as MenuIcon, X, Sun, Moon } from "lucide-react";

// Page links shown in the navbar
const links = [
{ to: "/", label: "Home" },
{ to: "/menu", label: "Menu" },
{ to: "/booking", label: "Booking" },
{ to: "/about", label: "About Us" },
];

export default function Navbar({ dark, toggleDark }) {
// Controls the mobile menu: open or closed
const [open, setOpen] = useState(false);

// Styles for each link, highlighted when its page is active
const linkClass = ({ isActive }) =>
`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
isActive ? "bg-gold text-espresso" : "text-cream/80 hover:text-gold"
}`;

return (
// Navbar slides down smoothly when the page loads
<motion.header
initial={{ y: -80, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ duration: 0.6, ease: "easeOut" }}
className="fixed top-4 left-1/2 z-50 w-[92%] max-w-5xl -translate-x-1/2"
>
{/* Floating pill with a blurred glass background */}
<nav className="flex items-center justify-between rounded-full border border-white/10 bg-espresso/80 px-5 py-3 shadow-xl backdrop-blur-md">
{/* Logo: takes the user back to the home page */}
<Link to="/" className="flex items-center gap-2 text-cream">
<Coffee className="h-6 w-6 text-gold" />
<span className="font-display text-xl font-semibold">
Chai<span className="text-gold">Bean</span>
</span>
</Link>

{/* Desktop links, built with map(); hidden on mobile */}
<div className="hidden items-center gap-1 md:flex">
{links.map((l) => (
<NavLink key={l.to} to={l.to} end={l.to === "/"} className={linkClass}>
{l.label}
</NavLink>
))}
</div>

<div className="flex items-center gap-2">
{/* Round dark and light mode toggle button */}
<button
type="button"
onClick={toggleDark}
aria-label="Toggle theme"
className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-espresso transition hover:scale-110"
>
{dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
</button>

{/* Mobile menu button, visible only on small screens */}
<button
type="button"
onClick={() => setOpen(!open)}
aria-label="Open menu"
aria-expanded={open}
className="flex h-10 w-10 items-center justify-center rounded-full text-cream md:hidden"
>
{open ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
</button>
</div>
</nav>

{/* Mobile dropdown menu, shown only when open */}
{open && (
<motion.div
initial={{ opacity: 0, y: -10 }}
animate={{ opacity: 1, y: 0 }}
className="mt-2 flex flex-col gap-1 rounded-3xl border border-white/10 bg-espresso/95 p-3 backdrop-blur-md md:hidden"
>
{links.map((l) => (
<NavLink
key={l.to}
to={l.to}
end={l.to === "/"}
onClick={() => setOpen(false)}
className={linkClass}
>
{l.label}
</NavLink>
))}
</motion.div>
)}
</motion.header>
);
}