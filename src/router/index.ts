import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ShopView from '../views/ShopView.vue';
import ProductDetailView from '../views/ProductDetailView.vue';
import CustomRequestsView from '../views/CustomRequestsView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/shop',
      name: 'shop',
      component: ShopView,
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: ProductDetailView,
    },
    {
      path: '/requests',
      name: 'custom-requests',
      component: CustomRequestsView,
    },
  ],
});

export default router;
