import React from "react";
import { Card, Button, Tooltip } from "antd";
import {
    FullscreenOutlined,
    ReloadOutlined,
    SyncOutlined,
    DownloadOutlined,
    RetweetOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
// 定义组件props类型
interface CryptoCardProps {
    children: React.ReactNode; // 接收图表组件作为子元素
    symbol: string;
    metric: string;
    description: string;
    onRefresh?: () => void;
    onFullscreen?: () => void;
    onSync?: () => void;
    onDownload?: () => void;
    onBuy?: () => void;
    onSwitchMetric: () => void;
}

const CryptoCard: React.FC<CryptoCardProps> = ({
    children,
    symbol,
    metric,
    description,
    onRefresh,
    onFullscreen,
    onSync,
    onDownload,
    onBuy,
    onSwitchMetric,
}) => {
    const { t } = useTranslation();
    return (
        <div className="w-full max-w-[2000px] mx-auto">
            <StyledCard className="w-full bg-background-color bg-opacity-50 text-white border border-gray-800 rounded-xl overflow-hidden shadow-lg">
                {/* 头部信息区域 */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 lg:mb-8 gap-3 sm:gap-0">
                    <div>
                        <div className="text-theme-color text-xl sm:text-2xl lg:text-3xl font-bold tracking-wider font-custom">
                            {symbol.toUpperCase()}
                        </div>
                        <div className="text-theme-color text-sm lg:text-base">
                            {description}
                        </div>
                        <div className="text-theme-color text-xs lg:text-sm mt-1 max-w-md lg:max-w-lg">
                            {t("shortDescription")}
                        </div>
                    </div>
                    <div className="self-end sm:self-auto">
                        <SwitchButton
                            icon={<RetweetOutlined />}
                            onClick={() => onSwitchMetric()}
                        >
                            {metric.toUpperCase()}
                        </SwitchButton>
                    </div>
                </div>

                {/* 图表区域 - 通过children接收图表组件 */}
                <div className="relative w-full mb-4 mt-2 lg:mb-6 lg:mt-4">
                    {/* 渲染传入的图表组件 */}
                    <ChartWrapper className="w-full">{children}</ChartWrapper>
                </div>
            </StyledCard>
        </div>
    );
};

const StyledCard = styled(Card)`
    .ant-card-body {
        padding: 20px !important;
        background-color: transparent;

        @media (min-width: 640px) {
            padding: 30px !important;
        }

        @media (min-width: 768px) {
            padding: 40px !important;
        }

        @media (min-width: 1024px) {
            padding: 40px 50px !important;
        }

        @media (min-width: 1280px) {
            padding: 40px 60px !important;
        }

        @media (min-width: 1536px) {
            padding: 40px 70px !important;
        }
    }
`;

const SwitchButton = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(90deg, #b1fb83 0%, #28e89b 100%);
    color: #000;
    border: none;
    border-radius: 20px;
    height: 36px;
    padding: 0 15px;
    font-weight: 500;
    font-size: 0.9rem;
    box-shadow: 0 4px 10px rgba(40, 232, 155, 0.3);
    transition: all 0.3s ease;

    @media (min-width: 640px) {
        height: 40px;
        padding: 0 20px;
        font-size: 1rem;
    }

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 15px rgba(40, 232, 155, 0.4);
        background: linear-gradient(90deg, #c5fc9e 0%, #3dfbad 100%);
        color: #000;
    }

    &:active {
        transform: translateY(1px);
        box-shadow: 0 2px 8px rgba(40, 232, 155, 0.3);
    }

    .anticon {
        margin-left: 6px;
        font-size: 14px;

        @media (min-width: 640px) {
            margin-left: 8px;
            font-size: 16px;
        }
    }
`;

const ChartWrapper = styled.div`
    width: 100%;
    overflow: hidden;

    /* 确保图表容器不会溢出 */
    & > div {
        width: 100% !important;
        max-width: 100% !important;
    }
`;

export default CryptoCard;
