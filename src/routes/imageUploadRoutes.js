const express = require("express");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "profile_images", // Cloudinary folder name
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

// Upload profile image
router.post("/api/users/upload-profile-image", authMiddleware, upload.single("profileImage"), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Update user's profileImage field
    user.profileImage = req.file.path;
    await user.save();

    res.json({ message: "Profile image uploaded successfully", profileImage: user.profileImage });
  } catch (err) {
    console.error("Error uploading profile image:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update user profile to include profileImage
router.put("/api/users/:id", authMiddleware, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;