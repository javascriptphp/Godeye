import React, { useState } from "react";
import {
    Button,
    Card,
    Tooltip,
    message,
    ConfigProvider,
    Modal,
    Row,
    Col,
    Space,
    Divider,
    Flex,
} from "antd";
import {
    CheckOutlined,
    CloseOutlined,
    QuestionCircleOutlined,
    CopyOutlined,
    CopyTwoTone,
} from "@ant-design/icons";
import styled from "styled-components";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "@/components/Layout";
import { useTranslation } from "react-i18next";

const Pricing: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const [messageApi, contextHolder] = message.useMessage();
    const [showModal, setShowModal] = useState(false);

    // Define wallet addresses and email
    const OptimismAddress = "0x16fe461fca0c3cd993f2fa8ef8b7daf27909a72a";
    const TronAddress = "TCUrNtyVxS4ELtZSN5TvJQK4yN3EK4Xxue";
    const Email = "godeye2099@outlook.com";

    const handlePay = () => {
        setShowModal(true);
    };

    const handleSignup = async () => {
        router.push("/signup");
    };

    const handleOk = () => {
        messageApi.success("操作成功");
        setShowModal(false);
    };

    const handleCancel = () => {
        messageApi.info("操作已取消");
        setShowModal(false);
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        messageApi.success("复制成功");
    };

    return (
        <Layout>
            {contextHolder}
            <PageContainer>
                <ContentContainer>
                    <Title>{t("payPageTitle")}</Title>
                    <Subtitle>{t("alert")}</Subtitle>

                    <PricingContainer>
                        <PricingCard
                            title={t("primaryVersion")}
                            $isActive={false}
                        >
                            <PriceTag>
                                \
                                <StyledTooltip title={t("notePrimary")}>
                                    <QuestionCircleOutlined
                                        style={{
                                            marginLeft: "8px",
                                            fontSize: "16px",
                                            color: "#a0a0a0",
                                        }}
                                    />
                                </StyledTooltip>
                            </PriceTag>

                            <PriceDescription>
                                {t("descriptionPrimary")}
                            </PriceDescription>

                            <FeatureList>
                                <FeatureItem>
                                    {t("T1")}
                                    <FeatureIcon $available={true}>
                                        <CheckOutlined />
                                    </FeatureIcon>
                                </FeatureItem>
                                <FeatureItem>
                                    {t("T2")}
                                    <FeatureIcon $available={false}>
                                        <CloseOutlined />
                                    </FeatureIcon>
                                </FeatureItem>
                                <FeatureItem>
                                    {t("T3")}
                                    <FeatureIcon $available={false}>
                                        <CloseOutlined />
                                    </FeatureIcon>
                                </FeatureItem>
                            </FeatureList>

                            <ActionButton onClick={handleSignup}>
                                {t("signUpNow")}
                            </ActionButton>
                        </PricingCard>

                        <PricingCard
                            title={t("ultimateVersion")}
                            $isActive={true}
                        >
                            <PriceTag>{t("priceUltimate")}</PriceTag>

                            <PriceDescription>
                                {t("descriptionUltimate")}
                            </PriceDescription>

                            <FeatureList>
                                <FeatureItem>
                                    {t("T1")}
                                    <FeatureIcon $available={true}>
                                        <CheckOutlined />
                                    </FeatureIcon>
                                </FeatureItem>
                                <FeatureItem>
                                    {t("T2")}
                                    <FeatureIcon $available={true}>
                                        <CheckOutlined />
                                    </FeatureIcon>
                                </FeatureItem>
                                <FeatureItem>
                                    {t("T3")}
                                    <FeatureIcon $available={true}>
                                        <CheckOutlined />
                                    </FeatureIcon>
                                </FeatureItem>
                            </FeatureList>

                            <ActionButton $isPrimary onClick={handlePay}>
                                {t("upgrade")}
                            </ActionButton>
                        </PricingCard>
                    </PricingContainer>
                </ContentContainer>

                <Modal
                    open={showModal}
                    centered={true}
                    width={850}
                    title={<p>{t("subscriptionTitle")}</p>}
                    onCancel={handleCancel}
                    footer={[]}
                >
                    <Space direction="vertical" size={10}>
                        <Divider style={{ margin: "5px 0" }}></Divider>
                        <Flex justify={"space-between"} gap={"small"}>
                            <p style={{ margin: 0 }}>{t("paymentPlan")}</p>
                            <p style={{ margin: 0 }}>{t("ultimateVersion")}</p>
                        </Flex>
                        <Flex justify={"space-between"} gap={"small"}>
                            <p style={{ margin: 0 }}>{t("priceLabel")}</p>
                            <p style={{ margin: 0 }}>
                                <span style={{ color: "red" }}>
                                    {t("priceUltimate")}
                                </span>
                            </p>
                        </Flex>
                        <Flex justify={"right"} gap={"small"}>
                            <p style={{ margin: 0 }}>{t("noteUltimate")}</p>
                        </Flex>
                        <Divider style={{ margin: "5px 0" }}></Divider>
                        <p>
                            {t("subscriptionPrompt")}{" "}
                            <CopyTwoTone onClick={() => handleCopy(Email)} />
                        </p>
                        <Row
                            gutter={{ xs: 1, sm: 1, md: 2 }}
                            justify={"space-between"}
                        >
                            <Col span={12}>
                                <Space direction={"vertical"} size={0}>
                                    <p
                                        style={{
                                            margin: 0,
                                            fontWeight: "bolder",
                                        }}
                                    >
                                        {t("optimismAddress")}
                                    </p>
                                    <p style={{ margin: 0 }}>
                                        {t("optimismNote")}
                                    </p>
                                    <p style={{ margin: 0 }}>
                                        {OptimismAddress}{" "}
                                        <CopyTwoTone
                                            onClick={() =>
                                                handleCopy(OptimismAddress)
                                            }
                                        />
                                    </p>
                                </Space>
                            </Col>
                            <Col span={10}>
                                <Space direction={"vertical"} size={0}>
                                    <p
                                        style={{
                                            margin: 0,
                                            fontWeight: "bolder",
                                        }}
                                    >
                                        {t("tronAddress")}
                                    </p>
                                    <p style={{ margin: 0 }}>{t("tronNote")}</p>
                                    <p style={{ margin: 0 }}>
                                        {TronAddress}{" "}
                                        <CopyTwoTone
                                            onClick={() =>
                                                handleCopy(TronAddress)
                                            }
                                        />
                                    </p>
                                </Space>
                            </Col>
                        </Row>
                    </Space>
                </Modal>
            </PageContainer>
        </Layout>
    );
};

// Styled Components
const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
`;

const ContentContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

const Title = styled.h1`
    color: white;
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    font-family: "YouSheBiaoTiHei", sans-serif;
`;

const Subtitle = styled.p`
    color: #a0a0a0;
    font-size: 1rem;
    margin-bottom: 3rem;
`;

const PricingContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 2rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
`;

const PricingCard = styled(Card)<{ $isActive?: boolean }>`
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background: ${(props) =>
        props.$isActive ? "rgba(23, 35, 50, 0.85)" : "rgba(17, 25, 40, 0.75)"};
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.1);

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
    }

    .ant-card-head {
        border-bottom: none;
        padding: 1.5rem 1.5rem 0.5rem !important;
        background-color: ${(props) =>
            props.$isActive
                ? "rgba(23, 35, 50, 0.85)"
                : "rgba(17, 25, 40, 0.75)"};
    }

    .ant-card-head-title {
        color: white;
        font-size: 1.5rem;
        text-align: center;
        font-weight: bold;
        font-family: "YouSheBiaoTiHei", sans-serif;

        @media (max-width: 768px) {
            font-size: 1.3rem;
        }
    }

    .ant-card-body {
        padding: 1.5rem !important;

        @media (max-width: 768px) {
            padding: 1.2rem !important;
        }
    }
`;

const PriceTag = styled.div`
    font-size: 1.8rem;
    color: white;
    margin: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
        font-size: 1.5rem;
    }
`;

const PriceDescription = styled.p`
    color: #a0a0a0;
    font-size: 0.9rem;
    margin-bottom: 2rem;
    min-height: 80px;
    text-align: left;

    @media (max-width: 768px) {
        min-height: auto;
        margin-bottom: 1.5rem;
    }
`;

const FeatureList = styled.div`
    margin: 2rem 0;

    @media (max-width: 768px) {
        margin: 1.5rem 0;
    }
`;

const FeatureItem = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    color: white;
    justify-content: space-between;

    @media (max-width: 768px) {
        margin-bottom: 0.8rem;
        font-size: 0.95rem;
    }
`;

const FeatureIcon = styled.span<{ $available: boolean }>`
    margin-right: 0.5rem;
    color: ${(props) => (props.$available ? "#00ffa3" : "#ff4d4f")};
`;

const ActionButton = styled(Button)<{ $isPrimary?: boolean }>`
    width: 100%;
    height: 45px;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: bold;
    margin-top: 1rem;

    ${(props) =>
        props.$isPrimary
            ? `
    background-color: #00ffa3 !important;
    border-color: #00ffa3 !important;
    color: #0a0e14 !important;
    
    &:hover {
      background-color: #00cc82 !important;
      border-color: #00cc82 !important;
    }
  `
            : `
    background-color: transparent !important;
    border-color: #00ffa3 !important;
    color: #00ffa3 !important;
    
    &:hover {
      background-color: rgba(0, 255, 163, 0.1) !important;
    }
  `}
`;

const StyledTooltip = styled(Tooltip)`
    margin-left: 0.5rem;
`;

export default Pricing;
