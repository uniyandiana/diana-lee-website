import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
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
  return (
    <html lang="en">
      <body className={inter.className}>
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
