import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Royal Heating and Cooling",
  description: "Family owned HVAC company with 15+ years of experience. Licensed technicians, honest pricing, and top leading brands. Serving Northeast Ohio for furnaces, AC, heat pumps, and more.",
  keywords: "HVAC, heating, cooling, furnace, air conditioning, heat pump, duct cleaning, Ohio, Royal Heating and Cooling",
  openGraph: {
    title: "Royal Heating and Cooling",
    description: "Your Comfort, Our Crown - Family owned HVAC services",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
