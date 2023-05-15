const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { promisify } = require("util");
const User = require("../models/User");

const Authentic = async (req, res, next) => {
  const tokenBeare = req.header("authorization");
  if (!tokenBeare) {
    return res.status(401).send("Access denied. No token provided.");
  }
  try {
    const token = tokenBeare.replace("Bearer ", "");
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    req.userid = user.id;
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }
};

module.exports = Authentic;
