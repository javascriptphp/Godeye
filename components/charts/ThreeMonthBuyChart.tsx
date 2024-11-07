import React, {useEffect, useRef, useState} from "react";
import * as echarts from 'echarts';
import {
	BUY,
	isErrorTypeEnum,
	ThreeMonthBuyData,
	ThreeMonthBuyValues,
	ThreeMonthData,
	ThreeMonthSellValues
} from "@/types";
import {getThreeMonthData} from "@/service";
import {message} from "antd";
import {
	chartHeight,
	chartWidth,
	createChart
} from "@/utils/global_constant";
import useStore from "@/utils/store";
import {useTranslation} from "react-i18next";
import GlobalFunctions from "@/utils/global_functions";


const ThreeMonthBuyChart = ({symbol, metric}: { symbol: string, metric: string }) => {
	// console.log("three",symbol,metric);
	const containerRef = useRef<HTMLDivElement>(null);
	const [metricData, setMetricData] = useState<number[]>([]);
	const [priceData, setPriceData] = useState<number[]>([]);
	const [threshold, setThreshold] = useState<number>(0);
	const [timestamps, setTimestamps] = useState<string[]>([]);

	const chartRef = useRef<echarts.ECharts | null>(null);  // Store chart instance in a ref
	const [messageApi, contextHolder] = message.useMessage();
	const {getUserContext} = useStore();
	const userContext = getUserContext();
	const { t } = useTranslation();
	const Functions = GlobalFunctions(t);
	// Fetch data and update the state
	useEffect(() => {
		const fetchData = async () => {
			const result = await getThreeMonthData(symbol, metric);
			if (isErrorTypeEnum(result)) {
				
			}else{
				const nonNullResult = result as ThreeMonthData;
				const _timestamps = nonNullResult.values.map((item: ThreeMonthBuyValues | ThreeMonthSellValues) => (
					new Date(item.timestamp).toLocaleDateString()
				));
				setTimestamps(_timestamps);
				const _buyMetricData = nonNullResult.values.map((item: ThreeMonthBuyValues | ThreeMonthSellValues) => (item.metric_value));
				setMetricData(_buyMetricData);
				const buyResult = nonNullResult as ThreeMonthBuyData;
				const _buyPriceData = buyResult.values.map((item: ThreeMonthBuyValues) => (item.price));
				setPriceData(_buyPriceData);
				setThreshold(nonNullResult.values[0].threshold);
			}
		};

		fetchData().then(data => data)
	}, [symbol, metric]);
	useEffect(() => {
		const echartsOption = Functions.buildOptionForBuyChart({
			title: t('t1Title'),
			symbol: symbol,
			metric: BUY,
			timestamps: timestamps,
			threshold: threshold,
			metricData: metricData,
			priceData: priceData,
			watermark: (userContext && userContext.email) || t('watermarkText'),
			includeMark: true,
		});
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

export default ThreeMonthBuyChart;
