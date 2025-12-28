"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Calendar, Clock, MapPin, Video, X, CalendarIcon } from "lucide-react"
import Link from "next/link"

const upcomingAppointments = [
  {
    id: 1,
    doctorName: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    date: "2024-01-15",
    time: "10:00 AM",
    location: "New York, NY",
    type: "In-Person",
    image: "/professional-female-doctor-headshot.png",
    status: "confirmed",
  },
  {
    id: 2,
    doctorName: "Dr. Michael Chen",
    specialty: "Neurologist",
    date: "2024-01-18",
    time: "02:30 PM",
    location: "San Francisco, CA",
    type: "Video Call",
    image: "/professional-male-doctor.png",
    status: "confirmed",
  },
  {
    id: 3,
    doctorName: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    date: "2024-01-22",
    time: "11:00 AM",
    location: "Austin, TX",
    type: "In-Person",
    image: "/professional-female-pediatrician-headshot.jpg",
    status: "pending",
  },
]

const pastAppointments = [
  {
    id: 4,
    doctorName: "Dr. James Williams",
    specialty: "Orthopedic Surgeon",
    date: "2023-12-20",
    time: "03:00 PM",
    location: "Chicago, IL",
    type: "In-Person",
    image: "/professional-male-surgeon-headshot.jpg",
    status: "completed",
  },
  {
    id: 5,
    doctorName: "Dr. Lisa Anderson",
    specialty: "Dermatologist",
    date: "2023-12-10",
    time: "09:30 AM",
    location: "Los Angeles, CA",
    type: "Video Call",
    image: "/female-dermatologist.jpg",
    status: "completed",
  },
]

export default function DashboardPage() {
  const [appointments, setAppointments] = useState(upcomingAppointments)
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [appointmentToCancel, setAppointmentToCancel] = useState<number | null>(null)

  const handleCancelAppointment = (appointmentId: number) => {
    setAppointmentToCancel(appointmentId)
    setShowCancelDialog(true)
  }

  const confirmCancelAppointment = () => {
    if (appointmentToCancel) {
      setAppointments(appointments.filter((apt) => apt.id !== appointmentToCancel))
      setShowCancelDialog(false)
      setAppointmentToCancel(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-600 dark:bg-green-700"
      case "pending":
        return "bg-yellow-600 dark:bg-yellow-700"
      case "completed":
        return "bg-blue-600 dark:bg-blue-700"
      case "cancelled":
        return "bg-red-600 dark:bg-red-700"
      default:
        return "bg-gray-600 dark:bg-gray-700"
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex-1 bg-muted/30">
        {/* Header */}
        <section className="border-b border-border bg-card px-4 py-8">
          <div className="container mx-auto">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h1 className="mb-2 text-3xl font-bold text-foreground">My Dashboard</h1>
                <p className="text-muted-foreground">Manage your appointments and medical records</p>
              </div>
              <Button asChild>
                <Link href="/find-doctors">Book New Appointment</Link>
              </Button>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          {/* Stats Cards */}
          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Upcoming</p>
                    <p className="text-3xl font-bold text-foreground">{appointments.length}</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-3xl font-bold text-foreground">{pastAppointments.length}</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-600/10 dark:bg-green-700/10">
                    <CalendarIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">This Month</p>
                    <p className="text-3xl font-bold text-foreground">3</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/10 dark:bg-blue-700/10">
                    <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Doctors Seen</p>
                    <p className="text-3xl font-bold text-foreground">5</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600/10 dark:bg-purple-700/10">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">D</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Appointments Tabs */}
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
              <TabsTrigger value="past">Past Appointments</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {appointments.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Calendar className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="mb-2 text-lg font-semibold text-foreground">No upcoming appointments</h3>
                    <p className="mb-4 text-sm text-muted-foreground">Book an appointment to get started</p>
                    <Button asChild>
                      <Link href="/find-doctors">Find a Doctor</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                appointments.map((appointment) => (
                  <Card key={appointment.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        {/* Doctor Image */}
                        <div className="relative h-48 w-full sm:h-auto sm:w-48">
                          <img
                            src={appointment.image || "/placeholder.svg"}
                            alt={appointment.doctorName}
                            className="h-full w-full object-cover"
                          />
                          <Badge className={`absolute right-3 top-3 ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </Badge>
                        </div>

                        {/* Appointment Details */}
                        <div className="flex flex-1 flex-col justify-between p-6">
                          <div>
                            <div className="mb-3 flex items-start justify-between">
                              <div>
                                <h3 className="mb-1 text-xl font-semibold text-foreground">{appointment.doctorName}</h3>
                                <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                              </div>
                              <Avatar className="h-12 w-12">
                                <AvatarImage
                                  src={appointment.image || "/placeholder.svg"}
                                  alt={appointment.doctorName}
                                />
                                <AvatarFallback>
                                  {appointment.doctorName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                            </div>

                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {new Date(appointment.date).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>{appointment.time}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                {appointment.type === "Video Call" ? (
                                  <>
                                    <Video className="h-4 w-4" />
                                    <span>Video Consultation</span>
                                  </>
                                ) : (
                                  <>
                                    <MapPin className="h-4 w-4" />
                                    <span>{appointment.location}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-3">
                            <Button variant="outline" onClick={() => setShowRescheduleDialog(true)}>
                              Reschedule
                            </Button>
                            {appointment.type === "Video Call" && <Button>Join Video Call</Button>}
                            <Button
                              variant="outline"
                              className="text-destructive hover:text-destructive bg-transparent"
                              onClick={() => handleCancelAppointment(appointment.id)}
                            >
                              <X className="mr-2 h-4 w-4" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {pastAppointments.map((appointment) => (
                <Card key={appointment.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      {/* Doctor Image */}
                      <div className="relative h-48 w-full sm:h-auto sm:w-48">
                        <img
                          src={appointment.image || "/placeholder.svg"}
                          alt={appointment.doctorName}
                          className="h-full w-full object-cover"
                        />
                        <Badge className={`absolute right-3 top-3 ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </Badge>
                      </div>

                      {/* Appointment Details */}
                      <div className="flex flex-1 flex-col justify-between p-6">
                        <div>
                          <div className="mb-3 flex items-start justify-between">
                            <div>
                              <h3 className="mb-1 text-xl font-semibold text-foreground">{appointment.doctorName}</h3>
                              <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                            </div>
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={appointment.image || "/placeholder.svg"} alt={appointment.doctorName} />
                              <AvatarFallback>
                                {appointment.doctorName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {new Date(appointment.date).toLocaleDateString("en-US", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>{appointment.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              {appointment.type === "Video Call" ? (
                                <>
                                  <Video className="h-4 w-4" />
                                  <span>Video Consultation</span>
                                </>
                              ) : (
                                <>
                                  <MapPin className="h-4 w-4" />
                                  <span>{appointment.location}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-3">
                          <Button variant="outline" asChild>
                            <Link href={`/doctors/${appointment.id}`}>Book Again</Link>
                          </Button>
                          <Button variant="outline">View Medical Records</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />

      {/* Reschedule Dialog */}
      <Dialog open={showRescheduleDialog} onOpenChange={setShowRescheduleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
            <DialogDescription>
              Select a new date and time for your appointment. You'll receive a confirmation email once rescheduled.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center text-muted-foreground">
              This feature will allow you to select a new date and time from the available slots.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRescheduleDialog(false)}>
              Close
            </Button>
            <Button onClick={() => setShowRescheduleDialog(false)}>Confirm Reschedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Appointment</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmCancelAppointment}
              className="bg-destructive text-destructive-foreground"
            >
              Cancel Appointment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
