// controllers/recommendationController.js
const { Booking, Gig } = require("../models");
const { Op } = require("sequelize");

exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;

    // ✅ Get last booking
    const lastBooking = await Booking.findOne({
      where: { userId },
      include: [{ model: Gig, attributes: ["id", "title", "category"] }],
      order: [["createdAt", "DESC"]],
    });

    let recommendations;

    if (!lastBooking) {
      // 🟢 No history → show latest/popular gigs
      recommendations = await Gig.findAll({
        limit: 3,
        order: [["createdAt", "DESC"]],
      });
    } else {
      // 🟢 Try to fetch similar category gigs
      recommendations = await Gig.findAll({
        where: {
          category: lastBooking.Gig.category,
          id: { [Op.ne]: lastBooking.Gig.id }, // exclude the same gig
        },
        limit: 3,
      });

      // 🟡 If no similar gigs found, fallback to popular gigs
      if (recommendations.length === 0) {
        recommendations = await Gig.findAll({
          limit: 3,
          order: [["createdAt", "DESC"]],
        });
      }
    }

    res.json({ recommendations });
  } catch (err) {
    console.error("Error fetching recommendations:", err);
    res.status(500).json({ error: "Server error" });
  }
};
