import React, {createRef, useEffect, useRef, useState} from 'react';
import {createChart} from "lightweight-charts";
import * as echarts from 'echarts';
import {getRealtimeDataUrl, getThreeMonthData} from "@/service";
import {BaseMetric} from "@/types";
import {message} from "antd";

const Chart1 = ({metric, symbol}: { metric: string, symbol: string}) => {

	// const containerRef = useRef<HTMLDivElement>(null);
	// const [data, setData] = useState<{ name: string, value: [string, number] }[]>([]);
	// const chartRef = useRef<echarts.ECharts | null>(null);  // Store chart instance in a ref
	// const hasFetchedData = useRef(false);  // Track if data has been fetched
	//
	// // Fetch data and update the state
	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		const websocketUrl = await getRealtimeDataUrl(metric, symbol);
	// 		const processedData = result.buy.map((item: BaseMetric) => ({
	// 			name: new Date(item.timestamp).toISOString().split('T')[0],
	// 			value: [new Date(item.timestamp).toISOString().split('T')[0], item.price] as [string, number],
	// 		}));
	//
	// 		setData(processedData);
	// 	};

		// Prevent the request from being sent twice
	// 	if (!hasFetchedData.current) {
	// 		hasFetchedData.current = true;
	// 		fetchData().catch((error) => {
	// 			message.error("Error in fetchData:", error);
	// 		});
	// 	}
	// // }, [symbol]);  // Update data when `symbol` changes
	//
	// // Initialize and update the chart when data or symbol changes
	// useEffect(() => {
	// 	// Initialize chart if it hasn't been initialized yet
	// 	if (!chartRef.current && containerRef.current) {
	// 		chartRef.current = echarts.init(containerRef.current);
	// 	}
	//
	// 	if (chartRef.current) {
	// 		const option = {
	// 			title: {
	// 				text: `${symbol} 3-Month Historical Data`,
	// 			},
	// 			tooltip: {
	// 				trigger: 'axis',
	// 				formatter: function (params: any) {
	// 					const date = new Date(params[0].name);
	// 					return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} : ${params[0].value[1]}`;
	// 				},
	// 			},
	// 			legend: {
	// 				data: ['Price'],
	// 			},
	// 			xAxis: {
	// 				type: 'time',
	// 				splitLine: {show: false},
	// 			},
	// 			yAxis: {
	// 				type: 'value',
	// 				boundaryGap: [0, '100%'],
	// 				splitLine: {show: true},
	// 			},
	// 			series: [
	// 				{
	// 					name: 'Price',
	// 					type: 'line',
	// 					showSymbol: false,
	// 					data: data,
	// 				},
	// 			],
	// 		};
	//
	// 		chartRef.current.setOption(option);
	// 	}
	//
	// 	// Handle chart resizing
	// 	const handleResize = () => {
	// 		chartRef.current?.resize();
	// 	};
	//
	// 	window.addEventListener('resize', handleResize);
	//
	// 	return () => {
	// 		window.removeEventListener('resize', handleResize);
	// 		chartRef.current?.dispose();  // Dispose of the chart instance on component unmount
	// 		chartRef.current = null;
	// 	};
	// }, [data, symbol]);  // Update chart when `data` or `symbol` changes
	//
	const containerRef = useRef(null);
	useEffect(() => {
		const myChart = echarts.init(containerRef.current);
		let data = [];
		let now = new Date(1997, 9, 3);
		let oneDay = 24 * 3600 * 1000;
		let value = Math.random() * 1000;
		for (var i = 0; i < 1000; i++) {
			data.push(randomData());
		}
		function randomData() {
			now = new Date(+now + oneDay);
			value = value + Math.random() * 21 - 10;
			return {
				name: now.toString(),
				value: [
					[now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
					Math.round(value)
				]
			};
		}
		const option = {
			title: {
				text: 'Dynamic Data & Time Axis'
			},
			tooltip: {
				trigger: 'axis',
				formatter: function (parameters:{name:string, value: string}[]) {
					let params = parameters[0];
					var date = new Date(params.name);
					return (
						date.getDate() +
						'/' +
						(date.getMonth() + 1) +
						'/' +
						date.getFullYear() +
						' : ' +
						params.value[1]
					);
				},
				axisPointer: {
					animation: false
				}
			},
			xAxis: {
				type: 'time',
				splitLine: {
					show: false
				}
			},
			yAxis: {
				type: 'value',
				boundaryGap: [0, '100%'],
				splitLine: {
					show: true
				}
			},
			legend: {
				data: ['Fake Data']
			},
			series: [
				{
					name: 'Fake Data',
					type: 'line',
					showSymbol: false,
					data: data,
					markArea: {
						itemStyle: {
							color: 'rgba(255, 173, 177, 0.4)'
						},
						data: [
							[
								{
									xAxis: '1999/5/5'
								},
								{
									xAxis: '1999/12/10'
								}
							],
							[
								{
									xAxis: '2000/5/5'
								},
								{
									xAxis: '2000/7/10'
								}
							]
						]
					}
				}
			]
		};
		myChart.setOption(option);
		const timer = setInterval(function () {
			for (var i = 0; i < 5; i++) {
				data.shift();
				data.push(randomData());
			}
			myChart.setOption({
				series: [
					{
						data: data
					}
				]
			});
			// console.log(myChart.getOption().series.data)
		}, 1000);
		return () => {
			
			clearInterval(timer);
			myChart.dispose();
		};
	}, []);
	
	return (
		<div>
			<div ref={containerRef} style={{ width: '800px', height: '600px' }}></div>
		</div>
	);

};

export default Chart1;
