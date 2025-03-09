import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
    Select,
    Card,
    Row,
    Col,
    Typography,
    Statistic,
    Flex,
    Spin,
} from "antd";
import { useTranslation } from "react-i18next";
import PageFrame from "@/components/PageFrame";
import MarketChart from "@/components/charts/marketChart";
import Layout from "@/components/Layout";
import {
    getChainData,
    getCoinData,
    getCirculationInData,
    getCirculationOutData,
    getCirculationPriceData,
} from "@/service";

const { Paragraph } = Typography;
const SPLITTER = " - ";

interface DataProps {
    [key: string]: string[];
}

interface SelectedToken {
    chain: string;
    token: string;
}

function exchange() {
    const { t } = useTranslation();
    const [chainTokenList, setChainTokenList] = useState<DataProps>({});
    const [selectedToken, setSelectedToken] = useState<SelectedToken | null>(
        null
    );
    const [coinData, setCoinData] = useState<any>(null);
    const [depositData, setDepositData] = useState<any>(null);
    const [withdrawalsData, setWithdrawalsData] = useState<any>(null);
    const [priceData, setPriceData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchChainData();
    }, []);

    useEffect(() => {
        if (selectedToken) fetchCoinData();
    }, [selectedToken]);

    const render = () => {
        return (
            <Layout>
                <ExchangeContainer>
                    <ExplorerCard
                        title={t("tokenExplorerTitle")}
                        bordered={false}
                    >
                        <ExplorerDescription>
                            {t("tokenExplorerDescription")}
                        </ExplorerDescription>
                        <SearchContainer>
                            <StyledSelect
                                showSearch
                                placeholder="Select Coin"
                                onChange={handleTokenChange}
                                options={formatDataForSelect(chainTokenList)}
                            />
                        </SearchContainer>
                    </ExplorerCard>

                    <StatisticContainer>
                        {isLoading && (
                            <LoadingContainer>
                                <Spin size="large" />
                            </LoadingContainer>
                        )}

                        {coinData && !isLoading && (
                            <>
                                <TokenInfoCard
                                    title={
                                        <TokenTitle>
                                            {selectedToken?.token}
                                        </TokenTitle>
                                    }
                                    bordered={false}
                                >
                                    <TokenSubtitle>
                                        Price relation with Deposits &
                                        Withdrawals
                                    </TokenSubtitle>

                                    <Row gutter={24}>
                                        <Col span={12}>
                                            <PriceLabel>
                                                {t("coinCardPrice")}
                                            </PriceLabel>
                                            <PriceValue>
                                                {coinData.price}USD
                                            </PriceValue>
                                        </Col>
                                        <Col span={12}>
                                            <PriceLabel>
                                                {t("coinCardMarketCap")}
                                            </PriceLabel>
                                            <PriceValue>
                                                {formatNumberWithUnits(
                                                    coinData.marketCap
                                                )}
                                            </PriceValue>
                                        </Col>
                                    </Row>
                                </TokenInfoCard>

                                <ChartCard bordered={false}>
                                    <MarketChart
                                        dates={depositData.dateList}
                                        deposits={depositData.exchangeInList}
                                        withdrawals={
                                            withdrawalsData.exchangeOutList
                                        }
                                        prices={priceData.priceList}
                                    />
                                </ChartCard>
                            </>
                        )}
                    </StatisticContainer>
                </ExchangeContainer>
            </Layout>
        );
    };

    const fetchChainData = async () => {
        try {
            const data = await getChainData();
            setChainTokenList(data);
        } catch (e) {
            console.error(e);
        }
    };

    const fetchCoinData = async () => {
        setIsLoading(true);
        if (!selectedToken) return;
        try {
            const { startTime, endTime } = getDateRange();

            const commonParams = {
                chain: selectedToken.chain,
                token: selectedToken.token,
                startTime,
                endTime,
            };

            const [
                coinData,
                circulationInData,
                circulationOutData,
                circulationPriceData,
            ] = await Promise.all([
                getCoinData(selectedToken.chain, selectedToken.token),
                getCirculationInData(commonParams),
                getCirculationOutData(commonParams),
                getCirculationPriceData(commonParams),
            ]);

            setCoinData(coinData);
            setDepositData(circulationInData);
            setWithdrawalsData(circulationOutData);
            setPriceData(circulationPriceData);
        } catch (e) {
            console.error("Error fetching coin data:", e);
        }
        setIsLoading(false);
    };

    const handleTokenChange = (value: unknown) => {
        const valueStr = String(value);
        const [token, chain] = valueStr.split(SPLITTER);
        setSelectedToken({ chain, token });
    };

    const formatDataForSelect = (
        data: Record<string, string[]>
    ): Array<{ label: string; value: any }> => {
        return Object.entries(data).flatMap(([key, values]) =>
            values.map((value) => ({
                label: `${key}${SPLITTER}${value}`,
                value: `${key}${SPLITTER}${value}`,
            }))
        );
    };

    const getDateRange = () => {
        const now = new Date();
        const formatDate = (date: Date) => date.toISOString().split("T")[0];

        const endDate = formatDate(now);
        const startDate = formatDate(
            new Date(now.setFullYear(now.getFullYear() - 1))
        );

        return { startTime: startDate, endTime: endDate };
    };

    const formatNumberWithUnits = (value: string): string => {
        const valueNum = parseFloat(value);
        if (valueNum >= 1e12) return (valueNum / 1e12).toFixed(4) + "T"; // 万亿
        if (valueNum >= 1e9) return (valueNum / 1e9).toFixed(4) + "B"; // 十亿
        if (valueNum >= 1e6) return (valueNum / 1e6).toFixed(4) + "M"; // 百万
        if (valueNum >= 1e3) return (valueNum / 1e3).toFixed(4) + "K"; // 千
        return valueNum.toFixed(4); // 小于千的数字不带单位
    };

    return render();
}

// 样式定义
const ExchangeContainer = styled.div`
    max-width: 1200px;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0 20px;
`;

const ExplorerCard = styled(Card)`
    width: 100%;
    border-radius: 16px;
    margin-bottom: 20px;

    .ant-card-head {
        border-bottom: none;
        padding: 16px 24px;
    }

    .ant-card-head-title {
        color: #9ef886;
        font-size: 24px;
        font-weight: 500;
        font-family: "YouSheBiaoTiHei", sans-serif;
    }

    .ant-card-body {
        padding: 0 24px 24px;
    }
`;

const ExplorerDescription = styled(Paragraph)`
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 20px;
    font-size: 14px;
`;

const SearchContainer = styled.div`
    width: 100%;
    margin-bottom: 10px;
`;

const StyledSelect = styled(Select)`
    width: 100%;

    .ant-select-selector {
        background-color: rgba(0, 0, 0, 0.2) !important;
        border: 1px solid rgba(255, 255, 255, 0.5) !important;
        border-radius: 8px !important;
        padding: 0 15px !important;
    }

    .ant-select-selection-search-input {
        height: 45px !important;
    }

    .ant-select-selection-placeholder,
    .ant-select-selection-item {
        line-height: 45px !important;
        color: rgba(255, 255, 255, 0.8) !important;
    }

    .ant-select-arrow {
        color: rgba(255, 255, 255, 0.5) !important;
    }

    &.ant-select-focused .ant-select-selector {
        border-color: #9ef886 !important;
        box-shadow: 0 0 0 2px rgba(158, 248, 134, 0.1) !important;
    }
`;

const StatisticContainer = styled.div`
    width: 100%;
`;

const LoadingContainer = styled(Flex)`
    height: 400px;
    width: 100%;
    align-items: center;
    justify-content: center;

    .ant-spin-dot-item {
        background-color: #9ef886;
    }
`;

const TokenInfoCard = styled(Card)`
    border-radius: 16px;
    margin-bottom: 20px;

    .ant-card-head {
        border-bottom: none;
        padding: 16px 24px;
    }

    .ant-card-head-title {
        padding: 0;
    }

    .ant-card-body {
        padding: 0 24px 24px;
    }
`;

const TokenTitle = styled.div`
    color: #9ef886;
    font-size: 22px;
    font-weight: 500;
    font-family: "YouSheBiaoTiHei", sans-serif;

    @media (max-width: 768px) {
        font-size: 18px;
    }
`;

const TokenSubtitle = styled.div`
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    margin-bottom: 20px;

    @media (max-width: 768px) {
        font-size: 12px;
        margin-bottom: 15px;
    }
`;

const PriceLabel = styled.div`
    color: rgba(255, 255, 255, 0.5);
    font-size: 14px;
    margin-bottom: 5px;

    @media (max-width: 768px) {
        font-size: 12px;
    }
`;

const PriceValue = styled.div`
    color: #9ef886;
    font-size: 24px;
    font-weight: 500;

    @media (max-width: 768px) {
        font-size: 20px;
    }
`;

const ChartCard = styled(Card)`
    border-radius: 16px;

    .ant-card-body {
        padding: 24px;
    }
`;

export default exchange;
