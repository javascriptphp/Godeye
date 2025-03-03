import React, { useState } from "react";
import { Button, Input, Form, Checkbox } from "antd";
import styled from "styled-components";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { UserInfo } from "@/pages/signup";

interface RegisterProps {
    onRegister: (userInfo: UserInfo) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
    const [form] = Form.useForm();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [agreement, setAgreement] = useState(false);

    const handleSubmit = () => {
        if (!agreement) {
            form.setFields([
                {
                    name: "agreement",
                    errors: [t("agreementRequired")],
                },
            ]);
            return;
        }

        setLoading(true);

        // 获取表单数据
        const userInfo = form.getFieldsValue(["email", "password"]) as UserInfo;

        // 模拟API调用延迟
        setTimeout(() => {
            setLoading(false);
            onRegister(userInfo);
        }, 1000);
    };

    return (
        <RegisterCard>
            <LogoTitle>
                <GreenText>Godeye {t("register")}</GreenText>
            </LogoTitle>

            <SecurityNotice>{t("accountDetailsDescription")}</SecurityNotice>

            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <FormLabel>{t("emailLabel")}</FormLabel>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: t("emailRequiredWarning"),
                        },
                        {
                            type: "email",
                            message: t("emailFormatWarning"),
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
                        {
                            min: 8,
                            message: t("passwordLengthWarning"),
                        },
                    ]}
                >
                    <StyledPasswordInput
                        prefix={<LockIcon />}
                        placeholder={t("passwordPlaceholder")}
                    />
                </Form.Item>

                <AgreementContainer>
                    <StyledCheckbox
                        checked={agreement}
                        onChange={(e) => setAgreement(e.target.checked)}
                    >
                        {t("termsCheckbox")}{" "}
                        <Link href="/terms">{t("termsLinkText")}</Link>
                    </StyledCheckbox>
                </AgreementContainer>

                <SubmitButton
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                >
                    {t("nextButton")}
                </SubmitButton>
            </Form>

            <SigninSection>
                {t("alreadyRegisteredText")}{" "}
                <Link href="/signin">{t("login")}</Link>
            </SigninSection>
        </RegisterCard>
    );
};

export default Register;

// 样式定义
const RegisterCard = styled.div`
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
    background: rgba(0, 0, 0, 0.2) !important;
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
`;

const MailIcon = styled(MailOutlined)`
    color: rgba(255, 255, 255, 0.5);
`;

const LockIcon = styled(LockOutlined)`
    color: rgba(255, 255, 255, 0.5);
`;

const AgreementContainer = styled.div`
    margin-bottom: 20px;
`;

const StyledCheckbox = styled(Checkbox)`
    color: rgba(255, 255, 255, 0.7);

    .ant-checkbox-inner {
        background-color: rgba(0, 0, 0, 0.3);
        border-color: rgba(255, 255, 255, 0.3);
    }

    .ant-checkbox-checked .ant-checkbox-inner {
        background-color: #9ef886;
        border-color: #9ef886;
    }

    a {
        color: #9ef886;

        &:hover {
            text-decoration: underline;
        }
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

const SigninSection = styled.div`
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
