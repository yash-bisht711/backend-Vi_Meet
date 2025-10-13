const mongoose = require("mongoose");

const MeetingSchema = new mongoose.Schema(
  {
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      default: "Zoom Clone Meeting",
    },
    description: {
      type: String,
      default: "",
    },
    date: String,
    time: String,
    meetingLink: String,
    roomId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Meeting", MeetingSchema);
