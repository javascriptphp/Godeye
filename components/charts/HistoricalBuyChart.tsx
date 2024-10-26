import React, {useEffect, useRef, useState} from "react";
import * as echarts from 'echarts';
import {
	BUY,
	HistoricalBuyData,
	HistoricalBuyValues,
	HistoricalData,
	HistoricalSellValues,
	isErrorTypeEnum
} from "@/types";
import {getHistoricalData} from "@/service";
import {message} from "antd";
import { chartHeight, chartWidth, createChart} from "@/utils/global_constant";
import useStore from "@/utils/store";
import {useTranslation} from "react-i18next";
import GlobalFunctions from "@/utils/global_functions";


const HistoricalBuyChart = ({symbol, metric}: { symbol: string, metric: string }) => {
	console.log("historical",symbol,metric);
	const Functions = GlobalFunctions();
	const containerRef = useRef<HTMLDivElement>(null);
	const [metricData, setMetricData] = useState<number[]>([]);
	const [priceData, setPriceData] = useState<number[]>([]);
	const [threshold, setThreshold] = useState<number>(0);
	const [timestamps, setTimestamps] = useState<string[]>([]);
	const [messageApi, contextHolder] = message.useMessage();

	const chartRef = useRef<echarts.ECharts | null>(null);  // Store chart instance in a ref
	
	const {userContext} = useStore();

	const { t } = useTranslation();
	console.log("在historicalchart中拿到的usercontext",userContext)

	// Fetch data and update the state
	useEffect(() => {
		const fetchData = async () => {
			const result = await getHistoricalData(symbol, metric);
			if (isErrorTypeEnum(result)) {

			}else{
				const nonNullResult = result as HistoricalData;
				const _timestamps = nonNullResult.values.map((item: HistoricalBuyValues | HistoricalSellValues) => (
					new Date(item.timestamp).toLocaleDateString()
				));
				setTimestamps(_timestamps);
				const _buyMetricData = nonNullResult.values.map((item: HistoricalBuyValues | HistoricalSellValues) => (item.metric_value));
				setMetricData(_buyMetricData);
				// todo 处理sell data
				const buyResult = nonNullResult as HistoricalBuyData;
				const _buyPriceData = buyResult.values.map((item: HistoricalBuyValues) => (item.price));
				setPriceData(_buyPriceData);
				setThreshold(nonNullResult.values[0].threshold);
			}
		};
			fetchData().then(r => r)
	}, [symbol, metric]);
	useEffect(() => {
		
		const echartsOption = Functions.buildOptionForBuyChart({
			title: t('t2Title'),
			symbol: symbol,
			metric: BUY,
			timestamps: timestamps,
			threshold: threshold,
			metricData: metricData,
			priceData: priceData,
			watermark: (userContext && userContext.email) || t("watermarkText"),
			includeMark: true,
		});
		createChart({chartRef, containerRef, echartsOption})

		// 用对象包装依赖对象，可以保证在所有元素都变化之后才执行副作用
	}, [timestamps, threshold, metricData, priceData]);  // Update chart when `data` or `symbol` changes

	return (
		<div>
			{contextHolder}
			<div ref={containerRef} style={{width: chartWidth, height: chartHeight}}></div>
		</div>
	);
};

export default HistoricalBuyChart;
