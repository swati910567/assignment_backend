const express = require("express");
const {
  getPopularEvents,
  getActiveUsers,
  getEventStats,
} = require("../controllers/analyticsController");
const router = express.Router();

router.get("/events/popular", getPopularEvents);

router.get("/users/active", getActiveUsers);

router.get("/events/:id/stats", getEventStats);

module.exports = router;
