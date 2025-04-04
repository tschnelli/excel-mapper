// /api/test-stripe.js
import Stripe from 'stripe';

export default async function handler(req, res) {
  try {
    // Check if Stripe is initialized correctly
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    
    // Get Stripe account info to verify connection
    const account = await stripe.account.retrieve();
    
    return res.status(200).json({
      status: 'success',
      message: 'Stripe connection successful',
      account: {
        id: account.id,
        name: account.business_profile?.name || 'Not set',
        environment: process.env.STRIPE_SECRET_KEY.startsWith('sk_test') ? 'test' : 'live'
      },
      env: {
        baseUrl: process.env.BASE_URL || 'Not set',
        hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
        keyPrefix: process.env.STRIPE_SECRET_KEY?.substring(0, 7)
      }
    });
  } catch (error) {
    console.error('Stripe test error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Stripe connection failed',
      error: error.message
    });
  }
}
