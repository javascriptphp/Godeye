import React from 'react';
import { Button, Input, Form, Alert, Space, Typography, Layout, message } from 'antd';
import styled from 'styled-components';
import { footerText } from "@/utils/global_constant";
import RichHeader from "@/components/RichHeader";
import {invokeLogin, LoginInfo} from "@/service";
import {useRouter} from "next/router";
import useStore from "@/utils/store";
import {useTranslation} from "react-i18next";

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
	const [messageApi, contextHolder] = message.useMessage();
	const {loginHandler} = useStore();
	const { t } = useTranslation();
	const onFinish = (values: any) => {
		const loginInfo = form.getFieldsValue(['email','password']) as LoginInfo;
		invokeLogin(loginInfo, loginHandler, messageApi).then((isSuccess) => {
			if (isSuccess) {
				message.success(t('signInSuccessfully')).then(r => r);
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
					{contextHolder}
					<LoginBox>
						<Title level={3} style={{ textAlign: 'center' }}>{t('signInTitle')}</Title>
						<Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: 20 }}>
							{t('signInWelcome')}
						</Text>

						<Alert
							style={alterStyle}
							description={
								<div>
									<p><span style={{ fontSize: '18px' }}>⚠️</span> <span style={{color: 'red'}}> {t("signInWarning")}</span></p>
								</div>
							}
							type="info"
						/>

						<Form onFinish={onFinish} layout="vertical" form={form}>
							<Form.Item
								name="email"
								rules={[{ required: true, message: t("emailRequiredWarning") }]}
							>
								<Input placeholder="邮箱" size="large" />
							</Form.Item>
							<Form.Item
								name="password"
								rules={[{ required: true, message: t("passwordRequiredWarning") }]}
							>
								<Input.Password placeholder="密码" size="large" />
							</Form.Item>
							<StyledButton type="primary" htmlType="submit">
								{t('signInButtonText')}
							</StyledButton>
						</Form>

						<Space style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
							<Link href="#">{t('passwordForget')}</Link>
							<Link href="/signup">{t('signUpNow')}</Link>
						</Space>
					</LoginBox>
				</Content>

				<FooterContainer>{footerText}</FooterContainer>
			</Wrapper>
		</>
	);
};

export default Login;
