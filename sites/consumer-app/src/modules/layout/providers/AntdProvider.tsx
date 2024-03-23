'use client';
import { ReactNode } from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';

export default function AntdProvider({ children }: { children: ReactNode }) {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#fcd116',
            fontFamily: 'Poppins, sans-serif',
            colorText: '#010101',
          },
        }}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
}
