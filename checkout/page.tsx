"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { loadStripe } from "@stripe/stripe-js"

// This would be your publishable key from Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const priceId = searchParams.get("priceId")

  const [planDetails, setPlanDetails] = useState({
    title: "",
    price: "",
    description: "",
  })

  useEffect(() => {
    // In a real app, you might fetch the plan details from your API
    // For demo purposes, we'll just set them based on the priceId
    if (priceId === "price_basic") {
      setPlanDetails({
        title: "Basic Plan",
        price: "$9.99/month",
        description: "Access to premium content",
      })
    } else {
      // Handle invalid priceId
      setError("Invalid plan selected")
    }
  }, [priceId])

  const handleCheckout = async () => {
    if (!priceId) {
      setError("No plan selected")
      return
    }

    setIsLoading(true)

    try {
      // In a real app, you would call your API to create a Stripe checkout session
      // const response = await fetch('/api/create-checkout-session', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ priceId }),
      // })
      // const { sessionId } = await response.json()

      // For demo purposes, we'll just simulate a redirect to Stripe
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would redirect to Stripe checkout
      // const stripe = await stripePromise
      // const { error } = await stripe.redirectToCheckout({ sessionId })

      // For demo, we'll just redirect to a success page
      router.push("/checkout/success")
    } catch (error) {
      console.error("Checkout failed:", error)
      setError("Failed to initiate checkout. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-red-500">Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.push("/")} className="w-full">
              Return to Plans
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-[#F5F5F5]">
      <Card className="w-full max-w-md border border-[#D0D7E5] shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-b from-[#D8E4F1] to-[#C5D9F1] border-b border-[#D0D7E5]">
          <CardTitle className="text-2xl text-[#1F497D]">Checkout</CardTitle>
          <CardDescription className="text-[#2F5496]">Complete your subscription purchase</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-6 bg-white">
          <div className="rounded-lg bg-[#EDF2F7] p-4 border border-[#D0D7E5]">
            <div className="text-lg font-medium text-[#1F497D]">{planDetails.title}</div>
            <div className="text-2xl font-bold mt-1 text-[#1F497D]">{planDetails.price}</div>
            <div className="text-sm text-[#2F5496] mt-1">{planDetails.description}</div>
          </div>
          <div className="text-sm text-[#2F5496]">
            You will be redirected to Stripe to complete your purchase securely.
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 p-6 bg-[#F8F9FA] border-t border-[#D0D7E5]">
          <Button onClick={handleCheckout} className="w-full bg-[#4472C4] hover:bg-[#2F5597]" disabled={isLoading}>
            {isLoading ? "Processing..." : "Proceed to Payment"}
          </Button>
          <Button variant="outline" onClick={() => router.push("/")} className="w-full border-[#D0D7E5] text-[#1F497D]">
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

