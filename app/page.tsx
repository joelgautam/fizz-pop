"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Zap, Droplets, Heart } from "lucide-react"
import Link from "next/link"
import { useCart } from "./context/cart-context"

const featuredProducts = [
  {
    id: 1,
    name: "Classic Cola Fizz",
    price: 2.99,
    originalPrice: 3.49,
    image: "/placeholder.svg?height=200&width=200&text=Classic+Cola+Fizz+🥤&bg=654321&color=white",
    rating: 4.5,
    reviews: 128,
    discount: "15% OFF",
  },
  {
    id: 2,
    name: "Tropical Burst",
    price: 3.29,
    originalPrice: 3.79,
    image: "/placeholder.svg?height=200&width=200&text=Tropical+Burst+🌺🥭&bg=FF8C00&color=white",
    rating: 4.8,
    reviews: 95,
    discount: "13% OFF",
  },
  {
    id: 3,
    name: "Berry Blast",
    price: 3.19,
    originalPrice: 3.69,
    image: "/placeholder.svg?height=200&width=200&text=Berry+Blast+🫐🍓&bg=8B008B&color=white",
    rating: 4.6,
    reviews: 87,
    discount: "14% OFF",
  },
]

export default function HomePage() {
  const { addToCart } = useCart()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-yellow-400 text-black hover:bg-yellow-500">
                🎉 Grand Opening - 20% OFF Everything!
              </Badge>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Refreshing Fizz Pop
                <span className="block text-yellow-300">Drinks for Everyone</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Experience the perfect blend of flavor and fizz with our premium collection of sparkling beverages. Made
                with natural ingredients and love.
              </p>
              <div className="flex gap-4">
                <Link href="/products">
                  <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500">
                    Shop Now
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=400"
                alt="Fizz Pop Drinks"
                className="w-full max-w-md mx-auto rounded-lg shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-black p-3 rounded-full">
                <Zap className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Fizz Pop?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Droplets className="w-12 h-12 mx-auto text-blue-500 mb-4" />
                <CardTitle>Natural Ingredients</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Made with 100% natural flavors and no artificial preservatives</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
                <CardTitle>Perfect Fizz</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Expertly carbonated for the perfect amount of fizz in every sip</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="w-12 h-12 mx-auto text-red-500 mb-4" />
                <CardTitle>Family Recipe</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Crafted using traditional family recipes passed down for generations</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular fizz pop drinks, loved by customers worldwide
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="relative">
                  <Badge className="absolute top-2 right-2 bg-red-500 text-white">{product.discount}</Badge>
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.reviews})</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-green-600">${product.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => addToCart(product)} className="flex-1" variant="outline">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Link href={`/products/${product.id}`} className="flex-1">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Buy Now</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/products">
              <Button size="lg" variant="outline">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 text-blue-100">Get the latest news about new flavors and exclusive offers</p>
          <div className="max-w-md mx-auto flex gap-2">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 rounded-lg text-black" />
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
