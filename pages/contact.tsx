import React from "react";
import { Row, Col, Button, Card, Space } from "antd";
import { TwitterOutlined, MailOutlined } from "@ant-design/icons";
import Layout from "@/components/Layout";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const ContactCard = styled(Card)`
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    .ant-card-body {
        padding: 24px;
    }
`;

const CardTitle = styled.h3`
    text-align: center;
    margin-bottom: 30px;
    font-size: 20px;
    font-family: "YouSheBiaoTiHei", sans-serif;
`;

const ContactButton = styled(Button)`
    width: 100%;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;

    .anticon {
        font-size: 20px;
        margin-right: 8px;
    }
`;

const ContactPage = () => {
    const { t } = useTranslation();
    return (
        <Layout>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    minHeight: "calc(100vh - 300px)",
                }}
            >
                <Row justify="center">
                    <Col xs={22} sm={18} md={14} lg={10}>
                        <ContactCard>
                            <CardTitle>{t("contactTitle")}</CardTitle>
                            <Space
                                direction="vertical"
                                style={{ width: "100%" }}
                            >
                                <ContactButton
                                    type="text"
                                    icon={<TwitterOutlined />}
                                    onClick={() => {
                                        window.open(
                                            "https://x.com/btcnnn199?t=sTvR8AI1MmiIkx6OepZuRQ&s=09",
                                            "_blank"
                                        );
                                    }}
                                >
                                    {t("followTwitter")}
                                </ContactButton>
                                <ContactButton
                                    type="text"
                                    icon={<MailOutlined />}
                                >
                                    {t("emailContact")}
                                </ContactButton>
                            </Space>
                        </ContactCard>
                    </Col>
                </Row>
            </div>
        </Layout>
    );
};

export default ContactPage;
