import React, {useEffect, useRef, useState} from "react";
import * as echarts from 'echarts';
import {
	HistoricalBuyValues,
	HistoricalData,
	HistoricalSellValues,
	isErrorTypeEnum,
	SELL,
	ThreeMonthSellData,
	ThreeMonthSellValues
} from "@/types";
import {getThreeMonthData} from "@/service";
import {message} from "antd";
import {chartHeight, chartWidth, createChart} from "@/utils/global_constant";
import useStore from "@/utils/store";
import {useTranslation} from "react-i18next";
import GlobalFunctions from "@/utils/global_functions";


const HistoricalChart = ({symbol, metric}: { symbol: string, metric: string }) => {
	// console.log("historical", symbol, metric);
	const upColor = '#00da3c';
	const downColor = '#ec0000';
	const containerRef = useRef<HTMLDivElement>(null);
	const [metricData, setMetricData] = useState<number[]>([]);
	const [openVal, setOpenVal] = useState<number[]>([]);
	const [highVal, setHighVal] = useState<number[]>([]);
	const [lowVal, setLowVal] = useState<number[]>([]);
	const [priceValues, setPriceValues] = useState<number[][]>([][4]);
	const [closeVal, setCloseVal] = useState<number[]>([]);
	const [threshold, setThreshold] = useState<number[]>([]);
	const [timestamps, setTimestamps] = useState<string[]>([]);
	const [messageApi, contextHolder] = message.useMessage();
	const { t } = useTranslation();
	const Functions = GlobalFunctions(t);

	const chartRef = useRef<echarts.ECharts | null>(null);  // Store chart instance in a ref
	const hasFetchedData = useRef(false);  // Track if data has been fetched

	const {userContext} = useStore();

	// Fetch data and update the state
	useEffect(() => {
		const fetchData = async () => {
			const result = await getThreeMonthData(symbol, metric);
			if (isErrorTypeEnum(result)) {

			} else {
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
				const _threshold = sellResult.values.map((item: ThreeMonthSellValues) => item.threshold);
				setThreshold(_threshold);

				const _priceValues = sellResult.values.map((item: ThreeMonthSellValues) => [item.open, item.close, item.low, item.high]);
				setPriceValues(_priceValues);
			}
		};
		//
		// if (!hasFetchedData.current) {
		// 	hasFetchedData.current = true;
		fetchData().then(r => r)
		// }
	}, [symbol, metric]);
	useEffect(() => {
		const echartsOption = Functions.buildOptionForSellChart({
			title: t("t1Title"),
			symbol: symbol,
			metric: SELL,
			timestamps: timestamps,
			threshold: threshold,
			metricData: metricData,
			priceData: priceValues,
			watermark: (userContext && userContext.email) || t('watermarkText'),
			includeMark: true,
		})
		createChart({chartRef, containerRef, echartsOption})

		// 用对象包装依赖对象，可以保证在所有元素都变化之后才执行副作用
	}, [timestamps, threshold, metricData, closeVal, t]);  // Update chart when `data` or `symbol` changes

	return (
		<div>
			{contextHolder}
			<div ref={containerRef} style={{width: chartWidth, height: chartHeight}}></div>
		</div>
	);
};

export default HistoricalChart;
