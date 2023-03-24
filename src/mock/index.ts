// 1. 引入mockjs
import Mock from "mockjs";
// 引入其他的mock文件
import "./menu.ts";
Mock.setup({
  timeout: "0", // 设置相应时间
});
// 2. 引入mock数据
Mock.mock("http://localhost:10500/api/login",({ body, ...data }): {
    code: number;
    message: string;
    token: string;
} => {
    // q: 解析请求参数?
    // console.log(data);
    const res = JSON.parse(body);
    if (res.username === "18384518552" && res.password === "990223") {
      return {
        code: 200,
        message: "登录成功",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImlhdCI6MTY3NTQ4NTQ5NiwiZXhwIjoxNzA2NTg5NDk2fQ.Cu_kUglKVRmL0nUe661X1T0Gi7L3dJI6SikCpTLw5ZI",
      };
    } else {
      return {
        code: 500,
        message: "用户名或密码错误",
        token: "",
      };
    }
  }
);
