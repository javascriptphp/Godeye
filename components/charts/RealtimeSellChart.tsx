import React, {useEffect, useRef, useState} from "react";
import * as echarts from 'echarts';
import {EChartsOption} from 'echarts';
import {RealtimeResponse, RealtimeSellData} from "@/types";
import {getRealtimeDataUrl} from "@/service";
import useWebSocket from "react-use-websocket";
import {
	chartHeight,
	chartWidth,
	createChart,
	downBorderColor,
	downColor,
	upBorderColor,
	upColor
} from "@/utils/global_constant";
import useStore from "@/utils/store";

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
				name: '指标',
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
		const _priceValues: Array<Array<number>> = realtimeDataArray.map(data => [data.open, data.high, data.low, data.close])
		// const _prices: Array<number> = realtimeDataArray.map(data => data.price);
		setTimestamps((prevTimeStamps) => [...prevTimeStamps, ..._timestamps]);
		setMetricData((prevMetricData) => [...prevMetricData, ..._metricValues]);
		setThreshold(realtimeDataArray[0].threshold);
		setPriceValues((prevPriceValues) => prevPriceValues ? [...prevPriceValues, ..._priceValues] : _priceValues);
	}, [lastMessage]);


	// Initialize and update the chart when data or symbol changes
	useEffect(() => {
		console.log("timestamps", timestamps)
		console.log("priceValues", priceValues)
		// const _option = buildChartWithMetricAndPriceOptionForCreate({
		// 	title: `T3—实时数据`,
		// 	symbol: symbol,
		// 	metric: BUY,
		// 	timestamps: timestamps,
		// 	threshold: threshold,
		// 	metricData: metricData,
		// 	priceData: priceValues,
		// 	watermark: (userContext && userContext.email) || "水印文字",
		// });
		// const echartsOption = {
		// 	..._option,
		// 	...buildCustomerOption(symbol)
		// } as EChartsOption;
		const echartsOption = {
			title: {
				text: 'T3-实时数据',
				left: 'center',
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross'
				}
			},
			legend: {
				data: ['指标', '5分钟K线'],
				top: 40
			},
			grid: {
				top: '80', // 将图表的绘制区域向下移动，避免与legend重叠
				bottom: '80'
			},
			xAxis: {
				type: 'category',
				data: timestamps,
				boundaryGap: false,
				axisLine: { onZero: false },
				splitLine: { show: false },
				min: 'dataMin',
				max: 'dataMax'
			},
			yAxis: [

				{
					name: "指标",
					scale: true,
					splitArea: {
						show: true
					}
				},
				{
					name: `${symbol}价格`,
					nameLocation: 'end',
					nameTextStyle: {
						fontSize: 14
					},
					// alignTicks: true,
					type: 'value',
					min: (value: any) => {
						return value.min*0.999;  // Y 轴最小值为数据最小值的 90%
					},
					max: (value: any) => {
						return value.max*1.001;  // Y 轴最小值为数据最小值的 90%
					},
					axisLabel: {
						formatter: (value: any) => {
							// 保留3位小数
							return value.toFixed(2);
						}
					}
				},
				],
			dataZoom: [
				{
					show: true,
					type: 'slider',
					top: '90%',
					start: 90,
					end: 100
				},
				{
					type: 'inside',
					start: 90,
					end: 100
				},
			],
			series: [
				{
					name: '指标',
					type: 'line',
					data: metricData,
					smooth: true,
					lineStyle: {
						opacity: 0.5
					}
				},
				{
					name: '5分钟K线',
					type: 'candlestick',
					data: priceValues,
					yAxisIndex: 1,
					itemStyle: {
						color: upColor,
						color0: downColor,
						borderColor: upBorderColor,
						borderColor0: downBorderColor
					},
					markPoint: {
						label: {
							formatter: function (param) {
								return param != null ? Math.round(param.value) + '' : '';
							}
						},
						data: [
							{
								name: 'Mark',
								coord: ['2013/5/31', 2300],
								value: 2300,
								itemStyle: {
									color: 'rgb(41,60,85)'
								}
							},
							{
								name: 'highest value',
								type: 'max',
								valueDim: 'highest'
							},
							{
								name: 'lowest value',
								type: 'min',
								valueDim: 'lowest'
							},
							{
								name: 'average value on close',
								type: 'average',
								valueDim: 'close'
							}
						],
						tooltip: {
							formatter: function (param) {
								return param.name + '<br>' + (param.data.coord || '');
							}
						}
					},
					markLine: {
						symbol: ['none', 'none'],
						label: {
							position: 'start',
						},
						data: [
							[
								{
									name: 'from lowest to highest',
									type: 'min',
									valueDim: 'lowest',
									symbol: 'circle',
									symbolSize: 10,
									label: {
										show: false
									},
									emphasis: {
										label: {
											show: false
										}
									},
								},
								{
									type: 'max',
									valueDim: 'highest',
									symbol: 'circle',
									symbolSize: 10,
									label: {
										show: false
									},
									emphasis: {
										label: {
											show: false
										}
									}
								}
							],
							{
								name: 'min line on close',
								type: 'min',
								valueDim: 'close'
							},
							{
								name: 'max line on close',
								type: 'max',
								valueDim: 'close'
							}
						]
					}
				},
			]
		} as EChartsOption;
		console.log(echartsOption)
		createChart({
			chartRef, containerRef, echartsOption
		});
		// return () => {
		// 	chartRef.current?.dispose();  // Dispose of the chart instance on component unmount
		// 	chartRef.current = null;
		// };
	}, [timestamps, threshold, metricData, priceValues]);  // Update chart when `data` or `symbol` changes

	return (
		<div>
			<div ref={containerRef} style={{width: chartWidth, height: chartHeight}}></div>
		</div>
	);
};

export default RealtimeChart;
