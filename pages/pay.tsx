import React from 'react';
import {Row, Col, Card, Button, List, Divider} from 'antd';
import {CheckOutlined, CloseOutlined} from '@ant-design/icons';
import styled from 'styled-components';
import RichHeader from "@/components/RichHeader";
import {footerText} from "@/utils/global_constant";
import PageFrame from "@/components/PageFrame";

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
    color: #555;
`;

const CustomButton = styled(Button)`
    margin-top: 20px;
    background-color: #1890ff;
    border-color: #1890ff;
    width: 100%;
`;

const FooterContainer = styled.footer`
    text-align: center;
    padding: 10px 0;
    font-size: 12px;
    color: #999;
    font-family: Arial, sans-serif;
`;

const Pricing = () => {
	const plans = [
		{
			title: '普通版',
			price: '0 美元/年',
			description: '为加密爱好者提供基本的链上和加密市场数据。仅包括 核心指标的免费历史数据和免费指标。',
			features: [
				{text: 'T1 指标', available: true},
				{text: 'T2 指标', available: false},
				{text: 'CSV 下载', available: false},
			],
		},
		{
			title: '上帝视角版',
			price: '199 美元/年',
			description: '为小白投资者提供最精准的加密市场趋势预测数据。让普通人也能通过大数据开启上帝视角，明牌操作。所有图表均可访问。',
			features: [
				{text: 'T1 指标', available: true},
				{text: 'T2 指标', available: true},
				{text: 'CSV 下载', available: true},
			],
		},
	];

	return (
		<PageFrame>
			<Container>
				<Heading>选择适合您需求的计划</Heading>
				<Row gutter={[32,32]} justify="center">
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
								<CustomButton type="primary">注册</CustomButton>
							</CustomCard>
						</Col>
					))}
				</Row>
			</Container>
		</PageFrame>
	);
};

export default Pricing;
