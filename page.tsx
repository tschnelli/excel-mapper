import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <span className="font-bold text-xl">PaywallApp</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
            Login
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/signup">
            Sign Up
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Premium Content Access</h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Unlock exclusive content with our subscription plans.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f0f5f9] dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#1F497D]">
                  Subscription Plan
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Get access to our premium content with our subscription plan.
                </p>
              </div>
              <div className="w-full max-w-md mt-8">
                <div className="overflow-hidden rounded-lg border border-[#D0D7E5] shadow-md">
                  {/* Excel-style header */}
                  <div className="bg-gradient-to-b from-[#D8E4F1] to-[#C5D9F1] p-4 border-b border-[#D0D7E5]">
                    <h3 className="text-xl font-bold text-[#1F497D]">Basic Plan</h3>
                    <p className="text-[#1F497D]">Access to premium content</p>
                  </div>

                  {/* Excel-style pricing row */}
                  <div className="bg-white p-4 border-b border-[#D0D7E5] flex justify-between items-center">
                    <span className="font-medium text-[#1F497D]">Price</span>
                    <span className="text-2xl font-bold text-[#1F497D]">
                      $9.99<span className="text-sm font-normal text-gray-500">/month</span>
                    </span>
                  </div>

                  {/* Excel-style features */}
                  <div className="bg-white p-4">
                    <ul className="space-y-2">
                      <li className="flex items-center border-b border-[#E5E8F0] py-2">
                        <CheckCircle className="mr-2 h-4 w-4 text-[#70AD47]" />
                        <span className="text-[#2F5496]">Basic articles</span>
                      </li>
                      <li className="flex items-center border-b border-[#E5E8F0] py-2">
                        <CheckCircle className="mr-2 h-4 w-4 text-[#70AD47]" />
                        <span className="text-[#2F5496]">Weekly updates</span>
                      </li>
                      <li className="flex items-center border-b border-[#E5E8F0] py-2">
                        <CheckCircle className="mr-2 h-4 w-4 text-[#70AD47]" />
                        <span className="text-[#2F5496]">Email support</span>
                      </li>
                    </ul>
                  </div>

                  {/* Excel-style button */}
                  <div className="bg-[#F8F9FA] p-4 border-t border-[#D0D7E5]">
                    <Link href="/checkout?priceId=price_basic" className="w-full">
                      <Button className="w-full bg-[#4472C4] hover:bg-[#2F5597]">Subscribe Now</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 PaywallApp. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

