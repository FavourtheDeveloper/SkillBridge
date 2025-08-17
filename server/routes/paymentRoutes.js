const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post("/payments/initiate", paymentController.initiatePayment);
router.get("/payments/verify/:reference", paymentController.verifyPayment);

module.exports = router;
