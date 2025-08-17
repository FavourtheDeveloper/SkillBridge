// controllers/paymentController.js
const axios = require("axios");
const { Booking } = require("../models");
const { UniqueConstraintError } = require("sequelize");

// 🔁 Initiate Paystack payment
exports.initiatePayment = async (req, res) => {
  const { amount, email, ...booking } = req.body;

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100, // kobo
        metadata: {
          gigId: booking.gigId,
          name: booking.name,
          address: booking.address,
          date: booking.date,
          userId: booking.userId,
        },
        callback_url: "http://localhost:5173/my-bookings", // ✅ Redirect back to frontend with ?reference
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    res.json({ authorization_url: response.data.data.authorization_url });
  } catch (err) {
    console.error("❌ Payment initiation failed", err);
    res.status(500).json({ error: "Payment initiation failed" });
  }
};

// 🔁 Verify payment
exports.verifyPayment = async (req, res) => {
  const { reference } = req.params;

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const { status, amount, customer, metadata } = response.data.data;

    if (status === "success") {
      try {
        await Booking.create({
          gigId: metadata.gigId,
          name: metadata.name,
          email: customer.email,
          address: metadata.address,
          date: metadata.date,
          amount: amount / 100,
          userId: metadata.userId,
        });

        console.log("Saving booking with:", {
          status: "Default",
          gigId: metadata.gigId,
          name: metadata.name,
          email: customer.email,
          address: metadata.address,
          date: metadata.date,
          amount: amount / 100,
          userId: metadata.userId,
        });
        

        return res.json({ success: true, message: "Booking saved" });
      } catch (err) {
        if (err instanceof UniqueConstraintError) {
          return res.status(200).json({ success: true, message: "Booking already exists" });
        } else {
          throw err;
        }
      }
    }

    return res.status(400).json({ success: false, message: "Payment failed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Verification failed" });
  }
};

