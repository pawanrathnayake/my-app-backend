const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes"); 
const imageUploadRoutes = require("./routes/imageUploadRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// CORS Configuration
app.use(cors({
  origin: "https://eloquent-biscotti-2bc0c3.netlify.app", // Ensure no trailing slash
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware
app.use(express.json());

// Handle preflight CORS requests properly
app.options("*", cors()); 

// Routes
app.use("/api/users", userRoutes);
app.use(imageUploadRoutes); // Ensure this is after the CORS setup

// Root Route
app.get("/", (req, res) => {
  res.send("Server is up and running");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
