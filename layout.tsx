import type { Metadata } from "next";
import { Cairo, Tajawal } from "next/font/google"; // Use next/font for optimization
import "./globals.css"; // Assuming global styles are in globals.css
import Header from "@/components/Header"; // Using alias @/
import Footer from "@/components/Footer";

// Configure fonts
const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo", // CSS variable for body font
  weight: ["400", "700"],
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  variable: "--font-tajawal", // CSS variable for heading font
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "ركن المهندس",
  description: "خدمات أكاديمية واحترافية للطلبة والأساتذة",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} ${tajawal.variable} font-sans flex flex-col min-h-screen bg-white text-gray-800`}>
        <Header />
        <main className="flex-grow container mx-auto px-6 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

