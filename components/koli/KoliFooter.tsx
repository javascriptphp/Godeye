import {Col, Row, Typography} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";


const {Text, Link} = Typography;
export const KoliFooter = () => {
	const {t} = useTranslation();
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
							{t('KoliFooter_aboutKoli')}
						</Text>
						<Text type="secondary" style={{
							fontSize: 12,
							lineHeight: '22px',
							// color: 'rgba(0, 0, 0, 0.65)'
						}}>
							{t('KoliFooter_aboutKoli_paragraph')}
							<br/>
							{t('KoliFooter_aboutKoli_donate')}
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
							{t('KoliFooter_relatedLinks')}
						</Text>
						<div style={{lineHeight: '28px'}}>
							<Link
								href="https://x.com/LongLongLongBTC/status/1900130458467524904"
								target="_blank"
								style={{fontSize: 12}}
							>
								{t('KoliFooter_koliInspire')}
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
							{t('KoliFooter_contactUs')}
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
					©2025 KOLI
				</Text>
			</div>
		</footer>
	);
}