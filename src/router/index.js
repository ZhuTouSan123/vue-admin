import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "shouye",
      component: () => import("pg/Login"),
    },
    {
      path: "/index",
      name: "zhuye",
      redirect: "/index/main",
      component: () => import("pg/Index/Index"),
      children: [
        {
          path: "/index/main",
          name: "zhuneirong",
          component: () => import("pg/side/Main"),
        },
        {
          path: "/index/goodslist",
          name: "商品管理/商品列表",
          component: () => import("pg/side/Goods/Goodslist/Goodslist"),
        },
        {
          path: "/index/stocklist",
          name: "商品管理/商品库存",
          component: () => import("pg/side/Goods/Stocklist"),
        },
        {
          path: "/index/users",
          name: "用户信息",
          component: () => import("pg/side/Users"),
        },
        {
          path: "/index/employees",
          name: "员工管理",
          component: () => import("pg/side/Employees"),
        },
        {
          path: "/index/data",
          name: "数据统计",
          component: () => import("pg/side/Data"),
        },
        {
          path: "/index/system",
          name: "系统设置",
          component: () => import("pg/side/System"),
        },
      ],
    },
  ],
});
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
  } else {
    if (sessionStorage.getItem("vuex")) {
      next();
    } else {
      alert("系统检测到您未登录，请先登录");
      next("/login");
    }
  }
});
export default router;
