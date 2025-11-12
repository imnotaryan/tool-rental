const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env

const connectDB = async () => {
  try {
    const mongoURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.asycrsw.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`;

    await mongoose.connect(mongoURI);
    // console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
  }
};

module.exports = connectDB;
