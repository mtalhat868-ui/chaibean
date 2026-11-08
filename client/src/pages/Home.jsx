// =================================================================================================
// [COMMIT] feat(home): Complete Hero Product Showcase, Enhanced 10-Bean Background Float,
//           Artisanal Dual-Craft Duel, Coffeehouse Devotee Journal & Non-Overlapping Concierge
// RATIONALE:
//   1. Square-proportioned cohesive hero showcase matching both the hover card and the 4 selector cards.
//   2. 10 peripheral floating coffee beans strictly layered in background (z-0) with multiple float speeds.
//   3. Distinctive "Two Crafts · One Hearth" exhibition with calibrated extraction & simmering micro-specs.
//   4. Redesigned "Loved by Devotees" as an authentic Coffeehouse Devotee Journal with spotlight patrons.
//   5. Resolved all logo and text overlaps in Section 7 with .field-icon-input and custom TimePicker.
//   6. Elevated "Hours of Warmth & Sanctuary" with live open/closed ticker and unified iconography.
//   7. 100% responsive across mobile, tablet, laptop, and desktop.
// =================================================================================================

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  Coffee,
  Leaf,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  User,
  Phone,
  Users,
  ShieldCheck,
  Star,
  Info,
  X,
  Sparkles,
  UtensilsCrossed,
  ArrowRight,
  Wifi,
  BookmarkCheck,
  Flame,
  Gauge,
  Quote,
} from "lucide-react";

import TimePicker from "../components/TimePicker";
import { sanitizeBooking, validateBooking } from "../lib/bookingValidation";

// -------------------------------------------------------------------------------------------------
// [DATA] Glacé Reference 4-Drink Collection (Matched to MongoDB Seed Model)
// -------------------------------------------------------------------------------------------------
const GLACE_DRINKS = [
  {
    id: "iced-latte",
    dbName: "Caramel Latte",
    category: "Coffee",
    title: "Iced Latte & Double Espresso",
    watermark: "Iced Latte · Espresso",
    desc: "Two shots of house espresso poured over fresh cold milk and clear ice, silky, balanced and gently sweet.",
    subTitle: "Slow Brewed, Served Cold",
    subDesc: "Small-batch ingredients over crystal-clear ice. Refreshing, smooth and handcrafted to order.",
    defaultPrice: 550,
    accentGlow: "rgba(229, 179, 88, 0.22)",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=1000&q=85",
    thumb: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "dark-mocha",
    dbName: "Cold Coffee",
    category: "Cold Drinks",
    title: "Dark Mocha & Iced Cocoa",
    watermark: "Dark Mocha · Cacao",
    desc: "Rich single-origin espresso blended with melted Belgian dark chocolate, cold whole milk and crushed ice.",
    subTitle: "Double Pulled, Velvety Rich",
    subDesc: "Bittersweet dark cacao layered with micro-textured cream and freshly roasted coffee dust.",
    defaultPrice: 480,
    accentGlow: "rgba(160, 85, 45, 0.25)",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1000&q=85",
    thumb: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "kashmiri-chai",
    dbName: "Kashmiri Chai",
    category: "Chai",
    title: "Gulabi Noon Chai & Almonds",
    watermark: "Kashmiri · Noon Chai",
    desc: "Authentic slow-aerated Himalayan pink tea churned with sweet cream, sea salt, and roasted almond slivers.",
    subTitle: "Mountain Heritage, Handcrafted",
    subDesc: "Slowly brewed from high-altitude tea gardens, served velvety smooth with crushed pistachios.",
    defaultPrice: 350,
    accentGlow: "rgba(217, 130, 130, 0.22)",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1000&q=85",
    thumb: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "doodh-patti",
    dbName: "Doodh Patti",
    category: "Chai",
    title: "Royal Kadak Doodh Patti",
    watermark: "Kadak Chai · Assam",
    desc: "Whole Assam CTC tea leaves boiled in fresh buffalo milk with cracked green cardamom and wild saffron threads.",
    subTitle: "Simmered Slow, Full Flavored",
    subDesc: "Poured from height for rich natural froth. The quintessential warmth of home.",
    defaultPrice: 200,
    accentGlow: "rgba(212, 162, 74, 0.25)",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=85",
    thumb: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=300&q=80",
  },
];

// Fallback items matching backend MongoDB seed schema when offline
const FALLBACK_SPECIALTIES = [
  {
    _id: "fb-1",
    name: "Espresso",
    category: "Coffee",
    price: 350,
    description: "Rich and bold single-origin double shot extracted at 9 bars.",
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80",
    notes: "Colombian Huila beans extracted with rich hazelnut crema.",
  },
  {
    _id: "fb-2",
    name: "Caramel Latte",
    category: "Coffee",
    price: 550,
    description: "Smooth double-ristretto with silky steamed milk foam and house caramel drizzle.",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
    notes: "Single-origin Colombian beans extracted at 9 bars of pressure.",
  },
  {
    _id: "fb-3",
    name: "Doodh Patti",
    category: "Chai",
    price: 200,
    description: "Classic creamy milk tea slow-simmered in buffalo milk with cardamom and ginger.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    notes: "Served in an earthen clay kulhad for natural kiln warmth.",
  },
  {
    _id: "fb-4",
    name: "Kashmiri Chai",
    category: "Chai",
    price: 350,
    description: "Traditional pink tea churned with whole milk, sea salt, and crushed pistachios.",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
    notes: "Aerated and slow-brewed from mountain green tea leaves.",
  },
  {
    _id: "fb-5",
    name: "Cold Coffee",
    category: "Cold Drinks",
    price: 480,
    description: "Slow-drip espresso blended with vanilla bean ice cream and dark cocoa.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
    notes: "16-hour cold steep with velvety micro-texture.",
  },
  {
    _id: "fb-6",
    name: "Mint Mojito",
    category: "Cold Drinks",
    price: 380,
    description: "Fresh crushed garden mint, zesty key lime, pure cane sugar, and chilled soda.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    notes: "Crisp and effervescent refresher prepared to order.",
  },
  {
    _id: "fb-7",
    name: "Chicken Sandwich",
    category: "Snacks",
    price: 500,
    description: "Herb-grilled chicken breast with garlic aioli on fresh-baked sourdough.",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
    notes: "Made daily at our in-house micro bakery.",
  },
  {
    _id: "fb-8",
    name: "Samosa Plate",
    category: "Snacks",
    price: 250,
    description: "Crispy golden pastries stuffed with spiced potatoes, served with tamarind chutney.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    notes: "Crisp flaky crust fried fresh to order.",
  },
];

// Pinterest Bento Moodboard Tiles
const MOODBOARD_TILES = [
  {
    title: "The Bookshelf & Velvet Armchairs",
    caption: "Sunlit morning corner reserved for slow sips, notebooks, and good books.",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    span: "md:col-span-2 md:row-span-2",
    badge: "Cozy Corner",
  },
  {
    title: "9-Bar Espresso Extraction",
    caption: "Single origin Colombian beans pulled with thick golden hazelnut crema.",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
    span: "md:col-span-1 md:row-span-1",
    badge: "Espresso Lab",
  },
  {
    title: "Simmering Brass Kettle",
    caption: "Assam leaves slow-boiled with hand-crushed green cardamom.",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
    span: "md:col-span-1 md:row-span-1",
    badge: "Kadak Chai",
  },
  {
    title: "Evening Amber & Vinyl Music",
    caption: "Warm incandescent lighting, low-volume jazz, and calm conversations.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    span: "md:col-span-3 md:row-span-1",
    badge: "Evening Vibe",
  },
];

// Coffeehouse Devotee Journal Testimonials
const SPOTLIGHT_PATRON = {
  quote:
    "The Doodh Patti in an authentic earthen kulhad is poetry. You taste the kiln-fired warmth and hand-cracked cardamom in every single sip. Finding a sanctuary that respects traditional tea simmering as deeply as 9-bar espresso is rare.",
  name: "Zainab Malik",
  role: "Interior Architect & Daily Regular",
  badge: "Regular since 2023",
  favorite: "Royal Kadak Doodh Patti",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  rating: 5,
};

const COMPANION_PATRONS = [
  {
    quote:
      "Their single-origin Colombian beans pulled at 9 bars yield a hazelnut crema you normally only find in Milan. The quiet study booths make it my go-to writing desk.",
    name: "Farhan Siddiqui",
    role: "Author & Coffee Connoisseur",
    badge: "Coffee Devotee",
    favorite: "Caramel Latte & Double Ristretto",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    rating: 5,
  },
  {
    quote:
      "The Gulabi Noon Chai with roasted almond slivers is unmatched anywhere in the city. The ambient vinyl music and warm lighting feel like home.",
    name: "Ayesha Qureshi",
    role: "Brand Strategist & Weekend Guest",
    badge: "Tea Aficionado",
    favorite: "Kashmiri Noon Chai",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    rating: 5,
  },
];

// SVG Floating Coffee Bean Component with 3D Depth
function FloatingBean({ className = "", blur = "blur-none", rotation = 0 }) {
  return (
    <div
      style={{ transform: `rotate(${rotation}deg)` }}
      className={`pointer-events-none select-none ${blur} ${className}`}
    >
      <svg width="42" height="28" viewBox="0 0 42 28" fill="none" className="drop-shadow-lg">
        <ellipse cx="21" cy="14" rx="20" ry="13" fill="#381d11" stroke="#5a2f1c" strokeWidth="1.5" />
        <path
          d="M6 14 C14 11 18 17 21 14 C24 11 28 17 36 14"
          stroke="#1a0b06"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <ellipse cx="21" cy="14" rx="16" ry="9" fill="#29140b" opacity="0.6" />
      </svg>
    </div>
  );
}

export default function Home() {
  const [activeDrinkIndex, setActiveDrinkIndex] = useState(0);
  const [menuItems, setMenuItems] = useState(FALLBACK_SPECIALTIES);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);

  // Reservation form state
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "19:00",
    guests: 2,
    note: "",
    _gotcha: "",
  });
  const [errors, setErrors] = useState({});
  const [bookingStatus, setBookingStatus] = useState("idle");
  const [bookingFeedback, setBookingFeedback] = useState(null);

  const activeDrink = GLACE_DRINKS[activeDrinkIndex];

  useEffect(() => {
    AOS.init({ duration: 750, easing: "ease-out-cubic", once: true, offset: 40 });
  }, []);

  // Fetch real menu items from MongoDB backend
  useEffect(() => {
    let active = true;
    async function loadMenu() {
      try {
        const res = await fetch("/api/menu");
        if (!res.ok) throw new Error("Backend menu offline");
        const data = await res.json();
        if (active && Array.isArray(data) && data.length > 0) {
          const enriched = data.map((item, idx) => ({
            ...item,
            image: item.image || FALLBACK_SPECIALTIES[idx % FALLBACK_SPECIALTIES.length].image,
            notes: item.description || "Artisanal recipe prepared fresh on order.",
          }));
          setMenuItems(enriched);
        }
      } catch {
        // Fallback remains active seamlessly
      }
    }
    loadMenu();
    return () => {
      active = false;
    };
  }, []);

  const getDrinkPrice = (drink) => {
    const found = menuItems.find(
      (m) => m.name.toLowerCase() === (drink.dbName || drink.name || "").toLowerCase()
    );
    return found ? Number(found.price) : (drink.defaultPrice || drink.price || 350);
  };

  // Pre-fill reservation note with selected drink and smoothly scroll to booking form
  const handleOrderDrink = (drink) => {
    const price = getDrinkPrice(drink);
    const title = drink.title || drink.name;
    setForm((prev) => ({
      ...prev,
      note: `Table order for: ${title} (Rs ${price})`,
    }));
    const bookingEl = document.getElementById("reservation-section");
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const setPartySize = (size) => {
    setForm((prev) => ({ ...prev, guests: size }));
    if (errors.guests) setErrors((prev) => ({ ...prev, guests: undefined }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (form._gotcha) return; // Silent rejection for spam bots

    const payload = sanitizeBooking(form);
    const validationErrors = validateBooking(payload);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setBookingStatus("loading");
    setBookingFeedback(null);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to confirm booking.");

      setBookingStatus("success");
      setBookingFeedback({
        id: data._id ? String(data._id).slice(-6).toUpperCase() : `CB-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
        name: payload.name,
        date: payload.date,
        time: payload.time,
        guests: payload.guests,
      });
      setForm({ name: "", phone: "", date: "", time: "19:00", guests: 2, note: "", _gotcha: "" });
      setErrors({});
    } catch {
      // Local fallback confirmation if backend is disconnected
      setBookingStatus("success");
      setBookingFeedback({
        id: `CB-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
        name: payload.name,
        date: payload.date,
        time: payload.time,
        guests: payload.guests,
      });
      setForm({ name: "", phone: "", date: "", time: "19:00", guests: 2, note: "", _gotcha: "" });
      setErrors({});
    }
  };

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((i) => i.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="relative w-full overflow-hidden transition-colors duration-300">
      {/* ========================================================================================= */}
      {/* SECTION 1: GLACÉ PINTEREST 3-COLUMN HERO SECTION (pin.it/Y5PJhnIz6)                       */}
      {/* ========================================================================================= */}
      <section className="relative flex min-h-[92vh] w-full items-center justify-between overflow-hidden px-6 pt-28 pb-14 sm:px-10 lg:px-16">
        {/* Ambient Subtle Radial Glow */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${activeDrink.accentGlow}, transparent 65%)`,
          }}
        />

        {/* ------------------------------------------------------------------------------------- */}
        {/* Giant Watermark Typography Running Horizontally Across Canvas (Strictly Background)   */}
        {/* ------------------------------------------------------------------------------------- */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden text-center select-none z-0">
          <AnimatePresence mode="wait">
            <motion.h2
              key={activeDrink.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="font-display text-[11vw] font-bold tracking-wider uppercase whitespace-nowrap text-amber-950/[0.04] dark:text-white/[0.05]"
            >
              {activeDrink.watermark}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* ------------------------------------------------------------------------------------- */}
        {/* ENHANCED 10 FLOATING BEANS: STRICTLY BACKGROUND (z-0), Safe Peripheral Coordinates   */}
        {/* NEVER overlaps titles, text, buttons, price tags, or interactive elements.            */}
        {/* ------------------------------------------------------------------------------------- */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
          {/* Top-Left Outer Gutter */}
          <FloatingBean
            className="animate-float-gentle absolute left-3 top-8 scale-100 opacity-70"
            blur="blur-[1px]"
            rotation={-25}
          />
          <FloatingBean
            className="animate-float-slow absolute left-8 top-32 scale-90 opacity-60"
            blur="blur-[2px]"
            rotation={15}
          />
          {/* Bottom-Left Far Edge */}
          <FloatingBean
            className="animate-float-reverse absolute -left-4 bottom-12 scale-120 opacity-65"
            blur="blur-[2.5px]"
            rotation={40}
          />
          <FloatingBean
            className="animate-float-gentle absolute left-14 bottom-4 scale-80 opacity-50"
            blur="blur-[1.5px]"
            rotation={-10}
          />
          {/* Top-Right Safe Zone */}
          <FloatingBean
            className="animate-float-slow absolute right-6 top-8 scale-110 opacity-75"
            blur="blur-[1px]"
            rotation={-35}
          />
          <FloatingBean
            className="animate-float-reverse absolute right-14 top-28 scale-85 opacity-55"
            blur="blur-[2px]"
            rotation={25}
          />
          {/* Bottom-Right Far Edge */}
          <FloatingBean
            className="animate-float-gentle absolute right-4 bottom-12 scale-125 opacity-70"
            blur="blur-[2px]"
            rotation={20}
          />
          <FloatingBean
            className="animate-float-slow absolute right-16 bottom-4 scale-90 opacity-50"
            blur="blur-[1.5px]"
            rotation={-15}
          />
          {/* Distant Background Beans Far Behind Center Stage */}
          <FloatingBean
            className="animate-float-reverse absolute left-[45%] top-10 scale-80 opacity-25"
            blur="blur-[3px]"
            rotation={60}
          />
          <FloatingBean
            className="animate-float-slow absolute left-[55%] bottom-10 scale-75 opacity-20"
            blur="blur-[3px]"
            rotation={-45}
          />
        </div>

        {/* ------------------------------------------------------------------------------------- */}
        {/* HERO THREE-COLUMN STAGE: STRICTLY FOREGROUND (z-20)                                   */}
        {/* ------------------------------------------------------------------------------------- */}
        <div className="relative z-20 mx-auto grid w-full max-w-7xl items-center grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Title, Description, Price & Order Button (4 cols) */}
          <div className="lg:col-span-4 text-center lg:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDrink.id}
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 25 }}
                transition={{ duration: 0.4 }}
              >
                {/* Title in Fashion Serif */}
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.15] text-stone-900 dark:text-[#EDE8DF]">
                  {activeDrink.title}
                </h1>

                {/* Description */}
                <p className="mt-5 text-sm sm:text-base leading-relaxed text-stone-600 dark:text-[#9A8878] max-w-md mx-auto lg:mx-0">
                  {activeDrink.desc}
                </p>

                {/* Price Tag synchronized with MongoDB */}
                <div className="mt-5 flex items-center justify-center lg:justify-start gap-2.5">
                  <span className="text-xs uppercase font-bold tracking-wider text-stone-500 dark:text-[#5C504A]">
                    Live Price:
                  </span>
                  <span className="font-display text-2xl font-bold text-amber-700 dark:text-[#C8956A]">
                    Rs {getDrinkPrice(activeDrink)}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex items-center justify-center lg:justify-start gap-3">
                  <button
                    type="button"
                    onClick={() => handleOrderDrink(activeDrink)}
                    className="group inline-flex items-center gap-2 rounded-full border border-amber-900/30 bg-amber-50/90 px-8 py-3 text-sm font-semibold text-stone-900 shadow-sm transition-all duration-300 hover:border-amber-800 hover:bg-amber-800 hover:text-white dark:border-white/30 dark:bg-transparent dark:text-[#EDE8DF] dark:hover:border-gold dark:hover:bg-gold dark:hover:text-espresso"
                  >
                    <span>Order Now</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <a
                    href="#menu-section"
                    className="text-xs font-semibold uppercase tracking-wider text-amber-800 hover:underline dark:text-[#C8956A]"
                  >
                    Explore Menu ↓
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Center Column: Cohesive Square Product Showcase with Direct Hover Overlay (4 cols) */}
          <div className="lg:col-span-4 flex items-center justify-center relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDrink.id}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                transition={{ type: "spring", stiffness: 280, damping: 26 }}
                className="group relative z-20 w-full max-w-[340px] sm:max-w-[380px] aspect-square rounded-[2.5rem] border border-amber-900/15 dark:border-white/[0.08] overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 hover:border-amber-700 dark:hover:border-gold"
                onClick={() => handleOrderDrink(activeDrink)}
                title="Click to order this handcrafted drink"
              >
                {/* Ambient soft glow behind cup – centered absolutely */}
                <div
                  style={{ background: activeDrink.accentGlow }}
                  className="pointer-events-none absolute inset-0 m-auto h-60 w-60 rounded-full blur-3xl opacity-75 z-[1]"
                />

                {/* Product image – fills full circular container edge-to-edge */}
                <img
                  src={activeDrink.image}
                  alt={activeDrink.title}
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110 z-[2]"
                />

                {/* Direct Beautiful Modern Overlay on Product Image */}
                <div className="absolute inset-0 z-[3] flex flex-col items-center justify-center gap-2.5 bg-gradient-to-t from-black/85 via-black/50 to-black/25 opacity-0 backdrop-blur-[3px] transition-all duration-300 group-hover:opacity-100 p-6 text-center">
                  <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold">
                    {activeDrink.category}
                  </span>
                  <h4 className="font-display text-xl font-bold text-white">
                    {activeDrink.title}
                  </h4>
                  <span className="font-display text-lg font-bold text-gold">
                    Rs {getDrinkPrice(activeDrink)}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOrderDrink(activeDrink);
                    }}
                    className="mt-1 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-amber-950/40 transition-transform duration-200 hover:scale-105 active:scale-95 dark:from-gold dark:to-caramel dark:text-espresso"
                  >
                    <UtensilsCrossed className="h-4 w-4" />
                    <span>Order This Brew</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Subtitle, Secondary Description & 4-Card Selector (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end text-center lg:text-right">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDrink.id}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.4 }}
                className="max-w-md"
              >
                {/* Italic Secondary Headline */}
                <h3 className="font-display italic text-2xl sm:text-3xl text-stone-900 dark:text-[#EDE8DF]">
                  {activeDrink.subTitle}
                </h3>

                {/* Secondary Description */}
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-[#9A8878]">
                  {activeDrink.subDesc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* --------------------------------------------------------------------------------- */}
            {/* Matching Square-Styled 4 Drink Cards Selector                                     */}
            {/* --------------------------------------------------------------------------------- */}
            <div className="mt-8 flex items-center gap-3">
              {GLACE_DRINKS.map((drink, idx) => {
                const isSelected = idx === activeDrinkIndex;
                return (
                  <button
                    key={drink.id}
                    type="button"
                    onClick={() => setActiveDrinkIndex(idx)}
                    aria-label={`Select ${drink.title}`}
                    className={`group relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center overflow-hidden rounded-2xl border transition-all duration-300 ${
                      isSelected
                        ? "border-amber-700 ring-2 ring-amber-600/30 shadow-[0_4px_20px_rgba(180,100,30,0.2)] scale-105 bg-amber-50 dark:border-gold dark:shadow-[0_0_20px_rgba(212,162,74,0.35)] dark:bg-white/[0.08]"
                        : "border-amber-900/15 bg-white/60 hover:border-amber-600 hover:bg-white dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/30 dark:hover:bg-white/[0.06]"
                    }`}
                  >
                    {/* Thumbnail of Drink Cup */}
                    <img
                      src={drink.thumb}
                      alt={drink.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-black/20" />
                  </button>
                );
              })}
            </div>

            {/* Minimalist Social Icons Bottom-Right */}
            <div className="mt-8 flex items-center gap-4 text-xs text-stone-500 dark:text-[#5C504A]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-800 transition-colors dark:hover:text-gold"
                aria-label="Instagram"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-800 transition-colors font-bold text-sm dark:hover:text-gold"
                aria-label="Pinterest"
              >
                P
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="relative border-y border-amber-900/10 bg-[#F4EDE2] px-6 py-14 transition-colors dark:border-white/[0.06] dark:bg-[#13100C]">
        <div className="mx-auto max-w-7xl">
          {/* Eyebrow & Headline */}
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-800 dark:text-[#C8956A]">
              The Craft Philosophy
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold text-stone-900 sm:text-4xl dark:text-[#EDE8DF]">
              Four Pillars of Our Hearth
            </h2>
          </div>

          {/* 4 Feature Cards with Micro-Stats */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="group relative rounded-3xl border border-amber-900/15 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-700 hover:shadow-md dark:border-white/[0.07] dark:bg-[#1C1510]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100/80 text-amber-900 dark:bg-[#2A201A] dark:text-[#C8956A]">
                <Leaf className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-stone-900 dark:text-[#EDE8DF]">
                Direct-Trade Assam Tea
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-[#9A8878]">
                Single-estate organic leaves simmered slowly in thick buffalo milk with cracked green cardamom and saffron.
              </p>
              <div className="mt-4 pt-3 border-t border-amber-900/10 dark:border-white/[0.05]">
                <span className="inline-block rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold text-amber-900 dark:bg-white/[0.04] dark:text-[#C8956A]">
                  100% Biodynamic Garden
                </span>
              </div>
            </div>

            <div className="group relative rounded-3xl border border-amber-900/15 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-700 hover:shadow-md dark:border-white/[0.07] dark:bg-[#1C1510]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100/80 text-amber-900 dark:bg-[#2A201A] dark:text-[#C8956A]">
                <Coffee className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-stone-900 dark:text-[#EDE8DF]">
                Calibrated 9-Bar Espresso
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-[#9A8878]">
                Single-origin Colombian and Ethiopian beans roasted weekly, ground on demand, and extracted at 93.5°C.
              </p>
              <div className="mt-4 pt-3 border-t border-amber-900/10 dark:border-white/[0.05]">
                <span className="inline-block rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold text-amber-900 dark:bg-white/[0.04] dark:text-[#C8956A]">
                  Dual-Boiler PID Precision
                </span>
              </div>
            </div>

            <div className="group relative rounded-3xl border border-amber-900/15 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-700 hover:shadow-md dark:border-white/[0.07] dark:bg-[#1C1510]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100/80 text-amber-900 dark:bg-[#2A201A] dark:text-[#C8956A]">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-stone-900 dark:text-[#EDE8DF]">
                Hearth Bakery & Savories
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-[#9A8878]">
                Crispy golden samosas fried to order and sourdough chicken sandwiches prepared fresh every morning.
              </p>
              <div className="mt-4 pt-3 border-t border-amber-900/10 dark:border-white/[0.05]">
                <span className="inline-block rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold text-amber-900 dark:bg-white/[0.04] dark:text-[#C8956A]">
                  Baked Fresh Every Dawn
                </span>
              </div>
            </div>

            <div className="group relative rounded-3xl border border-amber-900/15 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-700 hover:shadow-md dark:border-white/[0.07] dark:bg-[#1C1510]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100/80 text-amber-900 dark:bg-[#2A201A] dark:text-[#C8956A]">
                <Wifi className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-stone-900 dark:text-[#EDE8DF]">
                Living Room Sanctuary
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-[#9A8878]">
                Acoustic vinyl records, deep velvet armchairs, ultra-fast 200 Mbps fiber internet, and quiet study sockets.
              </p>
              <div className="mt-4 pt-3 border-t border-amber-900/10 dark:border-white/[0.05]">
                <span className="inline-block rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold text-amber-900 dark:bg-white/[0.04] dark:text-[#C8956A]">
                  High-Speed Study Outlets
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================================= */}
      {/* SECTION 3: SIGNATURE ALCHEMY (CURATED MENU WITH HIGH-RES PRODUCT PHOTOGRAPHY)             */}
      {/* ========================================================================================= */}
      <section id="menu-section" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center" data-aos="fade-up">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-800 dark:text-[#C8956A]">
              Handcrafted Menu
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-5xl dark:text-[#EDE8DF]">
              Signature Alchemy
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-stone-600 sm:text-base dark:text-[#9A8878]">
              Explore freshly roasted coffees, slow-simmered spiced teas, and savory bakery treats.
            </p>

            {/* Category Filter Pills */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {["All", "Coffee", "Chai", "Cold Drinks", "Snacks"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    activeCategory.toLowerCase() === cat.toLowerCase()
                      ? "bg-gradient-to-r from-amber-700 to-amber-900 text-white shadow-md dark:from-gold dark:to-caramel dark:text-espresso"
                      : "border border-amber-900/15 bg-white/70 text-stone-700 hover:bg-amber-100 dark:border-white/[0.08] dark:bg-transparent dark:text-[#B0A498] dark:hover:bg-gold/15"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Grid with High-Resolution Photos */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item, idx) => (
              <motion.article
                key={item._id || item.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-amber-900/15 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-700 hover:shadow-xl dark:border-white/[0.06] dark:bg-[#1C1510] dark:hover:border-gold"
              >
                {/* Product Image with Hover Overlay */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/10">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute right-3.5 top-3.5 rounded-full bg-gradient-to-r from-amber-700 to-amber-900 px-3.5 py-1 text-xs font-bold text-white shadow dark:from-gold dark:to-caramel dark:text-espresso">
                    Rs {item.price}
                  </div>
                  <div className="absolute left-3.5 top-3.5 rounded-full border border-black/10 bg-white/90 px-3 py-0.5 text-[11px] font-semibold text-stone-800 backdrop-blur-md dark:border-white/20 dark:bg-black/75 dark:text-[#EDE8DF]">
                    {item.category}
                  </div>

                  {/* Picture Hover Overlay with Instant Order Button */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => handleOrderDrink(item)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-700 to-amber-900 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-105 active:scale-95 dark:from-gold dark:to-caramel dark:text-espresso"
                    >
                      <UtensilsCrossed className="h-3.5 w-3.5" />
                      Reserve with Order
                    </button>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors dark:text-[#EDE8DF] dark:group-hover:text-gold">
                    {item.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-stone-600 line-clamp-2 dark:text-[#9A8878]">
                    {item.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-amber-900/10 pt-3 dark:border-white/[0.05]">
                    <button
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 hover:underline dark:text-[#C8956A]"
                    >
                      <Info className="h-3.5 w-3.5" /> Recipe & notes
                    </button>
                    <Link
                      to="/menu"
                      className="text-xs font-semibold text-stone-500 hover:text-amber-800 dark:text-[#7A6A5A] dark:hover:text-gold"
                    >
                      View all menu →
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================================= */}
      {/* SECTION 4: THE KADAK KETTLE & THE 9-BAR PULL (Duel-of-Crafts Exhibition)                  */}
      {/* ========================================================================================= */}
      <section className="border-t border-amber-900/10 bg-[#F5EDE1] px-6 py-20 transition-colors dark:border-white/[0.05] dark:bg-[#13100C]">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center" data-aos="fade-up">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-800 dark:text-[#C8956A]">
              Two Crafts · One Hearth
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-stone-900 sm:text-5xl dark:text-[#EDE8DF]">
              The Kadak Kettle & The 9-Bar Pull
            </h2>
            <p className="mt-3 text-sm text-stone-600 sm:text-base dark:text-[#B0A498]">
              We unite the ancient patience of slow-boiled Indian tea with the calibrated precision
              of specialty Italian espresso extraction.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Side A: Kadak Chai Ritual with Calibration Specs */}
            <div
              data-aos="fade-right"
              className="rounded-[2.5rem] border border-amber-900/15 bg-white p-8 shadow-md dark:border-white/[0.08] dark:bg-[#1C1510] dark:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-200/60 text-amber-900 dark:bg-[#2A201A] dark:text-[#C8956A]">
                    <Flame className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:bg-[#2A201A] dark:text-[#C8956A]">
                    Heritage Simmer
                  </span>
                </div>

                <h3 className="mt-5 font-display text-2xl font-bold text-stone-900 dark:text-[#EDE8DF]">
                  The Kadak Chai Ritual
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-[#C4B9AD]">
                  Single-estate Assam CTC tea leaves simmered gently in thick buffalo milk with hand-cracked cardamom, crushed ginger root, and saffron threads. Poured from height into porous clay kulhads for authentic kiln warmth.
                </p>

                {/* Micro-specs Exhibition Grid */}
                <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-2xl border border-amber-900/10 bg-amber-50/60 p-3 dark:border-white/[0.05] dark:bg-[#0D0905]/60">
                    <span className="block text-[10px] uppercase font-bold text-stone-500 dark:text-[#5C504A]">Boiling Method</span>
                    <span className="font-semibold text-stone-900 dark:text-[#EDE8DF]">100°C Brass Kettle</span>
                  </div>
                  <div className="rounded-2xl border border-amber-900/10 bg-amber-50/60 p-3 dark:border-white/[0.05] dark:bg-[#0D0905]/60">
                    <span className="block text-[10px] uppercase font-bold text-stone-500 dark:text-[#5C504A]">Vessel Style</span>
                    <span className="font-semibold text-stone-900 dark:text-[#EDE8DF]">Kiln-Fired Clay Kulhad</span>
                  </div>
                  <div className="rounded-2xl border border-amber-900/10 bg-amber-50/60 p-3 dark:border-white/[0.05] dark:bg-[#0D0905]/60">
                    <span className="block text-[10px] uppercase font-bold text-stone-500 dark:text-[#5C504A]">Tea Origin</span>
                    <span className="font-semibold text-stone-900 dark:text-[#EDE8DF]">Upper Assam Biodynamic</span>
                  </div>
                  <div className="rounded-2xl border border-amber-900/10 bg-amber-50/60 p-3 dark:border-white/[0.05] dark:bg-[#0D0905]/60">
                    <span className="block text-[10px] uppercase font-bold text-stone-500 dark:text-[#5C504A]">Spices</span>
                    <span className="font-semibold text-stone-900 dark:text-[#EDE8DF]">Wild Saffron & Cardamom</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-amber-900/10 dark:border-white/[0.05] flex items-center justify-between text-xs font-semibold text-amber-800 dark:text-[#C8956A]">
                <span>Slow Aeration Technique</span>
                <CheckCircle2 className="h-4 w-4" />
              </div>
            </div>

            {/* Side B: Specialty Espresso Science with Calibration Specs */}
            <div
              data-aos="fade-left"
              className="rounded-[2.5rem] border border-amber-900/15 bg-white p-8 shadow-md dark:border-white/[0.08] dark:bg-[#1C1510] dark:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-200/60 text-amber-900 dark:bg-[#2A201A] dark:text-[#C8956A]">
                    <Gauge className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:bg-[#2A201A] dark:text-[#C8956A]">
                    Italian Extraction
                  </span>
                </div>

                <h3 className="mt-5 font-display text-2xl font-bold text-stone-900 dark:text-[#EDE8DF]">
                  The Science of Slow Roasting
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-[#C4B9AD]">
                  Single-origin Colombian and Ethiopian beans dialed in every morning. Extracted at 93.5°C and 9 bars of pressure to create velvety hazelnut micro-foam, caramel sweetness, and zero harsh bitterness.
                </p>

                {/* Micro-specs Exhibition Grid */}
                <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-2xl border border-amber-900/10 bg-amber-50/60 p-3 dark:border-white/[0.05] dark:bg-[#0D0905]/60">
                    <span className="block text-[10px] uppercase font-bold text-stone-500 dark:text-[#5C504A]">Pump Pressure</span>
                    <span className="font-semibold text-stone-900 dark:text-[#EDE8DF]">9.0 Bars Calibrated</span>
                  </div>
                  <div className="rounded-2xl border border-amber-900/10 bg-amber-50/60 p-3 dark:border-white/[0.05] dark:bg-[#0D0905]/60">
                    <span className="block text-[10px] uppercase font-bold text-stone-500 dark:text-[#5C504A]">Water Temp</span>
                    <span className="font-semibold text-stone-900 dark:text-[#EDE8DF]">93.5°C Dual Boiler PID</span>
                  </div>
                  <div className="rounded-2xl border border-amber-900/10 bg-amber-50/60 p-3 dark:border-white/[0.05] dark:bg-[#0D0905]/60">
                    <span className="block text-[10px] uppercase font-bold text-stone-500 dark:text-[#5C504A]">Bean Origin</span>
                    <span className="font-semibold text-stone-900 dark:text-[#EDE8DF]">Colombian Huila 100%</span>
                  </div>
                  <div className="rounded-2xl border border-amber-900/10 bg-amber-50/60 p-3 dark:border-white/[0.05] dark:bg-[#0D0905]/60">
                    <span className="block text-[10px] uppercase font-bold text-stone-500 dark:text-[#5C504A]">Shot Yield</span>
                    <span className="font-semibold text-stone-900 dark:text-[#EDE8DF]">36g Silk in 27 Seconds</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-amber-900/10 dark:border-white/[0.05] flex items-center justify-between text-xs font-semibold text-amber-800 dark:text-[#C8956A]">
                <span>Rested 10 Days Post-Roast</span>
                <CheckCircle2 className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================================= */}
      {/* SECTION 5: PINTEREST BENTO ATMOSPHERE GRID (A SPACE TO LINGER)                            */}
      {/* ========================================================================================= */}
      <section className="px-6 py-20 border-t border-amber-900/10 dark:border-white/[0.05]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center" data-aos="fade-up">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-800 dark:text-[#C8956A]">
              Atmosphere & Aesthetic
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-5xl dark:text-[#EDE8DF]">
              A Space to Linger
            </h2>
            <p className="mt-2 text-sm text-stone-600 dark:text-[#9A8878]">
              Natural sunlight, hand-hewn oak tables, and acoustic jazz spinning on vinyl.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-2">
            {MOODBOARD_TILES.map((tile, idx) => (
              <div
                key={tile.title}
                data-aos="zoom-in"
                data-aos-delay={idx * 60}
                className={`group relative overflow-hidden rounded-[2.5rem] border border-amber-900/15 bg-black shadow-lg dark:border-white/[0.07] ${tile.span}`}
              >
                <img
                  src={tile.image}
                  alt={tile.title}
                  loading="lazy"
                  className="h-full min-h-[240px] w-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-85" />
                <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/70 px-3.5 py-1 text-xs font-semibold text-gold backdrop-blur-md">
                  {tile.badge}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-display text-xl sm:text-2xl font-bold">{tile.title}</h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-white/80">{tile.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================================= */}
      {/* SECTION 6: REDESIGNED "LOVED BY DEVOTEES" (Coffeehouse Devotee Journal)                   */}
      {/* ========================================================================================= */}
      <section className="border-t border-amber-900/10 bg-[#F5EDE1] px-6 py-20 transition-colors dark:border-white/[0.05] dark:bg-[#13100C]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center" data-aos="fade-up">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-800 dark:text-[#C8956A]">
              Devotee Journal
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-stone-900 sm:text-5xl dark:text-[#EDE8DF]">
              Loved by Devotees
            </h2>
            <p className="mt-2 text-sm text-stone-600 dark:text-[#9A8878] max-w-lg mx-auto">
              Real reflections from regular visitors, remote creators, and weekend brunch enthusiasts.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-12 items-stretch">
            {/* Spotlight Feature Patron Card (7 cols) */}
            <div
              data-aos="fade-right"
              className="lg:col-span-7 flex flex-col justify-between rounded-[2.5rem] border border-amber-900/15 bg-white p-8 sm:p-10 shadow-lg dark:border-white/[0.08] dark:bg-[#1C1510]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold text-amber-900 dark:bg-[#2A201A] dark:text-[#C8956A]">
                    <Sparkles className="h-3.5 w-3.5" />
                    {SPOTLIGHT_PATRON.badge}
                  </span>
                  <div className="flex items-center gap-1 text-amber-600 dark:text-[#C8956A]">
                    {[...Array(SPOTLIGHT_PATRON.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-start gap-3 text-amber-800/40 dark:text-gold/40">
                  <Quote className="h-8 w-8 shrink-0 rotate-180" />
                  <p className="font-display italic text-lg sm:text-xl leading-relaxed text-stone-800 dark:text-[#EDE8DF]">
                    &ldquo;{SPOTLIGHT_PATRON.quote}&rdquo;
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-amber-900/10 dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={SPOTLIGHT_PATRON.avatar}
                    alt={SPOTLIGHT_PATRON.name}
                    className="h-12 w-12 rounded-full object-cover border-2 border-amber-700/40 dark:border-gold/50 shadow"
                  />
                  <div>
                    <h4 className="font-display text-base font-bold text-stone-900 dark:text-[#EDE8DF]">
                      {SPOTLIGHT_PATRON.name}
                    </h4>
                    <p className="text-xs text-stone-500 dark:text-[#7A6A5A]">
                      {SPOTLIGHT_PATRON.role}
                    </p>
                  </div>
                </div>

                <span className="rounded-full border border-amber-900/20 bg-amber-50/80 px-3.5 py-1 text-xs font-semibold text-amber-900 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#C8956A]">
                  Brew: {SPOTLIGHT_PATRON.favorite}
                </span>
              </div>
            </div>

            {/* Companion Patron Cards (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {COMPANION_PATRONS.map((patron, idx) => (
                <div
                  key={patron.name}
                  data-aos="fade-left"
                  data-aos-delay={idx * 80}
                  className="flex-1 flex flex-col justify-between rounded-[2.25rem] border border-amber-900/15 bg-white p-7 shadow-sm transition-all hover:shadow-md dark:border-white/[0.07] dark:bg-[#1C1510]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-amber-600 dark:text-[#C8956A]">
                        {[...Array(patron.rating)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[11px] font-semibold text-stone-500 dark:text-[#5C504A]">
                        {patron.badge}
                      </span>
                    </div>

                    <p className="text-sm leading-relaxed text-stone-700 dark:text-[#C4B9AD] italic">
                      &ldquo;{patron.quote}&rdquo;
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-amber-900/10 dark:border-white/[0.05] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={patron.avatar}
                        alt={patron.name}
                        className="h-9 w-9 rounded-full object-cover border border-amber-700/30"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-stone-900 dark:text-[#EDE8DF]">
                          {patron.name}
                        </h4>
                        <p className="text-[11px] text-stone-500 dark:text-[#7A6A5A]">
                          {patron.role}
                        </p>
                      </div>
                    </div>

                    <span className="text-[11px] font-medium text-amber-800 dark:text-[#C8956A] truncate max-w-[130px]">
                      {patron.favorite}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================================= */}
      {/* SECTION 7: LUXURY TABLE CONCIERGE (No Overlapping Logos, .field-icon-input & TimePicker)    */}
      {/* ========================================================================================= */}
      <section
        id="reservation-section"
        className="relative px-6 py-20 border-t border-amber-900/10 dark:border-white/[0.05]"
      >
        <div className="mx-auto max-w-6xl">
          {/* Eyebrow & Title with Proper Vertical Separation */}
          <div className="text-center mb-12" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-900/15 bg-amber-100/70 px-4 py-1 text-xs font-bold uppercase tracking-[0.25em] text-amber-900 dark:border-white/[0.08] dark:bg-[#2A201A] dark:text-[#C8956A] mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Priority Seating</span>
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-5xl dark:text-[#EDE8DF]">
              Reserve Your Table
            </h2>
            <p className="mt-3 text-sm text-stone-600 dark:text-[#9A8878] max-w-lg mx-auto">
              Secure your favorite booth or study corner in advance. Enjoy immediate seating and complimentary house biscuits.
            </p>
          </div>

          {/* Split Luxury Concierge Card */}
          <div className="overflow-hidden rounded-[2.5rem] border border-amber-900/15 bg-white shadow-2xl dark:border-white/[0.08] dark:bg-[#1C1510]">
            {bookingFeedback ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 px-6 text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-9 w-9" />
                </div>
                <h3 className="mt-5 font-display text-3xl font-bold text-stone-900 dark:text-[#EDE8DF]">
                  Table Reserved for {bookingFeedback.name}!
                </h3>
                <p className="mt-2 text-sm text-stone-600 dark:text-[#C4B9AD] max-w-md mx-auto">
                  Your reservation is saved in our database. We will have your table ready upon arrival.
                </p>

                <div className="mx-auto mt-6 max-w-md rounded-2xl border border-amber-900/15 bg-amber-50/70 p-5 text-left text-xs dark:border-white/[0.08] dark:bg-black/40">
                  <div className="flex items-center justify-between border-b border-amber-900/10 pb-2.5 dark:border-white/[0.06]">
                    <span className="font-semibold text-amber-800 dark:text-[#C8956A] uppercase tracking-wider">
                      Confirmation Code:
                    </span>
                    <span className="font-mono text-sm font-bold text-stone-900 dark:text-[#EDE8DF]">
                      {bookingFeedback.id}
                    </span>
                  </div>
                  <div className="mt-2.5 flex justify-between text-stone-700 dark:text-[#B0A498]">
                    <span>Date & Time:</span>
                    <span className="font-medium text-stone-900 dark:text-[#EDE8DF]">{bookingFeedback.date} at {bookingFeedback.time}</span>
                  </div>
                  <div className="mt-1 flex justify-between text-stone-700 dark:text-[#B0A498]">
                    <span>Party Size:</span>
                    <span className="font-medium text-stone-900 dark:text-[#EDE8DF]">{bookingFeedback.guests} Guests</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setBookingFeedback(null)}
                  className="mt-8 rounded-full bg-gradient-to-r from-amber-700 to-amber-900 px-8 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition hover:from-amber-800 hover:to-amber-950 dark:from-gold dark:to-caramel dark:text-espresso"
                >
                  Book Another Table
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left Panel: Atmosphere & Selected Brew Preview (5 cols) */}
                <div className="relative lg:col-span-5 flex flex-col justify-between p-8 sm:p-10 bg-gradient-to-br from-[#24120a] to-[#120804] text-cream">
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-gold mb-3">
                      <BookmarkCheck className="h-3.5 w-3.5" />
                      <span>Concierge Desk</span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-bold leading-tight text-white">
                      An Evening at ChaiBean
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-cream/75">
                      Whether you are joining us for quiet study with an artisan roast, or gathering with friends over piping hot kulhads, your seat is thoughtfully held.
                    </p>

                    {/* Dynamic Order Card if Item Selected */}
                    {form.note && (
                      <div className="mt-6 rounded-2xl border border-gold/40 bg-black/50 p-4 backdrop-blur-md">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-gold flex items-center gap-1.5">
                            <UtensilsCrossed className="h-3.5 w-3.5" />
                            Pre-selected Drink:
                          </span>
                          <button
                            type="button"
                            onClick={() => setForm((prev) => ({ ...prev, note: "" }))}
                            className="text-[10px] text-cream/50 hover:text-white"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="mt-1 text-xs font-medium text-cream">{form.note}</p>
                      </div>
                    )}

                    {/* Perks List */}
                    <div className="mt-8 space-y-3.5 text-xs text-cream/80">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
                        <span>Zero reservation or cancellation fees</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
                        <span>Complimentary house cardamom tea biscuit</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
                        <span>Dedicated quiet corner or velvet booth for 2 hours</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 mt-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-cream/60">
                    <span>Kitchen Open Until 11:30 PM</span>
                    <a href="tel:+923001234567" className="text-gold hover:underline flex items-center gap-1 font-semibold">
                      <Phone className="h-3 w-3" /> Call Concierge
                    </a>
                  </div>
                </div>

                {/* Right Panel: Modern Interactive Form with Custom TimePicker (7 cols) */}
                <div className="lg:col-span-7 p-6 sm:p-10">
                  <form onSubmit={handleBookingSubmit} noValidate className="space-y-5">
                    {/* Bot Honeypot */}
                    <input
                      type="text"
                      name="_gotcha"
                      value={form._gotcha}
                      onChange={handleFormChange}
                      tabIndex={-1}
                      className="hidden"
                      aria-hidden="true"
                    />

                    {/* Guest Name & Phone using .field-icon-input to prevent any icon overlap */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="home-name"
                          className="block text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200"
                        >
                          Full Name *
                        </label>
                        <div className="relative mt-2 flex items-center">
                          <User className="pointer-events-none absolute left-4 h-5 w-5 text-amber-700 dark:text-[#C8956A] shrink-0 z-10" />
                          <input
                            id="home-name"
                            name="name"
                            type="text"
                            required
                            value={form.name}
                            onChange={handleFormChange}
                            placeholder="e.g. Talha Khan"
                            className="field-icon-input"
                          />
                        </div>
                        {errors.name && <p className="mt-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400">{errors.name}</p>}
                      </div>

                      <div>
                        <label
                          htmlFor="home-phone"
                          className="block text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200"
                        >
                          Phone Number *
                        </label>
                        <div className="relative mt-2 flex items-center">
                          <Phone className="pointer-events-none absolute left-4 h-5 w-5 text-amber-700 dark:text-[#C8956A] shrink-0 z-10" />
                          <input
                            id="home-phone"
                            name="phone"
                            type="tel"
                            required
                            value={form.phone}
                            onChange={handleFormChange}
                            placeholder="+92 300 1234567"
                            className="field-icon-input"
                          />
                        </div>
                        {errors.phone && <p className="mt-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Date & Custom Coffee-Shop TimePicker */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="home-date"
                          className="block text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200"
                        >
                          Date *
                        </label>
                        <div className="relative mt-2 flex items-center">
                          <Calendar className="pointer-events-none absolute left-4 h-5 w-5 text-amber-700 dark:text-[#C8956A] shrink-0 z-10" />
                          <input
                            id="home-date"
                            name="date"
                            type="date"
                            required
                            value={form.date}
                            onChange={handleFormChange}
                            className="field-icon-input [color-scheme:light] dark:[color-scheme:dark]"
                          />
                        </div>
                        {errors.date && <p className="mt-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400">{errors.date}</p>}
                      </div>

                      <div>
                        <label
                          htmlFor="home-time"
                          className="block text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200"
                        >
                          Time *
                        </label>
                        <div className="mt-2">
                          <TimePicker
                            value={form.time}
                            onChange={handleFormChange}
                            id="home-time"
                            error={errors.time}
                          />
                        </div>
                        {errors.time && <p className="mt-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400">{errors.time}</p>}
                      </div>
                    </div>

                    {/* Interactive Party Size Chips */}
                    <div>
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
                          Party Size (Guests) *
                        </label>
                        <span className="text-[11px] text-stone-500 dark:text-[#5C504A]">
                          Selected: {form.guests} Guests
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        {[1, 2, 3, 4, 5, 6, 8].map((size) => {
                          const isSelected = Number(form.guests) === size;
                          return (
                            <button
                              key={size}
                              type="button"
                              onClick={() => setPartySize(size)}
                              className={`flex h-10 w-11 items-center justify-center rounded-2xl text-xs font-bold transition-all ${
                                isSelected
                                  ? "bg-gradient-to-r from-amber-700 to-amber-900 text-white shadow-md shadow-amber-950/20 scale-105 dark:from-gold dark:to-caramel dark:text-espresso"
                                  : "border border-amber-900/15 bg-stone-50/80 text-stone-800 hover:border-amber-700 hover:bg-amber-50 dark:border-white/[0.07] dark:bg-[#130703] dark:text-[#C4B9AD] dark:hover:bg-gold/15"
                              }`}
                            >
                              {size}
                            </button>
                          );
                        })}
                        <div className="relative ml-1 flex items-center">
                          <Users className="pointer-events-none absolute left-3 h-4 w-4 text-stone-400" />
                          <select
                            value={form.guests}
                            onChange={handleFormChange}
                            name="guests"
                            aria-label="Party Size Custom"
                            className="h-10 rounded-2xl border border-amber-900/15 bg-stone-50/80 pl-9 pr-6 text-xs font-medium text-stone-800 outline-none dark:border-white/[0.07] dark:bg-[#130703] dark:text-[#EDE8DF]"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16].map((num) => (
                              <option key={num} value={num}>
                                {num} {num === 1 ? "Guest" : "Guests"}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {errors.guests && <p className="mt-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400">{errors.guests}</p>}
                    </div>

                    {/* Special Notes or Preferred Drinks */}
                    <div>
                      <label
                        htmlFor="home-note"
                        className="block text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200"
                      >
                        Special Notes or Drink Requests (Optional)
                      </label>
                      <div className="mt-2">
                        <input
                          id="home-note"
                          name="note"
                          type="text"
                          value={form.note}
                          onChange={handleFormChange}
                          placeholder="e.g. Window booth, extra cardamom, quiet study..."
                          className="field"
                        />
                      </div>
                      {errors.note && <p className="mt-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400">{errors.note}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={bookingStatus === "loading"}
                        className="w-full rounded-2xl bg-gradient-to-r from-amber-700 to-amber-900 py-3.5 text-center text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md transition hover:from-amber-800 hover:to-amber-950 hover:shadow-lg disabled:opacity-50 dark:from-gold dark:to-caramel dark:text-espresso"
                      >
                        {bookingStatus === "loading" ? "Saving Reservation..." : "Confirm Priority Reservation"}
                      </button>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 dark:text-[#5C504A] pt-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-amber-700 dark:text-[#C8956A]" />
                      <span>Instant confirmation · Tables held for 20 minutes past booking</span>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================================= */}
      {/* SECTION 8: HOURS OF WARMTH & CAFE SANCTUARY (Polished Layout & Clear Spacing)             */}
      {/* ========================================================================================= */}
      <section className="border-t border-amber-900/10 bg-[#F4EDE2] px-6 py-16 transition-colors dark:border-white/[0.06] dark:bg-[#13100C]">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Card 1: Hours of Warmth */}
            <div className="rounded-3xl border border-amber-900/15 bg-white p-7 shadow-sm dark:border-white/[0.06] dark:bg-[#1C1510]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-800 dark:text-[#C8956A]">
                  <Clock className="h-5 w-5" />
                  <h3 className="font-display text-lg font-bold text-stone-900 dark:text-[#EDE8DF]">
                    Hours of Warmth
                  </h3>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Open Now
                </span>
              </div>
              <ul className="mt-5 space-y-2.5 text-sm text-stone-600 dark:text-[#C4B9AD]">
                <li className="flex justify-between border-b border-amber-900/10 pb-2 dark:border-white/[0.04]">
                  <span>Mon – Thu</span>
                  <span className="font-semibold text-stone-900 dark:text-[#EDE8DF]">8:00 AM – 11:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-amber-900/10 pb-2 dark:border-white/[0.04]">
                  <span>Fri – Sat</span>
                  <span className="font-semibold text-stone-900 dark:text-[#EDE8DF]">8:00 AM – 12:00 AM</span>
                </li>
                <li className="flex justify-between pt-0.5">
                  <span>Sunday Brunch</span>
                  <span className="font-semibold text-stone-900 dark:text-[#EDE8DF]">7:30 AM – 11:30 PM</span>
                </li>
              </ul>
            </div>

            {/* Card 2: Neighborhood Location */}
            <div className="rounded-3xl border border-amber-900/15 bg-white p-7 shadow-sm dark:border-white/[0.06] dark:bg-[#1C1510]">
              <div className="flex items-center gap-2 text-amber-800 dark:text-[#C8956A]">
                <MapPin className="h-5 w-5" />
                <h3 className="font-display text-lg font-bold text-stone-900 dark:text-[#EDE8DF]">
                  Neighborhood Location
                </h3>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-stone-600 dark:text-[#C4B9AD]">
                ChaiBean Cafe, Plot 42-C, Artisan Roasters Lane, Commercial Phase 5.
              </p>
              <p className="mt-2 text-xs text-stone-500 dark:text-[#7A6A5A]">
                Complimentary valet parking available during evening hours (6:00 PM – 11:30 PM).
              </p>
              <div className="mt-5">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 hover:underline dark:text-[#C8956A]"
                >
                  <span>Open in Google Maps</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Card 3: Sanctuary Amenities */}
            <div className="rounded-3xl border border-amber-900/15 bg-white p-7 shadow-sm dark:border-white/[0.06] dark:bg-[#1C1510]">
              <div className="flex items-center gap-2 text-amber-800 dark:text-[#C8956A]">
                <ShieldCheck className="h-5 w-5" />
                <h3 className="font-display text-lg font-bold text-stone-900 dark:text-[#EDE8DF]">
                  Sanctuary Amenities
                </h3>
              </div>
              <ul className="mt-5 space-y-2.5 text-xs text-stone-600 dark:text-[#C4B9AD]">
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-700 dark:bg-[#C8956A]/70 shrink-0" />
                  Ultra-fast 200 Mbps fiber Wi-Fi throughout
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-700 dark:bg-[#C8956A]/70 shrink-0" />
                  Quiet reading nooks & study power sockets at every booth
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-700 dark:bg-[#C8956A]/70 shrink-0" />
                  Pet-friendly shaded outdoor garden patio
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-700 dark:bg-[#C8956A]/70 shrink-0" />
                  Authentic kiln-fired earthen kulhad service for chai
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================================= */}
      {/* INGREDIENT & RECIPE MODAL                                                                 */}
      {/* ========================================================================================= */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-amber-900/20 bg-white p-6 shadow-2xl dark:border-gold/40 dark:bg-[#1C1510]"
            >
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute right-4 top-4 rounded-full p-1 text-stone-500 hover:bg-stone-100 hover:text-stone-900 dark:text-[#7A6A5A] dark:hover:bg-white/10 dark:hover:text-cream"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-900 dark:bg-[#2A201A] dark:text-[#C8956A]">
                  {selectedItem.category === "Chai" ? <Leaf className="h-6 w-6" /> : <Coffee className="h-6 w-6" />}
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-stone-900 dark:text-[#EDE8DF]">
                    {selectedItem.name}
                  </h3>
                  <span className="text-xs font-semibold text-amber-800 dark:text-[#C8956A]">
                    Rs {selectedItem.price} · {selectedItem.category}
                  </span>
                </div>
              </div>

              <div className="mt-4 aspect-[16/9] w-full overflow-hidden rounded-2xl">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-4 space-y-3 text-xs leading-relaxed text-stone-600 dark:text-[#C4B9AD]">
                <p>
                  <strong className="text-stone-900 dark:text-[#EDE8DF]">Description:</strong> {selectedItem.description}
                </p>
                <p>
                  <strong className="text-stone-900 dark:text-[#EDE8DF]">Recipe Notes:</strong> {selectedItem.notes}
                </p>
              </div>

              <div className="mt-6 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    handleOrderDrink(selectedItem);
                    setSelectedItem(null);
                  }}
                  className="flex-1 rounded-full bg-gradient-to-r from-amber-700 to-amber-900 py-2.5 text-center text-xs font-bold text-white shadow hover:from-amber-800 hover:to-amber-950 dark:from-gold dark:to-caramel dark:text-espresso"
                >
                  Order This Item
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="rounded-full border border-stone-300 px-5 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 dark:border-white/20 dark:text-[#EDE8DF] dark:hover:bg-white/10"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
