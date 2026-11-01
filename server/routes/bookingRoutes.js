const express = require("express");
const Booking = require("../models/Booking");

const router = express.Router();

// GET all bookings (admin)
router.get("/", async (req, res) => {
try {
const bookings = await Booking.find().sort({ createdAt: -1 });
res.json(bookings);
} catch (err) {
res.status(500).json({ message: err.message });
}
});

// POST create a booking
router.post("/", async (req, res) => {
try {
const booking = await Booking.create(req.body);
res.status(201).json(booking);
} catch (err) {
res.status(400).json({ message: err.message });
}
});

// PATCH update booking status
router.patch("/:id", async (req, res) => {
try {
const booking = await Booking.findByIdAndUpdate(
req.params.id,
{ status: req.body.status },
{ new: true, runValidators: true }
);
res.json(booking);
} catch (err) {
res.status(400).json({ message: err.message });
}
});

module.exports = router;