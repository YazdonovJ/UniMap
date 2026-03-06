import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Unimap – Your Strategic University Application Platform",
  description:
    "An exclusive platform for international students to strategically plan, organize, and execute their university applications to the world's most selective institutions.",
  icons: {
    icon: "/unimap-logo.png",
    shortcut: "/unimap-logo.png",
    apple: "/unimap-logo.png",
  },
  keywords: [
    "university applications",
    "college admissions",
    "international students",
    "SAT",
    "IELTS",
    "essay writing",
    "college counseling",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${manrope.variable} ${sora.variable} antialiased`}>
        <div className="bg-mesh min-h-screen">{children}</div>
      </body>
    </html>
  );
}
