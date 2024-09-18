import React, {useEffect, useRef, useState} from "react";
import * as echarts from 'echarts';
import {EChartsOption} from 'echarts';
import {BUY, RealtimeData} from "@/types";
import {getRealtimeDataUrl} from "@/service";
import {message} from "antd";
import useWebSocket from "react-use-websocket";
import {
	buildChartWithMetricAndPriceOptionForCreate,
	chartHeight,
	chartWidth,
	createChart
} from "@/utils/global_constant";

const customerOption = {
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
			name: 'metric',
			type: 'value',
			min: (value: any) => value.min * 0.999,
			max: (value: any) => value.max * 1.001,
			axisLabel: {
				formatter: (value: any) => value.toFixed(3)
			}
		},
		{
			name: 'price',
			nameLocation: 'start',
			type: 'value',
			min: (value: any) => value.min * 0.999,
			max: (value: any) => value.max * 1.0001,
			axisLabel: {
				formatter: (value: any) => value.toFixed(3)
			}
		}
	],
}

const RealtimeChart = ({metric, symbol}: { metric: string, symbol: string }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [metricData, setMetricData] = useState<number[]>([]);
	const [priceData, setPriceData] = useState<number[]>([]);
	const [threshold, setThreshold] = useState<number>(0);
	const [timestamps, setTimestamps] = useState<string[]>([]);

	const chartRef = useRef<echarts.ECharts | null>(null);  // Store chart instance in a ref

	const [websocketUrl, setWebsocketUrl] = useState<string>('');
	// 请求websocket url
	useEffect(() => {
		getRealtimeDataUrl(metric, symbol).then(url => setWebsocketUrl(url));
	}, [symbol, metric]);
	const {lastMessage} = useWebSocket(websocketUrl, {
		onOpen: () => console.log('WebSocket connected!'),
		onClose: () => console.log('WebSocket disconnected!'),
		shouldReconnect: (e) => {
			message.error(e.reason)
			return true;
		},  // 自动重连
	}, websocketUrl !== '');

	useEffect(() => {
		if (!lastMessage) return;
		const realtimeData: RealtimeData = JSON.parse(lastMessage.data);
		let timeStamp = new Date(realtimeData.timestamp).toLocaleTimeString();
		const _timestamps = timestamps;
		_timestamps.push(timeStamp);
		setTimestamps(_timestamps);
		if (realtimeData.metric === metric) {
			const _metricData = metricData;
			_metricData.push(realtimeData.metric_value);
			setMetricData(_metricData);
		}
		setThreshold(realtimeData.threshold);
		const _priceData = priceData;
		_priceData.push(realtimeData.price);
		setPriceData(_priceData);
	}, [lastMessage]);


	// Initialize and update the chart when data or symbol changes
	useEffect(() => {
		const _option = buildChartWithMetricAndPriceOptionForCreate({
			title: `T3—实时数据`,
			metric: BUY,
			timestamps: timestamps,
			threshold: threshold,
			metricData: metricData,
			priceData: priceData,
		});
		const echartsOption = {
			..._option,
			...customerOption
		} as EChartsOption;
		createChart({
			chartRef, containerRef, echartsOption
		});
	}, [timestamps, threshold, metricData, priceData]);  // Update chart when `data` or `symbol` changes

	return (
		<div>
			<div ref={containerRef} style={{width: chartWidth, height: chartHeight}}></div>
		</div>
	);
};

export default RealtimeChart;
