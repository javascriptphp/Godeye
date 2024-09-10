import React from 'react';
import {Button, Input, Form} from 'antd';
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
    padding: 40px;
		margin-top: 120px;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
`;

const Subtitle = styled.p`
    text-align: center;
    color: #888;
    margin-bottom: 30px;
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
const Login: React.FC = () => {
	const onFinish = (values: any) => {
		console.log('Success:', values);
	};

	return (

		<Wrapper>
			<RichHeader/>
				<LoginBox>
					<Title>Godeye 帐户登录</Title>
					<Subtitle>欢迎回来！用您的邮箱登录</Subtitle>
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
	);
};

export default Login;
