// 1. 引入mockjs
import Mock from "mockjs";
Mock.setup({
  timeout: "0", // 设置相应时间
});
// 2. 引入mock数据
Mock.mock("http://www.ashen.ink:10500/menu", (res) => {
  return {
    code: 200,
    message: "获取菜单成功",
    data: [
      {
        id: 1,
        authName: "用户管理",
        order: 1,
        path: "users",
        icon: "<svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\" data-v-ea893728=\"\"><path fill=\"currentColor\" d=\"M399.5 849.5a225 225 0 1 0 0-450 225 225 0 0 0 0 450zm0 56.25a281.25 281.25 0 1 1 0-562.5 281.25 281.25 0 0 1 0 562.5zm253.125-787.5h225q28.125 0 28.125 28.125T877.625 174.5h-225q-28.125 0-28.125-28.125t28.125-28.125z\"></path><path fill=\"currentColor\" d=\"M877.625 118.25q28.125 0 28.125 28.125v225q0 28.125-28.125 28.125T849.5 371.375v-225q0-28.125 28.125-28.125z\"></path><path fill=\"currentColor\" d=\"M604.813 458.9 565.1 419.131l292.613-292.668 39.825 39.824z\"></path></svg>",
        children: [
          {
            id: 11,
            authName: "用户列表",
            order: 11,
            path: "users",
            children: [
              {
                id: 111,
                authName: "用户列表111",
                order: 111,
                path: "users",
                children: [],
              }
            ],
          },
          {
            id: 12,
            authName: "添加用户",
            order: 12,
            path: "users/add",
            children: [],
          }
        ]
      },
      {
        id: 2,
        authName: "权限管理",
        order: 2,
        path: "rights",
        children: [
          {
            id: 21,
            authName: "角色列表",
            order: 21,
            path: "roles",
            children: [],
          }
        ]
      },
      {
        id: 3,
        authName: "商品管理",
        order: 3,
        path: "goods",
        children: [
          {
            id: 31,
            authName: "商品列表",
            order: 31,
            path: "goods",
            children: [],
          }
        ]
      },
      {
        id: 4,
        authName: "订单管理",
        order: 4,
        path: "orders",
        children: [
          {
            id: 41,
            authName: "订单列表",
            order: 41,
            path: "orders",
            children: [],
          }
        ]
      },
      {
        id: 5,
        authName: "数据统计",
        order: 5,
        path: "reports",
        children: [
          {
            id: 51,
            authName: "数据报表",
            order: 51,
            path: "reports",
            children: [
              {
                id: 511,
                authName: "数据报表111",
                order: 511,
                path: "reports",
                children: [],
              }
            ],
          }
        ]
      }
    ],
  };
});
