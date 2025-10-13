const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  roomId: { type: String, index: true, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);
