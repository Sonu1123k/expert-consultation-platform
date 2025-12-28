import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export function Navigation() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Users className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-foreground">ExpertConnect</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Home
          </Link>
          <Link
            href="/find-experts?category=Medical"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Doctors
          </Link>
          <Link
            href="/find-experts?category=Financial"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Financial Advisors
          </Link>
          <Link
            href="/find-experts?category=Career"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Career Advisors
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact
          </Link>


          <SignedIn>
            <Link
              href="/my-bookings"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              My Bookings
            </Link>
          </SignedIn>
        </nav>

        <div className="flex items-center gap-3">
          <SignedOut>
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <SignInButton />
            </Button>
            <Button asChild>
              <SignUpButton />
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  )
}
