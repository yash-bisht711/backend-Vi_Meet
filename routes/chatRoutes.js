// const express = require("express");
// const Message = require("../models/Message");
// const auth = require("../middlewares/auth");

// const router = express.Router();

// // Fetch chat history for a room
// router.get("/:roomId", auth, async (req, res) => {
//   const { roomId } = req.params;
//   const msgs = await Message.find({ roomId })
//     .sort({ createdAt: 1 })
//     .limit(200)
//     .populate("sender", "name email")
//     .lean();
//   res.json({ messages: msgs });
// });

// module.exports = router;

const express = require("express");
const auth = require("../middlewares/auth");
const Message = require("../models/Message");

const router = express.Router();

router.get("/:roomId", auth, async (req, res) => {
  try {
    const msgs = await Message.find({ roomId: req.params.roomId })
      .sort({ createdAt: 1 })
      .limit(500)
      .populate("sender", "name email")
      .lean();
    res.json({ messages: msgs });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
