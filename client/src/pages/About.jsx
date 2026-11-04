import { Clock, MapPin, Heart } from "lucide-react";
import Button from "../components/Button";
import SectionTitle from "../components/SectionTitle";

const values = [
  {
    icon: Heart,
    title: "Made like home",
    text: "Chai is brewed the long way. Coffee is roasted for flavour, not just caffeine.",
  },
  {
    icon: Clock,
    title: "Stay as long as you like",
    text: "Laptops, catch-ups, or a quiet corner — the table is yours until you are done.",
  },
  {
    icon: MapPin,
    title: "Neighbourhood first",
    text: "A local cafe for regulars and first-timers. Come for one cup, leave as family.",
  },
];

export default function About() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-10">
      <SectionTitle
        eyebrow="Our story"
        title="About ChaiBean"
        subtitle="A small cafe built around two simple things: a proper cup, and a place to sit with it."
      />

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="rounded-[2rem] border border-gold/25 bg-espresso p-8 text-cream md:p-10">
          <h3 className="font-display text-3xl">From kettle to counter</h3>
          <p className="mt-4 text-cream/75">
            ChaiBean started as a love of doodh patti and a better espresso.
            We kept both. The menu is short on purpose: coffee, chai, cold
            drinks, and a few snacks that actually belong next to a cup.
          </p>
          <p className="mt-4 text-cream/75">
            No rush, no gimmicks — just warm lighting, gold against espresso,
            and staff who remember how you take your tea.
          </p>
        </div>

        <div className="space-y-5">
          {values.map((item) => (
            <div
              key={item.title}
              className="rounded-[1.75rem] border border-gold/20 bg-gradient-to-r from-latte/80 to-cream p-5 dark:from-roast/60 dark:to-espresso"
            >
              <item.icon className="h-6 w-6 text-gold" />
              <h3 className="mt-3 font-display text-xl">{item.title}</h3>
              <p className="mt-1 text-sm text-roast/70 dark:text-cream/70">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-4 rounded-[2rem] border border-gold/25 bg-latte px-6 py-10 text-center dark:bg-roast/40">
        <p className="w-full font-display text-2xl md:text-3xl">
          Come in today, or save a table for later.
        </p>
        <Button to="/booking">Book a table</Button>
        <Button to="/menu" variant="outline">
          Browse the menu
        </Button>
      </div>
    </section>
  );
}
