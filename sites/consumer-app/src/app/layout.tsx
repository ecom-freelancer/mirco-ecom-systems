import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './global.css';
import React from 'react';
import Header from '@/modules/layout/containers/AppHeader';
import { AuthProvider } from '@/modules/auth/AuthProvider';
import { Footer } from '@/modules/layout/components/footer/Footer';
import { AppLayoutProvider } from '@/modules/layout/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hello App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.className} suppressHydrationWarning>
      <body>
        <AppLayoutProvider>
          <AuthProvider>
            <Header />
            {children}
            <Footer />
          </AuthProvider>
        </AppLayoutProvider>
      </body>
    </html>
  );
}
