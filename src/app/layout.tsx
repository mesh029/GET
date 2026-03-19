import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "GET – Green Environment Technology",
  description:
    "Transform every human verification into a learning moment. GET replaces CAPTCHA with meaningful awareness challenges.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Nav />
        {children}
      </body>
    </html>
  );
}
