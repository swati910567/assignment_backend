const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access token missing or invalid." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.isDeleted) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized." });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({
          message: "Access denied. You dont't have required permissions.",
        });
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRoles };
