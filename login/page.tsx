"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, you would call your authentication API here
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // })

      // For demo purposes, we'll just simulate a successful login
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to dashboard after successful login
      router.push("/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-[#F5F5F5]">
      <Card className="w-full max-w-md border border-[#D0D7E5] shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-b from-[#D8E4F1] to-[#C5D9F1] border-b border-[#D0D7E5]">
          <CardTitle className="text-2xl text-[#1F497D]">Login</CardTitle>
          <CardDescription className="text-[#2F5496]">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 p-6 bg-white">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#1F497D]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-[#D0D7E5] focus:border-[#4472C4] focus:ring-[#4472C4]"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-[#1F497D]">
                  Password
                </Label>
                <Link href="/forgot-password" className="text-sm text-[#4472C4] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-[#D0D7E5] focus:border-[#4472C4] focus:ring-[#4472C4]"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 p-6 bg-[#F8F9FA] border-t border-[#D0D7E5]">
            <Button type="submit" className="w-full bg-[#4472C4] hover:bg-[#2F5597]" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            <div className="text-center text-sm text-[#2F5496]">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-[#4472C4] hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

