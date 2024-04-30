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
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const initialOptions = {
  clientId:
    'Afc_YIO3dmMIlTGGL4xjdsj7l6BEuvXtnyrM-E1SLBRTxgtHFZD0J6O_G_KEnzoe4TqtkRDyjlSGVknf',
  currency: 'USD',
  intent: 'capture',
};

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
                <PayPalScriptProvider options={initialOptions}>
                  <RouterProvider router={router} />
                </PayPalScriptProvider>
              </AuthProvider>
            </GlobalProvider>
          </Suspense>
        </ConfigProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
