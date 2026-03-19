import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Leaf, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GET – Green Environment Technology",
  description:
    "Transform every human verification into a learning moment. GET replaces CAPTCHA with meaningful awareness challenges.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const footerLinks = [
  { href: "/", label: "Experience" },
  { href: "/learn", label: "Knowledge Hub" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/embed", label: "Embed GET" },
  { href: "/learn/m16", label: "Climate Crisis" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased flex flex-col">
        <Nav />
        <div className="flex-1">{children}</div>

        {/* ── Footer ─────────────────────────────────────────────── */}
        <footer className="border-t border-border bg-secondary/20 mt-auto">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
              {/* Brand */}
              <div className="max-w-xs">
                <Link href="/" className="flex items-center gap-2 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                    <Leaf className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="font-semibold text-foreground tracking-tight">GET</span>
                </Link>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Green Environment Technology. Every verification, an awareness
                  moment. Every moment, a better-informed world.
                </p>
              </div>

              {/* Links */}
              <div>
                <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                  Explore
                </p>
                <ul className="space-y-2">
                  {footerLinks.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                      >
                        <ArrowRight className="h-3 w-3" />
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div>
                <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                  Partner
                </p>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="mailto:schools@get.earth?subject=GET for Schools — Demo Request"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                    >
                      <ArrowRight className="h-3 w-3" />
                      For Schools
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:hello@get.earth?subject=GET Partnership"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                    >
                      <ArrowRight className="h-3 w-3" />
                      For Organisations
                    </a>
                  </li>
                  <li>
                    <Link
                      href="/embed"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                    >
                      <ArrowRight className="h-3 w-3" />
                      Embed the SDK
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} GET — Green Environment Technology
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Leaf className="h-3 w-3 text-primary" />
                Built to upgrade humans, not filter robots.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
