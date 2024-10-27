import {EChartsOption} from "echarts";
import {findTimestamp, findTimestampRanges} from "@/utils/utils";
import {BUY, BuyOptionBuilderParam, CoordType, SellOptionBuilderParam} from "@/types";
import {
	buildWatermarks,
	buyAreaColor,
	downBorderColor,
	downColor,
	sellAreaColor,
	upBorderColor,
	upColor
} from "@/utils/global_constant";
import type {TFunction} from "i18next";

const GlobalFunctions = (t: TFunction) => {
	const buildOptionForBuyChart =
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
						formatter: t('text_indicator_threshold')+' {c}', // 显示的文本
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
					top: 25,
				},
				legend: {
					data: [
						`${t('text_indicator')}`,
						`${symbol}${t('text_price')}`,
						{
							name: t('text_buy_area'), // 图例项名称
							icon: 'rect', // 图例项图标设置为矩形
							itemStyle: {
								color: buyAreaColor,
								opacity: 0.9
							}
						}
					],
					left: 'center',
					top: 55,
				},
				grid: {
					top: '90', // 将图表的绘制区域向下移动，避免与legend重叠
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
						name: t('text_indicator'),
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
						name: `${symbol}${t('text_price')}`,
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
						name: `${t('text_indicator')}`,
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
						name: `${symbol}${t('text_price')}`,
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
					{
						// 创建一个隐藏的 series 以模拟 markArea 的图例
						name: t('text_buy_area'),
						type: 'line',
						data: [],
						itemStyle: { color: buyAreaColor, opacity: 0.9 }
					}
				],
			};
		}
	const buildOptionForSellChart =
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
			const findBelowThresholdRanges = (metricData: number[], threshold: number[]): {
				start: number,
				end: number
			}[] => {
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
					top: 25,
				},
				legend: {
					data: [
						`${t('text_indicator')}`,
						`${t('text_dailyK')}`,
						{
							name: t('text_sell_area'), // 图例项名称
							icon: 'rect', // 图例项图标设置为矩形
							itemStyle: {
								color: sellAreaColor,
								opacity: 0.9
							}
						}
					],
					left: 'center',
					top: 55,
					itemStyle: {
						borderColor: "#008F28"
					},
				},
				grid: {
					top: '90', // 将图表的绘制区域向下移动，避免与legend重叠
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
						name: t('text_indicator'),
						scale: true,
						splitArea: {
							show: true
						}
					},
					{
						name: `${symbol}${t('text_price')}`,
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
						name: t('text_indicator'),
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
						name: t('text_dailyK'),
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
						name: t('text_threshold'),
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
					}, 
					{
						// 创建一个隐藏的 series 以模拟 markArea 的图例
						name: t('text_sell_area'),
						type: 'line',
						data: [],
						itemStyle: { color: sellAreaColor, opacity: 0.9 }
					}
				],
			} as EChartsOption;
		}
		return {
			buildOptionForBuyChart: buildOptionForBuyChart,
			buildOptionForSellChart: buildOptionForSellChart
		}
};
export default GlobalFunctions;