import React from "react";
import {Row, Col, Button, Typography, Form, Space} from "antd";
import { TwitterOutlined, YoutubeOutlined, MailOutlined, FormOutlined, SendOutlined } from '@ant-design/icons';
import PageFrame from "@/components/PageFrame";
import styled from "styled-components";
import {useTranslation} from "react-i18next";

const Heading = styled.h1`
		margin: 60px 0;
    text-align: center;
    font-size: 32px;
`;

const ContactPage = () => {

	const { t } = useTranslation();
	return (
		<PageFrame>
			<Heading>{t("contactTitle")}</Heading>
			<Space direction="vertical" size={50} style={{ display: 'flex' }}>
			<Row justify="center">
				{/* Twitter */}
				<Col xs={24} sm={12} style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
					<Button
						type="default"
						icon={<TwitterOutlined />}
						block
						style={{
							height: '60px',
							backgroundColor: '#fff',
							borderColor: '#1890ff',
							color: '#1890ff',
							fontSize: '16px',
						}}
						className="custom-button"
						onClick={() => { window.open('https://x.com/btcnnn199?t=sTvR8AI1MmiIkx6OepZuRQ&s=09', '_blank')}}
					>
						{t("followTwitter")}
					</Button>
				</Col>
				{/*<Col xs={24} sm={1}></Col>*/}
				{/*<Col xs={24} sm={6} style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>*/}
				{/*	<Button*/}
				{/*		type="default"*/}
				{/*		icon={<SendOutlined />}*/}
				{/*		block*/}
				{/*		style={{*/}
				{/*			height: '60px',*/}
				{/*			backgroundColor: '#fff',*/}
				{/*			borderColor: '#1890ff',*/}
				{/*			color: '#1890ff',*/}
				{/*			fontSize: '16px',*/}
				{/*		}}*/}
				{/*		className="custom-button"*/}
				{/*	>*/}
				{/*		点击加入 Telegram*/}
				{/*	</Button>*/}
				{/*</Col>*/}

			</Row>
			<Row justify="center">
				{/* Twitter */}
				<Col xs={24} sm={12} style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
					<Button
						type="default"
						icon={<MailOutlined />}
						block
						style={{
							height: '60px',
							backgroundColor: '#fff',
							borderColor: '#1890ff',
							color: '#1890ff',
							fontSize: '16px',
						}}
						className="custom-button"
					>
						{t("emailContact")}
					</Button>
				</Col>
				{/*<Col xs={24} sm={1}></Col>*/}
				{/*<Col xs={24} sm={6} style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>*/}
				{/*	<Button*/}
				{/*		type="default"*/}
				{/*		icon={<FormOutlined />}*/}
				{/*		block*/}
				{/*		style={{*/}
				{/*			height: '60px',*/}
				{/*			backgroundColor: '#fff',*/}
				{/*			borderColor: '#1890ff',*/}
				{/*			color: '#1890ff',*/}
				{/*			fontSize: '16px',*/}
				{/*		}}*/}
				{/*		className="custom-button"*/}
				{/*	>*/}
				{/*		点击提交建议*/}
				{/*	</Button>*/}
				{/*</Col>*/}

			</Row>
			</Space>
		</PageFrame>
	);
};

export default ContactPage;
