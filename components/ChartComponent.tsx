
import React, {useEffect, useRef, useState} from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import axios from "axios";
const upColor = '#00da3c';
const downColor = '#ec0000';


// @ts-ignore
const splitData = function (rawData) {
	console.log("in splitData", rawData);
	let categoryData = [];
	let values = [];
	let volumes = [];
	for (let i = 0; i < rawData.length; i++) {
		categoryData.push(rawData[i].splice(0, 1)[0]);
		values.push(rawData[i]);
		volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1]);
	}
	console.log(categoryData,values,volumes);
	return {
		categoryData: categoryData,
		values: values,
		volumes: volumes
	};
}
// @ts-ignore
const calculateMA = function (dayCount, data) {
	var result = [];
	for (var i = 0, len = data.values.length; i < len; i++) {
		if (i < dayCount) {
			result.push('-');
			continue;
		}
		var sum = 0;
		for (var j = 0; j < dayCount; j++) {
			sum += data.values[i - j][1];
		}
		result.push(+(sum / dayCount).toFixed(3));
	}
	return result;
}

export const ChartComponent = () => {
	
	const containerRef = useRef(null);
	const myChartRef = useRef(null); // 保存ECharts实例

	useEffect(() => {
		const myChart = echarts.init(containerRef.current);
		myChartRef.current = myChart; // 保存实例到ref中

		axios.get("/api/getStockJson").then((res) => {
			const data = splitData(res.data);
			var option = {

				animation: false,
				legend: {
					bottom: 10,
					left: 'center',
					data: ['Dow-Jones index', 'MA5', 'MA10', 'MA20', 'MA30']
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross'
					},
					borderWidth: 1,
					borderColor: '#ccc',
					padding: 10,
					textStyle: {
						color: '#000'
					},
					position: function (pos: number[], params: any, el: any, elRect: any, size: { viewSize: number[]; }) {
						const obj = {
							top: 10
						};
						// @ts-ignore
						obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
						return obj;
					}
					// extraCssText: 'width: 170px'
				},
				axisPointer: {
					link: [
						{
							xAxisIndex: 'all'
						}
					],
					label: {
						backgroundColor: '#777'
					}
				},
				toolbox: {
					feature: {
						dataZoom: {
							yAxisIndex: false
						},
						brush: {
							type: ['lineX', 'clear']
						}
					}
				},
				brush: {
					xAxisIndex: 'all',
					brushLink: 'all',
					outOfBrush: {
						colorAlpha: 0.1
					}
				},
				visualMap: {
					show: false,
					seriesIndex: 5,
					dimension: 2,
					pieces: [
						{
							value: 1,
							color: downColor
						},
						{
							value: -1,
							color: upColor
						}
					]
				},
				grid: [
					{
						left: '10%',
						right: '8%',
						height: '50%'
					},
					{
						left: '10%',
						right: '8%',
						top: '63%',
						height: '16%'
					}
				],
				xAxis: [
					{
						type: 'category',
						// @ts-ignore
						data: data.categoryData,
						boundaryGap: false,
						axisLine: { onZero: false },
						splitLine: { show: false },
						min: 'dataMin',
						max: 'dataMax',
						axisPointer: {
							z: 100
						}
					},
					{
						type: 'category',
						gridIndex: 1,
						// @ts-ignore
						data: data.categoryData,
						boundaryGap: false,
						axisLine: { onZero: false },
						axisTick: { show: false },
						splitLine: { show: false },
						axisLabel: { show: false },
						min: 'dataMin',
						max: 'dataMax'
					}
				],
				yAxis: [
					{
						scale: true,
						splitArea: {
							show: true
						}
					},
					{
						scale: true,
						gridIndex: 1,
						splitNumber: 2,
						axisLabel: { show: false },
						axisLine: { show: false },
						axisTick: { show: false },
						splitLine: { show: false }
					}
				],
				dataZoom: [
					{
						type: 'inside',
						xAxisIndex: [0, 1],
						start: 98,
						end: 100
					},
					{
						show: true,
						xAxisIndex: [0, 1],
						type: 'slider',
						top: '85%',
						start: 98,
						end: 100
					}
				],
				series: [
					{
						name: 'Dow-Jones index',
						type: 'candlestick',
						// @ts-ignore
						data: data.values,
						itemStyle: {
							color: upColor,
							color0: downColor,
							borderColor: undefined,
							borderColor0: undefined
						}
					},
					{
						name: 'MA5',
						type: 'line',
						data: calculateMA(5, data),
						smooth: true,
						lineStyle: {
							opacity: 0.5
						}
					},
					{
						name: 'MA10',
						type: 'line',
						data: calculateMA(10, data),
						smooth: true,
						lineStyle: {
							opacity: 0.5
						}
					},
					{
						name: 'MA20',
						type: 'line',
						data: calculateMA(20, data),
						smooth: true,
						lineStyle: {
							opacity: 0.5
						}
					},
					{
						name: 'MA30',
						type: 'line',
						data: calculateMA(30, data),
						smooth: true,
						lineStyle: {
							opacity: 0.5
						}
					},
					{
						name: 'Volume',
						type: 'bar',
						xAxisIndex: 1,
						yAxisIndex: 1,
						// @ts-ignore
						data: data.volumes
					}
				]
			};

			myChart.setOption(option);
		});

		const handleResize = () => {
			if (myChart) {
				myChart.resize();
			}
		};

		// 监听窗口大小变化事件
		window.addEventListener('resize', handleResize);

		return () => {
			// 组件卸载时移除事件监听器并销毁图表实例
			window.removeEventListener('resize', handleResize);
			myChart.dispose();
		};
	}, []);
	return (
		<div>
			<div ref={containerRef} style={{ width: '100%', height: '600px' }}></div>
		</div>
	);
}