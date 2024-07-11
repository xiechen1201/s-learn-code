import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/my-vue-app',
    name: 'MyVueApp',
    component: Home
  }
];

const router = createRouter({
  base: window.__POWERED_BY_QIANKUN__ ? '/app-vue/' : '/',
  history: createWebHistory(),
  routes
});

export default router;
