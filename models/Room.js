const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomId: { type: String, unique: true, index: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);
