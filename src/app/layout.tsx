import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { NextThemeProvider } from "./ThemeProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notion",
  description: "The First app on next js by me",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>{children}</NextThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
