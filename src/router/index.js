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
    path: '/demo-custom-events',
    component: () => import('@/views/custom-event/demo-custom-event'),
    name: '自定义事件'
  },
  {
    path: '/demo-twoway',
    component: () => import('@/views/bind-two-way/demo-two-way'),
    name: '双向绑定'
  },
  {
    path: '/demo-access-instance',
    component: () => import('@/views/access-instance/demo-access-instance'),
    name: '访问实例'
  }
];

const router = new VueRouter({
  routes
});

export default router;
