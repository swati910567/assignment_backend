const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middlewares/authMiddleware");
const {
  registerForEvent,
  cancelRegistration,
  getAttendees,
} = require("../controllers/registrationController");

router.post("/:id/register", authenticateUser, registerForEvent);
router.delete("/:id/register", authenticateUser, cancelRegistration);
router.get("/:id/attendees", authenticateUser, getAttendees);

module.exports = router;
