const express = require('express');
const cors = require('cors');
const db = require('./models');
const paymentRoutes = require("./routes/paymentRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/gigs', require('./routes/gigs'));
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/artisans", require("./routes/artisanRoutes"));
app.use("/api", paymentRoutes);
app.use("/api/users", userRoutes); // 👈 e.g. /users/me
app.use("/api", require("./routes/recommendationRoutes"));







app.get('/test', (req, res) => {
  res.send('Public route working');
});

app.get('/', (req, res) => {
  res.send('Server Started');
});

const PORT = process.env.PORT || 3000;

db.sequelize.sync({ force: false }) // change to true only for development
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log("DB sync error:", err));

 