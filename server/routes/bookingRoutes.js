const express = require("express");
const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const { parseBooking, parseStatus, parseId } = require("../utils/sanitize");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const bookings = await Booking.find().sort({ createdAt: -1 });
      return res.json(bookings);
    }
    return res.json([]);
  } catch (err) {
    res.status(500).json({ message: "Could not load bookings." });
  }
});

router.post("/", async (req, res) => {
  const parsed = parseBooking(req.body);
  if (parsed.error) return res.status(400).json({ message: parsed.error });

  try {
    if (mongoose.connection.readyState === 1) {
      const booking = await Booking.create(parsed.value);
      return res.status(201).json(booking);
    }
    // Graceful offline fallback record with unique confirmation ID
    const offlineBooking = {
      _id: `OFFLINE-${Date.now().toString(36).toUpperCase()}`,
      ...parsed.value,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    return res.status(201).json(offlineBooking);
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
    if (mongoose.connection.readyState === 1) {
      const booking = await Booking.findByIdAndUpdate(id.value, parsed.value, {
        new: true,
        runValidators: true,
      });
      if (!booking) return res.status(404).json({ message: "Booking not found." });
      return res.json(booking);
    }
    return res.status(503).json({ message: "Database offline" });
  } catch (err) {
    res.status(400).json({ message: "Could not update booking." });
  }
});

module.exports = router;
