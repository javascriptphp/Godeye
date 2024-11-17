import React, { useState } from "react";
import styled from "styled-components";
import EmailVerification from "@/components/login/EmailVerification";
import { footerText } from "@/utils/global_constant";
import RichHeader from "@/components/RichHeader";
import { Col, Row, Steps } from "antd";
import Register from "@/components/login/Register";
import { useTranslation } from "react-i18next";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Container = styled.div`
    width: 300px;
    margin: 100px auto;
    font-family: Arial, sans-serif;
`;

const Content = styled.div`
    flex: 1;
    margin-top: 100px;
`;

const FooterContainer = styled.footer`
    text-align: center;
    padding: 10px 0;
    font-size: 12px;
    color: #999;
    font-family: Arial, sans-serif;
`;

const stepStyle: React.CSSProperties = {
    marginTop: "150px",
    height: "50vh",
    minWidth: "100px",
};

export interface UserInfo {
    username: string;
    email: string;
    password: string;
}

const RegistrationForm = () => {
    const [isRegistered, setIsRegistered] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo>({
        email: "",
        password: "",
        username: "",
    });
    const [curStep, setCurStep] = useState(0);
    const { t } = useTranslation();

    const handleRegister = (userInfo: UserInfo) => {
        setCurStep(1);
        setIsRegistered(true); // 切换到验证页面
        setUserInfo(userInfo);
    };
    return (
        <Wrapper>
            <RichHeader />
            <Content>
                <Row>
                    <Col span={4} offset={3}>
                        <Steps
                            style={stepStyle}
                            size={"small"}
                            direction={"vertical"}
                            current={curStep}
                            items={[
                                {
                                    title: t("registrationStepTitle"),
                                },
                                {
                                    title: t("emailVerificationStepTitle"),
                                },
                            ]}
                        />
                    </Col>
                    <Col span={8} offset={1}>
                        <Container>
                            {isRegistered ? (
                                <EmailVerification userInfo={userInfo} />
                            ) : (
                                <Register onRegister={handleRegister} />
                            )}
                        </Container>
                    </Col>
                </Row>
            </Content>
            <FooterContainer>{footerText}</FooterContainer>
        </Wrapper>
    );
};

export default RegistrationForm;
