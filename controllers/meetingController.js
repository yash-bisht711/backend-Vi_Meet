const Meeting = require("../models/Meeting");

exports.scheduleMeeting = async (req, res) => {
  try {
    const { title, roomId, participants, date, time } = req.body;
    const meeting = await Meeting.create({
      title,
      roomId,
      organizer: req.user.id,
      participants,
      date,
      time,
    });
    res.json(meeting);
  } catch (err) {
    res.status(500).json({ msg: "Error scheduling meeting", error: err.message });
  }
};

exports.myMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({
      $or: [{ organizer: req.user.id }, { participants: req.user.id }]
    }).populate("organizer participants", "name email");
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching meetings" });
  }
};

exports.updateMeeting = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Meeting.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Error updating meeting" });
  }
};

exports.cancelMeeting = async (req, res) => {
  try {
    const { id } = req.params;
    await Meeting.findByIdAndUpdate(id, { status: "cancelled" });
    res.json({ msg: "Meeting cancelled" });
  } catch (err) {
    res.status(500).json({ msg: "Error cancelling meeting" });
  }
};
