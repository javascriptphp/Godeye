import React, {useState} from 'react';
import {Row, Col, Card, Button, List, Divider, Alert, Modal, Space, Flex, message} from 'antd';
import {CheckOutlined, CloseOutlined, CopyOutlined, CopyTwoTone} from '@ant-design/icons';
import styled from 'styled-components';
import RichHeader from "@/components/RichHeader";
import {footerText} from "@/utils/global_constant";
import PageFrame from "@/components/PageFrame";
import copy from "copy-to-clipboard";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;
const Container = styled.div`
    padding: 10px 50px 20px 50px;
    //background-color: #f0f2f5;
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
    height: 60px;
    color: #555;
`;
const Myp = styled.p`
	margin:0;
		
`;
// const CustomButton = styled(Button)`
//     margin-top: 20px;
//     background-color: #1890ff;
//     border-color: #1890ff;
//     width: 100%;
// `;

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
	const plans = [
		{
			code: 'primary',
			title: '普通版',
			price: '免费',
			description: '为加密爱好者提供基本的链上和加密市场数据。仅包括 核心指标的免费历史数据和免费指标。',
			features: [
				{text: 'T1 指标', available: true},
				{text: 'T2 指标', available: false},
				{text: 'T3 指标', available: false},
			],
		},
		{
			code: 'ultimate',
			title: '上帝视角版',
			price: '199 美元/季',
			description: '为小白投资者提供最精准的加密市场趋势预测数据。让普通人也能通过大数据开启上帝视角，明牌操作。所有图表均可访问。',
			features: [
				{text: 'T1 指标', available: true},
				{text: 'T2 指标', available: true},
				{text: 'T3 指标', available: true},
			],
		},
	];
	const handlePay = () => {
		setShowModal(true);
	}
	const handleOk = () => {
		setShowModal(false);
	}
	const handleCancel = () => {
		setShowModal(false);
	}
	const OptimismAddress = '0x16fe461fca0c3cd993f2fa8ef8b7daf27909a72a';
	const TronAddress = 'TCUrNtyVxS4ELtZSN5TvJQK4yN3EK4Xxue';
	const handleCopy = (text : string) => {
		copy(text);
		message.success("已复制到剪贴板~").then(r => r)
	}

	return (
		<PageFrame>
			<Container>
				<Heading>选择适合您需求的计划</Heading>
				<Row>
					<Col span={11} offset={7}>
						<Alert
							style={alterStyle}
							description={<div>
								<p><span style={{fontSize: '18px'}}>⚠️</span>
									本产品是普通人能接触到的最精准的市场趋势提前预警指标，多家对冲基金已购买本产品用于加密市场趋势判断。
								</p>
							</div>}

							// showIcon
							type="info"
						/>
					</Col>
				</Row>
				<Row gutter={[32, 32]} justify="center">
					{plans.map((plan, index) => (
						<Col xs={24} sm={12} md={7} key={index}>
							<CustomCard
								title={plan.title}
								bordered={false}
							>
								<Price>{plan.price}</Price>
								<Divider/>
								<Description>{plan.description}</Description>
								<List
									itemLayout="horizontal"
									dataSource={plan.features}
									renderItem={(item) => (
										<List.Item>
											<List.Item.Meta
												avatar={
													item.available ? (
														<CheckOutlined style={{color: 'green'}}/>
													) : (
														<CloseOutlined style={{color: 'red'}}/>
													)
												}
												title={item.text}
											/>
										</List.Item>
									)}
								/>
								{plan.code === 'primary' ?
									<Button type="default" block>注册</Button>
									: <Button type="primary" onClick={handlePay} block>升级</Button>}
							</CustomCard>
						</Col>
					))}
				</Row>
				<Modal
					// style={{top: 350}}
					open={showModal}
					centered={true}
					width={850}
					title={<p>订阅</p>}
					onCancel={handleCancel}
					footer={[
						// <Button key="submit" type="primary" onClick={handleOk}>
						// 	确定
						// </Button>,
					]}
				>
					<Space direction="vertical"
					       size={10}
					>
						<Divider style={{margin: "5px 0"}}></Divider>
						<Flex justify={"space-between"} gap={"small"}>
							<Myp>计划</Myp>
							<Myp>专业版-季付</Myp>
						</Flex>
						<Flex justify={"space-between"} gap={"small"}>
							<Myp>价格</Myp>
							<Myp><span style={{color:"red"}}>199 美元</span></Myp>
						</Flex>
						<Divider style={{margin: "5px 0"}}></Divider>
						<p>
							将<span style={{color: "red"}}> 199 USDT </span>转入以下地址，然后发送<span style={{color: "red"}}>付款截图</span>、<span
							style={{color: "red"}}>付款地址</span>、<span style={{color: "red"}}>注册邮箱</span>到 godeye2099@outlook.com <CopyTwoTone onClick={() => handleCopy(TronAddress)}/>，我们将在1小时内开通您的会员权限。
						</p>
						<Row gutter={{ xs: 1, sm: 1, md: 2}} justify={"space-between"}>
							<Col span={12}>
								<Space direction={"vertical"} size={0}>
									<Myp style={{fontWeight: "bolder"}}>Optimism/Avalanche C-Chain</Myp>
									<Myp>（只接受USDT，手续费低，<span style={{color:"red"}}>推荐</span>）</Myp>
									<Myp>{OptimismAddress} <CopyTwoTone onClick={() => handleCopy(OptimismAddress)} /></Myp>
								</Space>
							</Col>

							<Col span={10} >
								<Space direction={"vertical"} size={0}>
									<Myp style={{fontWeight: "bolder"}}>Tron</Myp>
									<Myp>（只接受USDT，手续费较高，不推荐）</Myp>
									<Myp>{TronAddress} <CopyTwoTone onClick={() => handleCopy(TronAddress)}/></Myp>
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
