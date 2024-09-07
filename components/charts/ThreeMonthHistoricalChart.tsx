import React, {useEffect, useRef, useState} from "react";
import * as echarts from 'echarts';
import {BaseMetric} from "@/types/BuyMetrics";
import {getThreeMonthData} from "@/service";
import {message} from "antd";


const ThreeMonthHistoricalChart = ({symbol}: { symbol: string }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [data, setData] = useState<{ name: string, value: [string, number] }[]>([]);
	const chartRef = useRef<echarts.ECharts | null>(null);  // Store chart instance in a ref
	const hasFetchedData = useRef(false);  // Track if data has been fetched

	// Fetch data and update the state
	useEffect(() => {
		const fetchData = async () => {
			const result = await getThreeMonthData(symbol);
			const processedData = result.buy.map((item: BaseMetric) => ({
				name: new Date(item.timestamp).toISOString().split('T')[0],
				value: [new Date(item.timestamp).toISOString().split('T')[0], item.price] as [string, number],
			}));

			setData(processedData);
		};

		// Prevent the request from being sent twice
		if (!hasFetchedData.current) {
			hasFetchedData.current = true;
			fetchData().catch((error) => {
				message.error("Error in fetchData:", error);
			});
		}
	}, [symbol]);  // Update data when `symbol` changes

	// Initialize and update the chart when data or symbol changes
	useEffect(() => {
		// Initialize chart if it hasn't been initialized yet
		if (!chartRef.current && containerRef.current) {
			chartRef.current = echarts.init(containerRef.current);
		}

		if (chartRef.current) {
			const option = {
				title: {
					text: `${symbol} 3-Month Historical Data`,
				},
				tooltip: {
					trigger: 'axis',
					formatter: function (params: any) {
						const date = new Date(params[0].name);
						return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} : ${params[0].value[1]}`;
					},
				},
				legend: {
					data: ['Price'],
				},
				xAxis: {
					type: 'time',
					splitLine: {show: false},
				},
				yAxis: {
					type: 'value',
					boundaryGap: [0, '100%'],
					splitLine: {show: true},
				},
				series: [
					{
						name: 'Price',
						type: 'line',
						showSymbol: false,
						data: data,
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

export default ThreeMonthHistoricalChart;
