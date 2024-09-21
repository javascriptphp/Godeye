import React, {CSSProperties, useEffect, useState} from 'react';
import styled from 'styled-components';
import {Button, Checkbox, Form, FormInstance, Input, Tooltip} from "antd";
import {SubmitButton} from "@/components/login/SubmitButton";
import {RegisterInfo} from "@/service";



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


const Register = ({onRegister} : {onRegister: (info: RegisterInfo)=>void}) => {
	const [form] = Form.useForm();
	const handleSubmit = (e : React.ChangeEvent<HTMLInputElement>) => {
		onRegister(form.getFieldsValue(['username','password','email']));
	};
	return (
		<>
			<Title>输入帐户详细信息</Title>
			<Description>输入您帐户的详细信息和强密码以保护您的帐户</Description>
			
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
					label="邮箱"
					rules={[
						{
							type: 'email',
							message: '请输入合法的邮箱',
						},
						{
							required: true,
							message: '请输入邮箱',
						},
					]}
					hasFeedback
				>
					<Input />
				</Form.Item>

				<Form.Item
						name="password"
						label="密码"
						rules={[
							{
								pattern: new RegExp('^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*_+,.?]).{8,16}$'),
								message: '密码必须至少包含1个字母、1个数字、一个特殊字符（!@#$%^&*_+,.?），长度不小于8',
							},
							{
								required: true,
								message: '请输入密码',
							},
						]}
						hasFeedback
						>
					<Input.Password />
				</Form.Item>
				<Form.Item
					name="username"
					label="用户名"
					rules={[
						{
							pattern: new RegExp('^[a-zA-Z0-9]{6,16}$'),
							message: '用户名只能包含字母和数字，长度不小于6、不大于16',
						},
						{ required: true, message: '请输入用户名', whitespace: true }
					]}
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
								value ? Promise.resolve() : Promise.reject(new Error('必须阅读并同意服务条款')),
						},
					]}
					{...tailFormItemLayout}
				>
					<Checkbox>
						我已阅读并同意 Godeye 的 <TermsLink href="./terms.html">用户服务条款</TermsLink>
					</Checkbox>
				</Form.Item>
				<Form.Item {...tailFormItemLayout}>
					<SubmitButton form={form} style={{width: '100%'}}>下一步</SubmitButton>
				</Form.Item>
			</Form>
			<LoginLink>
				已经注册了？ <a href="/signin">登录</a>
			</LoginLink>
		</>
	);
};

export default Register;
