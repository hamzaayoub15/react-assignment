const express = require("express");
const router = express.Router();
const chatController = require("../Controllers/chatController");
const auth = require("../Middleware/Auth");
router.post("/signup", chatController.createUser);
router.post("/login", chatController.loginUser);
router.post("/chat", auth, chatController.sendMessage);
router.post("/logout", auth, chatController.logout);

module.exports = router;
