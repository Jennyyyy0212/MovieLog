const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Get token from the Authorization header
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach userId to request object
    req.user = { userId: decoded.userId };

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
