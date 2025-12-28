import Link from "next/link"
import { Stethoscope } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Stethoscope className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">ExpertConnect</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Connect with Top Professionals Online.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">For Users</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/find-experts"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Find Experts
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} ExpertConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
