import React from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { LockOutlined } from "@ant-design/icons";
import { Button } from "antd";

interface ChartUpgradeProps {
    chartType: string;
}

const UpgradeContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
`;

const LockIcon = styled.div`
    font-size: 48px;
    color: var(--theme-color, #9ef886);
    margin-bottom: 20px;
`;

const Title = styled.h3`
    color: var(--theme-color, #9ef886);
    font-size: 24px;
    margin-bottom: 10px;
`;

const Description = styled.p`
    color: #f5f5f5;
    font-size: 12px;
    margin-bottom: 20px;
    max-width: 80%;
`;

const UpgradeButton = styled(Button)`
    background: linear-gradient(to right, #b1fb83, #28e89b);
    color: #000;
    font-weight: bold;
    border: none;
    height: 40px;
    margin-top: 10px;
    padding: 0 30px;
    border-radius: 20px;

    &:hover {
        background: linear-gradient(to right, #c5fc9e, #3dfbad);
        color: #000;
    }
`;

const ChartUpgrade: React.FC<ChartUpgradeProps> = ({ chartType }) => {
    const router = useRouter();
    const { t } = useTranslation();

    const handleUpgrade = () => {
        router.push("/pay");
    };

    return (
        <UpgradeContainer>
            <LockIcon>
                <LockOutlined />
            </LockIcon>
            <Title>{t("upgradeRequired")}</Title>
            <Description>
                {t("upgradeChartDescription", { chartType })}
            </Description>
            <UpgradeButton onClick={handleUpgrade}>
                {t("upgradeNow")}
            </UpgradeButton>
        </UpgradeContainer>
    );
};

export default ChartUpgrade;
