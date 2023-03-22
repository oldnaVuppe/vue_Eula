import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";

const routes = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      redirect: "/404",
    },
    {
      path: "/404",
      name: "404",
      component: () => import("./../views/404.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("./../views/login/index.vue"),
    },
    {
      path: "/my",
      name: "My",
      component: () => import("./../views/home/index.vue"),
    },
    {
      path: "/",
      name: "/Layout",
      redirect: "/home",
      component: () => import("./../layout/index.vue"),
      children: [
        {
          path: "home",
          component: () => import("./../views/home/index.vue"),
        },
        {
          path: "todolist",
          component: () => import("./../views/todolist/index.vue"),
        },
      ],
    },
  ],
});

export default routes;
