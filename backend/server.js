const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/items", require("./routes/itemRoutes.js"));
app.use('/api/users', userRoutes);
app.use("/api/bookings", require("./routes/bookingRoutes"));

app.get("/", (req, res) => {
  res.send("Tool Rental API is running 🚀");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
