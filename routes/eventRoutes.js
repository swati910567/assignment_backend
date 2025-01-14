const express = require("express");
const router = express.Router();
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const {
  authenticateUser,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

router.post("/createEvents", authenticateUser, createEvent);
router.get("/getAllEvents", getEvents);
router.get("/:id/getEvent", getEventById);
router.put(
  "/:id/updateEvent",
  authenticateUser,
  authorizeRoles("organizer"),
  updateEvent
);
router.delete(
  "/:id/delete",
  authenticateUser,
  authorizeRoles("organizer"),
  deleteEvent
);

module.exports = router;
