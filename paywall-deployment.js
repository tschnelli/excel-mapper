// paywall-deployment.js
const express = require('express');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

class PaywallSystem {
    constructor() {
        this.app = express();
        this.setupMiddleware();
        this.setupRoutes();
    }

    setupMiddleware() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    setupRoutes() {
        // Subscription check endpoint
        this.app.get('/api/check-subscription', this.verifyToken, this.checkSubscription);

        // Create checkout session
        this.app.post('/api/create-checkout-session', this.createCheckoutSession);

        // Webhook for payment confirmations
        this.app.post('/webhook', this.handleWebhook);

        // Token verification endpoint
        this.app.post('/api/verify-token', this.verifyUserToken);
    }

    // Middleware to verify JWT token
    verifyToken(req, res, next) {
        const token = req.headers['authorization']?.split(' ')[1];
        
        if (!token) {
            return res.status(403).json({ error: 'No token provided' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    }

    // Check user's subscription status
    async checkSubscription(req, res) {
        try {
            // Retrieve user from database or external service
            const user = await this.getUserFromDatabase(req.user.id);
            
            res.json({
                hasActiveSubscription: user.subscriptionActive,
                subscriptionExpires: user.subscriptionExpires
            });
        } catch (error) {
            res.status(500).json({ error: 'Could not verify subscription' });
        }
    }

    // Create Stripe checkout session
    async createCheckoutSession(req, res) {
        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'subscription',
                line_items: [{
                    price: 'price_your_stripe_price_id', // Replace with actual Stripe price ID
                    quantity: 1,
                }],
                success_url: `${process.env.FRONTEND_URL}/success`,
                cancel_url: `${process.env.FRONTEND_URL}/cancel`,
            });

            res.json({ checkoutUrl: session.url });
        } catch (error) {
            res.status(500).json({ error: 'Could not create checkout session' });
        }
    }

    // Handle Stripe webhook events
    async handleWebhook(req, res) {
        const sig = req.headers['stripe-signature'];

        try {
            const event = stripe.webhooks.constructEvent(
                req.body, 
                sig, 
                process.env.STRIPE_WEBHOOK_SECRET
            );

            switch (event.type) {
                case 'customer.subscription.created':
                    await this.handleSubscriptionCreated(event.data.object);
                    break;
                case 'customer.subscription.deleted':
                    await this.handleSubscriptionCanceled(event.data.object);
                    break;
            }

            res.json({ received: true });
        } catch (error) {
            res.status(400).send(`Webhook Error: ${error.message}`);
        }
    }

    // Verify user token (for additional security)
    async verifyUserToken(req, res) {
        const { token } = req.body;
        
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Additional database check
            const user = await this.getUserFromDatabase(decoded.id);
            
            res.json({
                valid: true,
                user: {
                    id: user.id,
                    subscriptionActive: user.subscriptionActive
                }
            });
        } catch (error) {
            res.status(401).json({ valid: false });
        }
    }

    // Placeholder for database interaction
    async getUserFromDatabase(userId) {
        // In a real implementation, this would query your database
        // For example, using MongoDB, PostgreSQL, or another database
        throw new Error('Database method not implemented');
    }

    // Start the server
    start(port = 3000) {
        this.app.listen(port, () => {
            console.log(`Paywall service running on port ${port}`);
        });
    }
}

// Export for use in other files
module.exports = new PaywallSystem();

// Optional: Immediate start if run directly
if (require.main === module) {
    const paywallSystem = new PaywallSystem();
    paywallSystem.start();
}
