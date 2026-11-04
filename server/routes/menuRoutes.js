const express = require("express");
const MenuItem = require("../models/MenuItem");
const { parseMenuItem, parseId } = require("../utils/sanitize");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const items = await MenuItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Could not load menu." });
  }
});

router.post("/", async (req, res) => {
  const parsed = parseMenuItem(req.body);
  if (parsed.error) return res.status(400).json({ message: parsed.error });

  try {
    const item = await MenuItem.create(parsed.value);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: "Could not create menu item." });
  }
});

router.delete("/:id", async (req, res) => {
  const id = parseId(req.params.id);
  if (id.error) return res.status(400).json({ message: id.error });

  try {
    const item = await MenuItem.findByIdAndDelete(id.value);
    if (!item) return res.status(404).json({ message: "Item not found." });
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(400).json({ message: "Could not delete item." });
  }
});

module.exports = router;
