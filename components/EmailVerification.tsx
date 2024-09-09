import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const VerificationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const VerificationForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VerificationInput = styled.input`
  width: 300px;
  padding: 8px;
  margin-bottom: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
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

const SubmitButton = styled.button`
  background-color: #ffd700;
  color: #000;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  width: 300px;
  font-size: 14px;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ResendLink = styled.a`
  color: #1677FF;
  text-decoration: none;
  margin-top: 20px;
  font-size: 14px;
`;

const EmailVerification = () => {
	const [verificationCode, setVerificationCode] = useState('');
	const [timer, setTimer] = useState(60);
	const [canResend, setCanResend] = useState(false);

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

	const handleCodeChange = (e) => {
		setVerificationCode(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Verification Code:', verificationCode);
	};

	const handleResendCode = () => {
		if (canResend) {
			setTimer(60);
			setCanResend(false);
			// 重新发送验证码的逻辑
			console.log('Resending code...');
		}
	};

	return (
		<VerificationWrapper>
			<VerificationTitle>邮箱验证</VerificationTitle>
			<VerificationDescription>
				请输入您在邮箱收到的6位验证码，验证码30分钟有效
			</VerificationDescription>
			<VerificationForm onSubmit={handleSubmit}>
				<VerificationInput
					type="text"
					value={verificationCode}
					onChange={handleCodeChange}
					placeholder="邮箱验证码"
				/>
				<ResendCodeContainer>
					验证码已发送
					<Timer>{timer > 0 ? `${timer}s` : '可以重新发送'}</Timer>
				</ResendCodeContainer>
				<SubmitButton type="submit" disabled={!verificationCode}>
					提交
				</SubmitButton>
			</VerificationForm>
			<ResendLink href="#" onClick={handleResendCode}>
				未收到验证码？
			</ResendLink>
		</VerificationWrapper>
	);
};

export default EmailVerification;
