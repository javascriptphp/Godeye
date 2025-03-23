import React, {useRef, useEffect, useState} from 'react';
import * as echarts from 'echarts/core';
import {LineChart, ScatterChart} from 'echarts/charts';
import {
	TooltipComponent,
	DataZoomComponent,
	GridComponent, TitleComponent
} from 'echarts/components';
import {SVGRenderer} from 'echarts/renderers';
import {BTCPrice, TweetPost} from "@/types";
import {formatTimestampToDate} from "@/utils/time";
import {TweetModal} from "@/components/koli/TweetModal";

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
export const BitcoinChart = ({prices, tweets}: { prices: BTCPrice[], tweets: TweetPost[] }) => {
	const chartRef = useRef<HTMLDivElement>(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedTweet, setSelectedTweet] = useState<TweetPost>();


	useEffect(() => {
		if (!chartRef.current) return;

		if (!prices || prices.length === 0 || !tweets || tweets.length === 0) return;
		console.log(prices)
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
					return `日期：${params[0].value[0]}<br/>价格: $${params[0].value[1].toFixed(2)}`;
				}
			},
			dataZoom: [{
				type: 'slider',
				xAxisIndex: 0,
				start: 0,
				end: 100,
				bottom: 20,
				height: 24,
				backgroundColor: '#f5f5f5',
				fillerColor: 'rgba(24,144,255,0.2)',
				borderColor: '#d9d9d9',
				handleStyle: {
					color: '#1890ff',
					borderWidth: 0
				}
			}],
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
					tooltip: {
						formatter: (params: any) => {
							const tweet = tweets[params.dataIndex];
							return `sentiment: ${tweet.sentiment}<br/>时间: ${tweet.createDate}`;
						}
					}
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
			<div ref={chartRef} style={{width: '100%', height: 700}}/>
			{isModalVisible && selectedTweet && (
				<TweetModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} prices={prices}
				            tweets={tweets} selectedTweet={selectedTweet}/>
			)}
		</>
	);
};