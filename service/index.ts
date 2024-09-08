import {ThreeMonthBuyData, ThreeMonthSellData} from "@/types";
import {message} from "antd";
import axios, {AxiosResponse} from "axios";


export const request = function(url: string, data: any) : Promise<AxiosResponse> {
	return axios.post(url, data, {
		headers: {},
		timeout: 6000,
		responseType: 'json',
	})

}
function capitalizeFirstLetter(str: string) {
	if (!str) return str; // 确保字符串非空
	return str.charAt(0).toUpperCase() + str.slice(1);
}
export const getThreeMonthData = async function (symbol: string, metric: string) : Promise<ThreeMonthBuyData | ThreeMonthSellData> {
	let data = null;
	const response = await request("/api/getThreeMonth"+capitalizeFirstLetter(metric)+"Data", {
		"symbol": symbol
	});
	if (response.status === 200) {
		data = response.data?.data;
	}else{
		message.error(response.data?.message);
	}
	return data;
}
export const getRealtimeDataUrl = async function (metric: string, symbol: string) : Promise<string> {
	let data = null;
	const response = await request("/api/getRealtimeDataUrl", {
		"metric": metric,
		"symbol": symbol
	});
	if (response.status === 200) {
		data = response.data?.websocket_url;
	}else{
		message.error(response.data?.message);
	}
	return data;
}