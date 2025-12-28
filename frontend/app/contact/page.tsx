"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Simulate form submission
        setSubmitted(true)
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navigation />

            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold">Contact Us</h1>
                    <p className="text-lg text-muted-foreground">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <Card>
                            <CardContent className="flex items-center gap-4 p-6">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                    <Mail className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Email</h3>
                                    <p className="text-sm text-muted-foreground">support@expertconnect.com</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="flex items-center gap-4 p-6">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                    <Phone className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Phone</h3>
                                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="flex items-center gap-4 p-6">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                    <MapPin className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Office</h3>
                                    <p className="text-sm text-muted-foreground">
                                        123 Innovation Drive, Tech City, TC 90210
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Send a Message</CardTitle>
                            <CardDescription>
                                Fill out the form below and our team will get back to you within 24 hours.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {submitted ? (
                                <div className="flex flex-col items-center justify-center py-10 text-center">
                                    <div className="mb-4 rounded-full bg-green-100 p-3 text-green-600">
                                        <CheckIcon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-xl font-bold">Message Sent!</h3>
                                    <p className="text-muted-foreground">Thank you for reaching out. We'll be in touch shortly.</p>
                                    <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
                                        Send Another Message
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <label htmlFor="first-name" className="text-sm font-medium">First name</label>
                                            <Input id="first-name" placeholder="John" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="last-name" className="text-sm font-medium">Last name</label>
                                            <Input id="last-name" placeholder="Doe" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                                        <Input id="email" type="email" placeholder="john@example.com" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium">Message</label>
                                        <Textarea
                                            id="message"
                                            placeholder="How can we help you?"
                                            className="min-h-[120px]"
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Send Message
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    )
}

function CheckIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}
