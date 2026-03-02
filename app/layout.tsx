import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Analytics from "@/components/Analytics";
import StructuredData from "@/components/StructuredData";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Diana Lee | Career Development Facilitator & Enterprise Educator",
  description: "Empowering youth and professionals to turn ideas into impact — through career clarity and enterprise education.",
  keywords: ["career development", "enterprise education", "social innovation", "entrepreneurship", "Oxford", "Hong Kong"],
  authors: [{ name: "Diana Lee" }],
  openGraph: {
    title: "Diana Lee | Career Development Facilitator & Enterprise Educator",
    description: "Empowering youth and professionals to turn ideas into impact — through career clarity and enterprise education.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Structured data for Diana Lee (Person schema)
  const personStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Diana Lee',
    jobTitle: 'Career Development Facilitator & Enterprise Educator',
    url: 'https://diana-lee.com',
    sameAs: [
      'https://www.linkedin.com/in/dianaleetw',
    ],
    description: 'Career development facilitator and enterprise educator empowering youth and professionals through career clarity and entrepreneurship.',
    knowsAbout: ['Career Development', 'Enterprise Education', 'Social Innovation', 'Entrepreneurship', 'Facilitation'],
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <StructuredData data={personStructuredData} />
        <Analytics />
        <LanguageProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  );
}
