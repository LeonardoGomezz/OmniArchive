import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import QueryProvider from "./QueryProvider";
import OnmiArchiveSidebar from "@/components/OmniArchiveSidebar";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "OmniArchive | Citadel Intelligence Terminal",
  description:
    "Plataforma de análisis y auditoría de datos multiversales basada en la Rick and Morty API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={cn("font-sans", geistSans.variable)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <div className="min-h-screen bg-background relative">
            {/* Scanline overlay */}
            <div className="scanline-overlay" />
            <OnmiArchiveSidebar />
            <div className="ml-56 min-h-screen flex flex-col">
              <main className="flex-1">{children}</main>
            </div>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
