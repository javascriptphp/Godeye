import * as echarts from "echarts";
import {EChartsOption} from "echarts";
import React from "react";
import {BUY} from "@/types";

export const sidebarWidth = '200px';
export const chartWidth = '700px';
export const chartHeight = '600px';
export const introductionWidth = '600px';
export const footerText = `\u00A9 2024 Godeye Ltd. All rights reserved.`;
type optionBuilderParam = { 
	title: string,
	metric: string,
	timestamps: string[],
	threshold: number,
	metricData: number[],
	priceData: number[],
	watermark?: string,
}
export const createChart = function ({chartRef, containerRef, echartsOption} : {
	chartRef:  React.MutableRefObject<echarts.ECharts | null>,
	containerRef: React.RefObject<HTMLDivElement>,
	echartsOption: EChartsOption | undefined,
}) {
	// Initialize chart if it hasn't been initialized yet
	if (!chartRef.current && containerRef.current) {
		chartRef.current = echarts.init(containerRef.current);
	}

	if (chartRef.current && echartsOption) {
		chartRef.current.setOption(echartsOption);
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
}
export const buildChartWithMetricAndPriceOptionForCreate =
	function ({title, metric, timestamps, threshold, metricData, priceData, watermark}: optionBuilderParam): EChartsOption {
	return {
		title: {
			text: title,
			left: 'center',
			top: 0,
		},
		legend: {
			data: ['Metric', 'Price'],
			left: 20,
			top: 30,
		},
		grid: {
			top: '80', // 将图表的绘制区域向下移动，避免与legend重叠
			bottom: '80'
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
		graphic: (function () {
			const graphics = [];
			const text = '水印文字'; // 你想要的水印文本
			const gap = 100; // 间隔

			// 计算行和列
			const cols = Math.ceil(parseInt(chartWidth) / gap);
			const rows = Math.ceil(parseInt(chartHeight) / gap);

			// 循环生成多个水印文字
			for (let i = 0; i < rows; i++) {
				for (let j = 0; j < cols; j++) {
					graphics.push({
						type: 'text',
						left: j * gap,
						top: i * gap,
						style: {
							text: text,
							fontSize: 14,
							fill: 'rgba(0, 0, 0, 0.1)', // 设置文字颜色和透明度
						},
						rotation: Math.PI / 4, // 逆时针旋转 45 度
					});
				}
			}

			return graphics;
		})(),
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
		xAxis: {
			type: 'category',
			splitLine: {show: false},
			data: timestamps
		},
		yAxis: [
			{
				name: 'metric',
				type: 'value',
				min: (value: any) => {
					return Math.min(threshold * 0.9, value.min * 0.95);  // Y 轴最小值为数据最小值的 90%
				},
				max: (value: any) => {
					return value.max * 1.05;  // Y 轴最小值为数据最小值的 90%
				},
				axisLabel: {
					formatter: (value: any) => {
						// 保留3位小数
						return value.toFixed(2);
					}
				}
			},
			{
				name: 'price',
				nameLocation: 'start',
				// alignTicks: true,
				type: 'value',
				min: (value: any) => {
					return value.min * 0.95;  // Y 轴最小值为数据最小值的 90%
				},
				max: (value: any) => {
					return value.max * 1.05;  // Y 轴最小值为数据最小值的 90%
				},
				axisLabel: {
					formatter: (value: any) => {
						// 保留3位小数
						return value.toFixed(2);
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
				data: metricData,
				emphasis: {
					focus: 'series'
				},
				itemStyle: {
					color: '#e98734',
				},
				markLine: {
					symbol: 'none',
					data: [
						{
							yAxis: threshold, // 这里设置阈值线的 y 轴位置
							label: {
								position: 'insideStartTop'
								// formatter: 'threshold', // 显示的文本
							},
							lineStyle: {
								color: metric === BUY ? '#44ee11' : '#ec3939', // 阈值线的颜色
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
				itemStyle: {
					color: '#939393',
				},
				data: priceData
			},
		],
	};
}