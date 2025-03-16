import React, { useState } from "react";
import styled from "styled-components";
import { footerText } from "@/utils/global_constant";
import { message } from "antd";
import EmailVerification from "@/components/login/EmailVerification";
import Register from "@/components/login/Register";
import { useTranslation } from "react-i18next";
import { getVerificationCode } from "@/service";

export interface UserInfo {
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const [isRegistered, setIsRegistered] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [userInfo, setUserInfo] = useState<UserInfo>({
        email: "",
        password: "",
    });
    const { t } = useTranslation();

    const handleRegister = async (info: UserInfo) => {
        if (!(await sendVerificationCode(info.email))) return;
        setIsRegistered(true);
        setUserInfo(info);
    };

    const sendVerificationCode = async (email: string) => {
        const res = await getVerificationCode(email, messageApi);
        if (res && res.code === 500) return false;
        messageApi.open({
            type: "success",
            content: t("verificationSuccess"),
            duration: 2,
        });
        return true;
    };

    return (
        <PageContainer>
            <MainContent>
                {contextHolder}
                <FormContainer>
                    {isRegistered ? (
                        <EmailVerification userInfo={userInfo} />
                    ) : (
                        <Register onRegister={handleRegister} />
                    )}
                </FormContainer>
            </MainContent>

            <Footer>{footerText}</Footer>
        </PageContainer>
    );
};

export default SignUp;

// 样式定义
const PageContainer = styled.div`
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    background-image: url("/images/background.webp");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
`;

const MainContent = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 20px;
`;

const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    width: 90%;
    max-width: 400px;
`;

const Footer = styled.footer`
    padding: 20px 0;
    width: 100%;
    color: rgba(255, 255, 255, 0.4);
    font-size: 12px;
    text-align: center;
`;
