import { IRoute } from './types';
import { Navigate, Outlet } from 'react-router';
import { routeKeys } from 'configs/constants';
import { MdGridView, MdOutlineDashboard } from 'react-icons/md';

import { t } from 'configs/i18next';

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
        lazy: () =>
          import('pages/product/ListProductPage').then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: routeKeys.productDetail,
        hiddenOnMenu: true,
        lazy: () =>
          import('pages/product/product-detail/ProductDetailPage').then(
            (module) => ({
              Component: module.default,
            }),
          ),
      },
      {
        path: routeKeys.createProduct,
        label: t('addProduct'),
        lazy: () =>
          import('pages/product/AddProductPage').then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: routeKeys.category,
        label: t('categories'),
        lazy: () =>
          import('pages/product/CategoryListPage').then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: routeKeys.categoryAdd,
        label: t('categoryAdd'),
        lazy: () =>
          import('pages/product/CategoryAddPage').then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: routeKeys.categoryDetails,
        label: t('categoryDetail'),
        lazy: () =>
          import('pages/product/CategoryDetailPage').then((module) => ({
            Component: module.default,
          })),
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
  },
  {
    path: routeKeys.home,
    hiddenOnMenu: true,
    element: <Navigate to="dashboard" replace />,
  },
];

const privateRoutes: IRoute = {
  path: '/',
  lazy: () =>
    import('modules/auth/provider/ProtectRouterProvider').then((module) => ({
      Component: module.ProtectedRouterProvider,
    })),
  children: [
    {
      path: '/',
      lazy: () =>
        import('modules/workspace/WorkspaceProvider').then((module) => ({
          Component: module.WorkspaceProvider,
        })),
      children: workspacesRoutes,
    },
  ],
};

const publicRoutes: IRoute[] = [
  {
    path: routeKeys.signIn,
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
