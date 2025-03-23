import React from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import styled from "styled-components";

// Charts
import ThreeMonthBuyChart from "@/components/charts/ThreeMonthBuyChart";
import HistoricalBuyChart from "@/components/charts/HistoricalBuyChart";
import RealtimeBuyChart from "@/components/charts/RealtimeBuyChart";
import ThreeMonthSellChart from "@/components/charts/ThreeMonthSellChart";
import HistoricalSellChart from "@/components/charts/HistoricalSellChart";
import RealtimeSellChart from "@/components/charts/RealtimeSellChart";

// Types and utilities
import { MetricType } from "@/types";
import { isValidCoin, isValidChartType, getCoinInfo } from "@/utils/validCoins";

const ChartContainer = styled.div`
    width: 1200px;
    max-width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background: #01050a;
    margin: 0 auto; /* Center horizontally */
`;

const ChartWrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #ff3333;
    text-align: center;
    padding: 20px;

    h1 {
        margin-bottom: 10px;
    }
`;

const InfoHeader = styled.div`
    width: 100%;
    padding: 10px 0;
    color: #98fa86;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
`;

interface CrawlerPageProps {
    coin: string;
    type: string;
    isValid: boolean;
    errorMessage?: string;
}

const CrawlerPage: React.FC<CrawlerPageProps> = ({
    coin,
    type,
    isValid,
    errorMessage,
}) => {
    const router = useRouter();
    const symbol = coin.toUpperCase();

    // Determine which metric to use (BUY or SELL)
    const getMetric = () => {
        return (router.query.metric as string) || MetricType.BUY;
    };

    // Get chart title based on type
    const getChartTitle = () => {
        switch (type) {
            case "t1":
                return "Three Month Data";
            case "t2":
                return "Historical Data";
            case "t3":
                return "Realtime Data";
            default:
                return "Chart";
        }
    };

    // Render the appropriate chart based on type and metric
    const renderChart = () => {
        if (!isValid) {
            return (
                <ErrorContainer>
                    <h1>Error</h1>
                    <p>{errorMessage}</p>
                </ErrorContainer>
            );
        }

        const metric = getMetric();

        switch (type.toLowerCase()) {
            case "t1":
                return metric === MetricType.SELL ? (
                    <ThreeMonthSellChart symbol={symbol} metric={metric} />
                ) : (
                    <ThreeMonthBuyChart symbol={symbol} metric={metric} />
                );
            case "t2":
                return metric === MetricType.SELL ? (
                    <HistoricalSellChart symbol={symbol} metric={metric} />
                ) : (
                    <HistoricalBuyChart symbol={symbol} metric={metric} />
                );
            case "t3":
                return metric === MetricType.SELL ? (
                    <RealtimeSellChart symbol={symbol} metric={metric} />
                ) : (
                    <RealtimeBuyChart symbol={symbol} metric={metric} />
                );
            default:
                return (
                    <ErrorContainer>
                        <h1>Invalid Chart Type</h1>
                        <p>The requested chart type is not supported.</p>
                    </ErrorContainer>
                );
        }
    };

    return (
        <>
            <ChartContainer>
                <ChartWrapper id="chart-wrapper">
                    <InfoHeader>
                        Symbol: {symbol} | Metric: {getMetric().toUpperCase()} |
                        Chart Type: {getChartTitle()}
                    </InfoHeader>
                    {renderChart()}
                </ChartWrapper>
            </ChartContainer>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { coin, type } = context.params as { coin: string; type: string };

    // Validate inputs
    if (!coin || !type) {
        return {
            props: {
                coin: "",
                type: "",
                isValid: false,
                errorMessage: "Missing required parameters",
            },
        };
    }

    // Validate coin
    if (!isValidCoin(coin)) {
        return {
            props: {
                coin,
                type,
                isValid: false,
                errorMessage: `Invalid coin: ${coin}`,
            },
        };
    }

    // Validate chart type
    if (!isValidChartType(type)) {
        return {
            props: {
                coin,
                type,
                isValid: false,
                errorMessage: `Invalid chart type: ${type}. Valid types are: t1, t2, t3`,
            },
        };
    }

    return {
        props: {
            coin,
            type,
            isValid: true,
        },
    };
};

export default CrawlerPage;
