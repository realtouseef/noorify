import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Versify",
  description: "Create beautiful images from verses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="mx-auto flex h-screen max-w-2xl flex-col items-center justify-center">
        {children}
      </body>
    </html>
  );
}
