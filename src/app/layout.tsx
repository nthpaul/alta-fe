import "./globals.css";
import BottomNavBar from "@/components/layout/bottom-navbar";
import type { Metadata } from "next";
import ThemeProvider from "@/components/theme/theme-provider";
import React from "react";

export const metadata: Metadata = {
  description: "Never run out of outfit ideas again.",
  title: "Alta Daily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-alta-black">
        <ThemeProvider>
          <div className="w-full flex justify-center">
            <div className="w-full max-w-3xl min-h-screen px-6">
              {children}
              <BottomNavBar />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
