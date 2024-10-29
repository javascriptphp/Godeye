import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {UserInfo} from "@/pages/signup";
import {Form, Input, message} from "antd";
import {SubmitButton} from "@/components/login/SubmitButton";
import {getVerificationCode, invokeLogin, invokeRegister} from "@/service";
import {useRouter} from "next/router";
import useStore from "@/utils/store";
import {useTranslation} from "react-i18next";

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
		xs: { span: 24 },
		md: { span: 24, offset: 0 },
		sm: { span: 8 },
	},
	wrapperCol: {
		xs: { span: 24 },
		md: { span: 24 },
		sm: { span: 16 },
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

const EmailVerification = ({ userInfo }: { userInfo: UserInfo }) => {
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const { loginHandler } = useStore();
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
							content: t("verificationSuccess"),
							duration: 2
						}).then(r => r);
					}
				});
		}
	}, []);

	const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setVerificationCode(e.target.value);
	};

	const router = useRouter();
	const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
		invokeRegister({ ...userInfo, verification_code: form.getFieldValue('verification_code') }, messageApi)
			.then((isSuccess) => {
				if (isSuccess) {
					invokeLogin(userInfo, loginHandler, messageApi).then((isSuccess) => {
						if (isSuccess) {
							message.info(t("registrationSuccess")).then(r => router.push("/"));
						}
					});
				}
			});
	};

	const handleResendCode = () => {
		if (canResend) {
			if (userInfo && userInfo.email) {
				getVerificationCode(userInfo.email, messageApi)
					.then((isSuccess) => {
						if (isSuccess) {
							setTimer(60);
							setCanResend(false);
							messageApi.open({
								type: "success",
								content: t("verificationSuccess"),
								duration: 2
							}).then(r => r);
						}
					});
			}
		}
	};

	return (
		<VerificationWrapper>
			{contextHolder}
			<VerificationTitle>{t("verificationTitle")}</VerificationTitle>
			<VerificationDescription>{t("verificationDescription")}</VerificationDescription>
			<Form
				{...formItemLayout}
				form={form}
				name="register"
				onFinish={handleSubmit}
				style={{ maxWidth: 600 }}
				layout="vertical"
				scrollToFirstError
			>
				<Form.Item
					name="verification_code"
					label={t("verificationCodeLabel")}
					rules={[
						{ required: true, message: t("verificationCodeRequired"), whitespace: true }
					]}
					hasFeedback
				>
					<Input />
				</Form.Item>
				<Form.Item>
					<ResendCodeContainer>
						{t("verificationCodeSent")}
						<Timer>
							{timer > 0 ? `${timer}s` :
								<ResendLink href="#" onClick={handleResendCode}>
									{t("verificationResendLink")}
								</ResendLink>
							}
						</Timer>
					</ResendCodeContainer>
				</Form.Item>
				<Form.Item {...tailFormItemLayout}>
					<SubmitButton form={form} style={{ width: '100%' }}>{t("verificationSubmitButton")}</SubmitButton>
				</Form.Item>
			</Form>
		</VerificationWrapper>
	);
};

export default EmailVerification;
