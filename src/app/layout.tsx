import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CXC Ace — Caribbean Exam Prep",
  description:
    "Smart Caribbean exam preparation platform for CSEC and CAPE students. Practice with MCQs, AI tutoring, flashcards, and track your progress.",
  keywords: [
    "CXC", "CAPE", "Caribbean exams", "exam prep", "CSEC", "study tool",
    "Caribbean education", "CSEC Mathematics", "CSEC English", "CSEC Biology",
    "CSEC Chemistry", "CSEC Physics", "CAPE Pure Mathematics", "CAPE Caribbean Studies",
    "flashcards", "quiz", "AI tutor",
  ],
  authors: [{ name: "CXC Ace Team" }],
  openGraph: {
    title: "CXC Ace — Caribbean Exam Prep",
    description: "Smart Caribbean exam preparation for CSEC and CAPE students",
    type: "website",
  },
  icons: {
    icon: "/logo.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
