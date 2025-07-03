const express = require("express");
const router = express.Router();
const { getNearbyArtisans } = require("../controllers/artisanController");

// GET /artisans/nearby?latitude=6.5&longitude=3.3
router.get("/nearby", getNearbyArtisans);

module.exports = router;
