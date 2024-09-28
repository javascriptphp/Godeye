import React, {useEffect, useRef, useState} from "react";
import * as echarts from 'echarts';
import {EChartsOption} from 'echarts';
import {
	HistoricalBuyValues,
	HistoricalData,
	HistoricalSellValues,
	isErrorTypeEnum,
	ThreeMonthSellData,
	ThreeMonthSellValues
} from "@/types";
import {getThreeMonthData} from "@/service";
import {message} from "antd";
import {chartHeight, chartWidth, createChart} from "@/utils/global_constant";
import useStore from "@/utils/store";


const HistoricalChart = ({symbol, metric}: { symbol: string, metric: string }) => {
	console.log("historical",symbol,metric);
	const upColor = '#00da3c';
	const downColor = '#ec0000';
	const containerRef = useRef<HTMLDivElement>(null);
	const [metricData, setMetricData] = useState<number[]>([]);
	const [openVal, setOpenVal] = useState<number[]>([]);
	const [highVal, setHighVal] = useState<number[]>([]);
	const [lowVal, setLowVal] = useState<number[]>([]);
	const [priceValues, setPriceValues] = useState<number[][]>();
	const [closeVal, setCloseVal] = useState<number[]>([]);
	const [threshold, setThreshold] = useState<number>(0);
	const [timestamps, setTimestamps] = useState<string[]>([]);
	const [messageApi, contextHolder] = message.useMessage();

	const chartRef = useRef<echarts.ECharts | null>(null);  // Store chart instance in a ref
	const hasFetchedData = useRef(false);  // Track if data has been fetched
	
	const {userContext} = useStore();

	// Fetch data and update the state
	useEffect(() => {
		const fetchData = async () => {
			const result = await getThreeMonthData(symbol, metric);
			if (isErrorTypeEnum(result)) {

			}else{
				const nonNullResult = result as HistoricalData;
				console.log("sell data", nonNullResult.values)
				const _timestamps = nonNullResult.values.map((item: HistoricalBuyValues | HistoricalSellValues) => (
					new Date(item.timestamp).toLocaleDateString()
				));
				setTimestamps(_timestamps);
				const _buyMetricData = nonNullResult.values.map((item: HistoricalBuyValues | HistoricalSellValues) => (item.metric_value));
				setMetricData(_buyMetricData);
				// todo 处理sell data
				const sellResult = nonNullResult as ThreeMonthSellData;
				const _openVal = sellResult.values.map((item: ThreeMonthSellValues) => (item.open));
				setOpenVal(_openVal);
				const _highVal = sellResult.values.map((item: ThreeMonthSellValues) => (item.high));
				setHighVal(_highVal);
				const _lowVal = sellResult.values.map((item: ThreeMonthSellValues) => (item.low));
				setLowVal(_lowVal);
				const _closeVal = sellResult.values.map((item: ThreeMonthSellValues) => (item.close));
				setCloseVal(_closeVal); 
				
				const _priceValues = sellResult.values.map((item: ThreeMonthSellValues) => [item.open, item.high, item.low, item.close]);
				setPriceValues(_priceValues);
				setThreshold(nonNullResult.threshold);
			}
		};
		//
		// if (!hasFetchedData.current) {
		// 	hasFetchedData.current = true;
			fetchData().then(r => r)
		// }
	}, [symbol, metric]);
	useEffect(() => {
		const echartsOption = {
			title: {
				text: 'T1-部分历史数据',
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
					name:'指标',
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
					start: 95,
					end: 100
				},
				{
					type: 'inside',
					start: 95,
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
		createChart({chartRef, containerRef, echartsOption})

		// 用对象包装依赖对象，可以保证在所有元素都变化之后才执行副作用
	}, [timestamps, threshold, metricData, closeVal]);  // Update chart when `data` or `symbol` changes

	return (
		<div>
			{contextHolder}
			<div ref={containerRef} style={{width: chartWidth, height: chartHeight}}></div>
		</div>
	);
};

export default HistoricalChart;
