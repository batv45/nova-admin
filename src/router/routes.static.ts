export const staticRoutes: AppRoute.RowRoute[] = [
  {
    name: 'dashboard',
    path: '/dashboard',
    title: 'Dashboard',
    requiresAuth: true,
    icon: 'icon-park-outline:analysis',
    menuType: 'dir',
    componentPath: null,
    id: 1,
    pid: null,
  },
  {
    name: 'workbench',
    path: '/dashboard/workbench',
    title: 'Workbench',
    requiresAuth: true,
    icon: 'icon-park-outline:alarm',
    pinTab: true,
    menuType: 'page',
    componentPath: '/dashboard/workbench/index.vue',
    id: 2,
    pid: 1,
  },
  {
    name: 'monitor',
    path: '/dashboard/monitor',
    title: 'Monitoring page',
    requiresAuth: true,
    icon: 'icon-park-outline:anchor',
    menuType: 'page',
    componentPath: '/dashboard/monitor/index.vue',
    id: 3,
    pid: 1,
  },
  {
    name: 'contacts',
    path: '/contacts',
    title: 'Cari hesaplar',
    icon: 'tabler:users',
    componentPath: '/demo/userCenter/index.vue',
    id: 39,
    pid: null,
  },

  {
    name: 'invoicePurchases',
    path: '/invoice/purchases',
    title: 'Alış Faturaları',
    icon: 'tabler:arrow-bar-down',
    componentPath: '/demo/userCenter/index.vue',
    id: 23,
    pid: null,
  },
  {
    name: 'invoiceSales',
    path: '/invoice/sales',
    title: 'Satış Faturaları',
    icon: 'tabler:arrow-bar-up',
    componentPath: '/demo/userCenter/index.vue',
    id: 22,
    pid: null,
  },

  {
    name: 'products',
    path: '/products',
    title: 'Ürün ve Hizmetler',
    icon: 'tabler:packages',
    componentPath: '/demo/userCenter/index.vue',
    id: 32,
    pid: null,
  },
  {
    name: 'warehouses',
    path: '/warehouses',
    title: 'Depolar',
    icon: 'tabler:building-cottage',
    componentPath: '/demo/userCenter/index.vue',
    id: 33,
    pid: null,
  },

  {
    name: 'userCenter',
    path: '/userCenter',
    title: 'Personal center',
    requiresAuth: true,
    icon: 'carbon:user-avatar-filled-alt',
    componentPath: '/demo/userCenter/index.vue',
    id: 39,
    hide: true,
    pid: null,
  },
]
