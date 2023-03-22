import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "./styles/index.scss";
import "element-plus/dist/index.css";
// 使用 Ant Design Vue
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

// 引入路由守卫
import "./router/permission";
import router from "./router";
// 引入mock
import "./mock";

// 引入图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
    // console.log(key, component);
}

app.use(router).use(Antd).mount("#app");

console.log( [
    "    __     __",
    " __/ __\\  / __\\__   ____   _____   _____",
    "/ __/  /\\/ /  /___\\/ ____\\/ _____\\/ _____\\",
    "\\/_   __/ /   _   / /  __/ / __  / / __  /_   __   _____",
    "/ /  / / /  / /  / /  / / /  ___/ /  ___/\\ _\\/ __\\/ _____\\",
    "\\/__/  \\/__/\\/__/\\/__/  \\/_____/\\/_____/\\/__/ /  / /  ___/",
    "                                         / __/  /  \\__  \\",
    "                                         \\/____/\\/_____/"
].join("\n"));

// 按需导入Element Plus,首先你需要安装unplugin-vue-components 和 unplugin-auto-import这两款插件
// npm install -D unplugin-vue-components unplugin-auto-import

document.querySelector("#app")?.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});