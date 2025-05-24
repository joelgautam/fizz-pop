import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Leaf, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Fizz Pop</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Since 1985, we've been crafting the perfect fizzy drinks using traditional recipes and the finest natural
            ingredients. Our passion for quality and taste has made us a beloved brand worldwide.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Fizz Pop began as a small family business in a garage, with a simple dream: to create the most
                refreshing and delicious fizzy drinks using only natural ingredients.
              </p>
              <p>
                Our founder, Maria Rodriguez, started experimenting with different fruit combinations and carbonation
                techniques, eventually perfecting the recipes that would become our signature drinks.
              </p>
              <p>
                Today, we're proud to serve millions of customers worldwide while maintaining our commitment to quality,
                sustainability, and that perfect fizz in every bottle.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="/placeholder.svg?height=400&width=500"
              alt="Fizz Pop Factory"
              className="w-full rounded-lg shadow-lg"
            />
            <Badge className="absolute top-4 left-4 bg-blue-600">Est. 1985</Badge>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Leaf className="w-12 h-12 mx-auto text-green-500 mb-4" />
                <CardTitle>Natural</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">100% natural ingredients with no artificial preservatives or colors</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
                <CardTitle>Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Rigorous quality control ensures every bottle meets our high standards</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-12 h-12 mx-auto text-blue-500 mb-4" />
                <CardTitle>Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Supporting local communities and sustainable farming practices</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="w-12 h-12 mx-auto text-red-500 mb-4" />
                <CardTitle>Passion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Every drink is made with love and dedication to perfection</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">By the Numbers</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">38+</div>
              <div className="text-blue-200">Years of Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50M+</div>
              <div className="text-blue-200">Bottles Sold</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-blue-200">Unique Flavors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-blue-200">Countries Served</div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="Maria Rodriguez"
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <CardTitle>Maria Rodriguez</CardTitle>
                <p className="text-gray-600">Founder & CEO</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  The visionary behind Fizz Pop, Maria continues to lead innovation in flavor development.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="James Chen"
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <CardTitle>James Chen</CardTitle>
                <p className="text-gray-600">Head of Production</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  James ensures every bottle meets our quality standards with his 15 years of experience.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="Sarah Johnson"
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <CardTitle>Sarah Johnson</CardTitle>
                <p className="text-gray-600">Flavor Scientist</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sarah creates our amazing new flavors using her expertise in food science.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
