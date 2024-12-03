import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Select } from "antd";
import { Card, Row, Col, Typography, Statistic, Flex, Spin } from "antd";
import { useTranslation } from "react-i18next";
import PageFrame from "@/components/PageFrame";
import MarketChart from "@/components/charts/marketChart";
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
            <PageFrame>
                <ExchangeContainer>
                    <Card
                        title={t("tokenExplorerTitle")}
                        bordered={false}
                        style={{ width: "70%" }}
                    >
                        <Paragraph strong>
                            {t("tokenExplorerDescription")}
                        </Paragraph>
                        <SearchContainer>
                            <Select
                                showSearch
                                placeholder="Select Chain"
                                onChange={handleTokenChange}
                                style={{ width: "90%" }}
                                options={formatDataForSelect(chainTokenList)}
                            />
                        </SearchContainer>
                    </Card>
                    <StatisticContainer>
                        {isLoading && (
                            <Flex
                                align="center"
                                justify="center"
                                style={{ height: "400px" }}
                            >
                                <Spin size="large" />
                            </Flex>
                        )}
                        {coinData && !isLoading && (
                            <>
                                <Card
                                    title={selectedToken?.token}
                                    bordered={false}
                                >
                                    <Row gutter={24}>
                                        <Col span={6}>
                                            <Statistic
                                                title={t("coinCardPrice")}
                                                value={coinData.price}
                                                precision={2}
                                                suffix="USD"
                                            />
                                        </Col>
                                        <Col span={6}>
                                            <Statistic
                                                title={t("coinCardMarketCap")}
                                                value={coinData.marketCap}
                                                precision={2}
                                                formatter={() =>
                                                    formatNumberWithUnits(
                                                        coinData.marketCap
                                                    )
                                                }
                                            />
                                        </Col>
                                        <Col span={6}>
                                            <Statistic
                                                title={t("coinCardCirculating")}
                                                value={coinData.circulating}
                                                precision={2}
                                                formatter={() =>
                                                    formatNumberWithUnits(
                                                        coinData.circulating
                                                    )
                                                }
                                            />
                                        </Col>
                                        <Col span={6}>
                                            <Statistic
                                                title={t("coinCardSupply")}
                                                value={coinData.supply}
                                                precision={2}
                                                formatter={() =>
                                                    formatNumberWithUnits(
                                                        coinData.supply
                                                    )
                                                }
                                            />
                                        </Col>
                                    </Row>
                                </Card>
                                <Card bordered={false}>
                                    <MarketChart
                                        dates={depositData.dateList}
                                        deposits={depositData.exchangeInList}
                                        withdrawals={
                                            withdrawalsData.exchangeOutList
                                        }
                                        prices={priceData.priceList}
                                    />
                                </Card>
                            </>
                        )}
                    </StatisticContainer>
                </ExchangeContainer>
            </PageFrame>
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

    const handleTokenChange = (value: string) => {
        const [token, chain] = value.split(SPLITTER);
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

const ExchangeContainer = styled.div`
    margin: 40px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

const SearchContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 70%;
`;

const StatisticContainer = styled.div`
    width: 70%;
    margin-top: 10px;
`;

export default exchange;
