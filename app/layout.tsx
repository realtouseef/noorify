import { Rubik } from "@next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { cn } from "./lib/utils";

export const metadata: Metadata = {
  title: "noorify",
  description: "Create beautiful images of verses from Quran",
};

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "mx-auto flex h-screen max-w-2xl flex-col items-center justify-center",
          rubik.className,
        )}
      >
        {children}
      </body>
    </html>
  );
}
