"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Users, Trophy } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navigation />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-primary py-20 text-primary-foreground">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="mb-4 text-4xl font-bold md:text-5xl">About ExpertConnect</h1>
                        <p className="mx-auto max-w-2xl text-xl opacity-90">
                            Connecting you with world-class professionals for better health, wealth, and career growth.
                        </p>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid gap-12 md:grid-cols-2 items-center">
                            <div>
                                <h2 className="mb-6 text-3xl font-bold">Our Mission</h2>
                                <p className="mb-4 text-lg text-muted-foreground">
                                    At ExpertConnect, we believe that access to expert advice shouldn't be complicated.
                                    Our mission is to bridge the gap between seeking knowledge and finding the right professional.
                                </p>
                                <p className="text-lg text-muted-foreground">
                                    Whether you need medical consultation, financial planning, or career coaching,
                                    we provide a seamless platform to book appointments with top-rated experts in their fields.
                                </p>
                            </div>
                            <div className="grid gap-6 sm:grid-cols-2">
                                <Card>
                                    <CardContent className="flex flex-col items-center p-6 text-center">
                                        <CheckCircle2 className="mb-4 h-12 w-12 text-primary" />
                                        <h3 className="mb-2 font-semibold">Verified Experts</h3>
                                        <p className="text-sm text-muted-foreground">Every professional is vetted for quality and credentials.</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="flex flex-col items-center p-6 text-center">
                                        <Users className="mb-4 h-12 w-12 text-primary" />
                                        <h3 className="mb-2 font-semibold">Easy Booking</h3>
                                        <p className="text-sm text-muted-foreground">Schedule appointments in seconds with our intuitive interface.</p>
                                    </CardContent>
                                </Card>
                                <Card className="sm:col-span-2">
                                    <CardContent className="flex flex-col items-center p-6 text-center">
                                        <Trophy className="mb-4 h-12 w-12 text-primary" />
                                        <h3 className="mb-2 font-semibold">Excellence First</h3>
                                        <p className="text-sm text-muted-foreground">We prioritize quality service and user satisfaction above all.</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Story Section */}
                <section className="bg-muted/30 py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="mb-8 text-3xl font-bold">Our Story</h2>
                        <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
                            Founded in 2024, ExpertConnect started with a simple question: "Why is it so hard to find reliable experts?"
                            What began as a small directory has grown into a comprehensive booking platform serving thousands of users
                            and professionals. We are constantly evolving, adding new categories and features to make professional
                            assistance accessible to everyone, everywhere.
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
