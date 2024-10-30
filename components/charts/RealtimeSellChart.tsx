import React, {useEffect, useRef, useState} from "react";
import * as echarts from 'echarts';
import {EChartsOption} from 'echarts';
import {RealtimeResponse, RealtimeSellData, SELL} from "@/types";
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
const buildCustomerOption = function (symbol: string) {
	return {
		dataZoom: [
			{
				show: true,
				realtime: true,
				start: 90,
				end: 100
			},
			{
				type: 'inside',
				realtime: true,
				start: 95,
				end: 100
			}
		],
		yAxis: [
			{
				name: '指标',
				nameLocation: 'end',
				nameTextStyle: {
					fontSize: 14
				},
				type: 'value',
				min: (value: any) => value.min * 0.98,
				max: (value: any) => value.max * 1.01,
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
				max: (value: any) => value.max * 1.001,
				axisLabel: {
					formatter: (value: any) => value.toFixed(3)
				}
			}
		],
	};
}
const RealtimeChart = ({metric, symbol}: { metric: string, symbol: string }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [metricData, setMetricData] = useState<number[]>([]);
	const [priceData, setPriceData] = useState<number[]>([]);
	const [priceValues, setPriceValues] = useState<number[][]>([][4]);
	const [threshold, setThreshold] = useState<number[]>([]);
	const [timestamps, setTimestamps] = useState<string[]>([]);
	useEffect(() => {
		setMetricData([]);
		setPriceData([])
		setPriceValues([][4]);
		setThreshold([]);
		setTimestamps([]);
	}, [metric, symbol]);
	const chartRef = useRef<echarts.ECharts | null>(null);  // Store chart instance in a ref
	const {userContext} = useStore();
	const { t } = useTranslation();
	const Functions = GlobalFunctions(t);

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
		// onOpen: () => console.log('WebSocket connected!'),
		// onClose: () => console.log('WebSocket disconnected!'),
		shouldReconnect: (e) => {
			return !!websocketUrl;
		},  // 自动重连
	}, websocketUrl !== '');

	useEffect(() => {
		if (!lastMessage) return;
		const response: RealtimeResponse = JSON.parse(lastMessage.data);
		if (response.code !== 200) return;
		console.log("lastMessage", lastMessage)
		const realtimeDataArray: RealtimeSellData[] = response.data as RealtimeSellData[];
		if (realtimeDataArray.length <= 0) return;

		const _timestamps: Array<string> = realtimeDataArray.map(data => new Date(data.timestamp).toLocaleTimeString())
		const _metricValues: Array<number> = realtimeDataArray.map(data => data.metric_value)
		const _priceValues: Array<Array<number>> = realtimeDataArray.map(data => [data.open, data.close, data.low, data.high])
		const _thresholds: Array<number> = realtimeDataArray.map(data => data.threshold);
		setTimestamps((prevTimeStamps) => [...prevTimeStamps, ..._timestamps]);
		setMetricData((prevMetricData) => [...prevMetricData, ..._metricValues]);
		setThreshold((prevThreshold) => [...prevThreshold, ..._thresholds]);
		setPriceValues((prevPriceValues) => prevPriceValues ? [...prevPriceValues, ..._priceValues] : _priceValues);
	}, [lastMessage]);


	// Initialize and update the chart when data or symbol changes
	useEffect(() => {
		const _option = Functions.buildOptionForSellChart({
			title: t('t3Title'),
			symbol: symbol,
			metric: SELL,
			timestamps: timestamps,
			threshold: threshold,
			metricData: metricData,
			priceData: priceValues,
			watermark: (userContext && userContext.email) || t('watermarkText'),
			includeMark: false,
		})
		const echartsOption = {
			..._option,
			...buildCustomerOption(symbol)
		} as EChartsOption;
		createChart({
			chartRef, containerRef, echartsOption
		});
	}, [timestamps, threshold, metricData, priceValues, t]);  // Update chart when `data` or `symbol` changes

	return (
		<div>
			<div ref={containerRef} style={{width: chartWidth, height: chartHeight}}></div>
		</div>
	);
};

export default RealtimeChart;
