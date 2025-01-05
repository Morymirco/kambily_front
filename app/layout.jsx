
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from 'react';
import MainLayout from '@/app/layouts/MainLayout';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});




export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}