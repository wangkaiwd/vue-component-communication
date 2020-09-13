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
  },
  {
    path: '/demo-all-props',
    component: () => import('@/views/all-props/demo-all-props'),
    name: '传递所有额外属性'
  },
  {
    path: '/demo-provide-inject',
    component: () => import('@/views/provide-inject/demo-provide-inject'),
    name: '依赖注入'
  },
  {
    path: '/demo-bus',
    component: () => import('@/views/bus/demo-bus'),
    name: '事件总线'
  },
  {
    path: '/demo-extend-proto',
    component: () => import('@/views/extend-proto/demo-extend-proto'),
    name: '分发+广播'
  }
];

const router = new VueRouter({
  routes
});

export default router;
