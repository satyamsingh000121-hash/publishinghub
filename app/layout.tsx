import React from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Publishing — Books That Inspire | Premium Dark Bookstore",
  description: "Discover timeless classics, modern bestsellers, and inspiring literature at The Publishing. Curated editions, special offers, and author spotlights.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#050807] text-[#f2eee3] font-sans antialiased min-h-screen selection:bg-[#b89245] selection:text-[#050807]">
        {children}
      </body>
    </html>
  );
}
