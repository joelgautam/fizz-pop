"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, ShoppingCart, Search, Filter } from "lucide-react"
import { useCart } from "../context/cart-context"

const products = [
  {
    id: 1,
    name: "Classic Cola Fizz",
    price: 2.99,
    originalPrice: 3.49,
    image: "/placeholder.svg?height=250&width=250",
    rating: 4.5,
    reviews: 128,
    discount: "15% OFF",
    category: "Cola",
    description: "The classic cola taste with a perfect fizz",
  },
  {
    id: 2,
    name: "Tropical Burst",
    price: 3.29,
    originalPrice: 3.79,
    image: "/placeholder.svg?height=250&width=250",
    rating: 4.8,
    reviews: 95,
    discount: "13% OFF",
    category: "Fruit",
    description: "Exotic tropical fruits in every sip",
  },
  {
    id: 3,
    name: "Berry Blast",
    price: 3.19,
    originalPrice: 3.69,
    image: "/placeholder.svg?height=250&width=250",
    rating: 4.6,
    reviews: 87,
    discount: "14% OFF",
    category: "Berry",
    description: "Mixed berries with a refreshing twist",
  },
  {
    id: 4,
    name: "Lemon Lime Zing",
    price: 2.89,
    originalPrice: 3.29,
    image: "/placeholder.svg?height=250&width=250",
    rating: 4.4,
    reviews: 156,
    discount: "12% OFF",
    category: "Citrus",
    description: "Zesty lemon and lime combination",
  },
  {
    id: 5,
    name: "Orange Crush",
    price: 3.09,
    originalPrice: 3.59,
    image: "/placeholder.svg?height=250&width=250",
    rating: 4.7,
    reviews: 203,
    discount: "14% OFF",
    category: "Citrus",
    description: "Fresh orange flavor with natural sweetness",
  },
  {
    id: 6,
    name: "Grape Explosion",
    price: 3.39,
    originalPrice: 3.89,
    image: "/placeholder.svg?height=250&width=250",
    rating: 4.3,
    reviews: 74,
    discount: "13% OFF",
    category: "Fruit",
    description: "Rich grape flavor with intense fizz",
  },
]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const { addToCart } = useCart()

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "all" || product.category.toLowerCase() === selectedCategory.toLowerCase()),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        default:
          return a.name.localeCompare(b.name)
      }
    })

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-4">Our Products</h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Explore our complete collection of refreshing fizz pop drinks
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="relative">
                <Badge className="absolute top-2 right-2 bg-red-500 text-white z-10">{product.discount}</Badge>
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-56 object-cover rounded-lg mb-4"
                />
                <CardTitle className="text-xl">{product.name}</CardTitle>
                <p className="text-gray-600 text-sm">{product.description}</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-green-600">${product.price}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice}</span>
                  </div>
                  <Badge variant="secondary">{product.category}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => addToCart(product)} className="flex-1" variant="outline">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Buy Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
