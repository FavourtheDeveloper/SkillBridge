const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/", verifyToken, bookingController.createBooking);
router.get("/my-bookings", verifyToken, bookingController.getMyBookings); // booked by user
router.get("/gig-bookings", verifyToken, bookingController.getBookingsOnMyGigs); // as service provider
router.put("/complete/:id", verifyToken, bookingController.updateBookingStatus); 
router.put("/accept/:id", verifyToken, bookingController.acceptBooking);
router.put("/reject/:id", verifyToken, bookingController.rejectBooking);


module.exports = router;
