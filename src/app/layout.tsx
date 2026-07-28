import type { Metadata } from "next";
import { Merriweather, Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileContactBar from "@/components/MobileContactBar";

const merriweather = Merriweather({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const openSans = Open_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Maulana Hafiz Ali | Islamic Love, Marriage & Spiritual Guidance",
  description:
    "Receive confidential Islamic spiritual and relationship guidance from Maulana Hafiz Ali for love, marriage, family, separation and emotional concerns. Arabic and English online consultation available.",
  metadataBase: new URL("https://www.maulanahafizali.com"),
  openGraph: {
    title: "Maulana Hafiz Ali | Islamic Love, Marriage & Spiritual Guidance",
    description:
      "Receive confidential Islamic spiritual and relationship guidance from Maulana Hafiz Ali for love, marriage, family, separation and emotional concerns.",
    siteName: "Maulana Hafiz Ali",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maulana Hafiz Ali | Islamic Love, Marriage & Spiritual Guidance",
    description:
      "Receive confidential Islamic spiritual and relationship guidance from Maulana Hafiz Ali.",
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
    <html
      lang="en"
      dir="ltr"
      className={`${merriweather.variable} ${openSans.variable} h-full`}
    >
      <head>
        <link rel="canonical" href="https://www.maulanahafizali.com" />
        <meta name="theme-color" content="#0B5D3B" />
      </head>
      <body className="min-h-full flex flex-col bg-warm-ivory text-dark-text font-body antialiased">
        <Header lang="en" dir="ltr" />
        <main className="flex-1">{children}</main>
        <Footer lang="en" />
        <WhatsAppButton />
        <MobileContactBar lang="en" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Maulana Hafiz Ali",
              description:
                "Islamic Spiritual Guide providing confidential relationship and spiritual guidance.",
              url: "https://www.maulanahafizali.com",
              knowsAbout: [
                "Islamic spiritual guidance",
                "Relationship counseling",
                "Marriage guidance",
                "Family harmony",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
