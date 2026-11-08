// client/src/lib/bookingValidation.js
// Cleans and checks the booking form before it is sent to the server.
// The server must still repeat these checks, because a browser check can be bypassed.

const NAME_PATTERN = /^[\p{L}\p{M} .'-]{2,80}$/u;
const PHONE_PATTERN = /^[0-9+\-\s]{7,20}$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

const MAX_NOTE_LENGTH = 300;
const MIN_GUESTS = 1;
const MAX_GUESTS = 20;

// Removes HTML tags and hidden control characters from any text.
function stripTags(value) {
  return String(value ?? "")
    .replace(/<[^>]*>/g, "")
    .replace(/[\p{Cc}]/gu, "")
    .trim();
}

// Today's date in the user's own time zone, as YYYY-MM-DD.
function todayLocal() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

// True only for real calendar dates, so 2026-02-31 is rejected.
function isRealDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export function sanitizeBooking(form) {
  return {
    name: stripTags(form.name).slice(0, 80),
    phone: stripTags(form.phone).replace(/[^\d+\-\s]/g, "").slice(0, 20),
    date: stripTags(form.date).slice(0, 10),
    time: stripTags(form.time).slice(0, 5),
    guests: Number.parseInt(form.guests, 10),
    note: stripTags(form.note).slice(0, MAX_NOTE_LENGTH),
  };
}

export function validateBooking(form) {
  const errors = {};

  if (!NAME_PATTERN.test(form.name)) {
    errors.name = "Use 2-80 letters. No symbols or HTML.";
  }

  if (!PHONE_PATTERN.test(form.phone)) {
    errors.phone = "Use 7-20 digits, spaces, + or - only.";
  }

  if (!DATE_PATTERN.test(form.date) || !isRealDate(form.date)) {
    errors.date = "Pick a valid date.";
  } else if (form.date < todayLocal()) {
    errors.date = "Choose today or a future date.";
  }

  if (!TIME_PATTERN.test(form.time)) {
    errors.time = "Pick a valid time.";
  }

  if (
    !Number.isInteger(form.guests) ||
    form.guests < MIN_GUESTS ||
    form.guests > MAX_GUESTS
  ) {
    errors.guests = `Guests must be between ${MIN_GUESTS} and ${MAX_GUESTS}.`;
  }

  if (form.note.length > MAX_NOTE_LENGTH) {
    errors.note = `Keep notes under ${MAX_NOTE_LENGTH} characters.`;
  }

  return errors;
}