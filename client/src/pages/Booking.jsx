import { useMemo, useState } from "react";
import { CalendarClock, ShieldCheck, Users } from "lucide-react";
import Button from "../components/Button";
import SectionTitle from "../components/SectionTitle";
import { sanitizeBooking, validateBooking } from "../lib/bookingValidation";

const emptyForm = {
  name: "",
  phone: "",
  date: "",
  time: "",
  guests: 2,
  note: "",
};

const fieldClass = "field";

export default function Booking() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = sanitizeBooking(form);
    const nextErrors = validateBooking(payload);
    setErrors(nextErrors);
    setMessage("");

    if (Object.keys(nextErrors).length) {
      setStatus("error");
      setMessage("Please fix the highlighted fields before sending.");
      return;
    }

    setStatus("saving");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Booking failed.");

      setStatus("success");
      setMessage(
        `Thanks ${payload.name}. Your table for ${payload.guests} on ${payload.date} at ${payload.time} is pending confirmation.`
      );
      setForm(emptyForm);
      setErrors({});
    } catch (err) {
      setStatus("error");
      setMessage(err.message || "Could not send the booking.");
    }
  }

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-10">
      <SectionTitle
        eyebrow="Reserve"
        title="Book a Table"
        subtitle="Tell us when you’re coming. We’ll hold a warm seat and a stronger cup."
      />

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-10 space-y-5 rounded-[2rem] border border-gold/25 bg-gradient-to-b from-latte/70 to-cream p-6 shadow-[0_20px_50px_rgba(36,20,14,0.08)] dark:from-roast/70 dark:to-espresso md:p-8"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <label className="block text-sm font-medium">
            Name
            <input
              value={form.name}
              maxLength={80}
              autoComplete="name"
              onChange={(e) => update("name", e.target.value)}
              className={fieldClass}
              placeholder="Your name"
            />
            {errors.name && <p className="mt-1 text-xs text-caramel">{errors.name}</p>}
          </label>
          <label className="block text-sm font-medium">
            Phone
            <input
              value={form.phone}
              maxLength={20}
              autoComplete="tel"
              inputMode="tel"
              onChange={(e) => update("phone", e.target.value)}
              className={fieldClass}
              placeholder="03xx-xxxxxxx"
            />
            {errors.phone && <p className="mt-1 text-xs text-caramel">{errors.phone}</p>}
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <label className="block text-sm font-medium">
            Date
            <input
              type="date"
              min={minDate}
              value={form.date}
              onChange={(e) => update("date", e.target.value)}
              className={fieldClass}
            />
            {errors.date && <p className="mt-1 text-xs text-caramel">{errors.date}</p>}
          </label>
          <label className="block text-sm font-medium">
            Time
            <input
              type="time"
              value={form.time}
              onChange={(e) => update("time", e.target.value)}
              className={fieldClass}
            />
            {errors.time && <p className="mt-1 text-xs text-caramel">{errors.time}</p>}
          </label>
          <label className="block text-sm font-medium">
            Guests
            <input
              type="number"
              min="1"
              max="20"
              value={form.guests}
              onChange={(e) => update("guests", e.target.value)}
              className={fieldClass}
            />
            {errors.guests && (
              <p className="mt-1 text-xs text-caramel">{errors.guests}</p>
            )}
          </label>
        </div>

        <label className="block text-sm font-medium">
          Note
          <textarea
            rows="3"
            maxLength={300}
            value={form.note}
            onChange={(e) => update("note", e.target.value)}
            className={fieldClass}
            placeholder="Window seat, birthday cake, extra sugar…"
          />
          {errors.note && <p className="mt-1 text-xs text-caramel">{errors.note}</p>}
        </label>

        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit" disabled={status === "saving"}>
            {status === "saving" ? "Sending…" : "Reserve table"}
          </Button>
          <p className="flex items-center gap-2 text-sm text-roast/70 dark:text-cream/70">
            <CalendarClock className="h-4 w-4 text-gold" />
            Open daily, 8am – 11pm
          </p>
          <p className="flex items-center gap-2 text-sm text-roast/70 dark:text-cream/70">
            <Users className="h-4 w-4 text-gold" />
            Up to 20 guests
          </p>
        </div>

        <p className="flex items-center gap-2 text-xs text-roast/55 dark:text-cream/55">
          <ShieldCheck className="h-4 w-4 text-gold" />
          Details are checked on the form and again on the server before they are saved.
        </p>

        {message && (
          <p
            className={`rounded-2xl px-4 py-3 text-sm ${
              status === "success"
                ? "bg-gold/20 text-espresso dark:text-cream"
                : "bg-caramel/20 text-roast dark:text-cream"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </section>
  );
}
