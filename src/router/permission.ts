// 配置路由守卫
// 1. 导入路由实例
import router from "./index.js";

router.beforeEach((to, from, next) => {
  // 设置白名单
  if (["/login", "/404"].includes(to.path)) {
    return next();
  }
  // 判断是否登录
  if (localStorage.getItem("vue_lol")) {
    // 判断是否是登录页
    if (to.path === "/login") {
      next("/index");
      // 如果to是登录页，跳转到首页
    } else {
      // 如果不是登录页，判断是否有权限
      const vue_lol = localStorage.getItem("vue_lol");
      if (!vue_lol) {
        // 如果没有权限，跳转到登录页
        next("/login");
      } else {
        // 如果有权限，放行
        next();
      }
      // next(); // 不知道可以直接放行（后面再说）
    }
  } else {
    // 如果没有登录，判断是否是登录页
    if (to.path === "/login") {
      // 如果是登录页，放行
      next();
    } else {
      // 如果不是登录页，跳转到登录页
      next("/login");
    }
  }
});

router.afterEach((to, from) => {
  // console.log("后置钩子", to, from);
});
