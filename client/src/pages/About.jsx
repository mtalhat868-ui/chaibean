import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Button from "../components/Button";

const ease = [0.22, 1, 0.36, 1];

const chapters = [
  {
    index: "01",
    title: "The kettle",
    text: "Doors open after the milk has already come to a slow boil. Cardamom is cracked by hand, and the chai is poured from height so the foam arrives on its own.",
    image:
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=900&q=80",
    alt: "A clay cup of milky chai on a wooden table",
  },
  {
    index: "02",
    title: "The roast",
    text: "Beans are roasted in small lots and left to rest before they reach the grinder. We taste every batch. If the sweetness is not there, it does not go on the bar.",
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80",
    alt: "Roasted coffee beans spilling across a dark surface",
  },
  {
    index: "03",
    title: "The pull",
    text: "Espresso is dialed in each morning: pressure, temperature, and a shot that finishes sweet. The barista watches the crema, not the clock.",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80",
    alt: "A barista pulling espresso into a small cup",
  },
];

const frames = [
  {
    src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
    alt: "Latte art in a ceramic cup",
    label: "The cup",
    className: "sm:col-span-2 sm:row-span-2 min-h-[280px] sm:min-h-[420px]",
  },
  {
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=80",
    alt: "Hands preparing a coffee drink at the bar",
    label: "At the bar",
    className: "min-h-[180px] sm:min-h-[200px]",
  },
  {
    src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=700&q=80",
    alt: "Coffee equipment on a cafe counter",
    label: "The bench",
    className: "min-h-[180px] sm:min-h-[200px]",
  },
];

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.7, delay, ease },
  };
}

export default function About() {
  return (
    <article className="w-full overflow-hidden pb-20 pt-28 sm:pt-32">
      <section className="mx-auto grid w-full max-w-6xl items-end gap-10 px-6 sm:px-10 lg:grid-cols-12 lg:gap-8">
        <motion.div className="lg:col-span-5" {...reveal(0)}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-stone-500 dark:text-[#9A8878]">
            ChaiBean · since the first kettle
          </p>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-[0.95] tracking-tight text-stone-900 sm:text-7xl dark:text-[#EDE8DF]">
            Our
            <span className="block italic font-medium text-stone-700 dark:text-[#C4B4A4]">
              Story
            </span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-stone-600 dark:text-[#9A8878]">
            One counter for two rituals. A slow pot of chai on the left, a
            careful espresso on the right, and a room that lets you stay.
          </p>
        </motion.div>

        <motion.figure
          className="relative lg:col-span-7"
          {...reveal(0.08)}
        >
          <img
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=80"
            alt="Sunlit cafe interior with wooden tables and warm light"
            className="h-[340px] w-full rounded-[1.75rem] object-cover sm:h-[440px]"
          />
          <figcaption className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 rounded-2xl bg-[#1C1510]/75 px-4 py-3 text-cream backdrop-blur-sm sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-xs">
            <span className="text-sm leading-snug">
              Morning light on the oak tables, before the first rush.
            </span>
          </figcaption>
        </motion.figure>
      </section>

      <section className="mx-auto mt-16 grid w-full max-w-6xl gap-12 px-6 sm:mt-24 sm:px-10 lg:grid-cols-12 lg:items-center">
        <motion.div className="relative lg:col-span-5" {...reveal(0)}>
          <img
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=80"
            alt="Close view of a coffee grinder and beans on the bar"
            className="h-[420px] w-[86%] rounded-[1.75rem] object-cover sm:h-[520px]"
          />
          <img
            src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=700&q=80"
            alt="Espresso pouring into a demitasse"
            className="absolute bottom-6 right-0 h-40 w-36 rounded-2xl border-4 border-[#FAF6F0] object-cover shadow-xl dark:border-[#0D0905] sm:h-52 sm:w-44"
          />
        </motion.div>

        <motion.div className="lg:col-span-6 lg:col-start-7" {...reveal(0.1)}>
          <p className="font-display text-2xl italic leading-snug text-stone-800 sm:text-3xl dark:text-[#EDE8DF]">
            “We kept the menu short so every cup could be made the long way.”
          </p>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-stone-600 sm:text-base dark:text-[#9A8878]">
            <p>
              ChaiBean began with a roadside doodh patti and a better espresso
              than the one down the street. Both stayed. The board is still
              coffee, chai, a few cold drinks, and snacks that belong next to
              a cup.
            </p>
            <p>
              Nothing here is rushed for the sake of a line. Milk is steamed
              for the drink in front of you. Tea is simmered until it smells
              like cardamom, not like a timer going off.
            </p>
          </div>
          <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-stone-300/80 pt-6 dark:border-white/10">
            {[
              ["12", "cups on the board"],
              ["9 bar", "espresso, every shot"],
              ["11pm", "last kettle of the day"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="font-display text-2xl text-stone-900 dark:text-[#EDE8DF]">
                  {value}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-stone-500 dark:text-[#9A8878]">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </section>

      <section className="mx-auto mt-20 w-full max-w-6xl px-6 sm:mt-28 sm:px-10">
        <motion.div className="flex items-end justify-between gap-6" {...reveal(0)}>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500 dark:text-[#9A8878]">
              How a cup is made
            </p>
            <h2 className="mt-2 font-display text-3xl text-stone-900 sm:text-4xl dark:text-[#EDE8DF]">
              Three quiet steps
            </h2>
          </div>
        </motion.div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {chapters.map((chapter, index) => (
            <motion.article
              key={chapter.index}
              className="group"
              {...reveal(index * 0.08)}
            >
              <div className="overflow-hidden rounded-[1.5rem]">
                <img
                  src={chapter.image}
                  alt={chapter.alt}
                  className="h-56 w-full object-cover transition duration-700 group-hover:scale-[1.04] sm:h-64"
                />
              </div>
              <p className="mt-4 text-[11px] font-semibold tracking-[0.22em] text-stone-400 dark:text-[#7A6A5A]">
                {chapter.index}
              </p>
              <h3 className="mt-1 font-display text-2xl text-stone-900 dark:text-[#EDE8DF]">
                {chapter.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-[#9A8878]">
                {chapter.text}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 w-full max-w-6xl px-6 sm:mt-28 sm:px-10">
        <div className="grid gap-4 sm:grid-cols-3">
          {frames.map((frame, index) => (
            <motion.figure
              key={frame.label}
              className={`group relative overflow-hidden rounded-[1.5rem] ${frame.className}`}
              {...reveal(index * 0.06)}
            >
              <img
                src={frame.src}
                alt={frame.alt}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1C1510]/80 to-transparent px-4 pb-4 pt-12 text-sm text-cream">
                {frame.label}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 w-full max-w-6xl px-6 sm:mt-28 sm:px-10">
        <motion.div
          className="grid overflow-hidden rounded-[1.75rem] bg-[#1C1510] text-cream md:grid-cols-5"
          {...reveal(0)}
        >
          <img
            src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1200&q=80"
            alt="Evening cafe with warm lamps and occupied tables"
            className="h-64 w-full object-cover md:col-span-2 md:h-full"
          />
          <div className="flex flex-col justify-center px-6 py-8 sm:px-10 md:col-span-3">
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              Come for one cup. Stay for the second.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/75">
              A window seat if we have one, a kulhad if you ask, and staff who
              remember how you take your tea.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/booking">
                Book a table
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
              <Button
                to="/menu"
                variant="outline"
                className="!border-cream/35 !text-cream hover:!bg-cream hover:!text-espresso"
              >
                Browse the menu
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </article>
  );
}
