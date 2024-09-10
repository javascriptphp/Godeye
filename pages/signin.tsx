import React from 'react';
import {Button, Input, Form, Alert, Space} from 'antd';
import styled from 'styled-components';
import {footerText} from "@/utils/global_constant";
import RichHeader from "@/components/RichHeader";


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
`;
const Container = styled.div`
    display: flex;
    height: 100vh;
    background-color: #fff;
`;

const LoginBox = styled.div`
    flex: 1;
    max-width: 400px;
    width: 100%;
    padding: 0 40px;
    margin-top: 80px;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
`;

const Subtitle = styled.p`
    text-align: center;
    color: #888;
    margin-bottom: 20px;
`;

const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
`;

const StyledInput = styled(Input)`
    margin-bottom: 20px;
    height: 40px;
`;

const StyledButton = styled(Button)`
    width: 100%;
    background-color: #2388ff;
    border: none;
    height: 40px;
    font-size: 16px;

    &:hover {
        background-color: #1677FF;
    }
`;

const LinkContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const Link = styled.a`
    color: #2388ff;
    font-size: 14px;

    &:hover {
        text-decoration: underline;
    }
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
const Login: React.FC = () => {
	const onFinish = (values: any) => {
		console.log('Success:', values);
	};

	return (
		<>
			<RichHeader/>
			<Wrapper>
				<LoginBox>
					<Title>Godeye 帐户登录</Title>
					<Subtitle>欢迎回来！请使用您的邮箱登录</Subtitle>
					<Alert
						style={alterStyle}
						description={<div>
							<p><span style={{fontSize: '18px'}}>⚠️</span>
								本网站已设置防外传水印，付费购买后仅限自己使用，禁止外传，否则永久封禁，原因是指标使用人数越多，指标准确度越低。希望理解和支持。
							</p>
							<p><span style={{fontSize: '18px'}}>⚠️</span>同时为了保证指标的精准度，当指标付费用户达到一定人数，我们将停止对外出售指标，仅服务老用户。
							</p>
						</div>}

						// showIcon
						type="info"
					/>
					<StyledForm onFinish={onFinish}>
						<Form.Item
							name="email"
							rules={[{required: true, message: '请输入您的邮箱!'}]}
						>
							<StyledInput placeholder="邮箱"/>
						</Form.Item>
						<Form.Item
							name="password"
							rules={[{required: true, message: '请输入您的密码!'}]}
						>
							<StyledInput.Password placeholder="密码"/>
						</Form.Item>
						<StyledButton type="primary" htmlType="submit">
							登 录
						</StyledButton>
					</StyledForm>
					<LinkContainer>
						<Link href="#">忘记密码?</Link>
						<Link href="/signup">立即注册</Link>
					</LinkContainer>
				</LoginBox>

				<FooterContainer>{footerText}</FooterContainer>
			</Wrapper>
		</>
	);
};

export default Login;
