/* eslint-disable react-refresh/only-export-components */
import { IRoute } from './types';
import { Navigate, Outlet } from 'react-router';
import React from 'react';
import { routeKeys } from 'configs/constants';
import { MdGridView, MdOutlineDashboard } from 'react-icons/md';

import { NotFoundPage } from 'pages/NotFound';
import { t } from 'configs/i18next';

const WorkspaceProvider = React.lazy(() =>
  import('modules/workspace/WorkspaceProvider').then((module) => ({
    default: module.WorkspaceProvider,
  })),
);

const ProtectedRouterProvider = React.lazy(() =>
  import('modules/auth/provider/ProctectRouterProvider').then((module) => ({
    default: module.ProtectedRouterProvider,
  })),
);

export const workspacesRoutes: IRoute[] = [
  {
    icon: <MdOutlineDashboard />,
    label: t('dashboard'),
    path: routeKeys.dashboard,
    lazy: () =>
      import('pages/Dashboard').then((module) => ({
        Component: module.DashboardPage,
      })),
  },
  {
    path: routeKeys.catalog,
    label: t('catalog'),
    element: <NotFoundPage />,
    defaultOpen: true,
    children: [
      {
        path: routeKeys.products,
        label: t('product'),
      },
    ],
    icon: <MdGridView />,
  },
  {
    path: routeKeys.blogs,
    label: t('Blogs'),

    icon: <MdGridView />,
  },
  {
    path: routeKeys.settings,
    label: t('Settings'),
    icon: <MdGridView />,
  },
  {
    path: routeKeys.orders,
    label: t('Orders'),
    icon: <MdGridView />,
    // icon: MdShoppingCart,
  },
  {
    path: routeKeys.home,
    hiddenOnMenu: true,
    element: <Navigate to="dashboard" replace />,
  },
];

const privateRoutes: IRoute = {
  path: '/',
  element: (
    <ProtectedRouterProvider>
      <Outlet />
    </ProtectedRouterProvider>
  ),
  children: [
    {
      path: '/',
      element: <WorkspaceProvider />,
      children: workspacesRoutes,
    },
  ],
};

const publicRoutes: IRoute[] = [
  {
    path: routeKeys.signin,
    lazy: () =>
      import('pages/SignIn').then((module) => ({
        Component: module.SignInPage,
      })),
  },
  {
    path: routeKeys.notFound,
    lazy: () =>
      import('pages/NotFound').then((module) => ({
        Component: module.NotFoundPage,
      })),
  },
  {
    path: '*',
    element: <Navigate to={routeKeys.notFound} replace />,
  },
];

export const allRoutes: IRoute[] = [...publicRoutes, privateRoutes];
