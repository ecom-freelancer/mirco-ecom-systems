export const routeKeys = {
  home: '/',
  signin: '/login',
  dashboard: '/dashboard',
  notFound: '/404',

  /**
   * start of catalog
   */
  products: '/products',
  category: '/products/categories',
  importProducts: '/products/import',
  createProduct: '/products/create-a-product',
  productDetail: '/products/:id',
  productDetailEdit: '/products/:id/edit',
  productDetailVariants: '/products/:id/variants',
  productDetailInventory: '/products/:id/inventory',

  /**
   * end of catalog
   */
  blogs: '/blogs',
  settings: '/settings',
  orders: '/orders',
  customers: '/customers',
  inventory: '/inventory',
  reports: '/reports',
};

export const dynamicRouteKeys = {
  /**
   * start of catalog
   */
  productDetail: (id: string) => routeKeys.productDetail.replace(':id', id),
  /**
   * end of catalog
   */
};
