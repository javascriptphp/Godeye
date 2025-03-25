import { EChartsOption } from "echarts";
import React, {useEffect, useRef, useState} from "react";
import * as echarts from "echarts/core";
import { PieChart } from "echarts/charts";
import { LegendComponent } from "echarts/components";

// 注册必要组件
echarts.use([PieChart, LegendComponent]);

export const KoliPieChart = ({ data,type }: { data: Array<string>, type: '关键词'|'情感' }) => {
	const chartRef = useRef<HTMLDivElement>(null);
	const [prevProps, setPrevProps] = useState({data});

	useEffect(() => {
		if (!chartRef.current || !data || data.length === 0) return;
		if (!data || data.length === 0) return;
		if (data === prevProps.data) return;
		setPrevProps({data});

		const chart = echarts.init(chartRef.current);

		// 统计各类别的数量
		const countMap: { [key: string]: number; } = {};
		data.forEach(item => {
			countMap[item] = (countMap[item] || 0) + 1;
		});

		// 转换为 ECharts 需要的数据格式 [类别, 数量]
		const chartData = Object.keys(countMap).map(key => ({
			name: key,
			value: countMap[key]
		}));

		const keywordsOption: EChartsOption = {
			title: {
				text: type+'分布',
				left: 'center',
				textStyle: {
					color: '#ffffff'
				}
			},
			legend: {
				orient: 'horizontal',
				left: 'center',
				top: 'bottom',
				data: chartData.map(item => item.name),
				textStyle: {
					color: '#ffffff' // 设置文字颜色为白色
				}
			},
			color: ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#99d8c9', '#ff6384', '#36a2eb'],
			series: [{
				type: 'pie' as const,  // 明确饼图类型
				radius: ['40%', '60%'],
				label: {
					formatter: '{b}: {d}%',
					color: '#ffffff' // 设置标签文字颜色为白色
				},
				data: chartData
			}]
		};

		chart.setOption(keywordsOption);
		const handleResize = () => {
			chart.resize();
		};

		window.addEventListener('resize', handleResize);

		// 清理函数
		return () => {
			window.removeEventListener('resize', handleResize);
			chart.dispose(); // 释放图表实例
		};
	}, [data]); // 添加 data 作为依赖项，以便在数据变化时重新渲染图表

	return (
		<>
			<div ref={chartRef} style={{ width: '100%', height: 600 }} />
		</>
	);
};