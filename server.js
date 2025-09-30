const express = require("express");
const Razorpay = require("razorpay");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Razorpay instance
const razorpay = new Razorpay({
  key_id: "rzp_live_RNYJje9mWkAgm7",
  key_secret: "3f3JFZHOQTyYZotlL25mxJeY"
});

// Create order API
app.post("/create-order", async (req, res) => {
  const { amount } = req.body;
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // paise
      currency: "INR",
      receipt: "donation_" + Date.now()
    });
    res.json(order);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
