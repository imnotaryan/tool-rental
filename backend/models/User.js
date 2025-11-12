const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // no hashing, just simple match
  email: String,
  phone: String,
  rentals: [
    {
      itemName: String,
      startDate: String,
      endDate: String,
      status: { type: String, default: 'ongoing' },
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
