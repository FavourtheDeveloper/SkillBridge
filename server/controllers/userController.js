const { User } = require("../models");

// 🔍 GET /users/me - Get authenticated user
exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "role"],
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ✏️ PUT /users/me - Update user profile
exports.updateMe = async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    await User.update(
      { name, phone, address },
      { where: { id: req.user.id } }
    );

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Server error" });
  }
};
