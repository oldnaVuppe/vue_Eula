import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import Layout from "../layout/index.vue";
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
    // Index
    {
      path: "/",
      name: "Index",
      component: Layout,
      redirect: "/index",
      children: [
        {
          path: "index",
          component: () => import("./../views/index/index.vue"),
        },
      ],
    },
    // Monday
    {
      path: "/Monday",
      name: "Monday",
      component: Layout,
      redirect: "/my",
      children: [
        {
          path: "home",
          component: () => import("./../views/Monday/home/index.vue"),
        },
        {
          path: "todolist",
          component: () => import("./../views/Monday/todolist/index.vue"),
        },
        {
          path: "my",
          component: () => import("./../views/Monday/my/my.vue"),
        },
      ],
    },
    {
      path: "/Tuesday",
      name: "Tuesday",
      component: Layout,
      redirect: "/test1",
      children: [
        {
          path: "test1",
          component: () => import("./../views/Tuesday/test1.vue"),
        },
      ],
    },
    {
      path: "/Wednesday",
      name: "Wednesday",
      component: Layout,
      redirect: "/test1",
      children: [
        {
          path: "test1",
          component: () => import("./../views/Wednesday/test1.vue"),
        },
        {
          path: "vip",
          component: () => import("./../views/Wednesday/vip/index.vue"),
          // redirect: "",
          children: [
            {
              path: "vip1",
              component: () => import("./../views/Wednesday/vip/vip.vue"),
            },
            {
              path: "test",
              component: () => import("./../views/Wednesday/vip/test.vue"),
            }
          ]
        }
      ],
    },
    {
      path: "/Thursday",
      name: "Thursday",
      component: Layout,
      redirect: "/test1",
      children: [
        {
          path: "test1",
          component: () => import("./../views/Thursday/test1.vue"),
        },
      ],
    },
    {
      path: "/Friday",
      name: "Friday",
      component: Layout,
      redirect: "/test1",
      children: [
        {
          path: "test1",
          component: () => import("./../views/Friday/test1.vue"),
        },
      ],
    },
    {
      path: "/Saturday",
      name: "Saturday",
      component: Layout,
      redirect: "/test1",
      children: [
        {
          path: "test1",
          component: () => import("./../views/Saturday/test1.vue"),
        },
      ],
    },
    {
      path: "/Sunday",
      name: "Sunday",
      component: Layout,
      redirect: "/test1",
      children: [
        {
          path: "test1",
          component: () => import("./../views/Sunday/test1.vue"),
        },
      ],
    },
    {
      path: "/Monday",
      redirect: "/Monday/my",
    },
    {
      path: "/Tuesday",
      redirect: "/Monday/my",
    },
    {
      path: "/Wednesday",
      redirect: "/Monday/my",
    },
    {
      path: "/Thursday",
      redirect: "/Monday/my",
    },
    {
      path: "/Friday",
      redirect: "/Monday/my",
    },
    {
      path: "/Saturday",
      redirect: "/Monday/my",
    },
    {
      path: "/Sunday",
      redirect: "/Monday/my",
    },
  ],
});

export default routes;
