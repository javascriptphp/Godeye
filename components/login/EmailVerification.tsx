import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {UserInfo} from "@/pages/signup";
import {Checkbox, Form, Input, message} from "antd";
import {SubmitButton} from "@/components/login/SubmitButton";
import {getVerificationCode, invokeLogin, invokeRegister} from "@/service";
import {useRouter} from "next/router";
import useStore from "@/utils/store";

const VerificationWrapper = styled.div`
    padding: 20px;
    min-height: 80vh;
`;

const VerificationTitle = styled.h2`
    margin-bottom: 10px;
`;

const VerificationDescription = styled.p`
    margin-bottom: 20px;
    color: #666;
    font-size: 14px;
`;


const ResendCodeContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    font-size: 14px;
    color: #666;
`;

const Timer = styled.span`
    margin-left: 10px;
    font-size: 14px;
    color: #999;
`;


const ResendLink = styled.a`
    color: #1677FF;
    text-decoration: none;
    margin-top: 20px;
    font-size: 14px;
`;
const formItemLayout = {
	labelCol: {
		xs: {span: 24},
		md: {span: 24, offset: 0},
		sm: {span: 8},
	},
	wrapperCol: {
		xs: {span: 24},
		md: {span: 24},
		sm: {span: 16},
	},
};

const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0,
		},
		md: {
			span: 24,
			offset: 0,
		},
		sm: {
			span: 16,
			offset: 8,
		},
	},
};

const EmailVerification = ({userInfo}: { userInfo: UserInfo }) => {

	const [form] = Form.useForm();
	const {loginHandler} = useStore();
	const [verificationCode, setVerificationCode] = useState('');
	const [timer, setTimer] = useState(60);
	const [canResend, setCanResend] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();

	useEffect(() => {
		const countdown = setInterval(() => {
			setTimer((prevTimer) => {
				if (prevTimer === 1) {
					clearInterval(countdown);
					setCanResend(true);
					return 0;
				}
				return prevTimer - 1;
			});
		}, 1000);

		return () => clearInterval(countdown);
	}, []);

	useEffect(() => {
		if (userInfo && userInfo.email) {
			getVerificationCode(userInfo.email, messageApi)
				.then((isSuccess) => {
					if (isSuccess) {
						messageApi.open({
							type: "success",
							content: "验证码发送成功",
							duration: 2
						}).then(r => r)
					}
				})
		}
	}, []);
	const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setVerificationCode(e.target.value);
	};

	const router = useRouter();
	const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
		invokeRegister({...userInfo, verification_code: form.getFieldValue('verification_code')}, messageApi)
			.then((isSuccess) => {
				if (isSuccess) {
					// 注册且登录成功，返回主页
					invokeLogin(userInfo, loginHandler).then((isSuccess) => {
						if (isSuccess) {
							message.info("注册成功，已为您自动登录~").then(r => router.push("/"))
						}
					})
				}
			});
	};

	const handleResendCode = () => {
		if (canResend) {
			// 重新发送验证码的逻辑
			if (userInfo && userInfo.email) {
				getVerificationCode(userInfo.email, messageApi)
					.then((isSuccess) => {
						if (isSuccess) {
							setTimer(60);
							setCanResend(false);
							messageApi.open({
								type: "success",
								content: "验证码发送成功",
								duration: 2
							}).then(r => r)
						}
					})
			}
		}
	};

	return (
		<VerificationWrapper>
			{contextHolder}
			<VerificationTitle>邮箱验证</VerificationTitle>
			<VerificationDescription>
				请输入您在邮箱收到的6位验证码，验证码30分钟有效
			</VerificationDescription>
			<Form
				{...formItemLayout}
				form={form}
				name="register"
				onFinish={handleSubmit}
				style={{maxWidth: 600}}
				layout="vertical"
				scrollToFirstError
			>
				<Form.Item
					name="verification_code"
					label="验证码"
					rules={[
						{required: true, message: '请输入验证码', whitespace: true}
					]}
					hasFeedback
				>
					<Input/>
				</Form.Item>
				<Form.Item>
					<ResendCodeContainer>
						验证码已发送
						<Timer>
							{timer > 0 ? `${timer}s` :
								<ResendLink href="#" onClick={handleResendCode}>
									重新发送
								</ResendLink>
							}
						</Timer>
					</ResendCodeContainer>
				</Form.Item>
				<Form.Item {...tailFormItemLayout}>
					<SubmitButton form={form} style={{width: '100%'}}>提交</SubmitButton>
				</Form.Item>
			</Form>
		</VerificationWrapper>
	);
};

export default EmailVerification;
