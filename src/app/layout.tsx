import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Caprica - Military Career Platform",
  description: "The career platform for America's military community. Translate your MOS to civilian careers, explore military opportunities, and find veteran-friendly employers.",
  keywords: "military careers, veteran jobs, MOS translator, ASVAB prep, military transition, veteran employment",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Caprica - Your Service. Your Next Mission.",
    description: "From Service to Success, we're with you. The career platform for America's military community.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
