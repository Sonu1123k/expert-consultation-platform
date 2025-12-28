"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { useSearchParams } from "next/navigation"

export default function BookingPage() {
    const { user } = useUser();
    const searchParams = useSearchParams();
    const professionalId = searchParams.get('professionalId');

    const [date, setDate] = useState<Date | undefined>(new Date())
    const [selectedTime, setSelectedTime] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [expertName, setExpertName] = useState("")

    // Fetch professional details if ID exists
    useState(() => {
        if (professionalId) {
            fetch('http://localhost:5000/api/professionals')
                // Ideally we'd have a 'get one' endpoint, but filtering client side for MVP or adding endpoint later
                // For now, let's just fetch all and filter.
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        const expert = data.find((p: any) => p.id === Number(professionalId));
                        if (expert) setExpertName(expert.name);
                    } else {
                        console.error("API returned non-array data:", data);
                    }
                })
                .catch(err => console.error("Fetch error:", err));
        }
    });

    const timeSlots = [
        "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"
    ]

    const handleBooking = async () => {
        if (!date || !selectedTime || !user || !professionalId) return;

        setLoading(true);
        setMessage("");

        try {
            const res = await fetch('http://localhost:5000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                    date: date,
                    time: selectedTime,
                    serviceId: "general-consultation",
                    professionalId: professionalId
                }),
            });

            if (res.ok) {
                setMessage("Booking confirmed!");
                setSelectedTime(null);
            } else {
                setMessage("Failed to book.");
            }
        } catch (error) {
            console.error(error);
            setMessage("Error processing request.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-10 flex justify-center">
            <Card className="w-full max-w-3xl">
                <CardHeader>
                    <CardTitle>Book an Appointment {expertName ? `with ${expertName}` : ""}</CardTitle>
                    <CardDescription>Select a date and time for your consultation.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                        <h3 className="mb-4 text-sm font-medium">Select Date</h3>
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border shadow-sm"
                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        />
                    </div>
                    <div className="flex-1">
                        <h3 className="mb-4 text-sm font-medium">Select Time</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {timeSlots.map((time) => (
                                <Button
                                    key={time}
                                    variant={selectedTime === time ? "default" : "outline"}
                                    onClick={() => setSelectedTime(time)}
                                    className="w-full"
                                >
                                    {time}
                                </Button>
                            ))}
                        </div>
                        {selectedTime && date && (
                            <div className="mt-8 p-4 bg-muted rounded-md">
                                <p className="text-sm">
                                    You are booking for: <br />
                                    <strong>{format(date, "PPP")} at {selectedTime}</strong>
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4">
                    <Button
                        className="w-full md:w-auto"
                        disabled={!date || !selectedTime || loading || !user}
                        onClick={handleBooking}
                    >
                        {loading ? "Processing..." : "Confirm Booking"}
                    </Button>
                    {!user && <p className="text-sm text-red-500">Please sign in to book.</p>}
                    {!professionalId && <p className="text-sm text-red-500">No professional selected.</p>}
                    {message && <p className="text-sm text-blue-600">{message}</p>}
                </CardFooter>
            </Card>
        </div>
    )
}
