import Stripe from 'stripe';
import { clerkClient } from '@clerk/clerk-sdk-node';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get auth token from request headers
    const authHeader = req.headers.authorization || '';
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Verify token with Clerk
    const { sub: userId } = await clerkClient.verifyToken(token);
    
    if (!userId) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    // Get user from Clerk
    const user = await clerkClient.users.getUser(userId);
    
    // Check if user has subscription data in metadata
    const subscription = user.privateMetadata.subscription;
    
    if (subscription && subscription.id) {
      // Check if subscription is still valid
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      const stripeSubscription = await stripe.subscriptions.retrieve(subscription.id);
      
      const hasActiveSubscription = stripeSubscription.status === 'active';
      
      return res.status(200).json({ hasActiveSubscription });
    }
    
    return res.status(200).json({ hasActiveSubscription: false });
  } catch (error) {
    console.error('Error checking subscription:', error);
    res.status(500).json({ error: error.message });
  }
}
