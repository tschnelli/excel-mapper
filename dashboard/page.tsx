import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Settings, User } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F5F5F5]">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-[#4472C4] px-6 text-white">
        <Link className="flex items-center gap-2 font-semibold" href="#">
          <span className="font-bold">PaywallApp</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium text-white hover:text-gray-200" href="/dashboard">
            Dashboard
          </Link>
          <Link className="text-sm font-medium text-white hover:text-gray-200" href="/dashboard/settings">
            Settings
          </Link>
          <Link className="text-sm font-medium text-white hover:text-gray-200" href="/">
            Logout
          </Link>
        </nav>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border border-[#D0D7E5] shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-b from-[#D8E4F1] to-[#C5D9F1] border-b border-[#D0D7E5]">
              <CardTitle className="text-sm font-medium text-[#1F497D]">Subscription Status</CardTitle>
              <CreditCard className="h-4 w-4 text-[#1F497D]" />
            </CardHeader>
            <CardContent className="pt-4 bg-white">
              <div className="text-2xl font-bold text-[#1F497D]">Active</div>
              <p className="text-xs text-[#2F5496]">Basic Plan</p>
            </CardContent>
          </Card>
          <Card className="border border-[#D0D7E5] shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-b from-[#D8E4F1] to-[#C5D9F1] border-b border-[#D0D7E5]">
              <CardTitle className="text-sm font-medium text-[#1F497D]">Next Billing Date</CardTitle>
              <CreditCard className="h-4 w-4 text-[#1F497D]" />
            </CardHeader>
            <CardContent className="pt-4 bg-white">
              <div className="text-2xl font-bold text-[#1F497D]">May 15, 2024</div>
              <p className="text-xs text-[#2F5496]">$9.99/month</p>
            </CardContent>
          </Card>
          <Card className="border border-[#D0D7E5] shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-b from-[#D8E4F1] to-[#C5D9F1] border-b border-[#D0D7E5]">
              <CardTitle className="text-sm font-medium text-[#1F497D]">Account Type</CardTitle>
              <User className="h-4 w-4 text-[#1F497D]" />
            </CardHeader>
            <CardContent className="pt-4 bg-white">
              <div className="text-2xl font-bold text-[#1F497D]">Basic</div>
              <p className="text-xs text-[#2F5496]">Standard access</p>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="content">
          <div className="flex items-center">
            <TabsList className="bg-[#D8E4F1] border border-[#D0D7E5]">
              <TabsTrigger value="content" className="data-[state=active]:bg-[#4472C4] data-[state=active]:text-white">
                Premium Content
              </TabsTrigger>
              <TabsTrigger
                value="subscription"
                className="data-[state=active]:bg-[#4472C4] data-[state=active]:text-white"
              >
                Subscription
              </TabsTrigger>
              <TabsTrigger value="billing" className="data-[state=active]:bg-[#4472C4] data-[state=active]:text-white">
                Billing History
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto">
              <Button variant="outline" size="sm" className="border-[#D0D7E5] text-[#1F497D]">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
          <TabsContent value="content" className="border-none p-0 pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="border border-[#D0D7E5] shadow-sm">
                  <CardHeader className="bg-gradient-to-b from-[#D8E4F1] to-[#C5D9F1] border-b border-[#D0D7E5]">
                    <CardTitle className="text-[#1F497D]">Premium Article {i}</CardTitle>
                    <CardDescription className="text-[#2F5496]">Exclusive content for subscribers</CardDescription>
                  </CardHeader>
                  <CardContent className="bg-white pt-4">
                    <p className="text-sm text-[#2F5496]">
                      This is a premium article that is only available to paid subscribers.
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="subscription" className="border-none p-0 pt-4">
            <Card className="border border-[#D0D7E5] shadow-sm">
              <CardHeader className="bg-gradient-to-b from-[#D8E4F1] to-[#C5D9F1] border-b border-[#D0D7E5]">
                <CardTitle className="text-[#1F497D]">Subscription Details</CardTitle>
                <CardDescription className="text-[#2F5496]">Manage your subscription plan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 bg-white p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="border-b border-[#E5E8F0] py-2">
                    <h3 className="font-medium text-[#1F497D]">Current Plan</h3>
                    <p className="text-sm text-[#2F5496]">Basic Plan</p>
                  </div>
                  <div className="border-b border-[#E5E8F0] py-2">
                    <h3 className="font-medium text-[#1F497D]">Price</h3>
                    <p className="text-sm text-[#2F5496]">$9.99/month</p>
                  </div>
                  <div className="border-b border-[#E5E8F0] py-2">
                    <h3 className="font-medium text-[#1F497D]">Billing Cycle</h3>
                    <p className="text-sm text-[#2F5496]">Monthly</p>
                  </div>
                  <div className="border-b border-[#E5E8F0] py-2">
                    <h3 className="font-medium text-[#1F497D]">Next Billing Date</h3>
                    <p className="text-sm text-[#2F5496]">May 15, 2024</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="destructive" className="bg-[#C00000] hover:bg-[#950000]">
                    Cancel Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="billing" className="border-none p-0 pt-4">
            <Card className="border border-[#D0D7E5] shadow-sm">
              <CardHeader className="bg-gradient-to-b from-[#D8E4F1] to-[#C5D9F1] border-b border-[#D0D7E5]">
                <CardTitle className="text-[#1F497D]">Billing History</CardTitle>
                <CardDescription className="text-[#2F5496]">View your past payments</CardDescription>
              </CardHeader>
              <CardContent className="bg-white p-0">
                <div className="divide-y divide-[#E5E8F0]">
                  {[
                    { date: "Apr 15, 2024", amount: "$9.99", status: "Paid" },
                    { date: "Mar 15, 2024", amount: "$9.99", status: "Paid" },
                    { date: "Feb 15, 2024", amount: "$9.99", status: "Paid" },
                  ].map((invoice, i) => (
                    <div key={i} className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium text-[#1F497D]">{invoice.date}</p>
                        <p className="text-sm text-[#2F5496]">Basic Plan</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-[#1F497D]">{invoice.amount}</p>
                        <p className="text-sm text-[#70AD47]">{invoice.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

