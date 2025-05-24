"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"

interface ReviewFormProps {
  productId: number
}

export function ReviewForm({ productId }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    review: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) {
      alert("Please select a rating")
      return
    }

    // Here you would typically save the review to your database
    const newReview = {
      id: Date.now(),
      productId,
      rating,
      ...formData,
      date: new Date().toISOString(),
      helpful: 0,
      verified: false,
    }

    // Save to localStorage for demo purposes
    const existingReviews = JSON.parse(localStorage.getItem("reviews") || "[]")
    existingReviews.push(newReview)
    localStorage.setItem("reviews", JSON.stringify(existingReviews))

    alert("Thank you for your review! It will be published after moderation.")

    // Reset form
    setRating(0)
    setFormData({ name: "", email: "", title: "", review: "" })
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium mb-2">Your Rating *</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoveredRating || rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-600">{rating > 0 && `${rating} out of 5 stars`}</span>
            </div>
          </div>

          {/* Personal Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Your Name *</label>
              <Input
                required
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <Input
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="your.email@example.com"
              />
              <p className="text-xs text-gray-500 mt-1">Email will not be published</p>
            </div>
          </div>

          {/* Review Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Review Title *</label>
            <Input
              required
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Give your review a title"
            />
          </div>

          {/* Review Text */}
          <div>
            <label className="block text-sm font-medium mb-2">Your Review *</label>
            <Textarea
              required
              value={formData.review}
              onChange={(e) => handleChange("review", e.target.value)}
              placeholder="Tell us about your experience with this product..."
              rows={5}
            />
            <p className="text-xs text-gray-500 mt-1">Minimum 10 characters</p>
          </div>

          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Submit Review
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
