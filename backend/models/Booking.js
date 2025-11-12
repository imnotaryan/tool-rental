const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
  userName: String,
  startDate: Date,
  endDate: Date,
  totalCost: Number,
  status: { type: String, default: "Booked" },
});

module.exports = mongoose.model("Booking", bookingSchema);
