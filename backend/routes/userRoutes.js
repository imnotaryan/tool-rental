const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 🧍 Register user
router.post('/register', async (req, res) => {
  const { username, password, email, phone } = req.body;
  try {
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const newUser = new User({ username, password, email, phone });
    await newUser.save();
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔑 Login (simple password match)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.password !== password)
      return res.status(400).json({ message: 'Invalid password' });

    res.json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const user = new User({ name, email, password });
    await user.save();
    res.json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login (just password match)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.password !== password)
      return res.status(401).json({ message: "Incorrect password" });

    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Error logging in" });
  }
});


module.exports = router;
