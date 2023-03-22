import axios from "axios";
const request = axios.create({
    baseURL: "http://www.ashen.ink:10500/", // url = base url + request url
    // 超时时间 单位是ms，这里设置了3s的超时时间
    timeout: 3000,
});

// 其他的请求拦截器
request.interceptors.request.use(
    (config) => {
        // 在请求拦截器里添加token，暂时没有token
        // config.headers.Authorization = localStorage.getItem("token");
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
request.interceptors.response.use(
    (response) => {
        // Do something with response data
        return response;
    }
);

export default request;