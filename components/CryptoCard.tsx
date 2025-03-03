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
        <div className="w-full">
            <Card
                className="w-full bg-background-color bg-opacity-50 text-white border border-gray-800 rounded-xl overflow-hidden shadow-lg"
                bodyStyle={{ padding: "40px", backgroundColor: "transparent" }}
            >
                {/* 头部信息区域 */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <div className="text-theme-color text-2xl font-bold tracking-wider font-custom">
                            {symbol.toUpperCase()}
                        </div>
                        <div className="text-theme-color text-sm">
                            {description}
                        </div>
                        <div className="text-theme-color text-xs mt-1 max-w-md">
                            {t("shortDescription")}
                        </div>
                    </div>
                    <div>
                        <SwitchButton
                            icon={<RetweetOutlined />}
                            onClick={() => onSwitchMetric()}
                        >
                            {metric.toUpperCase()}
                        </SwitchButton>
                    </div>
                </div>

                {/* 图表区域 - 通过children接收图表组件 */}
                <div className="relative w-full mb-4 mt-2">
                    {/* 图表右上角的工具按钮 */}
                    {/* <div className="absolute top-0 right-0 z-10 flex space-x-2">
                        <Tooltip title="全屏">
                            <div
                                className="w-8 h-8 flex items-center justify-center border border-gray-700 rounded cursor-pointer hover:border-green-400 hover:bg-gray-800 transition-all duration-200"
                                onClick={onFullscreen}
                            >
                                <FullscreenOutlined className="text-gray-400 hover:text-green-400" />
                            </div>
                        </Tooltip>
                        <Tooltip title="刷新">
                            <div
                                className="w-8 h-8 flex items-center justify-center border border-gray-700 rounded cursor-pointer hover:border-green-400 hover:bg-gray-800 transition-all duration-200"
                                onClick={onRefresh}
                            >
                                <ReloadOutlined className="text-gray-400 hover:text-green-400" />
                            </div>
                        </Tooltip>
                        <Tooltip title="同步">
                            <div
                                className="w-8 h-8 flex items-center justify-center border border-gray-700 rounded cursor-pointer hover:border-green-400 hover:bg-gray-800 transition-all duration-200"
                                onClick={onSync}
                            >
                                <SyncOutlined className="text-gray-400 hover:text-green-400" />
                            </div>
                        </Tooltip>
                        <Tooltip title="下载">
                            <div
                                className="w-8 h-8 flex items-center justify-center border border-gray-700 rounded cursor-pointer hover:border-green-400 hover:bg-gray-800 transition-all duration-200"
                                onClick={onDownload}
                            >
                                <DownloadOutlined className="text-gray-400 hover:text-green-400" />
                            </div>
                        </Tooltip>
                    </div> */}

                    {/* 渲染传入的图表组件 */}
                    {children}
                </div>
            </Card>
        </div>
    );
};

const SwitchButton = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(90deg, #b1fb83 0%, #28e89b 100%);
    color: #000;
    border: none;
    border-radius: 20px;
    height: 40px;
    padding: 0 20px;
    font-weight: 500;
    box-shadow: 0 4px 10px rgba(40, 232, 155, 0.3);
    transition: all 0.3s ease;

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
        margin-left: 8px;
        font-size: 16px;
    }
`;

export default CryptoCard;
