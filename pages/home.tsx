import React, { useState, useMemo } from "react";
import styled from "styled-components";

// Components
import CryptoCardCarousel from "@/components/CryptoCardCarousel";
import SymbolList from "@/components/SymbolList";

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

const ChartContainer = styled.div`
    margin: 0 auto;
    padding: 20px;
`;

const HomePage = () => {
    const [symbol, setSymbol] = useState("BTC");
    const [metric, setMetric] = useState(MetricType.BUY);
    const userContext = useStore().getUserContext();

    // 示例币种数据
    const symbolsData = [
        { symbol: "BTC", name: "Bitcoin", price: "61298.22" },
        { symbol: "ETH", name: "Ethereum", price: "2612.45" },
        { symbol: "SOL", name: "Solana", price: "142.78" },
        { symbol: "OP", name: "Optimism", price: "3.25" },
        { symbol: "DOGE", name: "Dogecoin", price: "0.17" },
        { symbol: "BONK", name: "Bonk", price: "0.00" },
        { symbol: "PEPE", name: "Pepe", price: "0.00" },
        { symbol: "WIF", name: "Wif", price: "0.00" },
        { symbol: "FLOKI", name: "Floki", price: "0.00" },
        { symbol: "SUI", name: "Sui", price: "0.00" },
        { symbol: "SEI", name: "Sei", price: "0.00" },
        { symbol: "FTM", name: "Fantom", price: "0.00" },
        { symbol: "ARKM", name: "Arkime", price: "0.00" },
        { symbol: "ORDI", name: "Ordinals", price: "0.00" },
        { symbol: "PENDLE", name: "Pendle", price: "0.00" },
        { symbol: "STX", name: "Stacks", price: "0.00" },
        { symbol: "ONDO", name: "Ondo", price: "0.00" },
        { symbol: "OM", name: "Om", price: "0.00" },
        { symbol: "ENA", name: "Ena", price: "0.00" },
        { symbol: "ZRX", name: "Zrx", price: "0.00" },
        { symbol: "TAO", name: "Tao", price: "0.00" },
        { symbol: "CKB", name: "Ckb", price: "0.00" },
    ];

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
    );
};

export default HomePage;
