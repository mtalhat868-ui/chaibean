const express = require("express");
const Booking = require("../models/Booking");
const { parseBooking, parseStatus, parseId } = require("../utils/sanitize");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Could not load bookings." });
  }
});

router.post("/", async (req, res) => {
  const parsed = parseBooking(req.body);
  if (parsed.error) return res.status(400).json({ message: parsed.error });

  try {
    const booking = await Booking.create(parsed.value);
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: "Could not create booking." });
  }
});

router.patch("/:id", async (req, res) => {
  const id = parseId(req.params.id);
  if (id.error) return res.status(400).json({ message: id.error });

  const parsed = parseStatus(req.body);
  if (parsed.error) return res.status(400).json({ message: parsed.error });

  try {
    const booking = await Booking.findByIdAndUpdate(id.value, parsed.value, {
      new: true,
      runValidators: true,
    });
    if (!booking) return res.status(404).json({ message: "Booking not found." });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ message: "Could not update booking." });
  }
});

module.exports = router;
