// 1. 引入mockjs
import Mock from "mockjs";
Mock.setup({
  timeout: "100-200", // 设置相应时间
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
        path: null,
        children: [
          {
            id: 2,
            authName: "用户列表",
            path: "users",
            children: [],
          },
        ],
      },
      {
        id: 3,
        authName: "权限管理",
        path: null,
        children: [
          {
            id: 4,
            authName: "角色列表",
            path: "roles",
            children: [],
          },
          {
            id: 5,
            authName: "权限列表",
            path: "rights",
            children: [],
          },
        ],
      },
      {
        id: 6,
        authName: "商品管理",
        path: null,
        children: [
          {
            id: 7,
            authName: "商品列表",
            path: "goods",
            children: [],
          },
          {
            id: 8,
            authName: "分类参数",
            path: "params",
            children: [],
          },
          {
            id: 9,
            authName: "商品分类",
            path: "categories",
            children: [],
          },
        ],
      },
      {
        id: 10,
        authName: "订单管理",
        path: null,
        children: [
          {
            id: 11,
            authName: "订单列表",
            path: "orders",
            children: [],
          },
        ],
      },
      {
        id: 12,
        authName: "数据统计",
        path: null,
        children: [
          {
            id: 13,
            authName: "数据报表",
            path: "reports",
            children: [],
          },
        ],
      },
    ],
  };
});
