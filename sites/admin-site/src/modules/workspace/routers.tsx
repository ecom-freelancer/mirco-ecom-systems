/* eslint-disable react-refresh/only-export-components */
import { routeKeys } from 'configs/constants';
import { IRoute } from 'configs/router';
import { t } from 'i18next';
import React from 'react';
import { MdOutlineDashboard, MdGridView } from 'react-icons/md';
import { Outlet, Navigate } from 'react-router';

const ListProductPage = React.lazy(
  () => import('pages/product/ListProductPage'),
);

const CreateProductPage = React.lazy(
  () => import('pages/product/AddProductPage'),
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
    path: routeKeys.products,
    label: t('products'),
    element: <Outlet />,
    defaultOpen: true,
    children: [
      {
        path: routeKeys.products,
        index: true,
        label: t('productList'),
        element: <ListProductPage />,
      },
      {
        path: routeKeys.createProduct,
        label: t('addProduct'),
        element: <CreateProductPage />,
      },
      {
        path: routeKeys.category,
        label: t('categories'),
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