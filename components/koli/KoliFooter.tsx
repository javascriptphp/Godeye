import {Col, Row, Typography} from "antd";
import React from "react";


const {Text, Link} = Typography;
export const KoliFooter = () => {
	return (
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
								style={{fontSize: 12,}}
							>
								Virtuals protocol
							</Link>
							<br/>
							<Link
								href="https://x.com/Godeye_Agent2"
								target="_blank"
								style={{fontSize: 12,}}
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
							<Text style={{fontSize: 12,}}>
								godeye2099@outlook.com
							</Text>
							<br/>
							<Link
								href="https://x.com/Godeye_Agent2"
								target="_blank"
								style={{fontSize: 12,}}
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
				borderTop: '1px solid #404040',
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
	);
}