import React, { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { EChartsOption } from "echarts";
import { chartHeight, chartWidth } from "@/utils/global_constant";
import { useTranslation } from "react-i18next";
import GlobalFunctions from "@/utils/global_functions";
import { buildCustomConfig } from "@/configs/realtimeSell";
import useStore from "@/utils/store";
import useWebSocket from "react-use-websocket";
import { getRealtimeDataUrl } from "@/service";
import { RealtimeResponse, RealtimeSellData, SELL } from "@/types";
import { formatTimestampToString } from "@/utils/time";

interface RealtimeSellItem {
    timestamps: string[];
    metric: number[];
    threshold: number[];
    price: any[];
}

const initialRealtimeData: RealtimeSellItem = {
    timestamps: [],
    metric: [],
    threshold: [],
    price: [],
};

const RealtimeSellChart = ({
    metric,
    symbol,
}: {
    metric: string;
    symbol: string;
}) => {
    const [realtimeData, setRealtimeData] =
        useState<RealtimeSellItem>(initialRealtimeData);
    const { t } = useTranslation();
    const Functions = GlobalFunctions(t);
    const { getUserContext } = useStore();
    const userContext = getUserContext();
    const [url, setUrl] = useState<string>("");
    const chartRef = useRef<echarts.ECharts | null>(null);
    const chartContainerRef = useRef<HTMLDivElement>(null);

    const { lastMessage } = useWebSocket(url, {
        onOpen: () => console.log("Connected to WebSocket for Sell Chart"),
        reconnectInterval: 5000,
        reconnectAttempts: 5,
        shouldReconnect: () => !!url,
    });

    useEffect(() => {
        initData();
        fetchData();

        // 添加窗口大小变化监听
        const handleResize = () => {
            if (chartRef.current) {
                chartRef.current.resize();
            }
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            // 清理图表实例
            if (chartRef.current) {
                chartRef.current.dispose();
                chartRef.current = null;
            }
        };
    }, [metric, symbol, userContext]);

    useEffect(() => {
        if (lastMessage) {
            const response = JSON.parse(lastMessage.data);
            processData(response);
        }
    }, [lastMessage]);

    useEffect(() => {
        buildChart();
    }, [realtimeData]);

    const render = () => {
        return (
            <div
                id="RealtimeSellChart"
                ref={chartContainerRef}
                style={{
                    width: chartWidth,
                    height: chartHeight,
                    maxWidth: "100%",
                }}
                className="chart-container"
            />
        );
    };

    const initData = () => {
        setRealtimeData(initialRealtimeData);
    };

    const fetchData = async () => {
        try {
            const websocketUrl = await getRealtimeDataUrl(metric, symbol);
            if (websocketUrl) {
                setUrl(websocketUrl);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const processData = (lastMessage: RealtimeResponse) => {
        if (lastMessage.code !== 200 || !lastMessage.data) return;
        console.log(lastMessage);

        const data = lastMessage.data as RealtimeSellData[];
        const updatedData: RealtimeSellItem = {
            timestamps: data.map((item) =>
                formatTimestampToString(item.timestamp)
            ),
            metric: data.map((item) => item.metric_value),
            threshold: data.map((item) => item.threshold),
            price: data.map((item) => [
                item.open,
                item.close,
                item.low,
                item.high,
            ]),
        };
        setRealtimeData((prev) => ({
            timestamps: [...prev.timestamps, ...updatedData.timestamps],
            metric: [...prev.metric, ...updatedData.metric],
            threshold: [...prev.threshold, ...updatedData.threshold],
            price: [...prev.price, ...updatedData.price],
        }));
    };

    const buildChart = () => {
        const _option = Functions.buildOptionForSellChart({
            title: t("t3Title"),
            symbol: symbol,
            metric: SELL,
            timestamps: realtimeData.timestamps,
            threshold: realtimeData.threshold,
            metricData: realtimeData.metric,
            priceData: realtimeData.price,
            watermark: (userContext && userContext.email) || t("watermarkText"),
            includeMark: false,
            kLine: t("text_5minK"),
        });

        const echartsOption = {
            ..._option,
            ...buildCustomConfig({
                symbol,
            }),
            // 添加响应式配置
            grid: {
                left: "5%",
                right: "5%",
                top: "15%",
                bottom: "15%",
                containLabel: true,
            },
        } as EChartsOption;

        const chartDom = document.getElementById("RealtimeSellChart");
        if (chartDom) {
            // 如果已经有图表实例，先销毁
            if (chartRef.current) {
                chartRef.current.dispose();
            }
            // 创建新的图表实例
            chartRef.current = echarts.init(chartDom);
            // 设置图表选项
            echartsOption && chartRef.current.setOption(echartsOption);
        }
    };

    return render();
};

export default RealtimeSellChart;
