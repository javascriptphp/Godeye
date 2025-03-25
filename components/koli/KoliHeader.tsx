import React from "react";
import {useTranslation} from "react-i18next";

export const KoliHeader = ({nick}: { nick: string }) => {
	const {t} = useTranslation(undefined, {lng:'zh'});
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
				{nick + " " + t('KoliHeader_koli')}
			</h1>

			{/* 副标题 */}
			<p style={{
				fontSize: 16,
				// color: 'rgba(0, 0, 0, 0.65)',
				lineHeight: 1.6,
				margin: 0
			}}>
				{t('KoliHeader_viceTitle')}
			</p>
		</div>
	);
}