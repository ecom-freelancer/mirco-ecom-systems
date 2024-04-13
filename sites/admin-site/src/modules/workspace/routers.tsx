/* eslint-disable react-refresh/only-export-components */
import { routeKeys } from 'configs/constants';
import { IRoute } from 'configs/router';
import { t } from 'i18next';
import React from 'react';
import { MdOutlineDashboard, MdGridView } from 'react-icons/md';
import { Outlet, Navigate } from 'react-router';

const ProductListPage = React.lazy(
  () => import('pages/product/ProductListPage.tsx'),
);

const CreateProductPage = React.lazy(
  () => import('pages/product/AddProductPage'),
);

const CategoryListPage = React.lazy(
  () => import('pages/product/CategoryListPage'),
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
        element: <ProductListPage />,
      },
      {
        path: routeKeys.createProduct,
        label: t('addProduct'),
        element: <CreateProductPage />,
      },
      {
        path: routeKeys.category,
        label: t('categories'),
        element: <CategoryListPage />,
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
