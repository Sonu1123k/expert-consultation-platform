"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Calendar,
  Heart,
  Brain,
  Baby,
  Stethoscope,
  Star,
  MapPin,
  Clock,
  Briefcase,
  TrendingUp,
  GraduationCap,
  DollarSign,
  Target,
  Users,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

const categories = [
  {
    name: "Medical",
    icon: Stethoscope,
    color: "bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-400",
    description: "Healthcare professionals",
  },
  {
    name: "Career Guidance",
    icon: Briefcase,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
    description: "Career development experts",
  },
  {
    name: "Financial Planning",
    icon: TrendingUp,
    color: "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400",
    description: "Financial advisors",
  },
]

const specialties = [
  {
    name: "Cardiology",
    icon: Heart,
    color: "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400",
    category: "Medical",
  },
  {
    name: "Neurology",
    icon: Brain,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
    category: "Medical",
  },
  {
    name: "Pediatrics",
    icon: Baby,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
    category: "Medical",
  },
  {
    name: "Career Coaching",
    icon: Target,
    color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400",
    category: "Career",
  },
  {
    name: "Resume Building",
    icon: GraduationCap,
    color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400",
    category: "Career",
  },
  {
    name: "Investment Planning",
    icon: DollarSign,
    color: "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400",
    category: "Financial",
  },
]

interface Professional {
  id: number;
  name: string;
  specialty: string;
  category: string;
  rating: number;
  reviews: number;
  location: string;
  availability: string;
  image: string;
  experience: string;
}

export default function HomePage() {
  const [featuredExperts, setFeaturedExperts] = useState<Professional[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/professionals')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setFeaturedExperts(data))
      .catch(err => {
        console.error("Failed to fetch professionals:", err);
        // Optionally set empty state or error state here
        setFeaturedExperts([]);
      });
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background px-4 py-16 md:py-24">
          <div className="container mx-auto">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4">
                Trusted by 50,000+ Users
              </Badge>
              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Connect with Top Professionals in Healthcare, Career & Finance
              </h1>
              <p className="mb-8 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
                Find and book appointments with verified doctors, career advisors, and financial experts. Get expert
                guidance when you need it.
              </p>

              <div className="mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search doctors, career coaches, financial advisors..."
                    className="h-12 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm outline-none ring-offset-background transition-all focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  />
                </div>
                <Button size="lg" className="h-12 px-8" asChild>
                  <Link href="/find-experts">Find Experts</Link>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Instant Booking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>Verified Experts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  <span>Client Reviews</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 bg-muted/30">
          <div className="container mx-auto">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">Our Services</h2>
              <p className="text-pretty text-muted-foreground">Choose the type of professional you need</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={`/find-experts?category=${category.name.toLowerCase().replace(" ", "-")}`}
                  className="group"
                >
                  <Card className="h-full transition-all hover:shadow-lg">
                    <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                      <div className={`mb-4 rounded-full p-4 ${category.color}`}>
                        <category.icon className="h-8 w-8" />
                      </div>
                      <h3 className="mb-2 text-xl font-semibold text-foreground group-hover:text-primary">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Specialties Section */}
        <section className="px-4 py-16">
          <div className="container mx-auto">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">Browse by Expertise</h2>
              <p className="text-pretty text-muted-foreground">Find the right specialist for your needs</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {specialties.map((specialty) => (
                <Link
                  key={specialty.name}
                  href={`/find-experts?specialty=${specialty.name.toLowerCase()}`}
                  className="group"
                >
                  <Card className="transition-all hover:shadow-md">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <div className={`mb-3 rounded-full p-3 ${specialty.color}`}>
                        <specialty.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary">
                        {specialty.name}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Experts Section */}
        <section className="bg-muted/50 px-4 py-16">
          <div className="container mx-auto">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">Featured Experts</h2>
                <p className="text-pretty text-muted-foreground">
                  Highly-rated professionals available for appointments
                </p>
              </div>
              <Button variant="outline" asChild className="hidden sm:inline-flex bg-transparent">
                <Link href="/find-experts">View All</Link>
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {featuredExperts.map((expert) => (
                <Card key={expert.id} className="overflow-hidden transition-all hover:shadow-lg">
                  <CardContent className="p-0">
                    <div className="relative h-48 w-full bg-muted">
                      <img
                        src={expert.image || "/placeholder.svg"}
                        alt={expert.name}
                        className="h-full w-full object-cover"
                      />
                      <Badge className="absolute right-3 top-3 bg-background/90 text-foreground backdrop-blur-sm">
                        {expert.availability}
                      </Badge>
                    </div>
                    <div className="p-5">
                      <div className="mb-3 flex items-start justify-between">
                        <div>
                          <h3 className="mb-1 font-semibold text-foreground">{expert.name}</h3>
                          <p className="text-sm text-muted-foreground">{expert.specialty}</p>
                        </div>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={expert.image || "/placeholder.svg"} alt={expert.name} />
                          <AvatarFallback>
                            {expert.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      <div className="mb-3 flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium text-foreground">{expert.rating}</span>
                          <span className="text-muted-foreground">({expert.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{expert.experience}</span>
                        </div>
                      </div>

                      <div className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{expert.location}</span>
                      </div>

                      <Button className="w-full" asChild>
                        <Link href={`/book?professionalId=${expert.id}`}>Book Appointment</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Button variant="outline" asChild>
                <Link href="/find-experts">View All Experts</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="px-4 py-16">
          <div className="container mx-auto">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">How It Works</h2>
              <p className="text-pretty text-muted-foreground">Book your appointment in three simple steps</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  1
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">Search for Experts</h3>
                <p className="text-pretty leading-relaxed text-muted-foreground">
                  Browse our network of verified professionals by specialty, location, or availability.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  2
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">Choose a Time Slot</h3>
                <p className="text-pretty leading-relaxed text-muted-foreground">
                  View real-time availability and select a convenient appointment time that works for you.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  3
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">Confirm Booking</h3>
                <p className="text-pretty leading-relaxed text-muted-foreground">
                  Receive instant confirmation and reminders. Manage all appointments from your dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary px-4 py-16 text-primary-foreground">
          <div className="container mx-auto text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">Ready to Book Your Appointment?</h2>
            <p className="mb-8 text-pretty text-lg leading-relaxed text-primary-foreground/90">
              Join thousands who trust ExpertConnect for professional guidance in health, career, and finance.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/find-experts">Find an Expert</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
                asChild
              >
                <Link href="/signup">Create Account</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
