const NAME_PATTERN = /^[\p{L}\p{M} .'-]{2,80}$/u;
const PHONE_PATTERN = /^[0-9+\-\s]{7,20}$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^\d{2}:\d{2}$/;

function stripTags(value) {
  return String(value ?? "")
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim();
}

export function sanitizeBooking(form) {
  return {
    name: stripTags(form.name).slice(0, 80),
    phone: stripTags(form.phone).replace(/[^\d+\-\s]/g, "").slice(0, 20),
    date: stripTags(form.date).slice(0, 10),
    time: stripTags(form.time).slice(0, 5),
    guests: Number.parseInt(form.guests, 10),
    note: stripTags(form.note).slice(0, 300),
  };
}

export function validateBooking(form) {
  const errors = {};
  if (!NAME_PATTERN.test(form.name)) {
    errors.name = "Use 2–80 letters. No symbols or HTML.";
  }
  if (!PHONE_PATTERN.test(form.phone)) {
    errors.phone = "Use 7–20 digits, spaces, + or - only.";
  }
  if (!DATE_PATTERN.test(form.date)) {
    errors.date = "Pick a valid date.";
  } else if (form.date < new Date().toISOString().slice(0, 10)) {
    errors.date = "Choose today or a future date.";
  }
  if (!TIME_PATTERN.test(form.time)) {
    errors.time = "Pick a valid time.";
  }
  if (!Number.isInteger(form.guests) || form.guests < 1 || form.guests > 20) {
    errors.guests = "Guests must be between 1 and 20.";
  }
  if (form.note.length > 300) {
    errors.note = "Keep notes under 300 characters.";
  }
  return errors;
}
