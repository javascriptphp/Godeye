import {HistoricalBuyData, HistoricalSellData, ThreeMonthBuyData, ThreeMonthSellData} from "@/types";
import {message} from "antd";
import axios, {AxiosResponse} from "axios";
import {NextApiRequest, NextApiResponse} from "next";
import {SERVER_HOST} from "@/utils/axios";

export const apiHandler = async function (req: NextApiRequest, res: NextApiResponse, url: string): Promise<void> {
	const {method, body} = req;
	try {
		const response = await axios({method: method, url: SERVER_HOST+url, responseType: 'json', data: body});
		res.status(200).json(response.data);
	} catch (error) {
		res.status(500).json(error);
	}
}


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
export const getHistoricalData = async function (symbol: string, metric: string) : Promise<HistoricalBuyData | HistoricalSellData> {
	let data = null;
	const response = await request("/api/getHistorical"+capitalizeFirstLetter(metric)+"Data", {
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