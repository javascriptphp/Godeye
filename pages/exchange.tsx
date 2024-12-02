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

const { Option } = Select;
const { Paragraph } = Typography;

interface DataProps {
    [key: string]: string[];
}

function exchange() {
    const { t } = useTranslation();
    const [chainTokenList, setChainTokenList] = useState<DataProps>({});
    const [selectedKey, setSelectedKey] = useState<string | null>(null);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [coinData, setCoinData] = useState<any>(null);
    const [depositData, setDepositData] = useState<any>(null);
    const [withdrawalsData, setWithdrawalsData] = useState<any>(null);
    const [priceData, setPriceData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchChainData();
    }, []);

    useEffect(() => {
        if (selectedKey && selectedValue) fetchCoinData();
    }, [selectedKey, selectedValue]);

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
                                onChange={handleKeyChange}
                                style={{ width: "48%" }}
                                options={Object.keys(chainTokenList).map(
                                    (key) => ({
                                        label: key,
                                        value: key,
                                    })
                                )}
                            />
                            <Select
                                showSearch
                                placeholder="Select Token"
                                value={selectedValue || undefined}
                                onChange={handleValueChange}
                                style={{ width: "48%" }}
                                disabled={!selectedKey}
                            >
                                {selectedKey &&
                                    chainTokenList[selectedKey].map((item) => (
                                        <Option key={item} value={item}>
                                            {item}
                                        </Option>
                                    ))}
                            </Select>
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
                            <Row gutter={24}>
                                <Col span={6}>
                                    <Card
                                        title={selectedValue}
                                        bordered={false}
                                    >
                                        <Statistic
                                            title={t("coinCardPrice")}
                                            value={coinData.price}
                                            precision={2}
                                            suffix="USD"
                                        />
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
                                    </Card>
                                </Col>
                                <Col span={18}>
                                    <MarketChart
                                        dates={depositData.dateList}
                                        deposits={depositData.exchangeInList}
                                        withdrawals={
                                            withdrawalsData.exchangeOutList
                                        }
                                        prices={priceData.priceList}
                                    />
                                </Col>
                            </Row>
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
        try {
            const { startTime, endTime } = getDateRange();

            const commonParams = {
                chain: selectedKey as string,
                token: selectedValue as string,
                startTime,
                endTime,
            };

            const [
                coinData,
                circulationInData,
                circulationOutData,
                circulationPriceData,
            ] = await Promise.all([
                getCoinData(selectedKey as string, selectedValue as string),
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

    const handleKeyChange = (value: string) => {
        setSelectedKey(value);
        setSelectedValue(null);
    };

    const handleValueChange = (value: string) => {
        setSelectedValue(value);
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

    const formatNumberWithUnits = (value: number): string => {
        if (value >= 1e12) return (value / 1e12).toFixed(4) + "T"; // 万亿
        if (value >= 1e9) return (value / 1e9).toFixed(4) + "B"; // 十亿
        if (value >= 1e6) return (value / 1e6).toFixed(4) + "M"; // 百万
        if (value >= 1e3) return (value / 1e3).toFixed(4) + "K"; // 千
        return value.toString(); // 小于千的数字不带单位
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
    margin-top: 20px;
`;

export default exchange;
