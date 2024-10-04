import * as echarts from "echarts";
import {EChartsOption} from "echarts";
import React from "react";
import {BUY, CoordType, XaxisType} from "@/types";
import {findTimestamp, findTimestampRanges} from "@/utils/utils";
import range from "@rc-component/async-validator/es/rule/range";

export const sidebarWidth = '200px';
export const chartWidth = '1100px';
export const chartHeight = '700px';
export const introductionWidth = 2 * parseInt(chartWidth) / 3;
export const footerText = `\u00A9 2024 Godeye Ltd. All rights reserved.`;
export const downColor = '#ec0000';
export const downBorderColor = '#8A0000';
export const upColor = '#00da3c';
export const upBorderColor = '#008F28';
export const buyAreaColor = '#d2f9df';
export const sellAreaColor = '#f9d2df';

type BuyOptionBuilderParam = {
	title: string,
	symbol: string,
	metric: string,
	timestamps: string[],
	threshold: number,
	metricData: number[],
	priceData: any,
	watermark: string,
	includeMark: boolean,
}
type SellOptionBuilderParam = {
	title: string,
	symbol: string,
	metric: string,
	timestamps: string[],
	threshold: number[],
	metricData: number[],
	priceData: any,
	watermark: string,
	includeMark: boolean,
}
export const createChart = function ({chartRef, containerRef, echartsOption}: {
	chartRef: React.MutableRefObject<echarts.ECharts | null>,
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

	return () => {
		// window.removeEventListener('resize', handleResize);
		chartRef.current?.dispose();  // Dispose of the chart instance on component unmount
		chartRef.current = null;
	};
}
const buildWatermarks = function (watermark: string) {
	const graphics = [];
	const text = watermark; // 你想要的水印文本
	const gap = 150; // 间隔

	// 计算行和列
	const cols = Math.ceil(parseInt(chartWidth) / gap);
	const rows = Math.ceil(parseInt(chartHeight) / gap);

	// 循环生成多个水印文字
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			graphics.push({
				type: 'text',
				left: j * gap + 30,
				top: i * gap + 30,
				style: {
					text: text,
					fontSize: 14,
					fill: 'rgba(0, 0, 0, 0.1)', // 设置文字颜色和透明度
				},
				rotation: Math.PI / 4, // 逆时针旋转 45 度
			});
		}
	}
	// 添加网址
	graphics.push({
		type: 'text',
		left: parseInt(chartWidth) *0.62,
		top: parseInt(chartHeight) *0.01,
		style: {
			text: 'www.godeye.top',
			fontSize: 20,
			fill: 'rgba(255, 0, 0, 0.9)',
		}
	})
	// 添加公司名称水印
	graphics.push({
		type: 'text',
		left: parseInt(chartWidth) * 0.37,
		top: parseInt(chartHeight) * 0.42,
		style: {
			text: 'G o d e y e',
			fontSize: 56,
			fill: 'rgba(0, 0, 0, 0.1)', // 设置文字颜色和透明度
		},
		rotation: 0, // 逆时针旋转 45 度
	});

	return graphics;
};
export const buildOptionForBuyChart =
	function ({
		          title,
		          symbol,
		          metric,
		          timestamps,
		          threshold,
		          metricData,
		          priceData,
		          watermark,
				  includeMark,
	          }: BuyOptionBuilderParam): EChartsOption {
		const ranges = includeMark ? findTimestampRanges(metricData, timestamps, threshold) : [];
		const calculateAreaRanges = function (): CoordType[] {
			return ranges.map((range: string[]) => {
				return [
					{
						xAxis: range[0]
					},
					{
						xAxis: range[1]
					}
				]
			})
		};
		const areaRanges = includeMark ? calculateAreaRanges() : [];
		const lineTimestamp = includeMark ? findTimestamp(ranges) : [];
		const calculateLineTimestamp = function (): any {
			const _lines = lineTimestamp.map((s: string) => {
				return {
					xAxis: s,
					label: {
						show: false
					},
					lineStyle: {
						width: 5,
						type: 'solid',
						color: buyAreaColor, // 阈值线的颜色
						opacity: 0.9,
					},
				}
			}) as any;
			_lines.push({
				yAxis: threshold, // 这里设置阈值线的 y 轴位置
				label: {
					position: 'start',
					formatter: '指标阈值{c}', // 显示的文本
				},
				lineStyle: {
					width: 2,
					color: metric === BUY ? '#44ee11' : '#ec3939', // 阈值线的颜色
					type: 'dashed', // 阈值线的样式，'dashed' 表示虚线
				},
			},);
			return _lines;
		};
		const lineRanges = includeMark ? calculateLineTimestamp() : [];
		return {
			title: {
				text: title,
				textStyle: {
					fontSize: '26px',
				},
				left: 'center',
				top: 0,
			},
			legend: {
				data: ['指标', `${symbol}价格`],
				left: 'center',
				top: 40,
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
			graphic: buildWatermarks(watermark),
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
					name: '指标',
					nameLocation: 'end',
					nameTextStyle: {
						fontSize: 14
					},
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
					name: `${symbol}价格`,
					nameLocation: 'end',
					nameTextStyle: {
						fontSize: 14
					},
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
					name: '指标',
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
					markLine: includeMark ? {
						symbol: 'none',
						data: lineRanges,
						animation: false,
					} : {},
					markArea: includeMark ? {
						silent: true,
						itemStyle: {
							color: buyAreaColor,
							opacity: 0.9
						},
						data: areaRanges
					} : {}
				},
				{
					name: `${symbol}价格`,
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

export const buildOptionForSellChart =
	function ({
		          title,
		          symbol,
		          metric,
		          timestamps,
		          threshold,
		          metricData,
		          priceData,
		          watermark,
				  includeMark,
	          }: SellOptionBuilderParam): EChartsOption {
		// 辅助函数：查找指标低于阈值的时间范围
		const findBelowThresholdRanges = (metricData: number[], threshold: number[]): { start: number, end: number }[] => {
			const ranges: { start: number, end: number }[] = [];
			let rangeStart: number | null = null;

			for (let i = 0; i < metricData.length; i++) {
				if (metricData[i] >= threshold[i]) {
					if (rangeStart === null) {
						rangeStart = i;
					}
				} else {
					if (rangeStart !== null) {
						ranges.push({start: rangeStart, end: i - 1});
						rangeStart = null;
					}
				}
			}

			// 如果最后一个范围持续到数组末尾
			if (rangeStart !== null) {
				ranges.push({start: rangeStart, end: metricData.length - 1});
			}

			return ranges;
		};

		// 获取低于阈值的时间范围
		const belowThresholdRanges = includeMark ? findBelowThresholdRanges(metricData, threshold) : [];

		// 分离 markAreas 和 markLines
		const markAreas: any[] = [];
		const markLines: any[] = [];

		belowThresholdRanges.forEach(range => {
			if (range.start !== range.end) {
				// 多点范围，绘制markArea
				markAreas.push([
					{
						xAxis: timestamps[range.start],
					},
					{
						xAxis: timestamps[range.end],
					}
				]);
			} else {
				// 单点范围，绘制markLine
				markLines.push({
					xAxis: timestamps[range.start],
					label: {
						show: false
					},
					lineStyle: {
						width: 5,
						type: 'solid',
						color: sellAreaColor, // 阈值线的颜色
						opacity: 0.9,
					},
					// emphasis: {
					// 	label: {
					// 		show: true,
					// 		formatter: '阈值点'
					// 	}
					// }
				});
			}
		});

		return {
			title: {
				text: title,
				textStyle: {
					fontSize: '26px',
				},
				left: 'center',
				top: 0,
			},
			legend: {
				data: ['指标', '日K', '阈值'],
				itemStyle: {
					borderColor: "#008F28"
				},
				top: 40
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
			},
			graphic: buildWatermarks(watermark),
			dataZoom: [
				{
					show: true,
					realtime: true,
					type: 'slider',
					start: 95,
					end: 100
				},
				{
					type: 'inside',
					realtime: true,
					start: 95,
					end: 100
				},
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
				data: timestamps,
				boundaryGap: false,
				axisLine: {onZero: false},
				splitLine: {show: false},
				min: 'dataMin',
				max: 'dataMax'
			},
			yAxis: [
				{
					name: '指标',
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
					type: 'value',
					min: (value: any) => {
						return value.min * 0.999;  // Y 轴最小值为数据最小值的 99.9%
					},
					max: (value: any) => {
						return value.max * 1.001;  // Y 轴最大值为数据最大值的 100.1%
					},
					axisLabel: {
						formatter: (value: any) => {
							return value.toFixed(2);
						}
					}
				},
			],
			series: [
				{
					name: '指标',
					type: 'line',
					data: metricData,
					emphasis: {
						focus: 'series'
					},
					smooth: true,
					lineStyle: {
						opacity: 0.7
					},
					markArea: includeMark ? {
						data: markAreas,
						itemStyle: {
							color: sellAreaColor,
							opacity: 0.9
						}
					} : {},
					markLine: includeMark ? {
						symbol: 'none',
						data: markLines,
						animation: false,
					} : {}
				},
				{
					name: '日K',
					type: 'candlestick',
					data: priceData,
					yAxisIndex: 1,
					showSymbol: false,
					emphasis: {
						focus: 'series'
					},
					itemStyle: {
						color: upColor,
						color0: downColor,
						borderColor: upBorderColor,
						borderColor0: downBorderColor
					}
				},
				includeMark && {
					name: '阈值',
					type: 'line',
					step: 'end', // 使用阶梯图
					showSymbol: false,
					yAxisIndex: 0, // 关联到指标的 Y 轴
					data: threshold,
					lineStyle: {
						type: 'dashed',
						color: '#FF0000',
						width: 1
					},
					tooltip: {
						show: false
					}
				}
			],
		} as EChartsOption;
	}