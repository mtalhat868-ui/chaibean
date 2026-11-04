export default function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-gold">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-roast/70 dark:text-cream/70">{subtitle}</p>
      )}
    </div>
  );
}
