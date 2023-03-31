# Vue 3 + Vite

杨尤明

## Setup

## TypeScript的项目配置

```tsx
// 无
【https://juejin.cn/post/7079785777692934174#heading-0】
```

## 配置nginx

```tsx
https://www.runoob.com/linux/nginx-install-setup.html
```

### eslint配置

```jsx
npm install --save-install eslint
npx eslint --init
```

### 使用element Plus

```jsx
// NPM
npm install element-plus --save
// Yarn
yarn add element-plus
// pnpm
pnpm install element-plus
// 使用
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
.use(ElementPlus)
```

### npm ERR

```jsx
// 这意味着你有依赖冲突。因此，请尝试一一运行以下选项。
// 1. 删除node_modules然后package-lock.json运行
npm install
// 2. 或者尝试清除 npm 缓存
npm cache clean --force
// 3. --legacy-peer-deps或者使用选项运行命令
npm install --legacy-peer-deps
// 4. --force或者使用选项运行命令
npm install --force
```

### 使用scss

```jsx
npm install sass --save-dev
```

### 路由配置

```jsx

```

### 创建登录页面

```jsx
// views/login/index.vue
// 生成表单，进行表单验证
const rules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 11, max: 11, message: '用户名为18384518552', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur', },
        { min: 6, max: 6, message: '密码为990223', trigger: 'blur' }
    ]
});

// 创建request.js 请求相应器/请求拦截器，导出
loginrequest.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        // console.log(response);
        if (response.data.code === 200) {
            // 登录成功
            ElMessage.success(response.data.message);
            console.log('token',response.config.data);
            // 1. 将token存储到本地
            localStorage.setItem("vue_lol", response.config.data);
            // 2. 将用户信息存储到本地，暂时不用
            // localStorage.setItem("userInfo", JSON.stringify(response.data.userInfo));
        } else {
            // 登录失败
            ElMessage.error(response.data.message);
            return Promise.reject(new Error(response.data.message));
        }
        return response;
    }
);

// 设置相应的
// 创建登录的api，导入request，设置登录接口

// 发现没有接口，自己mock登录接口
// 1、安装mockjs
// 2、在mock.js 引入mock
import Mock from "mockjs";
Mock.setup({
    timeout: '300-400'  // 设置相应时间
});
// 直接导出一个 Mock.mock() ，有两个参数，第一个是url，用来匹配请求baseUrl和请求中的uel => baseUrl+url
// 第二个参数是回调，它能够拿到请求传过来的值，这个值是一个JSON对象。在回调里面可以做一些操作，然后return一个数据回去，这个请求就可以拿到这个数据了
export default Mock.mock('http://localhost:10500/api/login', ({body }) => {
    const res = JSON.parse(body);
    if (res.username === '18384518552' && res.password === '990223') {
        return {
            code: 200,
            message: '登录成功'
        };
    } else {
        return {
            code: 400,
            message: '用户名或密码错误'
        };
    }
});

// 在接口处
import { login } from './../../api/login.js';
const res = await login({ username: form.username, password: form.password });
// 做登录判断
// 登录成功后进行路由跳转
import router from './../router';
// router.push('/home');
router.replase('/home');

// 路由跳转：push与replace有哪些区别？
// replace不会向history插入记录，而push会向history插入
// push 跳转到对应的路由，这个方法会向history栈添加一个记录，点击后退会返回到上一个页面。
// replace同样是跳转到指定的路由，但是这个方法不会向history里面添加新的记录，而是替换（覆盖）掉当前路由，点击返回，会跳转到上上一个页面。
/* 
query 传参配置的是path，而params传参配置的是name，在params中配置path无效
query在路由配置不需要设置参数，而params必须设置
query传递的参数会显示在地址栏中
params传参刷新会无效，但是query会保存传递过来的值，刷新不变
*/
```

## git的问题

```jsx
ssh: connect to host github.com port 22: Connection refused
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
// 看不懂的问题，我觉得我没有问题，就是网络的问题。
// fuck git
// 解决：
// 修改ssh的config，加入443端口。22端口难道和我的服务器端口冲突了？不会吧，服务器端口是80？？？
Host github.com
  Hostname ssh.github.com
  Port 443

// git pull 拉下来了，修改好了却不能提交，使用强制提交
git push origin main -f
```

## 路由守卫

```jsx
// 1. 导入路由

// main.js引入路由守卫
import "./router/permission";
router.beforeEach((to, from, next) => {
  // 设置白名单
  if (["/login", "/404"].includes(to.path)) {
    return next();
  }
  // 判断是否登录
  if (localStorage.getItem("vue_lol")) {
    // 判断是否是登录页
    if (to.path === "/login") {
      next("/home");
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

// 设置404页面
// 配置路由
{
    path: '/404',
    name: '404',
    component: () => import('./../views/404.vue'),
}, {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
}
// 找不到就重定向到404页面
```

## 按需导入element plus

```tsx
[element plus](https://element-plus.org/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5)
```

## 禁止选中内容

```tsx
@selectstart="($event: Event) => $event.preventDefault()"
// 禁止鼠标右键 οncοntextmenu="return false"
// 禁止选择 onselectstart="return false"
// 禁止拖放 οndragstart="return false"
// 禁止拷贝 οncοpy=document.selection.empty()
// 禁止复制 oncopy = "return false"
// 禁止粘贴 <input type=text οnpaste="return false">
// 禁止剪贴 oncut = "return false"

// mousover直接用@绑在标签上，解绑时不能解绑？？？
const mouseover = (e: Event) => {
    console.log('进入', e);
    setTimeout(() => {
        document.querySelector('.el-card')?.removeEventListener('mouseover', mouseover);
        showElTooltip.value = true;
    }, 2500);
}
onMounted(() => {
    document.querySelector('.el-card')?.addEventListener('mouseover', mouseover);
})
// 这样就可以解绑
```

## 打包失败

```tsx
js emit is not supported

C:\Users\ppe\Desktop\Eula\node_modules\vue-tsc\bin\vue-tsc.js:43
                        throw err;
                        ^
js emit is not supported
(Use `node --trace-uncaught ...` to show where the exception was thrown)

Node.js v18.14.1

"build": "vue-tsc && vite build",
// 改成
"build": "vue-tsc --noEmit --skipLibCheck && vite build",
```

## layout 布局

```tsx
// 使用侧边栏，layout/menus/index.vue

```

## 半路使用Ant Design Vue

```tsx
[https://antdv.com/docs/vue/introduce-cn]
npm install ant-design-vue --save
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
use(Antd)
// 使用icon
npm install --save @ant-design/icons-vue
```

## electron 使用

```tsx
https://blog.csdn.net/qq1195566313/article/details/126063804?spm=1001.2014.3001.5501
npm i electron -D
npm install vite-plugin-electron -D

// 第一种
vite.config.ts
import electron from "vite-plugin-electron";
plugins: [vue(),
    electron({
      entry: "electron/index.ts",
    }),
    ...
// 根目录
electron/index.ts
import { app, BrowserWindow } from "electron";
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  console.log(process.env);

  win.loadURL(`${process.env['VITE_DEV_SERVER_URL']}`);
};
app.whenReady().then(createWindow);

"main": "dist-electron/index.js",

取消模块化
// "type": "module"

// 打包
npm install electron-builder -D

"build": "vue-tsc --noEmit && vite build  &&  electron-builder",

// 设置环境变量
npm install cross-env
"dev": "cross-env NODE_ENV=development vite",

if (process.env.NODE_ENV !== 'development') {

  
// 打完包app.isPackaged的值为true
if (app.isPackaged) {
  win.loadFile('./../dist/index.html');
} else {
  win.loadURL(`${process.env['VITE_DEV_SERVER_URL']}`);
}

package.json配置"build"
  "build": {
    
  }
}

// 第二种
vite.config.ts
import electron from "vite-plugin-electron";
plugins: [vue(),
    electron({
      entry: "main.ts",
    }),
    ...
// 根目录
main.ts
import { app, BrowserWindow } from "electron";
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  console.log(process.env);

  win.loadURL(`${process.env['VITE_DEV_SERVER_URL']}`);
};
app.whenReady().then(createWindow);

"main": "dist-electron/main.js",

取消模块化
// "type": "module"

// 打包
npm install electron-builder -D
```

## pinia

```tsx
npm install pinia -S
import { createPinia } from 'pinia'
const store = createPinia()
.use(store)
```
