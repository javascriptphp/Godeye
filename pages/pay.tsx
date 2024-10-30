import React, {useState} from 'react';
import {Alert, Button, Card, Col, Divider, Flex, List, message, Modal, Row, Space} from 'antd';
import {CheckOutlined, CloseOutlined, CopyTwoTone} from '@ant-design/icons';
import styled from 'styled-components';
import PageFrame from "@/components/PageFrame";
import copy from "copy-to-clipboard";
import {useTranslation} from "react-i18next";
import {useRouter} from "next/router";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;
const Container = styled.div`
    padding: 10px 50px 20px 50px;
`;

const Heading = styled.h1`
    text-align: center;
    font-size: 32px;
    margin-bottom: 35px;
`;

const CustomCard = styled(Card)`
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-color: #f9f8f7;

    .ant-card-head {
        font-size: 22px;
    }
`;

const Price = styled.h2`
    font-size: 18px;
    margin: 0;
`;

const Description = styled.p`
    font-size: 14px;
    height: 70px;
    color: #555;
`;
const Myp = styled.p`
    margin:0;

`;
const FooterContainer = styled.footer`
    text-align: center;
    padding: 10px 0;
    font-size: 12px;
    color: #999;
    font-family: Arial, sans-serif;
`;
const alterStyle: React.CSSProperties = {
	paddingLeft: 14,
	paddingRight: 14,
	paddingTop: 0,
	paddingBottom: 0,
	marginBottom: 20,
	fontSize: 12,
}
const Pricing = () => {
	const [showModal, setShowModal] = useState(false);
	const { t } = useTranslation();
	const router = useRouter();
	const plans = [
		{
			code: 'primary',
			title: t("primaryVersion"),
			price: t("price"),
			description: t("descriptionPrimary"),
			features: [
				{ text: t("T1"), available: true },
				{ text: t("T2"), available: false },
				{ text: t("T3"), available: false },
			],
		},
		{
			code: 'ultimate',
			title: t("ultimateVersion"),
			price: t("priceUltimate"),
			description: t("descriptionUltimate"),
			features: [
				{ text: t("T1"), available: true },
				{ text: t("T2"), available: true },
				{ text: t("T3"), available: true },
			],
		},
	];
	const handlePay = () => {
		setShowModal(true);
	}
	const handleSignup = async () => {
		await router.push('/signup')
	}
	const handleOk = () => {
		setShowModal(false);
	}
	const handleCancel = () => {
		setShowModal(false);
	}
	const OptimismAddress = '0x16fe461fca0c3cd993f2fa8ef8b7daf27909a72a';
	const TronAddress = 'TCUrNtyVxS4ELtZSN5TvJQK4yN3EK4Xxue';
	const Email = 'godeye2099@outlook.com';
	const handleCopy = (text: string) => {
		copy(text);
		message.success(t("copySuccessMessage")+": "+text).then(r => r)
	}

	return (
		<PageFrame>
			<Container>
				<Heading>{t("payPageTitle")}</Heading>
				<Row>
					<Col span={11} offset={7}>
						<Alert
							style={alterStyle}
							description={<div>
								<p><span style={{ fontSize: '18px' }}>⚠️</span> {t("alert")}
								</p>
							</div>}
							type="info"
						/>
					</Col>
				</Row>
				<Row gutter={[32, 32]} justify="center">
					{plans.map((plan, index) => (
						<Col xs={24} sm={24} md={12} lg={12} xl={7} key={index}>
							<CustomCard
								title={plan.title}
								bordered={false}
							>
								<Price>{plan.price}</Price>
								<div style={{height: '30px'}}>
								{plan.code === 'ultimate' ?
									<span style={{ fontSize: 12, color: '#888' }}>{t("noteUltimate")}</span> :
									<span style={{ fontSize: 12, color: '#888' }}>{t("notePrimary")}</span>
								}
								</div>
								<Divider />
								<Description>{plan.description}</Description>
								<List
									itemLayout="horizontal"
									dataSource={plan.features}
									renderItem={(item) => (
										<List.Item>
											<List.Item.Meta
												avatar={
													item.available ? (
														<CheckOutlined style={{ color: 'green' }} />
													) : (
														<CloseOutlined style={{ color: 'red' }} />
													)
												}
												title={item.text}
											/>
										</List.Item>
									)}
								/>
								{plan.code === 'primary' ?
									<Button type="default" onClick={handleSignup} block>{t("register")}</Button>
									: <Button type="primary" onClick={handlePay} block>{t("upgrade")}</Button>}
							</CustomCard>
						</Col>
					))}
				</Row>
				<Modal
					open={showModal}
					centered={true}
					width={850}
					title={<p>{t("subscriptionTitle")}</p>}
					onCancel={handleCancel}
					footer={[]}
				>
					<Space direction="vertical" size={10}>
						<Divider style={{ margin: "5px 0" }}></Divider>
						<Flex justify={"space-between"} gap={"small"}>
							<Myp>{t("paymentPlan")}</Myp>
							<Myp>{t("ultimateVersion")}</Myp>
						</Flex>
						<Flex justify={"space-between"} gap={"small"}>
							<Myp>{t("priceLabel")}</Myp>
							<Myp><span style={{ color: "red" }}>{t("priceUltimate")}</span></Myp>
						</Flex>
						<Flex justify={"right"} gap={"small"}>
							<Myp>{t("noteUltimate")}</Myp>
						</Flex>
						<Divider style={{ margin: "5px 0" }}></Divider>
						<p>
							{t("subscriptionPrompt")} <CopyTwoTone onClick={() => handleCopy(Email)} />
						</p>
						<Row gutter={{ xs: 1, sm: 1, md: 2 }} justify={"space-between"}>
							<Col span={12}>
								<Space direction={"vertical"} size={0}>
									<Myp style={{ fontWeight: "bolder" }}>{t("optimismAddress")}</Myp>
									<Myp>{t("optimismNote")}</Myp>
									<Myp>{OptimismAddress} <CopyTwoTone onClick={() => handleCopy(OptimismAddress)} /></Myp>
								</Space>
							</Col>
							<Col span={10}>
								<Space direction={"vertical"} size={0}>
									<Myp style={{ fontWeight: "bolder" }}>{t("tronAddress")}</Myp>
									<Myp>{t("tronNote")}</Myp>
									<Myp>{TronAddress} <CopyTwoTone onClick={() => handleCopy(TronAddress)} /></Myp>
								</Space>
							</Col>
						</Row>
					</Space>
				</Modal>
			</Container>
		</PageFrame>
	);
};

export default Pricing;
