import { ThemeProvider } from '@/components/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Stream Line',
  description: 'Streaming platform for gamers and creators.',
};

export default function RootLayout({ children }: Children) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang='en'>
        <body className={inter.className}>
          <ThemeProvider attribute='class' defaultTheme='dark' storageKey='streamline-theme'>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
