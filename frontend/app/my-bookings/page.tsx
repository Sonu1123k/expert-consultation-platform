"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Calendar as CalendarIcon, Clock, User } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

interface Booking {
    _id: number
    userId: string
    date: string
    time: string
    professionalId: number
    serviceId: string
    status: string
    createdAt: string
}

interface Professional {
    id: number
    name: string
    specialty: string
    image: string
}

export default function MyBookingsPage() {
    const { user, isLoaded, isSignedIn } = useUser()
    const [bookings, setBookings] = useState<Booking[]>([])
    const [professionals, setProfessionals] = useState<Record<number, Professional>>({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!isLoaded || !isSignedIn || !user) {
            if (isLoaded && !isSignedIn) setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                // Fetch professionals first to build a lookup map
                const prosRes = await fetch('http://localhost:5000/api/professionals')
                const prosData = await prosRes.json()
                const prosMap: Record<number, Professional> = {}
                if (Array.isArray(prosData)) {
                    prosData.forEach((p: any) => {
                        prosMap[p.id] = p
                    })
                }
                setProfessionals(prosMap)

                // Fetch bookings
                const bookingsRes = await fetch(`http://localhost:5000/api/bookings?userId=${user.id}`)
                const bookingsData = await bookingsRes.json()

                if (Array.isArray(bookingsData)) {
                    setBookings(bookingsData)
                }
            } catch (error) {
                console.error("Failed to load data", error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [user, isLoaded, isSignedIn])

    if (!isLoaded) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navigation />

            <main className="flex-1 container mx-auto px-4 py-8">
                <h1 className="mb-8 text-3xl font-bold">My Bookings</h1>

                {!isSignedIn ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">Please sign in to view your bookings.</p>
                    </div>
                ) : loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="text-center py-12 border rounded-lg bg-muted/20">
                        <p className="text-muted-foreground">You don't have any bookings yet.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {bookings.map((booking) => {
                            const expert = professionals[booking.professionalId]
                            return (
                                <Card key={booking._id} className="overflow-hidden">
                                    <CardHeader className="bg-muted/30 pb-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-lg">{expert ? expert.name : `Expert #${booking.professionalId}`}</CardTitle>
                                                <CardDescription>{expert?.specialty || "Specialist"}</CardDescription>
                                            </div>
                                            <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                                                {booking.status}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-6 grid gap-3">
                                        <div className="flex items-center gap-2 text-sm">
                                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                            <span>{format(new Date(booking.date), 'MMMM do, yyyy')}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <span>{booking.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            <span>{expert?.name || "Unknown Expert"}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    )
}
