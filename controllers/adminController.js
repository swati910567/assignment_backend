const User = require("../models/UserModel");
const Event = require("../models/EventModel");

module.exports.getAllUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    if (page > totalPages) {
      return res.status(200).json({
        users: [],
        totalUsers,
        totalPages,
        currentPage: page,
        message: "Page number exceeds total pages available",
      });
    }
    const users = await User.find().skip(skip).limit(limit);
    res.status(200).json({
      users,
      totalUsers,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("attendees");
    const eventStats = events.map((event) => ({
      eventId: event._id,
      name: event.name,
      registrationsCount: event.attendees.length,
      capacity: event.capacity,
      date: event.date,
    }));
    res.status(200).json(eventStats);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { isDeleted: true } },
      { new: true }
    );

    await Event.updateMany(
      { attendees: userId },
      { $pull: { attendees: userId } }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
