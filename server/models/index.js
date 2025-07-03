const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.User = require('./user')(sequelize, Sequelize);
db.Gig = require('./gig')(sequelize, Sequelize); // 👈 Register the Gig model
db.Booking = require('./booking')(sequelize, Sequelize); // ✅ Register Booking model


// Associations (optional, if any)
if (db.User.associate) db.User.associate(db);
if (db.Gig.associate) db.Gig.associate(db);
if (db.Booking.associate) db.Booking.associate(db); // ✅ Add association if exists


module.exports = db;
