import React from 'react';
import ReactECharts from 'echarts-for-react';
import {Row, Col, Card, List, Input, Tag, Typography} from 'antd';
import {EChartsOption} from "echarts";
import {BitcoinChart} from "@/components/BitcoinChart";
import {TweetCard} from "@/components/TweetCard";


// 修复后的饼图配置
const keywordsOption: EChartsOption = {
	title: {
		text: '关键词分布',
		left: 'center',
		textStyle: {
			color: '#ffffff'
		}
	},
	legend: {
		orient: 'vertical',
		left: 'left',
		textStyle: { // 新增此行
			color: '#ffffff' // 设置文字颜色为白色
		}
	},
	color: ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'],
	series: [{
		type: 'pie' as const,  // 明确饼图类型
		radius: ['60%', '80%'],
		label: {
			formatter: '{b}: {d}%'
		},
		data: [
			{ value: 35.98, name: 'bull market' },
			{ value: 22.66, name: 'reading' },
		]
	}]
};

// 情绪分析饼图（同样修复）
const sentimentOption: EChartsOption = {
	title: {
		text: '情绪分析',
		left: 'center',
		textStyle: {
			color: '#ffffff'
		}
	},
	legend: {
		orient: 'vertical',
		left: 'left',
		textStyle: { // 新增此行
			color: '#ffffff' // 设置文字颜色为白色
		}
	},
	color: ['#faad14', '#bfbfbf', '#f5222d'],
	series: [{
		type: 'pie' as const,
		radius: ['60%', '80%'],
		label: {
			formatter: '{b}: {d}%'
		},
		data: [
			{ value: 28.87, name: '正面' },
			{ value: 58.17, name: '中性' },
			{ value: 12.96, name: '负面' }
		]
	}]
};
const mockData = Array.from({ length: 90 }, (_, i) => ({
	timestamp: Date.now() - (89 - i) * 86400000,
	price: 30000 + Math.random() * 5000
}));

const { Text, Link } = Typography;
export default function DJMIPage() {
	return (
		<div style={{padding: '20px 100px'}}>
			{/* 标题区块 - 新增部分 */}
			<div style={{
				textAlign: 'center',
				maxWidth: 800,
				margin: '40px auto',
				padding: '0 24px'
			}}>
				{/* 主标题 */}
				<h1 style={{
					fontSize: 32,
					fontWeight: 600,
					// color: 'rgba(0, 0, 0, 0.85)',
					lineHeight: 1.4,
					marginBottom: 16
				}}>
					杜均指数（DJMI）
				</h1>

				{/* 副标题 */}
				<p style={{
					fontSize: 16,
					// color: 'rgba(0, 0, 0, 0.65)',
					lineHeight: 1.6,
					margin: 0
				}}>
					本指数旨在分析KOL过去5年推文与比特币行情的关联
				</p>
			</div>

			<Card>
				{/*<ReactECharts*/}
				{/*	option={bitcoinOption}*/}
				{/*	style={{height: 500}}*/}
				{/*	opts={{renderer: 'svg'}}*/}
				{/*/>*/}
				<BitcoinChart/>
			</Card>

			<Row gutter={24} style={{marginTop: 24}}>
				<Col span={12}>
					<Card>
						<ReactECharts
							option={keywordsOption}
							style={{height: 400}}
						/>
					</Card>
				</Col>
				<Col span={12}>
					<Card>
						<ReactECharts
							option={sentimentOption}
							style={{height: 400}}
						/>
					</Card>
				</Col>
			</Row>

			<Card style={{marginTop: 24}}>
			<TweetCard/>
			</Card>
			
			{/* 新增Footer部分 */}
			<footer style={{
				marginTop: '50px',
				// background: '#ffffff',
				// borderTop: '1px solid #f0f0f0',
				padding: '40px 24px 24px'
			}}>
				{/* 主体内容区域 */}
				<Row gutter={48} justify="space-between">
					{/* 关于杜均指数 */}
					<Col xs={24} md={11} style={{marginBottom: 24}}>
						<div style={{textAlign: 'left'}}>
							<Text strong style={{
								display: 'block',
								fontSize: 16,
								// color: 'rgba(0, 0, 0, 0.85)',
								marginBottom: 12
							}}>
								关于KOL指数（KOLI）
							</Text>
							<Text type="secondary" style={{
								fontSize: 12,
								lineHeight: '22px',
								// color: 'rgba(0, 0, 0, 0.65)'
							}}>
								KOL指数灵感来自杜均先生和不管不理的员的<Link href={""}>这条推文</Link>，通过实现KOL推文和比特币走势的可视化，帮助用户快速了解KOL和洞察市场行情的变化。
								<br/>
								对于早期捐赠用户和优质KOL我们未来将进行大量空投。捐赠地址(仅限usdt，不少于10usdt):
								<br/>
								TRC20 ：TCUrNtyVxS4ELtZSN5TvJQK4yN3EK4Xxue
								<br/>
								Ethereum/Optimism/Arbitrum ：0x16fe461fca0c3cd993f2fa8ef8b7daf27909a72a
							</Text>
						</div>
					</Col>

					{/* 相关链接 */}
					<Col xs={24} md={7} style={{marginBottom: 24}}>
						<div style={{textAlign: 'left'}}>
							<Text strong style={{
								display: 'block',
								fontSize: 16,
								// color: 'rgba(0, 0, 0, 0.85)',
								marginBottom: 12
							}}>
								相关链接
							</Text>
							<div style={{lineHeight: '28px'}}>
								<Link
									href="https://x.com/LongLongLongBTC/status/1900130458467524904"
									target="_blank"
									style={{fontSize: 12}}
								>
									KOL指数灵感来源
								</Link>
								<br/>
								<Link
									href="https://x.com/virtuals_io"
									target="_blank"
									style={{fontSize: 12, }}
								>
									Virtuals protocol
								</Link>
								<br/>
								<Link
									href="https://x.com/Godeye_Agent2"
									target="_blank"
									style={{fontSize: 12, }}
								>
									Godeye AI agent
								</Link>
							</div>
						</div>
					</Col>

					{/* 联系我们 */}
					<Col xs={24} md={6} style={{marginBottom: 24}}>
						<div style={{textAlign: 'left'}}>
							<Text strong style={{
								display: 'block',
								fontSize: 16,
								// color: 'rgba(0, 0, 0, 0.85)',
								marginBottom: 12
							}}>
								联系我们
							</Text>
							<div style={{lineHeight: '28px'}}>
								<Text style={{fontSize: 12, }}>
									godeye2099@outlook.com
								</Text>
								<br/>
								<Link
									href="https://x.com/Godeye_Agent2"
									target="_blank"
									style={{fontSize: 12, }}
								>
									Godeye AI agent
								</Link>
							</div>
						</div>
					</Col>
				</Row>

				{/* 底部信息栏 */}
				<div style={{
					textAlign: 'center',
					marginTop: 24,
					borderTop: '1px solid #f0f0f0',
					paddingTop: 24
				}}>
					<Text type="secondary" style={{
						fontSize: 12,
						// color: 'rgba(0, 0, 0, 0.45)'
					}}>
						powered by Virtuals protocol
						<br/>
						©2025 KOL指数 KOLI
					</Text>
				</div>
			</footer>
		</div>
	)
}