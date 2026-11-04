import { motion } from "motion/react";
import { Coffee, Leaf, Sandwich, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import SectionTitle from "../components/SectionTitle";

const highlights = [
  {
    icon: Coffee,
    title: "Slow-roasted coffee",
    text: "Espresso, cappuccino, and iced cups pulled to order.",
  },
  {
    icon: Leaf,
    title: "Kadak chai",
    text: "Doodh patti, masala, and Kashmiri pink tea the way home makes it.",
  },
  {
    icon: Sandwich,
    title: "Snacks on the side",
    text: "Samosas, sandwiches, and something warm while you wait.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden px-6 pb-16 pt-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,162,74,0.32),_transparent_42%),radial-gradient(circle_at_bottom_left,_rgba(74,44,29,0.12),_transparent_40%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-gold">
              Cafe · Chai · Company
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-6xl">
              Sit down. The kettle is already on.
            </h1>
            <p className="mt-5 max-w-md text-lg text-roast/75 dark:text-cream/75">
              ChaiBean is a neighbourhood cafe for roasted coffee, kadak chai,
              and a table you can actually linger at.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/menu">See the menu</Button>
              <Button to="/booking" variant="outline">
                Book a table
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-[2.5rem] border border-gold/30 bg-espresso p-8 text-cream shadow-[0_30px_80px_rgba(36,20,14,0.35)] md:p-12"
          >
            <Sparkles className="h-8 w-8 text-gold" />
            <p className="mt-6 font-display text-3xl">Fresh cups, no rush.</p>
            <p className="mt-4 text-cream/75">
              Open daily from 8am to 11pm. Walk in for a doodh patti, or reserve
              a table when the evening fills up.
            </p>
            <div className="mt-8 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
            <Link
              to="/about"
              className="mt-8 inline-block text-sm font-semibold text-gold hover:underline"
            >
              Our story →
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-latte/80 to-cream px-6 py-16 dark:from-roast/50 dark:to-espresso">
        <SectionTitle
          eyebrow="Why ChaiBean"
          title="A cup for every hour"
          subtitle="Morning espresso, afternoon chai, late snacks with friends."
        />
        <div className="mx-auto mt-10 grid max-w-6xl gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-[1.75rem] border border-gold/20 bg-cream/90 p-6 shadow-sm dark:bg-espresso/80"
            >
              <item.icon className="h-8 w-8 text-gold" />
              <h3 className="mt-4 font-display text-2xl">{item.title}</h3>
              <p className="mt-2 text-sm text-roast/70 dark:text-cream/70">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
