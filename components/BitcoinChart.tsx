import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
	TooltipComponent,
	DataZoomComponent,
	GridComponent
} from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
import {Button, Modal, Space, Tag, Typography} from "antd";
import {CloseOutlined, LikeOutlined, MessageOutlined, ShareAltOutlined} from "@ant-design/icons";

// 注册必要组件
echarts.use([LineChart, TooltipComponent, DataZoomComponent, GridComponent, SVGRenderer]);
// 数据类型定义建议
interface TweetData {
	content: string;
	tags: string[];
	datetime: string;
	created_at: string;
	stats: {
		likes: number;
		comments: number;
		shares: number;
	};
	price: string;
	sentiment: string;
}
export const BitcoinChart = () => {
	const chartRef = useRef<HTMLDivElement>(null);
	const [data, setData] = useState<Array<{ date: string, price: number }>>([]);
	const [tweets, setTweets] = useState<Array<TweetData>>([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedTweet, setSelectedTweet] = useState<TweetData>();

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('your_csv_file_url_here'); // 替换为你的CSV文件URL
			const text = await response.text();
			const rows = text.split('\n').slice(1); // 跳过表头
			const parsedData = rows.map(row => {
				const columns = row.split(';');
				return {
					date: "new Date(columns[11]).getDate()", // timestamp字段
					price: parseFloat(columns[8]) // close字段
				};
			});
			setData(parsedData);
		};

		// fetchData();
		const fetchTweets = async () => {
			const response = await fetch('your_tweet_csv_file_url_here'); // 替换为你的Tweet CSV文件URL
			const text = await response.text();
			const rows = text.split('\n').slice(1); // 跳过表头
			const parsedTweets = rows.map(row => {
				const columns = row.split(',');
				return {
					created_at: columns[8], // 发表时间
					text: columns[1] // 帖子内容
				};
			});
			// setTweets(parsedTweets);
		};

		// fetchTweets();
		// 模拟比特币数据
	const mockData = [
		{ date: '2025-03-15', price: 80635.25 },
		{ date: '2025-03-16', price: 82857.38 },
		{ date: '2025-03-17', price: 82857.38 },
		{ date: '2025-03-18', price: 83722.36 },
		{ date: '2025-03-19', price: 84358.58 },
		{ date: '2025-03-20', price: 80635.25 },
		{ date: '2025-03-21', price: 82857.38 },
	];
	setData(mockData);
		// 模拟推文数据
	const mockTweets = [
		{
			content: "对今天的会议结果非常失望，我们需要更有效的沟通。",
			tags: ["#职场挑战", "#沟通问题"],
			datetime: "2025-03-15T11:10:00Z",
			created_at: "2025-03-15",
			stats: {
				likes: 75,
				comments: 40,
				shares: 10
			},
			price: "免费",
			sentiment: "负面"
		},
		{
			content: "有时候，生活中的小挫折也是成长的一部分。",
			tags: ["#成长经历", "#生活感悟"],
			datetime: "2025-03-16T14:20:00Z",
			created_at: "2025-03-16",
			stats: {
				likes: 120,
				comments: 30,
				shares: 35
			},
			price: "免费",
			sentiment: "中性"
		},
		{
			content: "学习新技能虽然艰难，但每一步都是值得的。",
			tags: ["#学习之路", "#技能提升"],
			datetime: "2025-03-17T19:45:00Z",
			created_at: "2025-03-17",
			stats: {
				likes: 95,
				comments: 15,
				shares: 20
			},
			price: "免费",
			sentiment: "中性"
		},
		{
			content: "今天天气真好，心情也跟着明朗起来了。",
			tags: ["#好天气", "#心情愉快"],
			datetime: "2025-03-18T10:30:00Z",
			created_at: "2025-03-18",
			stats: {
				likes: 150,
				comments: 25,
				shares: 45
			},
			price: "免费",
			sentiment: "正面"
		},
		{
			content: "刚刚完成了一项重要的工作，感觉所有的努力都得到了回报！",
			tags: ["#工作效率", "#成就感"],
			datetime: "2025-03-19T09:00:00Z",
			created_at: "2025-03-19",
			stats: {
				likes: 200,
				comments: 50,
				shares: 50
			},
			price: "免费",
			sentiment: "正面"
		}
	];
	setTweets(mockTweets);
	}, []);

	useEffect(() => {
		if (!chartRef.current) return;

		const chart = echarts.init(chartRef.current);
// 添加点击事件监听器
chart.on('click', (params) => {
	// 确保点击的是第一个系列（散点图）且数据有效
	console.log("click")
	if (params.seriesIndex === 1 && params.dataIndex !== undefined) {
	  const tweet = tweets[params.dataIndex];
	  setSelectedTweet(tweet);
	  setIsModalVisible(true);
	}
  });
		const option = {
			dataset: {
				source: data.map(d => [d.date, d.price])
			},
			xAxis: {
				type: 'category',
				axisLabel: {
						formatter: (value: string) => value // 直接使用日期字符串			
				}	
					
			},
			yAxis: { type: 'value' },
			tooltip: {
				trigger: 'axis',
				formatter: (params: any) => {
					const date = echarts.time.format(params[0].value[0], '{yyyy}-{MM}-{dd}', false);
					return `${date}<br/>价格: $${params[0].value[1].toFixed(2)}`;
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
				lineStyle: { color: '#1890ff' },
				areaStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: 'rgba(24,144,255,0.4)' },
						{ offset: 1, color: 'rgba(24,144,255,0.02)' }
					])
				},
				z: 1,
				
			}, 
				{
				type: 'scatter',
				symbolSize: 16, // 增大点击热区
				data: tweets.map((tweet, index) => [
				  tweet.created_at,
				  data[index]?.price
				]),itemStyle: {
					color: '#ff0000',
					borderColor: '#ffffff', // 白色描边
					borderWidth: 1.5          // 描边宽度
				  },
				  z: 2,
				tooltip: {
				  formatter: (params: any) => {
					const tweet = tweets[params.dataIndex];
					return `内容: ${tweet.content}<br/>时间: ${tweet.created_at}`;
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

		return () => {
			chart.dispose();
			chart.off('click'); // 解除事件绑定
			window.removeEventListener('resize', handleResize);
		};
	}, [data, tweets]);

	return (
		<>
			<div ref={chartRef} style={{ width: '100%', height: 700 }} />
			{isModalVisible && selectedTweet && (
				<Modal
				open={isModalVisible}
			onCancel={() => setIsModalVisible(false)}
			footer={null}
			closable={false}
			// width={screens.md ? 800 : '90%'}
			styles={{
				// body: { padding: '24px 32px' }
			}}
			>
		{/* 头部 */}
		<div style={{
			display: 'flex',
			justifyContent: 'space-between',
			// alignItems: 'center',
			marginBottom: 24
		}}>
			<Typography.Title level={3}>推文详情</Typography.Title>
			<Button
				type="text"
				icon={<CloseOutlined />}
				onClick={() => setIsModalVisible(false)}
				// style={{ color: '#ff4d4f' }}
			/>
		</div>

		{/* 内容布局 */}
		<div style={{
			display: 'grid',
			// gridTemplateColumns: screens.md ? '2fr 1fr' : '1fr',
			gap: 32
		}}>
			{/* 左侧主要内容 */}
			<div>
				<Typography.Paragraph style={{
					whiteSpace: 'pre-wrap',
					marginBottom: 16,
					lineHeight: 1.6
				}}>
					{selectedTweet.content}
				</Typography.Paragraph>

				<Space size={[8, 16]} wrap>
					{selectedTweet.tags.map(tag => (
						<Tag key={tag} bordered={false} style={{  }}>
							{tag}
						</Tag>
					))}
				</Space>
			</div>

			{/* 右侧元数据 */}
			<div>
				<Space direction="vertical" size={16}>
					<div>
						<Typography.Text type="secondary">{selectedTweet.datetime}</Typography.Text>
					</div>
						<Space size={24} style={{ marginTop: 12 }}>
							<div>
								<LikeOutlined style={{ color: '#8c8c8c' }} />
								<Typography.Text type="secondary" style={{ marginLeft: 8 }}>
									{selectedTweet.stats.likes}
								</Typography.Text>
							</div>
							<div>
								<MessageOutlined style={{ color: '#8c8c8c' }} />
								<Typography.Text type="secondary" style={{ marginLeft: 8 }}>
									{selectedTweet.stats.comments}
								</Typography.Text>
							</div>
							<div>
								<ShareAltOutlined style={{ color: '#8c8c8c' }} />
								<Typography.Text type="secondary" style={{ marginLeft: 8 }}>
									{selectedTweet.stats.shares}
								</Typography.Text>
							</div>
						</Space>
<Space size={36}>
					<div>
						<Typography.Text strong>比特币价格：</Typography.Text>
						<Typography.Text strong style={{ color: '#389e0d' }}>
							{selectedTweet.price}
						</Typography.Text>
					</div>

					<div>
						<Tag
							color="red"
							bordered={false}
							style={{
								background: '#fff1f0',
								border: '1px solid #ffccc7',
								color: '#cf1322'
							}}
						>
							情感分析：{selectedTweet.sentiment}
						</Tag>
					</div>
</Space>
				</Space>
			</div>
		</div>
		</Modal>
			)}
		</>
	);
};