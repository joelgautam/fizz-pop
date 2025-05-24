"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ThumbsUp, ThumbsDown } from "lucide-react"

interface Review {
  id: number
  productId: number
  name: string
  rating: number
  title: string
  review: string
  date: string
  helpful: number
  verified: boolean
}

interface ReviewListProps {
  productId: number
}

// Sample reviews for demonstration
const sampleReviews: Review[] = [
  {
    id: 1,
    productId: 1,
    name: "Sarah M.",
    rating: 5,
    title: "Perfect Cola Taste!",
    review:
      "This is exactly what I was looking for! The cola flavor is authentic and not too sweet. The fizz level is perfect - not too aggressive but enough to give that satisfying carbonation. Will definitely order again!",
    date: "2024-01-15",
    helpful: 12,
    verified: true,
  },
  {
    id: 2,
    productId: 1,
    name: "Mike R.",
    rating: 4,
    title: "Great alternative to mainstream colas",
    review:
      "Really enjoyed this drink. The natural ingredients make a difference - you can taste the quality. Only reason it's not 5 stars is the price point, but worth it for the quality.",
    date: "2024-01-10",
    helpful: 8,
    verified: true,
  },
  {
    id: 3,
    productId: 2,
    name: "Jessica L.",
    rating: 5,
    title: "Tropical Paradise in a Bottle!",
    review:
      "OMG! This drink tastes like vacation in a bottle. The mango and pineapple flavors are so authentic and refreshing. Perfect for summer days. My new favorite!",
    date: "2024-01-12",
    helpful: 15,
    verified: true,
  },
  {
    id: 4,
    productId: 2,
    name: "David K.",
    rating: 4,
    title: "Refreshing and Natural",
    review:
      "Love the tropical flavor combination. You can tell they use real fruit juices. Great for mixing with other drinks too. Highly recommend!",
    date: "2024-01-08",
    helpful: 6,
    verified: false,
  },
]

export function ReviewList({ productId }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [sortBy, setSortBy] = useState("newest")

  useEffect(() => {
    // Load reviews from localStorage and combine with sample reviews
    const savedReviews = JSON.parse(localStorage.getItem("reviews") || "[]")
    const productReviews = [
      ...sampleReviews.filter((r) => r.productId === productId),
      ...savedReviews.filter((r: Review) => r.productId === productId),
    ]

    setReviews(productReviews)
  }, [productId])

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case "highest":
        return b.rating - a.rating
      case "lowest":
        return a.rating - b.rating
      case "helpful":
        return b.helpful - a.helpful
      default:
        return 0
    }
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">No reviews yet. Be the first to review this product!</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Customer Reviews ({reviews.length})</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded-md px-3 py-1 text-sm"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest Rating</option>
          <option value="lowest">Lowest Rating</option>
          <option value="helpful">Most Helpful</option>
        </select>
      </div>

      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{review.name}</span>
                    {review.verified && (
                      <Badge variant="secondary" className="text-xs">
                        Verified Purchase
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{formatDate(review.date)}</span>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold mb-2">{review.title}</h4>
              <p className="text-gray-700 mb-4 leading-relaxed">{review.review}</p>

              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Was this helpful?</span>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    Yes ({review.helpful})
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    <ThumbsDown className="w-4 h-4 mr-1" />
                    No
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
