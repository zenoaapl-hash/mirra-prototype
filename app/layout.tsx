import type { Metadata } from "next";
import "./globals.css";
import { Nav, Footer } from "@/components/ui";

export const metadata: Metadata = {
  title: "MIRRA — Your Social Identity Platform",
  description: "Create your MIRRA Self. Join creator-led culture worlds. Collect digital identity items.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
