const mongoose = require("mongoose");

const MENU_CATEGORIES = ["Coffee", "Chai", "Cold Drinks", "Snacks"];
const BOOKING_STATUSES = ["pending", "confirmed", "cancelled"];

function cleanText(value, max = 200) {
  if (typeof value !== "string") return "";
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);
}

function isHttpUrl(value) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function parseBooking(body = {}) {
  const name = cleanText(body.name, 80);
  const phone = cleanText(body.phone, 20).replace(/[^\d+\-\s]/g, "");
  const date = cleanText(body.date, 10);
  const time = cleanText(body.time, 5);
  const note = cleanText(body.note, 300);
  const guests = Number.parseInt(body.guests, 10);

  const errors = [];
  if (name.length < 2) errors.push("Enter a valid name.");
  if (!/^[0-9+\-\s]{7,20}$/.test(phone)) errors.push("Enter a valid phone number.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) errors.push("Enter a valid date.");
  if (!/^\d{2}:\d{2}$/.test(time)) errors.push("Enter a valid time.");
  if (!Number.isInteger(guests) || guests < 1 || guests > 20) {
    errors.push("Guests must be between 1 and 20.");
  }

  return errors.length
    ? { error: errors[0] }
    : { value: { name, phone, date, time, guests, note } };
}

function parseMenuItem(body = {}) {
  const name = cleanText(body.name, 80);
  const category = cleanText(body.category, 30);
  const description = cleanText(body.description, 300);
  const image = cleanText(body.image, 500);
  const price = Number(body.price);

  const errors = [];
  if (name.length < 2) errors.push("Enter a valid item name.");
  if (!MENU_CATEGORIES.includes(category)) errors.push("Choose a valid category.");
  if (!Number.isFinite(price) || price < 0 || price > 100000) {
    errors.push("Enter a valid price.");
  }
  if (!isHttpUrl(image)) errors.push("Image must be an http(s) URL.");

  return errors.length
    ? { error: errors[0] }
    : { value: { name, category, description, image, price } };
}

function parseStatus(body = {}) {
  const status = cleanText(body.status, 20);
  if (!BOOKING_STATUSES.includes(status)) return { error: "Invalid booking status." };
  return { value: { status } };
}

function parseId(id) {
  if (!mongoose.isValidObjectId(id)) return { error: "Invalid id." };
  return { value: id };
}

module.exports = { parseBooking, parseMenuItem, parseStatus, parseId };
