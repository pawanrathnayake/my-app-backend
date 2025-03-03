const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes"); // Update this path based on where your routes are

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration to allow Netlify frontend
app.use(cors({
  origin: 'https://eloquent-biscotti-2bc0c3.netlify.app/', // Replace with your actual deployed Netlify URL
  methods: ['POST', 'GET', 'OPTIONS'], // Allow specific methods if necessary
  allowedHeaders: ['Content-Type', 'Authorization'] // Ensure headers like Content-Type and Authorization are allowed
}));

// Middleware
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Server is up and running");
});

// Use the user routes for API endpoints
app.use("/api/users", userRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
