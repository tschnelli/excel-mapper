// api/paywall.js - Vercel Serverless Function
import { verifyToken } from '../utils/auth';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // CORS handling
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Route handling
  switch (req.method) {
    case 'GET':
      return handleSubscriptionCheck(req, res);
    case 'POST':
      return handleCheckoutSession(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Check subscription status
async function handleSubscriptionCheck(req, res) {
  try {
    // Verify JWT token
    const user = verifyToken(req.headers.authorization);
    
    // In a real app, you'd check against your database
    const subscriptionStatus = await checkUserSubscription(user.id);
    
    res.status(200).json({
      hasActiveSubscription: subscriptionStatus.active,
      subscriptionDetails: subscriptionStatus
    });
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized', message: error.message });
  }
}

// Create Stripe checkout session
async function handleCheckoutSession(req, res) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{
        price: process.env.STRIPE_PRICE_ID, // Your Stripe price ID
        quantity: 1,
      }],
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      // Optional: add customer email if available
      customer_email: req.body.email || undefined,
    });

    res.status(200).json({ checkoutUrl: session.url });
  } catch (error) {
    console.error('Checkout session error:', error);
    res.status(500).json({ error: 'Could not create checkout session' });
  }
}

// Placeholder for subscription check
async function checkUserSubscription(userId) {
  // In a real implementation, this would:
  // 1. Check database for user's subscription
  // 2. Verify with Stripe if subscription is active
  return {
    active: false,
    userId: userId,
    reason: 'Implement actual subscription verification'
  };
}
