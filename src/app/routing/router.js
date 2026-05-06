import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/home-page'),
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('@/pages/favorite-page'),
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import('@/pages/product-page'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFoundPage',
    component: () => import('@/pages/not-found-page'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
