import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import PageTransitionShell from "@/components/PageTransitionShell";
import VigilGuide from "@/components/vigil-guide/VigilGuide";

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  variable: "--font-heading",
});

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
      <body className={`${headingFont.variable} antialiased flex min-h-screen flex-col`}>
        <Navbar />
        <main className="flex-1 flex flex-col">
          <PageTransitionShell>{children}</PageTransitionShell>
        </main>
        <Footer />
        <VigilGuide />
        <Analytics />
      </body>
    </html>
  );
}
