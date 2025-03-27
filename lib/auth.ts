// This is a simplified auth utility for demo purposes
// In a real app, you would use a proper auth solution like NextAuth.js or Clerk

import { cookies } from "next/headers"

export type User = {
  id: string
  name: string
  email: string
  subscriptionStatus: "active" | "inactive" | "canceled"
  subscriptionTier: "basic" | "pro" | "enterprise" | null
}

export async function getUser(): Promise<User | null> {
  // In a real app, you would verify the token and fetch the user from your database
  const token = cookies().get("auth-token")?.value

  if (!token) {
    return null
  }

  // This is a mock user for demo purposes
  return {
    id: "user_123",
    name: "John Doe",
    email: "john@example.com",
    subscriptionStatus: "active",
    subscriptionTier: "pro",
  }
}

export async function isSubscribed(): Promise<boolean> {
  const user = await getUser()
  return user?.subscriptionStatus === "active"
}

export async function getUserTier(): Promise<string | null> {
  const user = await getUser()
  return user?.subscriptionTier || null
}

