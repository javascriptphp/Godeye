import React from 'react';
import { Button, Input, Form, Alert, Space, Typography, Layout, message } from 'antd';
import styled from 'styled-components';
import { footerText } from "@/utils/global_constant";
import RichHeader from "@/components/RichHeader";
import {invokeLogin, LoginInfo} from "@/service";
import {useRouter} from "next/router";
import useStore from "@/utils/store";

const { Title, Text, Link } = Typography;
const { Footer, Content } = Layout;

const Wrapper = styled(Layout)`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
`;

const LoginBox = styled.div`
    width: 100%;
    max-width: 400px;
    padding: 40px;
		margin-top: 160px;
    background: #fff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
		border-radius: 5px;
`;

const StyledButton = styled(Button)`
    width: 100%;
    height: 40px;
    font-size: 16px;
`;

const alterStyle: React.CSSProperties = {
	padding: '0 14px',
	marginBottom: 20,
	fontSize: 12,
};

const FooterContainer = styled.footer`
    text-align: center;
    padding: 10px 0;
    font-size: 12px;
    color: #999;
`;

const Login: React.FC = () => {
	const [form] = Form.useForm();
	const router = useRouter();
	const {loginHandler} = useStore();
	const onFinish = (values: any) => {
		const loginInfo = form.getFieldsValue(['email','password']) as LoginInfo;
		invokeLogin(loginInfo, loginHandler).then((isSuccess) => {
			if (isSuccess) {
				message.success("登录成功~").then(r => r);
				router.push("/").then(r => r);
			}else{
				console.log("登录失败")
			}
		});
	};

	return (
		<>
			<RichHeader />
			<Wrapper>
				<Content>
					<LoginBox>
						<Title level={3} style={{ textAlign: 'center' }}>Godeye 帐户登录</Title>
						<Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: 20 }}>
							欢迎回来！请使用您的邮箱登录
						</Text>

						<Alert
							style={alterStyle}
							description={
								<div>
									<p><span style={{ fontSize: '18px' }}>⚠️</span> 本网站已设置防外传水印，付费购买后仅限自己使用，<span style={{color: 'red'}}> 禁止外传，否则永久封禁</span>，原因是指标使用人数越多，指标准确度越低。希望理解和支持。</p>
									<p><span style={{ fontSize: '18px' }}>⚠️</span> 同时为了保证指标的精准度，当指标付费用户达到一定人数，我们将停止对外出售指标，仅服务老用户。</p>
								</div>
							}
							type="info"
						/>

						<Form onFinish={onFinish} layout="vertical" form={form}>
							<Form.Item
								name="email"
								rules={[{ required: true, message: '请输入您的邮箱!' }]}
							>
								<Input placeholder="邮箱" size="large" />
							</Form.Item>
							<Form.Item
								name="password"
								rules={[{ required: true, message: '请输入您的密码!' }]}
							>
								<Input.Password placeholder="密码" size="large" />
							</Form.Item>
							<StyledButton type="primary" htmlType="submit">
								登 录
							</StyledButton>
						</Form>

						<Space style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
							<Link href="#">忘记密码?</Link>
							<Link href="/signup">立即注册</Link>
						</Space>
					</LoginBox>
				</Content>

				<FooterContainer>{footerText}</FooterContainer>
			</Wrapper>
		</>
	);
};

export default Login;
