import React, { useState, useEffect } from "react";
import { Button, Input, Form, message } from "antd";
import styled from "styled-components";
import { MailOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { UserInfo } from "@/pages/signup";
import { invokeRegister } from "@/service";
interface EmailVerificationProps {
    userInfo: UserInfo;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ userInfo }) => {
    const [form] = Form.useForm();
    const router = useRouter();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    // 倒计时效果
    useEffect(() => {
        if (countdown > 0 && !canResend) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0 && !canResend) {
            setCanResend(true);
        }
    }, [countdown, canResend]);

    // 重新发送验证码
    const handleResendCode = () => {
        setLoading(true);

        // 模拟API调用
        setTimeout(() => {
            setLoading(false);
            setCanResend(false);
            setCountdown(60);
            message.success(t("verificationCodeResent"));
        }, 1000);
    };

    // 提交验证码
    const handleSubmit = (values: { verificationCode: string }) => {
        setLoading(true);

        // 完成注册流程
        const signupInfo = {
            email: userInfo.email,
            password: userInfo.password,
            username: userInfo.email.split("@")[0], // 使用邮箱前缀作为用户名
            verification_code: values.verificationCode, // 使用正确的属性名
        };

        invokeRegister(signupInfo, messageApi)
            .then((data: any) => {
                if (data && data.email) {
                    message.success(t("signUpSuccessfully"));
                    router.push("/signin");
                } else {
                    message.error(t("verificationFailed"));
                }
            })
            .catch(() => {
                message.error(t("verificationFailed"));
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <VerificationCard>
            {contextHolder}
            <LogoTitle>
                <GreenText>{t("emailVerificationTitle")}</GreenText>
            </LogoTitle>

            <EmailInfo>
                <MailIcon />
                <EmailText>{userInfo.email}</EmailText>
            </EmailInfo>

            <VerificationNotice>{t("verificationCodeSent")}</VerificationNotice>

            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <FormLabel>{t("verificationCodeLabel")}</FormLabel>
                <Form.Item
                    name="verificationCode"
                    rules={[
                        {
                            required: true,
                            message: t("verificationCodeRequired"),
                        },
                        {
                            len: 6,
                            message: t("verificationCodeLength"),
                        },
                    ]}
                >
                    <StyledInput maxLength={6} />
                </Form.Item>

                <ResendContainer>
                    {canResend ? (
                        <ResendButton
                            onClick={handleResendCode}
                            loading={loading}
                        >
                            {t("resendCode")}
                        </ResendButton>
                    ) : (
                        <CountdownText>
                            {t("resendCodeIn")} {countdown}s
                        </CountdownText>
                    )}
                </ResendContainer>

                <SubmitButton
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    icon={<CheckCircleOutlined />}
                >
                    {t("completeRegistration")}
                </SubmitButton>
            </Form>
        </VerificationCard>
    );
};

export default EmailVerification;

// 样式定义
const VerificationCard = styled.div`
    width: 400px;
    background: rgba(17, 23, 41, 0.7);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 40px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.05);

    @media (max-width: 500px) {
        width: 90%;
        padding: 30px;
    }
`;

const LogoTitle = styled.h1`
    font-size: 28px;
    font-weight: bold;
    color: white;
    margin-bottom: 5px;
    font-family: "YouSheBiaoTiHei", sans-serif;
`;

const GreenText = styled.span`
    color: #9ef886;
    margin-left: 8px;
`;

const EmailInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    padding: 10px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
`;

const EmailText = styled.span`
    color: white;
    font-weight: 500;
    margin-left: 10px;
    word-break: break-all;
`;

const VerificationNotice = styled.div`
    background: rgba(0, 0, 0, 0.2);
    border-left: 3px solid #9ef886;
    padding: 12px;
    margin-bottom: 25px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.5;
`;

const FormLabel = styled.label`
    display: block;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 8px;
    font-size: 14px;
`;

const StyledInput = styled(Input)`
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    height: 45px;
    color: white;
    font-size: 18px;
    text-align: center;
    letter-spacing: 8px;

    &:hover,
    &:focus {
        background: rgba(0, 0, 0, 0.2) !important;
        border-color: #9ef886;
        box-shadow: 0 0 0 2px rgba(158, 248, 134, 0.1);
    }

    .ant-input {
        background: rgba(0, 0, 0, 0.2) !important;
        color: white !important;
    }

    .ant-input-prefix {
        margin-right: 10px;
    }

    // 确保在所有状态下背景保持一致
    &.ant-input-affix-wrapper-focused,
    &:hover,
    &:focus,
    &:active {
        background: rgba(0, 0, 0, 0.2) !important;
    }

    // 确保输入框内部元素在所有状态下保持一致
    .ant-input,
    .ant-input:hover,
    .ant-input:focus,
    .ant-input:active,
    .ant-input-focused {
        background: rgba(0, 0, 0, 0.2) !important;
        color: white !important;
    }
`;

const ResendContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
`;

const CountdownText = styled.span`
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
`;

const ResendButton = styled(Button)`
    background: transparent;
    border: none;
    color: #9ef886;
    padding: 0;
    height: auto;
    font-size: 12px;

    &:hover {
        color: #b1fb83;
        background: transparent;
    }

    &:focus {
        color: #9ef886;
        background: transparent;
    }
`;

const SubmitButton = styled(Button)`
    width: 100%;
    height: 45px;
    background: linear-gradient(90deg, #b1fb83 0%, #28e89b 100%);
    border: none;
    border-radius: 6px;
    font-weight: 500;
    font-size: 16px;
    color: #000;

    &:hover {
        background: linear-gradient(90deg, #c5fc9e 0%, #3dfbad 100%);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(40, 232, 155, 0.3);
        color: #000;
    }

    &:active {
        transform: translateY(0);
    }

    &.ant-btn-loading {
        opacity: 0.8;
    }
`;

const MailIcon = styled(MailOutlined)`
    color: #9ef886;
    font-size: 18px;
`;
