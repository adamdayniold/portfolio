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

const siteUrl = "https://adamdayniold.github.io/portfolio";
const title = "Adam Dayniold | Portfolio";
const description = "Software engineer experienced in enterprise systems, Perl, Angular, Python automation and testing. Explore my work in an interactive VS Code-style portfolio.";

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Adam Dayniold",
    type: "website",
    images: [{ url: `${siteUrl}/og.png`, width: 1919, height: 977 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${siteUrl}/og.png`],
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
