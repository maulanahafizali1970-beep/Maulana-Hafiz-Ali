import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import HtmlAttrs from "@/components/HtmlAttrs";
import TawkWidget from "@/components/TawkWidget";

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
        <SiteChrome>{children}</SiteChrome>

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
        <TawkWidget />
        <Script
  id="hitsteps"
  strategy="afterInteractive"
>
  {`
    (function(){
      var hstc = document.createElement('script');
      hstc.src = 'https://edgecdnplus.com/code?code=d1e9b897ca7d03a79d8c8bdefda4c53a';
      hstc.async = true;

      var htssc = document.getElementsByTagName('script')[0];

      if (htssc && htssc.parentNode) {
        htssc.parentNode.insertBefore(hstc, htssc);
      }
    })();
  `}
</Script>
      </body>
    </html>
  );
}
