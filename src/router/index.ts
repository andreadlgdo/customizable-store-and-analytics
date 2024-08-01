// import Library from '../views/library.view.vue';
import Home from '../views/home.view.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [{ name: 'Home', path: '/', component: Home }];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
