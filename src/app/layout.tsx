import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { VOICE_LIVE } from "@/config/launch";
import "./globals.css";

/*
 * Self-hosted at build time (the production design-system path — replaces the
 * prototype's Google-CDN @import). Each face exposes a CSS variable that
 * src/styles/tokens/fonts.css maps onto the --font-display / --font-sans /
 * --font-mono design-system tokens.
 */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  // Include the optical-size axis (the prototype's CDN @import requested
  // `opsz,wght@9..144`). With opsz present, font-optical-sizing:auto uses the
  // narrower *display* cut at large sizes — without it Fraunces is stuck on the
  // wider *text* cut and display headings reflow wider than the design.
  axes: ["opsz"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const TITLE = "Open Persona: AI personas that remember";
const DESCRIPTION =
  "Build and run AI personas with real memory and one consistent identity across voice and text. Source-available core, hosted API, real-time voice" +
  (VOICE_LIVE ? "." : " coming soon.");

export const metadata: Metadata = {
  // Marketing root (the app lives at app.openpersona.online). Used to resolve
  // the relative OG/icon URLs to absolute — update if the landing deploys elsewhere.
  metadataBase: new URL("https://openpersona.online"),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Open Persona",
  icons: {
    icon: [
      { url: "/brand/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/brand/apple-touch-icon.png",
    shortcut: "/brand/favicon.ico",
  },
  openGraph: {
    type: "website",
    siteName: "Open Persona",
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    images: [
      {
        url: "/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "Open Persona",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/brand/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* dark "editorial instrument" mode is the only theme — the token swap lives
       on the `dark` class, mirroring the prototype's <html class="dark">. */
    <html
      lang="en"
      className={`dark ${fraunces.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
