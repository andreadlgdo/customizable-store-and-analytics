// import Library from '../views/library.view.vue';
import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/home.view.vue';
import Dashboard from '../views/dashboard.view.vue';

const routes = [
  { name: 'Home', path: '/', component: Home },
  { name: 'Dashboard', path: '/dashboard', component: Dashboard }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
