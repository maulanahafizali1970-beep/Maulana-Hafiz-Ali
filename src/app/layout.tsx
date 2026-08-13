import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactFormSection from "@/components/ContactFormSection";
import HtmlAttrs from "@/components/HtmlAttrs";

export const metadata: Metadata = {
  title: "Maulana Hafiz Ali | Islamic Love, Marriage & Spiritual Guidance",
  description:
    "Receive confidential Islamic spiritual and relationship guidance from Maulana Hafiz Ali for love, marriage, family, separation and emotional concerns. Arabic and English online consultation available.",
  metadataBase: new URL("https://maulana-hafiz-ali.vercel.app"),
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
      <html className="h-full">
        <head>
          <meta name="theme-color" content="#0B5D3B" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&family=Open+Sans:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </head>
      <body className="min-h-full flex flex-col bg-warm-ivory text-dark-text font-body antialiased">
        <HtmlAttrs />
        <Header />
        <main className="flex-1">{children}</main>
        <ContactFormSection />
        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Maulana Hafiz Ali",
              description:
                "Islamic Spiritual Guide providing confidential relationship and spiritual guidance.",
              url: "https://maulana-hafiz-ali.vercel.app",
              knowsAbout: [
                "Islamic spiritual guidance",
                "Relationship counseling",
                "Marriage guidance",
                "Family harmony",
              ],
            }),
          }}
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/6a7df6502850431d47cd920a/1jvu0kb3s';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
`,
          }}
        />
      </body>
    </html>
  );
}
