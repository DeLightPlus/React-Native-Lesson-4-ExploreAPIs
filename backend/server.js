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


app.post('/payment-sheet', async (req, res) => {
  const { amount } = req.body;
  console.log("Reached out with amount: R", amount);

  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2024-11-20.acacia'}
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'zar', 
    // currency: 'eur', 
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter
    // is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: 'pk_test_51QV5eXKfXucQGnUWPUDI6M2raAoebipaveIJLPgZEgNoFgkKk7yRi1lZH7lXYEpoonLNYm1JmwovnwVQsYhnnX5h00fjH0z8uv'
  });
});

app.post("/payment-intent", async (req, res) => {
    const { amount } = req.body;
    console.log(amount);    
  
    try 
    {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Convert amount to cents
        currency: "zar",
      });
  
      res.json({ clientSecret: paymentIntent.client_secret });
    } 
    catch (error) 
    {
      res.status(500).json({ error: error.message });
    }
  });
  



app.listen(PORT, () => console.log("Server running on port: "+PORT));