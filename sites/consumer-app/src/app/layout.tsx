import type { Metadata } from 'next';
import './global.css';
import React from 'react';
import { AuthProvider } from '@/modules/auth/AuthProvider';
import { AppLayoutProvider } from '@/modules/layout/providers';
import { AppFooter, AppHeader } from '@/modules/layout/containers';
import { MainContent } from '@/modules/layout/components';

import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  manifest: '/manifest.json',
  icons: ['favicon.ico', 'favicon-16x16.png', 'favicon-32x32.png'],
  title: {
    default: 'E-commerce',
    template: `%s | E-commerce`,
  },
  description: "The world's largest selection of products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${poppins.variable}`} suppressHydrationWarning>
      <head></head>
      <body>
        <AppLayoutProvider>
          <AuthProvider>
            <AppHeader />
            <MainContent>{children}</MainContent>
            <AppFooter />
          </AuthProvider>
        </AppLayoutProvider>
      </body>
    </html>
  );
}
