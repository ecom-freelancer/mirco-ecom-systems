export const routeKeys = {
  home: '/',
  signin: '/login',
  dashboard: '/dashboard',
  notFound: '/404',

  /**
   * start of catalog
   */
  catalog: '/catalog',
  products: '/catalog/products',
  category: '/catalog/category',
  importProducts: '/catalog/import-products',
  createProduct: '/catalog/create-product',
  productDetail: '/catalog/products/:id',
  productDetailEdit: '/catalog/products/:id/edit',
  productDetailVariants: '/catalog/products/:id/variants',
  productDetailInventory: '/catalog/products/:id/inventory',

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
