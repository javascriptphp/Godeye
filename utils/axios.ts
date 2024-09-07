// utils/axios.ts
import axios from 'axios';

export const SERVER_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://47.236.100.38:8888';

// 创建一个 axios 实例
const axiosInstance = axios.create({
	baseURL: 'https://default-api.com', // 初始默认的 baseURL
});

// 请求拦截器
axiosInstance.interceptors.request.use(
	(config) => {
		// 修改 host 或 baseURL
		// 比如根据环境动态设置 baseURL
		const customHost = process.env.NEXT_PUBLIC_API_HOST || 'http://47.236.100.38:8888';
		console.log("config",config)
		if (config.baseURL) {
			config.baseURL = customHost;
		}

		return config;
	},
	(error) => {
		// 请求错误处理
		return Promise.reject(error);
	}
);

// 响应拦截器（可选，处理响应错误等）
axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		// 处理响应错误
		return Promise.reject(error);
	}
);

export default axiosInstance;
