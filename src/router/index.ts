import { createRouter, createWebHistory } from 'vue-router';

// Public pages
import AboutUs from '../views/about-us.view.vue';
import ContactUs from '../views/contact-us.view.vue';
import Home from '../views/app-home.view.vue';
import ProductsLayout from '../views/products/products-layout.view.vue';
import ProductDetails from '../views/products/product-details.view.vue';
import QuestionsAndAnswers from '../views/questions-and-answers.view.vue';
import TermsAndConditions from '../views/terms-and-conditions.view.vue';
import OrderCheckout from '../views/order-checkout.view.vue';
import ShippingPolicy from '../views/shipping-policy.view.vue';
import ReturnPolicy from '../views/return-policy.view.vue';
import PrivacyPolicy from '../views/privacy-policy.view.vue';

// Dashboard pages
import PersonalData from '../views/dashboard/personal-data.view.vue';
import ProductsManagement from '../views/dashboard/products-management.view.vue';
import OrdersManagement from '../views/dashboard/orders-management.view.vue';
import UsersManagement from '../views/dashboard/users-management.view.vue';
import Personalization from '../views/dashboard/personalization-dashboard.view.vue';
import UserCart from '../views/dashboard/user-cart.view.vue';
import Analytics from '../views/dashboard/analytics-dashboard.view.vue';
import UserWhistList from '../views/dashboard/user-whist-list.view.vue';

import { useUsers } from '../composables';

// Public routes
const publicRoutes = [
  { name: 'Home', path: '/', component: Home },
  { name: 'Products', path: '/products/:category?', component: ProductsLayout },
  { name: 'ProductDetails', path: '/products/:category?/:productId', component: ProductDetails },
  { name: 'Contact', path: '/contact', component: ContactUs },
  { name: 'About', path: '/about', component: AboutUs },
  { name: 'Orders', path: '/order', component: OrderCheckout },
  { name: 'Questions and answers', path: '/faq', component: QuestionsAndAnswers },
  { name: 'Terms and conditions', path: '/terms-and-conditions', component: TermsAndConditions },
  { name: 'Shipping policy', path: '/shipping-policy', component: ShippingPolicy },
  { name: 'Return policy', path: '/return-policy', component: ReturnPolicy },
  { name: 'Privacy policy', path: '/privacy-policy', component: PrivacyPolicy }
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
    path: '/dashboard/analytics/:action?',
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
    const { user } = useUsers();
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
