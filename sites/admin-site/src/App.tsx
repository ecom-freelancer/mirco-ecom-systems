import { ThemeProvider } from '@packages/ds-core';
import { ConfigProvider } from 'antd';
import { allRoutes } from 'configs/router';
import { GlobalProvider } from 'modules/_shared';
import { AuthProvider } from 'modules/auth/provider/AuthProvider';
import React, { Suspense } from 'react';
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

function App() {
  const router = createBrowserRouter(allRoutes as RouteObject[]);

  return (
    <React.Fragment>
      <ThemeProvider>
        <ConfigProvider
          theme={{
            components: {
              Layout: {
                headerBg: '#ffffff',
                siderBg: '#ffffff',
                headerPadding: 0,
              },
              Menu: {
                itemPaddingInline: 20,
                iconSize: 20,
              },
              Table: {
                headerBg: 'transparent',
                fontWeightStrong: 500,
                padding: 12,
              },
            },
          }}
        >
          <Suspense>
            <GlobalProvider>
              <AuthProvider>
                <RouterProvider router={router} />
              </AuthProvider>
            </GlobalProvider>
          </Suspense>
        </ConfigProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
