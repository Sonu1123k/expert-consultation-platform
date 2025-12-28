"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Star, MapPin, Clock, Filter, SlidersHorizontal } from "lucide-react"
import Link from "next/link"

const allExperts = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    category: "Medical",
    rating: 4.9,
    reviews: 127,
    location: "New York, NY",
    availability: "Available Today",
    image: "/professional-female-doctor-headshot.png",
    experience: "15 years",
    acceptingNew: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    specialty: "Career Coach",
    category: "Career",
    rating: 4.8,
    reviews: 98,
    location: "San Francisco, CA",
    availability: "Next Available: Tomorrow",
    image: "/professional-male-doctor.png",
    experience: "12 years",
    acceptingNew: true,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    specialty: "Financial Advisor",
    category: "Financial",
    rating: 5.0,
    reviews: 145,
    location: "Austin, TX",
    availability: "Available Today",
    image: "/professional-female-pediatrician-headshot.jpg",
    experience: "10 years",
    acceptingNew: true,
  },
  {
    id: 4,
    name: "Dr. James Williams",
    specialty: "Orthopedic Surgeon",
    category: "Medical",
    rating: 4.7,
    reviews: 83,
    location: "Chicago, IL",
    availability: "Next Available: Mon, Jan 2",
    image: "/professional-male-surgeon-headshot.jpg",
    experience: "18 years",
    acceptingNew: false,
  },
  {
    id: 5,
    name: "Lisa Anderson",
    specialty: "Resume Specialist",
    category: "Career",
    rating: 4.9,
    reviews: 156,
    location: "Los Angeles, CA",
    availability: "Available Today",
    image: "/female-dermatologist.jpg",
    experience: "14 years",
    acceptingNew: true,
  },
  {
    id: 6,
    name: "Robert Martinez",
    specialty: "Investment Advisor",
    category: "Financial",
    rating: 4.6,
    reviews: 72,
    location: "Miami, FL",
    availability: "Next Available: Tomorrow",
    image: "/male-cardiologist.jpg",
    experience: "20 years",
    acceptingNew: true,
  },
  {
    id: 7,
    name: "Dr. Amanda Lee",
    specialty: "Pediatrician",
    category: "Medical",
    rating: 4.8,
    reviews: 103,
    location: "Seattle, WA",
    availability: "Available Today",
    image: "/female-pediatrician.jpg",
    experience: "8 years",
    acceptingNew: true,
  },
  {
    id: 8,
    name: "David Thompson",
    specialty: "Career Transition Coach",
    category: "Career",
    rating: 4.7,
    reviews: 89,
    location: "Boston, MA",
    availability: "Next Available: Wed, Jan 4",
    image: "/male-neurologist.jpg",
    experience: "16 years",
    acceptingNew: true,
  },
]

const categories = ["All Categories", "Medical", "Career", "Financial"]

const specialties = [
  "All Specialties",
  "Cardiologist",
  "Orthopedic Surgeon",
  "Pediatrician",
  "Career Coach",
  "Resume Specialist",
  "Career Transition Coach",
  "Financial Advisor",
  "Investment Advisor",
]

const locations = [
  "All Locations",
  "New York, NY",
  "San Francisco, CA",
  "Austin, TX",
  "Chicago, IL",
  "Los Angeles, CA",
  "Miami, FL",
  "Seattle, WA",
  "Boston, MA",
]

function FindExpertsContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "All Categories")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)
  const [acceptingNewOnly, setAcceptingNewOnly] = useState(false)
  const [sortBy, setSortBy] = useState("rating")

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const filteredExperts = allExperts
    .filter((expert) => {
      const matchesSearch =
        searchQuery === "" ||
        expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expert.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expert.category.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All Categories" || expert.category === selectedCategory
      const matchesSpecialty = selectedSpecialty === "All Specialties" || expert.specialty === selectedSpecialty
      const matchesLocation = selectedLocation === "All Locations" || expert.location === selectedLocation
      const matchesAvailability = !showAvailableOnly || expert.availability.includes("Available Today")
      const matchesAcceptingNew = !acceptingNewOnly || expert.acceptingNew

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSpecialty &&
        matchesLocation &&
        matchesAvailability &&
        matchesAcceptingNew
      )
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "reviews") return b.reviews - a.reviews
      return 0
    })

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Header Section */}
        <section className="border-b border-border bg-muted/30 px-4 py-8">
          <div className="container mx-auto">
            <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">Find Experts</h1>
            <p className="text-muted-foreground">Search and filter to find the right professional for you</p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Filters Sidebar */}
            <aside className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold text-foreground">Filters</h2>
                  </div>

                  <div className="space-y-6">
                    {/* Search */}
                    <div className="space-y-2">
                      <Label htmlFor="search">Search</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="search"
                          placeholder="Name, specialty, or category..."
                          className="pl-9"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger id="category">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Specialty */}
                    <div className="space-y-2">
                      <Label htmlFor="specialty">Specialty</Label>
                      <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                        <SelectTrigger id="specialty">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {specialties.map((specialty) => (
                            <SelectItem key={specialty} value={specialty}>
                              {specialty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger id="location">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Availability Filters */}
                    <div className="space-y-3 border-t border-border pt-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="available-today"
                          checked={showAvailableOnly}
                          onCheckedChange={(checked) => setShowAvailableOnly(checked === true)}
                        />
                        <Label htmlFor="available-today" className="cursor-pointer text-sm font-normal">
                          Available Today
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="accepting-new"
                          checked={acceptingNewOnly}
                          onCheckedChange={(checked) => setAcceptingNewOnly(checked === true)}
                        />
                        <Label htmlFor="accepting-new" className="cursor-pointer text-sm font-normal">
                          Accepting New Clients
                        </Label>
                      </div>
                    </div>

                    {/* Clear Filters */}
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => {
                        setSearchQuery("")
                        setSelectedCategory("All Categories")
                        setSelectedSpecialty("All Specialties")
                        setSelectedLocation("All Locations")
                        setShowAvailableOnly(false)
                        setAcceptingNewOnly(false)
                      }}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Results Section */}
            <div>
              {/* Results Header */}
              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Showing <span className="font-medium text-foreground">{filteredExperts.length}</span> experts
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="sort" className="text-sm">
                    Sort by:
                  </Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger id="sort" className="w-[160px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="reviews">Most Reviewed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Expert Cards */}
              <div className="space-y-4">
                {filteredExperts.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Filter className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                      <h3 className="mb-2 text-lg font-semibold text-foreground">No experts found</h3>
                      <p className="text-sm text-muted-foreground">Try adjusting your filters or search criteria</p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredExperts.map((expert) => (
                    <Card key={expert.id} className="overflow-hidden transition-all hover:shadow-md">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          {/* Expert Image */}
                          <div className="relative h-48 w-full sm:h-auto sm:w-48">
                            <img
                              src={expert.image || "/placeholder.svg"}
                              alt={expert.name}
                              className="h-full w-full object-cover"
                            />
                            {expert.availability.includes("Available Today") && (
                              <Badge className="absolute left-3 top-3 bg-green-600 text-white dark:bg-green-700">
                                Available Today
                              </Badge>
                            )}
                            <Badge className="absolute right-3 top-3 bg-primary text-primary-foreground">
                              {expert.category}
                            </Badge>
                          </div>

                          {/* Expert Info */}
                          <div className="flex flex-1 flex-col justify-between p-6">
                            <div>
                              <div className="mb-3 flex items-start justify-between">
                                <div>
                                  <h3 className="mb-1 text-xl font-semibold text-foreground">{expert.name}</h3>
                                  <p className="text-sm text-muted-foreground">{expert.specialty}</p>
                                </div>
                                <Avatar className="h-12 w-12">
                                  <AvatarImage src={expert.image || "/placeholder.svg"} alt={expert.name} />
                                  <AvatarFallback>
                                    {expert.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                              </div>

                              <div className="mb-3 flex flex-wrap items-center gap-4 text-sm">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="font-medium text-foreground">{expert.rating}</span>
                                  <span className="text-muted-foreground">({expert.reviews} reviews)</span>
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <Clock className="h-4 w-4" />
                                  <span>{expert.experience} experience</span>
                                </div>
                              </div>

                              <div className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span className="ml-[3px]">{expert.location}</span>
                              </div>

                              <div className="flex flex-wrap gap-2">
                                {expert.acceptingNew && (
                                  <Badge variant="secondary" className="text-xs">
                                    Accepting New Clients
                                  </Badge>
                                )}
                                <Badge variant="outline" className="text-xs">
                                  {expert.availability}
                                </Badge>
                              </div>
                            </div>

                            <div className="mt-4 flex gap-3">
                              <Button className="flex-1" asChild>
                                <Link href={`/book?professionalId=${expert.id}`}>Book Appointment</Link>
                              </Button>
                              <Button variant="outline" asChild>
                                <Link href={`/experts/${expert.id}`}>View Profile</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function FindExpertsPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <FindExpertsContent />
    </Suspense>
  )
}
