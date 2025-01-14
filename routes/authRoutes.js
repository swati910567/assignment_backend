const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserDetails,
  updateUserDetails,
} = require("../controllers/authController");
const { authenticateUser } = require("../middlewares/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", authenticateUser, getUserDetails);
router.put("/:id", authenticateUser, updateUserDetails);

module.exports = router;
