const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const { getProfile, updateProfile } = require('../controllers/userController');

const router = express.Router();

// Register User (Without Password Hashing)
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Create the user (no password hashing)
    const newUser = new User({
      firstName,
      lastName,
      email,
      password, // Store password as it is (no hash)
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login User (Direct comparison without hashing)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Directly compare plain-text passwords (⚠️ Not secure)
    if (password !== user.password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, userId: user._id });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Profile route with JWT authentication
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    console.log("Decoded User ID from JWT:", req.user.id);  // Debugging the decoded user ID

    // Ensure req.user.id exists and is valid
    if (!req.user.id) {
      return res.status(400).json({ error: "Invalid token: User ID missing" });
    }

    // Fetch user profile using the ID from JWT token
    const user = await User.findById(req.user.id).select("-password"); // Exclude password
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch User Profile
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");  // Exclude password
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update User Profile
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/profile', authMiddleware, getProfile);

// Route to update the user's profile (protected)
router.put('/user/:id', authMiddleware, updateProfile);

module.exports = router;