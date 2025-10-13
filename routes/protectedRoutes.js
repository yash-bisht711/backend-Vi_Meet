const express = require("express");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/me", auth, (req, res) => {
  res.json({ message: "Protected route success", user: req.user });
});

module.exports = router;
