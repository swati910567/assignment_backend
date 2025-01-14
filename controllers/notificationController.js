const Event = require("../models/EventModel");
const User = require("../models/UserModel");
const sendEmail = require("../utils/sendEmail");

const sendNotification = async (req, res) => {
  const { event_id, message } = req.body;

  try {
    if (!event_id || !message) {
      return res
        .status(400)
        .json({ message: "Event ID and message are required." });
    }

    const event = await Event.findById(event_id).populate("attendees", "email");
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    const attendeeEmails = event.attendees.map((attendee) => attendee.email);

    for (const email of attendeeEmails) {
      await sendEmail(email, `Notification for ${event.name}`, message);
    }

    return res.status(200).json({ message: "Notification sent successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send notifications." });
  }
};

module.exports = {
  sendNotification,
};
