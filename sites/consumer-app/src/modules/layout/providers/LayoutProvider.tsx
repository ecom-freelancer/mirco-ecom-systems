import { ReactNode } from 'react';
import EmotionProvider from './EmotionProvider';
import AntdProvider from './AntdProvider';

export const AppLayoutProvider = ({ children }: { children: ReactNode }) => {
  return (
    <EmotionProvider>
      <AntdProvider>{children}</AntdProvider>
    </EmotionProvider>
  );
};
