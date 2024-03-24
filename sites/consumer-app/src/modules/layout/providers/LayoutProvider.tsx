'use client';

import { ReactNode } from 'react';
import EmotionProvider from './EmotionProvider';
import AntdProvider from './AntdProvider';
import dynamic from 'next/dynamic';

const Toaster = dynamic(() =>
  import('react-hot-toast').then((mod) => mod.Toaster),
);

export const AppLayoutProvider = ({ children }: { children: ReactNode }) => {
  return (
    <EmotionProvider>
      <AntdProvider>{children}</AntdProvider>
      <Toaster
        toastOptions={{
          position: 'top-center',
        }}
      />
    </EmotionProvider>
  );
};
