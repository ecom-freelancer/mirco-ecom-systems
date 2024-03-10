import { ThemeProvider } from '@packages/ds-core';
import { ConfigProvider } from 'antd';
import { allRoutes } from 'configs/router';
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
              },
              Menu: {
                itemPaddingInline: 20,
                iconSize: 20,
              },
            },
          }}
        >
          <Suspense>
            <RouterProvider router={router} />
          </Suspense>
        </ConfigProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
