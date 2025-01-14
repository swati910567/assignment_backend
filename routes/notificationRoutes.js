const express = require("express");
const { sendNotification } = require("../controllers/notificationController");
const {
  authenticateUser,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/send",
  authenticateUser,
  authorizeRoles(["organizer", "admin"]),
  sendNotification
);

module.exports = router;
