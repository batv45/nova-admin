import type { RouteRecordRaw } from 'vue-router'

/* Some fixed routes in the page, error page, etc. */
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    redirect: '/appRoot',
    children: [
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'), // Note that the file suffix is with the file suffix.vue here
    meta: {
      title: 'Log in',
      withoutTab: true,
    },
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/error/403/index.vue'),
    meta: {
      title: 'Unsecipidium users',
      withoutTab: true,
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404/index.vue'),
    meta: {
      title: 'Can\'t find a page',
      icon: 'icon-park-outline:ghost',
      withoutTab: true,
    },
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/views/error/500/index.vue'),
    meta: {
      title: 'Server Error',
      icon: 'icon-park-outline:close-wifi',
      withoutTab: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404/index.vue'),
    name: '404',
    meta: {
      title: 'Can\'t find a page',
      icon: 'icon-park-outline:ghost',
      withoutTab: true,
    },
  },

]
