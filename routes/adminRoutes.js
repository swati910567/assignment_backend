const express = require("express");
const {
  getAllUsers,
  getAllEvents,
  deleteUser,
} = require("../controllers/adminController");
const router = express.Router();

router.get("/users", getAllUsers);

router.get("/events", getAllEvents);

router.delete("/users/:id", deleteUser);

module.exports = router;
