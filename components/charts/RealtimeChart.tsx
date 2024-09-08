import React, {useEffect, useRef, useState} from "react";
import * as echarts from 'echarts';
import {BaseMetric, RealtimeData} from "@/types";
import {getRealtimeDataUrl, getThreeMonthData} from "@/service";
import {message} from "antd";
import useWebSocket from "react-use-websocket";


const RealtimeChart = ({metric, symbol}: { metric: string, symbol: string }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [data, setData] = useState<{ name: string, value: number }[]>([]);
	const [buyMetricData, setBuyMetricData] = useState<{ name: string, value: number }[]>([]);
	const [buyPriceData, setBuyPriceData] = useState<{ name: string, value: number }[]>([]);
	const [buyThreshold, setBuyThreshold] = useState<number>(0);
	const [timestamps, setTimestamps] = useState<string[]>([]);
	const [sellMetricData, setSellMetricData] = useState<{ name: string, value: number }[]>([]);
	const [sellPriceData, setSellPriceData] = useState<{ name: string, value: number }[]>([]);
	const [sellThreshold, setSellThreshold] = useState<number>(0);

	const chartRef = useRef<echarts.ECharts | null>(null);  // Store chart instance in a ref
	const hasFetchedData = useRef(false);  // Track if data has been fetched
	// const [message, setMessage] = useState<RealtimeData>();
	const [realtimeData, setRealtimeData] = useState<RealtimeData>();

	const [websocketUrl, setWebsocketUrl] = useState<string>('');
	// 请求websocket url
	useEffect(() => {
		getRealtimeDataUrl(metric, symbol).then(url => setWebsocketUrl(url));
	}, []);
	  // socketUrl 存在时才启动 WebSocket
	const [displayData, setDisplayData] = useState<RealtimeData[]>([]);
	const { sendMessage, lastMessage, readyState } = useWebSocket(websocketUrl, {
		onOpen: () => {
			console.log('WebSocket connected!')
		},
		onClose: () => console.log('WebSocket disconnected!'),
		shouldReconnect: (e) => {
			message.error(e.reason)
			return true;
		},  // 自动重连
	}, websocketUrl !== '');
	useEffect(() => {
		if (lastMessage !== null) {
			// setRealtimeData(lastMessage.data);
			const copyData = displayData;
			copyData.push(lastMessage.data)
			setDisplayData(copyData)
			console.log("lastmessage",lastMessage)
			console.log(displayData);
			displayData.push(lastMessage.data)
		}
	}, [lastMessage]);

	useEffect(() => {
		if (!lastMessage) return;
		const realtimeData : RealtimeData = JSON.parse(lastMessage.data);
		let timeStamp = new Date(realtimeData.timestamp).toISOString().split('T')[0];
		const _timestamps = timestamps;
		_timestamps.push(timeStamp);
		setTimestamps(_timestamps);
		if (realtimeData.metric === 'buy') {
			const _buyMetricData = buyMetricData;
			_buyMetricData.push({name: timeStamp, value: realtimeData.metric_value});
			setBuyMetricData(_buyMetricData);
		}
		const _buyPriceData = buyPriceData;
		_buyPriceData.push({name: timeStamp, value: realtimeData.price});
		setBuyPriceData(_buyPriceData);
		chartRef.current?.setOption({
			xAxis: {
				type: 'category',
				splitLine: {show: false},
				data: timestamps
			},
			series: [
				{
					name: 'Metric',
					type: 'line',
					showSymbol: false,
					yAxisIndex: 0,
					data: buyMetricData,
					emphasis: {
						focus: 'series'
					},
					markLine: {
						symbol: 'none',
						data: [
							{
								yAxis: realtimeData.threshold, // 这里设置阈值线的 y 轴位置
								label: {
									position: 'start'
									// formatter: 'threshold', // 显示的文本
								},
								lineStyle: {
									color: 'red', // 阈值线的颜色
									type: 'dashed', // 阈值线的样式，'dashed' 表示虚线
								},
							},
						],
					},
				},
				{
					name: 'Price',
					type: 'line',
					yAxisIndex: 1,
					showSymbol: false,
					emphasis: {
						focus: 'series'
					},
					data: buyPriceData
				},
			],
		})
		
	}, [lastMessage]);
	

	// Initialize and update the chart when data or symbol changes
	useEffect(() => {
		// Initialize chart if it hasn't been initialized yet
		if (!chartRef.current && containerRef.current) {
			chartRef.current = echarts.init(containerRef.current);
		}

		if (chartRef.current) {
			const option = {
				title: {
					text: `${symbol} Realtime Data`,
					left: 'center',
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						animation: false,
						label: {
							backgroundColor: '#505765'
						}
					},
					formatter: function (params: any) {
						let result = '<div>';
						result += '<strong>' + params[0].name + '</strong><br/>';
						params.forEach(function (item: any) {
							result += '<div style="display: flex; justify-content: space-between;">' +
								'<span>' + item.marker + item.seriesName + ':</span>' +
								'<span style="font-weight: bold; text-align: right; min-width: 60px;">' +
								(item.seriesName.toLowerCase().includes('price') ? item.value : item.value.toFixed(4)) + '</span>' +
								'</div>';
						});
						result += '</div>';
						return result;
					},
				},
				grid: {
					bottom: 80
				},
				dataZoom: [
					{
						show: true,
						realtime: true,
						start: 65,
						end: 100
					},
					{
						type: 'inside',
						realtime: true,
						start: 65,
						end: 100
					}
				],
				toolbox: {
					feature: {
						dataZoom: {
							yAxisIndex: 'none'
						},
						restore: {},
						saveAsImage: {}
					}
				},
				legend: {
					data: ['Metric','Price'],
					left: 20,
				},
				xAxis: {
					type: 'category',
					splitLine: {show: false},
					data: timestamps
				},
				// yAxis: {
				// 	type: 'value',
				// 	boundaryGap: [0, '100%'],
				// 	splitLine: {show: true},
				// },
				yAxis: [
					{
						name: 'metric',
						type: 'value',
						min: (value:any) => {
							return value.min * 0.95;  // Y 轴最小值为数据最小值的 90%
						},
						max: (value:any) => {
							return value.max * 1.05;  // Y 轴最小值为数据最小值的 90%
						},
						axisLabel: {
							formatter: (value:any) => {
								// 保留3位小数
								return value.toFixed(3);
							}
						}
					},
					{
						name: 'price',
						nameLocation: 'start',
						// alignTicks: true,
						type: 'value',
						min: (value:any) => {
							return value.min * 0.95;  // Y 轴最小值为数据最小值的 90%
						},
						max: (value:any) => {
							return value.max * 1.05;  // Y 轴最小值为数据最小值的 90%
						},
						axisLabel: {
							formatter: (value:any) => {
								// 保留3位小数
								return value.toFixed(3);
							}
						}
					}
				],
				series: [
					{
						name: 'Metric',
						type: 'line',
						showSymbol: false,
						yAxisIndex: 0,
						data: buyMetricData,
						emphasis: {
							focus: 'series'
						},
						markLine: {
							symbol: 'none',
							data: [
								{
									yAxis: buyThreshold, // 这里设置阈值线的 y 轴位置
									label: {
										position: 'start'
										// formatter: 'threshold', // 显示的文本
									},
									lineStyle: {
										color: 'red', // 阈值线的颜色
										type: 'dashed', // 阈值线的样式，'dashed' 表示虚线
									},
								},
							],
						},
					},
					{
						name: 'Price',
						type: 'line',
						yAxisIndex: 1,
						showSymbol: false,
						emphasis: {
							focus: 'series'
						},
						data: buyPriceData
					},
				],
			};

			chartRef.current.setOption(option);
		}

		// Handle chart resizing
		const handleResize = () => {
			chartRef.current?.resize();
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			chartRef.current?.dispose();  // Dispose of the chart instance on component unmount
			chartRef.current = null;
		};
	}, [data, symbol]);  // Update chart when `data` or `symbol` changes

	return (
		<div>
			<div ref={containerRef} style={{width: '800px', height: '600px'}}></div>
		</div>
	);
};

export default RealtimeChart;
