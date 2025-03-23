import React from "react";

export const KoliHeader = () => {
	return (
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
				KOL指数（KOLI）
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
	);
}