import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, DM_Mono } from "next/font/google";
import "./globals.css";

/* ── Fonts (auto self-hosted via next/font) ────────────────── */

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

/* ── Root Metadata ─────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: "Pacific Star Realty | Premium Real Estate in Dubai",
    template: "%s | Pacific Star Realty",
  },
  description:
    "Discover premium properties for sale and rent in Dubai with Pacific Star Realty. Explore off-plan developments, luxury penthouses, private villas, and bespoke investment portfolios.",
  keywords: [
    "Pacific Star Realty",
    "Dubai real estate",
    "properties for sale in Dubai",
    "apartments for sale Dubai",
    "villas Dubai",
    "off-plan properties Dubai",
    "Dubai property investment",
    "luxury real estate Dubai",
  ],
  authors: [{ name: "Pacific Star Realty" }],
  creator: "Pacific Star Realty",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://dubaiestate.com"
  ),
  openGraph: {
    type: "website",
    locale: "en_AE",
    siteName: "Pacific Star Realty",
    title: "Pacific Star Realty | Premium Real Estate in Dubai",
    description:
      "Discover premium properties for sale and rent in Dubai with Pacific Star Realty. Expert luxury real estate advisory for buyers, investors, and tenants.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Pacific Star Realty — Premium Dubai Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pacific Star Realty | Premium Real Estate in Dubai",
    description:
      "Discover premium properties for sale and rent in Dubai with Pacific Star Realty.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/* ── Root Layout ────────────────────────────────────────────── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${dmMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
