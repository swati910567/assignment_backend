const Event = require("../models/EventModel");
const User = require("../models/UserModel");

module.exports.getPopularEvents = async (req, res) => {
  try {
    const events = await Event.aggregate([
      { $project: { name: 1, registrationsCount: { $size: "$attendees" } } },
      { $sort: { registrationsCount: -1 } },
      { $limit: 5 },
    ]);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports.getActiveUsers = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: "events",
          localField: "_id",
          foreignField: "attendees",
          as: "registeredEvents",
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
          registrationsCount: { $size: "$registeredEvents" },
        },
      },
      { $sort: { registrationsCount: -1 } },
      { $limit: 5 },
    ]);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports.getEventStats = async (req, res) => {
  const eventId = req.params.id;
  try {
    const event = await Event.findById(eventId).populate("attendees");
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const stats = {
      name: event.name,
      description: event.description,
      date: event.date,
      location: event.location,
      capacity: event.capacity,
      registrationsCount: event.attendees.length,
      attendees: event.attendees.map((user) => ({
        name: user.name,
        email: user.email,
      })),
    };

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
