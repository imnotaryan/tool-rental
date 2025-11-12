const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Item = require("../models/Item");

// Get all bookings
router.get("/", async (req, res) => {
  const bookings = await Booking.find().populate("itemId");
  res.json(bookings);
});

// Create a booking
router.post("/", async (req, res) => {
  const { itemId, userName, startDate, endDate } = req.body;

  // Get the item
  const item = await Item.findById(itemId);
  if (!item.available) return res.json({ message: "Item not available!" });

  const days =
    (new Date(endDate).getTime() - new Date(startDate).getTime()) /
    (1000 * 60 * 60 * 24);
  const totalCost = days * item.ratePerDay;

  const booking = new Booking({
    itemId,
    userName,
    startDate,
    endDate,
    totalCost,
  });

  await booking.save();

  // Mark item unavailable
  item.available = false;
  await item.save();

  res.json({ message: "Booking created!", booking });
});

router.get("/user/:username", async (req, res) => {
  try {
    const username = req.params.username;

    // 1️⃣ Find all bookings for this user
    const bookings = await Booking.find({ userName: username });

    // 2️⃣ Extract all unique item IDs from those bookings
    const itemIds = bookings.map(b => b.itemId);

    // 3️⃣ Find item details for only those IDs
    const itemList = await Item.find({ _id: { $in: itemIds } });

    // 4️⃣ Send both in response
    res.json({ bookings, itemList });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching user bookings" });
  }
});



module.exports = router;
