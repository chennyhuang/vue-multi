import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
// 打折首页
const discountsIndex = () => import('./../views/discountsIndex.vue');

const pre = 'discountsIndex-';
const routes = [
  {
    path: '/discountsIndex',
    name: `${pre}discountsIndex`,
    component: discountsIndex,
    meta: {
	  keepAlive: true,
      title: '打折首页',
    },
  },
];

const router = new VueRouter({
  routes,
});
// 记录首路由
let flag = true;
router.beforeEach((to, from, next) => {
  if (flag) {
    Vue.prototype.homeRoute = to.path;
    flag = false;
  }
  next();
});

export default router;
