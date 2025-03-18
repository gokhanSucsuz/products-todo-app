import type { Metadata } from "next";
import { Geist, Geist_Mono, Yeseva_One } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const yesevaOne = Yeseva_One({
  variable: "--font-yeseva-one",
  subsets: ["latin"],
  weight: "400",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Products Todo App",
  description: "Todo app for products",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${yesevaOne.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <Toaster position="bottom-right" />
        {children}
      </body>
    </html>
  );
}
