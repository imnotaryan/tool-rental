const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  category: String,
  ratePerDay: Number,
  available: { type: Boolean, default: true },
  image: String,
});

module.exports = mongoose.model("Item", itemSchema);
