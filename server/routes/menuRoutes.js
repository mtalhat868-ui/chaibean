const express = require("express");
const MenuItem = require("../models/MenuItem");

const router = express.Router();

// GET all menu items
router.get("/", async (req, res) => {
try {
const items = await MenuItem.find().sort({ createdAt: -1 });
res.json(items);
} catch (err) {
res.status(500).json({ message: err.message });
}
});

// POST add a new menu item
router.post("/", async (req, res) => {
try {
const item = await MenuItem.create(req.body);
res.status(201).json(item);
} catch (err) {
res.status(400).json({ message: err.message });
}
});

// DELETE a menu item
router.delete("/:id", async (req, res) => {
try {
await MenuItem.findByIdAndDelete(req.params.id);
res.json({ message: "Item deleted" });
} catch (err) {
res.status(400).json({ message: err.message });
}
});

module.exports = router;