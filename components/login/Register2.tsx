import React from 'react';
import styled from 'styled-components';
import {Checkbox, Form, Input} from "antd";
import {SubmitButton} from "@/components/login/SubmitButton";
import {RegisterInfo} from "@/service";
import {v4 as uuidv4} from 'uuid';
import {useTranslation} from "react-i18next";

const Title = styled.h2`
    margin-bottom: 10px;
`;

const Description = styled.p`
    margin-bottom: 20px;
    color: #666;
    font-size: 14px;
`;

const TermsLink = styled.a`
    color: #1677FF;
    text-decoration: none;
`;

const LoginLink = styled.p`
    margin-top: 20px;
    font-size: 14px;

    a {
        color: #1677FF;
        text-decoration: none;
    }
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

const Register = ({ onRegister } : { onRegister: (info: RegisterInfo) => void }) => {
	const [form] = Form.useForm();
	const { t } = useTranslation();
	const handleSubmit = () => {
		onRegister(form.getFieldsValue(['username', 'password', 'email']));
	};
	return (
		<>
			<Title>{t("accountDetailsTitle")}</Title>
			<Description>{t("accountDetailsDescription")}</Description>

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
					name="email"
					label={t("emailLabel")}
					rules={[
						{
							type: 'email',
							message: t("invalidEmailMessage"),
						},
						{
							required: true,
							message: t("requiredEmailMessage"),
						},
					]}
					hasFeedback
				>
					<Input />
				</Form.Item>

				<Form.Item
					name="password"
					label={t("passwordLabel")}
					rules={[
						{
							pattern: new RegExp('^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*_+,.?]).{8,16}$'),
							message: t("passwordRequirementsMessage"),
						},
						{
							required: true,
							message: t("requiredPasswordMessage"),
						},
					]}
					hasFeedback
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					name="username"
					label={t("usernameLabel")}
					initialValue={uuidv4()}
					style={{ display: 'none' }}
					rules={[]}
					hasFeedback
				>
					<Input />
				</Form.Item>

				<Form.Item
					name="agreement"
					valuePropName="checked"
					rules={[
						{
							validator: (_, value) =>
								value ? Promise.resolve() : Promise.reject(new Error(t("termsErrorMessage"))),
						},
					]}
					{...tailFormItemLayout}
				>
					<Checkbox>
						{t("termsCheckbox")} <TermsLink href="./terms.html">{t("termsLinkText")}</TermsLink>
					</Checkbox>
				</Form.Item>
				<Form.Item {...tailFormItemLayout}>
					<SubmitButton form={form} style={{ width: '100%' }}>{t("nextButton")}</SubmitButton>
				</Form.Item>
			</Form>
			<LoginLink>
				{t("alreadyRegisteredText")} <a href="/signin">{t("loginLinkText")}</a>
			</LoginLink>
		</>
	);
};

export default Register;
