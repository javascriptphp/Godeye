import React, { useEffect } from "react";
import styled from "styled-components";
import { Space, Table, Avatar } from "antd";
import PageFrame from "@/components/PageFrame";
import { getMemeMarketList } from "@/service";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface MarketData {
    rank: number;
    img: string;
    fullName: string;
    price: number;
    daily: number;
    weekly: number;
    volume: {
        value: string;
        ratio: number;
    };
    cap: string;
    fdv: string;
}

function market() {
    const { t } = useTranslation();
    const [marketData, setMarketData] = React.useState<MarketData[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        {
            title: "#",
            dataIndex: "rank",
            key: "rank",
            sorter: (a: MarketData, b: MarketData) => a.rank - b.rank,
        },
        {
            title: t("marketName"),
            dataIndex: "fullName",
            key: "name",
            render: (text: string, record: any) => (
                <Space>
                    <Avatar src={record.img} size={24} />
                    {text}
                </Space>
            ),
        },
        {
            title: t("marketPrice"),
            dataIndex: "price",
            key: "price",
            render: (value: number) => `$${value}`,
            sorter: (a: MarketData, b: MarketData) => a.price - b.price,
        },
        {
            title: "24h%",
            dataIndex: "daily",
            key: "daily",
            render: (value: number) => (
                <TrendWrapper isUp={value > 0}>
                    {value > 0 ? <CaretUpOutlined /> : <CaretDownOutlined />}
                    {`${Math.abs(value)}%`}
                </TrendWrapper>
            ),
            sorter: (a: MarketData, b: MarketData) => a.daily - b.daily,
        },
        {
            title: "7d%",
            dataIndex: "weekly",
            key: "weekly",
            render: (value: number) => (
                <TrendWrapper isUp={value > 0}>
                    {value > 0 ? <CaretUpOutlined /> : <CaretDownOutlined />}
                    {`${Math.abs(value)}%`}
                </TrendWrapper>
            ),
            sorter: (a: MarketData, b: MarketData) => a.weekly - b.weekly,
        },
        {
            title: t("marketVolume"),
            dataIndex: "volume",
            key: "volume",
            width: "20%",
            render: (volume: any) => (
                <Space>
                    {volume.value}
                    <TrendWrapper isUp={volume.ratio > 0}>
                        {volume.ratio > 0 ? (
                            <CaretUpOutlined />
                        ) : (
                            <CaretDownOutlined />
                        )}
                        {`${Math.abs(volume.ratio)}%`}
                    </TrendWrapper>
                </Space>
            ),
        },
        {
            title: t("marketCap"),
            dataIndex: "cap",
            key: "cap",
        },
        {
            title: t("marketFdv"),
            dataIndex: "fdv",
            key: "fdv",
        },
    ];

    const render = () => {
        return (
            <PageFrame>
                <MarketContainer>
                    <Table
                        dataSource={marketData}
                        columns={columns}
                        size="small"
                        style={{ width: "80vw" }}
                        pagination={{ defaultPageSize: 20 }}
                    />
                </MarketContainer>
            </PageFrame>
        );
    };

    const fetchData = async () => {
        try {
            const data = await getMemeMarketList();
            setMarketData(processData(data));
        } catch (e) {
            console.error(e);
        }
    };

    const processData = (data: any): MarketData[] => {
        return data.map((item: any) => ({
            rank: Number(item.rank),
            img: item.img,
            fullName: item.full_name,
            price: extractNumber(item.price),
            daily: extractNumber(item.daily.value, item.daily.trend),
            weekly: extractNumber(item.weekly.value, item.weekly.trend),
            volume: {
                value: item.volume.value,
                ratio: extractNumber(item.volume.ratio, item.volume.trend),
            },
            cap: item.cap,
            fdv: item.fdv,
        }));
    };

    const extractNumber = (value: string, trend?: string): number => {
        const numMatch = value.match(/[\d.]+/);
        const number = numMatch ? parseFloat(numMatch[0]) : 0;
        return trend === "down" ? -number : number;
    };

    return render();
}

const MarketContainer = styled.div`
    margin: 20px;
    display: flex;
    justify-content: center;
`;

const TrendWrapper = styled.div<{ isUp: boolean }>`
    display: flex;
    align-items: center;
    color: ${({ isUp }) => (isUp ? "green" : "red")};
    font-size: 14px;
    font-weight: bold;

    .anticon {
        margin-right: 4px; // Space between icon and text
    }
`;

export default market;
