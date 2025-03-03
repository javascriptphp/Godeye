import React, { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { EChartsOption } from "echarts";
import { chartHeight, chartWidth } from "@/utils/global_constant";
import { useTranslation } from "react-i18next";
import GlobalFunctions from "@/utils/global_functions";
import { buildCustomConfig } from "@/configs/realtimeBuy";
import useStore from "@/utils/store";
import useWebSocket from "react-use-websocket";
import { getRealtimeDataUrl } from "@/service";
import { BUY } from "@/types";
import { formatTimestampToString } from "@/utils/time";

const initialRealtimeData: RealtimeData = {
    timestamps: [],
    metric: [],
    threshold: 0,
    threshold2: undefined,
    open: [],
    close: [],
    high: [],
    low: [],
};

const RealtimeBuyChart = ({
    metric,
    symbol,
}: {
    metric: string;
    symbol: string;
}) => {
    const [realtimeData, setRealtimeData] =
        useState<RealtimeData>(initialRealtimeData);
    const { t } = useTranslation();
    const Functions = GlobalFunctions(t);
    const { getUserContext } = useStore();
    const userContext = getUserContext();
    const [url, setUrl] = useState<string>("");
    const chartRef = useRef<echarts.ECharts | null>(null);
    const chartContainerRef = useRef<HTMLDivElement>(null);

    const { lastMessage } = useWebSocket(url, {
        onOpen: () => console.log("Connected to WebSocket"),
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
                id="RealtimeBuyChart"
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
            const websocketUrl = await getRealtimeDataUrl(metric, symbol, "v2");
            if (websocketUrl) {
                setUrl(websocketUrl);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const processData = (lastMessage: any) => {
        const data = lastMessage.data;
        const updatedData: RealtimeData = {
            timestamps: data.map((item: any) =>
                formatTimestampToString(item.timestamp)
            ),
            metric: data.map((item: any) => item.metric_value),
            threshold: data[0].threshold,
            threshold2: data[0].threshold2,
            open: data.map((item: any) => item.open),
            close: data.map((item: any) => item.close),
            high: data.map((item: any) => item.high),
            low: data.map((item: any) => item.low),
        };
        setRealtimeData((prev) => {
            return {
                timestamps: [...prev.timestamps, ...updatedData.timestamps],
                metric: [...prev.metric, ...updatedData.metric],
                threshold: updatedData.threshold,
                threshold2: updatedData.threshold2,
                open: [...prev.open, ...updatedData.open],
                close: [...prev.close, ...updatedData.close],
                high: [...prev.high, ...updatedData.high],
                low: [...prev.low, ...updatedData.low],
            };
        });
    };

    const buildChart = () => {
        const _option = Functions.buildOptionForBuyChart({
            title: t("t3Title_hourly"),
            symbol: symbol,
            metric: BUY,
            timestamps: realtimeData.timestamps,
            threshold: realtimeData.threshold,
            metricData: realtimeData.metric,
            priceData: realtimeData.open,
            watermark: (userContext && userContext.email) || t("watermarkText"),
            includeMark: false,
        });
        const echartsOption = {
            ..._option,
            ...buildCustomConfig({
                symbol,
                data: realtimeData,
                t,
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

        const chartDom = document.getElementById("RealtimeBuyChart");
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

export default RealtimeBuyChart;
