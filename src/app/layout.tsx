import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "VoicePrep | AI Voice Interview Practice",
    template: "%s | VoicePrep",
  },
  description:
    "Practice interviews with an AI that talks back. Get real time voice feedback, detailed transcripts, and personalized coaching to ace your next interview.",
  keywords: [
    "interview practice",
    "AI interview",
    "voice interview",
    "mock interview",
    "interview coaching",
    "job interview prep",
    "technical interview",
    "behavioral interview",
  ],
  authors: [{ name: "VoicePrep" }],
  creator: "VoicePrep",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://voiceprep.app",
    siteName: "VoicePrep",
    title: "VoicePrep | AI Voice Interview Practice",
    description:
      "Practice interviews with an AI that talks back. Get real time voice feedback, detailed transcripts, and personalized coaching to ace your next interview.",
    images: [
      {
        url: "https://voiceprep.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "VoicePrep AI Interview Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VoicePrep | AI Voice Interview Practice",
    description:
      "Practice interviews with an AI that talks back. Real voice coaching, transcripts, and scoring.",
    images: ["https://voiceprep.app/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "VoicePrep",
    applicationCategory: "EducationApplication",
    operatingSystem: "Web",
    description:
      "AI powered voice interview practice platform with real time feedback and personalized coaching.",
    url: "https://voiceprep.app",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
