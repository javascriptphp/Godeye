import {RealtimeDataResponse, ThreeMonthData} from "@/types";
import {message} from "antd";
import axios, {AxiosResponse} from "axios";


export const request = function(url: string, data: any) : Promise<AxiosResponse> {
	return axios.post(url, data, {
		headers: {},
		timeout: 6000,
		responseType: 'json',
	})

}
export const getThreeMonthData = async function (symbol: string) : Promise<ThreeMonthData> {
	let data = null;
	const response = await request("/api/getThreeMonthData", {
		"symbol": symbol
	});
	if (response.status === 200) {
		data = response.data?.data;
	}else{
		message.error(response.data?.message);
	}
	return data;
}
export const getRealtimeDataUrl = async function (metric: string, symbol: string) : Promise<String> {
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