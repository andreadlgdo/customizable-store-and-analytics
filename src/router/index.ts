import { createRouter, createWebHistory } from 'vue-router';

// Public pages
import Home from '../views/home.view.vue';
import Products from '../views/products.view.vue';
import TermsAndConditions from '../views/terms-and-conditions.view.vue';
import OrderCheckout from '../views/order-checkout.view.vue';

// Dashboard pages
import PersonalData from '../views/dashboard/personal-data.view.vue';
import ProductsManagement from '../views/dashboard/products-management.view.vue';
import OrdersManagement from '../views/dashboard/orders-management.view.vue';
import UsersManagement from '../views/dashboard/users-management.view.vue';
import Personalization from '../views/dashboard/personalization.view.vue';
import UserCart from '../views/dashboard/user-cart.view.vue';
import Analytics from '../views/dashboard/analytics.view.vue';
import UserWhistList from '../views/dashboard/user-whist-list.view.vue';

import { useCurrentUser } from '../composables';

// Public routes
const publicRoutes = [
  { name: 'Home', path: '/', component: Home },
  { name: 'Products', path: '/products/:category?', component: Products },
  { name: 'Orders', path: '/order', component: OrderCheckout },
  { name: 'Terms and conditions', path: '/terms-and-conditions', component: TermsAndConditions }
];

// Dashboard routes (require authentication)
const dashboardRoutes = [
  {
    name: 'PersonalData',
    path: '/dashboard/personalData',
    component: PersonalData,
    meta: { requiresAuth: true },
    props: true
  },
  {
    name: 'UserCart',
    path: '/dashboard/cart',
    component: UserCart,
    meta: { requiresAuth: true },
    props: true
  },
  {
    name: 'UserWhistList',
    path: '/dashboard/whistList',
    component: UserWhistList,
    meta: { requiresAuth: true },
    props: true
  },
  {
    name: 'ProductsManagement',
    path: '/dashboard/products/:action?/:itemId?',
    component: ProductsManagement,
    meta: { requiresAuth: true },
    props: true
  },
  {
    name: 'OrdersManagement',
    path: '/dashboard/orders/:itemId?',
    component: OrdersManagement,
    meta: { requiresAuth: true },
    props: true
  },
  {
    name: 'UsersManagement',
    path: '/dashboard/users/:action?/:itemId?',
    component: UsersManagement,
    meta: { requiresAuth: true },
    props: true
  },
  {
    name: 'Personalization',
    path: '/dashboard/personalization/:action?',
    component: Personalization,
    meta: { requiresAuth: true },
    props: true
  },
  {
    name: 'Analytics',
    path: '/dashboard/analytics',
    component: Analytics,
    meta: { requiresAuth: true },
    props: true
  }
];

const routes = [...publicRoutes, ...dashboardRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const { user } = useCurrentUser();
    if (!user.value) {
      next({ name: 'Home' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
