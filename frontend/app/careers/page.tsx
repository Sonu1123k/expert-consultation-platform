"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Briefcase, MapPin, Clock } from "lucide-react"

const openings = [
    {
        title: "Senior Full Stack Engineer",
        department: "Engineering",
        location: "Remote / New York",
        type: "Full-time",
        description: "We are looking for an experienced Full Stack Engineer to lead our core product team. You will be responsible for architecting scalable solutions and mentoring junior developers."
    },
    {
        title: "Product Manager",
        department: "Product",
        location: "San Francisco, CA",
        type: "Full-time",
        description: "Join our product team to define the roadmap for ExpertConnect. You'll work closely with engineering, design, and our users to build features that matter."
    },
    {
        title: "Customer Success Specialist",
        department: "Operations",
        location: "Remote",
        type: "Full-time",
        description: "You will be the face of ExpertConnect for our professionals and users. We need someone who is empathetic, organized, and a great problem solver."
    },
    {
        title: "Marketing Lead",
        department: "Marketing",
        location: "New York, NY",
        type: "Full-time",
        description: "Drive our growth strategy and tell our story to the world. You will oversee all marketing channels including content, social, and performance marketing."
    },
]

export default function CareersPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navigation />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-primary py-20 text-primary-foreground">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Join Our Team</h1>
                        <p className="mx-auto max-w-2xl text-xl opacity-90">
                            Help us build the future of professional consultation. We are a passionate team dedicated to connecting people with the expertise they need.
                        </p>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <h2 className="text-3xl font-bold mb-4">Why Work With Us?</h2>
                            <p className="text-muted-foreground">
                                We value innovation, integrity, and inclusivity. At ExpertConnect, you'll have the autonomy to make a real impact while working with some of the brightest minds in the industry.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Openings Section */}
                <section className="bg-muted/30 py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="mb-8 text-3xl font-bold text-center">Open Positions</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                            {openings.map((job, index) => (
                                <Card key={index} className="flex flex-col">
                                    <CardHeader>
                                        <CardTitle>{job.title}</CardTitle>
                                        <CardDescription className="flex items-center gap-2 mt-2">
                                            <Briefcase className="h-4 w-4" /> {job.department}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <p className="text-sm text-muted-foreground mb-4">{job.description}</p>
                                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" /> {job.location}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" /> {job.type}
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full">Apply Now</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
