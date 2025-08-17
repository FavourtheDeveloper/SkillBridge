const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

// GET /users/me
router.get("/me", verifyToken, userController.getMe);

// PUT /users/me
router.put("/me", verifyToken, userController.updateMe);

module.exports = router;
