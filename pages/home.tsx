import React, { useState, useMemo } from "react";
import styled from "styled-components";

// Components
import CryptoCardCarousel from "@/components/CryptoCardCarousel";
import SymbolList from "@/components/SymbolList";
import PartnershipsSection from "@/components/PartnershipsSection";

// Charts
import ThreeMonthBuyChart from "@/components/charts/ThreeMonthBuyChart";
import HistoricalBuyChart from "@/components/charts/HistoricalBuyChart";
import RealtimeBuyChart from "@/components/charts/RealtimeBuyChart";
import ThreeMonthSellChart from "@/components/charts/ThreeMonthSellChart";
import HistoricalSellChart from "@/components/charts/HistoricalSellChart";
import RealtimeSellChart from "@/components/charts/RealtimeSellChart";

// Utilities
import useStore from "@/utils/store";
import { MetricType } from "@/types";
import { getAllCoinsData } from "@/utils/validCoins";

const ChartContainer = styled.div`
    margin: 0 auto;
    padding: 10px;
    max-width: 100%;
    overflow-x: hidden;

    @media (min-width: 768px) {
        padding: 20px;
    }
`;

const HomePage = () => {
    const [symbol, setSymbol] = useState("BTC");
    const [metric, setMetric] = useState(MetricType.BUY);
    const userContext = useStore().getUserContext();

    // 使用统一的币种数据源
    const symbolsData = getAllCoinsData();

    // 处理币种变更
    const handleSymbolChange = (newSymbol: string) => {
        setSymbol(newSymbol);
    };

    // 通过useMemo优化图表组件的创建
    const charts = useMemo(() => {
        const getChartComponent = (
            type: string,
            metric: string,
            chartProps: any
        ) => {
            const chartComponents: any = {
                threeMonth: {
                    [MetricType.BUY]: ThreeMonthBuyChart,
                    [MetricType.SELL]: ThreeMonthSellChart,
                },
                historical: {
                    [MetricType.BUY]: HistoricalBuyChart,
                    [MetricType.SELL]: HistoricalSellChart,
                },
                realtime: {
                    [MetricType.BUY]: RealtimeBuyChart,
                    [MetricType.SELL]: RealtimeSellChart,
                },
            };

            const ChartComponent = chartComponents[type][metric];
            return <ChartComponent {...chartProps} />;
        };

        const chartProps = { symbol, metric };
        const threeMonthChart = getChartComponent(
            "threeMonth",
            metric,
            chartProps
        );
        const historicalChart = getChartComponent(
            "historical",
            metric,
            chartProps
        );
        const realtimeChart = getChartComponent("realtime", metric, chartProps);

        return [
            {
                chart: threeMonthChart,
                description: "T1 - Partial Historical Data",
            },
            {
                chart: historicalChart,
                description: "T2 - Historical Data",
            },
            {
                chart: realtimeChart,
                description: "T3 - Realtime Data",
            },
        ];
    }, [symbol, metric]);

    // 处理按钮点击事件
    const handleRefresh = () => {
        console.log("刷新图表");
    };

    const handleFullscreen = () => {
        console.log("全屏显示");
    };

    const handleSync = () => {
        console.log("同步数据");
    };

    const handleDownload = () => {
        console.log("下载数据");
    };

    const handleSwitchMetric = () => {
        setMetric(metric === MetricType.BUY ? MetricType.SELL : MetricType.BUY);
    };

    return (
        <>
            <ChartContainer>
                <CryptoCardCarousel
                    charts={charts}
                    symbol={symbol}
                    metric={metric}
                    onRefresh={handleRefresh}
                    onFullscreen={handleFullscreen}
                    onSync={handleSync}
                    onDownload={handleDownload}
                    onSwitchMetric={handleSwitchMetric}
                />
                <SymbolList
                    symbols={symbolsData}
                    activeSymbol={symbol}
                    onSymbolChange={handleSymbolChange}
                />
            </ChartContainer>

            <PartnershipsSection />
        </>
    );
};

export default HomePage;
