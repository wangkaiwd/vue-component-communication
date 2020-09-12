import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/demo-props',
    component: () => import('@/views/props/demo-props'),
    name: 'props'
  },
  {
    path: '/demo-twoway',
    component: () => import('@/views/bind-two-way/demo-two-way'),
    name: '双向绑定'
  }
];

const router = new VueRouter({
  routes
});

export default router;
