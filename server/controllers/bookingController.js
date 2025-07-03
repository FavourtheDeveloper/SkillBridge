// controllers/bookingController.js
const db = require("../models");

exports.createBooking = async (req, res) => {
  try {
    const { gigId, name, email, address, date, amount } = req.body;
    const userId = req.user.id;

    const booking = await db.Booking.create({
      gigId,
      userId,
      name,
      email,
      address,
      date,
      amount,
    });

    res.status(201).json({ message: "Booking successful", booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await db.Booking.findAll({
      where: { userId },
      include: [{ model: db.Gig }],
    });

    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookingsOnMyGigs = async (req, res) => {
  try {
    const userId = req.user.id;

    const gigs = await db.Gig.findAll({
      where: { userId },
      attributes: ["id"],
    });

    const gigIds = gigs.map((g) => g.id);

    const bookings = await db.Booking.findAll({
      where: { gigId: gigIds },
      include: [{ model: db.Gig }],
    });

    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await db.Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    booking.status = "Completed";
    await booking.save();

    return res.status(200).json({ message: "Booking marked as completed", booking });
  } catch (error) {
    console.error("Error updating booking:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
