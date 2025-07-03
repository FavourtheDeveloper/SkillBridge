const db = require("../models");
const { Op, literal } = require("sequelize");

// Find artisans near a customer's coordinates (within X km)
exports.getNearbyArtisans = async (req, res) => {
  try {
    const { latitude, longitude } = req.query; // from frontend
    const maxDistance = 10; // in kilometers

    if (!latitude || !longitude) {
      return res.status(400).json({ error: "Missing coordinates" });
    }

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    // Haversine formula in raw SQL
    const distanceQuery = `
      6371 * acos(
        cos(radians(${lat}))
        * cos(radians("latitude"))
        * cos(radians("longitude") - radians(${lon}))
        + sin(radians(${lat})) * sin(radians("latitude"))
      )
    `;

    const nearbyArtisans = await db.User.findAll({
      where: {
        role: 'artisan',
        latitude: { [Op.ne]: null },
        longitude: { [Op.ne]: null },
      },
      attributes: {
        include: [[literal(distanceQuery), 'distance']],
      },
      having: literal(`${distanceQuery} <= ${maxDistance}`),
      order: literal('distance ASC'),
    });

    res.json({ artisans: nearbyArtisans });
  } catch (err) {
    console.error("Error fetching nearby artisans:", err);
    res.status(500).json({ error: "Failed to fetch artisans" });
  }
};
