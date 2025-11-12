const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// Get all items
router.get("/", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Add new item (for admin/testing)
router.post("/", async (req, res) => {
  const { name, category, ratePerDay, image } = req.body;
  const newItem = new Item({ name, category, ratePerDay, image });
  await newItem.save();
  res.json({ message: "Item added!", newItem });
});

// Update availability after booking
router.put("/:id", async (req, res) => {
  const { available } = req.body;
  await Item.findByIdAndUpdate(req.params.id, { available });
  res.json({ message: "Item availability updated!" });
});

module.exports = router;
