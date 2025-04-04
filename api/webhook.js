import Stripe from 'stripe';
import { clerkClient } from '@clerk/clerk-sdk-node';
import { buffer } from 'micro';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    // Get the raw body
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);

    // Handle the event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const userId = session.client_reference_id;
      
      // When payment succeeds, update Clerk user metadata
      if (userId) {
        // Get the subscription details
        const subscription = await stripe.subscriptions.retrieve(session.subscription);
        
        // Update the user's metadata with subscription info
        await clerkClient.users.updateUser(userId, {
          privateMetadata: {
            subscription: {
              id: subscription.id,
              status: subscription.status,
              currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
            }
          }
        });
      }
    }
    
    // Handle subscription updated or deleted
    if (event.type === 'customer.subscription.updated' || 
        event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object;
      
      // Find the user by subscription ID in metadata
      const users = await clerkClient.users.getUserList({
        privateMetadataKey: 'subscription.id',
        privateMetadataValue: subscription.id
      });
      
      if (users.length > 0) {
        // Update the user with new subscription status
        await clerkClient.users.updateUser(users[0].id, {
          privateMetadata: {
            subscription: {
              id: subscription.id,
              status: subscription.status,
              currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
            }
          }
        });
      }
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ error: `Webhook Error: ${error.message}` });
  }
}
