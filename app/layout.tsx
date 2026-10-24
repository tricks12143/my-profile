import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/lib/cartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "John Irvin Udang | Full-Stack & SaaS Developer",
  description:
    "Portfolio of John Irvin C. Udang - Full-stack & SaaS developer with over 9 years of experience in React, Next.js, TypeScript, Node.js, SaaS programming, Cloud, and AI integrations.",
  keywords: [
    "Full-Stack Developer",
    "SaaS Developer",
    "SaaS Programming",
    "Frontend Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Azure",
    "TailwindCSS",
    "John Irvin Udang",
    "Gemini AI",
    "Chatbot",
  ],
  authors: [{ name: "John Irvin Udang" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body
        className="flex min-h-screen flex-col bg-neutral-950 text-neutral-100 selection:bg-white selection:text-black font-sans"
        suppressHydrationWarning
      >
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ChatBot />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
