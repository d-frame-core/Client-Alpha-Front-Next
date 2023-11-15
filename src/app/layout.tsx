/** @format */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppContextProvider } from '@/context/context';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'D Frame - Client Dashboard',
  description:
    'Join D Frame for the Universal Basic Income (UBI) revolution on Blockchain',
  keywords: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AppContextProvider>{children}</AppContextProvider>
      </body>
    </html>
  );
}
