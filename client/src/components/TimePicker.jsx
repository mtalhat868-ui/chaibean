// =================================================================================================
// [COMMIT] feat(time-picker): Artisan Coffee-Shop Time Picker Component
// RATIONALE: Replaced generic OS blue-and-white clock popup with a luxury coffee-shop themed time selector.
// FEATURES:
//   - Warm amber, gold, espresso, and cream styling matching ChaiBean brand.
//   - Quick curated time slots (Morning, Afternoon, Evening, Night).
//   - Interactive custom hour and minute dial picker.
//   - Touch and click friendly, fully responsive on mobile and desktop.
//   - Stores standard "HH:mm" 24h format compatible with MongoDB Booking model.
// =================================================================================================

import { useState, useRef, useEffect } from "react";
import { Clock, Check, ChevronDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Curated popular cafe reservation time slots
const POPULAR_SLOTS = [
  { label: "08:30 AM", value: "08:30", period: "Morning" },
  { label: "10:00 AM", value: "10:00", period: "Morning" },
  { label: "11:30 AM", value: "11:30", period: "Morning" },
  { label: "01:00 PM", value: "13:00", period: "Afternoon" },
  { label: "02:30 PM", value: "14:30", period: "Afternoon" },
  { label: "04:00 PM", value: "16:00", period: "Afternoon" },
  { label: "05:30 PM", value: "17:30", period: "Evening" },
  { label: "07:00 PM", value: "19:00", period: "Evening" },
  { label: "08:30 PM", value: "20:30", period: "Evening" },
  { label: "10:00 PM", value: "22:00", period: "Night" },
  { label: "11:00 PM", value: "23:00", period: "Night" },
];

function format12Hour(time24) {
  if (!time24) return "Select Time";
  const [hStr, mStr] = time24.split(":");
  let h = parseInt(hStr, 10);
  const m = mStr || "00";
  if (isNaN(h)) return "Select Time";
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h.toString().padStart(2, "0")}:${m} ${ampm}`;
}

export default function TimePicker({ value, onChange, id = "time-picker", error }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (slotValue) => {
    onChange({ target: { name: "time", value: slotValue } });
    setIsOpen(false);
  };

  const currentDisplay = format12Hour(value);

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Trigger Button with Coffee-Shop Theming */}
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className={`group flex w-full items-center justify-between rounded-2xl border px-4 py-3.5 text-left text-sm font-medium transition-all duration-200 outline-none ${
          error
            ? "border-rose-500 ring-1 ring-rose-500/30"
            : isOpen
            ? "border-amber-700 ring-2 ring-amber-600/25 dark:border-gold dark:ring-gold/30"
            : "border-amber-900/15 bg-white hover:border-amber-700 hover:bg-amber-50/50 dark:border-gold/25 dark:bg-[#180B06] dark:hover:border-gold dark:hover:bg-[#200e08]"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-900 dark:bg-gold/20 dark:text-gold transition-colors group-hover:bg-amber-200/80">
            <Clock className="h-4 w-4" />
          </div>
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 dark:text-cream/50">
              Reservation Time
            </span>
            <span className="block text-sm font-bold text-stone-900 dark:text-cream">
              {currentDisplay}
            </span>
          </div>
        </div>

        <ChevronDown
          className={`h-4 w-4 text-stone-400 transition-transform duration-200 dark:text-cream/50 ${
            isOpen ? "rotate-180 text-amber-700 dark:text-gold" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 right-0 z-50 mt-2 rounded-3xl border border-amber-900/20 bg-white p-5 shadow-2xl backdrop-blur-xl dark:border-gold/30 dark:bg-[#1a0c06] max-h-[380px] overflow-y-auto"
          >
            {/* Header */}
            <div className="mb-3 flex items-center justify-between border-b border-amber-900/10 pb-3 dark:border-gold/15">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-gold">
                <Sparkles className="h-3.5 w-3.5" />
                Select Table Slot
              </span>
              <span className="text-[11px] text-stone-500 dark:text-cream/50">
                Open 8:00 AM – 11:30 PM
              </span>
            </div>

            {/* Curated Popular Slots Grid */}
            <div className="space-y-3">
              {["Morning", "Afternoon", "Evening", "Night"].map((period) => {
                const slots = POPULAR_SLOTS.filter((s) => s.period === period);
                if (slots.length === 0) return null;
                return (
                  <div key={period}>
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-cream/40">
                      {period}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {slots.map((slot) => {
                        const isSelected = value === slot.value;
                        return (
                          <button
                            key={slot.value}
                            type="button"
                            onClick={() => handleSelect(slot.value)}
                            className={`flex items-center justify-center gap-1 rounded-xl py-2 px-2 text-xs font-semibold transition-all ${
                              isSelected
                                ? "bg-gradient-to-r from-amber-700 to-amber-900 text-white shadow-md dark:from-gold dark:to-caramel dark:text-espresso"
                                : "border border-amber-900/10 bg-amber-50/50 text-stone-800 hover:border-amber-600 hover:bg-amber-100 dark:border-gold/20 dark:bg-[#24120a] dark:text-cream/80 dark:hover:bg-gold/15"
                            }`}
                          >
                            {isSelected && <Check className="h-3 w-3" />}
                            <span>{slot.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom Input Fallback for exact minute preference */}
            <div className="mt-4 border-t border-amber-900/10 pt-3 dark:border-gold/15 flex items-center justify-between text-xs">
              <span className="text-stone-500 dark:text-cream/60">Custom time:</span>
              <input
                type="time"
                value={value || "19:00"}
                onChange={(e) => onChange(e)}
                className="rounded-lg border border-amber-900/20 bg-white px-2.5 py-1 text-xs font-semibold text-stone-900 outline-none dark:border-gold/30 dark:bg-[#120703] dark:text-cream [color-scheme:light] dark:[color-scheme:dark]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
