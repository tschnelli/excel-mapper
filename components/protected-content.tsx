"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Lock } from "lucide-react"

type ProtectedContentProps = {
  children: React.ReactNode
  requiredTier?: "basic" | "pro" | "enterprise"
  fallbackMessage?: string
}

export function ProtectedContent({
  children,
  requiredTier = "basic",
  fallbackMessage = "You need to upgrade your subscription to access this content.",
}: ProtectedContentProps) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const [userTier, setUserTier] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function checkAccess() {
      try {
        // In a real app, you would call your API to check the user's subscription status
        // const response = await fetch('/api/check-subscription')
        // const data = await response.json()

        // For demo purposes, we'll simulate an API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Mock response
        const mockUserTier = "pro" // This would come from your API
        setUserTier(mockUserTier)

        // Check if the user's tier meets the required tier
        const tierLevels = { basic: 1, pro: 2, enterprise: 3 }
        const userTierLevel = tierLevels[mockUserTier] || 0
        const requiredTierLevel = tierLevels[requiredTier] || 0

        setIsAuthorized(userTierLevel >= requiredTierLevel)
      } catch (error) {
        console.error("Failed to check access:", error)
        setIsAuthorized(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAccess()
  }, [requiredTier])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <Card className="w-full border border-[#D0D7E5] shadow-sm">
        <CardHeader className="text-center bg-gradient-to-b from-[#D8E4F1] to-[#C5D9F1] border-b border-[#D0D7E5]">
          <Lock className="mx-auto h-12 w-12 text-[#1F497D]" />
          <CardTitle className="text-[#1F497D]">Premium Content</CardTitle>
          <CardDescription className="text-[#2F5496]">{fallbackMessage}</CardDescription>
        </CardHeader>
        <CardContent className="text-center bg-white p-6">
          <p className="text-sm text-[#2F5496]">
            This content requires a subscription.
            {userTier && userTier !== "null" && <> Your current tier is {userTier}.</>}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center bg-[#F8F9FA] border-t border-[#D0D7E5] p-4">
          <Link href="/">
            <Button className="bg-[#4472C4] hover:bg-[#2F5597]">View Pricing Plan</Button>
          </Link>
        </CardFooter>
      </Card>
    )
  }

  return <>{children}</>
}

