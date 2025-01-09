import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/home.view.vue';
import Dashboard from '../views/dashboard.view.vue';
import Products from '../views/products.view.vue';
import TermsAndConditions from '../views/terms-and-conditions.view.vue';

import { useCurrentUser } from '../composables';

const routes = [
  { name: 'Home', path: '/', component: Home },
  {
    name: 'Dashboard',
    path: '/dashboard/:index?',
    component: Dashboard,
    meta: { requiresAuth: true },
    props: true
  },
  { name: 'Products', path: '/products/:category?', component: Products },
  { name: 'Terms and conditions', path: '/terms-and-conditions', component: TermsAndConditions }
];

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
