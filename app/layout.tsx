import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const robotoSans = Roboto({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Shooping list",
  description: "Plan your meals for the week effortlessly and generate smart shopping lists with our intuitive Weekly Meal Planner. Fast, fun, and food-friendly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
