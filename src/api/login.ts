import axios from "axios";
import { ElMessage } from "element-plus";

const loginrequest = axios.create({
    baseURL: "http://localhost:10500/api/",
    timeout: 5000
});

export const login = (data: any)=> {
    return loginrequest({
        url: "/login",
        // 先用get请求，后面再改成post
        method: "post",
        data
    }); 
};

// 登录的请求拦截器
loginrequest.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        // console.log(config);
        return config;
    }
);

// 登录的相应拦截器
loginrequest.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        // console.log(response);
        if (response.data.code === 200) {
            // 登录成功
            ElMessage.success(response.data.message);
            // console.log('token',response.config.data);
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


// q: 提问：一个组件的props参数，怎么知道它是从哪个父组件传过来的呢？
// a: 答案：在父组件中，给子组件传递props参数时，可以给参数加上一个标识，这个标识就是父组件的名称，这样在子组件中就可以通过props参数的$parent属性来获取到父组件的名称了。


