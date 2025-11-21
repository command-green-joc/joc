const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const { amount, description } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: description || 'Command.Green Report' },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${req.headers.origin}/warroom.html?success=1`,
      cancel_url: `${req.headers.origin}/warroom.html`,
    });
    res.status(200).json({ id: session.id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Payment failed' });
  }
};
