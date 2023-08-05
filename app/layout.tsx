import { Rubik } from "@next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { cn } from "./lib/utils";
import { Navbar } from "./components";

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
          "mx-auto flex flex-col items-center justify-center",
          rubik.className,
        )}
      >
        <Navbar />

        <main>{children}</main>
      </body>
    </html>
  );
}
