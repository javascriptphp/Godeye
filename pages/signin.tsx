import React, { useState } from "react";
import { Button, Input, Form, message } from "antd";
import styled from "styled-components";
import { footerText } from "@/utils/global_constant";
import { invokeLogin } from "@/service";
import { useRouter } from "next/router";
import useStore from "@/utils/store";
import { useTranslation } from "react-i18next";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";
import { WalletProvider } from "@/components/wallet/WalletProvider";
import ConnectWalletModal from "@/components/wallet/ConnectWalletModal";

// 登录页面组件
const SignIn: React.FC = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const { loginHandler } = useStore();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [showWalletList, setShowWalletList] = useState(false);

    // 表单提交处理
    const onFinish = (values: any) => {
        setLoading(true);
        const loginInfo = form.getFieldsValue([
            "email",
            "password",
        ]) as LoginInfo;

        invokeLogin(loginInfo, loginHandler, messageApi)
            .then((data: any) => {
                if (data.email) {
                    message.success(t("signInSuccessfully"));
                    router.push("/");
                } else {
                    message.error(t("signInFailed"));
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onSignInWithWallet = () => {
        setShowWalletList(true);
    };

    return (
        <PageContainer>
            {contextHolder}

            {/* 登录卡片 */}
            <LoginCard>
                <LogoTitle>
                    <GreenText>Godeye {t("login")}</GreenText>
                </LogoTitle>
                <WelcomeText>{t("signInWelcome")}</WelcomeText>

                <SecurityNotice>{t("signInWarning")}</SecurityNotice>

                <Form form={form} onFinish={onFinish} layout="vertical">
                    <FormLabel>{t("emailLabel")}</FormLabel>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: t("emailRequiredWarning"),
                            },
                        ]}
                    >
                        <StyledInput
                            prefix={<MailIcon />}
                            placeholder={t("emailPlaceholder")}
                        />
                    </Form.Item>

                    <FormLabel>{t("passwordLabel")}</FormLabel>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: t("passwordRequiredWarning"),
                            },
                        ]}
                    >
                        <StyledPasswordInput
                            prefix={<LockIcon />}
                            placeholder={t("passwordPlaceholder")}
                        />
                    </Form.Item>

                    <ForgotPasswordLink>
                        {t("passwordForget")}
                    </ForgotPasswordLink>

                    <SubmitButton
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                    >
                        {t("signInButtonText")}
                    </SubmitButton>
                </Form>

                <SignupSection>
                    {t("noAccount")}{" "}
                    <Link href="/signup">{t("signUpNow")}</Link>
                </SignupSection>

                <SignInWithWalletButton
                    type="primary"
                    onClick={onSignInWithWallet}
                    loading={loading}
                >
                    {t("signInWithWalletButtonText")}
                </SignInWithWalletButton>
            </LoginCard>

            {showWalletList && (
                <WalletProvider>
                    <ConnectWalletModal
                        onClose={() => setShowWalletList(false)}
                    />
                </WalletProvider>
            )}

            <Footer>{footerText}</Footer>
        </PageContainer>
    );
};

export default SignIn;

// 样式定义
const PageContainer = styled.div`
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    background-image: url("/images/background.webp");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
`;

// 登录卡片
const LoginCard = styled.div`
    width: 90%;
    max-width: 400px;
    background: rgba(17, 23, 41, 0.7);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.05);
    z-index: 10;

    @media (max-width: 500px) {
        padding: 20px;
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

const WelcomeText = styled.p`
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 25px;
    font-size: 14px;
`;

const SecurityNotice = styled.div`
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

// 基础输入框样式
const inputStyles = `
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    height: 45px;
    color: white;
    
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

const StyledInput = styled(Input)`
    ${inputStyles}
`;

const StyledPasswordInput = styled(Input.Password)`
    ${inputStyles}

    // 特别处理密码框
    .ant-input-password-icon {
        color: rgba(255, 255, 255, 0.5);
    }

    .ant-input-password-icon:hover {
        color: #9ef886;
    }

    // 确保密码文本保持白色
    input.ant-input {
        color: white;
    }

    &:hover input.ant-input,
    input.ant-input:focus,
    input.ant-input:hover {
        color: white;
    }
`;

const MailIcon = styled(MailOutlined)`
    color: rgba(255, 255, 255, 0.5);
`;

const LockIcon = styled(LockOutlined)`
    color: rgba(255, 255, 255, 0.5);
`;

const ForgotPasswordLink = styled.div`
    text-align: right;
    margin-bottom: 20px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;

    &:hover {
        color: #9ef886;
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
    margin-bottom: 20px;
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
const SignInWithWalletButton = styled(Button)`
    width: 100%;
    height: 45px;
    background: linear-gradient(90deg, #b1fb83 0%, #28e89b 100%);
    border: none;
    border-radius: 6px;
    font-weight: 500;
    font-size: 16px;
    margin-top: 20px;
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

const SignupSection = styled.div`
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
    font-size: 14px;

    a {
        color: #9ef886;
        margin-left: 5px;

        &:hover {
            text-decoration: underline;
        }
    }
`;

const Footer = styled.footer`
    position: absolute;
    bottom: 20px;
    color: rgba(255, 255, 255, 0.4);
    font-size: 12px;
    text-align: center;
`;
