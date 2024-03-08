import { ThemeProvider } from '@emotion/react';
import { ConfigProvider } from 'antd';
import { allRoutes } from 'configs/router';
import { theme } from 'configs/theme';
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
      <ConfigProvider>
        <ThemeProvider theme={theme}>
          <Suspense>
            <RouterProvider router={router} />
          </Suspense>
        </ThemeProvider>
      </ConfigProvider>
    </React.Fragment>
  );
}

export default App;
