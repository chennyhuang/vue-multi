import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
// 活动首页
const activityIndex = () => import('./../views/activityIndex.vue');

const pre = 'activityIndex-';
const routes = [
  {
    path: '/activityIndex',
    name: `${pre}activityIndex`,
    component: activityIndex,
    meta: {
	  keepAlive: true,
      title: '活动首页',
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
