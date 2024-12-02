import axios, { AxiosInstance } from "axios";
import { message } from "antd";

// 服务器主机地址
export const SERVER_HOST =
    process.env.NEXT_PUBLIC_API_HOST || "http://47.236.100.38:8888";

export const MEME_SERVER_HOST = "http://47.236.100.38:34320";

export const EXCHANGE_SERVER_HOST = "http://47.236.100.38:30105";

// 创建 Axios 实例
const axiosInstance: AxiosInstance = axios.create({
    baseURL: SERVER_HOST,
    timeout: 15000,
    responseType: "json",
    withCredentials: true, // 允许携带 Cookies
});

// 请求拦截器（可选）
axiosInstance.interceptors.request.use(
    (config) => {
        // 在发送请求前可以添加逻辑（如：Token 注入）
        return config;
    },
    (error) => {
        // 处理请求错误
        return Promise.reject(error);
    }
);

// 响应拦截器（可选）
axiosInstance.interceptors.response.use(
    (response) => response, // 正常返回响应数据
    (error) => {
        // 统一处理错误
        message.error(error?.response?.data?.message || "Request failed");
        return Promise.reject(error);
    }
);

export default axiosInstance;
