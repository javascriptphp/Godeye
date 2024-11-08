import React, {useEffect, useRef, useState} from "react";
import * as echarts from 'echarts';
import {EChartsOption} from 'echarts';
import {HistoricalSellData, HistoricalSellValues, isErrorTypeEnum, SELL} from "@/types";
import {getHistoricalData} from "@/service";
import {message} from "antd";
import {chartHeight, chartWidth, createChart} from "@/utils/global_constant";
import useStore from "@/utils/store";
import {useTranslation} from "react-i18next";
import GlobalFunctions from "@/utils/global_functions";


const HistoricalSellChart = ({symbol, metric}: { symbol: string, metric: string }) => {
	// console.log("historical", symbol, metric);
	const containerRef = useRef<HTMLDivElement>(null);
	const [metricData, setMetricData] = useState<number[]>([]);
	const [priceData, setPriceData] = useState<number[]>([]);
	const [priceValues, setPriceValues] = useState<number[][]>([][4]);
	const [threshold, setThreshold] = useState<number[]>([]);
	const [timestamps, setTimestamps] = useState<string[]>([]);
	const [messageApi, contextHolder] = message.useMessage();

	const chartRef = useRef<echarts.ECharts | null>(null);  // Store chart instance in a ref
	const hasFetchedData = useRef(false);  // Track if data has been fetched

	const {getUserContext} = useStore();
	const userContext = getUserContext();
	const {t} = useTranslation();
	const Functions = GlobalFunctions(t);
	const buildCustomerOption = function () {
		if (userContext && userContext.logined) {
			return {
				dataZoom: [
					{
						show: true,
						realtime: true,
						type: 'slider',
						start: 0,
						end: 100
					},
					{
						type: 'inside',
						realtime: true,
						start: 0,
						end: 100
					},
				],
			};
		} else {
			return {}
		}
	}

	// Fetch data and update the state
	useEffect(() => {
		const fetchData = async () => {
			const result = await getHistoricalData(symbol, metric);
			if (isErrorTypeEnum(result)) {

			} else {
				const nonNullResult = result as HistoricalSellData;
				const _timestamps = nonNullResult.values.map((item: HistoricalSellValues) => (
					new Date(item.timestamp).toLocaleDateString()
				));
				setTimestamps(_timestamps);
				const _buyMetricData = nonNullResult.values.map((item: HistoricalSellValues) => item.metric_value);
				setMetricData(_buyMetricData);

				const _priceValues: Array<Array<number>> = nonNullResult.values.map(data => [data.open, data.close, data.low, data.high]);
				setPriceValues(_priceValues);

				const _threshold = nonNullResult.values.map(data => data.threshold);
				setThreshold(_threshold);
			}
		};
		fetchData().then(r => r);
	}, [symbol, metric]);
	useEffect(() => {
		const _option = Functions.buildOptionForSellChart({
			title: t('t2Title'),
			symbol: symbol,
			metric: SELL,
			timestamps: timestamps,
			threshold: threshold,
			metricData: metricData,
			priceData: priceValues,
			watermark: (userContext && userContext.email) || t('watermarkText'),
			includeMark: true,
			kLine: t('text_dailyK')
		});
		const echartsOption = {
			..._option,
			...buildCustomerOption()
		} as EChartsOption;
		createChart({chartRef, containerRef, echartsOption})

		// 用对象包装依赖对象，可以保证在所有元素都变化之后才执行副作用
	}, [timestamps, threshold, metricData, priceData, t]);  // Update chart when `data` or `symbol` changes

	return (
		<div>
			{contextHolder}
			<div ref={containerRef} style={{width: chartWidth, height: chartHeight}}></div>
		</div>
	);
};

export default HistoricalSellChart;