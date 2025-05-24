"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, ShoppingCart, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useCart } from "../../context/cart-context"
import { ReviewForm } from "../../components/review-form"
import { ReviewList } from "../../components/review-list"

const products = [
  {
    id: 1,
    name: "Classic Cola Fizz",
    price: 2.99,
    originalPrice: 3.49,
    image: "/placeholder.svg?height=400&width=400&text=Cola+Fizz&bg=8B4513&color=white",
    rating: 4.5,
    reviews: 128,
    discount: "15% OFF",
    category: "Cola",
    description:
      "The classic cola taste with a perfect fizz. Made with natural cola nut extract and carbonated to perfection.",
    ingredients: ["Carbonated Water", "Natural Cola Extract", "Cane Sugar", "Citric Acid", "Natural Flavors"],
    nutrition: {
      calories: 140,
      sugar: "35g",
      sodium: "45mg",
      caffeine: "34mg",
    },
  },
  {
    id: 2,
    name: "Tropical Burst",
    price: 3.29,
    originalPrice: 3.79,
    image: "/placeholder.svg?height=400&width=400&text=Tropical+Burst&bg=FF6B35&color=white",
    rating: 4.8,
    reviews: 95,
    discount: "13% OFF",
    category: "Fruit",
    description:
      "Exotic tropical fruits in every sip. A blend of mango, pineapple, and passion fruit with a refreshing fizz.",
    ingredients: ["Carbonated Water", "Mango Juice", "Pineapple Juice", "Passion Fruit Extract", "Cane Sugar"],
    nutrition: {
      calories: 120,
      sugar: "30g",
      sodium: "25mg",
      caffeine: "0mg",
    },
  },
  {
    id: 3,
    name: "Berry Blast",
    price: 3.19,
    originalPrice: 3.69,
    image: "/placeholder.svg?height=400&width=400&text=Berry+Blast&bg=8E44AD&color=white",
    rating: 4.6,
    reviews: 87,
    discount: "14% OFF",
    category: "Berry",
    description:
      "Mixed berries with a refreshing twist. Combines strawberry, blueberry, and raspberry for the perfect berry experience.",
    ingredients: ["Carbonated Water", "Strawberry Juice", "Blueberry Extract", "Raspberry Juice", "Natural Sweeteners"],
    nutrition: {
      calories: 110,
      sugar: "28g",
      sodium: "20mg",
      caffeine: "0mg",
    },
  },
  {
    id: 4,
    name: "Lemon Lime Zing",
    price: 2.89,
    originalPrice: 3.29,
    image: "/placeholder.svg?height=400&width=400&text=Lemon+Lime&bg=F1C40F&color=black",
    rating: 4.4,
    reviews: 156,
    discount: "12% OFF",
    category: "Citrus",
    description:
      "Zesty lemon and lime combination. The perfect balance of tart and sweet with an energizing citrus kick.",
    ingredients: ["Carbonated Water", "Lemon Juice", "Lime Juice", "Cane Sugar", "Natural Citrus Oils"],
    nutrition: {
      calories: 100,
      sugar: "25g",
      sodium: "30mg",
      caffeine: "0mg",
    },
  },
  {
    id: 5,
    name: "Orange Crush",
    price: 3.09,
    originalPrice: 3.59,
    image: "/placeholder.svg?height=400&width=400&text=Orange+Crush&bg=E67E22&color=white",
    rating: 4.7,
    reviews: 203,
    discount: "14% OFF",
    category: "Citrus",
    description: "Fresh orange flavor with natural sweetness. Made with real orange juice and natural orange essence.",
    ingredients: ["Carbonated Water", "Orange Juice Concentrate", "Natural Orange Flavor", "Cane Sugar", "Vitamin C"],
    nutrition: {
      calories: 130,
      sugar: "32g",
      sodium: "35mg",
      caffeine: "0mg",
    },
  },
  {
    id: 6,
    name: "Grape Explosion",
    price: 3.39,
    originalPrice: 3.89,
    image: "/placeholder.svg?height=400&width=400&text=Grape+Explosion&bg=9B59B6&color=white",
    rating: 4.3,
    reviews: 74,
    discount: "13% OFF",
    category: "Fruit",
    description: "Rich grape flavor with intense fizz. Made with Concord grape juice for an authentic grape taste.",
    ingredients: ["Carbonated Water", "Concord Grape Juice", "Natural Grape Flavor", "Cane Sugar", "Tartaric Acid"],
    nutrition: {
      calories: 135,
      sugar: "34g",
      sodium: "40mg",
      caffeine: "0mg",
    },
  },
]

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")

  const product = products.find((p) => p.id === Number.parseInt(params.id))

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Link href="/products" className="inline-flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-800">
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Product Image */}
          <div>
            <div className="relative">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full rounded-lg shadow-lg"
              />
              {product.discount && (
                <Badge className="absolute top-4 right-4 bg-red-500 text-white text-lg px-3 py-1">
                  {product.discount}
                </Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <Badge variant="secondary" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold">{product.rating}</span>
              <span className="text-gray-600">({product.reviews} reviews)</span>
            </div>

            <p className="text-gray-600 text-lg mb-6">{product.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-green-600">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <label className="font-semibold">Quantity:</label>
              <Select value={quantity.toString()} onValueChange={(value) => setQuantity(Number.parseInt(value))}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4 mb-8">
              <Button onClick={handleAddToCart} className="flex-1" variant="outline">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Buy Now</Button>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">✓ Free Shipping</h3>
              <p className="text-green-700 text-sm">Free shipping on orders over $25</p>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex space-x-6">
              {["description", "ingredients", "nutrition", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 border-b-2 font-semibold capitalize ${
                    activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-gray-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            {activeTab === "description" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            )}

            {activeTab === "ingredients" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
                <ul className="list-disc list-inside space-y-1">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-gray-600">
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "nutrition" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Nutrition Facts</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span>Calories:</span>
                      <span className="font-semibold">{product.nutrition.calories}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Sugar:</span>
                      <span className="font-semibold">{product.nutrition.sugar}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Sodium:</span>
                      <span className="font-semibold">{product.nutrition.sodium}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Caffeine:</span>
                      <span className="font-semibold">{product.nutrition.caffeine}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <ReviewForm productId={product.id} />
                <ReviewList productId={product.id} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
