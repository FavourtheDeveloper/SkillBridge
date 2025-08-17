const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, latitude, longitude, location } = req.body;

    const existing = await db.User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ error: "Email already in use" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await db.User.create({
      name,
      email,
      password: hashed,
      role,
      latitude,
      longitude,
      location,
    });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        latitude: user.latitude,
        longitude: user.longitude,
        location: user.location,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, name: user.name, role: user.role, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] }, // omit password
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user", details: err.message });
  }
};
