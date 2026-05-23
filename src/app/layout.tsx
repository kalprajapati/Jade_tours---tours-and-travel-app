import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Dancing_Script } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/ui/StickyCTA";
import ScrollProgress from "@/components/ui/ScrollProgress";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jadetravels.co.in"),
  title: "Jade Tours & Travel | Expert Travel, Passport & Visa Services",
  description: "Expert global travel, passport, and visa services. 15+ years of excellence in Ahmedabad, Gujarat.",
  keywords: ["travel agency", "visa assistance", "passport services", "custom tours", "Jade Travels", "Jigar Shah", "Dhara Patel", "Ahmedabad travel agency"],
  authors: [{ name: "Jade Tours & Travel" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/globe.svg",
    apple: "/globe.svg",
  },
  openGraph: {
    title: "Jade Tours & Travel | Perfect Trips Every Time",
    description: "Custom plans and expert travel support. Travel with confidence with Jade Tours & Travel.",
    url: "https://jadetravels.co.in",
    siteName: "Jade Tours & Travel",
    images: [{
      url: "/assets/image.png",
      width: 1200,
      height: 630,
      alt: "Jade Tours & Travel"
    }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jade Tours & Travel",
    description: "Expert global travel, passport, and visa services.",
    images: ["/assets/image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${jakarta.variable} ${dancing.variable} font-sans antialiased bg-white text-[#1F2937]`} suppressHydrationWarning>
        <ScrollProgress />
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
          <StickyCTA />
        </SmoothScroll>
      </body>
    </html>
  );
}
