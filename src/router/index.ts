import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/home.view.vue';
import Dashboard from '../views/dashboard.view.vue';
import TermsAndConditions from '../views/terms-and-conditions.view.vue';

const routes = [
  { name: 'Home', path: '/', component: Home },
  { name: 'Dashboard', path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { name: 'Terms and conditions', path: '/terms-and-conditions', component: TermsAndConditions }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const userString = localStorage.getItem('user');
    if (!userString) {
      next({ name: 'Home' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
