import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Paywall() {
  const [hasAccess, setHasAccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function checkSubscription() {
      try {
        const res = await fetch("/api/paywall", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure user is authenticated
          },
        });

        const data = await res.json();
        if (data.error) throw new Error(data.message);
        setHasAccess(data.hasActiveSubscription);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    checkSubscription();
  }, []);

  async function handleSubscribe() {
    setLoading(true);
    try {
      const stripe = await stripePromise;
      const res = await fetch("/api/paywall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "user@example.com" }), // Replace with actual user email
      });

      const data = await res.json();
      if (!data.checkoutUrl) throw new Error("Failed to create checkout session");

      window.location.href = data.checkoutUrl; // Redirect to Stripe Checkout
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return hasAccess ? (
    <div>
      <h2>🎉 You have full access! Enjoy your content.</h2>
      <p>Welcome to the premium section.</p>
    </div>
  ) : (
    <div style={{ textAlign: "center", padding: "20px", border: "1px solid #ccc" }}>
      <h2>🔒 This content is locked.</h2>
      <p>Subscribe now to unlock premium content.</p>
      <button 
        onClick={handleSubscribe} 
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        Subscribe Now
      </button>
    </div>
  );
}
