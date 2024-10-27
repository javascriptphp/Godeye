import React, {useEffect, useRef, useState} from "react";
import * as echarts from 'echarts';
import {EChartsOption} from 'echarts';
import {BUY, RealtimeBuyData, RealtimeResponse} from "@/types";
import {getRealtimeDataUrl} from "@/service";
import useWebSocket from "react-use-websocket";
import {chartHeight, chartWidth, createChart} from "@/utils/global_constant";
import useStore from "@/utils/store";
import {useTranslation} from "react-i18next";
import GlobalFunctions from "@/utils/global_functions";


interface RealtimeChartData {
	metricData: number[];
	priceData: number[];
	threshold: number;
	timestamps: string[];
}
const RealtimeBuyChart = ({metric, symbol}: { metric: string, symbol: string }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [metricData, setMetricData] = useState<number[]>([]);
	const [priceData, setPriceData] = useState<number[]>([]);
	const [threshold, setThreshold] = useState<number>(0);
	const [timestamps, setTimestamps] = useState<string[]>([]);
	const { t } = useTranslation();
	const Functions = GlobalFunctions(t);
	const buildCustomerOption = function (symbol: string) {
		return {
			dataZoom: [
				{
					show: true,
					realtime: true,
					start: 0,
					end: 100
				},
				{
					type: 'inside',
					realtime: true,
					start: 0,
					end: 100
				}
			],
			yAxis: [
				{
					name: t('chart_metric'),
					nameLocation: 'end',
					nameTextStyle: {
						fontSize: 14
					},
					type: 'value',
					min: (value: any) => value.min * 0.999,
					max: (value: any) => value.max * 1.001,
					axisLabel: {
						formatter: (value: any) => value.toFixed(3)
					}
				},
				{
					name: `${symbol}价格`,
					nameLocation: 'end',
					nameTextStyle: {
						fontSize: 14
					},
					type: 'value',
					min: (value: any) => value.min * 0.999,
					max: (value: any) => value.max * 1.0001,
					axisLabel: {
						formatter: (value: any) => value.toFixed(3)
					}
				}
			],
		};
	}
	useEffect(() => {
		setMetricData([]);
		setPriceData([]);
		setThreshold(0);
		setTimestamps([]);
	}, [metric, symbol]);
	console.log("realtime",metricData.length)
	const chartRef = useRef<echarts.ECharts | null>(null);  // Store chart instance in a ref
	const {userContext} = useStore();

	const [websocketUrl, setWebsocketUrl] = useState<string>('');
	// 请求websocket url
	useEffect(() => {
		getRealtimeDataUrl(metric, symbol).then(url => {
			if (url) {
				setWebsocketUrl(url);
			}
		});
	}, [symbol, metric]);
	const {lastMessage} = useWebSocket(websocketUrl, {
		reconnectInterval: 5000,
		reconnectAttempts: 5,
		onOpen: () => console.log('WebSocket connected!'),
		onClose: () => console.log('WebSocket disconnected!'),
		shouldReconnect: (e) => {
			return !!websocketUrl;
		},  // 自动重连
	}, websocketUrl !== '');

	useEffect(() => {
		if (!lastMessage) return;
		const response: RealtimeResponse = JSON.parse(lastMessage.data);
		if (response.code !== 200) return;
		const realtimeDataArray: RealtimeBuyData[] = response.data as RealtimeBuyData[];
		if (realtimeDataArray.length <= 0) return;

		const _timestamps: Array<string> = realtimeDataArray.map(data => new Date(data.timestamp).toLocaleTimeString())
		const _metricValues: Array<number> = realtimeDataArray.map(data => data.metric_value)
		const _prices: Array<number> = realtimeDataArray.map(data => data.price);
		setTimestamps((prevTimeStamps) => [...prevTimeStamps, ..._timestamps]);
		setMetricData((prevMetricData) => [...prevMetricData, ..._metricValues]);
		setThreshold(realtimeDataArray[0].threshold);
		setPriceData((prevPriceData) => [...prevPriceData, ..._prices]);
		console.log("实时数据的阈值", threshold)
	}, [lastMessage]);


	// Initialize and update the chart when data or symbol changes
	useEffect(() => {
		const _option = Functions.buildOptionForBuyChart({
			title: t('t3Title'),
			symbol: symbol,
			metric: BUY,
			timestamps: timestamps,
			threshold: threshold,
			metricData: metricData,
			priceData: priceData,
			watermark: (userContext && userContext.email) || t('watermarkText'),
			includeMark: false
		});
		const echartsOption = {
			..._option,
			...buildCustomerOption(symbol)
		} as EChartsOption;
		createChart({
			chartRef, containerRef, echartsOption
		});
	}, [timestamps, threshold, metricData, priceData, t]);  // Update chart when `data` or `symbol` changes

	return (
		<div>
			<div ref={containerRef} style={{width: chartWidth, height: chartHeight}}></div>
		</div>
	);
};

export default RealtimeBuyChart;
