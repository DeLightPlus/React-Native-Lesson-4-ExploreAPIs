require('dotenv').config(); 
const express = require("express");
const bodyParser = require('body-parser');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const stripe = require("stripe")("sk_test_51QV5eXKfXucQGnUWKVgAP8otwy9WcOIDbTDat5GMo80ZQjbMxQNa0UGUBgDXZGcLONkdPVd9bUuguiZknAYabrFq00OFfJ8E0O");
const cors = require("cors");
const PORT = 3080;

const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(express.json());

console.log(process.env.STRIPE_SECRET_KEY);

app.post("/payment-intent", async (req, res) => {
    const { amount } = req.body;
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Convert amount to cents
        currency: "zar",
      });
  
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.listen(PORT, () => console.log("Server running on port: "+PORT));