"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Star, MapPin, Clock, GraduationCap, Award, CheckCircle2, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

// Mock doctor data
const doctorData: Record<string, any> = {
  "1": {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    rating: 4.9,
    reviews: 127,
    location: "New York, NY",
    image: "/professional-female-doctor-headshot.png",
    experience: "15 years",
    education: "MD, Harvard Medical School",
    about:
      "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating heart conditions. She specializes in preventive cardiology and interventional procedures.",
    languages: ["English", "Spanish"],
    acceptingNew: true,
    consultationFee: "$150",
  },
}

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
]

export default function DoctorDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const doctor = doctorData[params.id as string] || doctorData["1"]

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      setShowConfirmation(true)
    }
  }

  const confirmBooking = () => {
    setShowConfirmation(false)
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/30 px-4 py-4">
          <div className="container mx-auto">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/find-doctors" className="hover:text-foreground">
                Find Doctors
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{doctor.name}</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
            {/* Main Content */}
            <div className="space-y-6">
              {/* Doctor Header */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-6 sm:flex-row">
                    <Avatar className="h-32 w-32 rounded-lg">
                      <AvatarImage
                        src={doctor.image || "/placeholder.svg"}
                        alt={doctor.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="rounded-lg text-2xl">
                        {doctor.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="mb-3">
                        <h1 className="mb-1 text-3xl font-bold text-foreground">{doctor.name}</h1>
                        <p className="text-lg text-muted-foreground">{doctor.specialty}</p>
                      </div>

                      <div className="mb-4 flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-foreground">{doctor.rating}</span>
                          <span className="text-sm text-muted-foreground">({doctor.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{doctor.location}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{doctor.experience}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {doctor.acceptingNew && (
                          <Badge className="bg-green-600 dark:bg-green-700">Accepting New Patients</Badge>
                        )}
                        <Badge variant="secondary">Available Today</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tabs */}
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>About Dr. {doctor.name.split(" ")[1]}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <p className="leading-relaxed text-muted-foreground">{doctor.about}</p>
                      </div>

                      <div>
                        <h3 className="mb-2 font-semibold text-foreground">Languages</h3>
                        <div className="flex flex-wrap gap-2">
                          {doctor.languages.map((lang: string) => (
                            <Badge key={lang} variant="outline">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-3 font-semibold text-foreground">Specializations</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                            <span className="text-muted-foreground">Preventive Cardiology</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                            <span className="text-muted-foreground">Interventional Cardiology</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                            <span className="text-muted-foreground">Heart Failure Management</span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="education" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Education & Credentials</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <GraduationCap className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">Medical Degree</h3>
                          <p className="text-muted-foreground">{doctor.education}</p>
                          <p className="text-sm text-muted-foreground">Graduated 2008</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <Award className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">Board Certification</h3>
                          <p className="text-muted-foreground">American Board of Internal Medicine - Cardiology</p>
                          <p className="text-sm text-muted-foreground">Certified 2011</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <GraduationCap className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">Residency</h3>
                          <p className="text-muted-foreground">Internal Medicine, Johns Hopkins Hospital</p>
                          <p className="text-sm text-muted-foreground">2008 - 2011</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Patient Reviews</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {[1, 2, 3].map((review) => (
                        <div key={review} className="border-b border-border pb-6 last:border-0 last:pb-0">
                          <div className="mb-2 flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-sm font-medium text-foreground">5.0</span>
                          </div>
                          <p className="mb-2 text-sm font-medium text-foreground">John D.</p>
                          <p className="leading-relaxed text-muted-foreground">
                            Excellent doctor! Very thorough and takes time to explain everything. Highly recommend.
                          </p>
                          <p className="mt-2 text-xs text-muted-foreground">2 weeks ago</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Booking Sidebar */}
            <div className="space-y-6">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Book Appointment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg border border-border bg-muted/50 p-4">
                    <p className="text-sm text-muted-foreground">Consultation Fee</p>
                    <p className="text-2xl font-bold text-foreground">{doctor.consultationFee}</p>
                  </div>

                  {/* Calendar */}
                  <div>
                    <h3 className="mb-3 text-sm font-semibold text-foreground">Select Date</h3>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date.getDay() === 0}
                      className="rounded-md border border-border"
                    />
                  </div>

                  {/* Time Slots */}
                  {selectedDate && (
                    <div>
                      <h3 className="mb-3 text-sm font-semibold text-foreground">Select Time</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            className="w-full"
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleBooking}
                    disabled={!selectedDate || !selectedTime}
                  >
                    Confirm Booking
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    You'll receive a confirmation email after booking
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Appointment</DialogTitle>
            <DialogDescription>Please review your appointment details before confirming.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={doctor.image || "/placeholder.svg"} alt={doctor.name} />
                <AvatarFallback>
                  {doctor.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-foreground">{doctor.name}</p>
                <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
              </div>
            </div>

            <div className="space-y-2 rounded-lg border border-border bg-muted/50 p-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium text-foreground">{selectedDate?.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Time</span>
                <span className="font-medium text-foreground">{selectedTime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Location</span>
                <span className="font-medium text-foreground">{doctor.location}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-sm">
                <span className="text-muted-foreground">Consultation Fee</span>
                <span className="font-semibold text-foreground">{doctor.consultationFee}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              Cancel
            </Button>
            <Button onClick={confirmBooking}>Confirm Booking</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
