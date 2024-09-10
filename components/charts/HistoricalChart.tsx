import React, {useEffect, useRef, useState} from "react";
import * as echarts from 'echarts';
import {BaseMetric, BUY} from "@/types";
import {getHistoricalData} from "@/service";
import {message} from "antd";
import {
	buildChartWithMetricAndPriceOptionForCreate,
	chartHeight,
	chartWidth,
	createChart
} from "@/utils/global_constant";


const HistoricalChart = ({symbol, metric}: { symbol: string, metric: string }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [metricData, setMetricData] = useState<number[]>([]);
	const [priceData, setPriceData] = useState<number[]>([]);
	const [threshold, setThreshold] = useState<number>(0);
	const [timestamps, setTimestamps] = useState<string[]>([]);

	const chartRef = useRef<echarts.ECharts | null>(null);  // Store chart instance in a ref
	const hasFetchedData = useRef(false);  // Track if data has been fetched

	// Fetch data and update the state
	useEffect(() => {
		const fetchData = async () => {
			const result = await getHistoricalData(symbol, metric);
			if (Array.isArray(result[metric])) {
				const _timestamps = result[metric].map((item: BaseMetric) => (
					new Date(item.timestamp).toLocaleDateString()
				));
				setTimestamps(_timestamps);
				const _buyMetricData = result[metric].map((item: BaseMetric) => (item.metric_value));
				setMetricData(_buyMetricData);
				const _buyPriceData = result[metric].map((item: BaseMetric) => (item.price));
				setPriceData(_buyPriceData);
			}
			if (typeof result[`${metric}_threshold`] === 'number') {
				setThreshold(result[`${metric}_threshold`] as number);
			}
		};

		if (!hasFetchedData.current) {
			hasFetchedData.current = true;
			fetchData().catch((error) => {
				message.error("Error in fetchData:", error);
			});
		}
	}, [symbol, metric]);
	useEffect(() => {
		const echartsOption = buildChartWithMetricAndPriceOptionForCreate({
			title: `${symbol} 历史数据`,
			metric: BUY,
			timestamps: timestamps,
			threshold: threshold,
			metricData: metricData,
			priceData: priceData,
		});
		createChart({chartRef, containerRef, echartsOption})

		// 用对象包装依赖对象，可以保证在所有元素都变化之后才执行副作用
	}, [timestamps, threshold, metricData, priceData]);  // Update chart when `data` or `symbol` changes

	return (
		<div>
			<div ref={containerRef} style={{width: chartWidth, height: chartHeight}}></div>
		</div>
	);
};

export default HistoricalChart;
