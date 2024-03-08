export const routeKeys = {
  home: '/',
  login: '/login',
  dashboard: '/dashboard',
  notFound: '/404',
};

export const dynamicRouteKeys = {
  productDetail: (id: string) => `/product/${id}`,
};
