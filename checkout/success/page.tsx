import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-[#F5F5F5]">
      <Card className="w-full max-w-md border border-[#D0D7E5] shadow-md overflow-hidden">
        <CardHeader className="text-center bg-gradient-to-b from-[#D8E4F1] to-[#C5D9F1] border-b border-[#D0D7E5]">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E2EFDA] border border-[#A9D08E]">
            <CheckCircle className="h-8 w-8 text-[#70AD47]" />
          </div>
          <CardTitle className="text-2xl text-[#1F497D]">Payment Successful!</CardTitle>
          <CardDescription className="text-[#2F5496]">
            Thank you for your subscription. You now have access to premium content.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center p-6 bg-white">
          <p className="text-sm text-[#2F5496]">A confirmation email has been sent to your email address.</p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 p-6 bg-[#F8F9FA] border-t border-[#D0D7E5]">
          <Link href="/dashboard" className="w-full">
            <Button className="w-full bg-[#4472C4] hover:bg-[#2F5597]">Go to Dashboard</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

