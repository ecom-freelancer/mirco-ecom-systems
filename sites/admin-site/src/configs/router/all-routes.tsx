/* eslint-disable react-refresh/only-export-components */
import { IRoute } from './types';
import { Navigate, Outlet } from 'react-router';
import React from 'react';
import { routeKeys } from 'configs/constants';

const WorkspaceProvider = React.lazy(() =>
  import('modules/workspace/WorkspaceProvider').then((module) => ({
    default: module.WorkspaceProvider,
  })),
);

const AuthProvider = React.lazy(() =>
  import('modules/auth/provider/AuthProvider').then((module) => ({
    default: module.AuthProvider,
  })),
);

const workspacesRoutes: IRoute[] = [
  {
    path: routeKeys.dashboard,
    lazy: () =>
      import('pages/Dashboard').then((module) => ({
        Component: module.DashboardPage,
      })),
  },
  {
    path: routeKeys.home,
    element: <Navigate to="dashboard" replace />,
  },
];

const privateRoutes: IRoute[] = [
  {
    path: '/',
    element: <WorkspaceProvider />,
    children: workspacesRoutes,
  },
];

const publicRoutes: IRoute[] = [
  {
    path: routeKeys.login,
    lazy: () =>
      import('pages/Login').then((module) => ({ Component: module.LoginPage })),
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

export const allRoutes: IRoute[] = [
  ...publicRoutes,
  {
    path: '/',
    element: (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    children: privateRoutes,
  },
];
