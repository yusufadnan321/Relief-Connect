"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, MapPin, Clock, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"

// Sample donation requests data
const SAMPLE_REQUESTS = [
  {
    id: 1,
    title: "Medicine for Earthquake Victims",
    description: "Urgent need for antibiotics, pain relief medications and medical supplies",
    location: "Istanbul, Turkey",
    category: "Medicine",
    priority: "Urgent",
    fundedAmount: 4500,
    targetAmount: 10000,
    itemsNeeded: ["Antibiotics", "Pain Relief", "Bandages", "Syringes"],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    imageUrl: "https://images.unsplash.com/photo-1631217314763-e51df1bdc82f?w=400&h=250&fit=crop",
  },
  {
    id: 2,
    title: "Food and Water Supply",
    description: "Emergency food packages and clean water for displaced families",
    location: "Syria",
    category: "Food & Water",
    priority: "High",
    fundedAmount: 7200,
    targetAmount: 12000,
    itemsNeeded: ["Rice", "Canned Food", "Bottled Water", "Cooking Oil"],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    imageUrl: "https://images.unsplash.com/photo-1609800228369-5db22b0a65e8?w=400&h=250&fit=crop",
  },
  {
    id: 3,
    title: "Clothing and Blankets",
    description: "Winter clothing and blankets for homeless families in flood-affected areas",
    location: "Pakistan",
    category: "Clothing",
    priority: "High",
    fundedAmount: 3200,
    targetAmount: 8000,
    itemsNeeded: ["Winter Jackets", "Blankets", "Socks", "Thermal Wear"],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
  },
  {
    id: 4,
    title: "Shelter Materials",
    description: "Tents, tarps and temporary shelter materials for displaced persons",
    location: "Afghanistan",
    category: "Shelter",
    priority: "Urgent",
    fundedAmount: 5800,
    targetAmount: 15000,
    itemsNeeded: ["Tents", "Tarps", "Rope", "Nails"],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    imageUrl: "https://images.unsplash.com/photo-1591571957089-0f4b38c2485f?w=400&h=250&fit=crop",
  },
  {
    id: 5,
    title: "Medical Equipment",
    description: "Hospital supplies and medical equipment for emergency clinics",
    location: "Yemen",
    category: "Medicine",
    priority: "Urgent",
    fundedAmount: 2100,
    targetAmount: 20000,
    itemsNeeded: ["Thermometers", "Oxygen", "IV Stands", "Stethoscopes"],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    imageUrl: "https://images.unsplash.com/photo-1631217314763-e51df1bdc82f?w=400&h=250&fit=crop",
  },
  {
    id: 6,
    title: "School Supplies for Children",
    description: "Educational materials and supplies for children affected by disaster",
    location: "Nepal",
    category: "Education",
    priority: "Medium",
    fundedAmount: 1500,
    targetAmount: 5000,
    itemsNeeded: ["Notebooks", "Pens", "Books", "Backpacks"],
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    imageUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b0872?w=400&h=250&fit=crop",
  },
]

export default function DonationRequestsPage() {
  const [requests, setRequests] = useState([])
  const [filters, setFilters] = useState({
    category: "all",
    priority: "all",
  })

  useEffect(() => {
    // In a real app, this would fetch from an API
    setRequests(SAMPLE_REQUESTS)
  }, [])

  const filteredRequests = requests.filter(request => {
    if (filters.category !== "all" && request.category !== filters.category) return false
    if (filters.priority !== "all" && request.priority !== filters.priority) return false
    return true
  })

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Urgent":
        return "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400"
      case "High":
        return "bg-orange-100 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400"
      case "Medium":
        return "bg-yellow-100 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-400"
      default:
        return "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400"
    }
  }

  const getProgressPercentage = (funded, target) => {
    return Math.round((funded / target) * 100)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-600" fill="currentColor" />
            <span className="text-xl font-bold text-foreground">ReliefConnect</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Button asChild size="sm">
              <Link href="/register?type=donor">Donate</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Page Title */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Donation Requests</h1>
          <p className="text-lg text-muted-foreground">
            Browse active donation requests from people in need. Your contribution can make a direct impact.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="all">All Categories</option>
                <option value="Medicine">Medicine</option>
                <option value="Food & Water">Food & Water</option>
                <option value="Clothing">Clothing</option>
                <option value="Shelter">Shelter</option>
                <option value="Education">Education</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <select
                value={filters.priority}
                onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="all">All Priorities</option>
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-transparent">.</label>
              <Button
                onClick={() => setFilters({ category: "all", priority: "all" })}
                variant="outline"
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Requests Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {filteredRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRequests.map(request => (
                <Card key={request.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 space-y-2">
                        <CardTitle className="text-2xl line-clamp-3">{request.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{request.description}</CardDescription>
                      </div>
                      <span className={`shrink-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                        {request.priority}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      {request.location}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Category & Time */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="px-2 py-1 rounded-md bg-muted text-foreground">{request.category}</span>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {Math.floor((Date.now() - request.createdAt.getTime()) / (1000 * 60 * 60 * 24))}d ago
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Funded</span>
                        <span className="font-semibold text-foreground">{getProgressPercentage(request.fundedAmount, request.targetAmount)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${getProgressPercentage(request.fundedAmount, request.targetAmount)}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>${request.fundedAmount.toLocaleString()}</span>
                        <span>of ${request.targetAmount.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Items Needed */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Items Needed:</p>
                      <div className="flex flex-wrap gap-1">
                        {request.itemsNeeded.slice(0, 2).map((item, idx) => (
                          <span key={idx} className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 rounded">
                            {item}
                          </span>
                        ))}
                        {request.itemsNeeded.length > 2 && (
                          <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 rounded">
                            +{request.itemsNeeded.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Button asChild className="w-full">
                      <Link href={`/donor/request/${request.id}`}>View Details & Donate</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No requests match your filters.</p>
              <Button
                onClick={() => setFilters({ category: "all", priority: "all" })}
                variant="outline"
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 ReliefConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

