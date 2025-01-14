const Event = require("../models/EventModel");

module.exports.registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.attendees.includes(req.user._id)) {
      return res
        .status(400)
        .json({ message: "User is already registered for this event" });
    }

    event.attendees.push(req.user._id);
    await event.save();

    res
      .status(200)
      .json({ message: "Successfully registered for the event", event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.cancelRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (!event.attendees.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You are not registered for this event" });
    }

    event.attendees = event.attendees.filter(
      (attendee) => attendee.toString() !== userId
    );

    await event.save();

    return res.status(200).json({
      message: "Your registration for the event has been canceled.",
      event,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports.getAttendees = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "attendees",
      "name email"
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event.attendees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
