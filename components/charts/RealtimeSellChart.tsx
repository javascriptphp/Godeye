import React, {useEffect, useRef, useState} from "react";
import * as echarts from 'echarts';
import {RealtimeResponse, RealtimeSellData, SELL} from "@/types";
import {getRealtimeDataUrl} from "@/service";
import useWebSocket from "react-use-websocket";
import {buildOptionForSellChart, chartHeight, chartWidth, createChart} from "@/utils/global_constant";
import useStore from "@/utils/store";

interface RealtimeChartData {
	metricData: number[];
	priceData: number[];
	threshold: number;
	timestamps: string[];
}
const RealtimeChart = ({metric, symbol}: { metric: string, symbol: string }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [metricData, setMetricData] = useState<number[]>([]);
	const [priceData, setPriceData] = useState<number[]>([]);
	const [priceValues, setPriceValues] = useState<number[][]>([][4]);
	const [threshold, setThreshold] = useState<number>(0);
	const [timestamps, setTimestamps] = useState<string[]>([]);
	const [realtimeData, setRealtimeData] = useState<RealtimeChartData>();
	useEffect(() => {
		setMetricData([]);
		setPriceData([])
		setPriceValues([][4]);
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
		console.log("lastMessage", lastMessage)
		const realtimeDataArray: RealtimeSellData[] = response.data as RealtimeSellData[];
		if (realtimeDataArray.length <= 0) return;

		const _timestamps: Array<string> = realtimeDataArray.map(data => new Date(data.timestamp).toLocaleTimeString())
		const _metricValues: Array<number> = realtimeDataArray.map(data => data.metric_value)
		const _priceValues: Array<Array<number>> = realtimeDataArray.map(data => [data.open, data.close, data.low, data.high])
		// const _prices: Array<number> = realtimeDataArray.map(data => data.price);
		setTimestamps((prevTimeStamps) => [...prevTimeStamps, ..._timestamps]);
		setMetricData((prevMetricData) => [...prevMetricData, ..._metricValues]);
		setThreshold(realtimeDataArray[0].threshold);
		setPriceValues((prevPriceValues) => prevPriceValues ? [...prevPriceValues, ..._priceValues] : _priceValues);
	}, [lastMessage]);


	// Initialize and update the chart when data or symbol changes
	useEffect(() => {
		let echartsOption = buildOptionForSellChart({
			title: `T3-实时数据`,
			symbol: symbol,
			metric: SELL,
			timestamps: timestamps,
			threshold: threshold,
			metricData: metricData,
			priceData: priceValues,
			watermark: (userContext && userContext.email) || "水印文字",
		})
		echartsOption = {
			...echartsOption,
			dataZoom: [
				{
					show: true,
					type: 'slider',
					top: '90%',
					start: 85,
					end: 100
				},
				{
					type: 'inside',
					start: 85,
					end: 100
				},
			],
		}
		createChart({
			chartRef, containerRef, echartsOption
		});
	}, [timestamps, threshold, metricData, priceValues]);  // Update chart when `data` or `symbol` changes

	return (
		<div>
			<div ref={containerRef} style={{width: chartWidth, height: chartHeight}}></div>
		</div>
	);
};

export default RealtimeChart;
