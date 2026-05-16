import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import CursorGlow from "@/components/CursorGlow";
import PageTransitionShell from "@/components/PageTransitionShell";

export const metadata: Metadata = {
  title: "Project Vigil — AI Scam Defense for Teens",
  description:
    "AI is now cloning voices, faking faces, and writing perfect phishing emails. Can you tell the difference? Project Vigil teaches teens to fight back.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col">
          <PageTransitionShell>{children}</PageTransitionShell>
        </main>
        <Footer />
        <CursorGlow />
        <Analytics />
      </body>
    </html>
  );
}
