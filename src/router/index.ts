// import Library from '../views/library.view.vue';
import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/home.view.vue';
import Dashboard from '../views/dashboard.view.vue';

const routes = [
  { name: 'Home', path: '/', component: Home },
  { name: 'Dashboard', path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } }
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
