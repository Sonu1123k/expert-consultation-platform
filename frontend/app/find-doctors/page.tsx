"use client"

import { useState } from "react"
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

const allDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
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
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
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
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
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
    name: "Dr. Lisa Anderson",
    specialty: "Dermatologist",
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
    name: "Dr. Robert Martinez",
    specialty: "Cardiologist",
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
    name: "Dr. David Thompson",
    specialty: "Neurologist",
    rating: 4.7,
    reviews: 89,
    location: "Boston, MA",
    availability: "Next Available: Wed, Jan 4",
    image: "/male-neurologist.jpg",
    experience: "16 years",
    acceptingNew: true,
  },
]

const specialties = [
  "All Specialties",
  "Cardiologist",
  "Neurologist",
  "Pediatrician",
  "Orthopedic Surgeon",
  "Dermatologist",
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

export default function FindDoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)
  const [acceptingNewOnly, setAcceptingNewOnly] = useState(false)
  const [sortBy, setSortBy] = useState("rating")

  const filteredDoctors = allDoctors
    .filter((doctor) => {
      const matchesSearch =
        searchQuery === "" ||
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesSpecialty = selectedSpecialty === "All Specialties" || doctor.specialty === selectedSpecialty
      const matchesLocation = selectedLocation === "All Locations" || doctor.location === selectedLocation
      const matchesAvailability = !showAvailableOnly || doctor.availability.includes("Available Today")
      const matchesAcceptingNew = !acceptingNewOnly || doctor.acceptingNew

      return matchesSearch && matchesSpecialty && matchesLocation && matchesAvailability && matchesAcceptingNew
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
            <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">Find Doctors</h1>
            <p className="text-muted-foreground">Search and filter to find the right healthcare professional for you</p>
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
                          placeholder="Doctor name or specialty..."
                          className="pl-9"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
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
                          Accepting New Patients
                        </Label>
                      </div>
                    </div>

                    {/* Clear Filters */}
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => {
                        setSearchQuery("")
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
                    Showing <span className="font-medium text-foreground">{filteredDoctors.length}</span> doctors
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

              {/* Doctor Cards */}
              <div className="space-y-4">
                {filteredDoctors.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Filter className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                      <h3 className="mb-2 text-lg font-semibold text-foreground">No doctors found</h3>
                      <p className="text-sm text-muted-foreground">Try adjusting your filters or search criteria</p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredDoctors.map((doctor) => (
                    <Card key={doctor.id} className="overflow-hidden transition-all hover:shadow-md">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          {/* Doctor Image */}
                          <div className="relative h-48 w-full sm:h-auto sm:w-48">
                            <img
                              src={doctor.image || "/placeholder.svg"}
                              alt={doctor.name}
                              className="h-full w-full object-cover"
                            />
                            {doctor.availability.includes("Available Today") && (
                              <Badge className="absolute left-3 top-3 bg-green-600 text-white dark:bg-green-700">
                                Available Today
                              </Badge>
                            )}
                          </div>

                          {/* Doctor Info */}
                          <div className="flex flex-1 flex-col justify-between p-6">
                            <div>
                              <div className="mb-3 flex items-start justify-between">
                                <div>
                                  <h3 className="mb-1 text-xl font-semibold text-foreground">{doctor.name}</h3>
                                  <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                                </div>
                                <Avatar className="h-12 w-12">
                                  <AvatarImage src={doctor.image || "/placeholder.svg"} alt={doctor.name} />
                                  <AvatarFallback>
                                    {doctor.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                              </div>

                              <div className="mb-3 flex flex-wrap items-center gap-4 text-sm">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="font-medium text-foreground">{doctor.rating}</span>
                                  <span className="text-muted-foreground">({doctor.reviews} reviews)</span>
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <Clock className="h-4 w-4" />
                                  <span>{doctor.experience} experience</span>
                                </div>
                              </div>

                              <div className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{doctor.location}</span>
                              </div>

                              <div className="flex flex-wrap gap-2">
                                {doctor.acceptingNew && (
                                  <Badge variant="secondary" className="text-xs">
                                    Accepting New Patients
                                  </Badge>
                                )}
                                <Badge variant="outline" className="text-xs">
                                  {doctor.availability}
                                </Badge>
                              </div>
                            </div>

                            <div className="mt-4 flex gap-3">
                              <Button className="flex-1" asChild>
                                <Link href={`/book?professionalId=${doctor.id}`}>Book Appointment</Link>
                              </Button>
                              <Button variant="outline" asChild>
                                <Link href={`/doctors/${doctor.id}`}>View Profile</Link>
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
