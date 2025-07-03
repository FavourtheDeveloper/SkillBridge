const db = require("../models");
const { Op, Sequelize } = require("sequelize");
const { User, Gig } = require("../models");


exports.createGig = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;
    const userId = req.user.id;

    const imageUrl = req.file?.path || null; // ✅ Get image from multer (Cloudinary)

    const newGig = await db.Gig.create({
      title,
      description,
      category,
      price,
      userId,
      image: imageUrl,
    });

    res.status(201).json({ message: "Gig created", gig: newGig });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateGig = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;

    const gig = await db.Gig.findByPk(req.params.id);
    if (!gig) return res.status(404).json({ error: "Gig not found" });
    if (gig.userId !== req.user.id) return res.status(403).json({ error: "Unauthorized" });

    const imageUrl = req.file?.path || gig.image; // ✅ fallback to previous image

    await gig.update({
      title,
      description,
      category,
      price,
      image: imageUrl,
    });

    res.json({ message: "Gig updated", gig });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getUserGigs = async (req, res) => {
  try {
    console.log("Requesting gigs for user:", req.user);

    const userId = req.user.id;

    const gigs = await db.Gig.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    res.json({ gigs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteGig = async (req, res) => {
  try {
    const gig = await db.Gig.findByPk(req.params.id);

    if (!gig) return res.status(404).json({ error: "Gig not found" });
    if (gig.userId !== req.user.id) return res.status(403).json({ error: "Unauthorized" });

    await gig.destroy();

    res.json({ message: "Gig deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.getGigs = async (req, res) => {
  try {
    const gigs = await db.Gig.findAll({
      include: {
        model: db.User,
        attributes: ["name"], // You can add other fields like photo if needed
      },
      order: [["createdAt", "DESC"]],
    });

    res.json({ gigs });
  } catch (err) {
    console.error("Error fetching all gigs:", err);
    res.status(500).json({ error: "Failed to fetch all gigs" });
  }
};




exports.getGigById = async (req, res) => {
  try {
    const gig = await db.Gig.findByPk(req.params.id);

    if (!gig) return res.status(404).json({ error: "Gig not found" });

    res.json(gig);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch gig" });
  }
};



exports.getNearbyGigs = async (req, res) => {
  const { latitude, longitude } = req.query;

  try {
    const nearbyArtisans = await User.findAll({
      attributes: ["id"],
      where: {
        role: "artisan",
        latitude: { [Op.not]: null },
        longitude: { [Op.not]: null },
        [Op.and]: Sequelize.literal(`
          111.111 * DEGREES(ACOS(LEAST(1.0,
            COS(RADIANS(${latitude}))
            * COS(RADIANS("latitude"))
            * COS(RADIANS(${longitude}) - RADIANS("longitude"))
            + SIN(RADIANS(${latitude}))
            * SIN(RADIANS("latitude"))
          ))) < 100
        `),
      },
    });

    const artisanIds = nearbyArtisans.map((artisan) => artisan.id);

    if (artisanIds.length === 0) {
      return res.json({ gigs: [] });
    }

    const gigs = await Gig.findAll({
      where: {
        userId: { [Op.in]: artisanIds },
      },
      include: {
        model: db.User,
        attributes: ["name"],
      },
      order: [["createdAt", "DESC"]],
    });

    res.json({ gigs });
  } catch (error) {
    console.error("Error fetching nearby gigs:", error);
    res.status(500).json({ error: "Failed to fetch nearby gigs" });
  }
};
