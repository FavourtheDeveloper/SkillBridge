// routes/recommendationRoutes.js
const express = require("express");
const router = express.Router();
const { getRecommendations } = require("../controllers/recommendationController");
const  verifyToken = require("../middleware/authMiddleware");

router.get("/recommendations", verifyToken, getRecommendations);

module.exports = router;
