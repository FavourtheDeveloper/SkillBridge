const express = require("express");
const router = express.Router();
const { upload } = require("../utils/cloudinary");
const verifyToken = require("../middleware/authMiddleware");
const {
  getGigs,
  getGigById,
  createGig,
  updateGig,
  getUserGigs,
  deleteGig,
  getNearbyGigs
} = require("../controllers/gigController");

router.get("/nearby", verifyToken, getNearbyGigs); // GET /gigs/nearby

// ✅ Fetch all gigs (could be public or protected)
router.get("/", getGigs); // GET /gigs

// ❓ Optional: fetch only gigs of logged-in user (could be removed if not needed separately)
router.get("/my-gigs", verifyToken, getUserGigs); // GET /gigs/my-gigs

// ✅ Fetch a single gig by ID
router.get("/:id", getGigById); // GET /gigs/:id

// ✅ Create a new gig
router.post("/", verifyToken, upload.single("image"), createGig); // POST /gigs

// ✅ Update a gig
router.put("/:id", verifyToken, upload.single("image"), updateGig); // PUT /gigs/:id

// ✅ Delete a gig
router.delete("/:id", verifyToken, deleteGig); // DELETE /gigs/:id





module.exports = router;