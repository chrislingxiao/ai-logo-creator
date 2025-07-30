import type { Metadata } from 'next';
import { Comic_Neue } from 'next/font/google';
import './globals.css';
import Provider from './provider';
import { ClerkProvider } from '@clerk/nextjs';
import Toaster from '@/components/ui/toaster';

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const comicNeue = Comic_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: true,
  preload: true,
});

export const metadata: Metadata = {
  title: 'Create your logo',
  description: 'Generated logo using AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={`${comicNeue.className}`}>
          <Provider>{children}</Provider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
