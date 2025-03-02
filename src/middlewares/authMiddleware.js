const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded);  // Debugging output
    req.user = decoded;  // Ensure the ID is correctly attached
    next();
  } catch (err) {
    console.error("Error in authMiddleware:", err);
    res.status(401).json({ error: "Token is not valid" });
  }
};

module.exports = authMiddleware;
