import type { Metadata } from "next";
import { Geist, Geist_Mono, Inconsolata } from "next/font/google";
import "./globals.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inconsolata = Inconsolata({
  variable: "--font-inconsolata",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dr. Geetha Ayurveda",
  description: "Ayurveda research, formulations, articles, and resources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inconsolata.variable} antialiased`}
      >
        <Header />
        <div className="mx-auto max-w-6xl px-4">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
