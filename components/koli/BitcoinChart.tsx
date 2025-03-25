import React, {useEffect, useRef, useState} from 'react';
import * as echarts from 'echarts/core';
import {LineChart, ScatterChart} from 'echarts/charts';
import {DataZoomComponent, GridComponent, TitleComponent, TooltipComponent} from 'echarts/components';
import {SVGRenderer} from 'echarts/renderers';
import {BTCPrice, DataRange, TweetPost} from "@/types";
import {formatTimestampToDate} from "@/utils/time";
import {TweetModal} from "@/components/koli/TweetModal";
import {useTranslation} from "react-i18next";
import {Flex, Radio} from 'antd';
import useStore from "@/utils/store";

// 注册必要组件
echarts.use([LineChart, TooltipComponent, DataZoomComponent, GridComponent, SVGRenderer, TitleComponent, ScatterChart]);

const colorOfSentiment = (sentiment: string): string => {
	if (sentiment === '正面') {
		return "#993322";
	} else if (sentiment === '负面') {
		return "#229933";
	} else {
		return "#666666";
	}
};
export const BitcoinChart = ({prices, tweets, onSelectedRange}: { prices: BTCPrice[], tweets: TweetPost[], onSelectedRange: (range: number)=>void }) => {
	const [prevProps, setPrevProps] = useState({prices,tweets});
	const chartRef = useRef<HTMLDivElement>(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedTweet, setSelectedTweet] = useState<TweetPost>();
	const [dataRange, setDataRange] = useState<DataRange>(DataRange.ONE_YEAR); // 默认显示全部数据
	const {t} = useTranslation(undefined, {lng:'zh'});
	const { systemContext } = useStore();

	const handleRangeChange = (range: DataRange) => {
		setDataRange(range);
		// 这里可以根据range参数重新请求数据
		onSelectedRange(range.nYearsBefore)
	};

	useEffect(() => {
		if (!chartRef.current) return;
		if (!prices || prices.length === 0 || !tweets || tweets.length === 0) return;
		if (prices === prevProps.prices || tweets === prevProps.tweets) return;
		setPrevProps({prices,tweets});
		const chart = echarts.init(chartRef.current);
		// 添加点击事件监听器
		chart.on('click', (params) => {
			// 确保点击的是第一个系列（散点图）且数据有效
			if (params.seriesIndex === 1 && params.dataIndex !== undefined) {
				const tweet = tweets[params.dataIndex];
				setSelectedTweet(tweet);
				setIsModalVisible(true);
			}
		});
		
		const priceOfDate = Object.fromEntries(prices.map(item => [formatTimestampToDate(item.timestamp), item.price]));
		const option = {
			xAxis: {
				type: 'category',
				axisLabel: {
					formatter: (value: string) => value // 直接使用日期字符串			
				}
			},
			yAxis: {type: 'value'},
			tooltip: {
				trigger: 'axis',
				formatter: (params: any) => {
					if (!params || !params[0] || !params[0].value || params[0].value.length === 0 || !params[0].value[1]) return;
					return t('BitcoinChart_date')+`：${params[0].value[0]}<br/>`+t('BitcoinChart_price')+`: $${params[0].value[1].toFixed(2)}`;
				}
			},
			dataZoom: [
				{
					show: true,
					realtime: true,
					start: 0,
					end: 100,
				},
				{
					type: "inside",
					realtime: true,
					start: 0,
					end: 100,
				},
			],
			series: [
				{
					type: 'line',
					smooth: true,
					symbol: 'none',
					lineStyle: {color: '#1890ff'},
					areaStyle: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{offset: 0, color: 'rgba(24,144,255,0.4)'},
							{offset: 1, color: 'rgba(24,144,255,0.02)'}
						])
					},
					z: 1,
					data: prices.map(d => [formatTimestampToDate(d.timestamp), d.price]),
				},
				{
					type: 'scatter',
					symbolSize: 16, // 增大点击热区
					data: tweets.map((tweet) => [
						tweet.createDate,
						tweet.createDate ? priceOfDate[tweet.createDate] : 0
					]),
					itemStyle: {
						color: (params: any) => colorOfSentiment(tweets[params?.dataIndex].sentiment),
						borderColor: '#ffffff', // 白色描边
						borderWidth: 1.5          // 描边宽度
					},
					z: 2,
				},
			]
		};

		chart.setOption(option);

		const handleResize = () => {
			chart.resize();
		};

		window.addEventListener('resize', handleResize);
	}, [prices, tweets]);

	return (
		<>
			{/*<Flex justify="center" style={{ marginBottom: 16 }}>*/}
			{/*	<Radio.Group*/}
			{/*		value={dataRange}*/}
			{/*		onChange={(e) => handleRangeChange(e.target.value)}*/}
			{/*		buttonStyle="solid"*/}
			{/*	>*/}
			{/*		<Radio.Button value={DataRange.ONE_YEAR}>{DataRange.ONE_YEAR.showText['zh']}</Radio.Button>*/}
			{/*		<Radio.Button value={DataRange.TWO_YEARS}>{DataRange.TWO_YEARS.showText['zh']}</Radio.Button>*/}
			{/*		<Radio.Button value={DataRange.FIVE_YEARS}>{DataRange.FIVE_YEARS.showText['zh']}</Radio.Button>*/}
			{/*		<Radio.Button value={DataRange.ALL}>{DataRange.ALL.showText['zh']}</Radio.Button>*/}
			{/*	</Radio.Group>*/}
			{/*</Flex>*/}
			<div ref={chartRef} style={{width: '100%', height: 700}}/>
			{isModalVisible && selectedTweet && (
				<TweetModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} prices={prices}
				            tweets={tweets} selectedTweet={selectedTweet}/>
			)}
		</>
	);
};